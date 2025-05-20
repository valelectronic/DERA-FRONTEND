import React from 'react'
import CategoryItem from '../components/CategoryItem';

const categories = [
	{ href: "/earPod", name: "earPod", imageUrl: "/earpod.jpg" },
	{ href: "/keyboard", name: "keyboard", imageUrl: "/keyboard.jpg" },
	{ href: "/lapStand", name: "laptop Stand", imageUrl: "/laptopStand.jpg" },
	{ href: "/leadStrip", name: "lead strip", imageUrl: "/leadStrip.jpg" },
	{ href: "/powerbank", name: "powerbank", imageUrl: "/powerbank.jpg" },
	{ href: "/projector", name: "mini projector", imageUrl: "/projector.jpg" },
	{ href: "/smartWatch", name: "smartWatch", imageUrl: "/smartWatch.jpg" },
	{ href: "/usbHub", name: "usbHub", imageUrl: "/usbHub.jpg" },
	{ href: "/wirelessCharger", name: "wireless charger", imageUrl: "/wirelessCharger.jpg" },
];

function HomePage() {
	return (
		<div className='relative min-h-screen text-white overflow-hidden bg-gray-950'>
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


			</div>
		</div>
	);
}

export default HomePage;
