import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
  const { products, searchQuery } = useAppContext()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    } else {
      setFilteredProducts(products)
    }
    setCurrentPage(1)
  }, [products, searchQuery])

  const inStockProducts = filteredProducts.filter((p) => p.inStock)
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

      <div className="px-2 sm:px-0 grid grid-cols-2 gap-3 
                      sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6">

        {currentProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}

      </div>
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
