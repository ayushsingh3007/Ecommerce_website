// Nav.js
import React from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import {AiOutlineMenu } from 'react-icons/ai'
import { FiLogIn } from 'react-icons/fi';
import { CiLogout, CiUser } from 'react-icons/ci';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../comp/nav.css';

const Nav = ({ search, setSearch, searchproduct }) => {
  const { logout, user, isAuthenticated } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
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
            <input type='text' value={search} placeholder='search' onChange={(e) => setSearch(e.target.value)}></input>
            <button onClick={searchproduct}><AiOutlineSearch /></button>
          </div>
          {isAuthenticated ?
            <div className='user'>
              <div className='icon'>
                <CiLogout />
              </div>
              <div className='btn'>
                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
              </div>
            </div>
            :
            <div className='user'>
              <div className='icon'>
                <FiLogIn />
              </div>
              <div className='btn'>
                <button ><Link to="/signup">Login</Link></button>
              </div>
            </div>
          }
        </div>
        <div className='last_header'>
          <div className='user_profile'>
            {isAuthenticated ?
              <>
                <div className='icon'>
                  <CiUser />
                </div>
                <div className='info'>
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                </div>
              </>
              :
              <>
                <div className='icon'>
                  <CiUser />
                </div>
                <div className='info'>
                  <p>Please Login</p>
                </div>
              </>
            }
          </div>
  
            
              <div className="toggle-button" onClick={toggleMenu}>
          <AiOutlineMenu />
        </div>
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
