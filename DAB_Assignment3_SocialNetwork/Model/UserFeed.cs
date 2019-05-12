using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SocialNetwork.Server.Model
{
    public class UserFeed
    {
        [BsonId]
        public ObjectId FeedId { get; set; }
        public List<ObjectId> SubscriptionIds { get; set; }
        public List<ObjectId> GroupFeedIds { get; set; }
    }
}