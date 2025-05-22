import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      navigate("/login");
      return;
    }
    toast.success("Product added to cart", { id: "addToCart" });
  };

  // Helper function to format relative time
  const getRelativeTime = (date) => {
    const now = new Date();
    const created = new Date(date);
    const seconds = Math.floor((now - created) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (let key in intervals) {
      const interval = Math.floor(seconds / intervals[key]);
      if (interval >= 1) {
        return `${interval} ${key}${interval !== 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  };

  return (
    <div className='flex w-full flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg bg-gray-900 p-3 sm:p-5'>

      {/* Relative Time Display */}
      <div className='text-xs text-gray-400 mb-2'>{getRelativeTime(product.createdAt)}</div>

      {/* Image */}
      <div className='relative w-full h-40 sm:h-60 overflow-hidden rounded-md bg-gray-800'>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className='w-full h-full object-cover'
            loading='eager'
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image Available
          </div>
        )}
      </div>

      {/* Info */}
      <div className='mt-3 sm:mt-4'>
        <h5 className='text-base sm:text-xl font-semibold tracking-tight text-white mb-1 truncate'>
          {product.name}
        </h5>
        <p className='text-gray-400 text-sm sm:text-base mb-3 line-clamp-2'>
          {product.description}
        </p>

        <div className='mb-4 flex items-center justify-between'>
          <p className='text-emerald-400 font-bold text-lg sm:text-xl'>
            ₦{product.price.toLocaleString("en-NG")}
          </p>
        </div>

        <button
          className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700'
          onClick={handleAddToCart}
        >
          Add to cart
          <ShoppingCart className='ml-2 h-4 w-4' />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
