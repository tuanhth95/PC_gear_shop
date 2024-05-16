import userService from '../services/userService.js'
import User from "../models/UserModels.js"

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

// const getDetailsUser = async (req, res) => {
//     try {
//         const access_token = req.params.access_token;
//         if (!access_token) {
//             return res.status(400).json({
//                 status: 'ERR',
//                 message: 'The access_token is required'
//             });
//         }
//         const response = await userService.getDetailsUser(access_token);
//         return res.status(200).json(response);
//     } catch (error) {
//         return res.status(404).json({
//             message: error.message
//         });
//     }
// };
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; 
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The userId is required'
            });
        }
        const response = await userService.deleteUser(userId); 
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};
const getShippingAddress = async(req, res, next) => {
    const { userId } = req.body
    const shippingAddress = await userService.getShippingAddress(userId)
    res.status(200).json({success: true, shippingAddress})
}
const addShippingAddress = async(req, res) => {
    if( req.body?.userId && req.body?.shippingAddress){
        const result = await userService.addShippingAddress(req)
        res.status(200).json({success: true, result: result})
    }
}

export default {
    createUser,
    loginUser,
    getAllUsers,
    updateUser,
    getDetailsUser,
    deleteUser,
    //updateUserAvatar,
    getShippingAddress,
    addShippingAddress
}