
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TodaySlots = ({ driverId }) => {
//   const [assignments, setAssignments] = useState([]);
//   const [clients, setClients] = useState({});
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   // ✅ Fetch individual client data
//   const fetchClientDetails = async (clientId) => {
//     const id = typeof clientId === 'object' ? clientId?._id : clientId;
//     if (!id || clients[id]) return; // Skip if already fetched

//     try {
//       const res = await axios.get(`http://localhost:5005/api/users/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const user = res.data; // ✅ Your backend returns raw user object
//       if (user?.role !== "client") {
//         console.warn(`⚠️ Skipping user ${id}, not a client (role: ${user?.role})`);
//         return;
//       }

//       setClients((prev) => ({
//         ...prev,
//         [id]: user,
//       }));
//     } catch (err) {
//       console.error("❌ Failed to fetch client:", err.message);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5005/api/assignments/driver-assignments/${driverId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const today = new Date().toDateString();

//         const filteredAssignments = res.data
//           .map((assignment) => ({
//             ...assignment,
//             slots: (assignment.slots || []).filter(
//               (slot) => new Date(slot.startTime).toDateString() === today
//             ),
//           }))
//           .filter((assignment) => assignment.slots.length > 0);

//         setAssignments(filteredAssignments);

//         const clientIds = filteredAssignments.map((a) =>
//           typeof a.clientId === 'object' ? a.clientId._id : a.clientId
//         );
//         const uniqueClientIds = [...new Set(clientIds)];
//         await Promise.all(uniqueClientIds.map(fetchClientDetails));
//       } catch (error) {
//         console.error("❌ Failed to fetch today's assignments:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (driverId) fetchData();
//   }, [driverId]);

//   if (loading) return <p>Loading today's slots...</p>;
//   if (!assignments.length) return <p>No slots assigned for today.</p>;

//   return (
//     <div>
//       <h2 style={{ marginBottom: '15px' }}>Today's Assigned Slots</h2>
//       {assignments.map((assignment) => {
//         const clientId =
//           typeof assignment.clientId === 'object'
//             ? assignment.clientId._id
//             : assignment.clientId;

//         const client = clients[clientId];

//         return (
//           <div
//             key={assignment._id}
//             style={{
//               border: '1px solid #ccc',
//               padding: '15px',
//               marginBottom: '20px',
//               borderRadius: '10px',
//               backgroundColor: '#f9f9f9',
//               boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//             }}
//           >
//             <p>
//               <strong>Client ID:</strong> {clientId || 'N/A'} <br />
//               <strong>Client Name:</strong> {client?.name || 'Loading...'} <br />
//               <strong>Phone:</strong> {client?.phone || 'Not Available'} <br />
//               <strong>Address:</strong> {client?.homeAddress || 'Not Available'}
//             </p>

//             {assignment.slots.map((slot, index) => (
//               <div
//                 key={slot._id || index}
//                 style={{
//                   backgroundColor: '#fff',
//                   border: '1px dashed #999',
//                   borderRadius: '8px',
//                   padding: '10px',
//                   marginTop: '10px',
//                 }}
//               >
//                 <p><strong>Slot #{index + 1}</strong></p>
//                 <p>Start: {new Date(slot.startTime).toLocaleString()}</p>
//                 <p>End: {new Date(slot.endTime).toLocaleString()}</p>
//                 {slot.extensionReason && (
//                   <p style={{ color: 'red' }}>
//                     <strong>Extension Reason:</strong> {slot.extensionReason}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default TodaySlots;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TimeSlot = ({ driverId }) => {
//   const [todaySlots, setTodaySlots] = useState([]);
//   const [clientDataMap, setClientDataMap] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTodaySlots = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5005/api/assignments/driver-assignments/${driverId}`);
//         const assignments = res.data || [];
//         const today = new Date().toDateString();

//         const slots = [];

//         // Step 1: Extract today’s slots + clientId
//         for (const assignment of assignments) {
//           const clientId = assignment.clientId;

//           for (const slot of assignment.slots || []) {
//             const start = new Date(slot.startTime);
//             if (start.toDateString() === today) {
//               console.log("✅ Slot found:", slot);
//               console.log("🧑‍💼 Client ID:", clientId);
//               slots.push({ ...slot, clientId });
//             }
//           }
//         }

//         setTodaySlots(slots);

//         // Step 2: Fetch client details for unique IDs
//         const uniqueClientIds = [...new Set(slots.map(s => s.clientId))];
//         const clientMap = {};

//         for (const id of uniqueClientIds) {
//   try {
//     const clientRes = await axios.get(`http://localhost:5005/api/users/${id}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('userToken')}`,  // ✅ Pass stored token
//       },
//     });
//     console.log("✅ Client Data Response:", clientRes.data);
//     clientMap[id] = clientRes.data;
//   } catch (err) {
//     console.error(`❌ Failed to fetch client ${id}`, err.message);
//     clientMap[id] = null;
//   }
// }



//         setClientDataMap(clientMap);
//       } catch (err) {
//         console.error("❌ Error loading today's slots", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTodaySlots();
//   }, [driverId]);

//   if (loading) return <p>Loading...</p>;
//   if (!todaySlots.length) return <p>No slots found for today.</p>;

//   return (
//     <div>
//       <h2>📅 Driver's Today Slots</h2>
//       {todaySlots.map((slot, index) => {
//         const client = clientDataMap[slot.clientId];
//         const start = new Date(slot.startTime).toLocaleString();
//         const end = new Date(slot.endTime).toLocaleString();

//         return (
//           <div
//             key={slot._id || index}
//             style={{
//               border: '1px solid #ccc',
//               padding: '12px',
//               margin: '10px 0',
//               borderRadius: '8px',
//               backgroundColor: '#f9f9f9',
//             }}
//           >
//             <h4>Slot #{index + 1}</h4>
//             <p><strong>⏰ Time:</strong> {start} — {end}</p>

//             {client ? (
//               <>
//                 <p><strong>👤 Name:</strong> {client.name}</p>
//                 <p><strong>📧 Email:</strong> {client.email}</p>
//                 <p><strong>📞 Phone:</strong> {client.phone}</p>
//               </>
//             ) : (
//               <p style={{ color: 'red' }}>⚠️ Client information not available</p>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default TimeSlot;









import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodaySlots = ({ driverId }) => {
    const [assignments, setAssignments] = useState([]);
    const [clients, setClients] = useState({});
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("userToken"); // make sure token key matches

    // ✅ Fetch individual client data if not already loaded
    const fetchClientDetails = async (clientId) => {
        const id = typeof clientId === 'object' ? clientId?._id : clientId;
        if (!id || clients[id]) return;

        try {
            const res = await axios.get(`http://localhost:5005/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const user = res.data;
            if (user?.role !== "client") return;

            setClients((prev) => ({
                ...prev,
                [id]: user,
            }));
        } catch (err) {
            console.error(`❌ Failed to fetch client ${clientId}:`, err.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5005/api/assignments/driver-assignments/${driverId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const today = new Date().toDateString();

                const filteredAssignments = res.data
                    .map((assignment) => ({
                        ...assignment,
                        slots: (assignment.slots || []).filter(
                            (slot) => new Date(slot.startTime).toDateString() === today
                        ),
                    }))
                    .filter((a) => a.slots.length > 0);

                setAssignments(filteredAssignments);

                const clientIds = filteredAssignments.map((a) =>
                    typeof a.clientId === 'object' ? a.clientId._id : a.clientId
                );
                const uniqueClientIds = [...new Set(clientIds)];
                await Promise.all(uniqueClientIds.map(fetchClientDetails));
            } catch (error) {
                console.error("❌ Failed to fetch today's assignments:", error.message);
            } finally {
                setLoading(false);
            }
        };

        if (driverId) fetchData();
    }, [driverId]);

    if (loading) return <p>Loading today's slots...</p>;
    if (!assignments.length) return <p>No slots assigned for today.</p>;

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>📅 Today's Assigned Slots</h2>
            {assignments.map((assignment) => {
                const clientId =
                    typeof assignment.clientId === 'object'
                        ? assignment.clientId._id
                        : assignment.clientId;

                const client = clients[clientId];

                return (
                    <div
                        key={assignment._id}
                        style={{
                            border: '2px solid #e0e0e0',
                            borderRadius: '12px',
                            padding: '20px',
                            marginBottom: '25px',
                            backgroundColor: '#fdfdfd',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                        }}
                    >
                        <div
              style={{
                border: '2px solid #aaa',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '8px',
                backgroundColor: '#fff',
              }}
            >
              <h4>👤 Client Information</h4>
              <p><strong>Name:</strong> {client?.name || 'Loading...'}</p>
              <p><strong>Phone:</strong> {client?.phone || 'N/A'}</p>
              <p><strong>Address:</strong> {client?.homeAddress || 'N/A'}</p>
            </div>

                        {assignment.slots.map((slot, index) => {
    const isExpired = new Date(slot.endTime) < new Date();

    return (
        <div
            key={slot._id || index}
            style={{
                padding: '10px 15px',
                border: '1.5px dashed #ccc',
                borderRadius: '8px',
                marginBottom: '12px',
                // backgroundColor: isExpired ? '#ffe6e6' : 'green',
                // boxShadow: isExpired ? '0 0 8px rgba(255, 0, 0, 0.2)' : 'none',
            }}
        >
            <p><strong>Slot #{index + 1}</strong></p>
            <p>⏰ Start: {new Date(slot.startTime).toLocaleString()}</p>
            <p>⏳ End: {new Date(slot.endTime).toLocaleString()}</p>

            {slot.extensionReason && (
                <p style={{ color: 'red' }}>
                    <strong>🔁 Extension Reason:</strong> {slot.extensionReason}
                </p>
            )}

            {isExpired && (
                <p style={{ color: 'white', backgroundColor: 'red',opacity: 0.6, padding: '6px 10px', borderRadius: '6px', fontWeight: 'bold', marginTop: '8px' }}>
                    ⚠️ Slot is expired
                </p>
            )}
        </div>
    );
})}

                    </div>
                );
            })}
        </div>
    );
};

export default TodaySlots;
