import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext'; // Ensure UserContext is imported

const Profile = () => {
  const { user, setUser, logout } = useContext(UserContext); // Make sure to include logout from context
  console.log(user);

  useEffect(() => {
    // Load user data from localStorage if it's not in context
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
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
      const response = await fetch('http://localhost:5000/api/users/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies if necessary for your app
      });

      if (response.ok) {
        // Call the logout function from context
        logout(); // This will clear the user from the context and localStorage
        localStorage.removeItem('user'); // Clear user data from localStorage
        window.location.href = '/signin'; // Redirect to login page after logout
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="mt-14 mb-10 flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm p-6 mx-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col items-center space-y-4">
        <img
          src="https://i.pravatar.cc/150"
          alt="User Avatar"
          className="w-28 h-28 rounded-full shadow-md"
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">Name </span>
            <h2 className="text-xl text-gray-600 font-semibold dark:text-white capitalize">{user.name}</h2>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Email </span>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Phone No </span>
            <p className="text-gray-600 dark:text-gray-400">{user.phoneNumber}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Address </span>
            <p className="text-gray-600 dark:text-gray-400">{user.address}</p>
          </div>
        </div>
        <div className="flex justify-between w-full px-4">
          <button className="w-full px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg shadow hover:bg-blue-600 dark:hover:bg-blue-700 transition">
            Edit Profile
          </button>
          <button onClick={handleLogout} className="w-full ml-2 px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg shadow hover:bg-red-600 dark:hover:bg-red-700 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
