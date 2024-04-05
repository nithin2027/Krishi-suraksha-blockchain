// TrackPolicy.jsx
import React, { useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/footer';
import './trackpolicyform.css'; // Create a new CSS file for styling if needed

const TrackPolicy = () => {
  const [formData, setFormData] = useState({
    policyNumber: '',
  });

  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
    // Clear form error message when user starts typing
    setFormError('');
  };

  const handleTrack = (e) => {
    e.preventDefault();

    // Check if the policyNumber is empty
    if (!formData.policyNumber.trim()) {
      setFormError('The field is empty');
      return;
    }

    // Add logic here to handle tracking the policy using the policy number
    // For example, you can make an API call or perform any necessary actions
    console.log('Tracking policy with policy number:', formData.policyNumber);
  };

  return (
    <div className="track-policy-form-container">
      <Header />
      <main>
        <h1>Track Insurance Policy</h1>
        <form onSubmit={handleTrack} className="track-policy-form">

          {/* Policy Tracking */}
          <div className="form-row">
            <div className="form-group">
              <label>Policy Number:</label>
              <input
                type="text"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
              />
              {formError && (
                <span className="error" style={{ color: 'red', fontSize: '12px' }}>{formError}</span>
              )}
            </div>
          </div>

          <center><button type="submit">Track Policy</button></center>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default TrackPolicy;
