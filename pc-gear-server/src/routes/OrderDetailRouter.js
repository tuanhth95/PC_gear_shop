import express from "express"
import OrderDetailController from '../controllers/OrderDetailController.js'
const router = express.Router()

router.post('/createOrder/:id', OrderDetailController.creatOrderDetail)
router.get('/get-details-order/:id', OrderDetailController.getDetailsOrder)
router.get('/get-all-order', OrderDetailController.getAllOrders)
router.get('/get-all-userOrder/:userInfo', OrderDetailController.getAllUserOrder)


export default router