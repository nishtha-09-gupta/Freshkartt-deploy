import React from 'react'
import { ArrowUpRight, Minus, Plus, ShoppingBasket } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext()
  if (!product) return null
  const image = Array.isArray(product.image) ? product.image[0] : product.image
  const discount = product.price > 0 ? Math.round((1 - product.offerPrice / product.price) * 100) : 0

  return <article className="product-card" onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }}>
    <div className="product-visual">
      {discount > 0 && <span className="product-discount">{discount}% off</span>}
      <img src={image} alt={product.name} loading="lazy" decoding="async" onError={(e) => { e.currentTarget.style.visibility = 'hidden' }} />
      <button className="product-quick-view" aria-label={`View ${product.name}`} onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }}><ArrowUpRight size={16}/></button>
    </div>
    <div className="product-info">
      <span className="product-category">{product.category}</span>
      <h3 title={product.name}>{product.name}</h3>
      <div className="product-purchase-row">
        <div className="product-prices"><strong>{currency}{product.offerPrice}</strong>{discount > 0 && <del>{currency}{product.price}</del>}</div>
        <div className="product-cart-action" onClick={(e) => e.stopPropagation()}>
          {!cartItems[product._id] ? <button onClick={() => addToCart(product._id)} aria-label={`Add ${product.name} to cart`}><ShoppingBasket size={16}/><span>Add</span></button> : <div className="quantity-control"><button onClick={() => removeFromCart(product._id)} aria-label="Remove one"><Minus size={13}/></button><span>{cartItems[product._id]}</span><button onClick={() => addToCart(product._id)} aria-label="Add one"><Plus size={13}/></button></div>}
        </div>
      </div>
    </div>
  </article>
}

export default ProductCard
