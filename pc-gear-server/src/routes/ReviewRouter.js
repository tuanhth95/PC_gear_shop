const express = require("express");
const router = express.Router()
const reviewController = require('../controlers/ReviewController')

router.get('/get-all-review', reviewController.getReview)
router.get('/product/:productID', reviewController.getReviewByProductID);
router.post('/create-review', reviewController.createProductReview)
router.delete('/:reviewID', reviewController.deleteReview)

module.exports = router