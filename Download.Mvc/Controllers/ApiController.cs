using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Box.V2;
using Box.V2.Auth;
using Box.V2.Config;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Download.Controllers
{
    [Authorize]
    public class ApiController : Controller
    {
        private readonly BoxClient _client;
        private AppSettings _appSettings;
        public ApiController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _client = Initialize();
        }

        public BoxClient Initialize()
        {
            var config = new BoxConfig(_appSettings.ClientId, _appSettings.ClientSecret, new Uri("http://localhost"));
            var session = new OAuthSession(_appSettings.Session, "NOT_NEEDED", 3600, "bearer");
            var client = new BoxClient(config, session);
            return client;
        }

        [HttpGet("api")]
        public async Task<JsonResult> Get()
        {
            // Get items in root folder
            var items = await _client.FoldersManager.GetInformationAsync(_appSettings.TopFolderId);

            return Json(items);
        }

        [HttpGet("api/folder/{id}")]
        public async Task<JsonResult> GetFolderInfo(string id)
        {
            var items = await _client.FoldersManager.GetInformationAsync(id);

            return Json(items);
        }

        [HttpGet("api/file/{id}")]
        public async Task<JsonResult> GetFileInfo(string id)
        {
            var items = await _client.FilesManager.GetInformationAsync(id);

            return Json(items);
        }

        [HttpGet("api/downloadFile/{id}")]
        public async Task<JsonResult> DownloadFile(string id)
        {
            var items = await _client.FilesManager.GetDownloadUriAsync(id);

            return Json(items);
        }

        [HttpGet("api/previewFile/{id}")]
        public async Task<JsonResult> previewFile(string id)
        {
            var items = await _client.FilesManager.GetPreviewLinkAsync(id);

            return Json(items);
        }

        public IActionResult Error()
        {
            return View();
        }

        public class FolderContainer {
            public string Id { get; set; }
            public string Name { get; set; }
            public string Type { get; set; }
        }

    }
}
