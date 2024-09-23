const mongoose = require('mongoose');

const backupSchema = new mongoose.Schema({
  vm: { type: mongoose.Schema.Types.ObjectId, ref: 'VM', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  size: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  price: { type: Number, required: true },
}, { timestamps: true });

const Backup = mongoose.model('Backup', backupSchema);

module.exports = Backup;