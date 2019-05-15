import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import * as dbq from "../../databaseQueries";


@Component
export default class FetchWallComponent extends Vue {
    databaseQuery: dbq.DataBaseQuery = new dbq.DataBaseQuery(); 
    posts: dbq.IPost[]  = new Array<dbq.IPost>(); 
    currentUser: dbq.IUser = this.$store.state.user;  
    fetchPosts() {
        this.databaseQuery.getPostsForUser(this.currentUser.publicPostIds)
            .then((fetchedPosts: dbq.IPost[]) => this.posts = fetchedPosts); 
    }
    addComment() {
        console.log('It works!');
    }
    mounted() {
        this.fetchPosts();
    }
}