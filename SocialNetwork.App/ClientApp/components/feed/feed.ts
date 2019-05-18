import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as dbq from "../../databaseQueries";
import PostComponent from "../post/post";


@Component({
    name: 'feed',
    components: {
        PostComponent
    }
})
export default class FeedComponent extends Vue {
    databaseQuery: dbq.DataBaseQuery = new dbq.DataBaseQuery(); 
    posts: dbq.IPost[] = new Array<dbq.IPost>(); 
    currentUser: dbq.IUser = this.$store.state.user;  
    get allPosts() {
        return this.posts as dbq.IPost[];
    }
    mounted() {
        this.databaseQuery.getUserById(this.currentUser.userId)
            .then((user: dbq.IUser) => {
                for (var i = 0; i < user.subscriptionIds.length; i++) {
                    this.databaseQuery.getUserById(user.subscriptionIds[i])
                        .then((sub: dbq.IUser) => {
                            for (var j = 0; j < sub.publicPostIds.length; j++) {
                                this.databaseQuery.getPostForUser(sub.publicPostIds[j])
                                    .then((userPost: dbq.IPost)=> this.posts.push(userPost));
                            }
                        });
                } 
            });
    }
}