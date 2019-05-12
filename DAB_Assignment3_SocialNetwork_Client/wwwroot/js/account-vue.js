var data = {
    email: '',
    name: '',
    gender: '',
    age: 0
}

vm = new Vue({
    el: '#vueAccount',
    data: { data
},
methods: {
    GetAccountInformation() {
        fetch('.api/Account/Information')
            .then(function(response) {
                if (response.status !== 200) {
                    console.log('Error detected. Status Code: ' + response.status);
                    return;
                }
                response.json().then(function(information) {
                    vm.data = information;
                })
                .catch(function(error) {
                    console.log('Fetch error :-S', error);
                });
            });
        }
    }
});