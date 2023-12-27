import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Nav from './comp/nav';
import Rout from './comp/rout';
import Footer from './comp/footer';
import axios from 'axios';


const App = () => {
  const dispatch = useDispatch();

  const [shop, setShop] = useState([]);
  const [originalShop, setOriginalShop] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://ecoomerce-backend.onrender.com/api/user/store', {
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
  }, [dispatch]);

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
      setShop(originalShop);
    } else {
      const searchfilter = originalShop.filter((product) =>
        product.Name.toLowerCase().includes(search.toLowerCase())
      );
      setShop(searchfilter);
    }
  };

  return (
    <>
      <Nav search={search} setSearch={setSearch} searchproduct={searchproduct} />
      <Rout shop={shop} Filter={Filter} allcatefilter={allcatefilter} />
      <Footer />
    </>
  );
};

export default App;
