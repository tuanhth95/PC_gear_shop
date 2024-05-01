const express = require('express')
const router = express.Router()
const MainCarouselController = require('../controllers/MainCarouselController')

router.get('/get-slides', MainCarouselController.findSlides)

module.exports = router