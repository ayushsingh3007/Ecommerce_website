import React from 'react'
import './cart.css'
import { Link } from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js';
import {useHistory} from 'react-router';

import { AiOutlineClose } from 'react-icons/ai';

const Cart = ({cart, setCart}) => {

  const history=useHistory()
  const handlepayment = async () => {
    try {
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

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error("Error during checkout:", result.error);
        alert('Payment failed or was not completed. Please try again.');
      
        localStorage.setItem('cart', JSON.stringify(cart));
      
        history.push('/cart');
      } else {
      
        history.push('/');
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert('Login first');
    }
  };

  
  
  // Increase Quantity of cart product
  const incqty = (product) => 
  {
    const exist = cart.find((x) => 
    {
      return x.id === product.id
    })
    setCart(cart.map((curElm) => 
    {
      return curElm.id === product.id ? { ...exist, qty: exist.qty + 1} : curElm
    }))
  }
  // decrese Quantity of cart product
  const decqty = (product) => 
  {
    const exist = cart.find((x) => 
    {
      return x.id === product.id
    })
    setCart(cart.map((curElm) => 
    {
      return curElm.id === product.id ? {...exist ,qty: exist.qty - 1}: curElm
    }))
  }

  //Removing cart product
  const removeproduct = (product) => 
  {
    const exist = cart.find((x) => 
    {
      return x.id === product.id
    })
    if(exist.qty > 0)
    {
      setCart(cart.filter((curElm) => 
      {
        return curElm.id !== product.id
      }))
    }
  }
  //Total Price
  const total = cart.reduce((price, item) => price + item.qty * item.price, 0)
  return (
    <>
    <div className='cart'>
        <h3>#cart</h3>
        {
            cart.length === 0 && 
            <>
            <div className='empty_cart'>
                <h2>Your Shopping cart is empty</h2>
                <Link to='/shop'><button>Shop Now</button></Link>
            </div>
            </>
        }
        <div className='container'>
          {
            cart.map((curElm) => 
            {
              return(
                <>
                <div className='box'>
                  <div className='img_box'>
                    <img src={curElm.image} alt=''></img>
                  </div>
                  <div className='detail'>
                    <div className='info'>
                  
                    <h4>{curElm.Name}</h4>
                    <p>{curElm.des}</p>
                    <p>Price: ${curElm.price}</p>
                    <p>Total: ${curElm.price * curElm.qty}</p>
                    </div>
                    <div className='quantity'>
                      <button onClick={() => incqty (curElm)}>+</button>
                      <input type='number' value={curElm.qty}></input>
                      <button onClick={() => decqty (curElm)}>-</button>
                    </div>
                    <div className='icon'>
                      <li onClick={() => removeproduct(curElm)}><AiOutlineClose /></li>
                    </div>
                  </div>
                </div>
                </>
              )
            })
          }
        </div>
        <div className='bottom'>
          {
            cart.length > 0 && 
            <>
            <div className='Total'>
              <h4>Sub Total: ${total}</h4>
            </div>
            <button  onClick={handlepayment}>checkout</button>
            </>
          }
        </div>
    </div>
    </>
  )
}

export default Cart;
