
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([])
  const [openOrder, setOpenOrder] = useState(null)
  const { currency, axios, user } = useAppContext()

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/user')
      if (data.success) {
        setMyOrders(data.orders)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user) {
      fetchMyOrders()
    }
  }, [user])

  return (
    <div className="mt-16 pb-16">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {myOrders.map((order, index) => (
        <div key={index} className="border border-gray-300 rounded-lg mb-6 p-4 max-w-4xl">
          <div className="flex justify-between max-md:flex-col gap-2 text-gray-700">
            <p>Order ID: {order._id}</p>
            <p>Payment: {order.paymentType}</p>
            <p>Total: {currency}{order.amount}</p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-primary font-medium">{order.status}</p>

            <button
              onClick={() => setOpenOrder(openOrder === index ? null : index)}
              className="text-sm px-4 py-1 rounded-md bg-primary text-white"
            >
              {openOrder === index ? "Hide Details" : "View Details"}
            </button>
          </div>

          {openOrder === index && (
            <div className="mt-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row md:items-center justify-between p-4 border-b last:border-b-0 text-gray-600`}
                >
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <img src={item.product.image[0]} alt="" className="w-16 h-16" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-medium text-gray-800">{item.product.name}</h2>
                      <p>Category: {item.product.category}</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:ml-8 mb-4 md:mb-0">
                    <p>Qty: {item.quantity || 1}</p>
                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>

                  <p className="text-primary text-lg font-medium">
                    {currency}{item.product.offerPrice * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default MyOrders
