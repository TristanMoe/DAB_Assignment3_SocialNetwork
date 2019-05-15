
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import * as dbq from "../../databaseQueries";
import IUser = dbq.IUser;

@Component
export default class AccountComponent extends Vue{

    
        user: IUser = dbq.ApplicationState.user
       

}