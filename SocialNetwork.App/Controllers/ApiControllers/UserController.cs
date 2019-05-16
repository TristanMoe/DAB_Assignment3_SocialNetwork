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
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }
        // GET: api/User
        [HttpGet]
        public List<User> Get()
        {
            return _userService.Get();
        }

        // GET: api/User/5
        [HttpGet("ByCredentials/{email}/{password}", Name = "GetUserByCredentials")]
        public User Get(string email,string password)
        {
            return _userService.Get(email,password);
        }

        [HttpGet("{id}", Name = "GetUserById")]
        public User Get(string id)
        {
            return _userService.Get(id);
        }

        [HttpGet("{email}", Name = "GetUserByEmail")]
        public User GetUser(string email)
        {
            return _userService.GetUser(email);
        }

        // POST: api/User
        [HttpPost]
        public User Create([FromBody] User user)
        {
            return _userService.Create(user);
        }

        // PUT: api/User/5
        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, [FromBody] User userInput)
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
            _userService.Remove(id);
        }
    }
}
