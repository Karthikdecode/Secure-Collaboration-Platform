// import React from 'react';
// import { Link } from 'react-router-dom';

// const Register = () => {
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
    
//     const name = formData.get('name');
//     const email = formData.get('email');
//     const password = formData.get('password');
//     const confirmPassword = formData.get('confirmPassword');

//     // Simple password match check before sending to server
//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     const data = { name, email, password, confirmPassword };

//     try {
//         const response = await fetch('http://localhost:5000/register', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//           });
          

//       const result = await response.json();
//       if (response.ok) {
//         alert('Registration successful tap to verify your account!');
//         // After register success
//         localStorage.setItem("emailToVerify", email);
//         window.location.href = '/verify-otp';
        
//       } else {
//         alert(result.message || 'Registration failed.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred. Please try again.');
//     }
    
//   };

//   return (
//     <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
//       <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
//         <div className="text-center mb-4">
//           <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', margin: '0 auto' }}>
//             <i className="bi bi-person-plus-fill fs-4"></i>
//           </div>
//           <h2 className="mt-3">Create your account</h2>
//           <p className="text-muted">
//             Or <Link to="/login">sign in to your existing account</Link>
//           </p>
//         </div>

//         <form onSubmit={handleRegister}>
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">Full Name</label>
//             <input type="text" name="name" className="form-control" id="name" placeholder="Enter your full name" required />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">Email address</label>
//             <input type="email" name="email" className="form-control" id="email" placeholder="Enter your email" required />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input type="password" name="password" className="form-control" id="password" placeholder="Enter your password" required />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//             <input type="password" name="confirmPassword" className="form-control" id="confirmPassword" placeholder="Confirm your password" required />
//           </div>

//           <button type="submit" className="btn btn-primary w-100">Create Account</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;


//opt merge
import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const data = { name, email, password, confirmPassword };

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // 🔥 Save email for OTP verification
        localStorage.setItem("emailToVerify", email);

        // 📩 Send OTP to the user's email
        await fetch('http://localhost:5000/sendotp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        alert('Registration successful! OTP has been sent to your email. Please verify.');
        window.location.href = '/verify-otp';

      } else {
        alert(result.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', margin: '0 auto' }}>
            <i className="bi bi-person-plus-fill fs-4"></i>
          </div>
          <h2 className="mt-3">Create your account</h2>
          <p className="text-muted">
            Or <Link to="/login">sign in to your existing account</Link>
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" id="name" placeholder="Enter your full name" required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" name="email" className="form-control" id="email" placeholder="Enter your email" required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" className="form-control" id="password" placeholder="Enter your password" required />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" name="confirmPassword" className="form-control" id="confirmPassword" placeholder="Confirm your password" required />
          </div>

          <button type="submit" className="btn btn-primary w-100">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
