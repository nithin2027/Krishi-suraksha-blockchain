// CropReportClause.jsx
import React, { useState } from 'react';
import Header from '../header/Header';
import Footer from '../footer/footer';
import './cropreportclauseform.css';

const CropReportClause = () => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAcceptChange = () => {
    setAcceptTerms(!acceptTerms);
    setErrorMessage('');
  };

  const handleReportClick = () => {
    if (acceptTerms) {
      // Implement logic for generating the crop report
      // Show an alert box instead of setting success message
      window.alert('Your request for claim settlements has been submitted successfully.');
    } else {
      // Display an error message if terms are not accepted
      setErrorMessage('Please accept the terms before claiming settlements.');
      setSuccessMessage('');
    }
  };
  

  return (
    <div className="crop-report-clause-form-container">
      <Header />
      <main>
        <h1>Crop Report Clause</h1>
        <form className="crop-report-clause-form">
          {/* Paragraph of instructions */}
          <p className="instruction-paragraph">
          i) The Insured shall upon the occurrence of any event giving rise or likely to give rise to a claim under this Policy: <br /><br />
a) In the event of theft lodge forthwith a complaint with the Police and shall take all
practicable steps to apprehend the guilty person or persons and to recover the
property lost.<br /><br />
b) Give immediate notice thereof to the Company and shall within Fourteen (14)
days thereafter furnish to the Company at his own expense detailed particulars of the amount of the loss or damage, together with such explanation and evidence to substantiate the claim as the Company may reasonably require.<br /><br />
ii) If the Insured or member of the Insured’s family comprising the Insured’s spouse and children shall die, notice of death shall be given by the legal representative(s) forthwith. All certificates information and evidence whether from a Medical Attendant or otherwise required by the Company shall be furnished at the expense of the Insured or his legal representatives and shall be in such form and of such nature as the Company may prescribe..<br /><br />
iii) The Insured shall upon the occurrence of any event giving rise or likely to give rise to a claim under the Policy give immediate notice thereof to the Company and shall forward to the Company forthwith every written notice or information of any verbal notice of claim and shall send to the Company any writ, summons or other legal process issued or commenced against the Insured and shall give all necessary information and assistance to enable the Company to settle or resist any claim or to institute proceedings. The Insured shall not incur any expenses in making good any claim without the prior consent of the Company and shall not negotiate, pay, settle, admit or repudiate any claim without such consent.<br />
          </p>

          {/* Acceptance Checkbox */}
          <div className="accept-terms">
          
            <label className="accept-label" htmlFor="acceptCheckbox">
              <input
                type="checkbox"
                id="acceptCheckbox"
                checked={acceptTerms}
                onChange={handleAcceptChange}
              />
              <h4>Accept the terms and conditions</h4>
            </label>
          </div>

          {/* Report Button */}
          <button type="button" onClick={handleReportClick}>Claim settlements</button>

          {/* Display Error Message */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {/* Display Success Message */}
          {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CropReportClause;
