"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const booksSchema = new Schema({
  title: String,
  description: String,
  images: String,
  price: Number
});

module.exports = mongoose.model('Books', booksSchema);
