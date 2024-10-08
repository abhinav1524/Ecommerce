import React from 'react'

const Index = () => {
  return (
    <>
    {/* hero section start */}
    <div className="bg-white">
        <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                    <div>
                        <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">A PC Builders</p>
                        <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-6xl">Consult Your Pc Building From the Experts</h1>
                        <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">And Choose Best For You.</p>

                        <a href="#" title="" className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-8 hover:bg-yellow-400 focus:bg-yellow-400" role="button">
                            Join for free
                            <svg className="w-6 h-6 ml-8 -mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </a>

                        <p className="mt-5 text-gray-600">Already joined us? <a href="#" title="" className="text-black transition-all duration-200 hover:underline">Log in</a></p>
                </div>

                <div>
                    <img className="w-full" src="/images/desktop.png" alt="" />
                </div>
            </div>
        </div>
    </section>
    </div>
    {/* card section start here */}
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-end justify-between">
            <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Latest Products</h2>
                <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600 lg:mx-0">Explore Our Latest Products</p>
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-3">
                <button type="button" className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button type="button" className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-10">
            <div className="overflow-hidden bg-white rounded shadow">
                <div className="p-5">
                    <div className="relative">
                        <a href="#" title="" className="block aspect-w-4 aspect-h-3">
                            <img className="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-1.jpg" alt="" />
                        </a>

                        <div className="absolute top-4 left-4">
                            <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full"> Lifestyle </span>
                        </div>
                    </div>
                    <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase"> March 21, 2020 </span>
                    <p className="mt-5 text-2xl font-semibold">
                        <a href="#" title="" className="text-black"> How to build coffee inside your home in 5 minutes. </a>
                    </p>
                    <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                    <a href="#" title="" className="bg-sky-500/100 inline-flex items-center justify-center py-2 px-24 md:px-6 mt-5 rounded-full text-base font-semibold text-white transition-all duration-200 border-b-2 border-transparent hover:bg-sky-500/75">
                        Buy Now
                    </a>
                    <a href="#" title="" className="bg-sky-500/100 inline-flex items-center justify-center 
                    py-2 px-24 md:px-4 mt-5 rounded-full text-base font-semibold text-white transition-all duration-200 border-b-2 border-transparent hover:bg-sky-500/75">
                        Add to Cart
                    </a>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden bg-white rounded shadow">
                <div className="p-5">
                    <div className="relative">
                        <a href="#" title="" className="block aspect-w-4 aspect-h-3">
                            <img className="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-2.jpg" alt="" />
                        </a>

                        <div className="absolute top-4 left-4">
                            <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full"> Marketing </span>
                        </div>
                    </div>
                    <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase"> April 04, 2020 </span>
                    <p className="mt-5 text-2xl font-semibold">
                        <a href="#" title="" className="text-black"> Ho7 Tips to run your remote team faster and better. </a>
                    </p>
                    <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                    <a href="#" title="" className="bg-sky-500/100 inline-flex items-center justify-center py-2 px-24 md:px-6 mt-5 rounded-full text-base font-semibold text-white transition-all duration-200 border-b-2 border-transparent hover:bg-sky-500/75">
                        Buy Now
                    </a>
                    <a href="#" title="" className="bg-sky-500/100 inline-flex items-center justify-center 
                    py-2 px-24 md:px-4 mt-5 rounded-full text-base font-semibold text-white transition-all duration-200 border-b-2 border-transparent hover:bg-sky-500/75">
                        Add to Cart
                    </a>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden bg-white rounded shadow">
                <div className="p-5">
                    <div className="relative">
                        <a href="#" title="" className="block aspect-w-4 aspect-h-3">
                            <img className="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-3.jpg" alt="" />
                        </a>

                        <div className="absolute top-4 left-4">
                            <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full"> Productivity </span>
                        </div>
                    </div>
                    <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase"> May 12, 2020 </span>
                    <p className="mt-5 text-2xl font-semibold">
                        <a href="#" title="" className="text-black"> 5 Productivity tips to write faster at morning. </a>
                    </p>
                    <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                    <a href="#" title="" className="bg-sky-500/100 inline-flex items-center justify-center py-2 px-24 md:px-6 mt-5 rounded-full text-base font-semibold text-white transition-all duration-200 border-b-2 border-transparent hover:bg-sky-500/75">
                        Buy Now
                    </a>
                    <a href="#" title="" className="bg-sky-500/100 inline-flex items-center justify-center 
                    py-2 px-24 md:px-4 mt-5 rounded-full text-base font-semibold text-white transition-all duration-200 border-b-2 border-transparent hover:bg-sky-500/75">
                        Add to Cart
                    </a>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden bg-white rounded shadow">
                <div className="p-5">
                    <div className="relative">
                        <a href="#" title="" className="block aspect-w-4 aspect-h-3">
                            <img className="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-1.jpg" alt="" />
                        </a>

                        <div className="absolute top-4 left-4">
                            <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full"> Lifestyle </span>
                        </div>
                    </div>
                    <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase"> March 21, 2020 </span>
                    <p className="mt-5 text-2xl font-semibold">
                        <a href="#" title="" className="text-black"> How to build coffee inside your home in 5 minutes. </a>
                    </p>
                    <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                    <a href="#" title="" className="bg-sky-500/100 inline-flex items-center justify-center py-2 px-24 md:px-6 mt-5 rounded-full text-base font-semibold text-white transition-all duration-200 border-b-2 border-transparent hover:bg-sky-500/75">
                        Buy Now
                    </a>
                    <a href="#" title="" className="bg-sky-500/100 inline-flex items-center justify-center 
                    py-2 px-24 md:px-4 mt-5 rounded-full text-base font-semibold text-white transition-all duration-200 border-b-2 border-transparent hover:bg-sky-500/75">
                        Add to Cart
                    </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex items-center justify-center mt-8 space-x-3 lg:hidden">
            <button type="button" className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button type="button" className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    </div>
</section>

    </>
  )
}

export default Index