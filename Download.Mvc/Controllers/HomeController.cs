using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Download.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly AuthSettings _authSettings;
        public HomeController(IOptions<AuthSettings> authSettings)
        {
            _authSettings = authSettings.Value;
        }
        public IActionResult Index()
        {
            return View(_authSettings);
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
