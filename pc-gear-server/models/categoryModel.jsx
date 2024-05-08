const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subCategories: [subCategorySchema],
});

module.exports = mongoose.model("Category", categorySchema);