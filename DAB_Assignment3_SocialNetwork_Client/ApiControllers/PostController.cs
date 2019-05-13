using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using SocialNetwork.Model;

using SocialNetwork.Services;

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
        public ActionResult<List<Post>> GetPosts([FromBody]List<string> ids)
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

        [HttpPut("{id}")]
        public void UpdatePost(string id, [FromBody]Post post)
        {
            var getPost = _postServices.GetPublicPost(id);
            post.PostId = getPost.PostId;
            if (getPost == null)
                return;
            _postServices.UpdatePost(id, post);

        }

        // PUT: api/Post/5


        [HttpPost(Name = "Create")]
        public void Create([FromBody]Post post)
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