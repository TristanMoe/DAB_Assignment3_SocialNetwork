using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Server.Model;
using SocialNetwork.Server.Services;

namespace SocialNetwork.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private PostServices _postServices;

        public PostController(PostServices service)
        {
            _postServices = service;
        }
        // GET: api/Post
        [HttpGet]
        public ActionResult<List<Post>> GetPosts(List<string> ids)
        {
            return _postServices.GetPublicPosts(ids);
        }


        // GET: api/Post/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult<Post> GetPost(string id)
        {
            var post = _postServices.GetPublicPost(id);
            if (post == null)
                return BadRequest();
            return post;

        }

        // POST: api/Post
        [HttpPost]
        public void UpdatePost([FromBody]Post post, string id)
        {
            _postServices.UpdatePost(post,id);
        }

        // PUT: api/Post/5

        [Route("/api/Post/InsertPost")]
        [HttpPost]
        public void InsertPost([FromBody]Post post)
        {
            _postServices.InsertPost(post);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _postServices.DeletePost(id);
        }
    }
}
