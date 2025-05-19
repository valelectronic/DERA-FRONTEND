// App.jsx or Layout.jsx (where routes are rendered)
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Loader } from "lucide-react"; // or your preferred spinner

const AppLayout = ({ children }) => {
	const location = useLocation();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		// Simulate loading time
		const timeout = setTimeout(() => {
			setLoading(false);
		}, 800); // adjust duration as needed

		return () => clearTimeout(timeout);
	}, [location.pathname]);

	return (
		<div className='relative'>
			{loading && (
				<div className='fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center'>
					<Loader className='h-10 w-10 text-emerald-400 animate-spin' />
				</div>
			)}

			{/* Main content */}
			<div className={loading ? "pointer-events-none opacity-50" : ""}>{children}</div>
		</div>
	);
};

export default AppLayout;
