import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import * as dbq from "../../databaseQueries";
import ApplicationState = dbq.ApplicationState;

@Component
export default class FetchWallComponent extends Vue {
    databaseQuery: dbq.DataBaseQuery = new dbq.DataBaseQuery(); 
    fetchPosts() {
        
    }
    
}