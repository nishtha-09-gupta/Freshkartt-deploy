1. Project Title
   FreshKart - A Full Stack Grocery Delivery Website

2. Problem Statement
   Grocery shopping can be time consuming and inconvenient. Customers face unavailability, price confusion, and no tracking. Vendors struggle to digitize inventory. FreshKarrt provides a seamless platform for users to order groceries online, pay securely, track deliveries, and for vendors to manage stock via an admin panel.

3. System Architecture (Frontend → Backend (API) → Database → Payment Gateway)
   • Frontend: React.js + TailwindCSS + React Router
   • Backend: Node.js + Express.js
   • Database: MongoDB Atlas
   • Authentication: JWT login/signup
   • Payment: Stripe API
   • Hosting: Vercel (Frontend), Vercel (Backend)
   • Hosting: Vercel (Frontend), Vercel (Backend)

4. Key Features
   • Authentication: JWT-based login/signup (User/Admin)
   • CRUD: Products, Orders, Users
   • Routing: Home, Shop, Cart, Checkout, Profile, Admin Dashboard
   • Search/Filter/Sort: Category, Price, Popularity
   • Pagination: Efficient product listing
   • Payments: Stripe integration
   • AI Suggestions: Optional product/recipe recommendations
   • Deployment: Fully live on Vercel

5. Tech Stack
   • Frontend: React, TailwindCSS, Axios
   • Backend: Node.js, Express
   • Database: MongoDB Atlas
   • Authentication: JWT
   • Hosting: Vercel

6. API Overview
   ->User Routes

POST /user/register – Register a new user (Public)

POST /user/login – User login (Public)

GET /user/is-auth – Check if user is authenticated (Authenticated User)

GET /user/logout – Logout user (Authenticated User)

-> Seller Routes

POST /seller/login – Seller login (Public)

GET /seller/is-auth – Verify seller authentication (Authenticated Seller)

GET /seller/logout – Logout seller (Authenticated Seller)

-> Product Routes

POST /products/add – Add a new product with image upload (Authenticated Seller)

GET /products/list – Get list of all products (Public)

GET /products/id – Get a product by its ID (Public)

POST /products/stock – Update/change stock for a product (Authenticated Seller)

-> Order Routes

POST /order/cod – Place a Cash-on-Delivery order (Authenticated User)

POST /order/stripe – Place an online payment / Stripe order (Authenticated User)

GET /order/user – Get all orders of the logged-in user (Authenticated User)

GET /order/seller – Get all orders for seller dashboard (Authenticated Seller)

-> Address Routes

POST /address/add – Add a new address (Authenticated User)

GET /address/get – Get all saved addresses (Authenticated User)

Cart Routes

POST /cart/update – Add or update items in cart (Authenticated User)
   

7. Deployment
   • Frontend: Vercel
   • Backend:  Vercel
   • Database: MongoDB Atlas
   • Payment: Stripe API
   
