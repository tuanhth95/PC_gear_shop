const express = require("express")
const router = express.Router();
const userController = require('../controllers/userController')
router.post('/',userController.createUser)
//router.get('/',userController.getCurrent)
router.post('/sign-in', userController.loginUser)
router.get('/getAllUsers', userController.getAllUsers)
router.get('/', userController.getAllUsers)
router.get('/shipping-address', userController.getShippingAddress)
router.post('/shipping-address', userController.addShippingAddress)
router.put('/updateUser/:id', userController.updateUser)
router.get('/get-details/:id',  userController.getDetailsUser)
//router.get('/get-details/:access_token',  userController.getDetailsUser)
router.delete('/delete-user/:id', userController.deleteUser)

module.exports = router