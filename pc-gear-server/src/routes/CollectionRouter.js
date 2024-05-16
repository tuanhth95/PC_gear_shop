import express from 'express'
const router = express.Router()
import CollectionController from '../controllers/CollectionController.js'

router.post('/create', CollectionController.createCollection)
router.get('/get_all', CollectionController.getAllCollections)
router.delete('/delete/:id', CollectionController.deleteCollection)
router.put('/remove_products/:id', CollectionController.removeProducts)
router.put('/add_products/:id', CollectionController.addProducts)
router.put('/rename/:id', CollectionController.renameCollection)
router.get('/get_by_name/:name', CollectionController.getByName)

export default router