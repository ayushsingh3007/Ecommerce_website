// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom"
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
        <h1 style={{textAlign:"center",fontFamily:"cursive"}}>Login</h1>
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
        <Link to="/sinup" className='newuser-link'><p className='newuser-para'>New user? Register Now</p></Link>
        </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
