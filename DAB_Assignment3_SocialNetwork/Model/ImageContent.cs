using MongoDB.Bson;

namespace SocialNetwork.Server.Model
{
    public class ImageContent : BaseContent
    {
        public ObjectId GridFsFileId { get; set; }
    }
}