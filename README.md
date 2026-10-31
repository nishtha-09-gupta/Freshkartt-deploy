# FreshKart

FreshKart is a full-stack grocery shopping application with a customer storefront and a seller dashboard. Customers can browse products, manage a cart and delivery addresses, and place Cash on Delivery or Stripe orders. Sellers can manage products and review orders.

## Contents

- [Features](#features)
- [Technology](#technology)
- [Repository layout](#repository-layout)
- [Run locally](#run-locally)
- [Environment variables](#environment-variables)
- [Application routes](#application-routes)
- [API overview](#api-overview)
- [Seed the sample catalog](#seed-the-sample-catalog)
- [Production notes](#production-notes)

## Features

- Product browsing by category, product search, and paginated product listings
- Product details and image galleries
- Customer registration, login, cookie-based JWT authentication, and saved addresses
- Cart management and order placement using Cash on Delivery or Stripe Checkout
- Customer order history
- Seller login, product and stock management, and seller order views
- Product image uploads through Cloudinary
- Optional demo login endpoint for a demo customer account

## Technology

| Area | Stack |
| --- | --- |
| Frontend | React 19, Vite 6, React Router 7, Tailwind CSS 4 |
| HTTP client | Axios |
| Backend | Node.js, Express 4 |
| Database | MongoDB with Mongoose |
| Authentication | JWT stored in HTTP-only cookies |
| Product image uploads | Cloudinary |
| Online payments | Stripe Checkout and webhooks |
| Deployment configuration | Vercel |

## Repository layout

```text
client/
  src/components/    Shared storefront and seller UI
  src/context/       Frontend application state and API access
  src/pages/         Customer and seller routes
  src/assets/        Brand, category, and sample product assets/data
server/
  configs/           MongoDB, Cloudinary, and upload configuration
  controllers/       API request handlers
  middlewares/       Customer and seller authentication
  models/            Mongoose models
  routes/             Express route definitions
  scripts/            Manually-run maintenance scripts
```

## Run locally

Use Node.js and npm. Install dependencies separately for each application:

```sh
cd server
npm install
```

In another terminal:

```sh
cd client
npm install
```

Set the environment variables described below in local `server/.env` and `client/.env` files. Start the API and frontend in separate terminals:

```sh
# Terminal 1
cd server
npm start
```

```sh
# Terminal 2
cd client
npm run dev
```

Vite serves the frontend at `http://localhost:5173` by default. The API listens on port `4000` by default; `GET http://localhost:4000/` returns `API is Working` when the server is running. MongoDB must be reachable for product, account, cart, address, and order operations.

### Client commands

Run these from `client/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create the production build in `client/dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

### Server command

Run `npm start` from `server/` to start Express. `npm run server` starts the same app through Nodemon for development.

## Environment variables

Create or update local environment files. Never commit real credentials or payment keys.

### `server/.env`

| Variable | Required for | Notes |
| --- | --- | --- |
| `MONGODB_URI` | Database access | MongoDB connection URI without a database path. The app appends `/greencart`. |
| `JWT_SECRET` | Customer and seller authentication | Use a long, private random value. |
| `SELLER_EMAIL` | Seller login | Seller account email configured by the deployment. |
| `SELLER_PASSWORD` | Seller login | Seller account password configured by the deployment. |
| `CLOUDINARY_CLOUD_NAME` | Product image uploads | Cloudinary account setting. |
| `CLOUDINARY_API_KEY` | Product image uploads | Keep private. |
| `CLOUDINARY_API_SECRET` | Product image uploads | Keep private. |
| `STRIPE_SECRET_KEY` | Stripe checkout and webhook processing | Keep private. |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook verification | Keep private. |
| `PORT` | Optional server port | Defaults to `4000`. |

### `client/.env`

| Variable | Purpose |
| --- | --- |
| `VITE_BACKEND_URL` | API origin, for local development typically `http://localhost:4000` |
| `VITE_CURRENCY` | Currency symbol displayed with product and order prices, for example `₹` |

Vite exposes `VITE_*` values in browser code. Do not put secrets in `client/.env`.

## Application routes

| Path | Page |
| --- | --- |
| `/` | Home storefront |
| `/products` | All products, search results, and pagination |
| `/products/:category` | Products in a category |
| `/products/:category/:id` | Product details |
| `/offer` | Offers and deals |
| `/bestSeller` | Best sellers |
| `/cart` | Shopping cart and checkout |
| `/add-address` | Add a delivery address |
| `/my-orders` | Customer order history |
| `/contact`, `/faq`, `/refund` | Customer information pages |
| `/seller` | Seller login or dashboard |
| `/seller/product-list`, `/seller/orders` | Seller product and order management |

## API overview

All routes below are relative to the API server origin. Customer and seller protected routes use the authentication cookies sent by the frontend.

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/user/register` | Public | Register a customer |
| `POST` | `/api/user/login` | Public | Customer login |
| `GET` | `/api/user/is-auth` | Customer | Check the current customer session |
| `GET` | `/api/user/logout` | Customer | Clear the customer session |
| `POST` | `/api/auth/demo-login` | Public | Sign in as the demo customer; creates its account and address on first use |
| `POST` | `/api/seller/login` | Public | Seller login |
| `GET` | `/api/seller/is-auth` | Seller | Check the seller session |
| `GET` | `/api/seller/logout` | Public | Clear the seller session |
| `GET` | `/api/product/list` | Public | List products |
| `GET` | `/api/product/id` | Public | Fetch a product by ID (ID is read from the request body in the current implementation) |
| `POST` | `/api/product/add` | Seller | Add a product with uploaded images |
| `POST` | `/api/product/stock` | Seller | Update product stock status |
| `POST` | `/api/cart/update` | Customer | Sync the customer cart |
| `POST` | `/api/address/add` | Customer | Save a delivery address |
| `GET` | `/api/address/get` | Customer | List saved addresses |
| `POST` | `/api/order/cod` | Customer | Place a Cash on Delivery order |
| `POST` | `/api/order/stripe` | Customer | Create an online checkout session |
| `GET` | `/api/order/user` | Customer | List the customer’s orders |
| `GET` | `/api/order/seller` | Seller | List orders for the seller dashboard |
| `POST` | `/stripe` | Stripe | Receive Stripe webhook events |

## Seed the sample catalog

`server/scripts/seedDummyProducts.js` reuses the existing `dummyProducts` array in `client/src/assets/assets.js` and maps it to the backend product schema. It is not run when the server starts.

From `server/`, first run the default dry run to review which records would be inserted:

```sh
node scripts/seedDummyProducts.js
```

The script connects to the configured MongoDB database to check for matching deterministic IDs, but makes no database writes in dry-run mode. After reviewing the output, run with `--apply` to insert only products that are not already present:

```sh
node scripts/seedDummyProducts.js --apply
```

The script uses `$setOnInsert`; existing matching records are not overwritten. Configure the client dependencies (`cd client && npm install`) before running it because the script loads the original asset data and resolves the bundled image paths through Vite.

## Production notes

- Configure the same environment variables in the relevant deployment environments; keep credentials in the hosting provider’s secret settings.
- `client/vercel.json` provides the frontend SPA fallback. `server/vercel.json` configures the API function deployment.
- The Express CORS allowlist is maintained in `server/server.js`; update it if the deployed frontend origin changes.
- Stripe redirects to the storefront and relies on the `/stripe` webhook route to process payment events.
- MongoDB uses the `greencart` database name appended by `server/configs/db.js`.
