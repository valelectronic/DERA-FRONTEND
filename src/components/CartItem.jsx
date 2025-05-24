import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const formatNaira = (amount) =>
	`₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	return (
		<div className='bg-gray-900 p-5 rounded-xl shadow-md w-full'>
  <div className='flex flex-col sm:flex-row gap-5 sm:gap-6 items-center'>
    {/* Product Image */}
    <div className='mx-auto sm:mx-0'>
      <img
        className='h-32 w-32 sm:h-24 sm:w-24 rounded-lg object-cover'
        src={item.image}
        alt={item.name}
      />
    </div>

    {/* Product Info and Actions */}
    <div className='flex-1 w-full flex flex-col gap-4'>
      {/* Name + Price */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-center sm:text-left'>
        <p className='text-white text-lg font-semibold truncate'>{item.name}</p>
        <p className='text-green-400 text-base font-medium'>
          {formatNaira(item.price)}
        </p>
      </div>

      {/* Stock Status */}
      <div className='flex items-center justify-center sm:justify-start gap-2 text-sm font-medium'>
        <span
          className={`h-2 w-2 rounded-full ${
            item.stock > 0 ? "bg-green-400" : "bg-red-400"
          }`}
        ></span>
        <span className={item.stock > 0 ? "text-green-400" : "text-red-400"}>
          {item.stock > 0 ? `In stock (${item.stock})` : "Out of stock"}
        </span>
      </div>

      {/* Quantity and Remove */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div className='flex justify-center sm:justify-start items-center gap-4'>
          <button
            className='p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 transition'
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
          >
            <Minus className='w-5 h-5' />
          </button>
          <p className='text-white text-lg'>{item.quantity}</p>
          <button
            className='p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 transition'
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
          >
            <Plus className='w-5 h-5' />
          </button>
        </div>

        <div className='flex justify-center sm:justify-end'>
          <button
            onClick={() => removeFromCart(item._id)}
            className='p-3 rounded-full bg-red-600 hover:bg-red-500 text-white transition'
          >
            <Trash className='w-5 h-5' />
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

	);
};

export default CartItem;
