'use strict';
const url = '';

const ul = document.querySelector('.main ul');
const main = document.getElementsByClassName("main")[0];
const forms = document.getElementsByClassName("forms")[0];

        forms.innerHTML =
        `
            <div class="form-wrapper">
            <form id="register-form" enctype="multipart/form-data">
            <input class="light-border" type="text" name="username" placeholder="Username" required>
            <input class="light-border" type="email" name="email" placeholder="Email" required>
            <input class="light-border" type="password" name="password" placeholder="Password" required>
            <button class="light-border" type="submit" name="submit">Register</button>
            </form>
            </div>   
        `;
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
            main.style.display = 'none';
});

