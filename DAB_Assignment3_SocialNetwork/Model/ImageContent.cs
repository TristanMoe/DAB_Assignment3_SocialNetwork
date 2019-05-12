using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SocialNetwork.Server.Model
{
    public class ImageContent : BaseContent
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string GridFsFileId { get; set; }
    }
}