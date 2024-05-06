const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  filename: String, 
  data: String, 
  contentType: String, 
  size: String, 
  url: String,
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;