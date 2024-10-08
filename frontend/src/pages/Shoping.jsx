import React from 'react'

const Shoping = () => {
  return (
    <>
  <main class="max-w-7xl mx-auto p-4 mt-24 space-y-8 lg:space-y-0 lg:flex lg:space-x-8">
  <aside class="w-full lg:w-1/4">
    <div class="bg-white p-4 rounded-lg shadow-md mb-6 lg:mb-0">
      <h2 class="font-bold mb-4">Filter by Price</h2>
      <div class="flex space-x-2 mb-4">
        <input type="text" placeholder="Min - 00" class="border rounded p-2 w-full"/>
        <input type="text" placeholder="Max - 5k" class="border rounded p-2 w-full"/>
      </div>
      <button class="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600">Search</button>
    </div>
    <div class="bg-white p-4 rounded-lg shadow-md  mt-6">
      <h2 class="font-bold mb-4">Filter by Brand</h2>
      <input type="text" placeholder="Search..." class="border rounded p-2 w-full mb-4"/>
      <div class="max-h-40 overflow-y-auto">
        <label class="flex items-center space-x-2 mb-2">
          <input type="checkbox" class="form-checkbox h-4 w-4"/>
          <span>Mani Gold (18)</span>
        </label>
        <label class="flex items-center space-x-2 mb-2">
          <input type="checkbox" class="form-checkbox h-4 w-4"/>
          <span>Tredar (28)</span>
        </label>
      </div>
      <button class="bg-green-500 text-white w-full py-2 rounded mt-4 hover:bg-green-600">
        <i class="fas fa-trash-alt mr-2"></i>Clear Filter
      </button>
    </div>
  </aside>
  
  <section class="w-full lg:w-3/4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div class="bg-white p-4 rounded-lg shadow-md relative h-[320px]">
      <span class="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">New</span>
      <img src="/images/Dell.png" alt="Product" class="mx-auto mb-4 max-h-32"/>
      <div class="text-center">
        <i class="fa-solid fa-star text-yellow-500"></i>
        <i class="fa-solid fa-star text-yellow-500"></i>
        <i class="fa-solid fa-star text-yellow-500"></i>
        <i class="fa-solid fa-star text-yellow-500"></i>
        <i class="fa-solid fa-star-half-stroke text-yellow-500"></i>
      </div>
      <h3 class="font-medium text-lg mb-2 text-center">Dell Screen</h3>
      <div class="flex justify-center items-center mb-2">
        <span class="line-through text-gray-400">$34</span>
        <span class="ml-2 text-green-500">$28/piece</span>
      </div>
      <div class="flex justify-between items-center">
          <button class="bg-green-500 text-white w-full text-lg md:text-base px-4 py-2 rounded hover:bg-green-600 custom_btn">Buy Now <i class="fa-solid fa-cart-shopping"></i></button>
      </div>

    </div>
  </section>
</main>
    </>
  )
}

export default Shoping