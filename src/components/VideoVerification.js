// // this code is used for admin video call varification this code in working form no any issue in this code
// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";

// const VideoVerification = () => {
//   const videoRef = useRef(null);
//   const peerConnection = useRef(null);
//   const socket = useRef(null);
//   const [driverId] = useState("driver123");

//   useEffect(() => {
//     socket.current = io("http://localhost:5005/");

//     socket.current.emit("register_driver", driverId);
//     console.log(`📌 Driver registered: ${driverId}`);

//     socket.current.on("start_video_stream", async ({ adminId }) => {
//       console.log(`📡 Admin ${adminId} requested video.`);

//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       videoRef.current.srcObject = stream;
//       console.log("🎥 Camera access granted. Streaming video...");

//       peerConnection.current = new RTCPeerConnection();
//       stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));

//       peerConnection.current.onicecandidate = (event) => {
//         if (event.candidate) {
//           socket.current.emit("send_ice_candidate", { candidate: event.candidate, adminId });
//           console.log("📡 Sending ICE candidate...");
//         }
//       };
      

//       const offer = await peerConnection.current.createOffer();
//       await peerConnection.current.setLocalDescription(offer);

//       console.log("📡 Sending WebRTC offer to Admin...");
//       socket.current.emit("send_offer", { signal: offer, adminId, driverId });
//     });

//     socket.current.on("receive_answer", async ({ signal }) => {
//       console.log("📡 Received WebRTC answer from Admin.");
//       await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
//     });

//     return () => {
//       if (socket.current) {
//         socket.current.disconnect();
//         console.log("❌ Driver disconnected.");
//       }
//     };
//   }, [driverId]);

//   return (
//     <div>
//       <h2>Driver Video Stream</h2>
//       <video ref={videoRef} autoPlay playsInline style={{ width: "100%", border: "1px solid black" }} />
//     </div>
//   );
// };

// export default VideoVerification;












// this code is used for client direct video call varification with driver no involve admin this code in working form no any issue in this code
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./VideoVerification.css";

const VideoVerification = () => {
  const videoRef = useRef(null);
  const peerConnection = useRef(null);
  const socket = useRef(null);
  const [driverId] = useState("driver123");
  const [clientEmails, setClientEmails] = useState([]);

  useEffect(() => {
    socket.current = io("http://localhost:5005/", {
      transports: ["websocket", "polling"],
    });

    socket.current.emit("register_driver", driverId);
    console.log(`📌 Driver registered: ${driverId}`);

    socket.current.on("start_video_stream", async ({ clientEmail }) => {
      console.log(`📡 Client ${clientEmail} requested video.`);

      setClientEmails((prevEmails) => [
        ...new Set([...prevEmails, clientEmail]),
      ]);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
      console.log("🎥 Camera access granted. Streaming video...");

      peerConnection.current = new RTCPeerConnection();
      stream.getTracks().forEach((track) =>
        peerConnection.current.addTrack(track, stream)
      );

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("📡 Sending ICE candidate...");
          socket.current.emit("send_ice_candidate", {
            candidate: event.candidate,
            clientEmail,
          });
        }
      };

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      console.log("📡 Sending WebRTC offer to Client...");
      socket.current.emit("send_offer", {
        signal: offer,
        clientEmail,
        driverId,
      });
    });

    socket.current.on("receive_answer", async ({ signal }) => {
      console.log("📡 Received WebRTC answer from Client.");
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(signal)
      );
    });

    socket.current.on("receive_ice_candidate", ({ candidate }) => {
      console.log("📡 Received ICE candidate from Client.");
      if (peerConnection.current) {
        peerConnection.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      }
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        console.log("❌ Driver disconnected.");
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, [driverId]);

  return (
    <div className="video-container">
      <h2 className="video-title">Driver Video Stream</h2>
      <div className="video-box">
        <video ref={videoRef} autoPlay playsInline />
      </div>
      <h3 className="client-heading">Connected Clients:</h3>
      <ul className="client-list">
        {clientEmails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
    </div>
  );
};

export default VideoVerification;
