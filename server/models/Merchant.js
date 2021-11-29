const mongoose = require("mongoose");

//String Cat is the name of table Cat
const Merchant = mongoose.model("Merchant", {
  merchantName: String,
});
module.exports = Merchant;
