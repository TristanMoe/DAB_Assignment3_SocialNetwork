var applicationState = {
    data: {
        user: "",
        apiUrl: "https://localhost:44375/api/"
    },
    setUser(newUser) {
        console.log("user got set to", user);
        this.user = newUser;
    }
}

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
    fetch('https://localhost:44375/api/User/', {
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
