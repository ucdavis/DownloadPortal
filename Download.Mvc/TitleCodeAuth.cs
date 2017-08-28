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

        public TitleCodeAuth(ITitleCodesService titleCodesService)
        {
            _titleCodesService = titleCodesService;
        }

        public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            // TODO: for now, let all authorized users in
            await next();
            
//          var valid = await _titleCodesService.GetTitleCodes(context.HttpContext.User.Identity.Name);
//          if (!valid)
//          {
//              context.Result = new StatusCodeResult(403); // forbidden!
//              return; // shortcut return if we don't have a valid match
//          }
//
//          await next();
        }
    }
}
