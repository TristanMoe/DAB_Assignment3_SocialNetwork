using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Model;
using SocialNetwork.Services;

namespace SocialNetwork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserFeedController : ControllerBase
    {
        private readonly UserFeedService _userFeedService;

        public UserFeedController(UserFeedService userFeedFeedService)
        {
            _userFeedService = userFeedFeedService;
        }
        // GET: api/User
        [HttpGet]
        public ActionResult<List<UserFeed>> Get()
        {
            return _userFeedService.Get();
        }

        [HttpGet("{id}", Name = "GetUserFeed")]
        public ActionResult<UserFeed> Get(string id)
        {
            return _userFeedService.Get(id);
        }


        // POST: api/User
        [HttpPost]
        public ActionResult<UserFeed> Create(UserFeed userFeed)
        {
            _userFeedService.Create(userFeed);
            return CreatedAtRoute("GetUserById", new { id = userFeed.FeedId }, userFeed);
        }

        // PUT: api/User/5
        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, UserFeed userFeedInput)
        {
            var userFeedToUpdate = _userFeedService.Get(id);
            if (userFeedToUpdate == null)
            {
                return NotFound();
            }
            _userFeedService.Update(id, userFeedInput);
            return NoContent();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id:length(24)}")]
        public void Delete(string id)
        {
            _userFeedService.Remove(id);
        }
    }
}
