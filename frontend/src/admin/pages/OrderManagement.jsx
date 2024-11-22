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
      const response = await fetch("https://ecommerce-kj7x.onrender.com/api/admin/orders", {
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

   // Function to handle the order status update
   const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`https://ecommerce-kj7x.onrender.com/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Error updating order status");
      }
      alert("order status updated successfully");
      // Fetch the orders again after updating
      fetchOrders();
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
    }
  };

  // Pagination calculation
  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);
  const displayedOrders = filteredOrders.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <>
      <div className="flex bg-gray-100">
        <div className="hidden md:block">
          <SideBar />
        </div>
        <main className="flex-1 p-6 mt-24 grid grid-rows-[auto_1fr_auto]">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search orders by user name"
              className="border border-gray-300 p-2 mb-4 sm:w-full md:w-1/4"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="overflow-x-auto max-w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">
                    User Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Order ID
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Order Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Total Price
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Payment Status
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Shipping Address
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Staus</th>
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
                      {order.createdAt}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.itemsPrice}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.paymentStatus}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.shippingAddress}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className=" bg-gray-100 border-gray-300 p-1 rounded"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Canceled">Canceled</option>
                      </select>
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
      </div>
      {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center">
                    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                </div>
            )}
    </>
  );
};

export default OrderManagement;
