import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);

	const { addToCart } = useCartStore();

	// Handle responsive items per page
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(2); // 2 on mobile
			else if (window.innerWidth < 1024) setItemsPerPage(2);
			else if (window.innerWidth < 1280) setItemsPerPage(3);
			else setItemsPerPage(4);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Auto-scroll
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex + itemsPerPage >= featuredProducts.length ? 0 : prevIndex + itemsPerPage
			);
		}, 5000); // every 5 seconds

		return () => clearInterval(interval);
	}, [itemsPerPage, featuredProducts.length]);

	const nextSlide = () => {
		if (currentIndex + itemsPerPage >= featuredProducts.length) return;
		setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
	};

	const prevSlide = () => {
		if (currentIndex === 0) return;
		setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
	};

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex + itemsPerPage >= featuredProducts.length;

	return (
		<div className='py-12'>
			<div className='container mx-auto px-4'>
				<h2 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>Featured</h2>
				<div className='relative'>
					<div className='overflow-hidden'>
						<div
							className='flex transition-transform duration-300 ease-in-out'
							style={{ transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)` }}
						>
							{featuredProducts?.map((product) => (
							<div
	key={product._id}
	className='flex-shrink-0 px-2'
	style={{ width: `${100 / itemsPerPage}%` }}
>
	<div className='bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-emerald-500/30 h-full flex flex-col'>
		<div className='overflow-hidden'>
			<img
				src={product.image}
				alt={product.name}
				className='w-full h-40 object-cover transition-transform duration-300 ease-in-out hover:scale-110'
			/>
		</div>
		<div className='p-3 flex-1 flex flex-col justify-between'>
			<div>
				<h3 className='text-sm sm:text-base font-semibold text-white line-clamp-2 mb-1'>
					{product.name}
				</h3>
				<p className='text-emerald-300 font-medium text-sm sm:text-base mb-2'>
					₦{product.price.toLocaleString()}
				</p>
			</div>
			<button
				onClick={() => addToCart(product)}
				className='w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base py-1.5 px-3 sm:py-2 sm:px-4 rounded transition-colors duration-300 flex items-center justify-center'
			>
				<ShoppingCart className='w-4 h-4 sm:w-5 sm:h-5 mr-1.5' />
				Add to Cart
			</button>
		</div>
	</div>
</div>

							))}
						</div>
					</div>

					<button
						onClick={prevSlide}
						disabled={isStartDisabled}
						className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 z-10 ${
							isStartDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500"
						}`}
					>
						<ChevronLeft className='w-6 h-6' />
					</button>

					<button
						onClick={nextSlide}
						disabled={isEndDisabled}
						className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 z-10 ${
							isEndDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500"
						}`}
					>
						<ChevronRight className='w-6 h-6' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default FeaturedProducts;
