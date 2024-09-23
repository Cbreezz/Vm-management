const Payment = require('../models/Payment');
const paymentService = require('../services/paymentService');

exports.createPayment = async (req, res) => {
  try {
    const { amount, type, relatedEntity } = req.body;
    const userId = req.user.id;

    const newPayment = await paymentService.createPayment(amount, type, relatedEntity, userId);
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const userId = req.user.id;
    const payments = await Payment.find({ user: userId });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedPayment = await paymentService.updatePaymentStatus(req.params.id, status);
    res.json(updatedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPaymentsByAdmin = async (req, res) => {
  try {
    const payments = await Payment.find().populate('user', 'name email');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};