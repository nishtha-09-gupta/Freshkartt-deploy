# FreshKart client

## Optional development demo catalog

The bundled `dummyProducts` list can be used for a clearly marked storefront preview without writing products to MongoDB. From the `client` directory, run:

```sh
VITE_USE_DEMO_CATALOG=true npm run dev
```

This option only works with Vite's development server. If the live API returns products, those products take precedence and the sample catalog is not mixed in. When the sample catalog is active, its cart is held in frontend state only and checkout, customer-cart syncing, and seller stock management are disabled for those sample items. Production builds never enable the demo catalog.

## Existing app scripts

- `npm run dev` starts the FreshKart client.
- `npm run build` creates the production build.
- `npm run lint` runs ESLint.

The app uses the existing React and Vite setup; no additional dependencies are required.

---

This is an existing FreshKart MERN application, not a new Vite template project.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
