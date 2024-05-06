const OrderDetail = require("../models/OrderDetailModels")
const User = require("../models/UserModels")

const bcrypt = require("bcrypt")


const createOrderDetail = (newOrderDetail) =>{
    const {orderItems,fullname : fullName,address,phone,paymentMethod,itemsPrice,shippingPrice,totalPrice,userId,isPaid,isDelivered} = newOrderDetail
        // orderItems.map((item) => {

        // })
        console.log(newOrderDetail.paymentMethod);
        console.log(paymentMethod);
        return new Promise (async(resolve, reject) => {

        try{
            
            const creatOrderDetail = await OrderDetail.create({
                orderItems: orderItems,
                shippingAddress: {
                    fullName: fullName,
                    address,
                    phone,
                },
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                userInfo: userId,
                isPaid,
                isDelivered
            })
            if(creatOrderDetail){
                console.log("if true: ", creatOrderDetail)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: creatOrderDetail
                })
            }
            console.log("if not true: ", creatOrderDetail)
            resolve({
                status: 'OK',
                message: 'ERROR',
                data: creatOrderDetail
            })
            
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
    createOrderDetail,
    getOrderDetails,
    getAllOrder,
    getAllUserOrder
}