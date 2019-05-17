/*using System;
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
    public class TextContentController : Controller
    {
        private readonly ContentService _contentService;

        public TextContentController(ContentService contentService)
        {
            _contentService = contentService;
        }
        // GET: api/Content
        [HttpGet(Name="GetAllText")]
        public List<TextContent> GetAll()
        {
            return _contentService.GetAllTextContents();
        }


        // GET: api/Content/5
        [HttpGet("{id}")]
        public TextContent Get(string id)
        {
            return (TextContent) _contentService.Get(id);
        }
        
        // POST: api/Content
        [HttpPost]
        public TextContent Post([FromBody]TextContent content)
        {
            return (TextContent) _contentService.Create(content);
        }



        // PUT: api/Content/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody]TextContent content)
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
*/