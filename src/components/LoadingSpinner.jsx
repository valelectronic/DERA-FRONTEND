const LoadingSpinner = ({ message = "Sophy is preparing your experience..." }) => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white space-y-6'>
			{/* Glowing and spinning effect */}
			<div className='relative'>
				<div className='w-24 h-24 border-[6px] border-emerald-200 rounded-full opacity-30 animate-ping' />
				<div className='w-24 h-24 border-4 border-emerald-500 border-t-transparent animate-spin rounded-full absolute left-0 top-0' />
			</div>

			{/* Animated text */}
			<p className='text-emerald-400 text-xl font-bold tracking-wide animate-bounce'>
				{message}
			</p>
		</div>
	);
};
