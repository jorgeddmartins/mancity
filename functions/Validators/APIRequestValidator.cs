

using FluentValidation;
namespace OMM.CRM
{
    public class APIRequestValidator : AbstractValidator<APIRequest>
    {
        public APIRequestValidator()
        {
            RuleFor(x => x.DateOfBirth).NotNull();
            RuleFor(x => x.EmailAddress).NotEmpty().EmailAddress();
            RuleFor(x => x.EmailPermission).NotNull().Equal(true);
        }
    }
}
