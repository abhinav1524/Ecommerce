import React,{useContext} from 'react';
import { UserContext } from '../context/UserContext';
const AdminDashboard = () => {
  const { user } = useContext(UserContext);
  console.log(user);

      if (!user || user.role !== 'admin') {
          return <p className="mt-24 md:mt-32">Access denied. You are not authorized to view this page.</p>;
      }
  return (
    <>
    <div className="mt-24 md:mt-32">
      <h1>Admin Dashboard</h1>
      <p>Only admins can see this page.</p>
      </div>
    </>
  );
};

export default AdminDashboard;
