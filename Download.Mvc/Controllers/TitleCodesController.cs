using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Net.Http;
using Newtonsoft.Json;
using System.Net;
using Download;

namespace Download.Controllers
{
    public class TitleCodesController : Controller
    {
        private readonly AuthSettings _authSettings;
        public TitleCodesController(IOptions<AuthSettings> authSettings)
        {
            _authSettings = authSettings.Value;
        }

        [HttpGet("titlecodes/{userId}")]
        public async Task<string> GetTitleCodes(string userId)
        {
            var iamId = await GetIamId(userId);
            var result = await GetCodes(iamId);
            if(result)
            {
                return "Success";
            }
            else
            {
                return "Fail";
            }

        }

        [HttpGet("titleCodes/iam/{userId}")]
        public async Task<string> GetIamId(string userId)
        {
            using (var client = new HttpClient())
            {
                var url = "https://iet-ws.ucdavis.edu/api/iam/people/prikerbacct/search?key=" + _authSettings.TitleCodesKey + "&v=1.0&userId=" + userId;
                var response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                var contents = await response.Content.ReadAsStringAsync();
                dynamic test = JsonConvert.DeserializeObject(contents);
                return test.responseData.results[0].iamId;
            }
        }
        
        [HttpGet("titleCodes/iam3/{userId}")]
        public async Task<string> GetIamId3(string userId)
        {
            using (var client = new HttpClient())
            {
                var url = "https://iet-ws-3.ucdavis.edu/api/iam/people/prikerbacct/search?key=" + _authSettings.TitleCodesKey + "&v=1.0&userId=" + userId;
                var response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                var contents = await response.Content.ReadAsStringAsync();
                dynamic test = JsonConvert.DeserializeObject(contents);
                return test.responseData.results[0].iamId;
            }
        }
        
        [HttpGet("titleCodes/iam4/{userId}")]
        public async Task<string> GetIamId4(string userId)
        {
            using (var client = new HttpClient())
            {
                var url = "https://iet-ws-4.ucdavis.edu/api/iam/people/prikerbacct/search?key=" + _authSettings.TitleCodesKey + "&v=1.0&userId=" + userId;
                var response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                var contents = await response.Content.ReadAsStringAsync();
                dynamic test = JsonConvert.DeserializeObject(contents);
                return test.responseData.results[0].iamId;
            }
        }
        
        [HttpGet("titleCodes/iamip/{userId}")]
        public async Task<string> GetIamIp(string userId)
        {
            using (var client = new HttpClient())
            {
                var url = "https://128.120.41.205/api/iam/people/prikerbacct/search?key=" + _authSettings.TitleCodesKey + "&v=1.0&userId=" + userId;
                var response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                var contents = await response.Content.ReadAsStringAsync();
                dynamic test = JsonConvert.DeserializeObject(contents);
                return test.responseData.results[0].iamId;
            }
        }

        [HttpGet("titleCodes/codes/{iamId}")]
        public async Task<bool> GetCodes(string iamId)
        {
            using (var client = new HttpClient())
            {
                var url = "https://iet-ws.ucdavis.edu/api/iam/associations/pps/" + iamId + "?key=" + _authSettings.TitleCodesKey + "&v=1.0";
                var response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                var contents = await response.Content.ReadAsStringAsync();
                RootObject test = JsonConvert.DeserializeObject<RootObject>(contents);
                var titleCodes = test.responseData.results.Any(x => x.positionType == "Regular/Career");
                return titleCodes;
            }
        }
    }
}
