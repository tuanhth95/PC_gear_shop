const mongoose = require('mongoose')
const productDetailSchema = new mongoose.Schema({

    id: {type: Number, required: true},
    name: {type: String, required: true},
    type: {type: String, required: true},
    price: {type: Number, required: true},
    discount: {type: Number},
    img: {type: String, required: true},
    countInStock: {type: Number, required: true},
    description: {type: Object},
}, {
    collection: "product_detail",
    timestamps: true
})

const ProductDetail = mongoose.model('ProductDetail', productDetailSchema)

module.exports = ProductDetail;
