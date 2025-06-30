// import React, { useEffect, useRef, useState } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const LiveLocationWithMarker = () => {
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);
//   const [ws, setWs] = useState(null); // WebSocket state

//   useEffect(() => {
//     // Initialize WebSocket connection
//     const socket = new WebSocket("ws://localhost:3001");

//     socket.onopen = () => {
//       console.log("Connected to WebSocket server");
//     };

//     socket.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         if (data.latitude && data.longitude) {
//           updateLocation(data.latitude, data.longitude);
//         }
//       } catch (error) {
//         console.error("Error parsing JSON:", error);
//       }
//     };


//     socket.onclose = () => {
//       console.log("WebSocket disconnected");
//     };

//     setWs(socket);

//     return () => {
//       socket.close();
//     };
//   }, []);

//   const updateLocation = (latitude, longitude) => {
//     mapRef.current.setView([latitude, longitude], 16);
//     if (markerRef.current) {
//       markerRef.current.setLatLng([latitude, longitude]);
//     } else {
//       markerRef.current = L.marker([latitude, longitude], {
//         title: "Your Location",
//       }).addTo(mapRef.current);
//     }
//   };

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           if (ws) {
//             ws.send(JSON.stringify({ latitude, longitude })); // Send location to WebSocket server
//           }
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//         },
//         { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   }, [ws]);

//   return <div id="map" style={{ height: "100vh", width: "100%" }} />;
// };

// export default LiveLocationWithMarker;





// import React, { useEffect, useRef, useState } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { io } from "socket.io-client";

// const LiveLocationWithMarker = ({ driverId }) => {
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);
//   const [socket, setSocket] = useState(null);
//   const [connectedClientId, setConnectedClientId] = useState(null);

//   useEffect(() => {
//     const newSocket = io("https://database-production-3a68.up.railway.app/driver"); // Connect to /driver namespace
//     setSocket(newSocket);

//     newSocket.on("connect", () => {
//       console.log("✅ Driver connected to /driver namespace:", newSocket.id);
//       newSocket.emit("register_driver", driverId);
//     });

//     // Listen for client connection event from server
//     newSocket.on("client_connected_to_driver", ({ clientId }) => {
//       console.log("Client connected:", clientId);
//       setConnectedClientId(clientId);
//     });

//     return () => newSocket.disconnect();
//   }, [driverId]);

//   useEffect(() => {
//     if (navigator.geolocation && socket) {
//       const watchId = navigator.geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;

//           if (connectedClientId) {
//             socket.emit("driver_location", {
//               driverId,
//               clientId: connectedClientId,
//               location: { lat: latitude, lng: longitude },
//             });
//           }

//           updateLocation(latitude, longitude);
//         },
//         (error) => console.error("Geolocation error:", error),
//         { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//       );
//       return () => navigator.geolocation.clearWatch(watchId);
//     }
//   }, [socket, connectedClientId]);

//   const updateLocation = (latitude, longitude) => {
//     if (!mapRef.current) {
//       mapRef.current = L.map("map").setView([latitude, longitude], 15);
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "© OpenStreetMap contributors",
//       }).addTo(mapRef.current);
//     }

//     if (markerRef.current) {
//       markerRef.current.setLatLng([latitude, longitude]);
//     } else {
//       markerRef.current = L.marker([latitude, longitude], {
//         title: "Driver Location",
//       }).addTo(mapRef.current);
//     }
//   };

//   return <div id="map" style={{ height: "100vh", width: "100%" }} />;
// };

// export default LiveLocationWithMarker;
















// import React, { useEffect, useRef, useState } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";


// const LiveLocationWithMarker = ({ driverId }) => {
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);
//   const [ws, setWs] = useState(null); // WebSocket state
//   const [connectedClientId, setConnectedClientId] = useState(null);

//   useEffect(() => {
//     // Connect to WebSocket server
//     const socket = new WebSocket("ws://localhost:5005");

//     socket.onopen = () => {
//       console.log("✅ Connected to WebSocket server");

//       // Register driver on WebSocket server
//       const registrationData = {
//         type: "register_driver",
//         driverId: driverId,
//       };
//       socket.send(JSON.stringify(registrationData));
//     };

//     socket.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);

//         // Client connected to driver
//         if (data.type === "client_connected_to_driver" && data.clientId) {
//           setConnectedClientId(data.clientId);
//           console.log("📲 Client connected:", data.clientId);
//         }
//       } catch (error) {
//         console.error("❌ Error parsing WebSocket message:", error);
//       }
//     };

//     socket.onclose = () => {
//       console.log("❌ WebSocket disconnected");
//     };

//     setWs(socket);

//     return () => {
//       socket.close();
//     };
//   }, [driverId]);

//   const updateMap = (latitude, longitude) => {
//     // Initialize map if not done already
//     if (!mapRef.current) {
//       mapRef.current = L.map("map").setView([latitude, longitude], 16);
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "© OpenStreetMap contributors",
//       }).addTo(mapRef.current);
//     }

//     // Update the marker position or create a new marker
//     if (markerRef.current) {
//       markerRef.current.setLatLng([latitude, longitude]);
//     } else {
//       markerRef.current = L.marker([latitude, longitude], {
//         title: "Driver Location",
//       }).addTo(mapRef.current);
//     }

//     // Keep the map centered on the driver's location
//     mapRef.current.setView([latitude, longitude]);
//   };

//   useEffect(() => {
//     if (navigator.geolocation) {
//       const watchId = navigator.geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;

//           // Update the map with the new location
//           updateMap(latitude, longitude);

//           // Send the live location to the WebSocket server
//           if (ws && ws.readyState === WebSocket.OPEN && connectedClientId) {
//             const payload = {
//               type: "driver_location",
//               driverId: driverId,
//               clientId: connectedClientId, // Client is connected to the driver
//               latitude,
//               longitude,
//             };
//             ws.send(JSON.stringify(payload)); // Send live location data
//           }
//         },
//         (error) => {
//           console.error("❌ Error getting geolocation:", error);
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 5000,
//           maximumAge: 0,
//         }
//       );

//       return () => {
//         navigator.geolocation.clearWatch(watchId); // Clean up geolocation watcher
//       };
//     } else {
//       console.error("❌ Geolocation is not supported by this browser.");
//     }
//   }, [ws, connectedClientId, driverId]);

//   return <div id="map" style={{ height: "60vh", width: "100%" }} />;
// };

// export default LiveLocationWithMarker;

// driver-side: LiveLocationWithMarker.jsx






// import React, { useEffect, useRef, useState } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { io } from "socket.io-client";

// const LiveLocationWithMarker = ({ driverId }) => {
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);
//   const [socket, setSocket] = useState(null);
//   const [connectedClientId, setConnectedClientId] = useState(null);

//   useEffect(() => {
//     const socketInstance = io("https://database-production-3a68.up.railway.app"); // must match backend
//     setSocket(socketInstance);

//     socketInstance.on("connect", () => {
//       console.log("✅ Socket.IO connected");

//       // Register driver
//       socketInstance.emit("register_driver", { driverId });
//     });

//     socketInstance.on("client_connected_to_driver", ({ clientId }) => {
//       console.log("📲 Client connected:", clientId);
//       setConnectedClientId(clientId);
//     });

//     socketInstance.on("disconnect", () => {
//       console.log("❌ Socket.IO disconnected");
//     });

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, [driverId]);

//   const updateMap = (latitude, longitude) => {
//     if (!mapRef.current) {
//       mapRef.current = L.map("map").setView([latitude, longitude], 16);
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "© OpenStreetMap contributors",
//       }).addTo(mapRef.current);
//     }

//     if (markerRef.current) {
//       markerRef.current.setLatLng([latitude, longitude]);
//     } else {
//       markerRef.current = L.marker([latitude, longitude], {
//         title: "Driver Location",
//       }).addTo(mapRef.current);
//     }

//     mapRef.current.setView([latitude, longitude]);
//   };

//   useEffect(() => {
//     if (navigator.geolocation) {
//       const watchId = navigator.geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;

//           updateMap(latitude, longitude);

//           if (socket && connectedClientId) {
//             socket.emit("driver_location", {
//               driverId,
//               clientId: connectedClientId,
//               latitude,
//               longitude,
//             });
//           }
//         },
//         (error) => {
//           console.error("❌ Geolocation error:", error);
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 5000,
//           maximumAge: 0,
//         }
//       );

//       return () => {
//         navigator.geolocation.clearWatch(watchId);
//       };
//     } else {
//       console.error("❌ Geolocation not supported");
//     }
//   }, [socket, connectedClientId, driverId]);

//   return <div id="map" style={{ height: "60vh", width: "100%" }} />;
// };

// export default LiveLocationWithMarker;

























import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { io } from "socket.io-client";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

const LiveLocationWithMarker = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [connectedClientId, setConnectedClientId] = useState(null);
  const [driverId, setDriverId] = useState(null);

  // Get driverId from localStorage on mount
  useEffect(() => {
    const storedId = localStorage.getItem("driverId");
    if (storedId) {
      setDriverId(storedId);
    } else {
      console.error("❌ driverId not found in localStorage");
    }
  }, []);

  // Setup WebSocket connection
  useEffect(() => {
    if (!driverId) return;

    const socketInstance = io("http://localhost:5000");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("✅ Socket.IO connected");
      socketInstance.emit("register_driver", driverId);
    });

    socketInstance.on("client_connected_to_driver", ({ clientId }) => {
      console.log("📲 Client connected:", clientId);
      setConnectedClientId(clientId);
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ Socket.IO disconnected");
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [driverId]);

  // Update Leaflet map
  const updateMap = (latitude, longitude) => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([latitude, longitude], 16);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    if (markerRef.current) {
      markerRef.current.setLatLng([latitude, longitude]);
    } else {
      markerRef.current = L.marker([latitude, longitude], {
        title: "Driver Location",
      }).addTo(mapRef.current);
    }

    mapRef.current.setView([latitude, longitude]);
  };

  // Watch geolocation and emit updates
  useEffect(() => {
    if (!driverId || !socket) return;

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateMap(latitude, longitude);

          if (connectedClientId) {
            console.log("📤 Sending location to client:", {
              driverId,
              clientId: connectedClientId,
              latitude,
              longitude,
            });

            socket.emit("send_location", {
              driverId,
              clientId: connectedClientId,
              latitude,
              longitude,
            });
          }
        },
        (error) => {
          console.error("❌ Geolocation error:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error("❌ Geolocation not supported by this browser.");
    }
  }, [socket, connectedClientId, driverId]);

  
  return (
    <>
      {!driverId && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          ⚠️ Driver ID not found. Please log in first.
        </div>
      )}
      <div id="map" style={{ height: "60vh", width: "100%" }} />
    </>
  );
};

export default LiveLocationWithMarker;
