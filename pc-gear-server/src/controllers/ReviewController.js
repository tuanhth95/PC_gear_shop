import Review from '../models/ReviewModel.js'
import User from '../models/UserModels.js'
import Product from '../models/ProductModel.js'
import reviewService from '../services/reviewService.js'
import userService from '../services/userService.js'


const getReview = async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();
    console.log("getReview_reviews: ", reviews);
    // const users = await User.find();
    const products = await Product.find()
    console.log("getReview_products: ", products);
    // const userMap = new Map(users.map(user => [user._id, user]));
    const productMap = new Map(products.map(product => [product.id, product]));
    console.log("getReview_productMap: ", productMap);
    const reviewsWithDetails = await Promise.all(reviews.map(async (review) => {
      // const user = userMap.get(review.userID) || {}; 
      const user = await userService.getDetailsUser(review.userID);
      const product = productMap.get(review.productID) || {}; 
      
      const replies = await Promise.all(review.replies.map(async (reply) => {
        const replyUser = await userService.getDetailsUser(reply.userID);
        console.log("getReview_replyUser: ", replyUser)
        return {
          _id: reply._id,
          content: reply.content,
          date: reply.date,
          userIdReply: reply.userID || null,
          userAvatarReply: replyUser.data.avatar || null,
          userNameReply: replyUser.data.username || null
        };
      }));

      return {
        _id: review._id,
        date: review.date,
        userId: review.userID || null,
        userName: user.data.username || null,
        productName: product.name || null,
        rate: review.rate || null,
        contentReview: review.contentReview || null,
        replies
      };
    }));

    res.json(reviewsWithDetails);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};
const getReviewByProductID = async (req, res) => {
  try {
    const productID = req.params.productID;
    const reviews = await reviewService.getReviewsByProductID(productID);
    
    if (!reviews.length) {
      return res.status(404).send('Không tìm thấy đánh giá cho sản phẩm này.');
    }
    // const users = await User.find();
    // console.log(users);
    const products = await Product.find()
    // const userMap = new Map(users.map(user => [user._id, user]));
    const productMap = new Map(products.map(product => [product.id, product]));
    
    const reviewsWithDetails = await Promise.all(reviews.map(async (review) => {
      // const user = userMap.get(review.userID) || {}; 
      const user = await userService.getDetailsUser(review.userID);
      const product = productMap.get(review.productID) || {}; 
      const replies = await Promise.all(review.replies.map(async (reply) => {
        const replyUser = await userService.getDetailsUser(reply.userID);
        return {
          _id: reply._id,
          content: reply.content,
          date: reply.date,
          userIdReply: reply.userID || null,
          userAvatarReply: replyUser.data.avatar || null,
          userNameReply: replyUser.data.username || null
        };
      }));

      return {
        _id: review._id,
        date: review.date,
        userId: review.userID || null,
        userName: user.data.username || null,
        productName: product.name || null,
        rate: review.rate || null,
        contentReview: review.contentReview || null,
        replies
      };
    }));

    res.json(reviewsWithDetails);
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
//         userAvatar: user.avatar,
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
  try {
    const { reviewID, replyID } = req.params; 
    const result = await reviewService.deleteReply(reviewID, replyID);

    if (!result.success) {
      return res.status(404).json({ success: false, message: result.message });
    }

    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    console.error('Lỗi xóa đánh giá con:', error);
    return res.status(500).json({ success: false, message: 'Xuất hiện lỗi trong khi xóa đánh giá con' });
  }
};

export default {
  getReview,
  getReviewByProductID,
  createProductReview,
  deleteReview,
  // getReplyByReviewID,
  createReplyReview,
  deleteReply
};