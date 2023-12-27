import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../comp/home.css'
import { AiFillEye, AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoYoutube } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './Redux/cartSlice';
import {  selectShopData, setShopData } from './Redux/shopSlice';
import "../comp/cart.css"
const Home = () => {
  const dispatch = useDispatch();
  const shopData = useSelector(selectShopData); // Initialize as an empty array if undefined

  const [newProduct, setNewProduct] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const [topProduct, setTopProduct] = useState([]);
  const [trendingProduct, setTrendingProduct] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://ecoomerce-backend.onrender.com/api/user/store', {
      headers: { "authorization": `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((fetchedData) => {
        dispatch(setShopData(fetchedData));
      })
      .catch((error) => console.log('Error fetching shop data:', error));
  }, [dispatch]);
  
 
 

  useEffect(() => {
    if (!shopData || !shopData.length) {
      // Data not available yet, handle accordingly (e.g., show loading state).
      return;
    }
    const newCategory = shopData.filter((x) => x.type === 'new');
    setNewProduct(newCategory);

    const featuredCategory = shopData.filter((x) => x.type === 'featured');
    setFeaturedProduct(featuredCategory);

    const topCategory = shopData.filter((x) => x.type === 'top');
    setTopProduct(topCategory);

    setTrendingProduct(shopData);
  }, [shopData]);

  const filterCategory = (x) => {
    const filterProduct = shopData.filter((curElm) => curElm.type === x);
    setTrendingProduct(filterProduct);
  };

  const allTrendingProduct = () => {
    setTrendingProduct(shopData);
  };

  const addtoCart = (product) => {
    let token =localStorage.getItem('token')
    if(!token){
  
      alert('try to login first')
    }
    else{
    
      dispatch(addItem(product));
      alert('added to cart')
    }
    
  };

  return (
    <>
      <div className='home'>
        <div className='top_banner'>
          <div className='contant'>
            <h3>silver aluminum</h3>
            <h2>Apple Watch</h2>
            <p>30% off at your first order</p>
            <Link to='/shop' className='link'>
              Shop Now
            </Link>
          </div>
        </div>
        <div className='trending'>
          <div className='container'>
            <div className='left_box'>
              <div className='header'>
                <div className='heading'>
                  <h2 onClick={() => allTrendingProduct()}>trending product</h2>
                </div>
                <div className='cate'>
                  <h3 onClick={() => filterCategory('new')}>New</h3>
                  <h3 onClick={() => filterCategory('featured')}>Featured</h3>
                  <h3 onClick={() => filterCategory('top')}>top selling</h3>
                </div>
              </div>
              <div className='products'>
                <div className='container'>
                  {trendingProduct.map((curElm) => (
                    <div className='box' key={curElm.id}>
                      <div className='img_box'>
                        <img src={curElm.image} alt='' />
                        <div className='icon'>
                          <div className='icon_box'>
                            <AiFillEye />
                          </div>
                          <div className='icon_box'>
                            <AiFillHeart />
                          </div>
                        </div>
                      </div>
                      <div className='info'>
                        <h3>{curElm.Name}</h3>
                        <p>${curElm.price}</p>
                        <button className='btn' onClick={() => addtoCart(curElm)}>
                          Add to cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button id='show-more'>Show More</button>
              </div>
            </div>
            <div className='right_box'>
              <div className='right_container'>
                <div className='testimonial'>
                  <div className='head'>
                    <h3>our testimonial</h3>
                  </div>
                  <div className='detail'>
                    <div className='img_box'>
                      <img src='image/T1.avif' alt='testmonial' />
                    </div>
                    <div className='info'>
                      <h3>stephan robot</h3>
                      <h4>web designer</h4>
                      <p>Duis faucibus enim vitae nunc molestie, nec facilisis arcu pulvinar nullam mattisr nullam mattis.</p>
                    </div>
                  </div>
                </div>
                <div className='newsletter'>
                  <div className='head'>
                    <h3>newsletter</h3>
                  </div>
                  <div className='form'>
                    <p>join our mailing list</p>
                    <input type='email' placeholder='E-mail' autoComplete='off' />
                    <button>subscribe</button>
                    <div className='icon_box'>
                      <div className='icon'>
                        <BiLogoFacebook />
                      </div>
                      <div className='icon'>
                        <BiLogoTwitter />
                      </div>
                      <div className='icon'>
                        <BiLogoInstagram />
                      </div>
                      <div className='icon'>
                        <BiLogoYoutube />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='banners'>
          <div className='container'>
            <div className='left_box'>
              <div className='box'>
                <img src='image/Multi-Banner-1.avif' alt='banner' />
              </div>
              <div className='box'>
                <img src='image/Multi-Banner-2.avif' alt='banner' />
              </div>
            </div>
            <div className='right_box'>
              <div className='box'>
                <img src='image/Multi-Banner-3.webp' alt='' />
              </div>
            </div>
          </div>
        </div>
        <div className='product_type'>
          <div className='container'>
            <div className='box'>
              <div className='header'>
                <h2>New Product</h2>
              </div>
              {newProduct.map((curElm) => (
                <div className='productbox' key={curElm.id}>
                  <div className='img-box'>
                    <img src={curElm.image} alt='' />
                  </div>
                  <div className='detail'>
                    <h3>{curElm.Name}</h3>
                    <p>${curElm.price}</p>
                    <div className='icon'>
                      <button>
                        <AiFillEye />
                      </button>
                      <button>
                        <AiFillHeart />
                      </button>
                      <button onClick={() => addtoCart(curElm)}>
                        <AiOutlineShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='box'>
              <div className='header'>
                <h2>Featured Product</h2>
              </div>
              {featuredProduct.map((curElm) => (
                <div className='productbox' key={curElm.id}>
                  <div className='img-box'>
                    <img src={curElm.image} alt='' />
                  </div>
                  <div className='detail'>
                    <h3>{curElm.Name}</h3>
                    <p>${curElm.price}</p>
                    <div className='icon'>
                      <button>
                        <AiFillEye />
                      </button>
                      <button>
                        <AiFillHeart />
                      </button>
                      <button onClick={() => addtoCart(curElm)}>
                        <AiOutlineShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='box'>
              <div className='header'>
                <h2>Top Selling Product</h2>
              </div>
              {topProduct.map((curElm) => (
                <div className='productbox' key={curElm.id}>
                  <div className='img-box'>
                    <img src={curElm.image} alt='' />
                  </div>
                  <div className='detail'>
                    <h3>{curElm.Name}</h3>
                    <p>${curElm.price}</p>
                    <div className='icon'>
                      <button>
                        <AiFillEye />
                      </button>
                      <button>
                        <AiFillHeart />
                      </button>
                      <button onClick={() => addtoCart(curElm)}>
                        <AiOutlineShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
