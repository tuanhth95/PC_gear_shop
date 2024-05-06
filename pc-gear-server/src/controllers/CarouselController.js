const Carousel = require('../models/Carousel');
const CarouselService = require('../services/CarouselService');

async function createCarousel(req, res) {
  try{
    let filename, url;
        if (req.body.url) { 
            filename = req.body.filename;
            url = req.body.url;
        } else if (req.file) {
            filename = req.file.filename;
            url = req.file.path;
        } else {
            return res.status(400).json({
                status: 'ERR',
                message: 'Either URL or file upload is required'
            });
        }
    if(!filename || !url)
    {
        return res.status(400).json({
            status: 'ERR',
            message: 'Both filename and URL are required'
        });
    }
    
    const response = await CarouselService.uploadCarousel({ filename, url });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
        status: 'ERR',
        message: error.message || 'Internal Server Error'
    });
  }
}
async function getAllCarousel(req, res) {
    try {
      const images = await Carousel.find();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}
  async function deleteAllCarousel(req, res) {
    try {
      await Carousel.deleteMany();
      res.status(200).send('All images deleted successfully');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async function updateCarousel(req, res) {
    try {
      const { id } = req.params
      //const {filename, url} = req.body;

      await CarouselService.uploadCarousel(req.body, id);
      res.status(200).send('Image updated successfully');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}
async function deleteCarousel(req, res) {
  try {
    const { id } = req.params;
    await CarouselService.deleteCarouselById(id);
    res.status(200).send('Image deleted successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = {
    createCarousel,
    getAllCarousel,
    deleteAllCarousel,
    updateCarousel,
    deleteCarousel
};
