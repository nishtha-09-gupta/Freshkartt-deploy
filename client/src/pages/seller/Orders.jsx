// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'
// import toast from 'react-hot-toast'

// const Orders = () => {
//     const { currency, axios } = useAppContext()
//     const [orders, setOrders] = useState([])

//     const fetchOrders = async () => {
//         try {
//             const { data } = await axios.get('/api/order/seller');
//             if (data.success) {
//                 setOrders(data.orders)
//             } else {
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     };

//     useEffect(() => {
//         fetchOrders();
//     }, [])

//     return (
//         <div className="flex-1 h-[95vh] overflow-y-scroll no-scrollbar bg-bg p-6 md:p-10">
//             <h2 className="text-2xl font-semibold text-text-dark mb-6">Orders List</h2>

//             <div className="flex flex-col gap-5">
//                 {orders.length === 0 && (
//                     <p className="text-gray-500 text-center py-20">No orders yet</p>
//                 )}

//                 {orders.map((order, index) => (
//                     <div
//                         key={index}
//                         className="bg-card rounded-2xl shadow-sm hover:shadow-md p-5 md:p-6 flex flex-col md:flex-row justify-between gap-4 transition-transform hover:-translate-y-1"
//                     >
                       
//                         <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-1">
//                             <img
                                
//                                 className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-lg"
//                                 src={assets.box_icon}
//                                 alt="boxIcon"
//                             />
//                             <div className="flex flex-col gap-2">
//                                 {order.items?.map((item, idx) => (
//                                     <p key={idx} className="font-medium text-text-dark">
//                                         {item.product?.name || "Deleted Product"}{" "}
//                                         <span className="text-primary font-semibold">x{item.quantity || 1}</span>
//                                     </p>
//                                 ))}
//                             </div>
//                         </div>

                      
//                         <div className="flex-1 text-sm md:text-base text-black/70 flex flex-col gap-1">
//                             <p className="font-medium text-text-dark">
//                                 {order.address?.firstName || ""} {order.address?.lastName || ""}
//                             </p>
//                             <p>{order.address?.street || ""}, {order.address?.city || ""}</p>
//                             <p>{order.address?.state || ""}, {order.address?.zipcode || ""}, {order.address?.country || ""}</p>
//                             <p>📞 {order.address?.phone || ""}</p>
//                         </div>
//                         <div className="flex items-center justify-center md:justify-end md:flex-1">
//                             <p className="text-lg font-semibold text-text-dark">
//                                 {currency}{order.amount || 0}
//                             </p>
//                         </div>

//                         <div className="flex flex-col text-sm md:text-base text-black/60 gap-1 md:flex-1">
//                             <p><span className="font-medium text-text-dark">Method:</span> {order.paymentType || "N/A"}</p>
//                             <p><span className="font-medium text-text-dark">Date:</span> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</p>
//                             <p>
//                                 <span className="font-medium text-text-dark">Payment:</span>{" "}
//                                 <span className={order.isPaid ? "text-primary" : "text-red-500"}>
//                                     {order.isPaid ? "Paid" : "Paid Via Cash"}
//                                 </span>
//                             </p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Orders




import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'

const Orders = () => {
    const { currency, axios } = useAppContext()
    const [orders, setOrders] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const ordersPerPage = 5

    const [priceType, setPriceType] = useState('')
    const [showFilter, setShowFilter] = useState(false)

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('/api/order/seller')
            if (data.success) {
                setOrders(data.orders)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const filteredOrders = orders.filter(order => {
        const price = order.amount || 0
        if (priceType === 'LOW') return price <= 500
        if (priceType === 'MID') return price > 500 && price <= 2000
        if (priceType === 'HIGH') return price > 2000 && price <= 5000
        if (priceType === 'PREMIUM') return price > 5000
        return true
    })

    const indexOfLastOrder = currentPage * ordersPerPage
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

    return (
        <div className="flex-1 h-[95vh] overflow-y-scroll no-scrollbar bg-bg p-6 md:p-10">
            <div className="flex justify-between items-center mb-6 relative">
                <h2 className="text-2xl font-semibold text-text-dark">Orders</h2>

                <button
                    onClick={() => setShowFilter(!showFilter)}
                    className="flex items-center gap-2 text-sm font-medium text-text-dark hover:text-primary"
                >
                    <img src={assets.filter_icon} className="w-5 h-5" />
                    Filter
                </button>

                {showFilter && (
                    <div className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-20">
                        <p className="text-sm font-semibold text-text-dark mb-3">Order Value</p>

                        <select
                            value={priceType}
                            onChange={(e) => {
                                setPriceType(e.target.value)
                                setCurrentPage(1)
                                setShowFilter(false)
                            }}
                            className="w-full border rounded-lg px-3 py-2 text-sm"
                        >
                            <option value="">All Orders</option>
                            <option value="LOW">Low value (≤ ₹500)</option>
                            <option value="MID">Medium value (₹501 – ₹2,000)</option>
                            <option value="HIGH">High value (₹2,001 – ₹5,000)</option>
                            <option value="PREMIUM">Premium (&gt; ₹5,000)</option>
                        </select>

                        {priceType && (
                            <button
                                onClick={() => {
                                    setPriceType('')
                                    setCurrentPage(1)
                                    setShowFilter(false)
                                }}
                                className="text-sm text-primary mt-3"
                            >
                                Clear filter
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-5">
                {currentOrders.length === 0 && (
                    <p className="text-gray-500 text-center py-20">No orders found</p>
                )}

                {currentOrders.map((order, index) => (
                    <div
                        key={index}
                        className="bg-card rounded-2xl shadow-sm hover:shadow-md p-5 md:p-6 flex flex-col md:flex-row justify-between gap-4 transition-transform hover:-translate-y-1"
                    >
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-1">
                            <img
                                className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-lg"
                                src={assets.box_icon}
                                alt="boxIcon"
                            />
                            <div className="flex flex-col gap-2">
                                {order.items?.map((item, idx) => (
                                    <p key={idx} className="font-medium text-text-dark">
                                        {item.product?.name || 'Deleted Product'}{' '}
                                        <span className="text-primary font-semibold">
                                            x{item.quantity || 1}
                                        </span>
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 text-sm md:text-base text-black/70 flex flex-col gap-1">
                            <p className="font-medium text-text-dark">
                                {order.address?.firstName} {order.address?.lastName}
                            </p>
                            <p>{order.address?.street}, {order.address?.city}</p>
                            <p>{order.address?.state}, {order.address?.zipcode}, {order.address?.country}</p>
                            <p>📞 +91  {order.address?.phone}</p>
                        </div>

                        <div className="flex items-center justify-center md:justify-end md:flex-1">
                            <p className="text-lg font-semibold text-text-dark">
                                {currency}{order.amount}
                            </p>
                        </div>

                        <div className="flex flex-col text-sm md:text-base text-black/60 gap-1 md:flex-1">
                            <p><span className="font-medium text-text-dark">Method:</span> {order.paymentType}</p>
                            <p><span className="font-medium text-text-dark">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>
                                <span className="font-medium text-text-dark">Payment:</span>{' '}
                                <span className={order.isPaid ? 'text-primary' : 'text-red-500'}>
                                    {order.isPaid ? 'Paid' : 'Paid Via Cash'}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="px-5 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <span className="font-semibold text-text-dark">
                        {currentPage} / {totalPages}
                    </span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="px-5 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-light transition disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default Orders
