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
            var config = new BoxConfig("guako54vyy1hlzu2iblnrpki5npfr0oy", "zepso2qwwfySqdESmBtHBJcpfy9ajVnT", new Uri("http://localhost:50296"));
            var session = new OAuthSession("SNdu71adatv2P4jWH5NgxnSXmkPf76xF", "NOT_NEEDED", 3600, "bearer");
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
            var items = await _client.FoldersManager.GetFolderItemsAsync("0", 500);
            //var downloadUri = await client.FilesManager.GetDownloadUriAsync("179843592716");

            return new JsonResult(new {
                items
            });
        }

        [HttpGet("/app/{term}")]
        public async Task<IActionResult> App(string term)
        {
            // Get items in root folder
            var items = await _client.FoldersManager.GetFolderItemsAsync(term, 500);
            var entries = items.Entries;
            //var downloadUri = await client.FilesManager.GetDownloadUriAsync("179843592716");
            var listOfItems = new List<FolderContainer>();

            foreach (BoxFile e in entries)
            {
                var entry = new FolderContainer();
                entry.Id = e.Id;
                entry.Name = e.Name;
                entry.Type = e.Type;
                listOfItems.Add(entry);
            }

            ViewData["AppName"] = term;
            return View(listOfItems);
        }

        [HttpGet("api/folder/{id}")]
        public async Task<JsonResult> GetFolderInfo(string id)
        {
            var items = await _client.FoldersManager.GetFolderItemsAsync(id, 500);

            return new JsonResult(new
            {
                items
            });
        }

        [HttpGet("api/file/{id}")]
        public async Task<JsonResult> GetFileInfo(string id)
        {
            var items = await _client.FilesManager.GetInformationAsync(id);

            return new JsonResult(new
            {
                items
            });
        }

        [HttpGet("api/downloadFile/{id}")]
        public async Task<JsonResult> DownloadFile(string id)
        {
            var items = await _client.FilesManager.GetDownloadUriAsync(id);

            return new JsonResult(new
            {
                items
            });
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
