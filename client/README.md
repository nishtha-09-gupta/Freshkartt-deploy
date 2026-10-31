# FreshKart client

React storefront and seller dashboard built with Vite, React Router, and Tailwind CSS. For full project setup, environment variables, routes, and API documentation, see the [project README](../README.md).

## Setup

```sh
npm install
```

Create `client/.env` with the API origin and the currency symbol used by the storefront:

```dotenv
VITE_BACKEND_URL=http://localhost:4000
VITE_CURRENCY=₹
```

Start the API separately from `server/`, then run the client:

```sh
npm run dev
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite for local development |
| `npm run build` | Build the production client in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
