vm1 = new Vue({
    el: '#vueBlockUser',
    data: {
        email: '',
    }, // need to check if user already blocked?
    methods: {
        BlockUser() {
            let email = this.email;
            fetch('api/BlockedUsers/', {
                    method: 'POST',
                    body: JSON.stringify(email),
                    headers: new Headers({
                    'Content-Type': 'application/json'
                    })
                }).then(function(response) {
                    if (response.status !== 201) {
                        alert('An error was detected. Status code' + response.status);
                        return;
                    }
                    response.json().then(function() {
                            alert('Received request to block user');
                    })
                    .catch(function(err) {
                        alert('Error' + err);
                });

            })
        }
    }
});

vm2 = new Vue({
    el: '#vueBlockedUsers',
    data: {
        blockedusers: [{name: 'tester', email: 'test@test.com'}]
    },
    methods: {
        GetBlockedUsers() {
            fetch('api/User')
                .then(function (response) {
                    if (response.status !== 200) {
                        console.log('Error detected. Status Code: ' + response.status);
                        return;
                    }
                    response.json().then(function (blockedusers) {
                            vm2.blockedusers = blockedusers;
                        })
                        .catch(function (error) {
                            console.log('Fetch error :-S', error);
                        });
                });
        }
    }
});