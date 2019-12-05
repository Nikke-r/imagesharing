'use strict';
const url = '';

const ul = document.querySelector('.main ul');
const main = document.getElementsByClassName("main")[0];
const forms = document.getElementsByClassName("forms")[0];
const image = document.querySelector('img');

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

        const createPosts = (posts) => {
            ul.innerHTML = '';
            posts.forEach((post) =>{
                const img = document.createElement('img');
                img.src = url + '/thumbnails/' + post.filename;
                img.alt = post.description;
                img.classList.add('resp');

                img.addEventListener('click', () => {
                    image.src = url + '/' + post.filename;
                });

                const figure = document.createElement('figure').appendChild(img);

                const h2 = document.createElement('h2');
                h2.innerHTML = post.username;

                const p = document.createElement('p');
                p.innerHTML = post.description;



                const delButton = document.createElement('button');
                delButton.innerHTML = 'Delete';
                delButton.addEventListener('click', async () => {
                    const fetchOptions = {
                        method: 'DELETE',
                        headers: {
                            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                        }
                    };
                    try {
                        const response = await fetch(url + '/post/' + post.post_id, fetchOptions);
                        const json = await response.json();
                        console.log('delete: ', json);
                        // TODO get a single post
                    } catch(e){
                        console.log('error:' + e);
                    }

                    const li = document.createElement('li');
                    li.classList.add('light-border');

                    li.appendChild(h2);
                    li.appendChild(figure);
                    li.appendChild(p);
                    //todo lisää nappula tokeni validityn mukaan.
                    ul.appendChild(li);

                })



            });

        };
        
        

