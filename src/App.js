import React, { useState, useEffect } from 'react';
import Nav from './comp/nav';
import { BrowserRouter} from 'react-router-dom';
import Rout from './comp/rout';
import Footer from './comp/footer';



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



  const addtocart = async (product) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ product }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // Check if the product is already in the cart
      const exist = cart.find((x) => x.id === product.id);

      if (exist) {
        alert("This product is already added to the cart");
      } else {
        // If not in the cart, update the cart state
        setCart([...cart, { ...product, qty: 1 }]);
        alert("Added to cart");
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('An error occurred while adding to cart. Please try again.');
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
