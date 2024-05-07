using Newtonsoft.Json.Converters;

namespace OMM.CRM
{
    public class ManCityDateTimeConverter : IsoDateTimeConverter
    {
        public ManCityDateTimeConverter()
        {
            base.DateTimeFormat = "yyyy-MM-dd";
        }
    }
}