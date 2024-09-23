const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  type: { type: String, enum: ['subscription', 'backup'], required: true },
  relatedEntity: { type: mongoose.Schema.Types.ObjectId, refPath: 'onModel' },
  onModel: { type: String, enum: ['VM', 'Backup'] },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;