using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Model;
using SocialNetwork.Services;


namespace SocialNetwork.Client.ApiControllers
{
    [Route("api/[controller]")]
    public class GroupFeedController : ControllerBase
    {
        private readonly GroupFeedServices _groupFeedServices;
        public GroupFeedController(GroupFeedServices service)
        {
            _groupFeedServices = service;
        }
        // GET: api/GroupFeed
        [HttpGet]
        public IEnumerable<GroupFeed> Get(List<string> ids)
        {
            return _groupFeedServices.GetGroupFeeds(ids);
        }

        // GET: api/GroupFeed/5
        [HttpGet("{id}")]
        public GroupFeed Get(string id)
        {
            return _groupFeedServices.GetGroupFeed(id);
        }

        // POST: api/GroupFeed
        [HttpPost]
        public GroupFeed Post([FromBody] GroupFeed feed)
        {
            _groupFeedServices.InsertGroupFeed(feed);
            return feed;
        }

        // PUT: api/GroupFeed/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody] GroupFeed feed)
        {
            var getFeed = _groupFeedServices.GetGroupFeed(id);
            feed.GroupFeedId = getFeed.GroupFeedId;
            if (getFeed == null)
                return;
            _groupFeedServices.PutGroupFeed(id, feed);

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _groupFeedServices.DeleteGroupFeed(id);
        }
    }
}
