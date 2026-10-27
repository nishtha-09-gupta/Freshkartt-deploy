import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
  const { products, productsStatus, productsError, fetchProducts } = useAppContext()
  const bestSellers = products.filter((product) => product.inStock).slice(0, 5)

  return (
    <div className="mt-20">
      <div className="flex items-center justify-between">
        <p className="text-3xl font-semibold text-[var(--color-text-dark)]">
          Best <span className="text-[var(--color-primary)]">Sellers</span>
        </p>
      </div>

      {productsStatus === 'loading' ? (
        <p className="mt-6 text-sm text-gray-500" role="status">Loading products…</p>
      ) : productsStatus === 'error' ? (
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-600" role="alert">
          <span>Products couldn’t be loaded. {productsError}</span>
          <button onClick={fetchProducts} className="rounded-md border border-primary px-3 py-1.5 font-medium text-primary hover:bg-primary/5">Try again</button>
        </div>
      ) : bestSellers.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
          {bestSellers.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">No products are available right now.</p>
      )}
    </div>
  )
}

export default BestSeller
