using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using SocialNetwork.Model;
using SocialNetwork.Services;

namespace SocialNetwork.App.Services
{
    public class ContentService
    {
        private readonly IMongoCollection<BaseContent> _contentCollection;

        public ContentService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration.GetConnectionString("SocialNetworkDb"));
            var database = mongoClient.GetDatabase("SocialNetworkDb");
            _contentCollection = database.GetCollection<BaseContent>("BaseContent");
        }
        public List<BaseContent> Get()
        {
            return _contentCollection.Find(content => true).ToList();
        }

        public List<TextContent> GetAllTextContents()
        {
            return _contentCollection.AsQueryable<BaseContent>().OfType<TextContent>().ToList();
        }


        public List<ImageContent> GetAllImageContents()
        {
            return _contentCollection.AsQueryable<BaseContent>().OfType<ImageContent>().ToList();
        }


        public BaseContent Get(string id)
        {
            return _contentCollection.Find<BaseContent>(content => content.ContentId == id).FirstOrDefault();
        }


        public BaseContent Create(BaseContent content)
        {
            _contentCollection.InsertOne(content);
            return content;
        }

        public void Update(string id, BaseContent contentToUpdate)
        {
            _contentCollection.ReplaceOne(con => con.ContentId== id, contentToUpdate);
        }

        public void Remove(BaseContent content)
        {
            _contentCollection.DeleteOne(con => con.ContentId == content.ContentId);
        }

        public void Remove(string id)
        {
            _contentCollection.DeleteOne(con => con.ContentId== id);
        }
    }
}