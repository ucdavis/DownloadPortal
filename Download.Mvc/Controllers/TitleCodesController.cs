﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Net.Http;
using Newtonsoft.Json;

namespace Download.Controllers
{
    public class TitleCodesController : Controller
    {
        private readonly AuthSettings _authSettings;
        private readonly HttpClient _httpClient;
        public TitleCodesController(IOptions<AuthSettings> authSettings)
        {
            _authSettings = authSettings.Value;
            _httpClient = new HttpClient();
        }

        [HttpGet("titlecodes/{userId}")]
        public async Task<string> GetTitleCodes(string userId)
        {
            var iamId = await GetIamId(userId);
            var result = await GetCodes(iamId);
            return result;

        }

        [HttpGet("titleCodes/iam/{userId}")]
        public async Task<string> GetIamId(string userId)
        {
            var url = "https://iet-ws.ucdavis.edu/api/iam/people/prikerbacct/search?key=" + _authSettings.TitleCodesKey + "&v=1.0&userId=" + userId;
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            var contents = await response.Content.ReadAsStringAsync();
            dynamic test = JsonConvert.DeserializeObject(contents);
            return test.responseData.results[0].iamId;
        }

        [HttpGet("titleCodes/codes/{iamId}")]
        public async Task<string> GetCodes(string iamId)
        {
            var url = "https://iet-ws.ucdavis.edu/api/iam/associations/pps/" + iamId + "?key=" + _authSettings.TitleCodesKey + "&v=1.0";
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            var contents = await response.Content.ReadAsStringAsync();
            dynamic test = JsonConvert.DeserializeObject(contents);
            return test.responseData.results[0].titleCode;
        }
    }
}
