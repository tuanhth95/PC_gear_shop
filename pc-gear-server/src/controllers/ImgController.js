const Image = require('../models/ImgProduct');
const imageService = require('../services/ImageService');

async function createImages(req, res) {
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
    
    const response = await imageService.uploadImage({ filename, url });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
        status: 'ERR',
        message: error.message || 'Internal Server Error'
    });
  }
}
async function getAllImages(req, res) {
    try {
      const images = await Image.find();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}
  async function deleteAllImages(req, res) {
    try {
      await Image.deleteMany();
      res.status(200).send('All images deleted successfully');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async function updateImage(req, res) {
    try {
      const { id } = req.params
      //const {filename, url} = req.body;

      await imageService.uploadImage(req.body, id);
      res.status(200).send('Image updated successfully');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}
async function deleteImage(req, res) {
  try {
    const { id } = req.params;
    await imageService.deleteImageById(id);
    res.status(200).send('Image deleted successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = {
  createImages,
  getAllImages,
  deleteAllImages,
  updateImage,
  deleteImage
};
