// Nav.js
import React, { useState } from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { CiLogout, CiUser } from 'react-icons/ci';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import './nav.css';

const Nav = ({ search, setSearch, searchproduct }) => {
  const { logout, user, isAuthenticated } = useAuth0();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
          <div className='menu-toggle' onClick={toggleMobileMenu}>
            <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
          </div>
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
          <div className='nav'>
            <ul>
              <li><Link to='/' className='link'>Home</Link></li>
              <li><Link to='/shop' className='link'>Shop</Link></li>
              <li><Link to='/cart' className='link'>Cart</Link></li>
              <li><Link to='/about' className='link'>About</Link></li>
              <li><Link to='/contact' className='link'>Contact</Link></li>
            </ul>
          </div>
          <div className='offer'>
            <p>flat 10% over all iPhone</p>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className='mobile-menu'>
            <ul>
              <li><Link to='/' className='link' onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
              <li><Link to='/shop' className='link' onClick={() => setIsMobileMenuOpen(false)}>Shop</Link></li>
              <li><Link to='/cart' className='link' onClick={() => setIsMobileMenuOpen(false)}>Cart</Link></li>
              <li><Link to='/about' className='link' onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
              <li><Link to='/contact' className='link' onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Nav;
