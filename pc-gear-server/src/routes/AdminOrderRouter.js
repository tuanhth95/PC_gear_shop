import express from "express";
import AdminOrderController from '../controllers/AdminOrderController.js';
const router = express.Router();

router.get('/get-all-orders', AdminOrderController.getAllOrders);
router.put('/update-order/:id', AdminOrderController.updateOrder);
router.delete('/delete-order/:id', AdminOrderController.deleteOrder);

export default router;
