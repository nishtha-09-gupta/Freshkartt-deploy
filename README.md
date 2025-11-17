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
-> User Routes
Endpoint	             Method	      Access	     Description
/user/register	        POST	      Public	      Register new user
/user/login	           POST	      Public    	   User login
/user/is-auth	        GET	   Authenticated User   Check if user is logged in
/user/logout	        GET	   Authenticated User	Logout user

-> Seller Routes
Endpoint            	 Method	     Access	          Description
/seller/login	       POST	        Public	          Seller login
/seller/is-auth	    GET	   Authenticated Seller  Check seller authentication
/seller/logout	       GET	   Authenticated Seller	 Logout seller

-> Product Routes
Endpoint	             Method	     Access	           Description
/products/add	       POST	   Authenticated Seller	  Add a new product (with images upload)
/products/list	       GET	      Public	           Get all products
/products/id	       GET	      Public	           Get product by ID
/products/stock	    POST	   Authenticated Seller	  Change/update stock
-> Order Routes
Endpoint	            Method	  Access	              Description
/order/cod	          POST	  Authenticated User	    Place Cash-on-Delivery order
/order/stripe	       POST	  Authenticated User     Place online/Stripe order
/order/user	          GET	  Authenticated User	    Get user’s own orders
/order/seller	       GET	 Authenticated Seller	 Get all orders for seller dashboard
-> Address Routes
Endpoint	           Method	    Access	            Description
/address/add	     POST	 Authenticated User	   Add new address
/address/get	     GET	    Authenticated User	   Get saved addresses
-> Cart Routes
Endpoint         	 Method	    Access	            Description
/cart/update	    POST	    Authenticated User	   Add or update cart items
   

8. Deployment
   • Frontend: Vercel
   • Backend:  Vercel
   • Database: MongoDB Atlas
   • Payment: Stripe API
   
