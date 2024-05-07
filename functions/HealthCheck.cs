using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace OMM.CRM
{
    public class HealthCheck
    {
        private readonly ILogger<SendToCRM> _logger;

        public HealthCheck(ILogger<SendToCRM> log)
        {
            _logger = log;
        }

        [FunctionName("HealthCheck")]
        public IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)][FromBody] APIRequest request)
        {
            _logger.LogInformation("Healthcheck processed a request.");

            return new OkObjectResult("Healthcheck OK");
        }
    }
}

