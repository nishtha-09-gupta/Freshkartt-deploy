import { createHash } from 'node:crypto';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../configs/db.js';
import Product from '../models/Product.js';

const serverDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const projectDir = path.dirname(serverDir);
const clientDir = path.join(projectDir, 'client');
const requireFromClient = createRequire(path.join(clientDir, 'package.json'));

dotenv.config({ path: path.join(serverDir, '.env') });

const getDummyProducts = async () => {
  let vite;

  try {
    const { build, createServer } = requireFromClient('vite');
    vite = await createServer({
      root: clientDir,
      configFile: path.join(clientDir, 'vite.config.js'),
      server: { middlewareMode: true, hmr: false },
      appType: 'custom',
      logLevel: 'silent',
    });
    const { dummyProducts } = await vite.ssrLoadModule('/src/assets/assets.js');
    await vite.close();
    vite = null;

    const buildOutput = await build({
      root: clientDir,
      configFile: path.join(clientDir, 'vite.config.js'),
      logLevel: 'silent',
      build: { write: false },
    });
    const outputs = Array.isArray(buildOutput) ? buildOutput : [buildOutput];
    const imageUrlByName = new Map(
      outputs
        .flatMap(({ output = [] }) => output)
        .filter((item) => item.type === 'asset' && item.name)
        .map((item) => [item.name, `/${item.fileName}`])
    );
    return dummyProducts.map((product) => ({
      ...product,
      image: product.image.map((imageUrl) => {
        if (imageUrl.startsWith('data:')) return imageUrl;

        const fileName = path.posix.basename(new URL(imageUrl, 'http://vite.local').pathname);
        const builtImageUrl = imageUrlByName.get(fileName);
        if (!builtImageUrl) {
          throw new Error(`Could not resolve built frontend image asset: ${fileName}`);
        }
        return builtImageUrl;
      }),
    }));
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      throw new Error('Install the client dependencies first (run npm install in client/).');
    }
    throw error;
  } finally {
    if (vite) await vite.close();
  }
};

const makeStableMongoId = (dummyId) => {
  const hexId = createHash('sha256')
    .update(`freshkart-dummy-product:${dummyId}`)
    .digest('hex')
    .slice(0, 24);
  return new mongoose.Types.ObjectId(hexId);
};

const prepareProducts = async (dummyProducts) => {
  const sourceIds = new Set();
  const documents = [];

  for (const product of dummyProducts) {
    if (!product._id || sourceIds.has(product._id)) {
      throw new Error(`Missing or duplicate dummy product identifier: ${product._id}`);
    }
    sourceIds.add(product._id);

    const document = {
      _id: makeStableMongoId(product._id),
      name: product.name,
      description: product.description,
      price: Number(product.price),
      offerPrice: Number(product.offerPrice),
      image: product.image,
      category: product.category,
      inStock: product.inStock,
      createdAt: new Date(product.createdAt),
      updatedAt: new Date(product.updatedAt),
    };

    await new Product(document).validate();
    documents.push(document);
  }

  return documents;
};

const main = async () => {
  const apply = process.argv.includes('--apply');
  const unknownArgs = process.argv.slice(2).filter((arg) => arg !== '--apply');
  if (unknownArgs.length) {
    throw new Error(`Unknown option(s): ${unknownArgs.join(', ')}. Use --apply to insert; otherwise the script is a dry run.`);
  }
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured in server/.env or the process environment.');
  }

  const dummyProducts = await getDummyProducts();
  const documents = await prepareProducts(dummyProducts);

  await connectDB();
  if (mongoose.connection.readyState !== 1) {
    throw new Error('Could not connect to the configured MongoDB database; no products were written.');
  }

  try {
    const existingProducts = await Product.find({
      _id: { $in: documents.map((product) => product._id) },
    }).select('_id').lean();
    const existingIds = new Set(existingProducts.map((product) => product._id.toString()));
    const pending = documents.filter((product) => !existingIds.has(product._id.toString()));

    console.log(`Database: ${mongoose.connection.name}`);
    console.log(`Source products: ${documents.length}`);
    console.log(`Already present by deterministic ID: ${existingProducts.length}`);
    console.log(`Products ${apply ? 'to insert' : 'that would be inserted'}: ${pending.length}`);
    console.log(JSON.stringify(pending, null, 2));

    if (!apply) {
      console.log('Dry run only; no database writes were performed. Re-run with --apply after reviewing this plan.');
      return;
    }

    if (!pending.length) {
      console.log('Nothing to insert.');
      return;
    }

    const result = await Product.collection.bulkWrite(
      pending.map(({ _id, ...fields }) => ({
        updateOne: {
          filter: { _id },
          update: { $setOnInsert: fields },
          upsert: true,
        },
      })),
      { ordered: true }
    );
    console.log(`Inserted ${result.upsertedCount} product(s); existing records were not modified.`);
  } finally {
    await mongoose.disconnect();
  }
};

const invokedDirectly = process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  main().catch(async (error) => {
    console.error(error.message);
    if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
    process.exitCode = 1;
  });
}

export { getDummyProducts, prepareProducts };
