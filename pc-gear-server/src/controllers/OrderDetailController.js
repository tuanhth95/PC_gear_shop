import OrderDetailService from '../services/OrderDetailService.js'
import OrderDetail from "../models/OrderDetailModels.js"

const creatOrderDetail = async(req,res)=>{
    try{
        console.log("createOrder id rec: ", req.params.id)
        console.log("createOrder data rec: ", req.body.paymentMethod);
        let userid = req.params.id;
        const result = await OrderDetailService.createOrderDetail({userId:userid, ...req.body})
        return res.status(200).json(result)
    }
    catch(e){
        return res.status(404).json({
            message:e
        })
    }
}



const getDetailsOrder = async (req, res) => {
    try {
        const orderDetailId = req.params.id
        if (!orderDetailId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await OrderDetailService.getOrderDetails(orderDetailId)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const allOrder = await OrderDetail.find();
        res.json(allOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getAllUserOrder = async (req, res) => {
    try {
        const userInfo = req.params.userInfo
        if (!userInfo) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userInfo is required'
            })
        }
        const response = await OrderDetailService.getAllUserOrder(userInfo)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}


export default {
    creatOrderDetail,
    getDetailsOrder,
    getAllOrders,
    getAllUserOrder
}