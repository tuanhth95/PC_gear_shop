import express from 'express'
import ProductDetailController from '../controllers/ProductDetailController.js'

const router = express.Router()

// router.post('/', ProductDetailController.createProduct)
router.get('/find_product_by_type/:id', ProductDetailController.findProductById)
router.get('/find_product_by_type_type/:id', ProductDetailController.findProductByType)
// router.get('/find_product_by_type/:type', ProductDetailController.findProductsByType)
router.get('/get-all', ProductDetailController.findProducts)
router.get('/find_products_by_name/:name', ProductDetailController.findProductsByName)
router.get('/find_products_by_key/:key', ProductDetailController.findProductsByKey)

export default router