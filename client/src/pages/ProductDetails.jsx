import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (products.length > 0 && product) {
      const related = products.filter(
        (item) => item.category === product.category && item._id !== product._id
      );
      setRelatedProducts(related.slice(0, 5));
    }
  }, [products, product]);

  useEffect(() => {
    setThumbnail(product?.image[0] || null);
  }, [product]);

  if (!product) return null;

  return (
    <div className="mt-16 px-6 md:px-16 pb-16">
      
      <p className="text-gray-500 text-sm mb-6">
        <Link to="/" className="hover:underline">Home</Link> /{" "}
        <Link to="/products" className="hover:underline">Products</Link> /{" "}
        <Link to={`/products/${product.category.toLowerCase()}`} className="hover:underline">{product.category}</Link> /{" "}
        <span className="text-primary">{product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.image.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setThumbnail(img)}
                className={`border rounded overflow-hidden cursor-pointer transition ${
                  thumbnail === img ? "border-primary" : "border-gray-300"
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-20 h-20 object-cover" />
              </div>
            ))}
          </div>
          <div className="border border-gray-300 rounded overflow-hidden flex items-center justify-center max-w-[400px]">
            <img src={thumbnail} alt="Selected product" className="object-cover w-full h-full" />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-[var(--color-text-dark)]">{product.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {Array(5).fill("").map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt=""
                className="w-4 h-4"
              />
            ))}
            <span className="text-gray-500 ml-2">(4)</span>
          </div>
          <div className="mt-6">
            <p className="text-gray-500 line-through">MRP: {currency}{product.price}</p>
            <p className="text-2xl font-semibold">{currency}{product.offerPrice}</p>
            <span className="text-gray-500 text-sm">(inclusive of all taxes)</span>
          </div>
          <div className="mt-6">
            <p className="font-medium text-[var(--color-text-dark)] mb-2">About Product</p>
            <ul className="list-disc ml-5 text-gray-600">
              {product.description.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => addToCart(product._id)}
              className="flex-1 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => { addToCart(product._id); navigate("/cart"); }}
              className="flex-1 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dull transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex flex-col items-center w-max mx-auto mb-6">
          <h2 className="text-3xl font-bold text-[var(--color-text-dark)]">Related Products</h2>
          <div className="w-20 h-1 bg-[var(--color-primary)] rounded-full mt-2"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {relatedProducts.filter(p => p.inStock).map((prod) => (
            <ProductCard key={prod._id} product={prod} />
          ))}
        </div>
        <button
          onClick={() => { navigate('/products'); scrollTo(0, 0); }}
          className="mx-auto block mt-10 px-12 py-2.5 border border-primary text-primary rounded-lg hover:bg-primary/10 transition"
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
