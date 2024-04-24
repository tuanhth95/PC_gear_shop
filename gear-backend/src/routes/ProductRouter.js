const express = require("express")
const router = express.Router()
const ProductController = require('../controllers/ProductController')

router.post('/create', ProductController.createProduct)
router.get('/get-all', ProductController.getAllProduct)
router.delete('/delete/:id', ProductController.deleteProduct)

module.exports = router