const mongoose = require("mongoose");

const Book = mongoose.model("Book", {
  bookName: String,
  author: String,
  publishingCompany: String,
  literaryGenre: String,
  parentalRating: Number,
});

module.exports = Book;
