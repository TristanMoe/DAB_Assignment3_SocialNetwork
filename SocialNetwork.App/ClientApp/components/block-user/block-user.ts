import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as dbq from "../../databaseQueries";
import IUser = dbq.IUser;
import User = dbq.User;

@Component
export default class BlockUser extends Vue {
    databaseQuery: dbq.DataBaseQuery = new dbq.DataBaseQuery();
    blockEmail: string = '';
    userToBeBlocked: IUser = new User("", "", "", "", "", "", "");
    userToBlock: IUser = this.$store.state.user;
    getUserToBeBlocked() {
        if (this.blockEmail === '' || this.blockEmail === '')
            return;
        this.databaseQuery.getUserByEmail(this.blockEmail)
            .then((fetcheduser: User) => this.userToBeBlocked = fetcheduser);
        console.log(this.userToBeBlocked.email);
    }
    blockUser() {
        console.log("wtf is going on in here");
        this.databaseQuery.blockUser(this.userToBlock, this.userToBeBlocked);
    }
    block() {
        this.getUserToBeBlocked();
        this.blockUser();
    }
}