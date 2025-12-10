import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {
  const { navigate } = useAppContext()

  return (
    <div className="mt-20">
      <p className="text-3xl font-semibold text-[var(--color-text-dark)]">
        Shop by <span className="text-[var(--color-primary)]">Category</span>
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-5 mt-8">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`)
              scrollTo(0, 0)
            }}
            className="cursor-pointer flex flex-col items-center justify-center p-5 rounded-2xl transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
            style={{ backgroundColor: category.bgColor }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="w-20 h-20 object-contain transition-transform duration-300 hover:scale-110"
            />
            <p className="mt-3 text-sm font-semibold text-[var(--color-text-dark)]">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
