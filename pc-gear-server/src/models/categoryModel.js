const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subCategories: [
    {
      title: {
        type: String,
        required: true,
      },
      href: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
