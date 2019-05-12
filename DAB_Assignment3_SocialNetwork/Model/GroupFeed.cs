using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SocialNetwork.Server.Model
{
    public class GroupFeed
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string GroupFeedId { get; set; }

        public string GroupFeedName { get; set; }
        public List<string> GroupPostIds { get; set; }
        public List<string> UsersInGroupFeed { get; set; }
    }
}