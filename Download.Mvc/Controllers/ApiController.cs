using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Box.V2;
using Box.V2.Auth;
using Box.V2.Config;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Linq;
using Box.V2.JWTAuth;

namespace Download.Controllers
{
    [Authorize]
    public class ApiController : Controller
    {
        private readonly BoxClient _client;
        private readonly AppSettings _appSettings;
        public ApiController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            _client = Initialize();
        }

        public BoxClient Initialize()
        {
            var config = new BoxConfig(_appSettings.ClientId, _appSettings.ClientSecret, _appSettings.EnterpriseID, _appSettings.PrivateKey, _appSettings.Passphrase, _appSettings.PublicKeyID);

            var session = new BoxJWTAuth(config);

            // runs under context of app user for the DownloadUCD user
            var adminToken = session.AdminToken();
            var client = session.AdminClient(adminToken);

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
        public async Task<JsonResult> PreviewFile(string id)
        {
            var items = await _client.FilesManager.GetPreviewLinkAsync(id);

            return Json(items);
        }

        [HttpGet("api/search/{query}")]
        public async Task<JsonResult> Search(string query)
        {
            List<string> fileExtensionsList = new List<string>();
            fileExtensionsList.Add("md");
            List<string> contentTypeList = new List<string>();
            contentTypeList.Add("name");
            var readme = await _client.SearchManager.SearchAsync(query, fileExtensions: fileExtensionsList, type: "file");
            var folders = await _client.SearchManager.SearchAsync(query, type: "folder");
            var file = await _client.SearchManager.SearchAsync(query, type: "file", contentTypes: contentTypeList);

            var allFiles = readme.Entries.Select(e => new { fileId = e.Id, fileName = e.Name, folderId = e.Parent.Id, folderName = e.Parent.Name })
                .Union(file.Entries.Select(e => new { fileId = e.Id, fileName = e.Name, folderId = e.Parent.Id, folderName = e.Parent.Name })).Distinct();
            var allFolders = folders.Entries.Select(e => new { fileId = string.Empty, fileName = string.Empty, folderId = e.Id, folderName = e.Name });
            var allFilesAndFolders = allFiles.Union(allFolders);
            var grouped = from f in allFilesAndFolders
                          group f by new { f.folderId, f.folderName} into g
                          select new { folder = g.Key, files = g.Where(x => !string.IsNullOrEmpty(x.fileId)) };
            
            return Json(grouped);
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
