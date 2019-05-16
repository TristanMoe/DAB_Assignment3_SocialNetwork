import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as dbq from "../../databaseQueries";

@Component
export default class Home extends Vue {
    inputEmail: string = '';
    inputPassword: string = '';
    error: string=  '';
    databaseQuery: dbq.DataBaseQuery = new dbq.DataBaseQuery();
    homeLogin() {
        if (this.inputEmail === '' || this.inputPassword === '')
            return;
        this.databaseQuery.login(this.inputEmail, this.inputPassword)
            .then((userToLogin) => {
                this.$store.commit('setUser',
                    {
                        newUser: userToLogin,
                    });
                this.$router.push('follow-user');
            })
            .catch(err => {
                console.log(`Error happened when logging in: ${err}`);
                this.error = err;
            });
    };
}
