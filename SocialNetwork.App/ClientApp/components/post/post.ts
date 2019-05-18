import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator'
import * as dbq from "../../databaseQueries";
import IPost = dbq.IPost;


@Component
export default class PostComponent extends Vue {
    @Prop()
    post: IPost;
    currentUser: dbq.IUser = this.$store.state.user;
    databaseQuery: dbq.DataBaseQuery = new dbq.DataBaseQuery();
    commentBox: string = '';
    get thePost() {
        return this.post;
    }
    set thePost(post: IPost) {
        this.post = post;
    }
    addComment() {
        console.log("Trying to add comment " + this.commentBox);
        let comment = {
            commentTimeStamp: JSON.stringify(Date),
            commentAuthorUserId: this.currentUser.userId,
            text: this.commentBox,
            firstName: this.currentUser.firstName,
            lastName: this.currentUser.lastName
        } as dbq.IComment;
        let mutablePost = this.thePost;
        mutablePost.comments.push(comment);
        this.databaseQuery.saveComment(this.post);
        this.thePost = mutablePost;
        console.log('Post updated with new comment');
    }
}