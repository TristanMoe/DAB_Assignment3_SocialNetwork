using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SocialNetwork.Server.Model;
using SocialNetwork.Server.Services;

namespace SocialNetwork.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }
        // GET: api/User
        [HttpGet]
        public ActionResult<List<User>> Get()
        {
            return _userService.Get();
        }

        // GET: api/User/5
        [HttpGet("{id:length(24)}", Name = "Get")]
        public ActionResult<User> Get(string id)
        {
            return _userService.Get(id);
        }

        // POST: api/User
        [HttpPost]
        public ActionResult<User> Create(User user)
        {
            _userService.Create(user);
            return CreatedAtRoute("GetUser", new {id = user.UserId.ToString()}, user);
        }

        // PUT: api/User/5
        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, User userInput)
        {
            var userToUpdate = _userService.Get(id);
            if (userToUpdate == null)
            {
                return NotFound();
            }
            _userService.Update(id, userInput);
            return NoContent();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id:length(24)}")]
        public void Delete(string id)
        {
        }
    }
}
