import React, { useState } from 'react'
import "./Routing.css";
import cart_icon from "../Images/cart_icon.png"

export const Routing = () => {
  const [count,setCount]=useState("home")
  return (
    <div id='main-nav'>
    
    <div className='logo_icon'>
     <img src={cart_icon} alt='not-found'/>
     <p>Shop</p>
    </div>
    <ul className='nav-menu'>
        <li onClick={()=>{setCount("home")}}>Home {count==="home"?<hr/>:<></>} </li>
        <li onClick={()=>{setCount("iphone")}}>Iphone {count==="iphone"?<hr/>:<></>} </li>
        <li onClick={()=>{setCount("ipad")}}>iPad {count==="ipad"?<hr/>:<></>} </li>
        <li onClick={()=>{setCount("laptop")}}>laptop {count==="laptop"?<hr/>:<></>} </li>
        <li onClick={()=>{setCount("access")}}>Accesories {count==="access"?<hr/>:<></>} </li>
    </ul>
    <div className='login-cart'>
        <button>Login</button>
        <img src={cart_icon} alt='not-found'/>
        <div className='nev-cart-count'>0</div>
    </div>

    </div>
  )
}
