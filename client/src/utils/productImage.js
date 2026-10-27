import { dummyProducts } from '../assets/assets';

const getSourceFileName = (imageUrl) => {
  const fileName = new URL(imageUrl, 'http://freshkart.local').pathname.split('/').pop();
  return fileName.replace(/-[A-Za-z0-9_-]{8}(?=\.[^.]+$)/, '');
};

const productImageUrlByName = new Map(
  dummyProducts.flatMap((product) => product.image).map((imageUrl) => [
    getSourceFileName(imageUrl),
    imageUrl,
  ])
);

export const getProductImageUrl = (imageUrl) => {
  if (typeof imageUrl !== 'string' || imageUrl.startsWith('data:')) return imageUrl;

  let pathname;
  try {
    pathname = new URL(imageUrl, 'http://freshkart.local').pathname;
  } catch {
    return imageUrl;
  }

  if (!pathname.startsWith('/assets/') && !pathname.startsWith('/src/assets/')) {
    return imageUrl;
  }

  const sourceFileName = getSourceFileName(pathname);
  return productImageUrlByName.get(sourceFileName) || imageUrl;
};
