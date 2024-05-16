import User from "../models/UserModels.js"
import bcrypt from "bcrypt"
import { genneralAccessToken, genneralRefreshToken } from "./JwtService.js"
const createUser = (newUser) =>{
    return new Promise (async(resolve, reject) => {
        const {username, email, phone, address, password, confirmPassword} = newUser
        try{
            const hashPass = bcrypt.hashSync(password, 10)
            const result = new User({
                username,
                email, 
                phone, 
                address, 
                address,
                password: hashPass, 
            });
            //console.log(result);
            const res = await result.save();

            if(res){
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: result
                })
            }
            
        }catch(e){
            reject(e)
        }
    })
}
const loginUser = async (userLogin) => {
    try {
        const { email, password } = userLogin;
        const checkUser = await User.findOne({ $or: [{ email: email }, { username: email }] });

        if (!checkUser) {
            return {
                status: 'ERR',
                message: 'The user is not defined'
            };
        }

        const comparePassword = bcrypt.compareSync(password, checkUser.password);

        if (!comparePassword) {
            return {
                status: 'ERR',
                message: 'The password or user is incorrect'
            };
        }

        const issuedAt = new Date();
        const access_token = await genneralAccessToken({
            id: checkUser._id,
            issuedAt: issuedAt.getTime()
        });

        const refresh_token = await genneralRefreshToken({
            id: checkUser._id,
            issuedAt: issuedAt.getTime()
        });

        checkUser.access_token = access_token;
        checkUser.refresh_token = refresh_token;
        checkUser.createTokenAt = issuedAt;
        await checkUser.save();

        return {
            status: 'OK',
            message: 'SUCCESS',
            data: checkUser
        };
    } catch (e) {
        throw e;
    }
};

const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                //id: checkUser._id
                _id: id
            })
            console.log('checkUser', checkUser)
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            console.log('updateUser', updateUser)
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}
// const getDetailsUser = (access_token) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const user = await User.findOne({
//                 access_token: access_token
//             })
//             if (user === null) {
//                 resolve({
//                     status: 'ERR',
//                     message: 'The user is not defined'
//                 })
//             }
//             resolve({
//                 status: 'OK',
//                 message: 'SUCCESS',
//                 data: user
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }
const deleteUser = (userId) => { 
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findById(userId); 
            if (!checkUser) { 
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                });
            }

            await User.findByIdAndDelete(userId); 
            resolve({
                status: 'OK',
                message: 'Delete user success',
            });
        } catch (e) {
            reject(e);
        }
    });
};
const updateUserAvatar = async (userId, avatarUrl) => {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { avatar: avatarUrl },
        { new: true }
      );
      return user;
    } catch (error) {
      throw new Error('Error updating user avatar');
    }
  };
const getShippingAddress = async (userId) => {
    return new Promise( async (resolve, reject) => {
        const result = await User.findById(userId);
        if(result){
            console.log('user service get shipping address: ',result.shippingAddress)
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: result.shippingAddress
            })
        }
        else{
            reject()
        }
    })
}
const addShippingAddress = async (req) => {
    const {userId, shippingAddress} = req.body
    return new Promise(async (resolve, reject) => {
        const result = await User.findById(userId);
        result.shippingAddress.push(shippingAddress);
        const res = await result.save();
        if(res){
            resolve({
                status: 'OK',
                message: 'Add shipping address success',
            })
        }
        else{
            reject({
                status: 'Error',
            })
        }
    })
}
export default{
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