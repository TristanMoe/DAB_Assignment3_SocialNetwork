import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import * as dbq from "../../databaseQueries";
import IUser = dbq.IUser;


@Component
export default class FetchWallComponent extends Vue {
    databaseQuery: dbq.DataBaseQuery = new dbq.DataBaseQuery();
    posts: dbq.IPost[] = new Array<dbq.IPost>();
    currentUser: dbq.IUser = this.$store.state.user; 
    commentBox: dbq.ITextComment[] = new Array<dbq.ITextComment>(); 
    
    fetchPosts() {
        for (var i = 0; i < this.currentUser.publicPostIds.length; i++) {
            console.log('Writing all posts')
            this.databaseQuery.getPostForUser(this.currentUser.publicPostIds[i])
                .then((fetchedPost: dbq.IPost) => {
                    if (fetchedPost !== undefined) {
                        this.posts.push(fetchedPost);
                        var commentbox = {
                            text: "",
                            postId: fetchedPost.postId
                        } as dbq.ITextComment;

                        this.commentBox.push(commentbox);
                    }
                });
        }
    }
    addComment(commentBox: dbq.ITextComment) {
        console.log("Trying to add comment " + commentBox.text);
        let post = this.posts.filter(post => post.postId === commentBox.postId).pop();
        var comment = {
            commentTimeStamp: JSON.stringify(Date),
            commentAuthorUserId: this.currentUser.userId,
            text: commentBox.text
        } as dbq.IComment;

        if (post !== undefined) {
            post.comments.push(comment);
            this.databaseQuery.saveComment(post);
            console.log('Post updated with new comment');
        }
    }
    mounted() {
        this.$nextTick(() => {
            this.fetchPosts();
        })
    }
}