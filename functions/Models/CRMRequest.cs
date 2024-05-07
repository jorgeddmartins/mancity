using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace OMM.CRM
{
    public class CRMRequest
    {
        public string ContactEmail { get; set; }
        public string Source { get; set; }
        public string SubSource { get; set; }
        public string SubSourceEvent { get; set; }
        public bool? GdprConsent { get; set; }
        [JsonConverter(typeof(ManCityDateTimeConverter))]
        public DateTime DateOfBirth { get; set; }
        public string Campaign { get; set; }
        public bool UpdatePreferences { get; set; }
        public List<string> Subscriptions { get; set; }
    }
}
