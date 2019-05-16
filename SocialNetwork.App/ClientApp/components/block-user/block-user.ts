import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as dbq from "../../databaseQueries";
import IUser = dbq.IUser;

@Component
export default class BlockUser extends Vue {
    databaseQuery: dbq.DataBaseQuery = new dbq.DataBaseQuery();
    blockEmail: string = "";
    userToBlock: IUser = this.$store.state.user;
    blockUser() {
        let url = dbq.ApplicationState.apiUrl + "User/ByEmail/" + this.blockEmail;
        let self = this;
        console.log(url);
        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log("User to be blocked couldn't be found");
                        return;
                    }
                    response.json()
                        .then(jsonData => self.databaseQuery.blockUser(self.userToBlock as dbq.IUser, jsonData as dbq.IUser));
                })
            .catch(err => console.log("Error happened when fetching data: ", err));
    }
    block() {
        this.blockUser();
    }
}