// PolicyDetails.jsx
import React, { useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/footer';
import './policydetailsform.css';

const PolicyDetails = () => {
  const [formData, setFormData] = useState({
    policyName: '',
    cropType: '',
    startDate: '',
    endDate: '',
    premiumAmount: '',
    sumInsured: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Validate compulsory fields
    for (const key in formData) {
      if (formData[key] === '') {
        errors[key] = 'This field is required';
      }
    }

    // Validate date format for startDate and endDate
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (formData.startDate && !dateRegex.test(formData.startDate)) {
      errors.startDate = 'Invalid date format';
    }
    if (formData.endDate && !dateRegex.test(formData.endDate)) {
      errors.endDate = 'Invalid date format';
    }

    // Validate endDate is not less than startDate
    if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
      errors.endDate = 'End Date should not be less than Start Date';
    }

    // Validate premiumAmount and sumInsured are positive integers
    const integerRegex = /^[1-9]\d*$/;
    if (!integerRegex.test(formData.premiumAmount)) {
      errors.premiumAmount = 'Please enter a valid positive integer';
    }
    if (!integerRegex.test(formData.sumInsured)) {
      errors.sumInsured = 'Please enter a valid positive integer';
    }

    setFormErrors(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (['premiumAmount', 'sumInsured'].includes(name)) {
      if (!Number.isInteger(Number(value)) || Number(value) < 0) {
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
      <span className="error" style={{ color: 'red', fontSize: '12px' }}>{formErrors[fieldName]}</span>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Policy details submitted with data:', formData);
      setFormData({
        policyName: '',
        cropType: '',
        startDate: '',
        endDate: '',
        premiumAmount: '',
        sumInsured: '',
      });
      setFormErrors({});
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <div className="policy-details-form-container">
      <Header />
      <main>
        <h1>Insurance Policy Details</h1>
        <form onSubmit={handleSubmit} className="policy-details-form">

          {/* Policy Details */}
          <h2>Policy Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Policy Name:</label>
              <input
                type="text"
                name="policyName"
                value={formData.policyName}
                onChange={handleChange}
              />
              {displayError('policyName')}

              <label>Type of Crop:</label>
<select
  name="cropType"
  value={formData.cropType}
  onChange={handleChange}
>
  <option value="">Select Type</option>
  <option value="Rabi">Rabi</option>
  <option value="Kharif">Kharif</option>
</select>
{displayError('cropType')}

              <label>Start Date of Coverage:</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
              {displayError('startDate')}

              <label>End Date of Coverage:</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
              {displayError('endDate')}

              <label>Premium Amount:</label>
              <input
                type="text"
                name="premiumAmount"
                value={formData.premiumAmount}
                onChange={handleChange}
              />
              {displayError('premiumAmount')}

              <label>Sum Insured:</label>
              <input
                type="text"
                name="sumInsured"
                value={formData.sumInsured}
                onChange={handleChange}
              />
              {displayError('sumInsured')}
            </div>
          </div>

          <center><button type="submit">Submit Policy Details</button></center>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default PolicyDetails;
