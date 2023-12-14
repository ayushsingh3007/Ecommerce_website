import React, { useState, useEffect } from 'react';
import Nav from './comp/nav';
import { BrowserRouter } from 'react-router-dom';
import Rout from './comp/rout';
import Footer from './comp/footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [shop, setShop] = useState([]);
  const [originalShop, setOriginalShop] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch data from your API and set it to the shop state and originalShop state
    fetch('http://localhost:5000/api/user/store')
      .then((response) => response.json())
      .then((data) => {
        setShop(data);
        setOriginalShop(data);
      })
      .catch((error) => console.error('Error fetching shop data:', error));
  }, []);

  const Filter = (x) => {
    const catefilter = originalShop.filter((product) => {
      return product.cat === x;
    });
    setShop(catefilter);
  };

  const allcatefilter = () => {
    setShop(originalShop);
  };

  const searchlength = (search || []).length === 0;

  const searchproduct = () => {
    if (searchlength) {
      alert('Please Search Something!');
      setShop(originalShop); // Assuming you want to reset the search on an empty string
    } else {
      const searchfilter = shop.filter((x) => {
        return x.cat === search;
      });
      setShop(searchfilter);
    }
  };

  const addtocart = (product) => {
    const token = localStorage.getItem('token');
  
    if (token) {
      fetch('http://localhost:5000/api/user/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product }),
      })
        .then((response) => response.json())
        .then((data) => {
          setCart(data.cart);
          toast.success('Item added successfully');
        })
        .catch((error) => console.log('Error adding to cart:', error));
    } else {
      toast.error('Please log in first');
      // Handle the case where the user is not authenticated (redirect to login, show a message, etc.)
    }
  };  

  return (
    <>
      <ToastContainer />

      <BrowserRouter>
        <Nav search={search} setSearch={setSearch} searchproduct={searchproduct} />
        <Rout setCart={setCart} cart={cart} shop={shop} Filter={Filter} allcatefilter={allcatefilter} addtocart={addtocart} />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
