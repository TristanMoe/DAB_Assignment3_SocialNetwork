﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using SocialNetwork.Server.Model;

namespace SocialNetwork.Server.Services
{
    public class PostServices
    {
        private readonly IMongoCollection<Post> _posts;
        public PostServices(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("SocialNetworkDb"));
            var database = client.GetDatabase("SocialNetworkDb");
            _posts = database.GetCollection<Post>("Post");
        }

        public List<Post> GetPublicPosts(List<string> ids)
        {
            var posts = new List<Post>();
            var post=new Post();
            foreach (var id in ids)
            {
                post=_posts.Find<Post>(p => p.PostId == id).FirstOrDefault();
                if(post!=null)
                    posts.Add(post);
            }

            return posts;
        }

        public Post GetPublicPost(string Id)
        {
            var post= _posts.Find<Post>(p => p.PostId == Id).FirstOrDefault();
            return post;
        }

        [HttpPut]
        public void UpdatePost(Post post,string id)
        {
            
            var result = _posts.ReplaceOne(new BsonDocument("PostId", id), post, new UpdateOptions { IsUpsert = true});
        }

        [HttpPost]
        public void InsertPost(Post post)
        {
            _posts.InsertOne(post);
        }

        [HttpPost]
        public void DeletePost(string Id)
        {
            var filter = Builders<Post>.Filter.Eq("PostId", Id);
            _posts.DeleteOne(filter);
        }


        /*[HttpPost]
        public void InsertCreateComment(string postId,string text)
        {
            var comment = new Comment {CommentTimeStamp = DateTime.Now, Text = text};
            var post = _posts.Find(p => p.PostId == postId).FirstOrDefault();
            if (post != null)
            {
                post.Comments.Add(comment);
                _posts.ReplaceOne(new BsonDocument("PostId", postId), post, new UpdateOptions { IsUpsert = true });
            }
        }*/

        /*public void InsertContent(string postId, Comment comment)
        {
            var post = _posts.Find(p => p.PostId == postId).FirstOrDefault();
            if (post != null && comment != null)
            {
                post.Comments.Add(comment);
                _posts.ReplaceOne(new BsonDocument("PostId", postId), post, new UpdateOptions { IsUpsert = true });
            }
        } aner ikke hvad der modtages som argument*/



        /*[HttpPost]
       public Post CreatePost(Content-- virker nok ikke)
        {

        } hvad fås med som argument*/

    }



}
