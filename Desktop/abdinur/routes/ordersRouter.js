const express = require('express');

const router = express.Router();

const {getOrders,createOrder} = require('../controlles/orderController');

const { allowedRoles } = require('../midlewares/isAllowed');
const { jwtmiddleware } = require('../midlewares/jwtMidleware');

router.get('/product', jwtmiddleware, allowedRoles('admin', 'user'), getOrders);
router.post('/product', jwtmiddleware, allowedRoles('admin'), createOrder);

module.exports = router;