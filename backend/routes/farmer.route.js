// backend/routes/farmer.route.js
const jwt = require('jsonwebtoken');
const express = require('express');
const Farmer = require('../models/farmer.model');
const router = express.Router();

router.post('/farmersignup', async (req, res) => {
  try {
      const existingFarmer = await Farmer.findOne({ mobileNumber: req.body.mobileNumber });
      if (existingFarmer) {
          return res.status(400).send({ statusCode: 400, message: 'Farmer already exists' });
      }

      const newFarmer = new Farmer({
          fullName: req.body.fullName,
          age: req.body.age,
          farmerType: req.body.farmerType,
          mobileNumber: req.body.mobileNumber,
          gender: req.body.gender,
          state: req.body.state,
          district: req.body.district,
          address: req.body.address,
          pincode: req.body.pincode,
          farmerPassword: req.body.farmerPassword,
          bankName: req.body.bankName,
          ifsc: req.body.ifsc,
          branchName: req.body.branchName,
          accountNumber: req.body.accountNumber
      });

      const savedFarmer = await newFarmer.save();
      res.status(201).send({ statusCode: 201, message: 'Farmer registered successfully', farmer: savedFarmer });
  } catch (error) {
      console.error('Error registering farmer:', error);
      res.status(500).send({ statusCode: 500, message: 'Internal server error' });
  }
});

// router.post('/farmersignin', async (req, res) => {
//   try {
//     const { mobileNumber, farmerPassword } = req.body;

//     // Check if the provided mobile number exists
//     const farmer = await Farmer.findOne({ mobileNumber });

//     if (!farmer) {
//       return res.status(401).json({ statusCode: 401, message: 'Invalid mobile number or password' });
//     }

//     // Verify password
//     if (farmer.farmerPassword !== farmerPassword) {
//       return res.status(401).json({ statusCode: 401, message: 'Invalid mobile number or password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: farmer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Send token in response
//     res.status(200).json({ statusCode: 200, message: 'Sign in successful', token });
//   } catch (error) {
//     console.error('Error signing in:', error);
//     res.status(500).json({ statusCode: 500, message: 'Internal server error' });
//   }
// });

router.post('/farmersignin', async (req, res) => {
  try {
    // Check if the provided mobile number exists
    const farmer = await Farmer.findOne({
      mobileNumber: req.body.mobileNumber,
      farmerPassword: req.body.farmerPassword
    });

    if (farmer) { 
      // If farmer exists, return success response
      return res.status(200).send({ statusCode: 200, message: 'Sign in successful' });
    } else {
      // If farmer doesn't exist or credentials don't match, return error response
      return res.status(401).send({ statusCode: 401, message: 'Invalid mobile number or password' });
    } const token = jwt.sign({ id: farmer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).send({ statusCode: 500, message: 'Internal server error' });
  }
});
module.exports = router;
