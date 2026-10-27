import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [open, setOpen] = React.useState(false)
  const { user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, axios } = useAppContext()

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout')
      if (data.success) { toast.success(data.message); setUser(null); navigate('/') }
      else toast.error(data.message)
    } catch (error) { toast.error(error.message) }
  }

  useEffect(() => {
    if (searchQuery.length > 0) navigate('/products')
  }, [searchQuery, navigate])

  const searchBox = (mobile = false) => <label className={`nav-search ${mobile ? 'nav-search-mobile' : ''}`}>
    <Search size={17} strokeWidth={1.8} />
    <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="search" placeholder="Search fresh finds…" aria-label="Search products" />
    {!mobile && <kbd>⌘ K</kbd>}
  </label>

  return <>
    <div className="delivery-strip"><span><span className="strip-dot"/> A little fresher, a little faster</span><span>Thoughtful groceries, delivered with care <ArrowUpRight size={13}/></span></div>
    <header className="site-header">
      <div className="nav-main">
        <Link to="/" onClick={() => setOpen(false)} className="brand-link" aria-label="FreshKart home"><img src={assets.logo} alt="FreshKart" /></Link>
        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/products" className={({isActive}) => isActive ? 'active' : ''}>Shop</NavLink>
          <NavLink to="/offer" className={({isActive}) => isActive ? 'active' : ''}>Offers</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>Our story</NavLink>
        </nav>
        <div className="nav-search-wrap">{searchBox()}</div>
        <div className="nav-controls">
          <NavLink to="/seller" className="seller-link">Sell with us <ArrowUpRight size={14}/></NavLink>
          {!user ? <button className="account-button" onClick={() => setShowUserLogin(true)}><UserRound size={17}/><span>Sign in</span></button> : <div className="account-menu"><button className="account-button" aria-label="Account"><UserRound size={17}/><span>Account</span></button><div className="account-popover"><Link to="/my-orders">My orders</Link><button onClick={logout}>Log out</button></div></div>}
          <button onClick={() => navigate('/cart')} className="cart-button" aria-label={`Cart, ${getCartCount()} items`}><ShoppingBag size={19}/><span>Bag</span><b>{getCartCount()}</b></button>
          <button className="mobile-menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X size={21}/> : <Menu size={21}/>}</button>
        </div>
      </div>
      {open && <div className="mobile-nav">
        {searchBox(true)}
        <NavLink to="/products" onClick={() => setOpen(false)}>Shop groceries <ArrowUpRight size={15}/></NavLink>
        <NavLink to="/offer" onClick={() => setOpen(false)}>Offers & deals <ArrowUpRight size={15}/></NavLink>
        <NavLink to="/contact" onClick={() => setOpen(false)}>Our story <ArrowUpRight size={15}/></NavLink>
        <NavLink to="/seller" onClick={() => setOpen(false)}>Seller dashboard <ArrowUpRight size={15}/></NavLink>
        {user && <NavLink to="/my-orders" onClick={() => setOpen(false)}>My orders <ArrowUpRight size={15}/></NavLink>}
        {!user ? <button onClick={() => { setOpen(false); setShowUserLogin(true) }}>Sign in to FreshKart</button> : <button onClick={logout}>Log out</button>}
      </div>}
    </header>
  </>
}

export default Navbar
