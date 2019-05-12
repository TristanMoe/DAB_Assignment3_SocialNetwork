using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SocialNetwork.Server.Model
{
    public class Post
    {
        [BsonId]
        public ObjectId PostId { get; set; }
        public ObjectId ContentId { get; set; }
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime PostTimeStamp { get; set; }
        public List<Comment> Comments { get; set; }
        public BaseContent PostContent { get; set; }
    }
}