using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;


namespace MoneyCorp.Tests.Backend
{
    [TestFixture]
    public class GetActivityTests
    {
        private static string[] generateActivity;
        private static List<string> activityValue = new List<string>();
        
        [Test]
        public async Task ThreeActivitiesForSocialTypeAndForTwoParticipants()
        {

            // Test case is to make sure it is generating 3 distinct activities for social type and 2 participants
            do
            {
                string paramNameValue = "social"; string paramNameParticipantsValue = "2";
                var getActivitiesForSocialTypeResponse = new HttpClientTool().SendGetRequestAsync(
                    paramNameValue, paramNameParticipantsValue);
                Assert.That(getActivitiesForSocialTypeResponse.Result.type, Is.EqualTo(paramNameValue));
                Assert.That(getActivitiesForSocialTypeResponse.Result.participants, Is.EqualTo(Int32.Parse(paramNameParticipantsValue)));
                activityValue.Add(getActivitiesForSocialTypeResponse.Result.activity);
                generateActivity = activityValue.Distinct().ToArray();
            }
            while (generateActivity.Length < 3);
            Assert.That(generateActivity.Length,Is.EqualTo(3));
        }
    }
}