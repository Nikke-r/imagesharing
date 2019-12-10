const url = 'http://10.114.32.155/app/';

const main = document.getElementsByClassName("main")[0];
const forms = document.getElementsByClassName('forms')[0];

const createProfile = async () => {
    try {
        const response = await fetch (url + "/user/session");
        const result = await response.json();

    } catch (e) {
        console.log(e);
    }
};


    forms.innerHTML =
        `
                <div class="form-wrapper">
                <h3>Add post</h3>
                <form class="light-border"
                      enctype="multipart/form-data"
                      id="add-post-form">
                    <input class="light-border" type="text" name="description" placeholder="Description">
                    <input class="light-border"
                           type="file"
                           name="post"
                           accept="image/*"
                           placeholder="Choose file"
                           required>
                    <button class="light-border" type="submit">Upload</button>
                </form>
            </div>
            `;

    const postForm = document.getElementById('add-post-form');


    postForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const fd = new FormData(postForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: fd,
    };
    const response = await fetch(url + '/post', fetchOptions);
    const json = await response.json();
    console.log('add response', json);
});
