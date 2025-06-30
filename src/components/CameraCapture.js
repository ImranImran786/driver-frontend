import React, { useRef, useEffect, useState } from "react";
import { recognizeFace } from "../api";


export default function CameraCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        setMessage("Could not access webcam.");
        console.error(error);
      }
    };

    initCamera();
  }, []);

  const capture = async () => {
    setLoading(true);
    setMessage(""); // Clear previous message
    try {
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, 320, 240);
      const dataURL = canvasRef.current.toDataURL("image/jpeg");

      const res = await recognizeFace(dataURL);
      if (res.name === "Error") {
        setMessage("Something went wrong during recognition.");
      } else if (res.name === "Unknown") {
        setMessage("Face not recognized.");
      } else {
        setMessage(`Hello, ${res.name}`);
      }
    } catch (err) {
      setMessage("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="camera-container">
      <video
        ref={videoRef}
        autoPlay
        width="320"
        height="240"
        className="video-preview"
      />
      <button onClick={capture} disabled={loading} className="capture-button">
        {loading ? "Recognizing..." : "Capture & Recognize"}
      </button>
      <canvas
        ref={canvasRef}
        width="320"
        height="240"
        style={{ display: "none" }}
      />
      {message && (
        <div
          className="result-message"
          style={{ marginTop: "10px", fontWeight: "bold" }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
