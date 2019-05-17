import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as dbq from "../../databaseQueries";
import PostComponent from "../post/post";


@Component
export default class FeedComponent extends Vue {
    databaseQuery: dbq.DataBaseQuery = new dbq.DataBaseQuery(); 
    posts: dbq.IPost[] = new Array<dbq.IPost>(); 
    currentUser: dbq.IUser = this.$store.state.user;  

    mounted() {
        this.databaseQuery.getUserById(this.currentUser.userId)
            .then((user: dbq.IUser) => {
                for (var i = 0; i < user.subscriptionIds.length; i++) {
                    this.posts = this.databaseQuery.getAllPostsForUser(user);
                } 
            });
    }
}