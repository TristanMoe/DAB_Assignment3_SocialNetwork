import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as dbq from "../../databaseQueries";
import IUser = dbq.IUser;

@Component
export default class BlockUser extends Vue {
    databaseQuery: dbq.DataBaseQuery = new dbq.DataBaseQuery();
    blockEmail: string = '';
    userToBeBlocked: IUser = {} as IUser;
    getUserToBeBlocked() {
        if (this.blockEmail === '' || this.blockEmail === '')
            return;
        this.databaseQuery.getUserByEmail(this.blockEmail)
            .then((fetcheduser: IUser) => this.userToBeBlocked = fetcheduser);
    }
    blockUser() {
        this.$store.state.user.blockedSubscriberIds = new Array();
        console.log("wtf is going on in here");
        this.databaseQuery.blockUser(this.$store.state.user, this.userToBeBlocked);
    }
    block() {
        this.getUserToBeBlocked();
        this.blockUser();
    }
}