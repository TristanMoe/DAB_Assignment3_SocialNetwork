﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SocialNetwork.Server.Model
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string Feed { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string Wall { get; set; }
        public List<string> PublicPostIds { get; set; }
        public List<string> SubscriberIds { get; set; }
        public List<string> BlockedSubscriberIds { get; set; }
    }
}
