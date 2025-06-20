import {Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./pages/HomePage";
import  SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPages";
import Navbar from "./components/Navbar";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { Toaster } from "react-hot-toast";
import { useEffect} from "react";
import {useUserStore} from "./stores/useUserStore";
import LoadingSpinner from "./components/LoadingSpinner";
import AdminPage from "./pages/AdminPage";
import EditingPage from "./pages/EditingPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import CheckoutPage from "./pages/CheckoutPage";
import CustomerSupportButton from "./components/CustomerSupport";







function App() {


  const {checkAuth,user, checkingAuth} = useUserStore()
  const {getCartItems} = useCartStore()

 useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);
 

  useEffect(() => {
    const checkUserAuth = async () => {
      await checkAuth();
    };

    checkUserAuth();
  }, [checkAuth]);

  if (checkingAuth) return <LoadingSpinner/>

  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden
'>
			{/* Background gradient */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
		<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
				</div>
			</div>

			<div className='relative z-50 pt-20'>
    <Navbar/>


     
    <Routes>
  
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={!user ? <SignUpPage />: <Navigate to = "/"/>} /> 
      <Route path="/login" element={!user ? <LoginPage />: <Navigate to = "/"/> } />
      <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
      <Route path="/admin-dashboard" element={user?.role === "admin" ? <AdminPage/>: <Navigate to = "/"/>} />
      <Route path="/editingPage/:id" element={user && user.role === 'admin'? <EditingPage/>: <Navigate to = "/"/>} />
       <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/cart" element={user ? <CartPage />: <Navigate to = "/login"/>} />
      <Route path="/Checkout" element={user ? <CheckoutPage />: <Navigate to = "/login"/>} />
     
    </Routes>
    
    </div>
  
    <Toaster/>
     <CustomerSupportButton/>
     
    </div>
  )
}

export default App
