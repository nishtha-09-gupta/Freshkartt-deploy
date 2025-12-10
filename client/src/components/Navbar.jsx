import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [open, setOpen] = React.useState(false)
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext()

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout')
      if (data.success) {
        toast.success(data.message)
        setUser(null)
        navigate('/')
      } else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (searchQuery.length > 0) navigate('/products')
  }, [searchQuery])

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-[#e8f7f2] shadow-md rounded-b-2xl relative z-50 transition-all">

      <NavLink to="/" onClick={() => setOpen(false)}>
        <img className="h-9" src={assets.logo} alt="logo" />
      </NavLink>

      <div className="hidden sm:flex items-center gap-8">
        <NavLink className="hover:text-primary hover:underline underline-offset-4" to="/">Home</NavLink>
        <NavLink className="hover:text-primary hover:underline underline-offset-4" to="/products">All Product</NavLink>
        <NavLink className="hover:text-primary hover:underline underline-offset-4" to="/contact">Contact</NavLink>

        <NavLink
          to="/seller"
          className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dull"
        >
          Seller Dashboard
        </NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full bg-white focus-within:shadow-md">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4 opacity-70" />
        </div>

        <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
          <span className="absolute -top-2 -right-3 bg-primary text-white text-xs min-w-[20px] min-h-[20px] flex items-center justify-center rounded-full">
            {getCartCount()}
          </span>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} className="w-10 cursor-pointer" alt="profile" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-32 rounded-md text-sm z-50">
              <li onClick={() => navigate('my-orders')} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">My Orders</li>
              <li onClick={logout} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 sm:hidden">
        <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
          <span className="absolute -top-2 -right-3 bg-primary text-white text-xs min-w-[20px] min-h-[20px] flex items-center justify-center rounded-full">
            {getCartCount()}
          </span>
        </div>

        <button onClick={() => setOpen(!open)} aria-label="Menu">
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"></div>
      )}

      <div className={`fixed top-0 right-0 h-full w-1/2 bg-white rounded-l-2xl shadow-2xl pt-20 transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col items-start gap-3 p-5 text-sm">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>All Product</NavLink>
          {user && <NavLink to="/my-orders" onClick={() => setOpen(false)}>My Orders</NavLink>}
          <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

          <NavLink
            to="/seller"
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dull mt-2"
          >
            Seller Dashboard
          </NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false)
                setShowUserLogin(true)
              }}
              className="px-6 py-2 mt-2 bg-primary hover:bg-primary-dull text-white rounded-full w-full text-center"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="px-6 py-2 mt-2 bg-primary hover:bg-primary-dull text-white rounded-full w-full text-center"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
