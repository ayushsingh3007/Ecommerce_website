
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../comp/Register.css";

import 'react-toastify/dist/ReactToastify.css';
import "../comp/Register.css"

const Login = () => {
  const nav=useNavigate()
  const [ldata,ldataset]=useState({
    email:"",
    password:""
  })
  const handleChange=(e)=>{
    
    ldataset({ ...ldata, [e.target.name]: e.target.value });
    console.log(ldata)
  };
  const handleLogin=(e)=>{
    e.preventDefault()
    axios
      .post('http://localhost:3000/api/user/login',ldata)
      .then((res) => {
        
        
        
        if (res.data.msg === "User login successfully") {
          localStorage.setItem("token", res.data.token);
          console.log(res.data.jwttoken)
          nav("/shop")
          alert(res.data.msg)
          
      }
      else{
        alert(res.data.msg);
      }
      })
      .catch((error) => {
        console.log(error);
       
      });

      ldataset({        
        email: "",
        password: "",
      });

  };













  
  // const handleLogout = async () => {
  //   try {
  //     await axios.post('http://localhost:5000/api/user/logout');
  //     // Clear the stored token (remove it from localStorage, for example)
  //     localStorage.removeItem('token');
  //     navigate('/');
  //     toast.success('Logout successful');
  //   } catch (error) {
  //     console.log('Logout failed:', error.response ? error.response.data : error.message);
  //     toast.error('Logout failed. Please try again.');
  //   }
  // };
  return (
    <div className='main-container-login'>

      <form onSubmit={handleLogin}>
        <div className='form-container'>
          <div>
            <h3>Login</h3>
            <hr />
            <label>
              <h3>Email:</h3>
              <input type='email' name='email' value={ldata.email} onChange={handleChange} required />
            </label>
          </div>
          <div>
            <label>
              <h3>Password:</h3>
              <input type='password' name='password' value={ldata.password} onChange={handleChange} required />
            </label>
          </div>
          <div>
            
             
              <>
                <button type='submit'>Login</button>
                <Link to='/signup' className='newuser-link'>
                  <p className='newuser-para'>New user? Register Now</p>
                </Link>
              </>
            
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
