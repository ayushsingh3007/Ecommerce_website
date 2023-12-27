import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, clearCart, decreaseCart, removeFromCart, selectCartItems } from './Redux/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(selectCartItems);
  console.log(cart)
  const removeProduct = (product) => {
    dispatch(removeFromCart(product.id));
  };

  const incQty = (product) => {
    dispatch(addItem(product));
  };

  const decQty = (product) => {
    if (product.qty > 1) {
      dispatch(decreaseCart({ id: product.id, qty: product.qty - 1 }));
    } else {
      dispatch(removeFromCart(product.id));
    }
  };

  const total = cart.reduce((price, item) => price + item.qty * item.price, 0);
  const handlePayment = async () => {
    try {
      console.log("Handling payment...");
      const stripe = await loadStripe("pk_test_51OK7daSAg3lXy8qLxeoU47nqdQPoOu3wgESHAWMNtzIhR5eGPIhfLm5gIfepNIml80BTlqHbv4VUEcQmPGd2zv5G00rzNSVTkA");
      const body = {
        products: cart
      };
  
      const headers = {
        "Content-Type": "application/json",
      };
  
      const response = await fetch("https://ecoomerce-backend.onrender.com/api/user/create-checkout-session", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });
  
      const session = await response.json();
      const result =  stripe.redirectToCheckout({ sessionId: session.id });
  
      if (result.error) {
        console.log("Payment failed:", result.error);
        alert('Payment failed. Please try again.');
      } else {
        // Payment was successful, clear the cart
        dispatch(clearCart());
        navigate('/');
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert('An error occurred during checkout. Please try again.');
    }
  };





  return (
    <>
      <div className='cart'>
        <h3 className='cart-heading'>#cart</h3>
        {cart.length === 0 && 
          <>
            <div className='empty_cart'>
              <h1>Cart is Empty</h1>
              <img src='https://i.pinimg.com/originals/ff/7b/28/ff7b2828a8bb02cdddd521e243fdeac7.gif' alt='not-found' width="100%" />
              <Link to='/shop'><button>Shop Now</button></Link>
            </div>
          </>
        }
        <div className='cart-container'>
          {cart.map((curElm) => 
            <div className='cart-box' key={curElm.id}>
              <div className='cart_img_box'>
                <img src={curElm.image} alt='' className='cart_img'></img>
              </div>
              <div className='detail-cart'>
                <div className='info-cart'>
                  <h4>{curElm.Name}</h4>
                  <p>{curElm.des}</p>
                  <p>Price: ${curElm.price}</p>
                  <p>Total: ${curElm.price * curElm.qty}</p>
                </div>
                <div className='quantity'>
                  <button onClick={() => incQty(curElm)} className='btn-1'>+</button>
                  <input type='number' value={curElm.qty} className='btn-2' readOnly></input>
                  <button onClick={() => decQty(curElm)} className='btn-3'>-</button>
                </div>
                <div className='remove-btn-container'>
                  <li onClick={() => removeProduct(curElm)}>DELETE</li>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='bottom-cart'>
          {cart.length > 0 && 
            <>
              <div className='Total'>
                <h4>Sub Total: ${total}</h4>
              </div>
              <button onClick={handlePayment} className='checkout-btn'>Checkout</button>
            </>
          }
        </div>
      </div>
    </>
  );
};

export default Cart;
