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

export class User implements IUser{
    constructor(userid: string, firstname: string, lastname: string,
        email: string, gender: string, password: string, feed: string) {
        this.userId = userid;
        this.firstName = firstname;
        this.lastName = lastname;
        this.email = email;
        this.gender = gender;
        this.password = password;
        this.feed = feed;
        this.publicPostIds = new Array<string>();
        this.subscriberIds = new Array<string>();
        this.subscriptionIds = new Array<string>();
        this.blockedSubscriberIds = new Array<string>();

        console.log("hello from constructor");
    }

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

export interface IPost {
    postId: string; 
    contentId: string; 
    postTimeStamp: string;
    comments: string[]; 
    postContent: string; 
}

export class ApplicationState {
    static apiUrl: string = 'http://localhost:52176//api/';
    static url: string = 'http://localhost:52176/';
}

export class DataBaseQuery {
    saveUser(inputEmail: string, inputPassword: string) {
        return fetch(ApplicationState.apiUrl + 'User/',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ Email: inputEmail, Password: inputPassword })
            })
            .then(response => response.json()) // response.json() returns a promise});
    }

    subscribeUser(userToSubscribeTo: IUser, userToSubscribe: IUser) {
        if (userToSubscribe.subscriptionIds == null)
            userToSubscribe.subscriptionIds = new Array<string>();
        userToSubscribe.subscriptionIds.push(userToSubscribeTo.userId);
        if (userToSubscribeTo.subscriberIds == null)
            userToSubscribeTo.subscriberIds = new Array<string>();
        userToSubscribeTo.subscriberIds.push(userToSubscribe.userId);
        let subscribeToUpdateUrl = ApplicationState.apiUrl + "User/" + userToSubscribeTo.userId;
        let subscriberUpdateUrl = ApplicationState.apiUrl + "User/" + userToSubscribe.userId;
        return fetch(subscribeToUpdateUrl,
            {
                method: "PUT",
                body: JSON.stringify(userToSubscribeTo),
                headers: new Headers({ "Content-Type": "application/json" })
            }).then(() => fetch(subscriberUpdateUrl,
                {
                    method: "PUT",
                    body: JSON.stringify(userToSubscribe),
                    headers: new Headers({ "Content-Type": "application/json" })
                }))
            .catch(error => console.log("Error while updating user: ", error));
    }

    blockUser(userToBlock: IUser, userToBeBlocked: IUser) {
        if (userToBlock.blockedSubscriberIds == null)
            userToBlock.blockedSubscriberIds = new Array<string>();
        userToBlock.blockedSubscriberIds.push(userToBeBlocked.userId);
        let updateUrl = ApplicationState.apiUrl + "User/" + userToBlock.userId;
        return fetch(updateUrl,
                {
                    method: "PUT",
                    body: JSON.stringify(userToBlock),
                    headers: new Headers({ "Content-Type": "application/json" })
                })
            .catch(error => console.log("error while fetching user", error));
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

    getUserByEmail(email: string) {
        let url = `${ApplicationState.apiUrl}User/ByEmail/${email}`;
        console.log(`Fetching: ${url} ...`);
        return fetch(url)
            .then((response) => response.json())
            .catch(err => console.log("Error while fetching user:", err));
    }

    getPostsForUser(id: string[]) {
        let url = `${ApplicationState.apiUrl}/Post/`;
        console.log(`Fetching: ${url} ...`);
        return fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(id),
                })
            .then((response) => response.json())
            .catch(err => console.log("Error while fetching posts:", err));
    }

    getUserByCredentials(email: string, password: string) {
        let url = `${ApplicationState.apiUrl}User/ByCredentials/${email}/${password}`;
        console.log(`Fetching: ${url} ...`);
        return fetch(url)
            .then((response) => response.json())
            .catch(err => {
                throw err;
            });
    }

    login(email: string, password: string) {
        var userToLogin = this.getUserByCredentials(email, password)
            .catch(() => {
                throw "User wasn't found"
            });
        return userToLogin;
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

