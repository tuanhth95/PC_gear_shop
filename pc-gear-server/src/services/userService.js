const User = require("../models/UserModels")
const bcrypt = require("bcrypt")
const {     genneralAccessToken, genneralRefreshToken } = require("./JwtService")
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
module.exports = {
    createUser,
    loginUser,
    getAllUser,
    updateUser,
    getDetailsUser,
    updateUserAvatar
}