// import React from 'react';
// import { Link } from 'react-router-dom';

// const Login = () => {
//   return (
//     <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
//       <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
//         <div className="text-center mb-4">
//           <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', margin: '0 auto' }}>
//             <i className="bi bi-chat-dots-fill fs-4"></i>
//           </div>
//           <h2 className="mt-3">Sign in to your account</h2>
//           <p className="text-muted">
//             Or <Link to="/register">create a new account</Link>
//           </p>
//         </div>

//         <form>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">Email address</label>
//             <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input type="password" className="form-control" id="password" placeholder="Enter your password" required />
//           </div>

//           {/* <div className="d-flex justify-content-between align-items-center mb-3">
//             <div className="form-check">
//               <input type="checkbox" className="form-check-input" id="remember" />
//               <label className="form-check-label" htmlFor="remember">Remember me</label>
//             </div>
//             <a href="#" className="text-decoration-none">Forgot your password?</a>
//           </div> */}

//           <button type="submit" className="btn btn-primary w-100">Sign in</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const response = await fetch('http://localhost:5000/login', {
        
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Login successful!');
        localStorage.setItem('userEmail', email);
        
        localStorage.setItem('userToken', result.token); // If backend sends a token
        navigate('/dashboard-chat'); // Redirect to your dashboard or home page
      } else {
        alert(result.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', margin: '0 auto' }}>
            <i className="bi bi-chat-dots-fill fs-4"></i>
          </div>
          <h2 className="mt-3">Sign in to your account</h2>
          <p className="text-muted">
            Or <Link to="/register">create a new account</Link>
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
