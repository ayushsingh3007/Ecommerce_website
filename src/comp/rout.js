import React from 'react';
import { Routes, Route } from 'react-router';
import Home from './home';
import Shop from './shop';
import Cart from './cart';
import Contact from './contact';
import Login from './login';
import Register from './singup';
import About from './about';



const Rout = ({ shop, Filter, allcatefilter }) => {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart  />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
    

        {/* Remove addtoCart prop from the Shop route */}
        <Route path='/shop' element={<Shop shop={shop} Filter={Filter} allcatefilter={allcatefilter} />} />
        <Route path='/about' element={<Contact />} />
        <Route path="/contact" element={<About />} />
      </Routes>
    </>
  );
}

export default Rout;
