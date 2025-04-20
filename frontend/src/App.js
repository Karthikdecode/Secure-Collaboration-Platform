import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import Register from './components/Register'; 
import VerifyOtp from './components/VerifyOtp';
import Dashboard from './components/Chatdashboard'; 
function App() {
  return (
    <Router>
         
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/dashboard-chat" element={<Dashboard />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;