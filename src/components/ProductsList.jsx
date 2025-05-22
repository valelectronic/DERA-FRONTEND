import { motion } from "framer-motion";
import { Trash, Star, Pencil } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useNavigate } from "react-router-dom";


const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();
  const navigate = useNavigate();

	return (
		<motion.div
			className='bg-gray-900 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto w-full p-4'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				{products?.map((product) => (
					<div
						key={product._id}
						className='bg-gray-800 p-5 rounded-xl shadow flex flex-col sm:flex-row sm:items-center gap-5'
					>
						<img
							src={product.image}
							alt={product.name}
               loading="eager"
							className='h-24 w-24 rounded-lg object-cover flex-shrink-0'
						/>

						<div className='flex-1'>
							<div className='text-white text-xl font-semibold truncate'>{product.name}</div>
							<div className='text-green-400 text-base mt-1'>
								{new Intl.NumberFormat("en-NG", {
									style: "currency",
									currency: "NGN",
									minimumFractionDigits: 2,
								}).format(product.price)}
							</div>
						<div className='flex items-center gap-2 text-sm mt-1 font-medium'>
  <span
    className={`h-2 w-2 rounded-full ${
      product.stock > 0 ? "bg-green-400" : "bg-red-400"
    }`}
  ></span>
  <span className={product.stock > 0 ? "text-green-400" : "text-red-400"}>
    {product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}
  </span>
</div>


							<div className='flex items-center gap-4 mt-4'>
								<button
									onClick={() => toggleFeaturedProduct(product._id)}
									className={`p-2 rounded-full ${
										product.isFeatured
											? "bg-yellow-400 text-gray-900"
											: "bg-gray-600 text-gray-300"
									} hover:bg-yellow-500 transition-colors duration-200`}
								>
									<Star className='h-5 w-5' />
								</button>

								 <button
                  onClick={() => navigate(`/EditingPage/${product._id}`)}  // <-- navigate here
                  className='text-blue-400 hover:text-blue-300 p-2'
                >
                  <Pencil className='h-5 w-5' />
                </button>

								<button
									onClick={() => deleteProduct(product._id)}
									className='text-red-400 hover:text-red-300 p-2'
								>
									<Trash className='h-5 w-5' />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</motion.div>
	);
};

export default ProductsList;
