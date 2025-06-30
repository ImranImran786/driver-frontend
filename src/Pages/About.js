import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5005/driver'); // Update to match your backend

const About = () => {
  const [clientMessage, setClientMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false); // New state to track connection
  const [driverId, setDriverId] = useState(localStorage.getItem('driverId') || '');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Connected to driver namespace');
      
      if (driverId) {
        console.log('📤 Registering driver with ID:', driverId);
        socket.emit('register_driver', driverId);
      } else {
        console.warn('⚠️ driverId not found in localStorage');
      }
    });

    // Listening for client connection to driver
    socket.on('client_connected_to_driver', ({ clientId, message }) => {
      console.log('📨 Received message:', message);
      setClientMessage(message);
      setIsConnected(true); // Mark the driver as connected
    });

    // Listening for client disconnection from driver
    socket.on('client_disconnected_from_driver', () => {
      console.log('📨 Client disconnected');
      setIsConnected(false); // Reset connection state
    });

    // Clean up
    return () => {
      socket.off('client_connected_to_driver');
      socket.off('client_disconnected_from_driver');
      socket.off('connect');
    };
  }, [driverId]);

  const handleDisconnect = () => {
    console.log('📤 Disconnecting from client');
    socket.emit('disconnect_driver', driverId); // Emit disconnect event to the server
    setIsConnected(false); // Update UI to reflect disconnect
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', lineHeight: '1.6' }}>
      {/* Show connection message */}
      {clientMessage && (
        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '15px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>
          {clientMessage}
        </div>
      )}

      {/* Static About Page Content */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#333' }}>About Us</h1>
        <p style={{ fontSize: '1.2rem', color: '#777' }}>
          Experience seamless car rental services designed to meet your every need.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '300px', textAlign: 'justify' }}>
          <h2 style={{ color: '#333' }}>Who We Are</h2>
          <p>
            At <strong>DriveEase Rentals</strong>, we believe in making travel hassle-free and enjoyable.
            Our mission is to provide top-notch car rental services, offering a wide range of vehicles
            that cater to all preferences and budgets.
          </p>
        </div>
        <div style={{ flex: '1', minWidth: '300px', textAlign: 'justify' }}>
          <h2 style={{ color: '#333' }}>What We Offer</h2>
          <p>
            From luxurious sedans to spacious SUVs and economy cars, our fleet is constantly updated to
            ensure safety, comfort, and style.
          </p>
        </div>
        <div style={{ flex: '1', minWidth: '300px', textAlign: 'justify' }}>
          <h2 style={{ color: '#333' }}>Why Choose Us?</h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>Affordable and competitive pricing</li>
            <li>Flexible pick-up and drop-off</li>
            <li>Modern vehicles</li>
            <li>24/7 support</li>
            <li>Easy booking</li>
          </ul>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_M3oxTZcrbtplW06GMgPzOEevturgIeu_KQ&s"
          alt="About Us"
          style={{ maxWidth: '100%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
        />
      </div>

      {/* Disconnect Button */}
      {isConnected && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button 
            onClick={handleDisconnect} 
            style={{
              padding: '10px 20px',
              backgroundColor: '#e74c3c',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Disconnect
          </button>
        </div>
      )}

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <h3 style={{ color: '#333' }}>Ready to Drive?</h3>
        <p style={{ color: '#777', fontSize: '1.1rem' }}>
          Discover the joy of stress-free travel with <strong>DriveEase Rentals</strong>.
        </p>
      </div>
    </div>
  );
};

export default About;
