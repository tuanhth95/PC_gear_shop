import mongoose from "mongoose"

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

<<<<<<< HEAD
export default mongoose.model("Category", categorySchema);
=======
module.exports = mongoose.model("Category", categorySchema);
>>>>>>> 73416deb46d3ebc7ba4e027406c2ef0f972946bb
