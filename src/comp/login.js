// Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../comp/Register.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlelogout = async () => {
    try {
      // Make a request to the logout API endpoint
      await axios.get('http://localhost:5000/api/user/logout');
  
      // Perform any additional client-side logout actions (clear tokens, user data, etc.)
  
      // Update login status to false
      setIsLoggedIn(false);
  
      // Use navigate to redirect to the home page after successful logout
      navigate('/'); // assuming '/' is your home page route
  
      // Show logout success toast
      toast.success('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error.response ? error.response.data : error.message);
  
      // Show logout failure toast
      toast.error('Logout failed. Please try again.');
    }
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', formData);
      console.log('User logged in:', response.data);
  
      // Optionally, store the user data or token in state or context for further use
  
      // Update login status to true
      setIsLoggedIn(true);
  
      // Use navigate to redirect to the home page after successful login
      navigate('/'); // assuming '/' is your home page route
  
      // Show success toast
      toast.success('Login successful');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
  
      // Show error toast for unsuccessful login
      toast.error('Login failed. Check your email and password.');
  
      // Handle login failure (show error message, etc.)
    }
  };
  
  return (
    <div className='main-container-login'>
      <form onSubmit={handleLogin}>
        <div className='form-container'>
          <div>
            <h1 style={{ textAlign: "center", fontFamily: "cursive" }}>Login</h1>
            <label>
              <h3> Email:</h3>
              <input type="email" name="email" onChange={handleChange} required />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input type="password" name="password" onChange={handleChange} required />
            </label>
          </div>
          <div>
            <button type="submit">Login</button>
            <Link to="/signup" className='newuser-link'><p className='newuser-para'>New user? Register Now</p></Link>
          </div>
        </div>
      </form>

      {/* Conditional rendering based on login status */}
      {isLoggedIn ? (
        <button onClick={handlelogout}>Logout</button>
      ) : (
        <Link to="/signup" className='newuser-link'>
          <p className='newuser-para'>New user? Register Now</p>
        </Link>
      )}
    </div>
  );
};

export default Login;
