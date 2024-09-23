import React, { useState } from 'react';
import { processPayment } from '../services/api';

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await processPayment({
        amount,
        cardNumber,
        expiryDate,
        cvv,
      });
      alert('Payment processed successfully!');
      // Reset form
      setAmount('');
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h2>Payment Form</h2>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="cardNumber">Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="expiryDate">Expiry Date:</label>
        <input
          type="text"
          id="expiryDate"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          placeholder="MM/YY"
          required
        />
      </div>
      <div>
        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          id="cvv"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
      </div>
      <button type="submit">Process Payment</button>
    </form>
  );
};

export default PaymentForm;