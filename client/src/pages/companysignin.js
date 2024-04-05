// SigninInsurance.jsx
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import Header from './components/Header';
import Footer from './components/footer';
import Styles from './signupform.module.css';

const SigninInsurance = () => {

  const [formData, setFormData] = useState({
    adminEmail: '',
    adminPassword: '',
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
      <span className={Styles.error} style={{ color: 'red', fontSize: '12px' }}>{formErrors[fieldName]}</span>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8080/companysignin', formData);
        if (response.status === 200) {
          alert('Sign in successful');
          window.location.href = '/launched-app-company';
        } else {
          alert('Invalid email or password');
        }
      } catch (error) {
        console.error('Error signing in:', error);
        alert('Failed to sign in. Please try again.');
      }
    } else {
      console.log('Form validation failed');
    }
  };

  const handleSigninClick = () => {
    window.location.href = '/companysignup';
  };

  return (
    <div>
    <div className={Styles.signupFormContainer}>
      <Header />
      <main>
        <div className={Styles.card}>
          <h1>Sign In for Insurance</h1>
          <form onSubmit={handleSubmit} className={Styles.signupForm}>

            {/* Signin Information */}
          
            <div className={Styles.formRow}>
              <div className={Styles.formGroup}>
                <label className={Styles.label}>Email:</label>
                <input className={Styles.input}
                  type="email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                />
                {displayError('adminEmail')}

                <label className={Styles.label}>Password:</label>
                <input className={Styles.input}
                  type="password"
                  name="adminPassword"
                  value={formData.adminPassword}
                  onChange={handleChange}
                />
                {displayError('adminPassword')}
              </div>
            </div>

            <center><button className={Styles.button} type="submit"> Sign In</button></center>
            <p>Not registered? <span onClick={handleSigninClick} style={{ cursor: 'pointer', color: 'blue' }}>Sign up</span></p>
          </form>
        </div>
      </main>
    </div>
      <Footer />
      </div>
  );
};

export default SigninInsurance;
