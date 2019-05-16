import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator'
import * as dbq from "../../databaseQueries";
import IPost = dbq.IPost;


@Component
export default class PostComponent extends Vue {
    @Prop({ default: null })
    post: IPost = {} as IPost;
    addComment() {
        console.log('It works!');
    }
}