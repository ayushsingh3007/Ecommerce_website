// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import "../comp/Register.css"
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', formData);
      console.log('User logged in:', response.data);
      // Optionally, store the user data or token in state or context for further use
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      // Handle login failure (show error message, etc.)
    }
  };

  return (
    <div className='main-container-login'>
      
      <form onSubmit={handleSubmit}>
        <div className='form-container'>
        
        <div>
        <h1 style={{textAlign:"center"}}>Login</h1>
        <label>
          Email:
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
        </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
