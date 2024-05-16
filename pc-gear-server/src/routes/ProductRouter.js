import express from "express"
import ProductController from '../controllers/ProductController.js'
import { authMiddleWare } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/create', ProductController.createProduct)
router.put('/update/:id',authMiddleWare, ProductController.updateProduct)
router.get('/get-details/:id', ProductController.getDetailsProduct)
router.get('/get-all', ProductController.getAllProduct)
router.delete('/delete/:id', ProductController.deleteProduct)
router.post('/delete-many', authMiddleWare, ProductController.deleteMany)
router.get('/get-all-type', ProductController.getAllType)
router.get('/get-all-producer', ProductController.getAllProducer)

export default router