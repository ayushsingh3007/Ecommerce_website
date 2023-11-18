import React from 'react'
import "./Routing.css";
import cart_icon from "../Images/cart_icon.png"

export const Routing = () => {
  return (
    <div id='main-nav'>
    {/* <div className='cart-icon'>
        <img src={cart_icon} alt='not-found'/>
    </div> */}
    <div className='logo_icon'>
     <img src={cart_icon} alt='not-found'/>
     <p>Shop</p>
    </div>
    <ul className='nav-menu'>
        <li>Home <hr/></li>
        <li>Iphone</li>
        <li>iPad</li>
        <li>laptop</li>
        <li>Accesories</li>
    </ul>
    <div className='login-cart'>
        <button>Login</button>
        <img src={cart_icon} alt='not-found'/>
    </div>

    </div>
  )
}
