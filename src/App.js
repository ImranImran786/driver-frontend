// import React from "react";
// import Navbar from "./components/navbar";
// import { Route, Routes } from "react-router-dom";
// import Footer from "./components/footer";
// import About from "./Pages/About";
// import Home from "./Pages/Home";
// import Location from "./Pages/Location";
// import Login from "./Pages/Login";
// import Signup from "./Pages/Signup";
// import LiveLoc from "./components/LiveLocation"
// import VV from "./components/VideoVerification";

// function App() {
//     return (
//       <div>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/location" element={<Location />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/livelocation" element={<LiveLoc />} />
//           {/* <Route path="/VV" element={<VV />} /> */}
//           <Route
//             path="/driver/video"
//             element={<VV driverId="driver123" />}
//           />
//         </Routes>

//         <Footer />
//       </div>
//     );
// }

// export default App;




import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Login from "./Pages/Login";
import Dashboard from "./components/Dashboard";
import Signup from "./Pages/Signup";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("userToken"));
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for token changes in localStorage
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("userToken"));

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard/*" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
