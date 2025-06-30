// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//     const navigate = useNavigate();
//     const isAuthenticated = !!localStorage.getItem("userToken");

//     const handleLogout = () => {
//         localStorage.removeItem("userToken");
//         navigate("/login"); // Redirect to login page
//     };

    
//     return (
//         <nav className="navbar">
//             <h2 className="logo">Driver Panel</h2>
//             <ul className="nav-links">
//                 <li><Link to="/"></Link></li>
//                 {isAuthenticated ? (
//                     <>
//                         <li><Link to="/dashboard">Dashboard</Link></li>
//                         {/* <li><button onClick={handleLogout}>Logout</button></li> */}
//                     </>
//                 ) : (
//                     <>
//                     <li><Link to="/login">Login</Link></li>
//                     <li><Link to="/signup">signup</Link></li>
//                     </>
//                 )}
//             </ul>
//         </nav>
//     );
// };

// export default Navbar;
















import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("userToken");

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        navigate("/login");
    };

    

    const navbarStyle = {
        backgroundColor: "#2c3e50",
        color: "white",
        padding: "25px",
        display: "flex",
        justifyContent: "center",  // ✅ center logo
        alignItems: "center",
        position: "relative",
    };

    const logoStyle = {
        fontSize: "24px",
        fontWeight: "bold",
        margin: 0,
    };

    const navLinksStyle = {
        position: "absolute",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        gap: "15px",
        listStyle: "none",
    };

    const linkStyle = {
        color: "white",
        textDecoration: "none",
        fontSize: "16px",
    };
    

    return (
        <nav style={navbarStyle}>
            <h2 style={logoStyle}>Driver Panel</h2>
            <ul style={navLinksStyle}>
                <li><Link to="/" style={linkStyle}></Link></li>
                {isAuthenticated ? (
                    <li><Link to="/dashboard" style={linkStyle}>Dashboard</Link></li>
                ) : (
                    <>
                        <li><Link to="/login" style={linkStyle}>Login</Link></li>
                        <li><Link to="/signup" style={linkStyle}>Signup</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
