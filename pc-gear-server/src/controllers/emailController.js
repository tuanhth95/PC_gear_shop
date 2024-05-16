import sendEmailService from '../services/emailService.js'
import User from "../models/UserModels.js"
import bcrypt from 'bcrypt'
const sendEmail = async(req, res)=>{
    try{
        const {email} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Email not found'
            });
        }
        const newPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const info = await sendEmailService.sendEmailService(email, newPassword);
        
        user.password = hashedPassword;
        await user.save();

        return res.json({
            status: 'OK',
            message: 'New password sent to email'
        })

    }catch(e){
        console.log(e)
        return res.json({
            status : 'ERR'
        })
    }
}

export default {
    sendEmail
}