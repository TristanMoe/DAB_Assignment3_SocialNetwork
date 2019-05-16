import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as dbq from "../../databaseQueries";

@Component
export default class navmenu extends Vue {
    getCurrentUser() {
        return this.$store.getters.getUser;
    }
}
