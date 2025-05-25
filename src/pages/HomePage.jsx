import React from 'react'
import { useEffect } from 'react';
import CategoryItem from '../components/CategoryItem';
import { useProductStore } from '../stores/useProductStore';
import FeaturedProducts from '../components/FeaturedProducts';
const categories = [
	{ href: "/earPod", name: "earPod", imageUrl: "/earpod.jpg" },
	{ href: "/keyboard", name: "keyboard", imageUrl: "/keyboard.jpg" },
	{ href: "/laptopStand", name: "laptop Stand", imageUrl: "/laptopStand.jpg" },
	{ href: "/leadStrip", name: "lead strip", imageUrl: "/leadStrip.jpg" },
	{ href: "/powerbank", name: "powerbank", imageUrl: "/powerbank.jpg" },
	{ href: "/projector", name: "mini projector", imageUrl: "/projector.jpg" },
	{ href: "/smartWatch", name: "smartWatch", imageUrl: "/smartWatch.jpg" },
	{ href: "/usbHub", name: "usbHub", imageUrl: "/usbHub.jpg" },
	{ href: "/wirelessCharger", name: "wireless charger", imageUrl: "/wirelessCharger.jpg" },
];

function HomePage() {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden '>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
				<h1 className='text-center text-3xl sm:text-5xl font-bold text-emerald-400 mb-3 sm:mb-6'>
					Explore Our Categories
				</h1>
				<p className='text-center text-base sm:text-xl text-gray-300 mb-8 sm:mb-12'>
					Discover the latest trends in eco-friendly tech gadgets and accessories.
				</p>

		<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 justify-items-center">
  {categories.map((category) => (
    <CategoryItem category={category} key={category.name} />
  ))}
</div>
{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}


			</div>
		</div>
	);
}

export default HomePage;
