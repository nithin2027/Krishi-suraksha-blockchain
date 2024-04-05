// PremiumCalculator.jsx
import React, { useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/footer';
import './premiumcalculatorform.css';

const PremiumCalculator = () => {
  const [formData, setFormData] = useState({
    cropSeason: '',
    year: '',
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

    setFormErrors(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

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
      // Implement logic for premium calculation or any other action
      console.log('Premium calculation submitted with data:', formData);
      setFormData({
        cropSeason: '',
        year: '',
      });
      setFormErrors({});
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <div className="premium-calculator-form-container">
      <Header />
      <main>
        <h1>Premium Calculator</h1>
        <form onSubmit={handleSubmit} className="premium-calculator-form">

          {/* Premium Calculator Form */}
          <h2>Calculate Premium</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Select Crop Season:</label>
              <select
                name="cropSeason"
                value={formData.cropSeason}
                onChange={handleChange}
              >
                <option value="">Select Crop Season</option>
                <option value="Winter">Winter</option>
                <option value="Summer">Summer</option>
              </select>
              {displayError('cropSeason')}

              <label>Select Year:</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
              >
                <option value="" disabled>Select Year</option>
                {Array.from({ length: 24 }, (_, index) => 2000 + index).map((year) => (
                  <option key={year} value={year}>{`${year}-${year + 1}`}</option>
                ))}
              </select>
              {displayError('year')}
            </div>
          </div>

          <center><button type="submit">Calculate Premium</button></center>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default PremiumCalculator;
