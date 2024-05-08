const mongoose = require('mongoose')

const orderDetailSchema = new mongoose.Schema({
    orderItems: [
        {
            name: { type: String, required: true },
            amount: { type: Number, required: true },
            img: { type: String, required: true },
            price: { type: Number, required: true },
            discount: { type: Number },
            // product: {
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: 'Product',
            //     required: true,
            // },
        },
    ],
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    shipmentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    userInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
},
    {
        timestamps: true,
    }
);


const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);
module.exports = OrderDetail
