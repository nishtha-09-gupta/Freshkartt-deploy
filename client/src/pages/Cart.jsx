import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      product.quantity = cartItems[key];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) setSelectedAddress(data.addresses[0]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) return toast.error("Please select an address");

      const orderData = {
        userId: user._id,
        items: cartArray.map((item) => ({ product: item._id, quantity: item.quantity })),
        address: selectedAddress._id,
      };

      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", orderData);
        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else toast.error(data.message);
      } else {
        const { data } = await axios.post("/api/order/stripe", orderData);
        if (data.success) window.location.replace(data.url);
        else toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) getCart();
  }, [products, cartItems]);

  useEffect(() => {
    if (user) getUserAddress();
  }, [user]);

  if (!products.length || !cartItems) return null;

  return (
    <div className="mt-16 flex flex-col md:flex-row gap-6 px-4 md:px-10">

      <div className="flex-1 max-w-4xl space-y-4">
        <h1 className="text-3xl font-bold text-[var(--color-text-dark)] mb-4">
          Shopping Cart{" "}
          <span className="text-primary font-medium text-lg">{getCartCount()} Items</span>
        </h1>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 p-4 rounded-lg shadow-sm bg-white border border-gray-200"
          >
            <div className="flex items-center gap-4 md:gap-6 w-full md:flex-1">
              <div
                onClick={() => {
                  navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden"
              >
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="max-w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>

              <div className="flex-1">
                <p className="font-semibold text-[var(--color-text-dark)]">{product.name}</p>
                <div className="text-gray-500 text-sm mt-1">
                  <p>Weight: {product.weight || "N/A"}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span>Qty:</span>
                    <select
                      value={cartItems[product._id]}
                      onChange={(e) => updateCartItem(product._id, Number(e.target.value))}
                      className="border rounded px-2 py-1 outline-none text-sm"
                    >
                      {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9)
                        .fill("")
                        .map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-lg font-medium text-[var(--color-text-dark)]">
              {currency}
              {product.offerPrice * product.quantity}
            </p>

            <button onClick={() => removeFromCart(product._id)} className="p-2 rounded hover:bg-red-100 transition">
              <img src={assets.remove_icon} alt="remove" className="w-6 h-6" />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="flex items-center gap-2 text-primary font-medium mt-4 hover:underline"
        >
          <img src={assets.arrow_right_icon_colored} alt="arrow" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          Continue Shopping
        </button>
      </div>
      <div className="max-w-[360px] w-full bg-white p-5 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-[var(--color-text-dark)]">Order Summary</h2>
        <hr className="border-gray-300 my-4" />
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium uppercase text-gray-700">Delivery Address</p>
            <div className="relative mt-2">
              <p className="text-gray-500">
                {selectedAddress
                  ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                  : "No address found"}
              </p>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="absolute right-0 text-primary hover:underline"
              >
                Change
              </button>

              {showAddress && (
                <div className="absolute top-8 left-0 w-full bg-white border border-gray-300 rounded shadow-sm text-sm z-10">
                  {addresses.map((address, idx) => (
                    <p
                      key={idx}
                      onClick={() => {
                        setSelectedAddress(address);
                        setShowAddress(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {address.street}, {address.city}, {address.state}, {address.country}
                    </p>
                  ))}
                  <p
                    onClick={() => navigate("/add-address")}
                    className="p-2 text-primary cursor-pointer text-center hover:bg-primary/10"
                  >
                    Add address
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium uppercase text-gray-700">Payment Method</p>
            <select
              value={paymentOption}
              onChange={(e) => setPaymentOption(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-2 outline-none"
            >
              <option value="COD">Cash On Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>
        </div>

        <hr className="border-gray-300 mt-4" />
        <div className="mt-4 text-gray-700 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getCartAmount() * 2) / 100}
            </span>
          </p>
          <p className="flex justify-between text-lg font-semibold">
            <span>Total Amount</span>
            <span>
              {currency}
              {getCartAmount() + (getCartAmount() * 2) / 100}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dull transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
