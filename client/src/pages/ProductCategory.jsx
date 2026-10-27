import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const ProductCategory = () => {
  const { products, productsStatus, productsError, fetchProducts } = useAppContext()
  const { category } = useParams()

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  )

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  )

  return (
    <div className="mt-16 px-6 md:px-16 pb-16">
    
      {searchCategory && (
        <div className="flex flex-col items-start w-max mb-8">
          <p className="text-3xl font-bold text-[var(--color-text-dark)] relative inline-block">
            {searchCategory.text.toUpperCase()}
            <span className="block h-1 bg-[var(--color-primary)] mt-2 rounded-full w-24"></span>
          </p>
        </div>
      )}

      
      {productsStatus === 'loading' ? (
        <p className="py-12 text-center text-sm text-gray-500" role="status">Loading products…</p>
      ) : productsStatus === 'error' ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center" role="alert">
          <p className="text-sm text-gray-600">Products couldn’t be loaded. {productsError}</p>
          <button onClick={fetchProducts} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-light">Try again</button>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-2xl font-medium text-[var(--color-primary)]">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductCategory
