import React from "react";
import './changepassword.css';
import { callApi, errorResponse, getSession } from "./main";

// const tblStyle = { "width": "100%" };

export function updatePassword() {
    var T1 = document.getElementById('T1');
    var T2 = document.getElementById('T2');
    var T3 = document.getElementById('T3');

    T1.style.border = "";
    T2.style.border = "";
    T3.style.border = "";
    if (T1.value === "") {
        T1.style.border = "1px solid red";
        T1.focus();
        return;
    }
    if (T2.value === "") {
        T2.style.border = "1px solid red";
        T2.focus();
        return;
    }
    if (T3.value === "") {
        T3.style.border = "1px solid red";
        T3.focus();
        return;
    }
    if (T2.value !== T3.value) {
        T3.value = "";
        alert("Password Mismatched");
        T2.focus();
        return;
    }

    var sid = getSession("sid");
    var data = JSON.stringify({
        emailid: sid,
        pwd: T1.value
    });

    var url = "http://localhost:5000/login/signin"
    callApi("POST", url, data, validateSuccess, errorResponse);
}

export function validateSuccess(res) {
    var data = JSON.parse(res);
    if (data === 0)
        alert("Invalid Credientials...");
    else {
        var url = "http://localhost:5000/cp/updatepwd";
        var T2 = document.getElementById('T2');
        var input = JSON.stringify({
            emailid: getSession("sid"),
            pwd: T2.value
        });
        callApi("POST", url, input, updateSuccess, errorResponse);
    }
}

export function updateSuccess(res) {
    var data = JSON.parse(res);
    alert(data);
}

class ChangePassword extends React.Component {
    constructor() {
        super();
        this.sid = getSession("sid");
        //alert(this.sid);
        if (this.sid === "")
            window.location.replace("/");
    }

    render() {
        return (
            <div className="fullheight">
                <div className="cpcontent">
                    <h3>Change Your Password</h3>
                    <div className="form-container">
                        <input type="password" id='T1' className="textbox" autoComplete="off" placeholder="Current Password*" />
                        <input type="password" id='T2' className="textbox" autoComplete="off" placeholder="New Password*" />
                        <input type="password" id='T3' className="textbox" autoComplete="off" placeholder="Re-type New Password*" />
                        <button className="button" onClick={updatePassword}>Update</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangePassword;
