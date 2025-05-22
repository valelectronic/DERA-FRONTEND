import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate} from "react-router-dom";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  
    
const Navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      Navigate("/login");
      return;
    } else {
        toast.success("Product added to cart", { id: "addToCart" });
      console.log("Product added to cart");
    }
  };
  


  return (
    <div className='flex w-full flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg'>
      {/* Image */}
      <div className='relative w-full h-60 overflow-hidden rounded-t-lg bg-gray-800'>
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
      <div className='mt-4 px-5 pb-5'>
        <h5 className='text-xl font-semibold tracking-tight text-white'>{product.name}</h5>
        <div className='mt-2 mb-5 flex items-center justify-between'>
          <p className='text-emerald-400 font-bold text-xl'>
            ₦{product.price.toLocaleString("en-NG")}
          </p>
        </div>
        <button
          className='flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700'
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
