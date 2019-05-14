var applicationState = {
    data: {
        user: "",
        apiUrl: "https://localhost:44375/api/"
    },
    setUser(newUser) {
        this.user = newUser;
        console.log("user got set to", this.user);
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
	fetch('https://localhost:44375/api/User/',
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ Email: inputEmail, Password: inputPassword })
			})
		.then(response => response.json()) // response.json() returns a promise
		.then((response) => {
			applicationState.setUser(response);
			console.log("You saved this item", response); //returns the new item along with its ID
		});
}

function subscribeUser(userToSubscribeTo) {
	applicationState.data.currentUser.put("subscriptionIds", userToSubscribeTo.userId);
	userToSubscribeTo.put("subscriberIds", applicationState.data.currentUser.userId);
	let updateUrl = applicationState.data.apiUrl + "User/" + userToSubscribeTo.userId;
	fetch(updateUrl,
			{
				method: "PUT",
				body: JSON.stringify(userToSubscribeTo),
				headers: new Headers({ "Content-Type": "application/json" })
			})
		.catch(error => console.log("Error while updating user: ", error)
			.then(response => console.log("Success: ", response)
			));
}


function getAllUsers() {
	let url = applicationState.data.apiUrl + "User/";
	console.log(`Fetching: ${url} ...`);
	return fetch(url)
		.then(response => response.json())
		.catch(err => console.log("Error while fetching all users:", err));
}

function getUserById(id) {
	let url = `${applicationState.data.apiUrl}User/${id}`;
	console.log(`Fetching: ${url} ...`);
	return fetch(url)
		.then((response) => response.json())
		.catch(err => console.log("Error while fetching user:", err));
}

function getUserByCredentials(email, password) {
	let url = `${applicationState.data.apiUrl}User/ByCredentials/${email}/${password}`;
	console.log(`Fetching: ${url} ...`);
	return fetch(url)
		.then((response) => response.json())
		.catch(err => console.log("Error while fetching user:", err));
}

function login(email, password) {
	return getUserByCredentials(email,password)
		.then((userToLogin) => applicationState.setUser(userToLogin))
		.catch(err => `Error happened when logging in: ${err}`);
}