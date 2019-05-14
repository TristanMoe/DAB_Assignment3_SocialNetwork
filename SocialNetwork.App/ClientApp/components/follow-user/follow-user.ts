import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import * as dbq from "../../databaseQueries";

@Component
export default class FetchDataComponent extends Vue {
    databaseQuery: dbq.DataBaseQuery = new dbq.DataBaseQuery();
    users: dbq.IUser[] = new Array<dbq.IUser>();
    fetchUsers() {
        this.databaseQuery.getAllUsers().then((fetchedUsers : dbq.IUser[])=> this.users = fetchedUsers);
    }
    followUser(id: string) {
        let self = this;
        let url = dbq.ApplicationState.apiUrl + "User/" + id;
        console.log(url);
        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log("The User Couldn't be found");
                        return;
                    }
                    response.json()
                        .then(jsonData => self.databaseQuery.subscribeUser(jsonData));
                })
            .catch(err => console.log("Error happened when fetching data: ", err));
    }
    mounted() {
        this.$nextTick(() => {
            this.fetchUsers();
        });
    }
}
