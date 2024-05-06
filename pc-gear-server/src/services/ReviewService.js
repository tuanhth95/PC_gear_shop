const Review = require('../models/Review');
const mongoose = require('mongoose');

const getAllReviews = async () => {
  return await Review.find({});
};

const getReviewsByProductID = async (productID) => {
  return await Review.find({"product.id": productID});
};

const createReview = async (reviewData) => {
  const { rate, contentReview, user, product } = reviewData;

  if (!rate || !contentReview) {
    return { status: 400, data: { message: 'Vui lòng điền đủ thông tin.' } };
  }
  if (!user || !product) {
    return { status: 400, data: { message: 'Không tìm thấy người dùng và sản phẩm.' } };
  }

  try {
    const review = new Review({
      rate: Number(rate),
      date: Date.now(), 
      contentReview,
      user,
      product
    });

    await review.save();
    return { status: 201, data: { message: 'Đánh giá đã được thêm', review } };
  } catch (error) {
    throw new Error('Lỗi tạo đánh giá: ' + error.message);
  }
};

const deleteReview = async (reviewID) => {
  if (!mongoose.Types.ObjectId.isValid(reviewID)) {
    return { status: 400, data: { error: 'ID không khả dụng' } };
  }

  const deletedReview = await Review.findByIdAndDelete(reviewID);
  
  if (!deletedReview) {
    return { status: 404, data: { error: 'Không tìm thấy đánh giá' } };
  }
  
  return { status: 200, data: { message: 'Đánh giá được xóa thành công', deletedReview } };
};

module.exports = {
  getAllReviews,
  getReviewsByProductID,
  createReview,
  deleteReview
};