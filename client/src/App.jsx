import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from "react-hot-toast";
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import Loading from './components/Loading';
// import ComingSoon from './pages/ComingSoon'; 
import Refund from "./pages/Refund";
import Contact from "./pages/Contact";
import Faq from "./pages/FAQ";
import OffersAndDeals from './pages/Offer';
import BestSeller from './components/BestSeller';




const App = () => {

  const isSellerPath = useLocation().pathname.includes("seller");
  const {showUserLogin, isSeller, isDemoCatalog, productsError, fetchProducts} = useAppContext()

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>

     {isSellerPath ? null : <Navbar/>} 
     {showUserLogin ? <Login/> : null}

     <Toaster />

      {isDemoCatalog && !isSellerPath && (
        <aside className="mx-6 mt-4 flex flex-col gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950 md:mx-16 lg:mx-24 xl:mx-32" role="status">
          <p><strong>Development demo catalog.</strong> These bundled sample products are separate from live inventory. Cart changes stay in this browser session; checkout and customer cart sync are disabled.</p>
          {productsError && <p className="text-xs text-amber-900">{productsError}</p>}
          <button onClick={fetchProducts} className="w-fit text-xs font-semibold underline underline-offset-2">Retry live product catalog</button>
        </aside>
      )}

      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>

        <Routes>
          <Route path='/' element={<Home/>} />
          {/* <Route path="/coming-soon" element={<ComingSoon />} />  */}
          <Route path="/refund" element={<Refund />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path='/home' element={<Home/>}/>
          <Route path='/offer' element={<OffersAndDeals/>}/>
          <Route path='/bestSeller' element={<BestSeller/>}/>
         

          <Route path='/products' element={<AllProducts/>} />
          <Route path='/products/:category' element={<ProductCategory/>} />
          <Route path='/products/:category/:id' element={<ProductDetails/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/add-address' element={<AddAddress/>} />
          <Route path='/my-orders' element={<MyOrders/>} />
          <Route path='/loader' element={<Loading/>} />
          <Route path='/seller' element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
            <Route index element={isSeller ? <AddProduct/> : null} />
            <Route path='product-list' element={<ProductList/>} />
            <Route path='orders' element={<Orders/>} />
          </Route>
        </Routes>
      </div>
     {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App
