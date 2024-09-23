const VM = require('../models/VM');
const User = require('../models/User');
const vmService = require('../services/vmService');

exports.createVM = async (req, res) => {
  try {
    const { name, specs } = req.body;
    const userId = req.user.id;

    const newVM = await vmService.createVM(name, specs, userId);
    res.status(201).json(newVM);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getVMs = async (req, res) => {
  try {
    const userId = req.user.id;
    const vms = await VM.find({ user: userId });
    res.json(vms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVM = async (req, res) => {
  try {
    const vm = await VM.findById(req.params.id);
    if (!vm) return res.status(404).json({ message: 'VM not found' });
    res.json(vm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVM = async (req, res) => {
  try {
    const { name, specs, status } = req.body;
    const updatedVM = await vmService.updateVM(req.params.id, { name, specs, status });
    res.json(updatedVM);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteVM = async (req, res) => {
  try {
    await vmService.deleteVM(req.params.id);
    res.json({ message: 'VM deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.moveVM = async (req, res) => {
  try {
    const { newUserId } = req.body;
    const movedVM = await vmService.moveVM(req.params.id, newUserId);
    res.json(movedVM);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};