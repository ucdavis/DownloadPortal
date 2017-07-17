using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Box.V2;
using Box.V2.Auth;
using Box.V2.Config;
using Box.V2.Models;


namespace Download
{
    public class AppSettings
    {
        public string ClientId { get; set;}
        public string ClientSecret { get; set; }
        public string Session { get; set; }
        public string TopFolderId { get; set; }
    }
}
