import sharp from 'sharp'
import Carousel from'../models/CarouselModel.js'
import fetchPromise from 'node-fetch'

async function uploadCarousel(newCarousel, id) {
  try {
    const fetch = await fetchPromise;
    const { filename, url } = newCarousel;
    const response = await fetch.default(url);
    const buffer = await response.buffer();
    const imageData = buffer;
    const dataSize = buffer.byteLength;
    const imageSizeInKB = (dataSize / (1024 * 1024)).toFixed(3);
    const metadata = await sharp(Buffer.from(imageData, 'base64')).metadata();
    const type = metadata.format;
    const dimensions = {
      width: metadata.width,
      height: metadata.height
    };

    const existingImage = await Carousel.findOne({ _id: id });

    if (existingImage) {
      existingImage.filename = filename;
      existingImage.url = url;
      existingImage.size = `${dimensions.width}x${dimensions.height}`;
      existingImage.data = `${imageSizeInKB} MB`;
      existingImage.contentType = type ? type : null;
      await existingImage.save();
    } else {
      const image = new Carousel({
        filename: filename,
        data: `${imageSizeInKB} MB`, 
        contentType: type ? type : null, 
        size: `${dimensions.width}x${dimensions.height}`, 
        url: url, 
      });

      await image.save();
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Error uploading image');
  }
}
async function deleteCarouselById(id) {
  await Carousel.findByIdAndDelete(id);
}

export default {
  uploadCarousel,
  deleteCarouselById
};
