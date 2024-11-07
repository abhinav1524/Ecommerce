import React, { useState } from 'react';
import SideBar from './components/SideBar';
const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar/>
      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin</h1>
          {/* Toggle Button for Sidebar */}
          <button
            className="md:hidden bg-blue-900 text-white p-2 rounded"
            onClick={() =>alert("you clicked me")}
          >
            {/* {isSidebarOpen ? 'Close' : 'Menu'} */}
          </button>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="mt-2 text-3xl font-bold text-blue-600">1,245</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Active Sessions</h2>
            <p className="mt-2 text-3xl font-bold text-green-600">342</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">New Orders</h2>
            <p className="mt-2 text-3xl font-bold text-red-600">58</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Revenue</h2>
            <p className="mt-2 text-3xl font-bold text-yellow-600">$23,450</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Support Tickets</h2>
            <p className="mt-2 text-3xl font-bold text-purple-600">14</p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default AdminDashboard;
