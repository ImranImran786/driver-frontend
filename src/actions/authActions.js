// authActions.js (Client-side)
export const logoutUser = () => {
    localStorage.removeItem("userToken"); // Remove JWT token from localStorage
    // Optionally, you can redirect the user to the login page or home page
    window.location.href = "/login"; 
  };
  