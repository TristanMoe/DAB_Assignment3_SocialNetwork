using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SocialNetwork.Server.Model
{
    public class GroupFeed
    {
        [BsonId]
        public ObjectId GroupFeedId { get; set; }

        public string GroupFeedName { get; set; }
        public List<ObjectId> GroupPostIds { get; set; }
        public List<ObjectId> UsersInGroupFeed { get; set; }
    }
}