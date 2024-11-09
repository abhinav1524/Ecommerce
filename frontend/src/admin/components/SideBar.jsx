import { useState } from "react";
import { Link } from "react-router-dom";
const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <>
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-64 bg-blue-900 text-white md:static fixed inset-y-0 left-0 md:z-auto z-50 flex flex-col`}
      >
        <div className="p-4 text-center font-bold text-lg">Admin Dashboard</div>
        <nav className="flex-1 px-4 space-y-2 py-6">
          <Link
            to="/admin"
            className="block py-2 px-4 rounded hover:bg-blue-700"
          >
            Dashboard
          </Link>
          <Link
            to="/products-management"
            className="block py-2 px-4 rounded hover:bg-blue-700"
          >
            Products
          </Link>
          <Link
            to="/categories-management"
            className="block py-2 px-4 rounded hover:bg-blue-700"
          >
            Categories
          </Link>
          <Link
            to="/orders-management"
            className="block py-2 px-4 rounded hover:bg-blue-700"
          >
            Orders
          </Link>
          <Link
            to="/users-management"
            className="block py-2 px-4 rounded hover:bg-blue-700"
          >
            Users
          </Link>

          <Link
            to="/profile"
            title=""
            className="block py-2 px-4 rounded hover:bg-blue-700"
          >
            {" "}
            My Account{" "}
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;
