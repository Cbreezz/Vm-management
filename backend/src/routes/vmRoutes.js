const express = require('express');
const vmController = require('../controllers/vmController');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authenticate, vmController.createVM);
router.get('/', authenticate, vmController.getVMs);
router.get('/:id', authenticate, vmController.getVM);
router.put('/:id', authenticate, vmController.updateVM);
router.delete('/:id', authenticate, vmController.deleteVM);
router.post('/:id/move', authenticate, authorize('admin'), vmController.moveVM);

module.exports = router;