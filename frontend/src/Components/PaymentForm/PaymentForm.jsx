// PaymentForm.js

import React, { useState, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext'

const PaymentForm = () => {
    
  return (
    <form onSubmit={handlePaymentSubmit}>
      <label>
        Amount:
        <input
          type="number"
          name="amount"
          value={paymentData.amount}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Currency:
        <input
          type="text"
          name="currency"
          value={paymentData.currency}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Card Number:
        <input
          type="text"
          name="cardNumber"
          value={paymentData.cardNumber}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Expiry Date:
        <input
          type="text"
          name="expiryDate"
          value={paymentData.expiryDate}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        CVC:
        <input
          type="text"
          name="cvc"
          value={paymentData.cvc}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default PaymentForm;
