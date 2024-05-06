const sharp = require('sharp');
const Image = require('../models/ImgProduct')
const fetchPromise = import('node-fetch');

async function uploadImage(newImg, id) {
  try {
    const fetch = await fetchPromise;
    const { filename, url } = newImg;
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

    const existingImage = await Image.findOne({ _id: id });

    if (existingImage) {
      existingImage.filename = filename;
      existingImage.url = url;
      existingImage.size = `${dimensions.width}x${dimensions.height}`;
      existingImage.data = `${imageSizeInKB} MB`;
      existingImage.contentType = type ? type : null;
      await existingImage.save();
    } else {
      const image = new Image({
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
async function deleteImageById(id) {
  await Image.findByIdAndDelete(id);
}

module.exports = {
  uploadImage,
  deleteImageById
};
