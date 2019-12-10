const url = 'http://localhost:3000';

const forms = document.getElementsByClassName("forms")[0];
const topnav = document.getElementsByClassName("topnav")[0];

const userHasToken = () => {
    if (sessionStorage.getItem('token') != null) {
            topnav.innerHTML =
                `
                <div id="loggedIn">
                    <a onclick="logOut()">Logout</a>
                    <a href="index.html">Home</a>
                    <img id="logo" src="img/header.png" alt="logo">
                </div>
                `;

    } else {
        topnav.innerHTML =
            `
            <div id="notLoggedIn">
                <a href="index.html">Home</a>
                <img id="logo" src="img/header.png" alt="logo">
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
        sessionStorage.removeItem('id');
        location.reload();
    } catch (e) {
        console.log(e);
    }
};

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    try {
        const data = serializeJson(loginForm);
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(url + "/auth/login", fetchOptions);
        const json = await response.json();
        console.log(json);
        if (!json.user) {
            alert("Wrong username or password");
        } else {
            sessionStorage.setItem('token', json.token);
            sessionStorage.setItem('id', json.user.user_id);
            sessionStorage.setItem('admin', json.user.admin);
            userHasToken();
        }
    } catch (e) {
        console.log(e);
    }
});

const registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const data = serializeJson(registerForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    const response = await fetch(url + "/auth/register", fetchOptions);
    const json = await response.json();
    console.log(json);
    sessionStorage.setItem('token', json.token);
});

