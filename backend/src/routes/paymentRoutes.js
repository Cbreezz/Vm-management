const express = require('express');
const paymentController = require('../controllers/paymentController');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authenticate, paymentController.createPayment);
router.get('/', authenticate, paymentController.getPayments);
router.get('/:id', authenticate, paymentController.getPayment);
router.put('/:id/status', authenticate, authorize('admin'), paymentController.updatePaymentStatus);
router.get('/admin/all', authenticate, authorize('admin'), paymentController.getPaymentsByAdmin);

module.exports = router;