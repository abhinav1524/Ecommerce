import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import SideBar from "../components/SideBar";
import { useProducts } from "../../context/ProductContext";
import ProductModal from "../models/ProductModel";

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIdToEdit, setProductIdToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Set the number of items per page

  // fetching the products
  const { products, fetchProducts, loading, error } = useProducts();
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Handle search functionality
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Reset to first page on new search
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current items based on pagination
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);

  // Handle page click for pagination
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Add modal open and close
  const handleModalOpen = (productId = null) => {
    setProductIdToEdit(productId);
    setIsModalOpen(true);
  };

  const handleModalClose = async () => {
    setIsModalOpen(false);
    setProductIdToEdit(null);
    await fetchProducts();
  };

  // Delete product function
  const handleDelete = async (productId) => {
    const token = localStorage.getItem("jwt");
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/product/${productId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete product");
        }

        await fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };
 // Pagination calculation
 const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
 const displayedOrders = filteredProducts.slice(
   currentPage * itemsPerPage,
   (currentPage + 1) * itemsPerPage
 );

  return (
    <>
      <div className="flex  bg-gray-100">
      <div className="hidden md:block">
        <SideBar />
      </div>
        <main className="flex-1 p-6 mt-24 grid grid-rows-[auto_1fr_auto]">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search products"
              className="border border-gray-300 p-2 sm:w-full md:w-1/4"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              onClick={() => handleModalOpen()}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-3 py-1">Name</th>
                <th className="border border-gray-300 px-3 py-1">Description</th>
                <th className="border border-gray-300 px-3 py-1">Price</th>
                <th className="border border-gray-300 px-3 py-1">Brand</th>
                <th className="border border-gray-300 px-3 py-1">Category</th>
                <th className="border border-gray-300 px-3 py-1">Stock</th>
                <th className="border border-gray-300 px-3 py-1">Images</th>
                <th className="border border-gray-300 px-3 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedOrders.map((product) => (
                <tr key={product.id}>
                  <td className="border border-gray-300 px-3 py-1">{product.name}</td>
                  <td className="border border-gray-300 px-3 py-1">{product.description}</td>
                  <td className="border border-gray-300 px-3 py-1">{product.price}</td>
                  <td className="border border-gray-300 px-3 py-1">{product.brand}</td>
                  <td className="border border-gray-300 px-3 py-1">{product.category}</td>
                  <td className="border border-gray-300 px-3 py-1">{product.stock}</td>
                  <td className="border border-gray-300 px-3 py-1">
                    <div className="flex gap-2 sm:flex-wrap">
                      {product.images.map((imageUrl, index) => (
                        <img
                          key={index}
                          src={`http://localhost:5000/${imageUrl}`}
                          alt={`Product Image ${index + 1}`}
                          className="w-5 h-5"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="border border-gray-300 px-3 py-1">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => handleModalOpen(product._id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-2"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="flex justify-center mt-4">
          <ReactPaginate
            nextLabel=">>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="<<"
            containerClassName="flex space-x-2"
            pageClassName="page-item"
            pageLinkClassName="page-link px-3 py-1 border border-gray-300 rounded"
            previousClassName="page-item"
            previousLinkClassName="page-link px-3 py-1 border border-gray-300 rounded"
            nextClassName="page-item"
            nextLinkClassName="page-link px-3 py-1 border border-gray-300 rounded"
          />
          </div>
        </main>
        <ProductModal
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          productIdToEdit={productIdToEdit}
        />
      </div>
    </>
  );
};

export default ProductManagement;
