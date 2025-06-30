// // this code is ok with endtime 
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const TimeSlot = ({ driverId }) => {
// //   const [assignments, setAssignments] = useState([]);
// //   const [clients, setClients] = useState({});
// //   const [message, setMessage] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const [extensions, setExtensions] = useState({});
// //   const [timeLeft, setTimeLeft] = useState({});

// //   const token = localStorage.getItem('userToken');

// //   const isActiveSlotPresent = (data) => {
// //     const now = new Date();
// //     return data.some((assignment) =>
// //       assignment.slots.some((slot) => {
// //         const start = new Date(slot.startTime);
// //         const end = new Date(slot.endTime);
// //         return start.toDateString() === now.toDateString() && now >= start && now <= end;
// //       })
// //     );
// //   };

// //   const updateDriverStatus = async (status) => {
// //     try {
// //       await axios.put(`https://database-production-3a68.up.railway.app/api/users/update-status/${driverId}`, { status });
// //     } catch (err) {
// //       console.error("Failed to update driver status", err.message);
// //     }
// //   };

// //   const fetchClientDetails = async (clientId) => {
// //     const id = typeof clientId === 'object' ? clientId?._id : clientId;
// //     if (!id || clients[id]) return;

// //     try {
// //       const res = await axios.get(`https://database-production-3a68.up.railway.app/api/users/${id}`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       const user = res.data;
// //       if (user?.role !== 'client') return;

// //       setClients((prev) => ({
// //         ...prev,
// //         [id]: user,
// //       }));
// //     } catch (err) {
// //       console.error(`❌ Failed to fetch client ${clientId}:`, err.message);
// //     }
// //   };

// //   const fetchAssignments = async () => {
// //     try {
// //       const res = await axios.get(`https://database-production-3a68.up.railway.app/api/assignments/driver-assignments/${driverId}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       const data = res.data || [];
// //       const now = new Date();

// //       const filtered = data
// //         .map((a) => ({
// //           ...a,
// //           slots: (a.slots || []).filter((slot) => {
// //             const start = new Date(slot.startTime);
// //             const end = new Date(slot.endTime);
// //             return start.toDateString() === now.toDateString() && now >= start && now <= end;
// //           }),
// //         }))
// //         .filter((a) => a.slots.length > 0);

// //       setAssignments(filtered);

// //       const clientIds = filtered.map((a) =>
// //         typeof a.clientId === 'object' ? a.clientId._id : a.clientId
// //       );
// //       const uniqueClientIds = [...new Set(clientIds)];
// //       await Promise.all(uniqueClientIds.map(fetchClientDetails));

// //       if (isActiveSlotPresent(data)) {
// //         await updateDriverStatus('Connected');
// //       } else {
// //         await updateDriverStatus('Available');
// //       }
// //     } catch (err) {
// //       setMessage('Failed to fetch assignments.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAssignments();
// //   }, [driverId]);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       const now = new Date();
// //       const updated = {};

// //       assignments.forEach((assignment) => {
// //         assignment.slots.forEach((slot, index) => {
// //           const key = `${assignment._id}_${index}`;
// //           const end = new Date(slot.endTime);
// //           const secondsLeft = Math.max(0, Math.floor((end - now) / 1000));
// //           updated[key] = secondsLeft;

// //           if (secondsLeft <= 600 && secondsLeft > 0 && !timeLeft[key + '_alerted']) {
// //             alert(`⏰ Less than 10 minutes left for Slot #${index + 1}`);
// //             setTimeLeft((prev) => ({
// //               ...prev,
// //               [key + '_alerted']: true,
// //             }));
// //           }
// //         });
// //       });

// //       setTimeLeft((prev) => ({
// //         ...prev,
// //         ...updated,
// //       }));
// //     }, 1000);

// //     return () => clearInterval(interval);
// //   }, [assignments, timeLeft]);

// //   const handleChange = (assignmentId, slotIndex, field, value) => {
// //     setExtensions((prev) => ({
// //       ...prev,
// //       [`${assignmentId}_${slotIndex}`]: {
// //         ...prev[`${assignmentId}_${slotIndex}`],
// //         [field]: value,
// //       },
// //     }));
// //   };

// //   const handleExtend = async (assignmentId, slotIndex, slot) => {
// //     const key = `${assignmentId}_${slotIndex}`;
// //     const { minutes, reason } = extensions[key] || {};

// //     if (!reason || minutes <= 0 || minutes > 60) {
// //       setMessage('Reason is required and extension must be between 1-60 minutes.');
// //       return;
// //     }

// //     try {
// //       const res = await axios.post(
// //         'https://database-production-3a68.up.railway.app/api/assignments/extend-slot',
// //         {
// //           assignmentId,
// //           slotIndex,
// //           extensionMinutes: minutes,
// //           reason,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       setMessage(`Slot extended to ${new Date(res.data.newEndTime).toLocaleString()}`);
// //       setAssignments((prev) =>
// //         prev.map((a) =>
// //           a._id === assignmentId
// //             ? {
// //                 ...a,
// //                 slots: a.slots.map((s, i) =>
// //                   i === slotIndex
// //                     ? {
// //                         ...s,
// //                         endTime: res.data.newEndTime,
// //                         extensions: [...s.extensions, { reason, extendedByMinutes: minutes }],
// //                       }
// //                     : s
// //                 ),
// //               }
// //             : a
// //         )
// //       );
// //     } catch (err) {
// //       setMessage(err.response?.data?.message || 'Failed to extend time slot.');
// //     }
// //   };

// //   const handleCompleteEarly = async () => {
// //     try {
// //       await updateDriverStatus('Available');
// //       setAssignments([]);
// //       setMessage('Slot marked completed. Status set to Available.');
// //     } catch (err) {
// //       setMessage('Error marking slot as completed.');
// //     }
// //   };

// //   const formatTime = (seconds) => {
// //     const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
// //     const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
// //     const s = (seconds % 60).toString().padStart(2, '0');
// //     return `${h}:${m}:${s}`;
// //   };

// //   if (loading) return <p>Loading...</p>;
// //   if (!assignments.length) return <p>No active assignments found.</p>;

// //   return (
// //     <div>
// //       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>📋 Assigned Time Slots (Today)</h2>

// //       {assignments.map((assignment) => {
// //         const clientId = typeof assignment.clientId === 'object' ? assignment.clientId._id : assignment.clientId;
// //         const client = clients[clientId];

// //         return (
// //           <div
// //             key={assignment._id}
// //             style={{
// //               border: '2px solid #ccc',
// //               padding: '20px',
// //               marginBottom: '25px',
// //               borderRadius: '10px',
// //               backgroundColor: '#f9f9f9',
// //             }}
// //           >
// //             {/* Client Info */}
// //             <div
// //               style={{
// //                 border: '2px solid #aaa',
// //                 padding: '10px',
// //                 marginBottom: '15px',
// //                 borderRadius: '8px',
// //                 backgroundColor: '#fff',
// //               }}
// //             >
// //               <h4>👤 Client Information</h4>
// //               <p><strong>Name:</strong> {client?.name || 'Loading...'}</p>
// //               <p><strong>Phone:</strong> {client?.phone || 'N/A'}</p>
// //               <p><strong>Email:</strong> {client?.email || 'N/A'}</p>
// //               <p><strong>Address:</strong> {client?.homeAddress || 'N/A'}</p>
// //             </div>

// //             {/* Slot Info */}
// //             {assignment.slots.map((slot, index) => {
// //               const start = new Date(slot.startTime);
// //               const end = new Date(slot.endTime);
// //               const key = `${assignment._id}_${index}`;
// //               const ext = extensions[key] || {};
// //               const seconds = timeLeft[key] || 0;

// //               return (
// //                 <div
// //                   key={slot._id || index}
// //                   style={{
// //                     border: '1.5px dashed #888',
// //                     padding: '15px',
// //                     marginBottom: '15px',
// //                     borderRadius: '8px',
// //                     backgroundColor: '#fff',
// //                   }}
// //                 >
// //                   <p><strong>Slot #{index + 1}</strong></p>
// //                   <p>🕒 Start: {start.toLocaleString()}</p>
// //                   <p>⏳ End: {end.toLocaleString()}</p>
// //                   {/* <p><strong>⏰ Remaining Time:</strong> {formatTime(seconds)}</p> */}
// //                   <div
// //   style={{
// //     display: 'inline-block',
// //     padding: '10px 20px',
// //     backgroundColor: seconds <= 600 ? '#ffcccc' : '#d1e7dd',
// //     color: '#212529',
// //     fontWeight: 'bold',
// //     fontSize: '1.5rem',
// //     borderRadius: '8px',
// //     border: '2px solid #ced4da',
// //     marginBottom: '10px',
// //     textAlign: 'center',
// //   }}
// // >
// //   ⏰ Remaining Time: {formatTime(seconds)}
// // </div>


// //                   {slot.extensions?.length > 0 && (
// //                     <ul>
// //                       {slot.extensions.map((e, i) => (
// //                         <li key={i}>+{e.extendedByMinutes} mins — {e.reason}</li>
// //                       ))}
// //                     </ul>
// //                   )}

// //                   <div>
// //                     <input
// //                       type="number"
// //                       placeholder="Minutes (max 60)"
// //                       value={ext.minutes || ''}
// //                       onChange={(e) => handleChange(assignment._id, index, 'minutes', parseInt(e.target.value))}
// //                     />
// //                     <input
// //                       type="text"
// //                       placeholder="Reason"
// //                       value={ext.reason || ''}
// //                       onChange={(e) => handleChange(assignment._id, index, 'reason', e.target.value)}
// //                     />
// //                     <button onClick={() => handleExtend(assignment._id, index, slot)}>
// //                       Request Extension
// //                     </button>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         );
// //       })}

// //       <div style={{ marginTop: '30px', textAlign: 'center' }}>
// //         <button
// //           onClick={handleCompleteEarly}
// //           style={{ backgroundColor: 'green', color: 'white', padding: '12px 25px', fontWeight: 'bold' }}
// //         >
// //           ✅ Mark All as Completed
// //         </button>
// //       </div>

// //       {message && <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{message}</p>}
// //     </div>
// //   );
// // };

// // export default TimeSlot;
















// // this code is withuot endtime 
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TimeSlot = ({ driverId }) => {
//   const [assignments, setAssignments] = useState([]);
//   const [clients, setClients] = useState({});
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [extensions, setExtensions] = useState({});

//   const token = localStorage.getItem('userToken');

//   const isActiveSlotPresent = (data) => {
//     const now = new Date();
//     return data.some((assignment) =>
//       assignment.slots.some((slot) => {
//         const start = new Date(slot.startTime);
//         return start.toDateString() === now.toDateString() && now >= start;
//       })
//     );
//   };

//   const updateDriverStatus = async (status) => {
//     try {
//       await axios.put(`https://database-production-3a68.up.railway.app/api/users/update-status/${driverId}`, { status });
//     } catch (err) {
//       console.error("Failed to update driver status", err.message);
//     }
//   };

//   const fetchClientDetails = async (clientId) => {
//     const id = typeof clientId === 'object' ? clientId?._id : clientId;
//     if (!id || clients[id]) return;

//     try {
//       const res = await axios.get(`https://database-production-3a68.up.railway.app/api/users/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const user = res.data;
//       if (user?.role !== 'client') return;

//       setClients((prev) => ({
//         ...prev,
//         [id]: user,
//       }));
//     } catch (err) {
//       console.error(`❌ Failed to fetch client ${clientId}:`, err.message);
//     }
//   };

//   const fetchAssignments = async () => {
//     try {
//       const res = await axios.get(`https://database-production-3a68.up.railway.app/api/assignments/driver-assignments/${driverId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = res.data || [];
//       const now = new Date();

//       const filtered = data
//         .map((a) => ({
//           ...a,
//           slots: (a.slots || []).filter((slot) => {
//             const start = new Date(slot.startTime);
//             return start.toDateString() === now.toDateString() && now >= start;
//           }),
//         }))
//         .filter((a) => a.slots.length > 0);

//       setAssignments(filtered);

//       const clientIds = filtered.map((a) =>
//         typeof a.clientId === 'object' ? a.clientId._id : a.clientId
//       );
//       const uniqueClientIds = [...new Set(clientIds)];
//       await Promise.all(uniqueClientIds.map(fetchClientDetails));

//       if (isActiveSlotPresent(data)) {
//         await updateDriverStatus('Connected');
//       } else {
//         await updateDriverStatus('Available');
//       }
//     } catch (err) {
//       setMessage('Failed to fetch assignments.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAssignments();
//   }, [driverId]);

//   const handleChange = (assignmentId, slotIndex, field, value) => {
//     setExtensions((prev) => ({
//       ...prev,
//       [`${assignmentId}_${slotIndex}`]: {
//         ...prev[`${assignmentId}_${slotIndex}`],
//         [field]: value,
//       },
//     }));
//   };

//   const handleExtend = async (assignmentId, slotIndex, slot) => {
//     const key = `${assignmentId}_${slotIndex}`;
//     const { minutes, reason } = extensions[key] || {};

//     if (!reason || minutes <= 0 || minutes > 60) {
//       setMessage('Reason is required and extension must be between 1-60 minutes.');
//       return;
//     }

//     try {
//       await axios.post(
//         'https://database-production-3a68.up.railway.app/api/assignments/extend-slot',
//         {
//           assignmentId,
//           slotIndex,
//           extensionMinutes: minutes,
//           reason,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage(`Slot extension requested.`);
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Failed to extend time slot.');
//     }
//   };

//   const handleCompleteEarly = async () => {
//     try {
//       await updateDriverStatus('Available');
//       setAssignments([]);
//       setMessage('Slot marked completed. Status set to Available.');
//     } catch (err) {
//       setMessage('Error marking slot as completed.');
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!assignments.length) return <p>No active assignments found.</p>;

//   return (
//     <div>
//       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>📋 Assigned Time Slots (Today)</h2>

//       {assignments.map((assignment) => {
//         const clientId = typeof assignment.clientId === 'object' ? assignment.clientId._id : assignment.clientId;
//         const client = clients[clientId];

//         return (
//           <div
//             key={assignment._id}
//             style={{
//               border: '2px solid #ccc',
//               padding: '20px',
//               marginBottom: '25px',
//               borderRadius: '10px',
//               backgroundColor: '#f9f9f9',
//             }}
//           >
//             <div
//               style={{
//                 border: '2px solid #aaa',
//                 padding: '10px',
//                 marginBottom: '15px',
//                 borderRadius: '8px',
//                 backgroundColor: '#fff',
//               }}
//             >
//               <h4>👤 Client Information</h4>
//               <p><strong>Name:</strong> {client?.name || 'Loading...'}</p>
//               <p><strong>Phone:</strong> {client?.phone || 'N/A'}</p>
//               <p><strong>Email:</strong> {client?.email || 'N/A'}</p>
//               <p><strong>Address:</strong> {client?.homeAddress || 'N/A'}</p>
//             </div>

//             {assignment.slots.map((slot, index) => {
//               const start = new Date(slot.startTime);
//               const key = `${assignment._id}_${index}`;
//               const ext = extensions[key] || {};

//               return (
//                 <div
//                   key={slot._id || index}
//                   style={{
//                     border: '1.5px dashed #888',
//                     padding: '15px',
//                     marginBottom: '15px',
//                     borderRadius: '8px',
//                     backgroundColor: '#fff',
//                   }}
//                 >
//                   <p><strong>Slot #{index + 1}</strong></p>
//                   <p>🕒 Start: {start.toLocaleString()}</p>

//                   {slot.extensions?.length > 0 && (
//                     <ul>
//                       {slot.extensions.map((e, i) => (
//                         <li key={i}>+{e.extendedByMinutes} mins — {e.reason}</li>
//                       ))}
//                     </ul>
//                   )}

//                   <div>
//                     <input
//                       type="number"
//                       placeholder="Minutes (max 60)"
//                       value={ext.minutes || ''}
//                       onChange={(e) => handleChange(assignment._id, index, 'minutes', parseInt(e.target.value))}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Reason"
//                       value={ext.reason || ''}
//                       onChange={(e) => handleChange(assignment._id, index, 'reason', e.target.value)}
//                     />
//                     <button onClick={() => handleExtend(assignment._id, index, slot)}>
//                       Request Extension
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         );
//       })}

//       <div style={{ marginTop: '30px', textAlign: 'center' }}>
//         <button
//           onClick={handleCompleteEarly}
//           style={{ backgroundColor: 'green', color: 'white', padding: '12px 25px', fontWeight: 'bold' }}
//         >
//           ✅  Mark All as Completed
//         </button>
//       </div>

//       {message && <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{message}</p>}
//     </div>
//   );
// };

// export default TimeSlot;










// this code is ok without endtime and perform all functionality
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TimeSlot = ({ driverId }) => {
//   const [assignments, setAssignments] = useState([]);
//   const [clients, setClients] = useState({});
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [timers, setTimers] = useState({}); // timer values for each slot

//   const token = localStorage.getItem('userToken');

//   const isActiveSlotPresent = (data) => {
//     const now = new Date();
//     return data.some((assignment) =>
//       assignment.slots.some((slot) => {
//         const start = new Date(slot.startTime);
//         return start.toDateString() === now.toDateString() && now >= start && !slot.endTime;
//       })
//     );
//   };

//   const updateDriverStatus = async (status) => {
//     try {
//       await axios.put(`https://database-production-3a68.up.railway.app/api/users/update-status/${driverId}`, { status });
//     } catch (err) {
//       console.error("Failed to update driver status", err.message);
//     }
//   };

//   const fetchClientDetails = async (clientId) => {
//     const id = typeof clientId === 'object' ? clientId?._id : clientId;
//     if (!id || clients[id]) return;

//     try {
//       const res = await axios.get(`https://database-production-3a68.up.railway.app/api/users/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const user = res.data;
//       if (user?.role !== 'client') return;

//       setClients((prev) => ({
//         ...prev,
//         [id]: user,
//       }));
//     } catch (err) {
//       console.error(`❌ Failed to fetch client ${clientId}:`, err.message);
//     }
//   };

//   const fetchAssignments = async () => {
//     try {
//       const res = await axios.get(`https://database-production-3a68.up.railway.app/api/assignments/driver-assignments/${driverId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = res.data || [];
//       const now = new Date();

//       const filtered = data
//         .map((a) => ({
//           ...a,
//           slots: (a.slots || []).filter((slot) => {
//             const start = new Date(slot.startTime);
//             return start.toDateString() === now.toDateString() && now >= start && !slot.endTime;
//           }),
//         }))
//         .filter((a) => a.slots.length > 0);

//       setAssignments(filtered);

//       const clientIds = filtered.map((a) =>
//         typeof a.clientId === 'object' ? a.clientId._id : a.clientId
//       );
//       const uniqueClientIds = [...new Set(clientIds)];
//       await Promise.all(uniqueClientIds.map(fetchClientDetails));

//       if (isActiveSlotPresent(data)) {
//         await updateDriverStatus('Connected');
//       } else {
//         await updateDriverStatus('Available');
//       }

//       // Set timers for slots
//       const newTimers = {};
//       filtered.forEach((assignment) => {
//         assignment.slots.forEach((slot, index) => {
//           const key = `${assignment._id}_${index}`;
//           newTimers[key] = Math.floor((new Date() - new Date(slot.startTime)) / 1000);
//         });
//       });
//       setTimers(newTimers);
//     } catch (err) {
//       setMessage('Failed to fetch assignments.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMarkCompleted = async (assignmentId, slotIndex) => {
//     try {
//       await axios.put(
//         `https://database-production-3a68.up.railway.app/api/assignments/complete-slot`,
//         { assignmentId, slotIndex },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setMessage('✅ Slot marked as completed.');
//       fetchAssignments();
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Failed to mark slot completed.');
//     }
//   };

//   useEffect(() => {
//     fetchAssignments();
//   }, [driverId]);

//   // ⏱ Timer updater
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimers((prevTimers) => {
//         const updated = {};
//         for (let key in prevTimers) {
//           updated[key] = prevTimers[key] + 1;
//         }
//         return updated;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const formatTime = (seconds) => {
//     const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
//     const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
//     const secs = String(seconds % 60).padStart(2, '0');
//     return `${hrs}:${mins}:${secs}`;
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!assignments.length) return <p>No active assignments found.</p>;

//   return (
//     <div>
//       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>📋 Assigned Time Slots (Today)</h2>

//       {assignments.map((assignment) => {
//         const clientId = typeof assignment.clientId === 'object' ? assignment.clientId._id : assignment.clientId;
//         const client = clients[clientId];

//         return (
//           <div
//             key={assignment._id}
//             style={{
//               border: '2px solid #ccc',
//               padding: '20px',
//               marginBottom: '25px',
//               borderRadius: '10px',
//               backgroundColor: '#f9f9f9',
//             }}
//           >
//             {/* Client Info */}
//             <div
//               style={{
//                 border: '2px solid #aaa',
//                 padding: '10px',
//                 marginBottom: '15px',
//                 borderRadius: '8px',
//                 backgroundColor: '#fff',
//               }}
//             >
//               <h4>👤 Client Information</h4>
//               <p><strong>Name:</strong> {client?.name || 'Loading...'}</p>
//               <p><strong>Phone:</strong> {client?.phone || 'N/A'}</p>
//               <p><strong>Email:</strong> {client?.email || 'N/A'}</p>
//               <p><strong>Address:</strong> {client?.homeAddress || 'N/A'}</p>
//             </div>

//             {/* Slot Info */}
//             {assignment.slots.map((slot, index) => {
//               const start = new Date(slot.startTime);
//               const key = `${assignment._id}_${index}`;
//               const secondsPassed = timers[key] || 0;

//               return (
//                 <div
//                   key={slot._id || index}
//                   style={{
//                     border: '1.5px dashed #888',
//                     padding: '15px',
//                     marginBottom: '15px',
//                     borderRadius: '8px',
//                     backgroundColor: '#fff',
//                   }}
//                 >
//                   <p><strong>Slot #{index + 1}</strong></p>
//                   <p>🕒 Start: {start.toLocaleString()}</p>
//                   <div style={{
//                     backgroundColor: '#e0f7fa',
//                     color: '#00796b',
//                     fontWeight: 'bold',
//                     padding: '10px 15px',
//                     borderRadius: '8px',
//                     display: 'inline-block',
//                     fontSize: '16px',
//                     marginTop: '10px',
//                     boxShadow: '0 0 10px rgba(0,0,0,0.1)'
//                   }}>
//                     ⏱ Your ride spend time is: <span style={{ fontSize: '18px' }}>{formatTime(secondsPassed)}</span>
//                   </div>

//                   <button
//                     onClick={() => handleMarkCompleted(assignment._id, index)}
//                     style={{
//                       backgroundColor: 'green',
//                       color: 'white',
//                       padding: '8px 15px',
//                       fontWeight: 'bold',
//                       border: 'none',
//                       borderRadius: '5px',
//                       marginTop: '10px',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     ✅ Mark as Completed
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         );
//       })}

//       {message && (
//         <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{message}</p>
//       )}
//     </div>
//   );
// };

// export default TimeSlot;




import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TimeSlot = ({ driverId }) => {
  const [assignments, setAssignments] = useState([]);
  const [clients, setClients] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [timers, setTimers] = useState({}); // timer values for each slot
  const [alerts, setAlerts] = useState({}); // alert flags for each slot

  const token = localStorage.getItem('userToken');

  const isActiveSlotPresent = (data) => {
    const now = new Date();
    return data.some((assignment) =>
      assignment.slots.some((slot) => {
        const start = new Date(slot.startTime);
        return start.toDateString() === now.toDateString() && now >= start && !slot.endTime;
      })
    );
  };

  const updateDriverStatus = async (status) => {
    try {
      await axios.put(`https://database-production-3a68.up.railway.app/api/users/update-status/${driverId}`, { status });
    } catch (err) {
      console.error("Failed to update driver status", err.message);
    }
  };

  const fetchClientDetails = async (clientId) => {
    const id = typeof clientId === 'object' ? clientId?._id : clientId;
    if (!id || clients[id]) return;

    try {
      const res = await axios.get(`https://database-production-3a68.up.railway.app/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = res.data;
      if (user?.role !== 'client') return;

      setClients((prev) => ({
        ...prev,
        [id]: user,
      }));
    } catch (err) {
      console.error(`❌ Failed to fetch client ${clientId}:`, err.message);
    }
  };

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(`https://database-production-3a68.up.railway.app/api/assignments/driver-assignments/${driverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data || [];
      const now = new Date();

      const filtered = data
        .map((a) => ({
          ...a,
          slots: (a.slots || []).filter((slot) => {
            const start = new Date(slot.startTime);
            return start.toDateString() === now.toDateString() && now >= start && !slot.endTime;
          }),
        }))
        .filter((a) => a.slots.length > 0);

      setAssignments(filtered);

      const clientIds = filtered.map((a) =>
        typeof a.clientId === 'object' ? a.clientId._id : a.clientId
      );
      const uniqueClientIds = [...new Set(clientIds)];
      await Promise.all(uniqueClientIds.map(fetchClientDetails));

      if (isActiveSlotPresent(data)) {
        await updateDriverStatus('Connected');
      } else {
        await updateDriverStatus('Available');
      }

      const newTimers = {};
      filtered.forEach((assignment) => {
        assignment.slots.forEach((slot, index) => {
          const key = `${assignment._id}_${index}`;
          newTimers[key] = Math.floor((new Date() - new Date(slot.startTime)) / 1000);
        });
      });
      setTimers(newTimers);
    } catch (err) {
      setMessage('Failed to fetch assignments.');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkCompleted = async (assignmentId, slotIndex) => {
    try {
      await axios.put(
        `https://database-production-3a68.up.railway.app/api/assignments/complete-slot`,
        { assignmentId, slotIndex },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('✅ Slot marked as completed.');
      fetchAssignments();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to mark slot completed.');
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [driverId]);

  // ⏱ Timer updater + alert every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const updated = {};
        const newAlerts = { ...alerts };

        for (let key in prevTimers) {
          const newTime = prevTimers[key] + 1;
          updated[key] = newTime;

          if (newTime % 600 === 0 && !newAlerts[key + '_' + newTime]) {
            alert(`⏳ Alert: You've spent ${newTime / 60} minutes on this ride.`);
            newAlerts[key + '_' + newTime] = true;
          }
        }

        setAlerts(newAlerts);
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [alerts]);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  if (loading) return <p>Loading...</p>;
  if (!assignments.length) return <p>No active assignments found.</p>;

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>📋 Assigned Time Slots (Today)</h2>

      {assignments.map((assignment) => {
        const clientId = typeof assignment.clientId === 'object' ? assignment.clientId._id : assignment.clientId;
        const client = clients[clientId];

        return (
          <div
            key={assignment._id}
            style={{
              border: '2px solid #ccc',
              padding: '20px',
              marginBottom: '25px',
              borderRadius: '10px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <p style={{ fontWeight: 'bold', fontSize: '16px', color: '#444' }}>📅 Slot Day: {new Date(assignment.slots[0]?.startTime).toLocaleDateString('en-US', { weekday: 'long' })}</p>

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
              <p><strong>Email:</strong> {client?.email || 'N/A'}</p>
              <p><strong>Address:</strong> {client?.homeAddress || 'N/A'}</p>
            </div>

            {assignment.slots.map((slot, index) => {
              const start = new Date(slot.startTime);
              const key = `${assignment._id}_${index}`;
              const secondsPassed = timers[key] || 0;

              return (
                <div
                  key={slot._id || index}
                  style={{
                    border: '1.5px dashed #888',
                    padding: '15px',
                    marginBottom: '15px',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                  }}
                >
                  <p><strong>Slot #{index + 1}</strong></p>
                  <p>🕒 Start: {start.toLocaleString()}</p>

                  <div style={{
                    backgroundColor: '#e0f7fa',
                    color: '#00796b',
                    fontWeight: 'bold',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    display: 'inline-block',
                    fontSize: '16px',
                    marginTop: '10px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                  }}>
                    ⏱ Your ride spend time is: <span style={{ fontSize: '18px' }}>{formatTime(secondsPassed)}</span>
                  </div>

                  <button
                    onClick={() => handleMarkCompleted(assignment._id, index)}
                    style={{
                      backgroundColor: 'green',
                      color: 'white',
                      padding: '8px 15px',
                      fontWeight: 'bold',
                      border: 'none',
                      borderRadius: '5px',
                      marginTop: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    ✅ Mark as Completed
                  </button>
                </div>
              );
            })}
          </div>
        );
      })}

      {message && (
        <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{message}</p>
      )}
    </div>
  );
};

export default TimeSlot;
