'use strict';
const url = 'http://10.114.32.155/app/';

const ul = document.querySelector('.main ul');
const topnav = document.getElementsByClassName("topnav")[0];
const imageModal = document.querySelector('#image-modal');
const modalImage = document.querySelector('#image-modal img');
const close = document.querySelector('#image-modal a');

const userHasToken = () => {
    if (sessionStorage.getItem('token') != null) {
            topnav.innerHTML =
                `
                <div id="loggedIn">
                    <a onclick="logOut()">Logout</a>
                    <a href="upload.html">Upload</a>
                    <img id="logo" src="img/header.png" alt="logo">
                </div>
                `;

    } else {
        topnav.innerHTML =
            `
            <div id="notLoggedIn">
                <a href="login.html">Login/Register</a>
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
        sessionStorage.clear();
        window.location.replace("index.html")
    } catch (e) {
        console.log(e);
    }
};

const createPosts = (posts) => {
    ul.innerHTML = '';

    //If there isn't any posts and the user isn't logged in
    if (posts.length === 0 && sessionStorage.getItem('token') === null){
        const a = document.createElement('a');
        const p = document.createElement('p');
        const li = document.createElement('li');
        a.href = url + '/login.html';
        a.innerHTML = 'here';
        p.innerHTML = 'No added pictures yet! Login or create an account and add a picture ';
        p.appendChild(a);
        li.appendChild(p);
        ul.appendChild(li);
    }

    //If there isn't any posts and the user is logged in
    if (posts.length === 0 && sessionStorage.getItem('token')){
        const a = document.createElement('a');
        const p = document.createElement('p');
        const li = document.createElement('li');
        a.href = url + '/profile.html';
        a.innerHTML = 'here';
        p.innerHTML = 'No added pictures yet! Be the first to upload a picture ';
        p.appendChild(a);
        li.appendChild(p);
        ul.appendChild(li);
    } else {
        posts.reverse().forEach((post) =>{
            const img = document.createElement('img');
            img.src = url + '/thumbnails/' + post.filename;
            img.alt = post.description;
            img.classList.add('resp');

            img.addEventListener('click', () => {
            modalImage.src = url + '/' + post.filename;
            imageModal.classList.toggle('hide')
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

            //Create Like/Dislike button
            const likeButton = document.createElement('button');

            //Create function that removes the like from the db and change the eventlistener
            const dislike = async () => {
                const fetchOptions = {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                    }
                };

                try {
                    const response = await fetch(url + '/post/likes/' + post.post_id, fetchOptions);
                    const json = await response.json();
                    console.log(json);
                    getLikes();
                    likeButton.removeEventListener('click', dislike);
                    likeButton.addEventListener('click', addLike);
                } catch (e) {
                    console.log(e);
                }
            };

            //Create function that adds the like from the db and change the eventlistener
            const addLike = async () => {
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
                    getLikes();
                    likeButton.removeEventListener('click', addLike);
                    likeButton.addEventListener('click', dislike);
                } catch (e) {
                    console.log(e);
                }
            };

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
                    likes.innerHTML = 'Likes: ' + json.likes[0].likes;

                    //If there isn't any likes add the addLike function as an eventlistener to a likebutton
                    if (json.likes[0].likes === 0){
                        likeButton.innerHTML = 'Like';
                        likeButton.addEventListener('click', addLike);
                    }

                    //Check if current use have liked the post and set an eventlistener to likebutton
                    for (let i = 0; i < json.users.length; i++){
                        if (sessionStorage.getItem('id') === json.users[i].user_id.toString()){
                            likeButton.addEventListener('click', dislike);
                            likeButton.innerHTML = 'Dislike';
                            break;
                        } else {
                            likeButton.addEventListener('click', addLike);
                            likeButton.innerHTML = 'Like';
                        }
                    }
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
            if (sessionStorage.getItem('id') === post.user_id.toString() || sessionStorage.getItem('admin') === '1'){
                li.appendChild(delButton);
            }
            ul.appendChild(li);
        });
    }


};

close.addEventListener('click', (evt) => {
  evt.preventDefault();
  imageModal.classList.toggle('hide');
});

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
