import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("emailToVerify");
    if (storedEmail) {
      setEmail(storedEmail);
      setInfo(`📩 OTP has been sent to your email: ${storedEmail}`);
    } else {
      setInfo("No email found. Please register again.");
    }
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/verifyotp', {
        email,
        otp,
      });

      if (res.data.success) {
        alert('✅ OTP Verified! You can now log in.');
        localStorage.removeItem("emailToVerify");
        navigate('/login');
      } else {
        setError(res.data.message || '❌ Verification failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || '❌ Something went wrong.');
    }
  };

  return (
    <div className="verify-otp-container" style={styles.container}>
      <h2>🔐 Verify OTP</h2>
      {info && <p style={styles.info}>{info}</p>}
      <form onSubmit={handleVerify} style={styles.form}>
        <input
          type="email"
          value={email}
          readOnly
          style={{ ...styles.input, backgroundColor: '#f3f3f3' }}
        />
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>✅ Verify OTP</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '20px',
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    fontSize: '0.9em',
  },
  info: {
    color: '#333',
    fontSize: '0.95em',
    backgroundColor: '#eaf6ff',
    padding: '10px',
    borderRadius: '6px',
  },
};

export default VerifyOtp;
