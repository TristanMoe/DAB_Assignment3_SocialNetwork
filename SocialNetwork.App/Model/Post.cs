using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SocialNetwork.Model
{
    public class Post
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string PostId { get; set; }

        /*[BsonRepresentation(BsonType.ObjectId)]
        public string ContentId { get; set; }*/

        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime PostTimeStamp { get; set; }

        public List<Comment> Comments { get; set; }

        public TextContent PostContent { get; set; }
        public string NameOfPoster { get; set; }
    }
}