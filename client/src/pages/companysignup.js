import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/footer';
import Styles from './signupform.module.css';

const SignupInsurance = () => {

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const initialFormData = {
    companyName: '',
    officeState: '',
    officeAddress: '',
    adminFullName: '',
    aadharId: '',
    adminMobileNumber: '',
    adminEmail: '',
    adminPassword: '',
    confirmPassword: '',
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    for (const key in formData) {
      if (formData[key] === '') {
        errors[key] = 'This field is required';
      }
    }

    if (formData.adminMobileNumber !== '') {
      if (formData.adminMobileNumber.length !== 10) {
        errors.adminMobileNumber = 'Mobile number should be a 10-digit number';
      }
    } else {
      errors.adminMobileNumber = 'This field is required';
    }

    if (formData.adminEmail !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.adminEmail)) {
        errors.adminEmail = 'Invalid email address';
      }
    } else {
      errors.adminEmail = 'This field is required';
    }

    if (formData.aadharId !== '') {
      if (formData.aadharId.length !== 12) {
        errors.aadharId = 'Aadhar ID should be a 12-digit number';
      }
    } else {
      errors.aadharId = 'This field is required';
    }

    if (formData.adminPassword !== '') {
      if (formData.adminPassword.length < 6 || !/[a-z]/.test(formData.adminPassword) || !/[A-Z]/.test(formData.adminPassword) || !/\d/.test(formData.adminPassword)) {
        errors.adminPassword = 'Password must be at least 6 characters long and contain 1 uppercase, 1 lowercase letter, and 1 number';
      }
    } else {
      errors.adminPassword = 'This field is required';
    }

    if (formData.confirmPassword !== '') {
      if (formData.confirmPassword !== formData.adminPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    } else {
      errors.confirmPassword = 'This field is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Enforce character limit for mobileNumber (10 digits)
    if (name === 'adminMobileNumber' && value.length > 10) {
      return;
    }

    // Enforce character limit for aadharId (12 digits)
    if (name === 'aadharId' && value.length > 12) {
      return;
    }

    // Only allow numeric values for adminMobileNumber and aadharId
    if (['adminMobileNumber', 'aadharId'].includes(name)) {
      if (!/^[0-9]*$/.test(value)) {
        return;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const displayError = (fieldName) => {
    return formErrors[fieldName] && (
      <span className={Styles.error} style={{ color: 'red', fontSize: '12px' }}>{formErrors[fieldName]}</span>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8080/companysignup', formData);
        if (response.status === 201) {
          alert('Company has been successfully registered');
          // Reset the form after successful submission
          setFormData({ ...initialFormData });
          setFormErrors({});
          // redirect to insurance 
          window.location.href = '/companysignin';
        } else {
          alert('Failed to register company. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to register company. Please try again.');
      }
    } else {
      console.log('Form validation failed');
    }
  };

  const handleSigninClick = () => {
    window.location.href = '/companysignin';
  };

  return (
    <div>
    <div className={Styles.signupFormContainer}>
      <Header />
      <main>
        <div className={Styles.card}>
          <h1><center><b>Registration for Insurance Companies</b></center></h1>
          <br/>
          <form onSubmit={handleSubmit} className={Styles.signupForm}>

            {/* Basic Details */}
            <h2>Basic Details</h2>  <br/>
            <div className={Styles.formRow}>
              <div className={Styles.formGroup}>
                <label className={Styles.label}>Company Name:</label>
                <input className={Styles.input}
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
                {displayError('companyName')}
              </div>

              <div className={Styles.formGroup}>
                <label className={Styles.label}>State:</label>
                <select name="officeState" value={formData.officeState} onChange={handleChange}>
                  <option value="">Select</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {displayError('officeState')}
              </div>
            </div>

            <div className={Styles.formGroup}>
              <label className={Styles.label}>Office Address:</label>
              <input className={Styles.input}
                type="text"
                name="officeAddress"
                value={formData.officeAddress}
                onChange={handleChange}
              />
              {displayError('officeAddress')}
            </div>

            {/* Admin Details */}
            <h2>Admin Details</h2>
            <div className={Styles.formRow}>
              <div className={Styles.formGroup}>
                <label className={Styles.label}>Full Name:</label>
                <input className={Styles.input}
                  type="text"
                  name="adminFullName"
                  value={formData.adminFullName}
                  onChange={handleChange}
                />
                {displayError('adminFullName')}
              </div>

              <div className={Styles.formGroup}>
                <label className={Styles.label}>Aadhar ID:</label>
                <input className={Styles.input}
                  type="text"
                  name="aadharId"
                  value={formData.aadharId}
                  onChange={handleChange}
                />
                {displayError('aadharId')}
              </div>
            </div>

            <div className={Styles.formRow}>
              <div className={Styles.formGroup}>
                <label className={Styles.label}>Mobile Number:</label>
                <input className={Styles.input}
                  type="text"
                  name="adminMobileNumber"
                  value={formData.adminMobileNumber}
                  onChange={handleChange}
                />
                {displayError('adminMobileNumber')}
              </div>

              <div className={Styles.formGroup}>
                <label className={Styles.label}>Email:</label>
                <input className={Styles.input}
                  type="email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                />
                {displayError('adminEmail')}
              </div>
            </div>

            <div className={Styles.formRow}>
              <div className={Styles.formGroup}>
                <label className={Styles.label}>Password:</label>
                <input className={Styles.input}
                  type="password"
                  name="adminPassword"
                  value={formData.adminPassword}
                  onChange={handleChange}
                />
                {displayError('adminPassword')}
              </div>

              <div className={Styles.formGroup}>
                <label className={Styles.label}>Confirm Password:</label>
                <input className={Styles.input}
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {displayError('confirmPassword')}
              </div>
            </div>

            <button className={Styles.button} type="submit">Register</button>
            <p>Already a user? <span onClick={handleSigninClick} style={{ cursor: 'pointer', color: 'blue' }}>Sign in</span></p>
          </form>
        </div>
      </main>
    </div>
    
      <Footer />
      </div>
  );
};

export default SignupInsurance;
