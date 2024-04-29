const OrderDetail = require("../models/OrderDetailModels")
const User = require("../models/UserModels")

const bcrypt = require("bcrypt")


const creatOrderDetail = (newOrderDetail) =>{
    const {orderItems,shippingAddress,paymentMethod,itemsPrice,shippingPrice,totalPrice,userInfo,isPaid,isDelivered} = newOrderDetail

        return new Promise (async(resolve, reject) => {

        try{
            
            const creatOrderDetail = await OrderDetail.create({
                orderItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                userInfo,
                isPaid,
                isDelivered
            })
            if(creatOrderDetail){
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: creatOrderDetail
                })
            }
            resolve({})
            
        }catch(e){
            reject(e)
        }
    })
}



const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const orderDetail = await OrderDetail.findOne({
                _id: id
            })
            if (orderDetail === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: orderDetail
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}



const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await OrderDetail.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getAllUserOrder = (userInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const orderDetails = await OrderDetail.find({
                userInfo : userInfo
            })
            if (orderDetails.length === 0) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: orderDetails
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}
module.exports = {
    creatOrderDetail,
    getOrderDetails,
    getAllOrder,
    getAllUserOrder
}