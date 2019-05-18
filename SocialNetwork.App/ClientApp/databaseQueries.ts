export interface IUser {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    password: string;
    feed: string;
    groupFeedIds: string[];
    publicPostIds: string[];
    subscriberIds: string[];
    subscriptionIds: string[];
    blockedSubscriberIds: string[];
}

export interface ITextComment {
    text: string; 
    postId: string; 
    commentAuthorName: string[];

}

export interface IPost {
    postId: string; 
    contentId: string; 
    postTimeStamp: string;
    comments: IComment[]; 
    postContent: string;
    nameOfPoster: string;
}

export interface IComment {
    commentTimeStamp: string; 
    commentAuthorUserId: string; 
    text: string; 
    firstName: string;
    lastName: string;
}

export interface IGroupFeed {

    groupFeedId: string;

    groupFeedName: string;
    groupPostIds: string[];
    usersInGroupFeed: string[];
}

export interface ITextContent {
    text: string;
}



export interface ICreatePost {
    postContent: ITextContent;
    comments: Array<IComment>;
    nameOfPoster: string;
}

export class ApplicationState {
    static apiUrl: string = 'http://localhost:52135/api/';
    static url: string = 'http://localhost:52135/';
}

export class DataBaseQuery {
    createUser(user: IUser) {
        let bodyUser = JSON.stringify(user);
        let url = ApplicationState.apiUrl + 'User/';
        console.log(`Posting new user ${bodyUser} to ${url}`);
        return fetch(url,
                {
                    method: "POST",
                    body: bodyUser,
                    headers: new Headers({ "Content-Type": "application/json" }),
                })
            .then(response => response.json()); // response.json() returns a promise});
    }

    saveComment(thePost: IPost) {
        let url = ApplicationState.apiUrl + "Post/" + thePost.postId;
        let apibody = JSON.stringify((thePost));
        console.log(apibody); 
        console.log("Fetching... " + url);
        return fetch(url,
            {
                method: "PUT",
                body: JSON.stringify(thePost),
                headers: new Headers({ "Content-Type": "application/json" }),
            })
            .catch(err => console.log("Error while fetching user:", err));
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

    getPostForUser(id: string) {
        let url = `${ApplicationState.apiUrl}Post/${id}`;
        console.log(`Fetching: ${url} ...`);
        return fetch(url)
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

    getGroupFeed(id: string) {
        let url = `${ApplicationState.apiUrl}GroupFeed/${id}`;
        console.log(`Fetching: ${url} ...`);
        return fetch(url)
            .then((response) => response.json())
            .catch(err => console.log("Error while fetching user:", err));
    }

    createPost(post: ICreatePost) {
        let url = `${ApplicationState.apiUrl}Post/`;
        console.log(`Fetching: ${url} ...`);
        return fetch(url,
                {
                    method: "POST",
                    headers: new Headers({
                        'Accept': 'application/json',
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify(post)
                })
            .then((response) => response.json())
            .catch(err => console.log("Error while posting post:", err));
    }

    updateGroupFeed(id: string, groupfeed: IGroupFeed) {
        let url = `${ApplicationState.apiUrl}GroupFeed/${id}`;
        console.log(`Fetching: ${url} ...`);
        return fetch(url,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(groupfeed)
                })
            .then((response) => response.json())
            .catch(err => console.log("Error while putting GroupFeed:", err));
    }

    updateUser(id: string, user: IUser) {
        let url = `${ApplicationState.apiUrl}User/${id}`;
        console.log(`Fetching: ${url} ...`);
        return fetch(url,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                })
            .then((response) => response.json())
            .catch(err => console.log("Error while updating user:", err));
    }
    /*createTextContent(content: ITextContent) {
        let url = `${ApplicationState.apiUrl}TextContent/`;
    }*/
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

