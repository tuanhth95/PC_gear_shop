const userService = require('../services/userService')
const User = require("../models/UserModels");
const JwtService = require('../services/JwtService')

const creatUser = async(req,res)=>{
    try{
        const {username, email, phone, address, password, confirmPassword} = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if(!username || !email || !phone || !address || !password || !confirmPassword){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }else if(!isCheckEmail){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }else if(password !== confirmPassword){
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is not match confirmPassword'
            })
        }
    
        const result = await userService.creatUser(req.body)
        return res.status(200).json(result)
    }
    catch(e){
        return res.status(404).json({
            message:e
        })
    }
}

const loginUser = async(req,res)=>{
    try{
        const {username, email, phone, address, password, confirmPassword} = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if(!username || !email || !phone || !address || !password || !confirmPassword){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }else if(!isCheckEmail){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }else if(password !== confirmPassword){
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is not match confirmPassword'
            })
        }
    
        const result = await userService.loginUser(req.body)
        return res.status(200).json(result)
    }
    catch(e){
        return res.status(404).json({
            message:e
        })
    }
}


const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        console.log('userId', userId)

        const response = await userService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await userService.getDetailsUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    creatUser,
    loginUser,
    updateUser,
    getAllUsers,
    getDetailsUser
    
}