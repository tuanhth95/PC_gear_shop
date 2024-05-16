import express from 'express'
const router = express.Router()
import MainCarouselController from '../controllers/MainCarouselController.js'

router.get('/get-slides', MainCarouselController.findSlides)

export default router