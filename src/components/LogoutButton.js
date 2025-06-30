import React from "react";
import { logoutUser } from "../actions/authActions"; // Adjust the path as needed

const LogoutButton = () => {
  const handleLogout = () => {
    logoutUser(); // Call the logout action
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
