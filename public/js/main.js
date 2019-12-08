'use strict';
const url = 'http://localhost:3000';

//const ul = document.querySelector('.main ul');
//const main = document.getElementsByClassName("main")[0];
//const forms = document.getElementsByClassName("forms")[0];
const topnav = document.getElementsByClassName("topnav")[0];

const userHasToken = async () => {
    if (sessionStorage.getItem('token') != null) {
            topnav.innerHTML =
                `
                <div id="profile">
                    <a href="profile.html">Profile</a>
                    <img id="logout" src="img/logout.png" alt="Logout icon" onclick="logOut()">
                </div>
                `;

    } else {
        topnav.innerHTML =
            `
            <div id="login">
                <a href="login.html">Login/Signup</a>
            </div>
        `;
    }
};
userHasToken();

const logOut = async () => {
    try {
        const fetchOptions = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            }
        };
        const response = await fetch (url + "/auth/logout", fetchOptions);
        const result = await response.json();
        sessionStorage.removeItem("token");
        window.location.replace("index.html")
    } catch (e) {
        console.log(e);
    }
};