import express from "express"
const router = express.Router();
import multer from 'multer'
import CarouselController from '../controllers/CarouselController.js'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
  cloud_name: 'dsesvbswd', 
  api_key: '748773258968946', 
  api_secret: '-sxQmTFpaKwbAGrazYWlDMwWjCk' 
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: '/public/uploads/carousel',
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
router.post('/',CarouselController.createCarousel)
router.get('/get-all', CarouselController.getAllCarousel)
router.delete('/del-all', CarouselController.deleteAllCarousel)
router.put('/update/:id',CarouselController.updateCarousel)
router.delete('/delete/:id', CarouselController.deleteCarousel)

export default router