import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as dbq from "../../databaseQueries";
import IPost = dbq.IPost;
import ICreatePost = dbq.ICreatePost;
import IComment = dbq.IComment;
import IGroupFeed = dbq.IGroupFeed;


@Component
export default class CreatePostComponent extends Vue {
    user: dbq.IUser = this.$store.state.user;
    database: dbq.DataBaseQuery = new dbq.DataBaseQuery();
    groupfeeds: Array<dbq.IGroupFeed> = [];
    text: string="";
    selectedGroup:string="Public Post";
    public postThePost() {
        var i=this;
        
        var post: ICreatePost = {
            text: i.text,
            postTimeStamp: Date.now().toString(),
            comments: {} as Array<IComment>,
            nameOfPoster: i.$store.state.user
        }       


        var postId = "";
        this.database.createPost(post).then((response) => {
            postId = response.Id;
        });
        
      
        if (this.selectedGroup === "Public Post") {
            i.$store.state.user.publicPostIds.push(postId);
        }
        else {
            i.groupfeeds.forEach((value) => {
                if (value.groupFeedName === i.selectedGroup) {
                    value.groupPostIds.push(postId);
                    i.database.updateGroupFeed(postId,value);
                    return;
                }
            });

        }


    
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