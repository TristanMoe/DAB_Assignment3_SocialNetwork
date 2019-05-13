using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using SocialNetwork.Model;

namespace SocialNetwork.Services
{

    public class UserFeedService
    {
        private readonly IMongoCollection<UserFeed> _userFeedsCollection;

        public UserFeedService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration.GetConnectionString("SocialNetworkDb"));
            var database = mongoClient.GetDatabase("SocialNetworkDb");
            _userFeedsCollection = database.GetCollection<UserFeed>("User");
        }
        public List<UserFeed> Get()
        {
            return _userFeedsCollection.Find(user => true).ToList();
        }

        public UserFeed Get(string id)
        {
            return _userFeedsCollection.Find(uf => uf.FeedId == id).FirstOrDefault();
        }

        public UserFeed Create(UserFeed userFeed)
        {
            _userFeedsCollection.InsertOne(userFeed);
            return userFeed;
        }

        public void Update(string id, UserFeed userFeedIn)
        {
            _userFeedsCollection.ReplaceOne(user => user.FeedId == id, userFeedIn);
        }

        public void Remove(UserFeed userFeedIn)
        {
            _userFeedsCollection.DeleteOne(uf => uf.FeedId == userFeedIn.FeedId);
        }

        public void Remove(string id)
        {
            _userFeedsCollection.DeleteOne(uf => uf.FeedId == id);
        }
    }

}