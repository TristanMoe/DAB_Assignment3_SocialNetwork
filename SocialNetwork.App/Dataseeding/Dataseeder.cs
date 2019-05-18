using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.CSharp;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Configuration;
using SocialNetwork.Model;

namespace SocialNetwork.App.Dataseeding
{
    public class Dataseeder
    {
        private MongoClient _client;
        private IMongoDatabase _db;
        private const string _connectionString = "mongodb://localhost:27017";

        /// <summary>
        /// Collections
        /// </summary>
        private IMongoCollection<User> _userCollection;
        private IMongoCollection<Post> _postCollection;
        private IMongoCollection<GroupFeed> _groupFeedCollection;

        public Dataseeder()
        {
            _client = new MongoClient(_connectionString);
            _db = _client.GetDatabase("SocialNetworkDb");
            _db.DropCollectionAsync("User");
            _db.DropCollectionAsync("Post");
            _db.DropCollectionAsync("GroupFeed");


            _db.CreateCollectionAsync("User");
            _db.CreateCollectionAsync("Post");
            _db.CreateCollectionAsync("GroupFeed");

            #region groupfeed insert

            var groupfeed = new GroupFeed
            {
                GroupFeedId = "123d705eace4a36e8c3ca125",
                GroupFeedName = "Aabyhøj IF",
                GroupPostIds = new List<string>
                {
                    "5cdd705eace4a36e8c3ca12c",
                    "5cdd705eace4a36e8c3ca121"

                },
                UsersInGroupFeed = new List<string>
                {
                    "5cdd705eace4a36e8c3ca121",
                    "5cdd705eace4a36e8c3ca122"
                }


            };

            _groupFeedCollection = _db.GetCollection<GroupFeed>("GroupFeed");
            _groupFeedCollection.InsertOne(groupfeed);



            #endregion

            #region User insert
            var Ole = new User
            {
                UserId = "5cdd705eace4a36e8c3ca121",
                FirstName = "Ole",
                LastName = "Andersen",
                Email = "Ole@hotmail.com",
                Gender = "Male",
                Password = "1234",
                GroupFeedIds = new List<string>
                {
                    "123d705eace4a36e8c3ca125"
                },
                PublicPostIds = new List<string>(),
                BlockedSubscriberIds = new List<string>(),
                SubscriptionIds = new List<string>(),
                SubscriberIds = new List<string>()
                
            };
            //PostbyOleCommentedBySusanne
            Ole.PublicPostIds.Add("5cdd705eace4a36e8c3ca12a");
            //PostByOleCommentedByNiels
            Ole.PublicPostIds.Add("5cdd705eace4a36e8c3ca12b");

            //Block Gertrud
            Ole.BlockedSubscriberIds.Add("5cdd705eace4a36e8c3ca124");

            //Subscribe to Susanne and Niels
            //Niels
            Ole.SubscriptionIds.Add("5cdd705eace4a36e8c3ca122");
            //Susanne
            Ole.SubscriptionIds.Add("5cdd705eace4a36e8c3ca123");

            //Niels and Susanne subscribe to Ole
            //Niels
            Ole.SubscriberIds.Add("5cdd705eace4a36e8c3ca122");
            //Susanne
            Ole.SubscriberIds.Add("5cdd705eace4a36e8c3ca123");

            var Niels = new User
            {
                UserId = "5cdd705eace4a36e8c3ca122",
                FirstName = "Niels",
                LastName = "Pedersen",
                Email = "Niels@hotmail.com",
                Gender = "Male",
                Password = "4321",
                GroupFeedIds = new List<string>
                {
                    "123d705eace4a36e8c3ca125"
                },
                BlockedSubscriberIds = new List<string>(),
                PublicPostIds = new List<string>(),
                SubscriptionIds = new List<string>(),
                SubscriberIds = new List<string>()
            };
            //Subscribe to Ole 
            Niels.SubscriptionIds.Add("5cdd705eace4a36e8c3ca121");
            //Ole Subscribed to Niels
            Niels.SubscriberIds.Add("5cdd705eace4a36e8c3ca121");
            //Post by Niels commented by Ole 
            Niels.PublicPostIds.Add("5cdd705eace4a36e8c3ca12c");
           
           
            var Susanne = new User
            {
                UserId = "5cdd705eace4a36e8c3ca123",
                FirstName = "Susanne",
                LastName = "Ibsen",
                Email = "Susanne@hotmail.com",
                Gender = "Female",
                Password = "1010",
                GroupFeedIds = new List<string>
                {
                    "123d705eace4a36e8c3ca125"
                },
                BlockedSubscriberIds = new List<string>(),
                PublicPostIds = new List<string>(),
                SubscriptionIds = new List<string>(),
                SubscriberIds = new List<string>()
            };
            //Subscribe to Ole
            Susanne.SubscriptionIds.Add("5cdd705eace4a36e8c3ca121");
            //Ole subscribed to Susanne
            Susanne.SubscriberIds.Add("5cdd705eace4a36e8c3ca121");

            var Gertrud = new User
            {
                UserId = "5cdd705eace4a36e8c3ca124",
                FirstName = "Gertrud",
                LastName = "Jensen",
                Email = "Gertrud@hotmail.com",
                Gender = "Female",
                Password = "5010",
                GroupFeedIds = new List<string>
                {
                    "123d705eace4a36e8c3ca125"
                },
                BlockedSubscriberIds = new List<string>(),
                PublicPostIds = new List<string>(),
                SubscriptionIds = new List<string>(),
                SubscriberIds = new List<string>()
            };

            var Jens = new User()
            {
                UserId = "5cdd705eace4a36e8c3ca125",
                FirstName = "Jens",
                LastName = "Smith",
                Email = "Jens@hotmail.com",
                Gender = "Male",
                Password = "8080",
                GroupFeedIds = new List<string>
                {
                    "123d705eace4a36e8c3ca125"
                },
                BlockedSubscriberIds = new List<string>(),
                PublicPostIds = new List<string>(),
                SubscriptionIds = new List<string>(),
                SubscriberIds = new List<string>()
            };

            _userCollection = _db.GetCollection<User>("User");
            _userCollection.InsertOneAsync(Ole);
            _userCollection.InsertOneAsync(Niels);
            _userCollection.InsertOneAsync(Susanne);
            _userCollection.InsertOneAsync(Gertrud);
            _userCollection.InsertOneAsync(Jens);
            #endregion

            #region Post insert
            var PostByOleCommentedBySusanne = new Post
            {
                PostId = "5cdd705eace4a36e8c3ca12a",
                PostTimeStamp = DateTime.Now,
                Comments = new List<Comment>(),
                PostContent = new TextContent()
                {
                    Text = "Hvad skal spise i aften Susanne?"
                },
                NameOfPoster = "Ole Andersen"
            };
            PostByOleCommentedBySusanne.Comments.Add(new Comment()
            {
                CommentAuthorUserId = "5cdd705eace4a36e8c3ca123",
                CommentTimeStamp = DateTime.Now,
                Text = "Jeg skal have de fineste ris nede fra Rema 1000!",
                FirstName = "Susanne",
                LastName = "Ibsen"
            });

            var PostByOleCommentedByNiels = new Post
            {
                PostId = "5cdd705eace4a36e8c3ca12b",
                PostTimeStamp = DateTime.Now,
                Comments = new List<Comment>(),
                PostContent = new TextContent()
                {
                    Text = "Husk nu ikke at ændre connectionstring!"
                },
                NameOfPoster = "Ole Andersen"
            };
            PostByOleCommentedByNiels.Comments.Add(new Comment()
            {
                CommentAuthorUserId = "5cdd705eace4a36e8c3ca122",
                CommentTimeStamp = DateTime.Now,
                Text = "Det skal du ikke bestemme!",
                FirstName = "Niels",
                LastName = "Pedersen"
            });
            PostByOleCommentedByNiels.Comments.Add(new Comment()
            {
                CommentAuthorUserId = "5cdd705eace4a36e8c3ca123",
                CommentTimeStamp = DateTime.Now,
                Text = "Jeg ændrer den nu til \"Æd en ged og dø!\"",
                FirstName = "Susanne",
                LastName = "Ibsen"
            });

            var PostByNielsCommentedByOle = new Post()
            {
                PostId = "5cdd705eace4a36e8c3ca12c",
                PostTimeStamp = DateTime.Now,
                Comments = new List<Comment>(),
                PostContent = new TextContent()
                {
                    Text = "Hvem vil I stemme på?"
                },
                NameOfPoster = "Niels Pedersen"
            };
            PostByNielsCommentedByOle.Comments.Add(new Comment()
            {
                CommentAuthorUserId = "5cdd705eace4a36e8c3ca121",
                CommentTimeStamp = DateTime.Now,
                Text = "Stem på Rasmus Klump! Sløj kurs!",
                FirstName = "Ole",
                LastName = "Andersen"
                
            });

            _postCollection = _db.GetCollection<Post>("Post");
            _postCollection.InsertOneAsync(PostByOleCommentedBySusanne);
            _postCollection.InsertOneAsync(PostByOleCommentedByNiels);
            _postCollection.InsertOneAsync(PostByNielsCommentedByOle);
            #endregion
        }
    }
}
