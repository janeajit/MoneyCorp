using System;
using System.Collections.Generic;
using System.Text;

namespace MoneyCorp.Tests.Backend
{
    public class BoredApiResponseObject
    {
        public string activity { get; set; }
        public string type { get; set; }
        public int participants { get; set; }
        public float price { get; set; }
        public string link { get; set; }
        public string key { get; set; }
        public float accessibility { get; set; }
    }
}
