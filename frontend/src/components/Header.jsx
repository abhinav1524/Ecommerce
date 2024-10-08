import React from 'react'
import {useState} from 'react'
const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen); // Toggle the nav state
  };
  return (
    <>
  <header className="fixed top-0 w-full pb-6 bg-white lg:pb-0 z-50">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
                <a href="#" title="" className="flex">
                    <img className="w-auto h-8 lg:h-10" src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg" alt="" />
                </a>
            </div>

            <button type="button" className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100" onClick={toggleNav}>
                <svg className={`block w-6 h-6 ${isNavOpen ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                </svg>
                <svg className={`w-6 h-6 ${isNavOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
                <a href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Home </a>

                <a href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Shop </a>

                <a href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> About </a>

                <a href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Contact </a>

                <a href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Login </a>

                <a href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Register </a>
            </div>
        </nav>
        {isNavOpen && (
        <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
          <div className="flow-root">
            <div className="flex flex-col px-6 -my-2 space-y-1">
              <a href="#" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600"> Home </a>
              <a href="#" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600"> Shop </a>
              <a href="#" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600"> About </a>
              <a href="#" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600"> Contact </a>
              <a href="#" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600"> Login </a>
              <a href="#" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600"> Register </a>
            </div>
          </div>
        </nav>
      )}
    </div>
</header>

    </>
  )
}

export default Header