// this ok is ok with all functionality
// import React, { useRef, useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { recognizeFace } from "../api";

// export default function Login() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [faceMessage, setFaceMessage] = useState("");
//   const [loggedIn, setLoggedIn] = useState(false); // ✅ New state
//   const [showLogin, setShowLogin] = useState(() => {
//     const faceVerified = localStorage.getItem("faceVerified") === "true";
//     const loginVerified = localStorage.getItem("loginVerified") === "true";
//     return faceVerified && !loginVerified;
//   });

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginMessage, setLoginMessage] = useState("");

//   // ✅ Clear stale loginVerified if token is missing
//   useEffect(() => {
//     if (!localStorage.getItem("userToken")) {
//       localStorage.removeItem("loginVerified");
//     }
//   }, []);

//   // ✅ Redirect after login success
//   useEffect(() => {
//     if (
//       loggedIn ||
//       (localStorage.getItem("faceVerified") === "true" &&
//         localStorage.getItem("loginVerified") === "true")
//     ) {
//       navigate("/dashboard");
//     }
//   }, [loggedIn, navigate]);

//   useEffect(() => {
//     const initCamera = async () => {
//       if (showLogin) return;
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         setFaceMessage("Could not access webcam.");
//         console.error(error);
//       }
//     };
//     initCamera();
//   }, [showLogin]);

//   const capture = async () => {
//     setLoading(true);
//     setFaceMessage("");
//     try {
//       const ctx = canvasRef.current.getContext("2d");
//       ctx.drawImage(videoRef.current, 0, 0, 320, 240);
//       const dataURL = canvasRef.current.toDataURL("image/jpeg");

//       const res = await recognizeFace(dataURL);
//       if (res.name === "Error") {
//         setFaceMessage("Something went wrong during recognition.");
//       } else if (res.name === "Unknown") {
//         setFaceMessage("Face not recognized.");
//       } else {
//         setFaceMessage(`Hello, ${res.name}`);
//         setTimeout(() => {
//           localStorage.setItem("faceVerified", "true");
//           setShowLogin(true);
//         }, 1500);
//       }
//     } catch (err) {
//       setFaceMessage("Something went wrong.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("https://database-production-3a68.up.railway.app/api/auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("userToken", data.token);
//       localStorage.setItem("userEmail", email);
//       localStorage.setItem("userId", data.driverId);
//       localStorage.setItem("loginVerified", "true");

//       await axios.put(
//         `https://database-production-3a68.up.railway.app/api/users/update-status/${data.driverId}`,
//         { status: "Available" },
//         {
//           headers: {
//             Authorization: `Bearer ${data.token}`,
//           },
//         }
//       );

//       setLoginMessage("Login successful!");
//       setLoggedIn(true); // ✅ Trigger redirect
//     } catch (error) {
//       console.error("Login failed:", error.response?.data || error.message);
//       setLoginMessage(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div>
//       {!showLogin && (
//         <div style={styles.popupOverlay}>
//           <div style={styles.popupContent}>
//             <h2 style={styles.title}>Face Recognition</h2>
//             <video ref={videoRef} autoPlay playsInline style={styles.video} />
//             <button onClick={capture} disabled={loading} style={styles.button}>
//               {loading ? "Recognizing..." : "Capture & Recognize"}
//             </button>
//             <canvas ref={canvasRef} width="320" height="240" style={{ display: "none" }} />
//             {faceMessage && <div style={styles.faceMessage}>{faceMessage}</div>}
//           </div>
//         </div>
//       )}

//       {showLogin && (
//         <div style={styles.container}>
//           <form onSubmit={handleLoginSubmit} style={styles.form}>
//             <h2 style={styles.heading}>Login</h2>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               style={styles.input}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               style={styles.input}
//             />
//             <button type="submit" style={styles.button}>Login</button>
//             {loginMessage && <p style={styles.message}>{loginMessage}</p>}
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: "400px",
//     margin: "50px auto",
//     padding: "20px",
//     backgroundColor: "#f9f9f9",
//     borderRadius: "10px",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   heading: {
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   input: {
//     padding: "10px",
//     marginBottom: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     fontSize: "16px",
//   },
//   button: {
//     padding: "10px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     fontSize: "16px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginTop: "15px",
//     width: "100%",
//     maxWidth: "300px",
//   },
//   message: {
//     marginTop: "15px",
//     textAlign: "center",
//     color: "#d9534f",
//   },
//   popupOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100vw",
//     height: "100vh",
//     backgroundColor: "rgba(0,0,0,0.6)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 1000,
//     padding: "20px",
//   },
//   popupContent: {
//     backgroundColor: "#fff",
//     width: "100%",
//     maxWidth: "500px",
//     height: "100%",
//     maxHeight: "90vh",
//     padding: "20px",
//     borderRadius: "12px",
//     boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "flex-start",
//   },
//   title: {
//     fontSize: "20px",
//     marginBottom: "10px",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   video: {
//     width: "100%",
//     maxWidth: "320px",
//     borderRadius: "8px",
//   },
//   faceMessage: {
//     marginTop: "10px",
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#333",
//   },
// };





















// import React, { useRef, useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { recognizeFace } from "../api";

// export default function Login() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [faceMessage, setFaceMessage] = useState("");
//   const [loggedIn, setLoggedIn] = useState(false);

//   const [showLogin, setShowLogin] = useState(() => {
//     const faceVerified = localStorage.getItem("faceVerified") === "true";
//     const loginVerified = localStorage.getItem("loginVerified") === "true";
//     return faceVerified && !loginVerified;
//   });

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginMessage, setLoginMessage] = useState("");

//   const [loginAttempts, setLoginAttempts] = useState(() => {
//     return parseInt(localStorage.getItem("loginAttempts") || "0", 10);
//   });

//   useEffect(() => {
//     if (!localStorage.getItem("userToken")) {
//       localStorage.removeItem("loginVerified");
//     }
//   }, []);

//   useEffect(() => {
//     if (
//       loggedIn ||
//       (localStorage.getItem("faceVerified") === "true" &&
//         localStorage.getItem("loginVerified") === "true")
//     ) {
//       navigate("/dashboard");
//     }
//   }, [loggedIn, navigate]);

//   useEffect(() => {
//     const initCamera = async () => {
//       if (showLogin) return;
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         setFaceMessage("Could not access webcam.");
//         console.error(error);
//       }
//     };
//     initCamera();
//   }, [showLogin]);

//   const capture = async () => {
//     setLoading(true);
//     setFaceMessage("");
//     try {
//       const ctx = canvasRef.current.getContext("2d");
//       ctx.drawImage(videoRef.current, 0, 0, 320, 240);
//       const dataURL = canvasRef.current.toDataURL("image/jpeg");

//       const res = await recognizeFace(dataURL);
//       if (res.name === "Error") {
//         setFaceMessage("Something went wrong during recognition.");
//       } else if (res.name === "Unknown") {
//         setFaceMessage("Face not recognized.");
//       } else {
//         setFaceMessage(`Hello, ${res.name}`);
//         setTimeout(() => {
//           localStorage.setItem("faceVerified", "true");
//           localStorage.setItem("loginAttempts", "0");
//           setLoginAttempts(0);
//           setShowLogin(true);
//         }, 1500);
//       }
//     } catch (err) {
//       setFaceMessage("Something went wrong.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("https://database-production-3a68.up.railway.app/api/auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("userToken", data.token);
//       localStorage.setItem("userEmail", email);
//       localStorage.setItem("userId", data.driverId);
//       localStorage.setItem("loginVerified", "true");
//       localStorage.setItem("loginAttempts", "0");
//       setLoginAttempts(0);

//       await axios.put(
//         `https://database-production-3a68.up.railway.app/api/users/update-status/${data.driverId}`,
//         { status: "Available" },
//         {
//           headers: {
//             Authorization: `Bearer ${data.token}`,
//           },
//         }
//       );

//       setLoginMessage("Login successful!");
//       setLoggedIn(true);
//     } catch (error) {
//       const newAttempts = loginAttempts + 1;
//       setLoginAttempts(newAttempts);
//       localStorage.setItem("loginAttempts", newAttempts.toString());

//       if (newAttempts >= 3) {
//         setLoginMessage("Too many failed attempts. Please verify your face again.");
//         localStorage.removeItem("faceVerified");
//         setTimeout(() => {
//           setShowLogin(false);
//           localStorage.setItem("loginAttempts", "0");
//           setLoginAttempts(0);
//         }, 2000);
//       } else {
//         setLoginMessage(
//           `${error.response?.data?.message || "Login failed"} — Attempts left: ${3 - newAttempts}`
//         );
//       }
//     }
//   };

//   return (
//     <div>
//       {!showLogin && (
//         <div style={styles.popupOverlay}>
//           <div style={styles.popupContent}>
//             <h2 style={styles.title}>Face Recognition</h2>
//             <video ref={videoRef} autoPlay playsInline style={styles.video} />
//             <button onClick={capture} disabled={loading} style={styles.button}>
//               {loading ? "Recognizing..." : "Capture & Recognize"}
//             </button>
//             <canvas ref={canvasRef} width="320" height="240" style={{ display: "none" }} />
//             {faceMessage && <div style={styles.faceMessage}>{faceMessage}</div>}
//           </div>
//         </div>
//       )}

//       {showLogin && (
//         <div style={styles.container}>
//           <form onSubmit={handleLoginSubmit} style={styles.form}>
//             <h2 style={styles.heading}>Login</h2>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               style={styles.input}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               style={styles.input}
//             />
//             <button type="submit" style={styles.button}>Login</button>
//             {loginMessage && <p style={styles.message}>{loginMessage}</p>}
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: "400px",
//     margin: "50px auto",
//     padding: "20px",
//     backgroundColor: "#f9f9f9",
//     borderRadius: "10px",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   heading: {
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   input: {
//     padding: "10px",
//     marginBottom: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     fontSize: "16px",
//   },
//   button: {
//     padding: "10px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     fontSize: "16px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginTop: "15px",
//     width: "100%",
//     maxWidth: "300px",
//   },
//   message: {
//     marginTop: "15px",
//     textAlign: "center",
//     color: "#d9534f",
//   },
//   popupOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100vw",
//     height: "100vh",
//     backgroundColor: "rgba(0,0,0,0.6)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 1000,
//     padding: "20px",
//   },
//   popupContent: {
//     backgroundColor: "#fff",
//     width: "100%",
//     maxWidth: "500px",
//     height: "100%",
//     maxHeight: "90vh",
//     padding: "20px",
//     borderRadius: "12px",
//     boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "flex-start",
//   },
//   title: {
//     fontSize: "20px",
//     marginBottom: "10px",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   video: {
//     width: "100%",
//     maxWidth: "320px",
//     borderRadius: "8px",
//   },
//   faceMessage: {
//     marginTop: "10px",
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#333",
//   },
// };



import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { recognizeFace } from "../api";

export default function Login() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [faceMessage, setFaceMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [showLogin, setShowLogin] = useState(() => {
    const faceVerified = localStorage.getItem("faceVerified") === "true";
    const loginVerified = localStorage.getItem("loginVerified") === "true";
    return faceVerified && !loginVerified;
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const [loginAttempts, setLoginAttempts] = useState(() => {
    return parseInt(localStorage.getItem("loginAttempts") || "0", 10);
  });

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      localStorage.removeItem("loginVerified");
    }
  }, []);

  // Auto-show popup if coming from signup
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("fromSignup") === "true") {
      localStorage.removeItem("faceVerified");
      setShowLogin(false);
    }
  }, [location.search]);

  useEffect(() => {
    if (
      loggedIn ||
      (localStorage.getItem("faceVerified") === "true" &&
        localStorage.getItem("loginVerified") === "true")
    ) {
      navigate("/dashboard");
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    const initCamera = async () => {
      if (showLogin) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        setFaceMessage("Could not access webcam.");
        console.error(error);
      }
    };
    initCamera();
  }, [showLogin]);

  const capture = async () => {
    setLoading(true);
    setFaceMessage("");
    try {
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, 320, 240);
      const dataURL = canvasRef.current.toDataURL("image/jpeg");

      const res = await recognizeFace(dataURL);
      if (res.name === "Error") {
        setFaceMessage("Something went wrong during recognition.");
      } else if (res.name === "Unknown") {
        setFaceMessage("Face not recognized.");
      } else {
        setFaceMessage(`Hello, ${res.name}`);
        setTimeout(() => {
          localStorage.setItem("faceVerified", "true");
          localStorage.setItem("loginAttempts", "0");
          setLoginAttempts(0);
          setShowLogin(true);
        }, 1500);
      }
    } catch (err) {
      setFaceMessage("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://database-production-3a68.up.railway.app/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userId", data.driverId);
      localStorage.setItem("loginVerified", "true");
      localStorage.setItem("loginAttempts", "0");
      setLoginAttempts(0);

      await axios.put(
        `https://database-production-3a68.up.railway.app/api/users/update-status/${data.driverId}`,
        { status: "Available" },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      setLoginMessage("Login successful!");
      setLoggedIn(true);
    } catch (error) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      localStorage.setItem("loginAttempts", newAttempts.toString());

      if (newAttempts >= 3) {
        setLoginMessage("Too many failed attempts. Please verify your face again.");
        localStorage.removeItem("faceVerified");
        setTimeout(() => {
          setShowLogin(false);
          localStorage.setItem("loginAttempts", "0");
          setLoginAttempts(0);
        }, 2000);
      } else {
        setLoginMessage(
          `${error.response?.data?.message || "Login failed"} — Attempts left: ${3 - newAttempts}`
        );
      }
    }
  };

  return (
    <div>
      {!showLogin && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h2 style={styles.title}>Face Recognition</h2>
            <video ref={videoRef} autoPlay playsInline style={styles.video} />
            <button onClick={capture} disabled={loading} style={styles.button}>
              {loading ? "Recognizing..." : "Capture & Recognize"}
            </button>
            <button
              style={{ ...styles.button, backgroundColor: "#28a745", marginTop: "10px" }}
              onClick={() => navigate("/signup")}
            >
              Not Registered? Sign Up
            </button>
            <canvas ref={canvasRef} width="320" height="240" style={{ display: "none" }} />
            {faceMessage && <div style={styles.faceMessage}>{faceMessage}</div>}
          </div>
        </div>
      )}

      {showLogin && (
        <div style={styles.container}>
          <form onSubmit={handleLoginSubmit} style={styles.form}>
            <h2 style={styles.heading}>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Login</button>
            {loginMessage && <p style={styles.message}>{loginMessage}</p>}
          </form>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "15px",
    width: "100%",
    maxWidth: "300px",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    color: "#d9534f",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
  },
  popupContent: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: "500px",
    height: "100%",
    maxHeight: "90vh",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: "20px",
    marginBottom: "10px",
    fontWeight: "bold",
    textAlign: "center",
  },
  video: {
    width: "100%",
    maxWidth: "320px",
    borderRadius: "8px",
  },
  faceMessage: {
    marginTop: "10px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
};
