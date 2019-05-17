using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAB_Assignment3_SocialNetwork_Client.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using SocialNetwork.Model;

using SocialNetwork.Services;

namespace SocialNetwork.Server.Controllers
{
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private PostServices _postServices;

        public PostController(PostServices service)
        {
            _postServices = service;
        }
        // GET: api/Post


        // GET: api/Post/5
        [HttpGet("{id}")]
        public Post Get(string id)
        {
            var post = _postServices.GetPublicPost(id);
            if (post == null)
                return default;
            return post;

        }

        public List<Post> Get()
        {
            return _postServices.GetPublicPosts();
        }

        // POST: api/Post

        [HttpPut("{id:length(24)}")]
        public IActionResult UpdatePost(string id, [FromBody]Post post)
        {
            var getPost = _postServices.GetPublicPost(id);
            post.PostId = getPost.PostId;
            _postServices.UpdatePost(id, post);

            return NoContent();
        }

        // PUT: api/Post/5


        [HttpPost]
        public Post Create([FromBody]Post post)
        {
            var retPost = _postServices.InsertPost(post);
            return retPost;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _postServices.DeletePost(id);
        }
    }
}