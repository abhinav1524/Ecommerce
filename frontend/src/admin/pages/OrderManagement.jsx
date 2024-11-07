import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import ReactPaginate from "react-paginate";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Number of items per page
  const token = localStorage.getItem("jwt");

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/orders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching orders");
      }
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrders = orders.filter((order) =>
    order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Pagination calculation
  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);
  const displayedOrders = filteredOrders.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <SideBar />
        <main className="flex-1 p-6 mt-24">
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search orders by user name"
              className="border border-gray-300 p-2 mb-4 sm:w-full md:w-1/4"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">User Name</th>
                <th className="border border-gray-300 px-4 py-2">Order ID</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedOrders.map((order) => (
                <tr key={order._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.user?.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order._id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {/* Add actions here */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
      </div>
    </>
  );
};

export default OrderManagement;
