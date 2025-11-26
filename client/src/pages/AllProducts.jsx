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
    <div className='mt-16 flex flex-col'>
      <div className='flex flex-col items-start w-max'>
        <p className='text-2xl font-medium uppercase text-[#243654] relative inline-block'>
          All Products
          <span className='block h-0.5 bg-[var(--color-primary)] rounded-full mt-1 w-full'></span>
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
        {currentProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className='flex items-center justify-center gap-4 mt-6'>
          <button
  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
  disabled={currentPage === 1}
  className='px-4 py-2 rounded-md bg-[var(--color-primary)] text-white disabled:bg-gray-300'
>
  Prev
</button>

<span className='text-lg font-medium'>
  {currentPage} / {totalPages}
</span>

<button
  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
  disabled={currentPage === totalPages}
  className='px-4 py-2 rounded-md bg-[var(--color-primary)] text-white disabled:bg-gray-300'
>
  Next
</button>

        </div>
      )}
    </div>
  )
}

export default AllProducts
