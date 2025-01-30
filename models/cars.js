const mongoose = require('mongoose');

const CarsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
  makeYear: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear(),
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[A-Za-z0-9]+$/, 
  },
  carType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cars = mongoose.model('Cars', CarsSchema);
module.exports = Cars;
