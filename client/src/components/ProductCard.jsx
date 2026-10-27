import React from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
          scrollTo(0, 0);
        }}
        className="bg-card rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer 
                   w-full sm:w-auto flex flex-col justify-between border border-gray-soft 
                   p-3 sm:p-4"
      >
        <div className="flex items-center justify-center mb-3">
          <img
            className="transition-transform transform hover:scale-105 
                       max-w-24 sm:max-w-28 md:max-w-36 rounded-lg"
            src={product.image[0]}
            alt={product.name}
          />
        </div>

        
        <div className="text-gray-500/70 text-sm space-y-1">
          <p className="uppercase text-[10px] sm:text-xs">{product.category}</p>

          <p className="text-text-dark font-semibold text-sm sm:text-lg truncate w-full">
            {product.name}
          </p>

         
          <div className="flex items-center gap-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                  className="w-3 h-3 sm:w-4 sm:h-4"
                />
              ))}
            <p className="text-[10px] sm:text-xs text-gray-soft">(4)</p>
          </div>

          
          <div className="flex items-center justify-between mt-2 sm:mt-3">
            <p className="text-primary font-bold text-sm sm:text-base md:text-xl">
              {currency}{product.offerPrice}{" "}
              <span className="text-gray-soft line-through text-[10px] sm:text-xs md:text-sm">
                {currency}{product.price}
              </span>
            </p>

            <div onClick={(e) => e.stopPropagation()} className="flex items-center">
              {!cartItems[product._id] ? (
                <button
                  onClick={() => addToCart(product._id)}
                  className="flex items-center justify-center gap-1 sm:gap-2 
                             bg-primary text-white 
                             px-2 sm:px-3 md:px-4 
                             py-1 sm:py-1.5 
                             rounded-full hover:bg-primary-light transition
                             text-xs sm:text-sm"
                >
                  <img src={assets.cart_icon} alt="cart" className="w-3 h-3 sm:w-4 sm:h-4" />
                  Add
                </button>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2 
                                bg-primary-light/40 rounded-full 
                                px-2 sm:px-3 py-1">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="font-semibold text-primary px-2 text-sm"
                  >
                    -
                  </button>
                  <span className="w-4 sm:w-5 text-center font-semibold text-xs sm:text-sm">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="font-semibold text-primary px-2 text-sm"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
