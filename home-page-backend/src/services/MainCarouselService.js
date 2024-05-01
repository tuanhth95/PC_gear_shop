const mongoose = require('mongoose')
const mainCarouselSchema = new mongoose.Schema({

    name: {type: String, required: true},
    img: {type: String, required: true}
}, {
    collection: "main_carousel",
    timestamps: true
})

const MainCarousel = mongoose.model('MainCarousel', mainCarouselSchema)

const findSlides = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const foundSlides = await MainCarousel.find()
            if (foundSlides) {
                resolve({
                    status: 'OK',
                    message: 'Slides found successfully',
                    data: foundSlides
                })
            } else {
                reject({
                    status: 'ERR',
                    message: 'Slides not found'
                })
            }
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

module.exports = {
    findSlides
}
