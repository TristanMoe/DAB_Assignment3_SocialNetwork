using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SocialNetwork.Model
{
    [BsonDiscriminator(RootClass = true)]
    [BsonKnownTypes(typeof(TextContent),typeof(ImageContent))]
    public class BaseContent
    {

    }
}