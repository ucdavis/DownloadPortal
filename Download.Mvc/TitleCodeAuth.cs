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
using Microsoft.AspNetCore.Mvc;

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
            if (!valid)
            {
                context.Result = new UnauthorizedResult();
                await context.Result.ExecuteResultAsync(context);
            }
        }
    }
}
