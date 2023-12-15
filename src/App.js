import React, { useState, useEffect } from 'react';
import Nav from './comp/nav';
import { BrowserRouter } from 'react-router-dom';
import Rout from './comp/rout';
import Footer from './comp/footer';

const App = () => {
  const [cart, setCart] = useState([]);
  const [shop, setShop] = useState([]);
  const [originalShop, setOriginalShop] = useState([]);
  const [search, setSearch] = useState('');
  const [token, setToken] = useState(''); // Move token to the component scope

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API and set it to the shop state and originalShop state
        const response = await fetch('http://localhost:5000/api/user/store');
        const data = await response.json();
        setShop(data);
        setOriginalShop(data);

        // Ensure that localStorage.getItem('token') returns a valid value
        const storedToken = localStorage.getItem('token') || '';
        setToken(storedToken);
      } catch (error) {
        console.error('Error fetching shop data:', error);
      }
    };

    fetchData();
  }, []);

  const Filter = (x) => {
    const catefilter = originalShop.filter((product) => product.cat === x);
    setShop(catefilter);
  };

  const allcatefilter = () => {
    setShop(originalShop);
  };

  const searchlength = (search || '').length === 0;

  const searchproduct = () => {
    if (searchlength) {
      alert('Please Search Something!');
      setShop(originalShop); // Assuming you want to reset the search on an empty string
    } else {
      const searchfilter = shop.filter((x) => x.cat === search);
      setShop(searchfilter);
    }
  };
  const addtocart = (product) => {
    // Check if the user is authenticated by checking the token
    if (!token) {
      // If not authenticated, show an alert and don't add the product to the cart
      alert('Please log in to add products to the cart.');
      return;
    }
  
    // Check if the product is already in the cart
    const exist = cart.find((x) => x.id === product.id);
  
    if (exist) {
      alert('This product is already added to the cart');
    } else {
      // If not in the cart, update the cart state
      setCart([...cart, { ...product, qty: 1 }]);
      alert('Added to cart');
    }
  };

  return (
    <>
      <BrowserRouter>
        <Nav search={search} setSearch={setSearch} searchproduct={searchproduct} />
        <Rout setCart={setCart} cart={cart} shop={shop} Filter={Filter} allcatefilter={allcatefilter} addtocart={addtocart} />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
