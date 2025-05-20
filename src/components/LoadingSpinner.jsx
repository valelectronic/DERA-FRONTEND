import { useEffect, useState } from "react";

const quotes = [
	"Great things take time — stay with us.",
	"Success is not final, failure is not fatal. Keep going.",
	"Patience is not the ability to wait, but how you act while waiting.",
	"Loading... just like dreams take time to build.",
	"Even the stars need time to shine — almost there.",
	"Stay calm. Magic is loading.",
	"Believe in the process. Good things are coming.",
	"You’re not stuck — you’re growing.",
];

const LoadingSpinner = () => {
	const [quote, setQuote] = useState("");

	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * quotes.length);
		setQuote(quotes[randomIndex]);
	}, []);

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white space-y-6'>
			<div className='relative'>
				<div className='w-20 h-20 border-emerald-200 border-2 rounded-full' />
				<div className='w-20 h-20 border-emerald-500 border-t-2 animate-spin rounded-full absolute left-0 top-0' />
			</div>
			<p className='text-emerald-400 text-center text-lg font-medium px-4 animate-pulse'>
				{quote}
			</p>
		</div>
	);
};

export default LoadingSpinner;
