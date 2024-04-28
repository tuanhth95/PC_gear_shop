const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config();
const sendEmailService = async(email,newPassword ) =>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    let info = await transporter.sendMail({
        from: '<baaboo0106@gmail.com>',
        to: email,
        subject: 'GearShop: mật khẩu mới',
        text: 'Cảm ơn bạn vì đã lựa chọn cửa hàng chúng tôi! Mật khẩu mới cho tài khoản của bạn là: ' + newPassword
    })
    return info
}
module.exports = {
    sendEmailService
}