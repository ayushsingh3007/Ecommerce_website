// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../comp/Register.css"

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
  }
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstname" onChange={handleChange} required />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastname" onChange={handleChange} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" onChange={handleChange} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" onChange={handleChange} required />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" name="number" onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Already have a account?</Link>
    </div>
  );
};

export default Register;
