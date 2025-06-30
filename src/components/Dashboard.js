// import React, { useEffect, useState } from "react";
// import { Link, Routes, Route, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Dashboard.css";
// import VideoVerification from "../components/VideoVerification";
// import Timeslot from "../components/Timeslot";
// import Livelocation from "../components/LiveLocation";
// import Todayslot from "./Todayslot";
// import CameraCapture from "../components/CameraCapture";

// // FaceRegister

// const Dashboard = () => {
//     const userEmail = localStorage.getItem("userEmail");
//     const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("userToken");

//     const [clientData, setClientData] = useState(null);
//     const navigate = useNavigate();

//     // Debugging: Log userId and token
//     console.log("UserID:", userId);
//     console.log("Token:", token);

//     useEffect(() => {
//         if (!userId || !token) {
//             console.log("User ID or Token is missing!");
//             return;
//         }

//         const fetchClientData = async () => {
//             try {
//                 const { data } = await axios.get(`https://database-production-3a68.up.railway.app/api/users/${userId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 console.log("Client Data Response:", data);
//                 setClientData(data);
//             } catch (error) {
//                 console.error("Error fetching client data:", error);
//             }
//         };

//         fetchClientData();
//     }, [userId, token]);

//     const handleLogout = async () => {
//         try {
//             // Update status to Offline before clearing storage
//             await axios.put(`https://database-production-3a68.up.railway.app/api/users/update-status/${userId}`, {
//                 status: "Offline",
//             });

//             // Clear localStorage and redirect
//             localStorage.removeItem("userEmail");
//             localStorage.removeItem("userId");
//             localStorage.removeItem("userToken");

//             navigate("/login"); // Redirect to login page
//         } catch (error) {
//             console.error("Logout failed:", error);
//             alert("Failed to logout. Try again.");
//         }
//     };

//     return (
//         <div className="dashboard-layout">
//             <div className="dashboard-container">
//                 {/* Sidebar */}
//                 <aside className="sidebar">
//                     <ul>
//                         <li><Link to="/dashboard/Livelocation">Location</Link></li>
//                         <li><Link to="/dashboard/VideoVerification">Video Verification</Link></li>
//                         <li><Link to="/dashboard/Timeslot">Slot End</Link></li>
//                         <li><Link to="/dashboard/Todayslot">Today Slots</Link></li>
//                         <li><Link to="/dashboard/CameraCapture">cameraCapture</Link></li>
//                         <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
//                     </ul>
//                 </aside>

//                 {/* Main Content */}
//                 <main className="content">
//                     <Routes>
//                         <Route path="/" element={
//                             <div className="dashboard-home">
//                                 <h1 className="dashboard-title">Welcome to the Driver Dashboard</h1>
//                                 <p className="dashboard-subtitle">Use the sidebar to manage your actions.</p>
//                                 <p className="logged-in">Logged in as: <strong>{userEmail}</strong></p>

//                                 {clientData ? (
//                                     <div className="client-card">
//                                         <h2 className="card-title">Driver Information</h2>
//                                         <div className="client-info-row">
//                                             <span className="label">Name:</span>
//                                             <span className="value">
//                                                 {clientData.name || "N/A"} {clientData.fatherName || ""}
//                                             </span>
//                                         </div>
//                                         <div className="client-info-row">
//                                             <span className="label">Phone Number:</span>
//                                             <span className="value">{clientData.phone || "N/A"}</span>
//                                         </div>
//                                         <div className="client-info-row">
//                                             <span className="label">Email:</span>
//                                             <span className="value">{clientData.email}</span>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <p className="loading-text">Loading Driver data...</p>
//                                 )}
//                             </div>
//                         } />
//                         <Route path="CameraCapture" element={<CameraCapture />} />
//                         <Route path="VideoVerification" element={<VideoVerification userEmail={userEmail} />} />
//                         <Route path="Timeslot" element={<Timeslot driverId={userId} />} />
//                         <Route path="Livelocation" element={<Livelocation />} />
//                         <Route path="Todayslot" element={<Todayslot driverId={userId} />} />
//                     </Routes>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;







// previous deploy complete ok code 
// import React, { useEffect, useState } from "react";
// import { Link, Routes, Route, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Dashboard.css";
// import VideoVerification from "../components/VideoVerification";
// import Timeslot from "../components/Timeslot";
// import Livelocation from "../components/LiveLocation";
// import Todayslot from "./Todayslot";

// const Dashboard = () => {
//     const userEmail = localStorage.getItem("userEmail");
//     const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("userToken");

//     const [clientData, setClientData] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!userId || !token) {
//             console.log("User ID or Token is missing!");
//             return;
//         }

//         const fetchClientData = async () => {
//             try {
//                 const { data } = await axios.get(`https://database-production-3a68.up.railway.app/api/users/${userId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 console.log("Client Data Response:", data);
//                 setClientData(data);
//             } catch (error) {
//                 console.error("Error fetching client data:", error);
//             }
//         };

//         fetchClientData();
//     }, [userId, token]);

//     const handleLogout = async () => {
//         try {
//             // Update status to Offline before clearing storage
//             await axios.put(`https://database-production-3a68.up.railway.app/api/users/update-status/${userId}`, {
//                 status: "Offline",
//             });

//             // Clear localStorage and redirect
//             localStorage.removeItem("userEmail");
//             localStorage.removeItem("userId");
//             localStorage.removeItem("userToken");
//             localStorage.removeItem("faceVerified"); // ✅ Ensures popup will appear again on next login

//             localStorage.removeItem("loginVerified");
//             navigate("/login"); // Redirect to login page
//         } catch (error) {
//             console.error("Logout failed:", error);
//             alert("Failed to logout. Try again.");
//         }
//     };

//     return (
//         <div className="dashboard-layout">
//             <div className="dashboard-container">
//                 {/* Sidebar */}
//                 <aside className="sidebar">
//                     <ul>
//                         <li><Link to="/dashboard/Livelocation">Location</Link></li>
//                         <li><Link to="/dashboard/VideoVerification">Video Verification</Link></li>
//                         <li><Link to="/dashboard/Timeslot">Slot End</Link></li>
//                         <li><Link to="/dashboard/Todayslot">Today Slots</Link></li>
//                         <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
//                     </ul>
//                 </aside>

//                 {/* Main Content */}
//                 <main className="content">
//                     <Routes>
//                         <Route path="/" element={
//                             <div className="dashboard-home">
//                                 <h1 className="dashboard-title">Welcome to the Driver Dashboard</h1>
//                                 <p className="dashboard-subtitle">Use the sidebar to manage your actions.</p>
//                                 <p className="logged-in">Logged in as: <strong>{userEmail}</strong></p>

//                                 {clientData ? (
//                                     <div className="client-card">
//                                         <h2 className="card-title">Driver Information</h2>
//                                         <div className="client-info-row">
//                                             <span className="label">Name:</span>
//                                             <span className="value">
//                                                 {clientData.name || "N/A"} {clientData.fatherName || ""}
//                                             </span>
//                                         </div>
//                                         <div className="client-info-row">
//                                             <span className="label">Phone Number:</span>
//                                             <span className="value">{clientData.phone || "N/A"}</span>
//                                         </div>
//                                         <div className="client-info-row">
//                                             <span className="label">Email:</span>
//                                             <span className="value">{clientData.email}</span>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <p className="loading-text">Loading Driver data...</p>
//                                 )}
//                             </div>
//                         } />
//                         <Route path="VideoVerification" element={<VideoVerification userEmail={userEmail} />} />
//                         <Route path="Timeslot" element={<Timeslot driverId={userId} />} />
//                         <Route path="Livelocation" element={<Livelocation />} />
//                         <Route path="Todayslot" element={<Todayslot driverId={userId} />} />
//                     </Routes>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

































import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import VideoVerification from "../components/VideoVerification";
import Timeslot from "../components/Timeslot";
import Livelocation from "../components/LiveLocation";
import Todayslot from "./Todayslot";

const Dashboard = () => {
    const userEmail = localStorage.getItem("userEmail");
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("userToken");

    const [clientData, setClientData] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!userId || !token) return;

        const fetchClientData = async () => {
            try {
                const { data } = await axios.get(
                    `https://database-production-3a68.up.railway.app/api/users/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setClientData(data);
            } catch (error) {
                console.error("Error fetching client data:", error);
            }
        };

        fetchClientData();
    }, [userId, token]);

    const handleLogout = async () => {
        try {
            await axios.put(
                `https://database-production-3a68.up.railway.app/api/users/update-status/${userId}`,
                { status: "Offline" }
            );
            localStorage.clear();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Failed to logout. Try again.");
        }
    };

    return (
        <div className="dashboard-layout">
    {/* Sidebar Toggle Button */}
    <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? '✖' : '☰'}
    </button>

    <div className={`dashboard-container ${sidebarOpen ? "sidebar-open" : ""}`}>
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <ul>
                <li><Link to="/dashboard/Livelocation" onClick={() => setSidebarOpen(false)}>Location</Link></li>
                <li><Link to="/dashboard/VideoVerification" onClick={() => setSidebarOpen(false)}>Video Verification</Link></li>
                <li><Link to="/dashboard/Timeslot" onClick={() => setSidebarOpen(false)}>Slot End</Link></li>
                <li><Link to="/dashboard/Todayslot" onClick={() => setSidebarOpen(false)}>Today Slots</Link></li>
                <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
            </ul>
        </aside>

        {/* Main Content */}
        <main className="content" onClick={() => sidebarOpen && setSidebarOpen(false)}>
            <Routes>
                <Route path="/" element={
                    <div className="dashboard-home">
                        <h1 className="dashboard-title">Welcome to the Driver Dashboard</h1>
                        <p className="dashboard-subtitle">Use the sidebar to manage your actions.</p>
                        <p className="logged-in">Logged in as: <strong>{userEmail}</strong></p>

                        {clientData ? (
                            <>

                                <div className="client-card">
                                    <h2 className="card-title">Driver Information</h2>
                                    <div className="client-info-row">
                                        <span className="label">Name:</span>
                                        <span className="value">{clientData.name || "N/A"} {clientData.fatherName || ""}</span>
                                    </div>
                                    <div className="client-info-row">
                                        <span className="label">Phone Number:</span>
                                        <span className="value">{clientData.phone || "N/A"}</span>
                                    </div>
                                    <div className="client-info-row">
                                        <span className="label">Email:</span>
                                        <span className="value">{clientData.email}</span>
                                    </div>
                                </div>


                                {/* ✅ Car image shown only on mobile and above client card */}
                                <div className="car-image-mobile">
                                    <img src="/images1.png" alt="Car" className="car-image" />
                                </div>
                            </>
                        ) : (
                            <p className="loading-text">Loading Driver data...</p>
                        )}
                    </div>
                } />
                <Route path="VideoVerification" element={<VideoVerification userEmail={userEmail} />} />
                <Route path="Timeslot" element={<Timeslot driverId={userId} />} />
                <Route path="Livelocation" element={<Livelocation />} />
                <Route path="Todayslot" element={<Todayslot driverId={userId} />} />
            </Routes>
        </main>
    </div>

    {/* ✅ Bottom Navbar for Mobile Devices */}
    <nav className="bottom-nav">
        <Link to="/dashboard/Livelocation" className={location.pathname.includes("Livelocation") ? "active" : ""}>
            <span>📍</span>
            <small>Location</small>
        </Link>
        <Link to="/dashboard/VideoVerification" className={location.pathname.includes("VideoVerification") ? "active" : ""}>
            <span>🎥</span>
            <small>Video</small>
        </Link>
        <Link to="/dashboard/Timeslot" className={location.pathname.includes("Timeslot") ? "active" : ""}>
            <span>⏱️</span>
            <small>Slot End</small>
        </Link>
        <Link to="/dashboard/Todayslot" className={location.pathname.includes("Todayslot") ? "active" : ""}>
            <span>📆</span>
            <small>Today</small>
        </Link>
    </nav>
</div>

    );
};

export default Dashboard;
























// ok code for bottom navbar select the css from dashboard.css
// import React, { useEffect, useState } from "react";
// import { Link, Routes, Route, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Dashboard.css";
// import VideoVerification from "../components/VideoVerification";
// import Timeslot from "../components/Timeslot";
// import Livelocation from "../components/LiveLocation";
// import Todayslot from "./Todayslot";

// // ✅ Import icons
// import { FaMapMarkerAlt, FaVideo, FaClock, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";

// const Dashboard = () => {
//     const userEmail = localStorage.getItem("userEmail");
//     const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("userToken");

//     const [clientData, setClientData] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!userId || !token) return;

//         const fetchClientData = async () => {
//             try {
//                 const { data } = await axios.get(`https://database-production-3a68.up.railway.app/api/users/${userId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setClientData(data);
//             } catch (error) {
//                 console.error("Error fetching client data:", error);
//             }
//         };

//         fetchClientData();
//     }, [userId, token]);

//     const handleLogout = async () => {
//         try {
//             await axios.put(`https://database-production-3a68.up.railway.app/api/users/update-status/${userId}`, {
//                 status: "Offline",
//             });

//             localStorage.removeItem("userEmail");
//             localStorage.removeItem("userId");
//             localStorage.removeItem("userToken");
//             localStorage.removeItem("faceVerified");
//             localStorage.removeItem("loginVerified");

//             navigate("/login");
//         } catch (error) {
//             console.error("Logout failed:", error);
//             alert("Failed to logout. Try again.");
//         }
//     };

//     return (
//         <div className="dashboard-layout">
//             <div className="dashboard-container">
//                 {/* Sidebar with icons */}
//                 <aside className="sidebar">
//                     <ul>
//                         <li>
//                             <Link to="/dashboard/Livelocation">
//                                 <FaMapMarkerAlt style={{ marginRight: 8 }} /> Location
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/dashboard/VideoVerification">
//                                 <FaVideo style={{ marginRight: 8 }} /> Video Verification
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/dashboard/Timeslot">
//                                 <FaClock style={{ marginRight: 8 }} /> Slot End
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/dashboard/Todayslot">
//                                 <FaCalendarAlt style={{ marginRight: 8 }} /> Today Slots
//                             </Link>
//                         </li>
//                         <li>
//                             <button className="logout-button" onClick={handleLogout}>
//                                 <FaSignOutAlt style={{ marginRight: 8 }} /> Logout
//                             </button>
//                         </li>
//                     </ul>
//                 </aside>

//                 {/* Main Content */}
//                 <main className="content">
//                     <Routes>
//                         <Route
//                             path="/"
//                             element={
//                                 <div className="dashboard-home">
//                                     <h1 className="dashboard-title">Welcome to the Driver Dashboard</h1>
//                                     <p className="dashboard-subtitle">Use the sidebar to manage your actions.</p>
//                                     <p className="logged-in">Logged in as: <strong>{userEmail}</strong></p>

//                                     {clientData ? (
//                                         <div className="client-card">
//                                             <h2 className="card-title">Driver Information</h2>
//                                             <div className="client-info-row">
//                                                 <span className="label">Name:</span>
//                                                 <span className="value">
//                                                     {clientData.name || "N/A"} {clientData.fatherName || ""}
//                                                 </span>
//                                             </div>
//                                             <div className="client-info-row">
//                                                 <span className="label">Phone Number:</span>
//                                                 <span className="value">{clientData.phone || "N/A"}</span>
//                                             </div>
//                                             <div className="client-info-row">
//                                                 <span className="label">Email:</span>
//                                                 <span className="value">{clientData.email}</span>
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         <p className="loading-text">Loading Driver data...</p>
//                                     )}
//                                 </div>
//                             }
//                         />
//                         <Route path="VideoVerification" element={<VideoVerification userEmail={userEmail} />} />
//                         <Route path="Timeslot" element={<Timeslot driverId={userId} />} />
//                         <Route path="Livelocation" element={<Livelocation />} />
//                         <Route path="Todayslot" element={<Todayslot driverId={userId} />} />
//                     </Routes>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;
