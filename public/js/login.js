const url = 'http://localhost:3000';
const forms = document.getElementsByClassName("forms")[0];

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    try {
        console.log('1');
        const data = serializeJson(loginForm);
        console.log('2');
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        console.log('3');
        const response = await fetch(url + "/auth/login", fetchOptions);
        const json = await response.json();
        console.log(json);
        if (!json.user) {
            alert(json.message);
        } else {
            sessionStorage.setItem('token', json.token);
            model.style.display = "none";
            window.location.replace("index.html")
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

