import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as dbq from "../../databaseQueries";
import IPost = dbq.IPost;
import ICreatePost = dbq.ICreatePost;
import IComment = dbq.IComment;
import IGroupFeed = dbq.IGroupFeed;

import ITextContent = dbq.ITextContent;


@Component
export default class CreatePostComponent extends Vue {
    user: dbq.IUser = this.$store.state.user;
    database: dbq.DataBaseQuery = new dbq.DataBaseQuery();
    groupfeeds: Array<dbq.IGroupFeed> = [];
    text: string="";
    selectedGroup:string="Public Post";
    public postThePost() {
        var i=this;
        let textcontent = { text: i.text } as ITextContent;
        var post: ICreatePost = {
            postContent: textcontent ,
            comments: [],
            nameOfPoster: i.user.firstName + " " + i.user.lastName
    }       


        var postId:string = "";
        this.database.createPost(post).then((response) => {
            postId = response.postId;
        
        if (postId === "")
            return;
      
            if (i.selectedGroup === "Public Post") {
                if (i.user.publicPostIds == null)
                    i.user.publicPostIds = [];
            i.user.publicPostIds.push(postId);
                i.database.updateUser(i.user.userId, i.user);
                i.$router.push('/wall');
        }
        else {
            i.groupfeeds.forEach((value) => {
                if (value.groupFeedName === i.selectedGroup) {
                    if (value.groupPostIds == null)
                        value.groupPostIds = [];
                    value.groupPostIds.push(postId);
                    i.database.updateGroupFeed(value.groupFeedId, value).then(() => console.log("groupPostIds updated in user with new post id"));
                    i.$router.push('/wall');
                    return;
                }
            });

        }
        });

    
    }

    mounted() {
        let i = this;
          this.$nextTick(() => {

               //   for(let i=0;i<i.user.groupFeedIds.Len)
                 i.user.groupFeedIds.forEach((value:string)=> {
                     i.database.getGroupFeed(value).then((response) => {
                         i.groupfeeds.push(response);
                     });

                 });

             });
        }

}