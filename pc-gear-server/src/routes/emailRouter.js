import express from "express"
const router = express.Router();
import emailController from '../controllers/emailController.js'
router.post('/',emailController.sendEmail)

export default router