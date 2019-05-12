using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DAB_Assignment3_SocialNetwork_Client.Models;

namespace DAB_Assignment3_SocialNetwork_Client.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Feed()
        {
            return View();
        }

        public IActionResult Wall()
        {
            return View();
        }

        public IActionResult CreatePost()
        {
            return View(); 
        }

        public IActionResult FollowUser()
        {
            return View();
        }

        public IActionResult BlockedUser()
        {
            return View(); 
        }

        public IActionResult Account()
        {
            return View(); 
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
