const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        rate: {type: Number, required: true, min: 1, max:5},
        date: {type: Date, default: Date.now},
        contentReview: {type: String, required: true},
        userID: {type: Number, required: true},
        productID: {type: Number, required: true},
        replies: [{
            content: {type: String, required: true},
            userID: {type: Number, required: true},
            date: {type: Date, default: Date.now}
        }]
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true
        // },
        // product:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Product',
        //     required: true
        // }
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;