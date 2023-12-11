
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../comp/Register.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../comp/Register.css"

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token=localStorage.getItem('token')
      const headers={
        Authorization:`Bearer ${token}`,
      }
      const response = await axios.post('https://ecoomerce-backend.onrender.com/api/user/login', { headers });
    
      console.log(response.data);
      toast.success("welcome to my website ")
      navigate('/shop')
    } 
    
    catch (error) {
      console.log(error)
      alert("you are not an user")
    }
  };
  
  return (
    <div className='main-container-login'>
      <form onSubmit={handleLogin}>
        <div className='form-container'>
          <div>
            <h3>Login</h3>
            <hr />
            <label>
              <h3>Email:</h3>
              <input type='email' name='email' onChange={handleChange} required />
            </label>
          </div>
          <div>
            <label>
              <h3>Password:</h3>
              <input type='password' name='password' onChange={handleChange} required />
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
