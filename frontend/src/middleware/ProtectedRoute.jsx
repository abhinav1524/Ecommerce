import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser && !user) {
    console.log('Setting user from localStorage:', storedUser);
    setUser(storedUser);
  } else {
    console.log('Current user in context:', user);
  }
  }, [user, setUser]);

  // Redirect to login page if no user is logged in
  if (!user) {
    return <Navigate to="/signin" />;
  }

  // Render the protected content if the user is logged in
  return children;
};

export default ProtectedRoute;
