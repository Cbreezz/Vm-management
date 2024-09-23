const Backup = require('../models/Backup');
const backupService = require('../services/backupService');

exports.createBackup = async (req, res) => {
  try {
    const { vmId, size } = req.body;
    const userId = req.user.id;

    const newBackup = await backupService.createBackup(vmId, size, userId);
    res.status(201).json(newBackup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBackups = async (req, res) => {
  try {
    const userId = req.user.id;
    const backups = await Backup.find({ user: userId });
    res.json(backups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBackup = async (req, res) => {
  try {
    const backup = await Backup.findById(req.params.id);
    if (!backup) return res.status(404).json({ message: 'Backup not found' });
    res.json(backup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBackup = async (req, res) => {
  try {
    await backupService.deleteBackup(req.params.id);
    res.json({ message: 'Backup deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};