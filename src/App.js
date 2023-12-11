import React, { useState, useEffect } from 'react';
import Nav from './comp/nav';
import { BrowserRouter } from 'react-router-dom';
import Rout from './comp/rout';
import Footer from './comp/footer';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
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
      setShop(shop);
    } else {
      const searchfilter = shop.filter((x) => {
        return x.cat === search;
      });
      setShop(searchfilter);
    }
  };

  const addtocart = (product) => {
    const exist = cart.find((x) => x.id === product._id);
  
    if (exist) {
      alert('This product is already added in the cart');
    } else {
      const authToken = localStorage.getItem('authToken');
  
      if (authToken) {
        fetch('http://localhost:5000/api/user/add-to-cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ product }),
        })
          .then((response) => response.json())
          .then((data) => {
            setCart([...cart, { ...product, qty: 1 }]);
           toast.success("item added successfully")
          })
          .catch((error) => console.log('Error adding to cart:', error));
      } else {
           toast.error("please try to login first")
        // Handle the case where the user is not authenticated (redirect to login, show a message, etc.)
      }
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