// backend/models/farmer.model.js

const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  // Basic Details
  fullName: {type: String, required: true},
  age: {type: Number, required: true, min: 18, max: 130},
  farmerType: {type: String},
  mobileNumber: {type: String, required: true, unique: true, minlength: 10, maxlength: 10},
  gender: {type: String},

  // Residential Details
  state: {type: String},
  district: {type: String}, 
  address: {type: String},
  pincode: {type: String},

  // Password Details
  farmerPassword: {
    type: String,
    required: true,
    minlength: 6
  },

  // Bank Details
  bankName: {type: String},
  ifsc: {type: String},
  branchName: {type: String},
  accountNumber: {type: String}
});

const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;
