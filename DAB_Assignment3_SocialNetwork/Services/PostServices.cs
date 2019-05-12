using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            var client = new MongoClient(config.GetConnectionString("BookstoreDb"));
            var database = client.GetDatabase("BookstoreDb");
            _posts = database.GetCollection<Post>("Books");
        }

        public List<Post> GetPublicPosts(List<string> ids)
        {
            var posts = new List<Post>();
            var post=new Post();
            foreach (var id in ids)
            {
                post=_posts.Find<Post>(p => p.PostId == id).FirstOrDefault();
                posts.Add(post);
            }

            return posts;
        }

        

       

    }
}
