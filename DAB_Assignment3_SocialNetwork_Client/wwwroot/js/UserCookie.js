var userId = -1; 
function getCookie() {
    let email = decodeURIComponent(document.cookie);
    return email; 
}

function deleteCookies() {
    let cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function saveUser(inputEmail, inputPassword) {
    fetch('/api/UserController/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Email: inputEmail, Password: inputPassword}),
        })
        .then(response => response.json()) // response.json() returns a promise
        .then((response) => {
            user = response; 
            console.log("You saved this item", response); //returns the new item along with its ID
        })
}

function getUser() {
    return userId; 
}