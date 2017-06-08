using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Box.V2.Config;
using Box.V2;
using Box.V2.JWTAuth;
using Box.V2.Auth;
using System.IO;
using Box.V2.Models;

namespace WebApplicationBasic.Controllers
{
    public class BoxAPIController : Controller
    {
        public BoxClient client;
        public BoxAPIController()
        {
            client = initialize();
        }

        public BoxClient initialize()
        {
            var config = new BoxConfig("guako54vyy1hlzu2iblnrpki5npfr0oy", "zepso2qwwfySqdESmBtHBJcpfy9ajVnT", new Uri("http://localhost"));
            var session = new OAuthSession("q6dzCQsvdWrmjPOIaTIHdCVVRlaZyaQ2", "NOT_NEEDED", 3600, "bearer");
            var client = new BoxClient(config, session);
            return client;
        }

        [HttpGet("{term}")]
        public async Task<JsonResult> Get()
        {
            // Get items in root folder
            var items = await client.FoldersManager.GetFolderItemsAsync("0", 500);
            //var downloadUri = await client.FilesManager.GetDownloadUriAsync("179843592716");

            return new JsonResult(new {
                items
            });
        }

        [HttpGet("/app/{term}")]
        public async Task<IActionResult> app(string term)
        {
            // Get items in root folder
            var items = await client.FoldersManager.GetFolderItemsAsync(term, 500);
            var entries = items.Entries;
            //var downloadUri = await client.FilesManager.GetDownloadUriAsync("179843592716");
            var listOfItems = new List<folderContainer>();

            foreach (BoxFile e in entries)
            {
                var entry = new folderContainer();
                entry.Id = e.Id;
                entry.Name = e.Name;
                entry.Type = e.Type;
                listOfItems.Add(entry);
            }

            ViewData["AppName"] = term;
            return View(listOfItems);
        }

        [HttpGet("/getFolderInfo/{id}")]
        public async Task<JsonResult> getFolderInfo(string id)
        {
            var items = await client.FoldersManager.GetFolderItemsAsync(id, 500);

            return new JsonResult(new
            {
                items
            });
        }

        [HttpGet("/getFileInfo/{id}")]
        public async Task<JsonResult> getFileInfo(string id)
        {
            var items = await client.FilesManager.GetInformationAsync(id);

            return new JsonResult(new
            {
                items
            });
        }

        [HttpGet("/downloadFile/{id}")]
        public async Task<JsonResult> downloadFile(string id)
        {
            var items = await client.FilesManager.GetDownloadUriAsync(id);

            return new JsonResult(new
            {
                items
            });
        }

        public IActionResult Error()
        {
            return View();
        }

        public class folderContainer {
            public string Id { get; set; }
            public string Name { get; set; }
            public string Type { get; set; }
        }

    }
}
