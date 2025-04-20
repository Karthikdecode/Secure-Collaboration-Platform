// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MessageSquare, UserCircle, LogOut } from 'lucide-react';

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState('home');
//   const [user, setUser] = useState({ name: '', email: '' });
//   const navigate = useNavigate();
//   const email = localStorage.getItem('userEmail');


// useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/getonedetailsdashboard', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ email })
//           });
  
//         const data = await response.json();
//         if (data.status) {
//           setUser({ name: data.data.name, email: data.data.email });
//         } else {
//           console.error('Failed to fetch user:', data.message);
//         }
//       } catch (err) {
//         console.error('Error fetching user details:', err);
//       }
//     };
  
//     fetchUserDetails();
//   }, []);

//   const handleLogout = () => {
//     navigate('/login');
//   };

//   return (
//     <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
//       {/* Sidebar */}
//       <div
//         style={{
//           width: '250px',
//           backgroundColor: '#f8f9fa',
//           padding: '20px',
//           boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between'
//         }}
//       >
//         <div>
//           <h2 style={{ marginBottom: '20px' }}>Menu</h2>
//           <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '2', cursor: 'pointer' }}>
//             <li onClick={() => setActiveTab('home')}>🏠 Home</li>
//             <li onClick={() => setActiveTab('chat')}>💬 Chat</li>
//           </ul>
//         </div>

//         <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={handleLogout}>
//           <LogOut size={18} style={{ marginRight: '8px' }} />
//           <span>Logout</span>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//         {/* Header */}
//         <header
//           style={{
//             height: '60px',
//             backgroundColor: '#007bff',
//             color: 'white',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//           }}
//         >
//           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <UserCircle size={24} />
//             <span>User Dashboard</span>
//           </div>
//         </header>

//         {/* Content */}
//         <div style={{ flex: 1, padding: '20px' }}>
//           {activeTab === 'home' ? (
//             <div
//               style={{
//                 maxWidth: '400px',
//                 margin: 'auto',
//                 backgroundColor: '#fff',
//                 padding: '20px',
//                 borderRadius: '10px',
//                 boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//                 textAlign: 'center'
//               }}
//             >
//               <UserCircle size={50} style={{ marginBottom: '10px' }} />
//               <h3 style={{ margin: '10px 0' }}>{user.name}</h3>
//               <p style={{ color: '#555' }}>{user.email}</p>
//             </div>
//           ) : (
//             <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//               <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//                 <MessageSquare style={{ marginRight: '8px' }} />
//                 <h2 style={{ margin: 0 }}>Chat</h2>
//               </div>

//               <div
//                 style={{
//                   flex: 1,
//                   overflowY: 'auto',
//                   marginBottom: '20px'
//                 }}
//               >
//                 <div
//                   style={{
//                     background: '#f1f1f1',
//                     padding: '10px',
//                     borderRadius: '10px',
//                     maxWidth: '60%',
//                     marginBottom: '10px'
//                   }}
//                 >
//                   Hey! How can I help you today?
//                 </div>
//                 <div
//                   style={{
//                     background: '#e0f7fa',
//                     padding: '10px',
//                     borderRadius: '10px',
//                     maxWidth: '60%',
//                     marginLeft: 'auto'
//                   }}
//                 >
//                   Hi! I need some assistance.
//                 </div>
//               </div>

//               <form style={{ display: 'flex' }} onSubmit={(e) => e.preventDefault()}>
//                 <input
//                   type="text"
//                   placeholder="Type a message..."
//                   style={{
//                     flex: 1,
//                     padding: '10px',
//                     border: '1px solid #ccc',
//                     borderRadius: '4px 0 0 4px',
//                     outline: 'none'
//                   }}
//                 />
//                 <button
//                   type="submit"
//                   style={{
//                     backgroundColor: '#007bff',
//                     color: 'white',
//                     padding: '10px 20px',
//                     border: 'none',
//                     borderRadius: '0 4px 4px 0',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   Send
//                 </button>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


//include chat on this 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, UserCircle, LogOut } from 'lucide-react';
import socket from '../components/socket';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/getonedetailsdashboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        const data = await response.json();
        if (data.status) {
          setUser({ name: data.data.name, email: data.data.email });
        } else {
          console.error('Failed to fetch user:', data.message);
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };

    fetchUserDetails();
  }, [email]);

  // Join socket and listen for messages
  useEffect(() => {
    if (!email) return;
    
    socket.emit('join', email);

    socket.on('receiveMessage', (data) => {
      setChatMessages((prev) => [...prev, data]);
    });

    return () => socket.off('receiveMessage');
  }, [email]);

  // Send message handler
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg = {
      sender: email,
      receiver: 'support@example.com',
      message,
    };

    socket.emit('sendMessage', newMsg);
    setChatMessages((prev) => [...prev, { sender: email, message }]);
    setMessage('');

    try {
      await fetch('http://localhost:5000/api/chat/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg),
      });
    } catch (err) {
      console.error('Failed to save chat:', err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          backgroundColor: '#f8f9fa',
          padding: '20px',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <h2 style={{ marginBottom: '20px' }}>Menu</h2>
          <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '2', cursor: 'pointer' }}>
            <li onClick={() => setActiveTab('home')}>🏠 Home</li>
            <li onClick={() => setActiveTab('chat')}>💬 Chat</li>
          </ul>
        </div>

        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={handleLogout}>
          <LogOut size={18} style={{ marginRight: '8px' }} />
          <span>Logout</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header
          style={{
            height: '60px',
            backgroundColor: '#007bff',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserCircle size={24} />
            <span>User Dashboard</span>
          </div>
        </header>

        {/* Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          {activeTab === 'home' ? (
            <div
              style={{
                maxWidth: '400px',
                margin: 'auto',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}
            >
              <UserCircle size={50} style={{ marginBottom: '10px' }} />
              <h3 style={{ margin: '10px 0' }}>{user.name}</h3>
              <p style={{ color: '#555' }}>{user.email}</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <MessageSquare style={{ marginRight: '8px' }} />
                <h2 style={{ margin: 0 }}>Chat</h2>
              </div>

              {/* Chat messages */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: msg.sender === email ? '#e0f7fa' : '#f1f1f1',
                      padding: '10px',
                      borderRadius: '10px',
                      maxWidth: '60%',
                      alignSelf: msg.sender === email ? 'flex-end' : 'flex-start'
                    }}
                  >
                    {msg.message}
                  </div>
                ))}
              </div>

              {/* Message form */}
              <form style={{ display: 'flex' }} onSubmit={sendMessage}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px 0 0 4px',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '0 4px 4px 0',
                    cursor: 'pointer'
                  }}
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

