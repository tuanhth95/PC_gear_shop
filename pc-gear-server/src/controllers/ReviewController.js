const Review = require('../models/ReviewModel');
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
    const userMap = new Map(dataUser.map(user => [user.id, user]));
    
    const updatedReviews = await Promise.all(reviews.map(async (review) => {
      // const user = dataUser.find(item => item.id === review.userID);
      const user = userMap.get(review.userID);
      if (user) {
        const replies = review.replies.map(reply => {
          const replyUser = userMap.get(reply.userID);
          return {
            ...reply,
            userImageReply: replyUser ? replyUser.image : null,
            userNameReply: replyUser ? replyUser.name : null
          };
        });
        return {
          ...review,
          userImage: user.image,
          userName: user.name,
          replies: replies
        };
      }
      return review;
    }));

    res.status(200).json(updatedReviews);
  } catch (error) {
    res.status(500).send('Lỗi: ' + error.message);
  }
};

const createProductReview = async (req, res) => {
  try {
    const { userID, productID } = req.params;
    const { rate, contentReview } = req.body;
    const review = await reviewService.createReview(req);
    res.status(review.status).json(review.data);
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

// const getReplyByReviewID = async (req, res) => {
//   try {
//     const replies = await reviewService.getReplyByID(req.params.reviewID);

//     if (!Array.isArray(replies)) {
//       return res.status(404).json({ message: 'Không tìm thấy câu trả lời nào cho đánh giá này.' });
//     }

//     const updatedReplies = replies.map(reply => {
//       const user = dataUser.find(item => item.id === reply.userID);
    
//       return {
//         ...reply,
//         userImage: user.image,
//         userName: user.name
//       };
//     });

//     res.status(200).json(updatedReplies);
//   } catch (error) {
//     res.status(500).json({ message: 'Lỗi: ' + error.message });
//   }
// };

const createReplyReview = async (req, res) => {
  try {
    const { userID, reviewID } = req.params;
    const { content } = req.body;
    const reply = await reviewService.createReplyReview(userID, reviewID, content);
    res.status(reply.status).json(reply.data);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tạo phản hồi', error: error.message });
  }
};
const deleteReply = async (req, res) => {
  
};

module.exports = {
  getReview,
  getReviewByProductID,
  createProductReview,
  deleteReview,
  // getReplyByReviewID,
  createReplyReview,
  deleteReply
};