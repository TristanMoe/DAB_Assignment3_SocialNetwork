using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using SocialNetwork.Model;

namespace SocialNetwork.Services
{
    public class GroupFeedServices
    {
        private readonly IMongoCollection<GroupFeed> _groupFeeds;
        public GroupFeedServices(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("SocialNetworkDb"));
            var database = client.GetDatabase("SocialNetworkDb");
            _groupFeeds = database.GetCollection<GroupFeed>("GroupFeed");
        }

        public List<GroupFeed> GetGroupFeeds(List<string> ids)
        {
            var groupFeeds = new List<GroupFeed>();
            var groupFeed=new GroupFeed();
            foreach (var id in ids)
            {
                groupFeed = _groupFeeds.Find(p => p.GroupFeedId == id).FirstOrDefault();
                if(groupFeed!=null)
                    groupFeeds.Add(groupFeed);
            }

            return groupFeeds;
        }

        public GroupFeed GetGroupFeed(string id)
        {
            return _groupFeeds.Find(g => g.GroupFeedId == id).FirstOrDefault();
        }

        public void InsertGroupFeed(GroupFeed feed)
        {
            _groupFeeds.InsertOne(feed);
        }

        public void PutGroupFeed(string id, GroupFeed feed)
        {
            var feeder= _groupFeeds.ReplaceOne(p => p.GroupFeedId == id, feed);
        }

        public void DeleteGroupFeed(string id)
        {
            _groupFeeds.DeleteOne(g=>g.GroupFeedId==id);
        }
    }
}
