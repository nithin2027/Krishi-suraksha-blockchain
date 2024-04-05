import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/footer';
import Styles from './signupform.module.css';

const SignupFarmer = () => {

  
  const initialFormData = {
    fullName: '',
    age: '',
    farmerType: '',
    mobileNumber: '',
    gender: '',
    state: '',
    district: '',
    address: '',
    pincode: '',
    farmerPassword: '',
    confirmPassword: '',
    bankName: '',
    ifsc: '',
    branchName: '',
    accountNumber: '',
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [formErrors, setFormErrors] = useState({});
  const [indianStates, setIndianStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const fetchDummyData = () => {
    const states = [
      'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
      'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
      'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
      'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ];

    const districtData = {
      'Andhra Pradesh': ['Srikakulam', 'Parvathipuram', 'Manyam', 'Vizianagaram', 'Visakhapatnam', 'Alluri Sitharama Raju', 'Anakapalli', 'Kakinada', 'East Godavari', 'Dr. B. R. Ambedkar Konaseema', 'Eluru', 'West Godavari', 'NTR', 'Krishna', 'Palnadu', 'Guntur', 'Bapatla', 'Prakasam', 'Sri Potti Sriramulu Nellore', 'Kurnool', 'Nandyal', 'Anantapur', 'Sri Sathya Sai', 'YSR', 'Annamayya', 'Tirupati', 'Chittoor'],
      'Arunachal Pradesh': ['Tawang', 'West Kameng', 'East Kameng', 'Papum Pare', 'Kurung Kumey', 'Kra Daadi', 'Lower Subansiri', 'Upper Subansiri', 'West Siang', 'East Siang', 'Siang', 'Upper Siang', 'Lower Siang', 'Lower Dibang Valley', 'Dibang Valley', 'Anjaw', 'Lohit', 'Namsai', 'Changlang', 'Tirap', 'Longding'],
      'Assam': ['Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Dima Hasao', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'],
      'Bihar': ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran'],
      'Chhattisgarh': ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Kanker', 'Kondagaon', 'Korba', 'Koriya', 'Mahasamund', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sukma', 'Surajpur', 'Surguja'],
      'Goa': ['North Goa', 'South Goa'],
      'Gujarat': ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'],
      'Haryana': ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'],
      'Himachal Pradesh': ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'],
      'Jharkhand': ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahibganj', 'Seraikela Kharsawan', 'Simdega', 'West Singhbhum'],
      'Karnataka': ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagar', 'Chikkaballapur', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir'],
      'Kerala': ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'],
      'Madhya Pradesh': ['Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha'],
      'Maharashtra': ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'],
      'Manipur': ['Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul'],
      'Meghalaya': ['East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills'],
      'Mizoram': ['Aizawl', 'Champhai', 'Hnahthial', 'Khawzawl', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha', 'Saitual', 'Serchhip'],
      'Nagaland': ['Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Peren', 'Phek', 'Tuensang', 'Wokha', 'Zunheboto'],
      'Odisha': ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh'],
      'Punjab': ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Firozpur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Muktsar', 'Pathankot', 'Patiala', 'Rupnagar', 'Sahibzada Ajit Singh Nagar', 'Sangrur', 'Shaheed Bhagat Singh Nagar', 'Sri Muktsar Sahib', 'Tarn Taran'],
      'Rajasthan': ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur'],
      'Sikkim': ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim'],
      'Tamil Nadu': ['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'],
      'Telangana': ['Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 'Komaram Bheem', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal Rural', 'Warangal Urban', 'Yadadri Bhuvanagiri'],
      'Tripura': ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura'],
      'Uttar Pradesh': ['Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddh Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kheri', 'Kushinagar', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shrawasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'],
      'Uttarakhand': ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'],
      'West Bengal': ['Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur']
    };

    setIndianStates(states);
    setDistricts(districtData);
  };

  useEffect(() => {
    fetchDummyData();
  }, []);

  const validateForm = () => {
    const errors = {};


    if (formData.farmerPassword !== '') {
      if (formData.farmerPassword.length < 6 || !/[a-z]/.test(formData.farmerPassword) || !/[A-Z]/.test(formData.farmerPassword) || !/\d/.test(formData.farmerPassword)) {
        errors.farmerPassword = 'Password must be at least 6 characters long and contain 1 uppercase, 1 lowercase letter, and 1 number';
      }
    } else {
      errors.farmerPassword= 'This field is required';
    }

    if (formData.confirmPassword !== '') {
      if (formData.confirmPassword !== formData.farmerPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    } else {
      errors.confirmPassword = 'This field is required';
    }
    for (const key in formData) {
      if (formData[key] === '') {
        errors[key] = 'This field is required';
      }
    }

    if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
      errors.fullName = 'Invalid full name format';
    }

    const age = parseInt(formData.age);
    if (isNaN(age) || age < 18) {
      errors.age = 'Not eligible';
    } else if (age > 130) {
      errors.age = 'Invalid age';
    }

    if (!/^[0-9]+$/.test(formData.mobileNumber) || formData.mobileNumber.length !== 10) {
      errors.mobileNumber = 'Invalid mobile number format';
    }

    if (!indianStates.includes(formData.state)) {
      errors.state = 'Please select a valid state';
    }

    if (!districts[formData.state]?.includes(formData.district)) {
      errors.district = 'Please select a valid district';
    }

    const pincode = parseInt(formData.pincode);
    if (isNaN(pincode) || pincode < 110000 || pincode > 999999) {
      errors.pincode = 'Invalid pincode';
    }



    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc)) {
      errors.ifsc = 'Invalid IFSC code';
    }

    if (!/^[0-9]{11,16}$/.test(formData.accountNumber)) {
      errors.accountNumber = 'Invalid account number';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (['age', 'mobileNumber', 'accountNumber', 'pincode'].includes(name) && !/^[0-9]*$/.test(value)) {
      return;
    }

    // Enforce character limit for mobileNumber (10 digits)
    if (name === 'mobileNumber' && value.length > 10) {
      return;
    }

    if (name === 'age' && value.length > 3) {
      return;
    }

    if (name === 'pincode' && value.length > 6) {
      return;
    }

    if (name === 'accountNumber' && value.length > 11) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'state') {
      setFormData((prevData) => ({
        ...prevData,
        district: '',
      }));
    }
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
        const response = await axios.post('http://localhost:8080/farmersignup', formData);
        if (response.status === 201) {
          alert('Farmer has been successfully registered');
          // Reset the form after successful submission
          setFormData({ ...initialFormData });
          setFormErrors({});
          navigate('/signinfarmer');
        } else if (response.status === 400 && response.data.message === "Failed to register farmer. Please try again.") {
          alert('Failed to register farmer. Please try again.');
        } else {
          alert('Farmer with this mobile number already exists');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Farmer already exists.');
      }
    } else {
      console.log('Form validation failed');
    }
  };

  const handleSigninClick = () => {
    window.location.href = '/farmersignin';
  }
  return (
    <div className={Styles.parentClas}>
    <div className={Styles.signupFormContainer}>
      <Header />
      <main>
        <div className={Styles.card}>
        <h1><center>Registration for Farmers</center></h1>
        <form onSubmit={handleSubmit}>

          {/* Basic Details */}
          <h2>Basic Details</h2>
          <div className={Styles.form_row}>
            <div className={Styles.formGroup}>
              <label className={Styles.lable}>Full Name:</label>
              <input
                className={Styles.input}
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              {displayError('fullName')}
            </div>
            <div className={Styles.formGroup}>
              <label className={Styles.lable}>Age:</label>
              <input
                className={Styles.input}
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
              {displayError('age')}
            </div>
            <div className={Styles.formGroup}>
              <label className={Styles.lable}>Mobile Number:</label>
              <input
                className={Styles.input}
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              {displayError('mobileNumber')}
            </div>
          </div>

          <div className={Styles.formRow}>
            <div className={Styles.formGroup}>
              <label className={Styles.lable}>Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
              {displayError('gender')}
            </div>

            <div className={Styles.formGroup}>
              <label className={Styles.lable}>Farmer Type:</label>
              <select
                name="farmerType"
                value={formData.farmerType}
                onChange={handleChange}
              >
                <option value=""><center>Select Farmer Type</center></option>
                <option value="MARGINAL FARMERS">MARGINAL FARMERS</option>
                <option value="SMALL FARMERS">SMALL FARMERS</option>
                <option value="SEMI-MEDIUM FARMERS">SEMI-MEDIUM FARMERS</option>
                <option value="MEDIUM FARMERS">MEDIUM FARMERS</option>
                <option value="LARGE FARMERS">LARGE FARMERS</option>
              </select>
              {displayError('farmerType')}
            </div>
          </div>

          {/* Residential Details */}
          <h2>Residential Details</h2>
          <div className={Styles.formRow}>
            <div className={Styles.formGroup}>
              <label className={Styles.lable}>State:</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                {indianStates.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
              {displayError('state')}
            </div>
            <div className={Styles.formGroup}>
              <label className={Styles.lable}>District:</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
              >
                <option value="">Select District</option>
                {districts[formData.state]?.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))}
              </select>
              {displayError('district')}
            </div>
          </div>
          <div className={Styles.formRow}>
            <div className={Styles.formGroup}>
              <label className={Styles.lable}>Address:</label>
              <input
                className={Styles.input}
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              {displayError('address')}
            </div>
          </div>
          <div className={Styles.formRow}>
            <div className={Styles.formGroup}>
              <label className={Styles.lable}>Pincode:</label>
              <input
                className={Styles.input}
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
              {displayError('pincode')}
            </div>
          </div>

          {/* Create Password */}
          <h2>Create Password</h2>
          <div className={Styles.formRow}>
            <div className={Styles.formGroup}>
              <label className={Styles.lable}>Password:</label>
              <input
                className={Styles.input}
                type="password"
                name="farmerPassword"
                value={formData.upiId}
                onChange={handleChange}
              />
              {displayError('farmerPassword')}
            </div>
            <div className={Styles.formGroup}>
              <label className={Styles.lable}>Confirm Password:</label>
              <input
                className={Styles.input}
                type="password"
                name="confirmPassword"
                value={formData.upiId}
                onChange={handleChange}
              />
              {displayError('confirmPassword')}
            </div>
          </div>

          {/* Bank Details */}
          <h2>Bank Details</h2>
          <div className={Styles.formRow}>
            <div className={Styles.formGroup}>
              <label className={Styles.lable}>Bank Name:</label>
              <input
                className={Styles.input}
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
              />
              {displayError('bankName')}
            </div>
            <div className={Styles.formGroup}>
              <label className={Styles.lable}>IFSC:</label>
              <input
                className={Styles.input}
                type="text"
                name="ifsc"
                value={formData.ifsc}
                onChange={handleChange}
              />
              {displayError('ifsc')}
            </div>
          </div>
          <div className={Styles.formRow}>
            <div className={Styles.formGroup}>
              <label className={Styles.lable}>Branch Name:</label>
              <input
                className={Styles.input}
                type="text"
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
              />
              {displayError('branchName')}
            </div>
            <div className={Styles.formGroup}>
              <label className={Styles.lable}>Account Number:</label>
              <input
                className={Styles.input}
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
              />
              {displayError('accountNumber')}
            </div>
          </div>

          <center><button className={Styles.button} type="submit">Create User</button></center>
          <p>Already a user? <span onClick={handleSigninClick} style={{ cursor: 'pointer', color: 'blue' }}>Sign in</span></p>
        </form>
      </div>
      </main>
    </div>
                  
      <Footer />
    </div>
  );
};

export default SignupFarmer;
