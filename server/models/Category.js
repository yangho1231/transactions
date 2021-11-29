const mongoose = require("mongoose");

const Category = mongoose.model("Category", {
  categoryName: String,
});
module.exports = Category;
