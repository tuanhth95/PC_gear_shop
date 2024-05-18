import OrderDetail from "../models/OrderDetailModels.js";

const getAllOrders = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrders = await OrderDetail.find().populate('userInfo');
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrders
            });
        } catch (error) {
            reject(error);
        }
    });
};

const updateOrder = (id, updateData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedOrder = await OrderDetail.findByIdAndUpdate(id, updateData, { new: true }).populate('userInfo');
            if (!updatedOrder) {
                resolve({
                    status: 'ERR',
                    message: 'Order not found'
                });
            } else {
                resolve({
                    status: 'OK',
                    message: 'Order updated successfully',
                    data: updatedOrder
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const deleteOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await OrderDetail.findByIdAndDelete(id);
            if (!order) {
                resolve({
                    status: 'ERR',
                    message: 'Order not found'
                });
            } else {
                resolve({
                    status: 'OK',
                    message: 'Order deleted successfully'
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

export default {
    getAllOrders,
    updateOrder,
    deleteOrder
};
