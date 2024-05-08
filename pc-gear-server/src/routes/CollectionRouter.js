const express = require('express')
const router = express.Router()
const CollectionController = require('../controllers/CollectionController')

router.post('/create', CollectionController.createCollection)
router.get('/get_all', CollectionController.getAllCollections)
router.delete('/delete/:id', CollectionController.deleteCollection)
router.put('/remove_products/:id', CollectionController.removeProducts)
router.put('/add_products/:id', CollectionController.addProducts)
router.put('/rename/:id', CollectionController.renameCollection)

module.exports = router