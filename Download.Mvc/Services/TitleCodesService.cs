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
        Task<bool> GetTitleCodes(string userId);
    }
    public class TitleCodesService : ITitleCodesService
    {
        private readonly AuthSettings _authSettings;
        public TitleCodesService(IOptions<AuthSettings> authSettings)
        {
            _authSettings = authSettings.Value;
        }

        public async Task<bool> GetTitleCodes(string userId)
        {
            var iamId = await GetIamId(userId);
            var result = await GetCodes(iamId);
            //var check = result.responseData.results.Any(x => x.positionType == "Regular/Career");
            var check = result.responseData.results.Any(x => x.positionType == "Casual/RESTRICTED-Students");
            return check;
            
        }

        private async Task<string> GetIamId(string userId)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://iet-ws.ucdavis.edu/api/iam/people/prikerbacct/");
                var url = string.Format("search?key={0}&v=1.0&userId={1}", _authSettings.TitleCodesKey, userId);
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
                client.BaseAddress = new Uri("https://iet-ws.ucdavis.edu/api/iam/associations/pps/");
                var url = string.Format("{0}?key={1}&v=1.0", iamId, _authSettings.TitleCodesKey);
                var response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                var contents = await response.Content.ReadAsStringAsync();
                RootObject test = JsonConvert.DeserializeObject<RootObject>(contents);
                return test;
            }
        }
    }
}