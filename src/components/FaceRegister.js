import React, { useState } from "react";


export default function FaceRegister() {
  const [name, setName] = useState("");
  const [imageName, setImageName] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !file || !imageName) {
      setStatus("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", file);
    formData.append("image_name", imageName);

    try {
      const res = await fetch("https://5c60-202-165-233-9.ngrok-free.app", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      setStatus(result.message || "Upload successful.");
    } catch (err) {
      console.error("Registration error:", err);
      setStatus("Upload failed.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register New Face</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Person Name (Folder)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image Name (e.g. front_view)"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>{status}</p>
    </div>
  );
}
