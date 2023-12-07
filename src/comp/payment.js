import React, { useState } from 'react';
import "../comp/payment.css"
const PaymentSection = ({ cart, setCart }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const handlePayment = () => {
    // Perform payment processing logic (mocked for example)
    // This is where you would usually interact with a secure payment gateway

    // Mocked payment success
    setIsPaymentComplete(true);

    // Clear the cart after successful payment
    setCart([]);
  };

  return (
    <div className='payment-container'>
      <div className='debit-card'>
        <div className='card-header'>
          <h2>Payment</h2>
        </div>
        <div className='card-body'>
          {isPaymentComplete ? (
            <div>
              <p>Payment successful! Thank you for your purchase.</p>
            </div>
          ) : (
            <div>
              <div className='form-group'>
                <label>Card Number:</label>
                <input
                  type='text'
                  placeholder='Enter card number'
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>Expiry Date:</label>
                <input
                  type='text'
                  placeholder='MM/YY'
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>CVV:</label>
                <input
                  type='text'
                  placeholder='Enter CVV'
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
              <button onClick={handlePayment}>Submit Payment</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
