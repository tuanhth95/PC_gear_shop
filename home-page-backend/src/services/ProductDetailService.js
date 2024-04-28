// const ProductDetail = require('../models/ProductDetailModel')
const mongoose = require('mongoose')
const productDetailSchema = new mongoose.Schema({

    id: {type: Number, required: true},
    name: {type: String, required: true},
    type: {type: String, required: true},
    price: {type: Number, required: true},
    discount: {type: Number},
    img: {type: String, required: true},
    description: {type: Object},
}, {
    collection: "product_detail",
    timestamps: true
})

const ProductDetail = mongoose.model('ProductDetail', productDetailSchema)

// const createProduct = (newProduct) => {
//     return new Promise( async (resolve, reject) => {
//         const { id, name, type, price, discount, img, description} = newProduct
//         try {
//             const createdProduct = await ProductDetail.create({
//                 id, 
//                 name, 
//                 type, 
//                 price, 
//                 discount, 
//                 img,
//                 description
//             })
//             if (createdProduct) {
//                 resolve({
//                     status: 'OK',
//                     message: 'Product created successfully',
//                     data: createdProduct
//                 })
//             }
//         } catch (e) {
//             console.log(e)
//             reject(e)
//         }
//     })
// }

// const findProduct = (productId) => {
//     return new Promise( async (resolve, reject) => {
//         try {
//             const foundProduct = await ProductDetail.findOne({id: productId})
//             if (foundProduct) {
//                 resolve({
//                     status: 'OK',
//                     message: 'Product found successfully',
//                     data: foundProduct
//                 })
//             } else {
//                 reject({
//                     status: 'ERR',
//                     message: 'Product not found'
//                 })
//             }
//         } catch (e) {
//             console.log(e)
//             reject(e)
//         }
//     })
// }

// const findProductsByType = (productType) => {
//     return new Promise( async (resolve, reject) => {
//         try {
//             const foundProducts = await ProductDetail.find({type: productType})
//             if (foundProducts) {
//                 resolve({
//                     status: 'OK',
//                     message: 'Products found successfully',
//                     data: foundProducts
//                 })
//                 console.log(foundProducts);
//             } else {
//                 reject({
//                     status: 'ERR',
//                     message: 'Product not found'
//                 })
//             }
//         } catch (e) {
//             console.log(e)
//             reject(e)
//         }
//     })
// }

const findProducts = () => {
        return new Promise( async (resolve, reject) => {
            try {
                const foundProducts = await ProductDetail.find()
                if (foundProducts) {
                    resolve({
                        status: 'OK',
                        message: 'Product found successfully',
                        data: foundProducts
                    })
                } else {
                    reject({
                        status: 'ERR',
                        message: 'Product not found'
                    })
                }
            } catch (e) {
                console.log(e)
                reject(e)
            }
        })
    }

module.exports = {
    // createProduct,
    // findProduct,
    // findProductsByType,
    findProducts
}