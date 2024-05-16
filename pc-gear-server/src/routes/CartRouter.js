import express from 'express'
import CartController from '../controllers/CartController.js';
const router = express.Router();

router.get('/', CartController.getItems)
router.post('/:id', CartController.addItems)
router.put('/:id', CartController.updateItems)
router.delete('/:id', CartController.deleteItems)

export default router