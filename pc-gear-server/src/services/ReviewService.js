const Review = require('../models/ReviewModel');
const mongoose = require('mongoose');


const getAllReviews = async () => {
  return await Review.find({});
};

const getReviewsByProductID = async (productID) => {
  return await Review.find({ productID: productID });
};

const createReview = async (req, res) => {
  const { userID, productID } = req.params;
  const { rate, contentReview } = req.body;

  if (!rate || !contentReview) {
    return { status: 400, data: { message: 'Vui lòng điền đủ thông tin.' } };
  }

  try {
    const review = new Review({
      rate: Number(rate),
      date: Date.now(), 
      contentReview,
      userID,
      productID
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

// const getReplyByID = async (reviewID) => {
//   return await Review.findById(reviewID);
// };

const createReplyReview = async (userID, reviewID, content) => {
  if (!content) {
    return { status: 400, data: { message: 'Vui lòng điền đủ thông tin.' } };
  }

  try {
    const review = await Review.findById(reviewID);

    if (!review) {
      return { status: 404, data: { message: 'Không tìm thấy đánh giá.' } };
    }

    const newReply = {
      content,
      userID, 
      date: Date.now()
    };

    review.replies.push(newReply);

    await review.save();

    return { status: 201, data: { message: 'Phản hồi đã được thêm', reply: newReply } };
  } catch (error) {
    console.error('Lỗi tạo phản hồi:', error);
    return { status: 500, data: { message: 'Đã xảy ra lỗi khi tạo phản hồi.' } };
  }
};
const deleteReply = async (reviewID, replyID) => {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: reviewID, "replies._id": replyID },
      { $pull: { replies: { _id: replyID } } },
      { new: true }
    );

    if (!review) {
      return { success: false, message: 'Đánh giá không được tìm thấy' };
    }

    return { success: true, message: 'Xóa đánh giá con thành công' };
  } catch (error) {
    console.error('Lỗi trong khi xóa:', error);
    throw new Error('Xuất hiện lỗi trong khi xóa đánh giá con');
  }
};

module.exports = {
  getAllReviews,
  getReviewsByProductID,
  createReview,
  deleteReview,
  // getReplyByID,
  createReplyReview,
  deleteReply
};