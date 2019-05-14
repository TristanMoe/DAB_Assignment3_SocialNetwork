function getUser(id) {
    fetch('https://localhost:44375/api/User/' + id).then(function (response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
        };
    });
    response.json().then(function (user) {
        return user;
    });
}
