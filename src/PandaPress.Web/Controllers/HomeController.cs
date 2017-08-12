using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using PandaPress.Core.Contracts;

namespace PandaPress.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly IBlogService _blogService;

        public HomeController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        public IActionResult Index()
        {
            var model = _blogService.GetHomeData();
            return View(model);
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
