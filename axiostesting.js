import React, { useState } from 'react';
import logo from './images/logo.jpeg';
import { callApi, errorResponse, setSession } from './main';

// Define styles for popup window, logo, and spacing
const popupwindowstyle = { width: '300px', height: '450px', background: 'white' };
const logostyle = { width: '75px', height: '75px', left: '113px', position: 'absolute', top: '10px' };
const logodiv = { height: '100px' };
const space = { height: '20px' };

function Login() {
    // State variables for email, password, and bid amount
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bidAmount, setBidAmount] = useState('');

    // Handlers for input changes
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleBidAmountChange = (event) => {
        setBidAmount(event.target.value);
    };

    // Function to validate and sign in
    function validate() {
        const url = "http://localhost:5000/login/signin";
        const data = JSON.stringify({
            emailid: email,
            pwd: password
        });
        callApi("POST", url, data, loginSuccess, errorResponse);
    }

    function loginSuccess(res) {
        const data = JSON.parse(res);
        if (data === 1) {
            setSession("sid", email, 24 * 60); // Set session for 24 hours
            window.location.replace("/home");
        } else {
            alert("Invalid Credentials!");
        }
    }

    // Function to show the registration form
    function registration() {
        document.getElementById('login').style.display = 'none';
        document.getElementById('registration').style.display = 'block';
    }

    // Function to sign up a new user
    function signup() {
        const RT1 = document.getElementById('RT1');
        const RT2 = document.getElementById('RT2');
        const RT3 = document.getElementById('RT3');
        const RT4 = document.getElementById('RT4');
        const RT5 = document.getElementById('RT5');

        // Reset border styles
        [RT1, RT2, RT3, RT4, RT5].forEach((elem) => {
            elem.style.border = "";
        });

        // Check if all required fields are filled and if email contains "@"
        const fields = [
            { elem: RT1, name: 'First Name' },
            { elem: RT2, name: 'Last Name' },
            { elem: RT3, name: 'Contact Number' },
            { elem: RT4, name: 'Email ID', validator: (value) => value.includes("@") },
            { elem: RT5, name: 'Password' },
        ];

        for (const field of fields) {
            if (!field.elem.value || (field.validator && !field.validator(field.elem.value))) {
                field.elem.style.border = "1px solid red";
                field.elem.focus();
                return;
            }
        }

        // Prepare data for registration
        const data = JSON.stringify({
            firstname: RT1.value,
            lastname: RT2.value,
            contactno: RT3.value,
            emailid: RT4.value,
            pwd: RT5.value,
        });

        // Call API to register
        const url = "http://localhost:5000/registration/signup";
        callApi("POST", url, data, signupSuccess, errorResponse);
    }

    function signupSuccess(res) {
        const data = JSON.parse(res);
        if (data === "User already registered") {
            alert("User is already registered.");
        } else if (data === "Registration successful") {
            alert("Registered successfully!");
            document.getElementById('registration').style.display = 'none';
            document.getElementById('login').style.display = 'block';
        } else {
            alert("An error occurred while registering.");
        }
    }

    // Function to place a bid
    function placeBid() {
        if (!bidAmount || isNaN(bidAmount)) {
            alert("Please enter a valid bid amount.");
            return;
        }
        alert("Bid placed successfully!");
        setBidAmount(''); // Reset bid amount after successful bid
    }

    return (
        <div className='fullheight'>
            <div id='loginheader' className='loginheader'>BIDMAR</div>
            <div id='logincontent'>
                {/* Login Popup */}
                <div id='login' className='popup'>
                    <div id='loginwindow' className='popupwindow' style={popupwindowstyle}>
                        <div id='logintxt'>Login</div>
                        <div id='logininnerwindow' className='innerwindow'>
                            <div style={logodiv}> <img src={logo} alt='' style={logostyle} /> </div>
                            <div>Username*</div>
                            <div> <input type='text' id='T1' className='textbox' autoComplete='off' onChange={handleEmailChange} /> </div>
                            <div style={space}></div>
                            <div>Password*</div>
                            <div> <input type='password' id='T2' className='textbox' onChange={handlePasswordChange} /> </div>
                            <div style={space}></div>
                            <div> <button className='btn' onClick={validate}>Sign In</button> </div>
                            <div style={space}></div>
                            <div>New user? <label className='linklabel' onClick={registration}>Register here</label></div>
                        </div>
                    </div>
                </div>

                {/* Registration Popup */}
                <div id='registration' className='popup' style={{ display: 'none' }}>
                    <div id='registrationwindow' className='popupwindow' style={popupwindowstyle}>
                        <div id='regtxt'>New Registration</div>
                        <div id='reginnerwindow' className='innerwindow'>
                            <div>First Name*</div>
                            <div> <input type='text' id='RT1' className='textbox' autoComplete='off' /> </div>
                            <div style={space}></div>
                            <div>Last Name*</div>
                            <div> <input type='text' id='RT2' className='textbox' autoComplete='off' /> </div>
                            <div style={space}></div>
                            <div>Contact Number*</div>
                            <div> <input type='text' id='RT3' className='textbox' autoComplete='off' /> </div>
                            <div style={space}></div>
                            <div>Email ID*</div>
                            <div> <input type='text' id='RT4' className='textbox' autoComplete='off' /> </div>
                            <div style={space}></div>
                            <div>Password*</div>
                            <div> <input type='password' id='RT5' className='textbox' autoComplete='off' /> </div>
                            <div style={space}></div>
                            <div> <button className='btn' onClick={signup}>Sign Up</button> </div>
                        </div>
                    </div>
                </div>

                {/* Place Bid Popup */}
                <div id='placeBid' className='popup'>
                    <div id='placeBidWindow' className='popupwindow' style={popupwindowstyle}>
                        <div id='placeBidTxt'>Place Bid</div>
                        <div id='placeBidInnerWindow' className='innerwindow'>
                            <div>Enter Bid Amount*</div>
                            <div> <input type='number' id='bidAmount' className='textbox' autoComplete='off' value={bidAmount} onChange={handleBidAmountChange} /> </div>
                            <div style={space}></div>
                            <div> <button className='btn' onClick={placeBid}>Place Bid</button> </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='loginfooter'>Copyright @ BIDMAR. All rights reserved.</div>
        </div>
    );
}

export default Login;
