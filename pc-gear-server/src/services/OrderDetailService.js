import OrderDetail from "../models/OrderDetailModels.js"
import User from "../models/UserModels.js"
import bcrypt from "bcrypt"


const createOrderDetail = (newOrderDetail) =>{
    const {orderItems,fullname : fullName,address,phone,paymentMethod,itemsPrice,shippingPrice,shipmentMethod,totalPrice,userId,isPaid,isDelivered} = newOrderDetail
        console.log(newOrderDetail);
        console.log(paymentMethod);
        return new Promise (async(resolve, reject) => {

            const creatOrderDetail = await OrderDetail.create({
                orderItems: orderItems,
                shippingAddress: {
                    fullName: fullName,
                    address,
                    phone,
                },
                paymentMethod,
                shipmentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
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
        try{     
            
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
export default {
    createOrderDetail,
    getOrderDetails,
    getAllOrder,
    getAllUserOrder
}