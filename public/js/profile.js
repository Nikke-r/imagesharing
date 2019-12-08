const url = 'http://10.114.34.121/app';

const main = document.getElementsByClassName("main")[0];

const createProfile = async () => {
    try {
        const response = await fetch (url + "/user/session");
        const result = await response.json();

        main.innerHTML =
        `
        <div class="userProfile">
            <h1>${json.username}'s profile</h1>
            <h3>@${json.username}</h3>
            <h3>@${json.email}</h3>
        </div>
        `;
        model.style.display = "block";
        close();
    } catch (e) {
        console.log(e);
    }
};