import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import SideBar from "../components/SideBar";
import CategoryModal from "../models/CategoryModel";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryIdToEdit, setCategoryIdToEdit] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const categoriesPerPage = 5;

  const token = localStorage.getItem("jwt");

  // Fetch category data
  const fetchCategory = async () => {
    try {
      const response = await fetch("https://ecommerce-kj7x.onrender.com/api/admin/category/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching categories");
      }
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Reset to page 1 on search
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredCategories.length / categoriesPerPage);
  const currentCategories = filteredCategories.slice(
    currentPage * categoriesPerPage,
    (currentPage + 1) * categoriesPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleModalOpen = (categoryId = null) => {
    setCategoryIdToEdit(categoryId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCategoryIdToEdit(null);
    fetchCategory();
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(
          `https://ecommerce-kj7x.onrender.coms/api/admin/category/${categoryId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete category");
        }

        fetchCategory();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:block">
        <SideBar />
      </div>
      <main className="flex-1 p-6 mt-24">
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search categories"
            className="border border-gray-300 p-2 mb-4 sm:w-full md:w-1/4"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            onClick={() => handleModalOpen(null)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Category Name</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((category) => (
              <tr key={category.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {category.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex justify-around items-center">
                    <button
                      onClick={() => handleModalOpen(category._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-2"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
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
        {/* Pagination Controls */}
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
          activeClassName="bg-blue-500 text-white"
        />
        </div>
      </main>
      <CategoryModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        categoryIdToEdit={categoryIdToEdit}
      />
    </div>
  );
};

export default CategoryManagement;
