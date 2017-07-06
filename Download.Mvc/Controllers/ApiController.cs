using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Box.V2;
using Box.V2.Auth;
using Box.V2.Config;
using Box.V2.Models;
using Microsoft.AspNetCore.Mvc;

namespace Download.Controllers
{
    public class ApiController : Controller
    {
        private readonly BoxClient _client;

        public ApiController()
        {
            _client = Initialize();
        }

        public BoxClient Initialize()
        {
            var config = new BoxConfig("guako54vyy1hlzu2iblnrpki5npfr0oy", "zepso2qwwfySqdESmBtHBJcpfy9ajVnT", new Uri("http://localhost"));
            var session = new OAuthSession("cQ3GHj2OZvGGDWBiDTiQ6i7Ff9jlzA0B", "NOT_NEEDED", 3600, "bearer");
            var client = new BoxClient(config, session);
            return client;
        }

        /// <summary>
        /// Get a list of everything inside the given root folder
        /// </summary>
        /// <returns></returns>
        [HttpGet("api")]
        public async Task<JsonResult> Get()
        {
            // TODO: move to settings
            const string topFolderId = "27707355823";

            // Get items in root folder
            var items = await _client.FoldersManager.GetFolderItemsAsync(topFolderId, 500);
            //var downloadUri = await client.FilesManager.GetDownloadUriAsync("179843592716");

            return Json(items);
        }

        [HttpGet("api/folder/{id}")]
        public async Task<JsonResult> GetFolderInfo(string id)
        {
            var items = await _client.FoldersManager.GetFolderItemsAsync(id, 500);

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
