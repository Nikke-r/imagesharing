'use strict';
const url = 'http://localhost:3000';

const ul = document.querySelector('.main ul');
//const main = document.getElementsByClassName("main")[0];
//const forms = document.getElementsByClassName("forms")[0];
const topnav = document.getElementsByClassName("topnav")[0];

const userHasToken = () => {
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
        sessionStorage.removeItem('id');
        window.location.replace("index.html")
    } catch (e) {
        console.log(e);
    }
};

const createPosts = (posts) => {
    ul.innerHTML = '';

    console.log(posts);

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
                getPosts();
                // TODO get a single post
            } catch(e){
                console.log('error:' + e);
            }
        });

        const likeButton = document.createElement('button');
        likeButton.innerHTML = 'Like';
        likeButton.addEventListener('click', async () => {
           const fetchOptions = {
               method: 'POST',
               headers: {
                   'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
               }
           };

           try {
               const response = await fetch(url + '/post/likes/' + post.post_id, fetchOptions);
               const json = await response.json();
               console.log(json);
           } catch (e) {
               console.log(e);
           }
        });

        //Create 'Likes' element for the page
        const likes = document.createElement('p');

        //Create a function that get the likes count for the post from the server
        const getLikes = async () => {
          const fetchOptions = {
              method: 'GET',
              headers: {
                  'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
              }
          };
          
          try {
              const response = await fetch(url + '/post/likes/' + post.post_id, fetchOptions);
              const json = await response.json();
              likes.innerHTML = 'Likes: ' + json[0].likes;
          } catch (e) {
              console.log(e);
          }
        };

        getLikes();

        const li = document.createElement('li');
        li.classList.add('light-border');

        li.appendChild(h2);
        li.appendChild(figure);
        li.appendChild(p);
        li.appendChild(likes);
        if (sessionStorage.getItem('token')) {
            li.appendChild(likeButton);
        }
        if (sessionStorage.getItem('id') == post.user_id){
            li.appendChild(delButton);
        }
        ul.appendChild(li);
    });
};

const getPosts = async () => {
    try {
        const response = await fetch(url + '/post');
        const posts = await response.json();
        createPosts(posts);
    } catch (e) {
        console.log(e);
    }
};

getPosts();