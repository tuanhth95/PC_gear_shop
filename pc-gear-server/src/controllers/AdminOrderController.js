import AdminOrderService from '../services/AdminOrderService.js';

const getAllOrders = async (req, res) => {
    try {
        const allOrders = await AdminOrderService.getAllOrders();
        return res.status(200).json(allOrders);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedOrder = await AdminOrderService.updateOrder(orderId, req.body);
        return res.status(200).json(updatedOrder);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        await AdminOrderService.deleteOrder(orderId);
        return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

export default {
    getAllOrders,
    updateOrder,
    deleteOrder
};
