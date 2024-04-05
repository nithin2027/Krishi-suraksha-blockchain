const express = require('express');
const Company = require('../models/company.model');
const router = express.Router();

router.post('/companysignup', async (req, res) => {
    try {
        const existingCompany = await Company.findOne({ adminEmail: req.body.adminEmail });
        if (existingCompany) {
            return res.status(400).send({ statusCode: 400, message: 'Company already exists' });
        }

        const newCompany = new Company({
            companyName: req.body.companyName,
            officeState: req.body.officeState,
            officeAddress: req.body.officeAddress,
            adminFullName: req.body.adminFullName,
            aadharId: req.body.aadharId,
            adminMobileNumber: req.body.adminMobileNumber,
            adminEmail: req.body.adminEmail,
            adminPassword: req.body.adminPassword
        });

        const savedCompany = await newCompany.save();
        res.status(201).send({ statusCode: 201, message: 'Company registered successfully', company: savedCompany });
    } catch (error) {
        console.error('Error registering company:', error);
        res.status(500).send({ statusCode: 500, message: 'Internal server error' });
    }
});

// Sign-in route
router.post('/companysignin', async (req, res) => {
    try {
      // Check if the provided email and password match any existing user
      const company = await Company.findOne({
        adminEmail: req.body.adminEmail,
        adminPassword: req.body.adminPassword,
      });
  
      if (company) {
        // If user exists, return success response
        return res.status(200).send({ statusCode: 200, message: 'Sign in successful' });
      } else {
        // If user doesn't exist or credentials don't match, return error response
        return res.status(401).send({ statusCode: 401, message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error signing in:', error);
      res.status(500).send({ statusCode: 500, message: 'Internal server error' });
    }
  });

module.exports = router;
