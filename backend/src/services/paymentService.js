const Payment = require('../models/Payment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPayment = async (amount, type, relatedEntity, userId) => {
  let paymentIntent;
  
  if (process.env.NODE_ENV === 'production') {
    paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency: 'usd',
      payment_method_types: ['card'],
    });
  } else {
    // Mock payment intent for development
    paymentIntent = { id: 'mock_payment_intent_id', status: 'succeeded' };
  }

  const newPayment = new Payment({
    user: userId,
    amount,
    type,
    relatedEntity,
    status: paymentIntent.status === 'succeeded' ? 'completed' : 'pending',
  });

  await newPayment.save();
  return newPayment;
};

exports.updatePaymentStatus = async (paymentId, status) => {
  const payment = await Payment.findByIdAndUpdate(paymentId, { status }, { new: true });
  if (!payment) {
    throw new Error('Payment not found');
  }
  return payment;
};