// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './singup.css';

import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [rdata,rdataset]=useState({
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    number:"",
  })
  const nav=useNavigate()
  const handleChange=(e)=>{
    
    rdataset({ ...rdata, [e.target.name]: e.target.value });
    console.log(rdata)
  };
  const handleSubmit=(e)=>{
    e.preventDefault()
    // https://nodehanson4.onrender.com/registerpage
    axios
      .post('https://ecoomerce-backend.onrender.com/api/user/register',rdata)
      .then((res) => {
        
        // setStore(res.data.msg);
        // alert(res.data.msg);
        console.log(res.data)
        
        if (res.data.msg === "User registered successfully!") {
          localStorage.setItem('token',res.data.jwttoken)
          nav("/login")
          console.log(res.data.jwttoken)
          
          alert(res.data.msg)
      }
      else{
        alert(res.data.msg)
      }
      })
      .catch((error) => {
        console.log(error);
        // alert("User has not registered, please try again");
      });

      rdataset({
        firstname: "",
        lastname:"",
        email: "",
        password: "",
        number:"",
      });

  };
  
  return (
    <div className="main-container-register">
      <h1>Register</h1>
      <form className="form-container"  onSubmit={handleSubmit} autoComplete='off'>
        <label>
          First Name:
          <input type="text" name="firstname" value={rdata.firstname} onChange={handleChange} required />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastname" value={rdata.lastname} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={rdata.email} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={rdata.password} onChange={handleChange} required />
        </label>
        <label>
          Phone Number:
          <input type="text" name="number" value={rdata.number} onChange={handleChange} required />
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
