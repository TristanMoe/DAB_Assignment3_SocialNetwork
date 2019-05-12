using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SocialNetwork.Server.Model
{
    public class UserFeed
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string FeedId { get; set; }
        public List<string> SubscriptionIds { get; set; }
        public List<string> GroupFeedIds { get; set; }
    }
}