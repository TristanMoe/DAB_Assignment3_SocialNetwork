
export interface IUser {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    password: string;
    feed: string;
    publicPostIds: string[];
    subscriberIds: string[];
    subscriptionIds: string[];
    blockedSubscriberIds: string[];
}

export class ApplicationState {
    static user: IUser;
    static apiUrl: string = 'http://localhost:56490/api/';
    static setUser(newUser: IUser) {
        this.user = newUser;
        console.log("user got set to", this.user);
    }
}

export class DataBaseQuery {
    saveUser(inputEmail: string, inputPassword: string) {
        fetch(ApplicationState.apiUrl + 'User/',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ Email: inputEmail, Password: inputPassword })
            })
            .then(response => response.json()) // response.json() returns a promise
            .then((response) => {
                ApplicationState.setUser(response);
                console.log("You saved this item", response); //returns the new item along with its ID
            });
    }

    subscribeUser(userToSubscribeTo: IUser, userToSubscribe : IUser) {
        userToSubscribe.subscriptionIds.push(userToSubscribeTo.userId);
        userToSubscribeTo.subscriberIds.push(userToSubscribe.userId);
        let updateUrl = ApplicationState.apiUrl + "User/" + userToSubscribeTo.userId;
        return fetch(updateUrl,
            {
                method: "PUT",
                body: JSON.stringify(userToSubscribeTo),
                headers: new Headers({ "Content-Type": "application/json" })
            })
            .catch(error => console.log("Error while updating user: ", error));
    }


    getAllUsers() {
        let url = ApplicationState.apiUrl + "User/";
        console.log(`Fetching: ${url} ...`);
        return fetch(url)
            .then(response => response.json())
            .catch(err => console.log("Error while fetching all users:", err));
    }

    getUserById(id: string) {
        let url = `${ApplicationState.apiUrl}User/${id}`;
        console.log(`Fetching: ${url} ...`);
        return fetch(url)
            .then((response) => response.json())
            .catch(err => console.log("Error while fetching user:", err));
    }

    getUserByCredentials(email: string, password: string) {
        let url = `${ApplicationState.apiUrl}User/ByCredentials/${email}/${password}`;
        console.log(`Fetching: ${url} ...`);
        return fetch(url)
            .then((response) => response.json())
            .catch(err => console.log("Error while fetching user:", err));
    }

    login(email: string, password: string) {
        return this.getUserByCredentials(email, password);
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

