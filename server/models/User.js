const mongoose = require("mongoose");

//String Cat is the name of table Cat
const User = mongoose.model("User", {
  firstName: String,
  lastName: String,
});
module.exports = User;

// const Schema = mongoose.Schema;

//String Cat is the name of table Cat
// const UserSchema = new Schema({
//   id: { type: Schema.Types.ObjectId },
//   firstname: { type: String },
//   lastname: { type: String },
// });

// const User = mongoose.model("User", UserSchema);
// module.exports = User;
