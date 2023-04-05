using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;

namespace MoneyCorp.Tests.Backend
{
    public class HttpClientTool
    {
        private const string baseurl = "http://www.boredapi.com/api/activity/";
        private readonly HttpClient _httpClient = new HttpClient();
        private HttpResponseMessage _getActivitiesForSocialTypeResponse;
        /// <summary>
        /// SendGetRequestAsync method is used to send the get request for the client and converting the object to readable format
        /// </summary>
        /// <param name="typeName"></param>
        /// <param name="participantsValue"></param>
        /// <returns></returns>
        public async Task<BoredApiResponseObject> SendGetRequestAsync(string typeName,string participantsValue)
        {
           ///converting the values to query parameters
            var query = new Dictionary<string, string>()
            {
                ["type"] = typeName,
                ["participants"] = participantsValue
            };
            ///calling api
            try
            {
                _getActivitiesForSocialTypeResponse =
                    await _httpClient.GetAsync(QueryHelpers.AddQueryString(baseurl, query));
            }
            catch (Exception e)
            {
               Console.WriteLine(e.Message);
               throw;
            } 
            ///getting the response 
            var readTheResponseContent = await _getActivitiesForSocialTypeResponse.Content.ReadAsStringAsync();
            //converting to object format
           var  convertToBoredApiResponseFormat =
                JsonConvert.DeserializeObject<BoredApiResponseObject>(readTheResponseContent);
           return convertToBoredApiResponseFormat;
        }

    }
}
