const mongoose = require("mongoose");

const Rent = mongoose.model("Rent", {
  name: String,
  address: String,
  zipCode: Number,
  birthDate: String,
  phoneNumber: Number,
  bookName: String,
  author: String,
  publishingCompany: String,
  literaryGenre: String,
  parentalRating: String,
});

module.exports = Rent;
