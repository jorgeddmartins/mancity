using System.Net.Http;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

namespace OMM.CRM
{
    public class SendToCRM
    {
        private readonly ILogger<SendToCRM> _logger;

        public SendToCRM(ILogger<SendToCRM> log)
        {
            _logger = log;
        }

        [FunctionName("SendToCRM")]
        [OpenApiOperation(operationId: "Run")]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
        [OpenApiRequestBody("application/json", typeof(APIRequest))]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "text/plain", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)][FromBody] APIRequest request)
        {
            _logger.LogInformation("SendCRM processed a request.");

            var validator = new APIRequestValidator();
            var validationResult = validator.Validate(request);

            if (!validationResult.IsValid)
            {
                return new BadRequestObjectResult(validationResult.Errors.Select(e => new
                {
                    Field = e.PropertyName,
                    Error = e.ErrorMessage
                }));
            }

            var handler = new CRMHandler();

            try
            {
                await handler.Send(request);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "CRM Rejected Request");
                return new StatusCodeResult(502);
            }

            return new OkResult();
        }
    }
}

