// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    number: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/user/register', formData);
      console.log('User registered:', response.data);
      // Optionally, redirect to a different page after successful registration
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      // Handle registration failure (show error message, etc.)
    }
  };

  return (
    <div className="main-container-register">
      <h1>Register</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstname" onChange={handleChange} required />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastname" onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={handleChange} required />
        </label>
        <label>
          Phone Number:
          <input type="text" name="number" onChange={handleChange} required />
        </label>
        <button type="submit">Register</button>
      </form>
      <div className="link-container">
        <Link to="/login" className="newuser-link">Already have an account?</Link>
      </div>
    </div>
  );
};

export default Register;
