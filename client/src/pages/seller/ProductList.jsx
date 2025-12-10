import React from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ProductList = () => {
    const { products, currency, axios, fetchProducts } = useAppContext()

    const toggleStock = async (id, inStock) => {
        try {
            const { data } = await axios.post('/api/product/stock', { id, inStock });
            if (data.success) {
                fetchProducts();
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="flex-1 h-[95vh] overflow-y-scroll no-scrollbar p-4 md:p-10 bg-bg">
            <h2 className="text-2xl font-semibold text-text-dark mb-6">All Products</h2>

            <div className="overflow-x-auto">
                <div className="min-w-full bg-card rounded-2xl shadow-sm border border-gray-200">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100 text-gray-700 text-left text-sm">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Product</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold hidden md:table-cell">Selling Price</th>
                                <th className="px-6 py-4 font-semibold">In Stock</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                            {products.map((product) => (
                                <tr
                                    key={product._id}
                                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                               
                                    <td className="px-6 py-4 flex items-center space-x-4">
                                        <div className="w-16 h-16 rounded-lg border border-gray-300 overflow-hidden flex items-center justify-center bg-gray-50">
                                            <img src={product.image[0]} alt={product.name} className="object-cover w-full h-full" />
                                        </div>
                                        <span className="truncate max-w-xs">{product.name}</span>
                                    </td>

                                 
                                    <td className="px-6 py-4">{product.category}</td>

                               
                                    <td className="px-6 py-4 hidden md:table-cell font-medium text-text-dark">
                                        {currency}{product.offerPrice}
                                    </td>

                                  
                                    <td className="px-6 py-4">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={product.inStock}
                                                onChange={() => toggleStock(product._id, !product.inStock)}
                                            />
                                            <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-primary transition-colors duration-300"></div>
                                            <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-5 shadow-md"></span>
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductList
