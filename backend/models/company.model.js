const mongoose = require('mongoose');

// Define schema for the company
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  officeState: {
    type: String,
    required: true
  },
  officeAddress: {
    type: String,
    required: true
  },
  adminFullName: {
    type: String,
    required: true
  },
  aadharId: {
    type: String,
    required: true
  },
  adminMobileNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid 10-digit mobile number!`
    }
  },
  adminEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  adminPassword: {
    type: String,
    required: true,
    minlength: 6
  },

});

// Create Company model from schema
const Company = mongoose.model('Company', companySchema);

// Export the Company model
module.exports = Company;
