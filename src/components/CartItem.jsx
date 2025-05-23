import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const formatNaira = (amount) =>
	`₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	return (
		<div className='rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6'>
			<div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
				{/* Product Image (Back to left edge) */}
				<div className='shrink-0 flex justify-start'>
					<img
						className='h-20 w-20 md:h-32 md:w-32 rounded object-cover'
						src={item.image}
						alt={item.name}
					/>
				</div>

				{/* Product Info */}
				<div className='w-full min-w-0 flex-1 space-y-2'>
					<p className='text-base font-medium text-white hover:text-emerald-400 hover:underline'>
						{item.name}
					</p>
					<p className='text-sm text-gray-400'>In Stock: {item.stock}</p>
					<div className='flex items-center gap-4'>
						<button
							className='inline-flex items-center text-sm font-medium text-red-400 hover:text-red-300 hover:underline'
							onClick={() => removeFromCart(item._id)}
						>
							<Trash className='w-4 h-4 mr-1' />
							Remove
						</button>
					</div>
				</div>

				{/* Quantity & Price */}
				<div className='flex items-center justify-between md:flex-col md:items-end md:gap-4'>
					<div className='flex items-center gap-2'>
						<button
							className='inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600'
							onClick={() => updateQuantity(item._id, item.quantity - 1)}
						>
							<Minus className='text-gray-300 w-4 h-4' />
						</button>
						<p className='text-white'>{item.quantity}</p>
						<button
							className='inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600'
							onClick={() => updateQuantity(item._id, item.quantity + 1)}
						>
							<Plus className='text-gray-300 w-4 h-4' />
						</button>
					</div>

					<p className='text-base font-bold text-emerald-400'>
						{formatNaira(item.price)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
