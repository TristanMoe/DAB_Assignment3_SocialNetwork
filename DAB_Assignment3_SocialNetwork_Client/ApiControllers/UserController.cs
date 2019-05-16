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
        [HttpGet("ByCredentials/{email}/{password}", Name = "GetUserByCredentials")]
        public ActionResult<User> Get(string email,string password)
        {
            return _userService.Get(email,password);
        }

        [HttpGet("{id}", Name = "GetUserById")]
        public ActionResult<User> Get(string id)
        {
            return _userService.Get(id);
        }

        [HttpGet("{email}", Name = "GetUserByEmail")]
        public ActionResult<User> GetUser(string email)
        {
            return _userService.GetUser(email);
        }

        // POST: api/User
        [HttpPost]
        public ActionResult<User> Create(User user)
        {
            try
            {
                _userService.Create(user);
                return CreatedAtRoute("GetUserById", new { id = user.UserId }, user);
            }
            catch (UserExistsException e)
            {
                return BadRequest(e.Message);
            }
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
            _userService.Remove(id);
        }
    }
}
