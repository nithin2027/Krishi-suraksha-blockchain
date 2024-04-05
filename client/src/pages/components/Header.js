// Header.jsx
import React, { useState } from 'react';
import Styles from './Header.module.css';
import Link from "next/link";



const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);



    const handleLogout = () => {
        // Perform logout logic here (e.g., clear local storage, update state, etc.)
        setIsLoggedIn(false);
        // Redirect to home or login page if necessary
    };

    const handleSignInSuccess = () => {
        // Set isLoggedIn to true after successful sign-in
        setIsLoggedIn(true);
    };

    return (
        <div className={Styles.header}>
            <Link href="/" className={Styles.logoContainer}>
                <img src="logo.jpg" alt="Logo" className={Styles.logo} />
                <span className={Styles.appName} >Krishi Suraksha</span>
            </Link>
            <div className={Styles.authButtons}>
                {isLoggedIn ? (
                    <button className={Styles.logout} onClick={handleLogout}>Logout</button>
                ) : (
                    <>
                    <Link href="/farmersignup">
                        <button className={Styles.signup} >Sign Up</button>
                    </Link>
                    <Link href="/farmersignin">
                     <button className={Styles.login} >Login</button>
                    </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
