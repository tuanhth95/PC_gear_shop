const express = require('express')
const router = express.Router()
const ProductDetailController = require('../controllers/ProductDetailController')

// router.post('/', ProductDetailController.createProduct)
// router.get('/:id', ProductDetailController.findProduct)
// router.get('/find_product_by_type/:type', ProductDetailController.findProductsByType)
router.get('/get-all', ProductDetailController.findProducts)

module.exports = router