using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SocialNetwork.Server.Model
{
    public class Comment
    {
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime CommentTimeStamp { get; set; }
        public ObjectId CommentAuthorUserId { get; set; }
        public string Text { get; set; }
    }
}