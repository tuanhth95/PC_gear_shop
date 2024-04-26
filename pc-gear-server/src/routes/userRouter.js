const express = require("express")
const router = express.Router();
const userController = require('../controllers/userController')
router.post('/',userController.creatUser)
//router.get('/',userController.getCurrent)
router.post('/sign-in', userController.loginUser)
router.get('/', userController.getAllUsers)
router.put('/updateUser/:id', userController.updateUser)
module.exports = router