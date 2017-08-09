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

namespace Download.Services
{
    public interface ITitleCodesService
    {
        Task GetTitleCodes(string userId);
    }
    public class TitleCodesService : ITitleCodesService
    {
        private readonly AuthSettings _authSettings;
        public TitleCodesService(IOptions<AuthSettings> authSettings)
        {
            _authSettings = authSettings.Value;
        }

        public Task GetTitleCodes(string userId)
        {
            return GenerateCodes(userId);
        }

        private async Task GenerateCodes(string userId)
        {
            var iamId = await GetIamId(userId);
            var result = await GetCodes(iamId);
            var check = result.responseData.results.Any(x => x.positionType == "Regular/Career");
            if (!check)
                throw new NotImplementedException();
        }

        private async Task<string> GetIamId(string userId)
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

        private async Task<RootObject> GetCodes(string iamId)
        {
            using (var client = new HttpClient())
            {
                var url = "https://iet-ws.ucdavis.edu/api/iam/associations/pps/" + iamId + "?key=" + _authSettings.TitleCodesKey + "&v=1.0";
                var response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                var contents = await response.Content.ReadAsStringAsync();
                RootObject test = JsonConvert.DeserializeObject<RootObject>(contents);
                //var titleCodes = test.responseData.results.Any(x => x.positionType == "Regular/Career");
                return test;
            }
        }
    }
}