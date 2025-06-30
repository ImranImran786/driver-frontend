// // import React from "react";
// // import "../components/Signup.css";
// // import { Link } from "react-router-dom";

// // function Signup() {
// //   return (
// //     <div className="signup-container">
// //       <div className="signup-card">
// //         <h2>Sign Up</h2>
// //         <form>
// //           <div className="form-group">
// //             <label htmlFor="name"> Name</label>
// //             <input type="text" id="name" placeholder="Enter your full name" />
// //           </div>
// //           <div className="form-group">
// //             <label htmlFor="email">Email</label>
// //             <input type="email" id="email" placeholder="Enter your email" />
// //           </div>
// //           <div className="form-group">
// //             <label htmlFor="password">Password</label>
// //             <input
// //               type="password"
// //               id="password"
// //               placeholder="Enter your password"
// //             />
// //           </div>
// //           <button type="submit" className="signup-button">
// //             Sign Up
// //           </button>
// //         </form>
// //         <div className="login-link">
// //           Already have an account? <Link to="/login">Login</Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Signup;





// import React, { useState } from "react";
// import axios from "axios";

// const Signup = () => {
//     const [name, setName] = useState("");
//     const [fatherName, setFatherName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [cnic, setCnic] = useState("");
//     const [phone, setPhone] = useState("");
//     const [otherPhone, setOtherPhone] = useState("");
//     const [homeAddress, setHomeAddress] = useState("");
//     const [licenseNumber, setLicenseNumber] = useState("");
//     // const [role, setRole] = useState("driver");
//     const [message, setMessage] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post("http://localhost:5005/api/auth/register", {
//                 name,
//                 fatherName,
//                 email,
//                 password,
//                 cnic,
//                 phone,
//                 otherPhone,
//                 homeAddress,
//                 licenseNumber,
//                 // role,
//             });

//             localStorage.setItem("userToken", data.token);
//             setMessage("Signup successful!");
//         } catch (error) {
//             setMessage(error.response?.data?.message || "Signup failed");
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//                 <input type="text" placeholder="Father's Name" value={fatherName} onChange={(e) => setFatherName(e.target.value)} required />
//                 <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 <input type="text" placeholder="CNIC" value={cnic} onChange={(e) => setCnic(e.target.value)} required />
//                 <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//                 <input type="text" placeholder="Other Phone (optional)" value={otherPhone} onChange={(e) => setOtherPhone(e.target.value)} />
//                 <input type="text" placeholder="Home Address" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} required />
//                 <input type="text" placeholder="License Number (optional)" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />
//                 {/* <select value={role} onChange={(e) => setRole(e.target.value)} required>
//                     <option value="driver">Driver</option>
//                 </select> */}
//                 <button type="submit">Signup</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default Signup;





















// import React, { useState } from "react";
// import axios from "axios";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [fatherName, setFatherName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [cnic, setCnic] = useState("");
//   const [phone, setPhone] = useState("");
//   const [otherPhone, setOtherPhone] = useState("");
//   const [homeAddress, setHomeAddress] = useState("");
//   const [licenseNumber, setLicenseNumber] = useState("");
//   // const [role, setRole] = useState("client");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("http://localhost:5005/api/auth/register", {
//         name,
//         fatherName,
//         email,
//         password,
//         cnic,
//         phone,
//         otherPhone,
//         homeAddress,
//         licenseNumber,
//         // role,
//       });

//       localStorage.setItem("userToken", data.token);
//       setMessage("Signup successful!");
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <h2 style={styles.heading}>Signup</h2>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           style={styles.input}
//         />
//         <input
//           type="text"
//           placeholder="Father's Name"
//           value={fatherName}
//           onChange={(e) => setFatherName(e.target.value)}
//           required
//           style={styles.input}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={styles.input}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={styles.input}
//         />
//         <input
//           type="text"
//           placeholder="CNIC"
//           value={cnic}
//           onChange={(e) => setCnic(e.target.value)}
//           required
//           style={styles.input}
//         />
//         <input
//           type="text"
//           placeholder="Phone"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           required
//           style={styles.input}
//         />
//         <input
//           type="text"
//           placeholder="Other Phone (optional)"
//           value={otherPhone}
//           onChange={(e) => setOtherPhone(e.target.value)}
//           style={styles.input}
//         />
//         <input
//           type="text"
//           placeholder="Home Address"
//           value={homeAddress}
//           onChange={(e) => setHomeAddress(e.target.value)}
//           required
//           style={styles.input}
//         />
//         <input
//           type="text"
//           placeholder="License Number"
//           value={licenseNumber}
//           onChange={(e) => setLicenseNumber(e.target.value)}
//           style={styles.input}
//         />
//         {/* 
//         <select value={role} onChange={(e) => setRole(e.target.value)} required style={styles.input}>
//           <option value="client">Client</option>
//         </select>
//         */}
//         <button type="submit" style={styles.button}>
//           Signup
//         </button>
//         {message && <p style={styles.message}>{message}</p>}
//       </form>
//     </div>
//   );
// };

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
//   },
//   message: {
//     marginTop: "15px",
//     textAlign: "center",
//     color: "#d9534f",
//   },
// };

// export default Signup;





















import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  // ----- Signup States -----
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");
  const [otherPhone, setOtherPhone] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  // ----- Face Register States -----
  const [faceName, setFaceName] = useState("");
  const [imageName, setImageName] = useState("");
  const [file, setFile] = useState(null);
  const [faceStatus, setFaceStatus] = useState("");
  const [showFaceForm, setShowFaceForm] = useState(false);

  // ----- Signup Submit -----
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5005/api/auth/register", {
        name,
        fatherName,
        email,
        password,
        cnic,
        phone,
        otherPhone,
        homeAddress,
        licenseNumber,
      });

      localStorage.setItem("userToken", data.token);
      setSignupMessage("Signup successful!");
    } catch (error) {
      setSignupMessage(error.response?.data?.message || "Signup failed");
    }
  };

  // ----- Face Register Submit -----
  const handleFaceSubmit = async (e) => {
    e.preventDefault();
    if (!faceName || !file || !imageName) {
      setFaceStatus("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", faceName);
    formData.append("image", file);
    formData.append("image_name", imageName);

    try {
      const res = await fetch("https://dd96-2407-aa80-116-6313-50cd-ac3b-36f7-eea5.ngrok-free.app/register", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      setFaceStatus(result.message || "Upload successful.");
    } catch (err) {
      console.error("Registration error:", err);
      setFaceStatus("Upload failed.");
    }
  };

  return (
    <div style={{ maxWidth: "450px", margin: "30px auto" }}>
      {/* Signup Form */}
      <div style={styles.container}>
        <form onSubmit={handleSignupSubmit} style={styles.form}>
          <h2 style={styles.heading}>Signup</h2>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
          <input type="text" placeholder="Father's Name" value={fatherName} onChange={(e) => setFatherName(e.target.value)} required style={styles.input} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
          <input type="text" placeholder="CNIC" value={cnic} onChange={(e) => setCnic(e.target.value)} required style={styles.input} />
          <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required style={styles.input} />
          <input type="text" placeholder="Other Phone (optional)" value={otherPhone} onChange={(e) => setOtherPhone(e.target.value)} style={styles.input} />
          <input type="text" placeholder="Home Address" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} required style={styles.input} />
          <input type="text" placeholder="License Number" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} style={styles.input} />
          
          <button type="submit" style={styles.button}>Signup</button>
          {signupMessage && <p style={styles.message}>{signupMessage}</p>}

          <button type="button" style={{ ...styles.button, backgroundColor: "#282c34", marginTop: "10px" }}
            onClick={() => setShowFaceForm(!showFaceForm)}>
            {showFaceForm ? "Hide Face Registration" : "Register Face"}
          </button>
        </form>
      </div>

      {/* Face Register Form (Conditional) */}
      {showFaceForm && (
        <div style={styles.container}>
          <form onSubmit={handleFaceSubmit} style={styles.form}>
            <h2 style={styles.heading}>Register New Face</h2>
            <input
              type="text"
              placeholder="Person Name (Folder)"
              value={faceName}
              onChange={(e) => setFaceName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Image Name (e.g. front_view)"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Register</button>
            {faceStatus && <p style={styles.message}>{faceStatus}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    marginBottom: "30px",
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
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    color: "#d9534f",
  },
};

export default Signup;
