import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Loader, Send } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");
		setError("");

		try {
			// You will replace this with your backend API call
			console.log("Sending OTP to:", email);
			await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay

			setMessage("If your email exists, instructions have been sent.");
            setEmail(""); // ✅ Clear the email field after success
		} catch (err) {
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 bg-gray-900'>
	<motion.div
		className='w-full max-w-sm'
		initial={{ opacity: 0, y: -20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.8 }}
	>
		<h2 className='text-center text-3xl font-extrabold text-emerald-400'>Forgot Password</h2>
		<p className='mt-2 text-center text-sm text-gray-400'>
			Enter your email and we’ll send you a reset link.
		</p>

		<motion.div
			className='mt-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, delay: 0.2 }}
		>
			<div className='bg-gray-800 py-8 px-4 sm:px-6 shadow rounded-lg'>
				<form onSubmit={handleSubmit} className='space-y-6'>
					{/* Email Input */}
					<div>
						<label htmlFor='email' className='block text-sm font-medium text-gray-300'>
							Email address
						</label>
						<div className='mt-1 relative rounded-md shadow-sm'>
							<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
								<Mail className='h-5 w-5 text-gray-400' />
							</div>
							<input
								id='email'
								type='email'
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
								rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
								focus:border-emerald-500 sm:text-sm'
								placeholder='you@example.com'
							/>
						</div>
					</div>

					{/* Submit Button */}
					<button
						type='submit'
						className='w-full flex justify-center py-2 px-4 border border-transparent 
						rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
						hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
						focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
						disabled={loading}
					>
						{loading ? (
							<>
								<Loader className='mr-2 h-5 w-5 animate-spin' />
								Sending...
							</>
						) : (
							<>
								<Send className='mr-2 h-5 w-5' />
								Send Reset Link
							</>
						)}
					</button>

					{/* Feedback */}
					{message && <p className='text-green-400 text-sm text-center'>{message}</p>}
					{error && <p className='text-red-400 text-sm text-center'>{error}</p>}
				</form>

				<div className='mt-6 text-center'>
					<Link
						to='/login'
						className='text-sm text-emerald-400 hover:text-emerald-300 flex justify-center items-center gap-1'
					>
						<ArrowLeft className='h-4 w-4' />
						Back to Login
					</Link>
				</div>
			</div>
		</motion.div>
	</motion.div>
</div>

	);
};

export default ForgotPasswordPage;
