const express = require("express");
const router = express.Router()
const OrderDetailController = require('../controllers/OrderDetailController');

router.post('/createOrder/', OrderDetailController.creatOrderDetail)
router.get('/get-details-order/:id', OrderDetailController.getDetailsOrder)
router.get('/get-all-order', OrderDetailController.getAllOrders)
router.get('/get-all-userOrder/:userInfo', OrderDetailController.getAllUserOrder)


module.exports = router