using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SocialNetwork.Model
{
    public class Comment
    {
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime CommentTimeStamp { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string CommentAuthorUserId { get; set; }
        public string Text { get; set; }
    }
}