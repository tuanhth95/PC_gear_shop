const mongoose = require('mongoose')

const mainCarouselSchema = new mongoose.Schema({

    name: {type: String, required: true},
    img: {type: String, required: true}
}, {
    collection: "main_carousel",
    timestamps: true
})

const MainCarousel = mongoose.model('MainCarousel', mainCarouselSchema)
module.exports = MainCarousel