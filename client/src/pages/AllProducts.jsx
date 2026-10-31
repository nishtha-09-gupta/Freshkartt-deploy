import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
  const { products, productsStatus, productsError, fetchProducts, searchQuery } = useAppContext()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20
  const normalizedQuery = typeof searchQuery === 'string' ? searchQuery.trim().toLowerCase() : ''
  const availableProducts = Array.isArray(products) ? products : []
  const filteredProducts = normalizedQuery
    ? availableProducts.filter((product) => typeof product?.name === 'string' && product.name.toLowerCase().includes(normalizedQuery))
    : availableProducts

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, products])

  const inStockProducts = filteredProducts.filter((product) => product?.inStock)
  const totalPages = Math.ceil(inStockProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = inStockProducts.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="mt-16 flex flex-col px-6 md:px-16">
      
      
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold uppercase text-[var(--color-text-dark)] relative inline-block">
          All Products
          <span className="block h-1 bg-[var(--color-primary)] mt-3 rounded-full w-24 mx-auto"></span>
        </h1>
      </div>

      {productsStatus === 'loading' ? (
        <p className="py-12 text-center text-sm text-gray-500" role="status">Loading products…</p>
      ) : productsStatus === 'error' ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center" role="alert">
          <p className="text-sm text-gray-600">Products couldn’t be loaded. {productsError}</p>
          <button onClick={fetchProducts} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-light">Try again</button>
        </div>
      ) : currentProducts.length > 0 ? (
        <div className="px-2 sm:px-0 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
          {currentProducts.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      ) : (
        <p className="py-12 text-center text-sm text-gray-500">
          {normalizedQuery ? 'No products match your search.' : 'No products are available right now.'}
        </p>
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white font-semibold disabled:bg-gray-300 disabled:text-gray-600 transition hover:bg-primary-dull"
          >
            Prev
          </button>

          <span className="text-lg font-medium text-[var(--color-text-dark)]">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white font-semibold disabled:bg-gray-300 disabled:text-gray-600 transition hover:bg-primary-dull"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default AllProducts
