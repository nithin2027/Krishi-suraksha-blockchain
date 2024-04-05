// Landing.jsx

import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/footer';
import './Landing.css'; // Import the new CSS file for styling

// Card component from Landing.jsx
const Card = ({ link, imageSrc, name }) => {
    
    return (
        <div className="card" style={{ width: '200px', margin: '20px' }} onClick={() => window.location.href = link}>
            <img src={imageSrc} className="card-img-top" alt={name} style={{ objectFit: 'cover', height: '200px' }} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
            </div>
        </div>
    );
};

function Landing() {
    return (
        <div className="landing-container">
            <Header />
            <marquee className="row mt-4 text-center" scrollamount="10" style={{ color: 'red' }}>🌱🌱🌱 Welcome to Krishi Suraksha 🌱🌱🌱</marquee>
            <h2 className="row mt-4 text-center">Main Links</h2>
            <div className="row justify-content-center">
                <Card link="/farmer-corner" imageSrc="https://png.pngtree.com/png-clipart/20211219/original/pngtree-indian-farmer-yellow-wheat-cartoon-style-png-image_6966513.png" name="Farmer Corner" />
                <Card link="/calculate-premium" imageSrc="https://static.vecteezy.com/system/resources/previews/010/852/895/original/realistic-calculator-isolated-on-white-background-png.png" name="Calculate Premium" />
                <Card link="/report-crop-loss" imageSrc="https://static.vecteezy.com/system/resources/previews/023/610/024/original/3d-illustration-grade-report-icon-on-transparent-background-suitable-to-use-in-education-learning-presentations-business-and-more-png.png" name="Report Crop Loss" />
                <Card link="https://mausam.imd.gov.in/bengaluru/" imageSrc="https://static.vecteezy.com/system/resources/previews/012/066/505/original/sunny-and-rainy-day-weather-forecast-icon-meteorological-sign-3d-render-png.png" name="Weather Data" />
            </div>
            <h3 className="row mt-4 text-center">Other Links</h3>
            <div className="row justify-content-center">
                <Card link="https://www.youtube.com/watch?v=h6iKMM95kg0" imageSrc="https://png.pngtree.com/png-vector/20220815/ourmid/pngtree-user-guide-book-png-image_6110929.png" name="Tutorials" />
                <Card link="/signupinsurance" imageSrc="https://www.freeiconspng.com/uploads/company-icon--desktop-business-icons--softiconsm-23.png" name="Insurance Company Directory" />
            </div>
            <br />
            <Footer />
        </div>
    );
}

export default Landing;
