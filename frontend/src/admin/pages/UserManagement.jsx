import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import ReactPaginate from 'react-paginate';
const UserManagement = () => {
  const [users, setusers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const token = localStorage.getItem("jwt"); // Retrieve your token
  // fetch category //
  const fetchUser = async () => {
    try {
      const response = await fetch("https://ecommerce-kj7x.onrender.com/api/admin/users/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching products");
      }
      const data = await response.json();
      // console.log(data);
      setusers(data.users);
      setFilteredUsers(data.users);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setLoading(false);
    }
  };
  // Fetch Category only once on component mount
  useEffect(() => {
    fetchUser();
  }, []);
      // Effect to filter users based on the search term
      useEffect(() => {
        const filtered = users.filter((user) =>
          user.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered); // Update filtered users
        setCurrentPage(0);
      }, [users, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  // change the order status //
  const handleStatusChange = async (userId, newStatus) => {
    // Make API call to update the order status
    try {
      const response = await fetch(
        `https://ecommerce-kj7x.onrender.com/api/admin/users/${userId}/toggle-block`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Make sure token is available in scope
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update block status");
      }
      console.log("User status updated successfully!");
      fetchUser();
    } catch (error) {
      console.error("Error updating user status:", error);
      // Optionally revert the status change in case of an error
    }
  };
  // caluculatig the page 
  // Calculate pagination details
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handlePageClick = (event) => {
      setCurrentPage(event.selected);
  };
  return (
    <>
      <div className="flex h-screen bg-gray-100">
      <div className="hidden md:block">
        <SideBar />
      </div>
        <main className="flex-1 p-6 mt-24 grid grid-rows-[auto_1fr_auto]">
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search products"
              className="border border-gray-300 p-2 mb-4 sm:w-full md:w-1/4"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">UserId</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone No</th>
                <th className="border border-gray-300 px-4 py-2">
                  Blocked Status
                </th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((user) => (
                <tr key={user._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {user._id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.phoneNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.isBlocked ? "Blocked" : "UnBlock"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleStatusChange(user._id)}
                      className={`font-bold py-2 px-3 rounded ${
                        user.isBlocked ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"
                    } text-white`}
                    >
                      {user.isBlocked ? (
                            <i className="fa-solid fa-lock"></i> // Lock icon when blocked
                        ) : (
                            <i className="fa-solid fa-lock-open"></i> // Unlock icon when unblocked
                        )}
                    </button>
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
        // activeClassName="bg-blue-500 text-white"
      />
    </div>
        </main>
      </div>
      {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center">
                    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                </div>
            )}
    </>
  );
};

export default UserManagement;
