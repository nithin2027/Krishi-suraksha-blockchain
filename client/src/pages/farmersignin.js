// Inside SigninFarmer component
import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
// import Footer from '../footer/footer';
import Styles from './signinform.module.css';
import Footer from './components/footer';

const SigninFarmer = () => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    farmerPassword: '',
  });


  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/farmersignin', formData);
      if (response.status === 200) {
        // Save token to local storage
        localStorage.setItem('token', response.data.token);
        alert('Sign in successful');
        // Redirect to dashboard
        window.location.href = '/launched-app';
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Invalid mobile number or password');
    }
  };


  return (
    <div>
    <div className={Styles.signinFormContainer}>
        <Header />
        <main>
        <div className={Styles.card}>
          <h1><b>Sign In for Farmer</b></h1>
          <form onSubmit={handleSubmit} className={Styles.signupForm}>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className={Styles.formRow}>
              <div className={Styles.formGroup}>
                <label className={Styles.label}>Mobile Number:</label>
                <input className={Styles.input}
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
                <label className={Styles.label}>Password:</label>
                <input className={Styles.input}
                  type="password"
                  name="farmerPassword"
                  value={formData.farmerPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button className={Styles.button} type="submit">Sign In</button>
            <p>
              Not registered?{' '}
              <span style={{ cursor: 'pointer', color: 'blue' }}>
                Sign up
              </span>
            </p>
          </form>
    </div>
        </main>
      </div>
        <Footer /> 
        </div>
  );
};

export default SigninFarmer;
