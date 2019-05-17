using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.App.Services;
using SocialNetwork.Model;

namespace SocialNetwork.App.Controllers.ApiControllers
{
    [Route("api/[controller]")]
    public class ImageContentController : Controller
    {
        private readonly ContentService _contentService;

        public ImageContentController(ContentService contentService)
        {
            _contentService = contentService;
        }
        // GET: api/Content
        [HttpGet(Name="GetAllImages")]
        public List<ImageContent> GetAll()
        {
            return _contentService.GetAllImageContents();
        }


        // GET: api/Content/5
        [HttpGet("{id}")]
        public ImageContent Get(string id)
        {
            return (ImageContent) _contentService.Get(id);
        }
        
        // POST: api/Content
        [HttpPost]
        public ImageContent Post([FromBody]ImageContent content)
        {
            return (ImageContent) _contentService.Create(content);
        }



        // PUT: api/Content/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody]ImageContent content)
        {
            _contentService.Update(id,content);
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _contentService.Remove(id);
        }
    }
}
