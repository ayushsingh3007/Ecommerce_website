// Nav.js

import React, { useState } from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { AiOutlineSearch, AiOutlineMenu, AiOutlineDown } from 'react-icons/ai';
import { CiUser } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import '../comp/nav.css';


const Nav = ({ search, setSearch, searchproduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const nav = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleRegister = () => {
    nav('/signup');
    closeMenu();
  };

  const handleLogin = () => {
    nav('/login');
    closeMenu();
  };
  const handleLogout = async () => {
    const token=localStorage.getItem('token');
    if(token){
      localStorage.clear('token')
      alert('logout successfully ')
    }
    else{
      console.log('invalid token')
      alert('invalid token ')
    }
  }
  
  const closeMenu = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div className='header'>
        <div className='top_header'>
          <div className='icon'>
            <MdLocalShipping />
          </div>
          <div className='info'>
            <p>Free Shipping When Shopping up to $1000</p>
          </div>
        </div>
        <div className='mid_header'>
          <div className='logo'>
            <img src='image/logo.webp' alt='logo'></img>
          </div>
          <div className='search_box'>
            <input
              type='text'
              value={search}
              placeholder='search'
              onChange={(e) => setSearch(e.target.value)}
            className='input'></input>
            <button onClick={searchproduct}><AiOutlineSearch /></button>
          </div>

          {/* Hamburger Menu Icon for Small Screens */}
          <AiOutlineMenu className='menu-icon' onClick={toggleMenu} />

          {/* User Dropdown Icon */}
          <div className='user' onClick={toggleDropdown}>
            <AiOutlineDown className='mobile-dropdown-icon' />
            {isDropdownOpen && (
              <div className='dropdown-content'>
                <button onClick={handleRegister}>Register</button>
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className='last_header'>
          <div className='user_profile'>
            <div className='icon'>
              <CiUser />
            </div>
          </div>

          {/* Regular Navigation Menu for Larger Screens */}
          <div className='nav'>
            <ul className={`menu-links ${isOpen ? 'open' : ''}`}>
              <li><Link to='/' className='link' onClick={closeMenu}>Home</Link></li>
              <li><Link to='/shop' className='link' onClick={closeMenu}>Shop</Link></li>
              <li><Link to='/cart' className='link' onClick={closeMenu}>Cart</Link></li>
              <li><Link to='/contact' className='link' onClick={closeMenu}>About</Link></li>
              <li><Link to='/about' className='link' onClick={closeMenu}>Contact</Link></li>
            </ul>
          </div>

          <div className='offer'>
            <p>flat 10% over all iPhone</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
