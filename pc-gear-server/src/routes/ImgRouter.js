const express = require("express")
const router = express.Router();
const multer = require('multer');
const ImgController = require('../controllers/ImgController')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dsesvbswd', 
  api_key: '748773258968946', 
  api_secret: '-sxQmTFpaKwbAGrazYWlDMwWjCk' 
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: '/public/uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], 
  }
});
  
const upload = multer({ storage: storage });
  
router.post('/upload', upload.single('file'), async(req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json(result);
    console.log(result);
    //console.log("url: ", result.secure_url);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});
router.post('/',ImgController.createImages)
router.get('/get-all', ImgController.getAllImages)
router.delete('/del-all', ImgController.deleteAllImages)
router.put('/update/:id',ImgController.updateImage)
router.delete('/delete/:id', ImgController.deleteImage)

module.exports = router