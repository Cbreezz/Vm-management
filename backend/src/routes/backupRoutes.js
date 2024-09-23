const express = require('express');
const backupController = require('../controllers/backupController');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authenticate, backupController.createBackup);
router.get('/', authenticate, backupController.getBackups);
router.get('/:id', authenticate, backupController.getBackup);
router.delete('/:id', authenticate, backupController.deleteBackup);

module.exports = router;