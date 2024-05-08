const userService = require('../services/userService')
const User = require("../models/UserModels");
const JwtService = require('../services/JwtService');
const createUser = async(req, res)=>{
    try{
        const {username, email, phone, address, password, confirmPassword} = req.body;
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The username is already'
            });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The email is already'
            });
        }
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
        const resp = await userService.createUser(req.body);
        return res.status(200).json(resp);   
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        //console.log("infomation: ",req.body)
        if (!email || !password) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const result = await userService.loginUser(req.body)
        //console.log("login result: ", result);
        //const { refresh_token, ...newReponse } = result
        // res.cookie('refresh_token', refresh_token, {
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: 'strict',
        //     path: '/',
        // })
        return res.status(200).json(result)
    } catch (e) {
        return res.status(500).json({
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

const updateUserAvatar = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { avatarUrl } = req.body;
      const user = await userService.updateUserAvatar(userId, avatarUrl);
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    updateUser,
    getDetailsUser,
    updateUserAvatar
}