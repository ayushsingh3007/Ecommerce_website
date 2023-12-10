
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = async () => {
    try {
      
      await axios.post('http://localhost:5000/api/user/logout');
  
  
        navigate('/'); 
  
      
      toast.success('Logout successful');
      setIsLoggedIn(false);
    } catch (error) {
      console.log('Logout failed:', error.response ? error.response.data : error.message);

      toast.error('Logout failed. Please try again.');
    }
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', formData);
      console.log('User logged in:', response.data);
      setIsLoggedIn(true);
      navigate('/'); 
  
  
      toast.success('Login successful');
    }
    
    catch (error) {
      console.log('Login failed');
  
    
      toast.error('Login failed. Check your email and password.');
  

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
            {isLoggedIn ? (
              <button type='button' onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <button type='submit'>Login</button>
                <Link to='/signup' className='newuser-link'>
                  <p className='newuser-para'>New user? Register Now</p>
                </Link>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
