using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Text;

namespace OMM.CRM
{
    public class CRMHandler
    {
        private readonly static HttpClient _httpClient = new HttpClient();
        private readonly string _crmUrl;
        public CRMHandler()
        {
            _crmUrl = System.Environment.GetEnvironmentVariable("MANCITY_API");
            var key = System.Environment.GetEnvironmentVariable("MANCITY_KEY");
            _httpClient.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", key);
        }

        public async Task Send(APIRequest request)
        {
            var payload = GenerateManCityRequest(request);
            var jsonContent = JsonConvert.SerializeObject(payload, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
            var res = await _httpClient.PostAsync(_crmUrl, content);
            res.EnsureSuccessStatusCode();
        }

        private CRMRequest GenerateManCityRequest(APIRequest request)
        {
            var targetReqest = new CRMRequest();
            targetReqest.ContactEmail = request.EmailAddress;
            targetReqest.DateOfBirth = request.DateOfBirth;

            targetReqest.GdprConsent = true;
            targetReqest.UpdatePreferences = true;

            // Static Fields
            targetReqest.Campaign = "PoseWithThePros";
            targetReqest.Source = "OMM";
            targetReqest.SubSource = "Kiosk";
            targetReqest.SubSourceEvent = "DownloadPhoto";
            targetReqest.Subscriptions = new List<string>() { "Consent-Email" };

            return targetReqest;
        }
    }
}
