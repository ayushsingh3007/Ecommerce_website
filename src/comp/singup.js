// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './singup.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    number: '',
  });
    const Navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      
      console.log('Submitting registration with data:', formData);
      const response = await axios.post('https://ecoomerce-backend.onrender.com/api/user/register', formData);
      console.log('User registered:', response.data);
      if(response.data.msg==="successfully resgister"){
        toast.success("user register successfully ")
        Navigate("/login");
        alert("user registered")
      }
      else{
        toast.error(response.data.msg)

        
      }
      // Optionally, redirect to a different page after successful registration
      
      // toast.success('Registered successfully');
    } catch (error) {  // console.log('Registration failed:', error.response ? error.response.data : error.message);
      toast.error('Oops! Registration failed');
    }
  };
  
  return (
    <div className="main-container-register">
      <h1>Register</h1>
      <form className="form-container" onSubmit={handleSubmit} autoComplete='off'>
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
