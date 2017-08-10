using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using Microsoft.AspNetCore.Mvc.Filters;
using Download.Services;
using Microsoft.Extensions.Options;
using Download.Controllers;
using System.Diagnostics;

namespace Download
{
    public class TitleCodeAuth : ActionFilterAttribute
    {
        private readonly ITitleCodesService _titleCodesService;
        public TitleCodeAuth()
        {
            
        }
        public TitleCodeAuth(ITitleCodesService titleCodesService)
        {
            _titleCodesService = titleCodesService;
        }
        public async override void OnActionExecuting(ActionExecutingContext context)
        {
            var valid = await _titleCodesService.GetTitleCodes(context.HttpContext.User.Identity.Name);
            if(!valid)
            {
                throw new Exception("You do not have permissions to access this");
            }
        }
    }
}
