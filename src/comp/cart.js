import React, { useEffect } from 'react';
import '../comp/cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();
  

  useEffect(() => {
  
    console.log('Cart component mounted');
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, [setCart]);

  const removeProduct = (product) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((curElm) => curElm.id !== product.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const incQty = (product) => {
    setCart((prevCart) =>
      prevCart.map((curElm) =>
        curElm.id === product.id ? { ...curElm, qty: curElm.qty + 1 } : curElm
      )
    );
  };

  const decQty = (product) => {
    const updatedCart = cart.map((curElm) =>
      curElm.id === product.id ? { ...curElm, qty: curElm.qty - 1 } : curElm
    );
    const filteredCart = updatedCart.filter((curElm) => curElm.qty > 0);
    setCart(filteredCart);
    localStorage.setItem('cart', JSON.stringify(filteredCart));
  };

  const total = cart.reduce((price, item) => price + item.qty * item.price, 0);

  const handlePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51OK7daSAg3lXy8qLxeoU47nqdQPoOu3wgESHAWMNtzIhR5eGPIhfLm5gIfepNIml80BTlqHbv4VUEcQmPGd2zv5G00rzNSVTkA"
      );

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

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error("Error during checkout:", result.error);
        alert('Error during checkout. Please try again.');
      } else {
          setCart([]) 
        localStorage.clear('cart')
      
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert('Login first');
    }
  };

 

  return (
    <>
      <div className='cart'>
        <h3 className='cart-heading'>#cart</h3>
        {cart.length === 0 && 
          <>
            <div className='empty_cart'>
              <h2>Your Shopping cart is empty</h2>
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
