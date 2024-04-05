//frontend/src/components/Client.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from './landingPage/Landing';
import SigninFarmer from './signin/signinfarmer';
import SignupFarmer from './signup/signupfarmer';
import PremiumCalculator from './premiumcalculator/PremiumCalculator';
import CropReportClause from './reportclause/CropReportClause';
import SignupInsurance from './signup/signupinsurance';
import SigninInsurance from "./signin/signininsurance";
import RegCropInsurance from "./registercropinsurance/RegCropInsurance";
import PolicyDetails from "./insurancepolicydetails/PolicyDetails";
import Logout from "./logout";

function Client() {
    return <div>
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path='/signupfarmer' element={<SignupFarmer />} />
                <Route path='/signinfarmer' element={<SigninFarmer />} />
                <Route path='/calculate-premium' element={<PremiumCalculator />} />
                <Route path='/farmer-corner' element={<SignupFarmer />} />
                <Route path='/report-crop-loss' element={<CropReportClause/>} />
                {/* <Route path='/weather-data' element={} />
                <Route path='/tutorials' element={} /> */}
                <Route path='/signupinsurance' element={<SignupInsurance/>} />
                <Route path='/signininsurance' element={<SigninInsurance/>} />
                <Route path='/policydetails' element={<PolicyDetails/>} />
                <Route path='/registerpolicy' element={<RegCropInsurance/>} />  
                <Route path='/logout' element={<Logout/>} />  
            </Routes>
        </Router>
    </div>
}

export default Client;