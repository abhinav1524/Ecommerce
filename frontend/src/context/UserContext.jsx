import React, { createContext, useState,useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state

  const login = (userData) => {
    setUser(userData); // Update user state with user data on login
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage
    window.location.href = '/signin'; // Clear user state on logout
  };

  useEffect(() => {
    // Restore user from localStorage if page is refreshed
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  return (
    <UserContext.Provider value={{ user,setUser,login,logout }}>
      {children}
    </UserContext.Provider>
  );
};
