import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
  const { products } = useAppContext()

  return (
    <div className="mt-20">
      <div className="flex items-center justify-between">
        <p className="text-3xl font-semibold text-[var(--color-text-dark)]">
          Best <span className="text-[var(--color-primary)]">Sellers</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
        {products
          .filter((p) => p.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  )
}

export default BestSeller
