import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as dbq from "../../databaseQueries";

@Component
export default class SignUp extends Vue {
    inputEmail: string = '';
    inputPassword: string = '';
    inputFirstName: string = '';
    inputLastName: string = '';
    inputGender: string = '';
    error: string=  '';
    databaseQuery: dbq.DataBaseQuery = new dbq.DataBaseQuery();
    signUp() {
        if (this.inputEmail === '' || this.inputPassword === '') {
            this.error = 'You need to enter an email and a password';
            return;
        }
        this.databaseQuery.getUserByEmail(this.inputEmail).then(u => {
            if (u !== undefined) {
                throw 'The email is already in use';
            }
        })
        .then(() => {
            let user = {
                email: this.inputEmail,
                password: this.inputPassword,
                firstName: this.inputFirstName,
                lastName: this.inputLastName,
                gender: this.inputGender
            };
            this.databaseQuery.createUser(user as dbq.IUser)
                .then(() => {
                    this.$router.push('/');
                })
                .catch(err => {
                    console.log(`Error happened when logging in: ${err}`);
                    this.error = err;
                });
        })
        .catch(err => this.error = err);
    };
}
