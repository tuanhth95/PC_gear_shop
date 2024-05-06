const express = require("express");
const router = express.Router()
const reviewController = require('../controllers/ReviewController')

router.get('/get-all-review', reviewController.getReview)
router.get('/product/:productID', reviewController.getReviewByProductID);
router.post('/create-review/:productID/:userID', reviewController.createProductReview)
router.delete('/:reviewID', reviewController.deleteReview)

//reply
// router.get('/:reviewID/reply', reviewController.getReplyByReviewID)
router.post('/:reviewID/:userID/reply', reviewController.createReplyReview)
router.delete('/:reviewID/reply/:replyID', reviewController.deleteReply)

module.exports = router