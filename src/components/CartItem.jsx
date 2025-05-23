import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const formatNaira = (amount) =>
	`₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	return (
		<div className='bg-gray-900 p-5 rounded-xl shadow flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full'>
			{/* Product Image */}
			<div className='shrink-0'>
				<img
					className='h-24 w-24 rounded-lg object-cover'
					src={item.image}
					alt={item.name}
				/>
			</div>

			{/* Product Info and Actions */}
			<div className='flex-1 w-full'>
				{/* Top: Name + Price */}
				<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
					<p className='text-white text-lg font-semibold truncate'>{item.name}</p>
					<p className='text-green-400 text-base font-medium mt-1 sm:mt-0'>
						{formatNaira(item.price)}
					</p>
				</div>

				{/* Stock Status */}
				<div className='flex items-center gap-2 text-sm font-medium mt-2'>
					<span
						className={`h-2 w-2 rounded-full ${
							item.stock > 0 ? "bg-green-400" : "bg-red-400"
						}`}
					></span>
					<span className={item.stock > 0 ? "text-green-400" : "text-red-400"}>
						{item.stock > 0 ? `In stock (${item.stock})` : "Out of stock"}
					</span>
				</div>

				{/* Quantity + Remove Button */}
				<div className='mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
					<div className='flex items-center gap-2'>
						<button
							className='p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 transition'
							onClick={() => updateQuantity(item._id, item.quantity - 1)}
						>
							<Minus className='w-4 h-4' />
						</button>
						<p className='text-white'>{item.quantity}</p>
						<button
							className='p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 transition'
							onClick={() => updateQuantity(item._id, item.quantity + 1)}
						>
							<Plus className='w-4 h-4' />
						</button>
					</div>

					<button
						onClick={() => removeFromCart(item._id)}
						className='p-2 rounded-full bg-red-600 hover:bg-red-500 text-white transition self-start sm:self-auto'
					>
						<Trash className='w-4 h-4' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
