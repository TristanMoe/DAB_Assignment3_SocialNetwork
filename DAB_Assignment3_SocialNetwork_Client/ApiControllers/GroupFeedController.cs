using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Model;
using SocialNetwork_Client.Services;

namespace SocialNetwork.Client.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupFeedController : ControllerBase
    {
        private readonly GroupFeedServices _groupFeed;
        public GroupFeedController()
        {
            
        }
        // GET: api/GroupFeed
        [HttpGet]
        public IEnumerable<GroupFeed> Get(List<string> ids)
        {
            return _groupFeed.GetGroupFeeds(ids);
        }

        // GET: api/GroupFeed/5
        [HttpGet("{id}", Name = "Get")]
        public GroupFeed Get(string id)
        {
            return _groupFeed.GetGroupFeed(id);
        }

        // POST: api/GroupFeed
        [HttpPost]
        public void Post([FromBody] GroupFeed feed)
        {
            _groupFeed.InsertGroupFeed(feed);
        }

        // PUT: api/GroupFeed/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody] GroupFeed value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
