const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

const reviewSchema = new mongoose.Schema(
    {
        // userName:{type: String, required: true},
        // userImage: {type: String, required: true},
        rate: {type: Number, required: true, min: 1, max:5},
        date: {type: Date, default: Date.now},
        contentReview: {type: String, required: true},
        userID: { type: Number, required: true },
        productID: { type: Number, required: true }, 
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
        // review_id: {type: Number, default: 0, unique: true}
    },
    {
        timestamps: true,
    }
);

// autoIncrement.initialize(mongoose.connection); 
// reviewSchema.plugin(autoIncrement.plugin, {
//   model: 'Eeview',
//   field: 'review_id',
//   startAt: 1,
//   incrementBy: 1
// });

const Review = mongoose.model('Review', reviewSchema);

export default Review;