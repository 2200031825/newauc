import React from 'react';
import logo from './images/logo.jpeg'
import { callApi, errorResponse, setSession } from './main';

const popupwindowstyle={width: '300px', height:'450px', background: 'white'}
const logostyle={width:'75px', height:'75px', left:'113px', position:'absolute', top:'10px'}
const logodiv={height:'100px'}
const space={height: '20px'}

function Login(){
    window.onload=function(){
        var login = document.getElementById('login');
        login.style.display = 'block';
    }

    function validate()
    {
        var T1=document.getElementById('T1');
        var T2=document.getElementById('T2');

        var url = "http://localhost:5000/login/signin";
        var data = JSON.stringify({
            emailid : T1.value,
            pwd : T2.value
        });
        callApi("POST", url, data, loginSuccess, errorResponse);
    }

    function loginSuccess(res)
    {
        var data = JSON.parse(res);
        if(data === 1)
        {
            var T1=document.getElementById('T1');
        
            setSession("sid", T1.value, (24 * 60));
            window.location.replace("/home");
        }
        else
            alert("Invalid Credentials!");
    }

    function registration(){
        var login = document.getElementById('login');
        var registration = document.getElementById('registration');
        var T1 = document.getElementById('T1');
        var T2 = document.getElementById('T2');
        T1.value = "";
        T2.value = "";
        login.style.display = 'none';
        registration.style.display = 'block';
    }

    function signup(){
        var RT1 = document.getElementById('RT1');
        var RT2 = document.getElementById('RT2');
        var RT3 = document.getElementById('RT3');
        var RT4 = document.getElementById('RT4');
        var RT5 = document.getElementById('RT5');
        RT1.style.border="";
        RT2.style.border="";
        RT3.style.border="";
        RT4.style.border="";
        RT5.style.border="";
        if(RT1.value === "")
        {
            RT1.style.border="1px solid red";
            RT1.focus();
            return;
        }
        if(RT2.value === "")
        {
            RT2.style.border="1px solid red";
            RT2.focus();
            return;
        }
        if(RT3.value === "")
        {
            RT3.style.border="1px solid red";
            RT3.focus();
            return;
        }
        if(RT4.value === "")
        {
            RT4.style.border="1px solid red";
            RT4.focus();
            return;
        }
        if(RT5.value === "")
        {
            RT5.style.border="1px solid red";
            RT5.focus();
            return;
        }

        var data = JSON.stringify({
            firstname : RT1.value,
            lastname : RT2.value,
            contactno : RT3.value,
            emailid : RT4.value,
            pwd : RT5.value
        });

        var url = "http://localhost:5000/registration/signup";
        callApi("POST", url, data, signupSuccess, errorResponse);

        //alert("Registered successfully...");
        RT1.value = "";
        RT2.value = "";
        RT3.value = "";
        RT4.value = "";
        RT5.value = "";

        var login = document.getElementById('login');
        var registration= document.getElementById('registration');
        registration.style.display = 'none';
        login.style.display = 'block';

    }

    //signupSuccess
    function signupSuccess(res)
    {
        var data = JSON.parse(res);
        alert(data);
    }

    return(
        <div className='fullheight'>
            <div id='loginheader' className='loginheader'>BIDMAR</div>
            <div id='logincontent'>
                <div id='login' className='popup'>
                    <div id='loginwindow' className='popupwindow' style={popupwindowstyle}>
                        <div id='logintxt'>Login</div>
                        <div id='logininnerwindow' className='innerwindow'>
                            <div style={logodiv}> <img src={logo} alt='' style={logostyle} /> </div>
                            <div>Username*</div>
                            <div> <input type='text' id='T1' className='textbox' autoComplete='off' /> </div>
                            <div style={space}></div>
                            <div>Password*</div>
                            <div> <input type='password' id='T2' className='textbox' /> </div>
                            <div style={space}></div>
                            <div> <button className='btn' onClick={validate} >Sign In</button> </div>
                            <div style={space}></div>
                            <div style={space}></div>
                            <div>New user? <label className='linklabel' onClick={registration} >Register here</label></div>
                        </div>
                    </div>    
                </div>
                <div id="registration" className='popup'>
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
                            <div> <button className='btn' onClick={signup} >Sign Up</button> </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='loginfooter'>Copyright @ BIDMAR. All rights reserved.</div>
        </div>
    );
}

export default Login;