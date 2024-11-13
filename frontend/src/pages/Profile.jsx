import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext"; // Ensure UserContext is imported
import Modal from "../model/Model";
import axios from "axios";
import AddAddress from "../model/AddressModel";
const Profile = () => {
  const { user, setUser, logout } = useContext(UserContext); // Make sure to include logout from context
  // console.log(user);
  const [addresses, setAddresses] = useState([]);
  const [addressToEdit, setAddressToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // Load user data from localStorage if it's not in context
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, [user, setUser]);

  // Display loading message if user is not set yet
  if (!user) {
    return <p>Loading Profile...</p>; // You can replace this with a spinner or something else if needed
  }

  // Logout functionality
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        credentials: "include", // Include cookies if necessary for your app
      });

      if (response.ok) {
        // Call the logout function from context
        logout(); // This will clear the user from the context and localStorage
        localStorage.removeItem("user"); // Clear user data from localStorage
        window.location.href = "/signin"; // Redirect to login page after logout
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  // tab system functionality //
  const [activeTab, setActiveTab] = useState("orders");
  // Fetch all Orders on initial load //
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/all-orders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        // console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);
  // Fetch all addresses on initial load
  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        "http://localhost:5000/api/users/shipping-address",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, []);

  // Open modal to add a new address
  const handleAddAddress = () => {
    setAddressToEdit(null); // Clear edit data for a new address
    setIsAddressModalOpen(true);
  };

  // Open modal for editing an address
  const handleEditAddress = (address) => {
    setAddressToEdit(address); // Set data to edit
    setIsAddressModalOpen(true);
  };

  // Submit address data (add or update)
  const handleAddressSubmit = async (addressData) => {
    try {
      let response;
      const token = localStorage.getItem("jwt");
      if (addressToEdit) {
        // Update existing address
        response = await axios.put(
          `http://localhost:5000/api/users/update-shipping-address/${addressToEdit._id}`,
          addressData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        handleAddressChange(response.data);
      } else {
        // Add new address
        response = await axios.post(
          "http://localhost:5000/api/users/add-shipping-address",
          addressData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        handleAddressChange(response.data);
      }
      fetchAddresses();
      setIsAddressModalOpen(false); // Close modal after submission
    } catch (error) {
      console.error("Error submitting address:", error);
    }
  };

  // Update addresses in the state
  const handleAddressChange = (updatedAddress) => {
    if (addressToEdit) {
      setAddresses((prev) =>
        prev.map((address) =>
          address._id === updatedAddress._id ? updatedAddress : address
        )
      );
    } else {
      setAddresses((prev) => [...prev, updatedAddress]);
    }
  };

  // Delete an address
  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        const token = localStorage.getItem("jwt");
        await axios.delete(
          `http://localhost:5000/api/users/delete-shipping-address/${addressId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAddresses((prev) =>
          prev.filter((address) => address._id !== addressId)
        );
      } catch (error) {
        console.error("Error deleting address:", error);
      }
    }
  };
  const accountDetails = {
    username: "user123",
    email: "user@example.com",
  };

  // const handleBuyAgain = (orderId) => {
  //   console.log(`Buying again for order ID: ${orderId}`);
  // };

  // const handleViewProduct = (product) => {
  //   console.log(`Viewing product: ${product}`);
  // };

  const handleDeleteAccount = () => {
    alert("your account deleted successfully");
    // console.log("Account deleted");
  };
  // profile model open and close //
  useEffect(() => {
    // Check if user data exists in local storage
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser)); // Initialize context with local storage data
      setLoading(false);
    } else {
      // Fetch user details from the backend if not in local storage
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/users/details"
          );
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data)); // Store in local storage
        } catch (err) {
          setError("Error fetching user details");
        } finally {
          setLoading(false);
        }
      };
      fetchUserDetails();
    }
  }, [user.id]);

  const handleEditProfile = async (updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/edit/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json(); // Get the updated user data from response
      setUser(updatedUser); // Update the user context with new data
      localStorage.setItem("user", JSON.stringify(updatedUser));
      // refetch the user details after updating //
      await fetchUserDetails();
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-14 mb-10 flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm p-6 mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col items-center space-y-4">
        <img
          src="https://i.pravatar.cc/150"
          alt="User Avatar"
          className="w-28 h-28 rounded-full shadow-md"
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">Name </span>
            <h2 className="text-xl text-gray-600 font-semibold dark:text-white capitalize">
              {user.name}
            </h2>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Email </span>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Phone No </span>
            <p className="text-gray-600 dark:text-gray-400">
              {user.phoneNumber}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Address </span>
            <p className="text-gray-600 truncate w-48 dark:text-gray-400">
              {user.address}
            </p>
          </div>
        </div>
        <div className="flex justify-between w-full px-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg shadow hover:bg-blue-600 dark:hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full ml-2 px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg shadow hover:bg-red-600 dark:hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
      {/* tab system */}
      <div className="mx-auto p-4 mt-10">
        <div className="tabs">
          <div className="flex space-x-4 border-b">
            <button
              className={`tab-button py-2 px-4 text-sm font-medium ${
                activeTab === "orders"
                  ? "text-blue-600 border-b-2 border-blue-600 font-bold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>
            <button
              className={`tab-button py-2 px-4 text-sm font-medium ${
                activeTab === "addresses"
                  ? "text-blue-600 border-b-2 border-blue-600 font-bold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("addresses")}
            >
              Addresses
            </button>
            <button
              className={`tab-button py-2 px-4 text-sm font-medium ${
                activeTab === "account"
                  ? "text-blue-600 border-b-2 border-blue-600 font-bold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("account")}
            >
              Account
            </button>
          </div>

          <div className="tab-content mt-4">
            {activeTab === "orders" && (
              <div className="tab-item">
                <h2 className="text-lg font-bold">Order Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {orders.map((order) => (
                    <div key={order._id} className="border p-4 my-2">
                      <h3 className="pl-2">Order ID: {order._id}</h3>
                      <h3 className="pl-2">Order Status: {order.orderStatus}</h3>
                      {order.orderItems.map((item) => (
                        <div
                          key={item._id}
                          className="d-flex justify-between items-center p-2"
                        >
                          <div>
                            <p>Product: {item.product.name}</p>
                            <p>Description: {item.product.description}</p>
                            <p>Order Items: {item.quantity}</p>
                            <p>Price: ${item.product.price}</p>
                            <p>Shipping Address: {order.shippingAddress}, </p>
                          </div>
                          <div>
                            <img
                              src={`http://localhost:5000/${item.product.images[0]}`}
                              alt=""
                              className="w-32 h-32 object-cover my-2"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="tab-item">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-center">
                    User Addresses
                  </h2>
                  <button
                    onClick={handleAddAddress}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Add Address
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {addresses.map((address) => (
                    <div key={address._id} className="border p-4 my-2 mr-4">
                      <p>
                        Address :
                        <span className="truncate w-2">{address.street}</span>
                      </p>
                      <p>
                        City :{" "}
                        <span className="truncate w-24">{address.city}</span>
                      </p>
                      <p>
                        State :{" "}
                        <span className="truncate w-24">{address.state}</span>
                      </p>
                      <p>
                        Pincode :{" "}
                        <span className="truncate w-24">{address.pincode}</span>
                      </p>
                      <button
                        onClick={() => handleEditAddress(address)}
                        className="bg-yellow-500 text-white px-4 py-2 mr-5 mt-5 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="tab-item">
                <h2 className="text-lg font-bold">Account Details</h2>
                <p>Username: {accountDetails.username}</p>
                <p>Email: {accountDetails.email}</p>
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-500 text-white px-4 py-2 mt-2"
                >
                  Delete Account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal for editing profile */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEditProfile}
        userData={user}
      />
      <AddAddress
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSubmit={handleAddressSubmit}
        userData={addressToEdit}
      />
    </div>
  );
};

export default Profile;
