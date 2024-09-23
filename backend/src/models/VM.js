const mongoose = require('mongoose');

const vmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specs: {
    cpu: { type: Number, required: true },
    ram: { type: Number, required: true },
    storage: { type: Number, required: true },
  },
  status: { type: String, enum: ['running', 'stopped', 'terminated'], default: 'stopped' },
}, { timestamps: true });

const VM = mongoose.model('VM', vmSchema);

module.exports = VM;