const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  age: Number,
  userType: Number,
});

module.exports = User;
