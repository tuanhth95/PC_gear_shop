const express = require('express')
const router = express.Router();
const CartController = require('../controllers/CartController')

router.get('/', CartController.getItems)
router.post('/:id', CartController.addItems)
router.put('/:id', CartController.updateItems)
router.delete('/:id', CartController.deleteItems)

module.exports = router