// RegCropInsurance.jsx
import React, { useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/footer';
import './regcropinsuranceform.css'; // You may need to create a new CSS file for this component

const RegCropInsurance = () => {
  const [formData, setFormData] = useState({
    year: '',
    cropSeason: '',
    cropName: '',
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

  const handleViewPolicy = () => {
    // Implement logic to handle view policy button click
    console.log('View Policy clicked with data:', formData);
  };

  return (
    <div className="reg-crop-insurance-form-container">
      <Header />
      <main>
        <h1>Registration for Crop Insurance</h1>
        <form className="reg-crop-insurance-form">

          {/* Registration Form */}
          <h2>Registration Information</h2>
          <div className="form-row">
            <div className="form-group">
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

              <label>Select Crop Season:</label>
              <select
                name="cropSeason"
                value={formData.cropSeason}
                onChange={handleChange}
              >
                <option value="">Select Crop Season</option>
                <option value="Rabi">Rabi</option>
                <option value="Kharif">Kharif</option>
              </select>
              {displayError('cropSeason')}

              <label>Crop Name:</label>
              <input
                type="text"
                name="cropName"
                value={formData.cropName}
                onChange={handleChange}
              />
              {displayError('cropName')}
            </div>
          </div>

          <center><button type="button" onClick={handleViewPolicy}>View Policy</button></center>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default RegCropInsurance;
