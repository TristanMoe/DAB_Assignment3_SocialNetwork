using System;
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
        public ObjectId UserId { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public ObjectId Feed { get; set; }
        public ObjectId Wall { get; set; }
        public List<ObjectId> PostIds { get; set; }
        public List<ObjectId> SubscriberIds { get; set; }
        public List<ObjectId> SubscriptionIds { get; set; }
        public List<ObjectId> BlockedSubscriberIds { get; set; }
    }
}
