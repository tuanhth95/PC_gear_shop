const express = require("express")
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/', userController.creatUser)
//router.get('/',userController.getCurrent)
//router.get('/', userController.getAllUsers)
router.post('/sign-in', userController.loginUser)
router.put('/updateUser/:id', userController.updateUser)
router.get('/get-details/:id',  userController.getDetailsUser)
// router.get('/getAll',  userController.getAllUser)
router.get('/getAllUsers', userController.getAllUsers)

module.exports = router