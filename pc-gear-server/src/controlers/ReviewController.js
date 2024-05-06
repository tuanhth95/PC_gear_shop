const Review = require('../models/Review');
const reviewService = require('../services/reviewService');

const getReview = async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.json(reviews);
  } catch (error) {
    console.error('Lỗi', error);
    res.status(500).json({ error: 'Lỗi' });
  }
};

const getReviewByProductID = async (req, res) => {
  try {
    const productID = req.params.productID;
    const reviews = await reviewService.getReviewsByProductID(productID);
    
    if (!reviews.length) {
      return res.status(404).send('Không tìm thấy đánh giá cho sản phẩm này.');
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).send('Lỗi: ' + error.message);
  }
};

const createProductReview = async (req, res) => {
  try {
    const result = await reviewService.createReview(req.body);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tạo đánh giá', error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const result = await reviewService.deleteReview(req.params.reviewID);
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error('Lỗi xóa đánh giá:', error);
    res.status(500).json({ error: 'Quá trình xóa đánh giá bị lỗi' });
  }
};

module.exports = {
  getReview,
  getReviewByProductID,
  createProductReview,
  deleteReview
};