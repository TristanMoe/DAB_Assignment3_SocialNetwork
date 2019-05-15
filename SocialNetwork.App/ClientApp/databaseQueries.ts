﻿export interface IUser {
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
    static apiUrl: string = 'http://localhost:56490/api/';
    static url: string = 'http://localhost:56490/';
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

