const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: String, // Tên tệp hình ảnh
  data: String, // Dung lượng hình ảnh (đv: MB)
  contentType: String, // Loại hình ảnh (vd:png,jpeg,...)
  size: String, // Kích thước của hình ảnh (wxh)
  url: String, // Đường dẫn URL đến hình ảnh
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;