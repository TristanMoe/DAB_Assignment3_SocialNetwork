import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as dbq from "../../databaseQueries";

@Component
export default class navmenu extends Vue {
    currentUser: dbq.IUser = this.$store.state.user;
}
