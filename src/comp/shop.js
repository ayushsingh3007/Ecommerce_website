// components/Shop.js
import React, { useState } from 'react';
import { AiFillHeart, AiFillEye, AiOutlineClose } from 'react-icons/ai';
import '../comp/shop.css';
import { useDispatch } from 'react-redux';
import { addItem } from './Redux/cartSlice';

const Shop = ({ shop, Filter, allcatefilter }) => {
  const dispatch = useDispatch();
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState([]);

  const detailpage = ({ product }) => {
    setDetail(product);
    setShowDetail(true);
  };

  const closedetail = () => {
    setShowDetail(false);
  };

  const addtoCart = (product) => {
    let token=localStorage.getItem('token')
    if(!token){
      alert('please login first')
    }
    else{
    
      console.log('Adding to cart:', product);

      dispatch(addItem(product));
      alert('Added to cart');
    }
   
  };

  return (
    <>
      {showDetail ? (
        <>
          <div className='product_detail'>
            <button className='close_btn' onClick={closedetail}>
              <AiOutlineClose />
            </button>
            <div className='container'>
              <div className='img_box'>
                <img src={detail.image} alt='' />
              </div>
              <div className='info'>
                <h4># {detail.cat}</h4>
                <h2>{detail.Name}</h2>
                <p>
                  A Searchcreen Everyone Will Love: Whether your family is streaming or video chatting with friends tablet A8...
                </p>
                <h3>${detail.price}</h3>
                <button onClick={() => addtoCart(detail)}>Add To Cart</button>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div className='shop'>
        <h2># shop</h2>
        <p>Home . shop</p>
        <div className='container'>
          <div className='left_box'>
            <div className='category'>
              <div className='header'>
                <h3>all categories</h3>
              </div>
              <div className='box'>
                <ul>
                  <li onClick={() => allcatefilter()}># All</li>
                  <li onClick={() => Filter('tv')}># tv</li>
                  <li onClick={() => Filter('laptop')}># laptop</li>
                  <li onClick={() => Filter('watch')}># watch</li>
                  <li onClick={() => Filter('speaker')}># speaker</li>
                  <li onClick={() => Filter('electronics')}># electronics</li>
                  <li onClick={() => Filter('headphone')}># headphone</li>
                  <li onClick={() => Filter('phone')}># phone</li>
                </ul>
              </div>
            </div>
            <div className='banner'>
              <div className='img_box'>
                <img src='image/shop_left.avif' alt='' />
              </div>
            </div>
          </div>
          <div className='right_box'>
            <div className='banner'>
              <div className='img_box'>
                <img src='image/shop_top.webp' alt='' />
              </div>
            </div>
            <div className='product_box'>
              <h2>Shop Product</h2>
              <div className='product_container'>
                {shop.map((curElm) => {
                  return (
                    <div className='box' key={curElm.id}>
                      <div className='img_box'>
                        <img src={curElm.image} alt='' />
                        <div className='icon'>
                          <li>
                            <AiFillHeart />
                          </li>
                          <li onClick={() => detailpage({ product: curElm })}>
                            <AiFillEye />
                          </li>
                        </div>
                      </div>
                      <div className='detail'>
                        <h3>{curElm.Name}</h3>
                        <p>${curElm.price}</p>
                        <button onClick={() => addtoCart(curElm)}>Add To Cart</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
