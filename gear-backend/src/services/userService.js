const User = require("../models/UserModels")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")
const createUser = (newUser) =>{
    return new Promise (async(resolve, reject) => {
        const {username, email, phone, address, password, confirmPassword} = newUser
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already'
                })
            }
            const hash = bcrypt.hashSync(password, 10)

            const result = new User({
                username,
                email, 
                phone, 
                address, 
                password: hash, 
                confirmPassword
            })
            await result.save();

            if(result){
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
const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { username, password } = userLogin
        try {
            const checkUser = await User.findOne({
                username: username});
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            console.log('comparePassword', comparePassword)
            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password or user is incorrect'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                //access_token,
                //refresh_token,
                data: checkUser
            })
            const access_token = await genneralAccessToken({
                id: checkUser._id,
                //isAdmin: checkUser.isAdmin
            })

            const refresh_token = await genneralRefreshToken({
                id: checkUser._id,
                //isAdmin: checkUser.isAdmin
            })
            checkUser.access_token = access_token;
            checkUser.refresh_token = refresh_token;
            checkUser.save();

        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
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
module.exports = {
    createUser,
    loginUser,
    getAllUser,
    updateUser
}