const LoadingSpinner = ({ message = "Sophy is preparing your experience..." }) => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white space-y-6 px-4 text-center'>
			{/* Glowing and spinning effect */}
			<div className='relative'>
				<div className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-[4px] sm:border-[5px] md:border-[6px] border-emerald-200 rounded-full opacity-30 animate-ping' />
				<div className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-4 border-emerald-500 border-t-transparent animate-spin rounded-full absolute left-0 top-0' />
			</div>

			{/* Animated and responsive text */}
			<p className='text-emerald-400 text-base sm:text-lg md:text-xl font-semibold tracking-wide animate-bounce'>
				{message}
			</p>
		</div>
	);
};

export default LoadingSpinner;