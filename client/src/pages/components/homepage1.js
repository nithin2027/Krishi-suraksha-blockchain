import React from "react";
import Styles from "./homepage1.module.css";
import Link from "next/link";

// Define Card component inline
const Card = ({ link, imageSrc, name }) => {
  return (
    <div className={Styles.card} style={{ width: "200px", margin: "20px" }} onClick={() => window.location.href = link}>
      <img src={imageSrc} className={Styles.cardImage} alt={name} />
      <div className={Styles.cardBody}>
        <h5 className={Styles.cardTitle}>{name}</h5>
      </div>
    </div>
  );
};

const Homepage1 = () => {
  return (
    <div className={Styles.forhomeone}>
      <div className={Styles.landingContainer}>
          <marquee className="row mt-4 text-center" scrollamount="10" style={{ color: 'black' }}>🌱🌱🌱 Welcome to Krishi Suraksha 🌱🌱🌱</marquee>
          <h2  className="row mt-4 text-center" style={{ color: 'black' }}><b>Main Links</b></h2>
            {/* Card components */}
            <div className={Styles.row}>
              <Card link="/farmersignup" imageSrc="https://png.pngtree.com/png-clipart/20211219/original/pngtree-indian-farmer-yellow-wheat-cartoon-style-png-image_6966513.png" name="Farmer Corner" />
           
              <Card link="/report-crop-loss" imageSrc="https://static.vecteezy.com/system/resources/previews/023/610/024/original/3d-illustration-grade-report-icon-on-transparent-background-suitable-to-use-in-education-learning-presentations-business-and-more-png.png" name="Report Crop Loss" />
              <Card link="https://mausam.imd.gov.in/bengaluru/" imageSrc="https://static.vecteezy.com/system/resources/previews/012/066/505/original/sunny-and-rainy-day-weather-forecast-icon-meteorological-sign-3d-render-png.png" name="Weather Data" />
            </div>
          <h3 className="row mt-4 text-center" style={{ color: 'black' }}><b>Other Links</b></h3>
            {/* Card components */}
            <div className={Styles.row}>
              <Card link="https://www.youtube.com/watch?v=h6iKMM95kg0" imageSrc="https://png.pngtree.com/png-vector/20220815/ourmid/pngtree-user-guide-book-png-image_6110929.png" name="Tutorials" />
              <Card link="/companysignup" imageSrc="https://www.freeiconspng.com/uploads/company-icon--desktop-business-icons--softiconsm-23.png" name="Insurance Company Directory" />
            </div>
            </div>
    </div>
  );
};

export default Homepage1;
