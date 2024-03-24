using Microsoft.Extensions.Caching.Memory;
using System.Net;

namespace ws4kp.Middleware
{
    public class CorsMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IMemoryCache _memoryCache;

        public CorsMiddleware(RequestDelegate next, IMemoryCache memoryCache)
        {
            _next = next;
            _memoryCache = memoryCache;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Pre-processing logic here
            // For example, logging the request details
            LogRequest(context);

            if (await IsCorsRequest(context))
            {
                await context.Response.CompleteAsync();
                return;
            }

            // Continue the pipeline execution
            await _next(context);

            // Post-processing logic here
            // For example, modifying the response
            ModifyResponse(context);
        }

        private static void LogRequest(HttpContext context)
        {
            // Implement your request logging logic here
            Console.WriteLine($"LogRequest: {context.Request.Method} {context.Request.Path}");
        }

        private static void ModifyResponse(HttpContext context)
        {
            // Implement your response modification logic here
            Console.WriteLine($"ModifyResponse: {context.Response.StatusCode}");
        }

        private async Task<bool> IsCorsRequest(HttpContext context)
        {
            var response = context.Response;
            var request = context.Request;

            var pathValue = request.Path.Value;
            if (pathValue == null)
            {
                return false;
            }
            else if (!pathValue.Equals("/cors/", StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            var hostName = request.Host.Host.ToLowerInvariant();

            bool okToProcessRequest = false;

            response.Clear();

            switch (hostName)
            {
                case "localhost":
                case "192.168.2.98":
                case "24.187.197.234":
                case "battaglia.ddns.net":
                    okToProcessRequest = true;
                    break;
            }

            if (okToProcessRequest == false)
            {
                response.Clear();
                return true;
            }

            var url = request.Query["u"].FirstOrDefault();
            if (url == null)
            {
                return true;
            }
            var uri = new Uri(url);

            // HOST CHECK
            switch (uri.Host.ToLowerInvariant())
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

                    if (url.EndsWith("?rss=1") == false)
                    {
                        // Not allowed
                        response.Clear();
                        response.StatusCode = (int)HttpStatusCode.Forbidden;
                        return true;
                    }

                    break;
            }


            string memKey = url;
            var memData = _memoryCache.Get(memKey);

            if (memData != null)
            {
                if (url.EndsWith(".txt") == true)
                {
                    await response.WriteAsync((string)memData);
                }
                else
                {
                    await response.Body.WriteAsync((byte[])memData);
                }
                return true;
            }

            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls
                | SecurityProtocolType.Tls12
                | SecurityProtocolType.Tls13;

            var client = new WebClient();
            client.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36");
            
            var expiration = uri.Host.ToLower() switch
                    {
                        "alerts.weather.gov" or 
                        "www.aviationweather.gov" or 
                        "aviationweather.gov" or 
                        "mesonet.agron.iastate.edu" or 
                        "radar.weather.gov" or 
                        "www2.ehs.niu.edu" 
                            => TimeSpan.FromMinutes(5),// Updates frequently
                        "tidesandcurrents.noaa.gov" or 
                        "l-36.com" or 
                        "airquality.weather.gov" or 
                        "airnow.gov" or 
                        "www.airnowapi.org" or 
                        "tgftp.nws.noaa.gov" or 
                        "www.cpc.ncep.noaa.gov" or 
                        "api.usno.navy.mil" 
                            => TimeSpan.FromMinutes(180),// Updates less often
                        _ => TimeSpan.FromMinutes(60),
                    };

            string Origin = $"{uri.Scheme}://{uri.Host}";
            client.Headers.Add("Origin", Origin);

            int maxRetries = 3;
            for (int retryCount = 0; retryCount < maxRetries;)
            {
                try
                {
                    if (url.EndsWith(".txt") == true)
                    {
                        string Data;
                        Data = client.DownloadString(url);
                        await response.WriteAsync(Data);
                        _memoryCache.Set(memKey, Data, expiration);
                    }
                    else
                    {
                        byte[] Data;
                        Data = client.DownloadData(url);
                        await response.Body.WriteAsync(Data);
                        _memoryCache.Set(memKey, Data, expiration);
                    }
                }
                catch (WebException wex)
                {
                    if (wex.Status == WebExceptionStatus.ProtocolError)
                    {
                        if (wex.Response is HttpWebResponse webResponse)
                        {
                            int status = (int)webResponse.StatusCode;
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

                    string Message = $"{url}{Environment.NewLine}{wex.Message}";
                    throw new Exception(Message);
                }
                catch (Exception ex)
                {
                    string Message = $"{url}{Environment.NewLine}{ex.Message}";
                    throw new Exception(Message);
                }

                break;
            }

            return true;
        }
    }

    // Extension method to add the middleware to the pipeline
    public static class CorsMiddlewareExtensions
    {
        public static IApplicationBuilder UseCorsMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CorsMiddleware>();
        }
    }
}