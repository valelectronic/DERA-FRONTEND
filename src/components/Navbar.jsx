import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Menu } from "lucide-react"
import { useUserStore } from '../stores/useUserStore';
import { useCartStore } from '../stores/useCartStore';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cart } = useCartStore();


const {user,logout} = useUserStore();  
  const isAdmin = user?.role === "admin"; // Replace with actual admin check logic
    // Replace with actual user authentication logic

  return (
    <header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-50 transition-all duration-300 border-b border-emerald-800'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        
       <Link
  to='/'
  className='flex items-center space-x-3 group transition duration-300 ease-in-out'
>
  <img
    src='/logo.png'
    alt='Logo'
    className='h-10 w-10 object-cover rounded-full transform group-hover:scale-110 transition duration-300 ease-in-out'
  />
  <span className='text-xl sm:text-2xl font-extrabold text-emerald-400 group-hover:text-white transition duration-300 ease-in-out'>
    SOPHY-STORE
  </span>
</Link>

        {/* Desktop Navigation */}
        <nav className='hidden sm:flex items-center gap-4'>
          <Link
            to={"/"}
            className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'
          >
            Home
          </Link>
          {user && (
            <Link
              to={"/cart"}
              className='relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'
            >
              <ShoppingCart className='inline-block mr-1 group-hover:text-emerald-400' size={20} />
             	<span className='hidden sm:inline'>Cart</span>
								{cart.length > 0 && (
									<span
										className='absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'
									>
										{cart.length}
									</span>
								)}
            </Link>
          )}
          {isAdmin && (
            <Link
              className='bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
                transition duration-300 ease-in-out flex items-center'
              to={"/Admin-dashboard"}
            >
              <Lock className='inline-block mr-1' size={18} />
              <span>Dashboard</span>
            </Link>
          )}

          {user ? (
            <button
            
              className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
              rounded-md flex items-center transition duration-300 ease-in-out'
              onClick={logout}
            >
              <LogOut size={16} />
              <span className='ml-2'>Log Out</span>
            </button>
          ) : (
            <>
              <Link
                to={"/signup"}
                className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 
                rounded-md flex items-center transition duration-300 ease-in-out'
              >
                <UserPlus className='mr-2' size={18} />
                Sign Up
              </Link>
              <Link
                to={"/login"}
                className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
                rounded-md flex items-center transition duration-300 ease-in-out'
              >
                <LogIn className='mr-2' size={18} />
                Login
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className='sm:hidden text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>

        {/* Mobile Slide-in Menu */}
        <div
          className={`sm:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-gray-900 bg-opacity-95 backdrop-blur-md shadow-lg transition-transform duration-300 ease-in-out z-50 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-red-400 text-3xl font-bold"
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>
          <nav className='flex flex-col gap-6 px-6 py-4 text-lg'>
            <Link
              to='/'
              className='text-gray-300 hover:text-emerald-400 transition'
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            {user && (
              <Link
                to='/cart'
                className='relative text-gray-300 hover:text-emerald-400 transition'
                onClick={() => setMobileMenuOpen(false)}
              >
               <ShoppingCart className='inline-block mr-1 group-hover:text-emerald-400' size={20} />
								<span className='hidden sm:inline'>Cart</span>
								{cart.length > 0 && (
									<span
										className='absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'
									>
										{cart.length}
									</span>
								)}
              </Link>
            )}

            {isAdmin && (
              <Link
                to='/Admin-dashboard'
                className='bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-2 rounded-md font-medium transition'
                onClick={() => setMobileMenuOpen(false)}
              >
                <Lock className='inline-block mr-2' size={18} />
                Dashboard
              </Link>
            )}

            {user ? (
              <button
                className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition'
                onClick={() => {
                  logout()
                  setMobileMenuOpen(false)
                }}
              
              >
                <LogOut size={18} />
                <span className='ml-2'>Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to='/signup'
                  className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserPlus className='mr-2' size={18} />
                  Sign Up
                </Link>
                <Link
                  to='/login'
                  className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn className='mr-2' size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
