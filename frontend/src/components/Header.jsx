import React from 'react'
import {useState,useContext} from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useCart } from '../context/CartContext';
const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen); // Toggle the nav state
  };
  // toggle between profile and login link //
  const { user } = useContext(UserContext);
  // cart count comes here //
  const { cart } = useCart();
  const cartCount = cart.items?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
  return (
    <>
      <header className="fixed top-0 w-full pb-6 bg-white lg:pb-0 z-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <a href="#" title="" className="flex">
                <img
                  className="w-auto h-8 lg:h-10"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg"
                  alt=""
                />
              </a>
            </div>

            <button
              type="button"
              className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
              onClick={toggleNav}
            >
              <svg
                className={`block w-6 h-6 ${isNavOpen ? "hidden" : "block"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h16M4 16h16"
                />
              </svg>
              <svg
                className={`w-6 h-6 ${isNavOpen ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
              <Link
                to="/"
                title=""
                className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
              >
                {" "}
                Home{" "}
              </Link>

              <Link
                to="/shop"
                title=""
                className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
              >
                {" "}
                Shop{" "}
              </Link>

              <Link
                to="/about"
                title=""
                className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
              >
                {" "}
                About{" "}
              </Link>

              <Link
                to="/contact"
                title=""
                className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
              >
                {" "}
                Contact{" "}
              </Link>
              {user ? (
                <>
                  <Link
                    to="/profile"
                    title=""
                    className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {" "}
                    My Account{" "}
                  </Link>
                  <Link
                    to="/cart"
                    title=""
                    className="relative text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  ><i class="fa-solid fa-cart-shopping"></i></Link>
                  {
                    <span className="absolute right-32 top-5 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-600 rounded-full">
                      {cartCount}
                    </span>
                  }
                </>
              ) : (
                <Link
                  to="/signin"
                  title=""
                  className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  {" "}
                  Login{" "}
                </Link>
              )}
            </div>
          </nav>
          {isNavOpen && (
            <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
              <div className="flow-root">
                <div className="flex flex-col px-6 -my-2 space-y-1">
                  <Link
                    to="/"
                    className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600"
                  >
                    {" "}
                    Home{" "}
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600"
                  >
                    {" "}
                    Shop{" "}
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600"
                  >
                    {" "}
                    About{" "}
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600"
                  >
                    {" "}
                    Contact{" "}
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600"
                  >
                    {" "}
                    Login{" "}
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600"
                  >
                    {" "}
                    Register{" "}
                  </Link>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}

export default Header