<%@ Page Language="C#" Debug="true" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="System.Threading" %>
<%@ Import Namespace="System.Runtime.Caching" %>

<script runat="server">

    private static MemoryCache _memCache = new MemoryCache("ws4kp");

    protected void Page_Load()
    {
        bool OkToProcessRequest = false;

        Page.Response.Clear();

        switch (Page.Request.Url.Host)
        {
            case "localhost":
            case "192.168.2.98":
            case "24.187.197.234":
            case "battaglia.ddns.net":
                OkToProcessRequest = true;
                break;
        }

        if (OkToProcessRequest == false)
        {
            Page.Response.Clear();
            Page.Response.End();
            return;
        }

        //lblTest.Text = Page.Request.Url.ToString();
        string Url = Page.Request.QueryString["u"];
        Uri Uri = new Uri(Url);

        // HOST CHECK
        switch (Uri.Host.ToLower())
        {
            case "forecast.weather.gov":
            case "api.weather.gov":
            case "api.weather.com":
            case "www.aviationweather.gov":
            case "aviationweather.gov":
            case "www.wunderground.com":
            case "api-ak.wunderground.com":
            case "tidesandcurrents.noaa.gov":
            case "l-36.com":
            case "airquality.weather.gov":
            case "airnow.gov":
            case "www.airnowapi.org":
            case "www2.ehs.niu.edu":
            case "alerts.weather.gov":
            case "mesonet.agron.iastate.edu":
            case "tgftp.nws.noaa.gov":
            case "www.cpc.ncep.noaa.gov":
            case "api.usno.navy.mil":
            case "radar.weather.gov":
                // Allowed
                break;
            default:

                if (Url.EndsWith("?rss=1") == false)
                {
                    // Not allowed
                    Page.Response.Clear();
                    Page.Response.StatusCode = (int)System.Net.HttpStatusCode.Forbidden;
                    Page.Response.End();
                    return;
                }

                break;
        }


        string memKey = Url;
        object memData = _memCache.Get(memKey);

        if (memData != null)
        {
            if (Url.EndsWith(".txt") == true)
            {
                Page.Response.Write((string)memData);
            }
            else
            {
                Page.Response.BinaryWrite((byte[])memData);
            }
            Page.Response.End();
            return;
        }

        lblTest.Text = Url;
        //return;

        ////string Data;
        //byte[] Data;

        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls | SecurityProtocolType.Ssl3 | SecurityProtocolType.Tls12;

        WebClient client = new WebClient();

        if (Url.Contains("api.weather.gov") == true)
        {
            //client.Headers.Add("User-Agent", "(WeatherStar 4000+, vbguyny@gmail.com)");
            client.Headers.Add("User-Agent", "(WeatherStar 4000+/v1 (https://battaglia.ddns.net/twc; vbguyny@gmail.com)");
            client.Headers.Add("Accept", "application/vnd.noaa.dwml+xml");
        }
        else
        {
            //client.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36");
            client.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36");

            //client.Headers.Add("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
            //client.Headers.Add("Accept-Language", "en-US,en;q=0.8");
            //client.Headers.Add("Cache-Control", "max-age=0");
        }

        //// Use if weather.gov blocks IP
        //switch (Uri.Host.ToLower())
        //{
        //    case "forecast.weather.gov":
        //    case "wwww.weather.gov":
        //    case "airquality.weather.gov":
        //    case "alerts.weather.gov":
        //    case "radar.weather.gov":
        //    case "www.aviationweather.gov":
        //        Url = "https://us.hidester.com/proxy.php?u=" + HttpUtility.UrlEncode(Url) + "&b=6&f=norefer";
        //        client.Headers.Add(HttpRequestHeader.Cookie, "qa1co2m3mf23banno56catfnb3");
        //        break;
        //}

        CacheItemPolicy cacheItemPolicy = new CacheItemPolicy();

        switch (Uri.Host.ToLower())
        {
            case "alerts.weather.gov":
            case "www.aviationweather.gov":
            case "aviationweather.gov":
            case "mesonet.agron.iastate.edu":
            case "radar.weather.gov":
            case "www2.ehs.niu.edu":
                // Updates frequently
                cacheItemPolicy.AbsoluteExpiration = DateTime.Now.AddMinutes(5);
                break;
            case "tidesandcurrents.noaa.gov":
            case "l-36.com":
            case "airquality.weather.gov":
            case "airnow.gov":
            case "www.airnowapi.org":
            case "tgftp.nws.noaa.gov":
            case "www.cpc.ncep.noaa.gov":
            case "api.usno.navy.mil":
                // Updates less often
                cacheItemPolicy.AbsoluteExpiration = DateTime.Now.AddMinutes(180);
                break;
            default:
                cacheItemPolicy.AbsoluteExpiration = DateTime.Now.AddMinutes(60);
                break;
        }


        string Origin = Uri.Scheme + "://" + Uri.Host;
        //Response.Write(Origin + "<br />");
        //Response.Write(Uri.Scheme + "<br />");
        //Response.End();
        client.Headers.Add("Origin", Origin);

        int maxRetries = 3;
        for (int retryCount = 0; retryCount < maxRetries; )
        {
            //Data = client.DownloadString(Url);
            try
            {
                if (Url.EndsWith(".txt") == true)
                {
                    string Data;
                    Data = client.DownloadString(Url);
                    Page.Response.Write(Data);
                    _memCache.Add(memKey, Data, cacheItemPolicy);
                }
                else
                {
                    byte[] Data;
                    Data = client.DownloadData(Url);
                    Page.Response.BinaryWrite(Data);
                    _memCache.Add(memKey, Data, cacheItemPolicy);
                }
            }
            catch (WebException wex)
            {
                if (wex.Status == WebExceptionStatus.ProtocolError)
                {
                    var response = wex.Response as HttpWebResponse;
                    if (response != null)
                    {
                        int status = (int)response.StatusCode;
                        if (status >= 500 && status <= 599)
                        {
                            retryCount++;
                            if (retryCount < maxRetries)
                            {
                                Thread.Sleep(10000);
                                continue;
                            }
                        }
                    }
                }

                string Message = Url + Environment.NewLine + wex.Message;
                throw new Exception(Message);
            }
            catch (Exception ex)
            {
                string Message = Url + Environment.NewLine + ex.Message;
                throw new Exception(Message);
            }

            break;
        }

        ////Page.Response.Write(Data);
        //Page.Response.BinaryWrite(Data);
        Page.Response.End();
    }
</script>

<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta charset="utf-8" />
    <title></title>    
</head>
<body>
    <form id="form2" runat="server">   
        <asp:Label ID="lblTest" runat="server"></asp:Label>
    </form>
</body>
</html>
