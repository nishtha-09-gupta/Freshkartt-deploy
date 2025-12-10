import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'

const Orders = () => {
    const { currency, axios } = useAppContext()
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('/api/order/seller');
            if (data.success) {
                setOrders(data.orders)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [])

    return (
        <div className="flex-1 h-[95vh] overflow-y-scroll no-scrollbar bg-bg p-6 md:p-10">
            <h2 className="text-2xl font-semibold text-text-dark mb-6">Orders List</h2>

            <div className="flex flex-col gap-5">
                {orders.length === 0 && (
                    <p className="text-gray-500 text-center py-20">No orders yet</p>
                )}

                {orders.map((order, index) => (
                    <div
                        key={index}
                        className="bg-card rounded-2xl shadow-sm hover:shadow-md p-5 md:p-6 flex flex-col md:flex-row justify-between gap-4 transition-transform hover:-translate-y-1"
                    >
                       
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-1">
                            <img
                                className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg"
                                src={assets.box_icon}
                                alt="boxIcon"
                            />
                            <div className="flex flex-col gap-2">
                                {order.items?.map((item, idx) => (
                                    <p key={idx} className="font-medium text-text-dark">
                                        {item.product?.name || "Deleted Product"}{" "}
                                        <span className="text-primary font-semibold">x{item.quantity || 1}</span>
                                    </p>
                                ))}
                            </div>
                        </div>

                      
                        <div className="flex-1 text-sm md:text-base text-black/70 flex flex-col gap-1">
                            <p className="font-medium text-text-dark">
                                {order.address?.firstName || ""} {order.address?.lastName || ""}
                            </p>
                            <p>{order.address?.street || ""}, {order.address?.city || ""}</p>
                            <p>{order.address?.state || ""}, {order.address?.zipcode || ""}, {order.address?.country || ""}</p>
                            <p>📞 {order.address?.phone || ""}</p>
                        </div>
                        <div className="flex items-center justify-center md:justify-end md:flex-1">
                            <p className="text-lg font-semibold text-text-dark">
                                {currency}{order.amount || 0}
                            </p>
                        </div>

                        <div className="flex flex-col text-sm md:text-base text-black/60 gap-1 md:flex-1">
                            <p><span className="font-medium text-text-dark">Method:</span> {order.paymentType || "N/A"}</p>
                            <p><span className="font-medium text-text-dark">Date:</span> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</p>
                            <p>
                                <span className="font-medium text-text-dark">Payment:</span>{" "}
                                <span className={order.isPaid ? "text-primary" : "text-red-500"}>
                                    {order.isPaid ? "Paid" : "Pending"}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders
