import React, { useState, useEffect } from 'react';
import Nav from './comp/nav';
import { BrowserRouter } from 'react-router-dom';
import Rout from './comp/rout';
import Footer from './comp/footer';
import axios from 'axios'

const App = () => {
  const [cart, setCart] = useState([]);
  const [shop, setShop] = useState([]);
  const [originalShop, setOriginalShop] = useState([]);
  const [search, setSearch] = useState('');
  

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      try {
        // Use axios for the request and include the authorization header
        const response = await axios.get('http://localhost:5000/api/user/store', {
          headers: { "authorization": `Bearer ${token}` }
        });
        const data = response.data;
        setShop(data);
        setOriginalShop(data);
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
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    console.log('Token:', token);

  
    // Check if the token is present
    if (!token) {
      // If not authenticated, show an alert and don't add the product to the cart
      alert('Please log in to add products to the cart.');
      return;
    }
  
    // If the token is present, proceed with authentication
    axios.get("http://localhost:5000/api/user/auth", { headers: { "authorization": `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data);
  
        // Check if the product is already in the cart
        const exist = cart.find((x) => x.id === product.id);
  
        if (exist) {
          alert('This product is already added to the cart');
        } else {
          // If not in the cart, update the cart state
          setCart([...cart, { ...product, qty: 1 }]);
          alert('Added to cart');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Authentication failed. Please try again.');
      });
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
