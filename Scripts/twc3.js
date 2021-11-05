/// <reference path="jquery-3.1.0.min.js" />
/// <reference path="Timer.js" />

//timemachine.config({
//    dateString: 'February 19, 2017 11:12:59',
//    tick: true,
//});

var _DayShortNames = { 'Sunday': 'Sun', 'Monday': 'Mon', 'Tuesday': 'Tue', 'Wednesday': 'Wed', 'Thursday': 'Thu', 'Friday': 'Fri', 'Saturday': 'Sat' };
var _DayLongNames = { 'Sun': 'Sunday', 'Mon': 'Monday', 'Tue': 'Tuesday', 'Wed': 'Wednesday', 'Thu': 'Thursday', 'Fri': 'Friday', 'Sat': 'Saturday' };
var _MonthShortNames = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sep', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' };
var _MonthLongNames = { 'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April', 'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August', 'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December' };

var canvasProgress;
var divProgress;

var tblRegionalCurrentMap;
var divRegionalCurrentMap;
var canvasRegionalObservations;

var tblRegionalForecastMap;
var divRegionalForecastMap1;
var divRegionalForecastMap2;
var canvasRegionalForecast1;
var canvasRegionalForecast2;

var tblDopplerRadarMap;
var divDopplerRadarMap;
var canvasLocalRadar;

var btnGetCurrentWeather;
var tblCurrentWeather;
var divTemperature;
var divStation;
var divConditions;
var divHumidity;
var divIcon;
var divDewpoint;
var divCeiling;
var divVisibility;
var divWind;
var divPressure;
var divGust;
var divHeatIndex;
var canvasCurrentWeather;

var tblExtendedForecast;
var divDayShortName1;
var divDayShortName2;
var divDayShortName3;
var divIcon1;
var divIcon2;
var divIcon3;
var divConditions1;
var divConditions2;
var divConditions3;
var divLo1;
var divLo2;
var divLo3;
var divHi1;
var divHi2;
var divHi3;
var canvasExtendedForecast1;
var canvasExtendedForecast2;

var tblLocalForecast;
var divLocalForecast1;
var divLocalForecast2;
var divLocalForecast3;
var canvasLocalForecast;

var tblHazards;
var divHazards;
var tblHazardsScroll;
var divHazardsScroll;
var canvasHazards;

var tblSunData;
var divSunriseTodayName;
var divSunsetTomorrowName;
var divSunrise;
var divSunriseToday;
var divSunriseTomorrow;
var divSunset;
var divSunsetToday;
var divSunsetTomorrow;

var tblMoonData;
var divMoonPhase1;
var divMoonPhase2;
var divMoonPhase3;
var divMoonPhase4;
var divMoonDate1;
var divMoonDate2;
var divMoonDate3;
var divMoonDate4;
var canvasAlmanac;
var canvasAlmanacTides;
var canvasOutlook;
var canvasMarineForecast;
var canvasAirQuality;

var tblTravelCities;
var divTravelCitiesLow;
var divTravelCitiesHigh;
var tblTravelCitiesScroll;
var divTravelCitiesScroll;
var canvasTravelForecast;

var tblOutlook;
var divOutlookTemp;
var cnvOutlookTemp;
var divOutlookPrcp;
var cnvOutlookPrcp;

var tblRegionalObservations;
var divRegionalObservationsCityName;
var divRegionalObservationsTemperature;
var divRegionalObservationsConditions;
var divRegionalObservationsWindDirection;
var divRegionalObservationsWindSpeed;
var canvasLatestObservations;

var _MaximumRegionalStations = 7;


var _WeatherParameters = null;

var _AllowNavigate = true;
var _IsScrollingIntoView = false;
var _LastDateScrolledIntoView = new Date();

var _DopplerRadarInterval = null;
var _DopplerRadarImageIndex = 0;
var _DopplerRadarImageMax = 6;

var LoadStatuses = {
    Loading: 0,
    Loaded: 1,
    Failed: 2,
    NoData: 3,
};

var _LogoImage = null;
var _NoaaImage = null;
var _UpdateWeatherCanvasInterval = null;
//var _UpdateWeatherUpdateMs = 500;
var _UpdateWeatherUpdateMs = 50;
var canvasBackGroundDateTime = null;
var canvasBackGroundCurrentConditions = null;

var CurrentConditionTypes = {
    Title: 0,
    Conditions: 1,
    Temperature: 2,
    HumidityDewpoint: 3,
    BarometricPressure: 4,
    Wind: 5,
    VisibilityCeiling: 6,
    MonthPrecipitation: 7,
};
var _UpdateWeatherCurrentConditionType = CurrentConditionTypes.Title;
var _UpdateWeatherCurrentConditionCounterMs = 0;

var _UpdateCustomScrollTextMs = 0;
var _UpdateScrollHazardTextMs = 0;

//var _UpdateTravelCitiesInterval = 30;
var _UpdateTravelCitiesInterval = 150;
var _UpdateTravelCitiesCounterMs = 0;
var _UpdateTravelCitiesY = 0;

//var _UpdateHazardsInterval = 30;
var _UpdateHazardsInterval = 150;
var _UpdateHazardsCounterMs = 0;
var _UpdateHazardsY = 0;

var _UpdateLocalForecastIndex = 0;
var _UpdateLocalForecastCounterMs = 0;

var CanvasTypes = {
    Progress: 0,
    CurrentWeather: 1,
    LatestObservations: 2,
    TravelForecast: 3,
    RegionalForecast1: 4,
    RegionalForecast2: 5,
    RegionalObservations: 6,
    LocalForecast: 7,
    MarineForecast: 8,
    ExtendedForecast1: 9,
    ExtendedForecast2: 10,
    Almanac: 11,
    AlmanacTides: 12,
    AirQuality: 13,
    Outlook: 14,
    LocalRadar: 15,
    Hazards: 16,
};
var _FirstCanvasType = CanvasTypes.Progress;
var _LastCanvasType = CanvasTypes.Hazards;
var _CurrentCanvasType = _FirstCanvasType;
var _CurrentPosition = 0.0;
var _PreviousPosition = 0.0;

var _IsPlaying = false;
var _PlayIntervalId = null;

var _Url = null;

var _IsAudioPlaying = false;
var _AudioPlayIntervalId = null;
var _AudioPlayInterval = 100;
var _AudioFadeOutIntervalId = null;
var _MusicUrls = [];
var _MusicUrlsTemp = [];
var audMusic = null;
var _AudioContext = null;
var _AudioBufferSource = null;
var _AudioDuration = 0;
var _AudioCurrentTime = 0;
var _AudioGain = null;
var _AudioRefreshIntervalId = null;

var _IsBeepPlaying = false;
var _BeepRefreshIntervalId = null;
var _BeepContext = null;
var _BeepBufferSource = null;
var _BeepDuration = 0;
var _BeepCurrentTime = 0;
var _BeepGain = null;
var audBeep = null;

var _IsNarrationPlaying = false;
var _Utterance = false;
var _CurrentUtterance = false;
var _CurrentUtteranceId = null;
var _IsSpeaking = false;

var OperatingSystems = {
    Unknown: 0,
    Windows: 1,
    MacOS: 2,
    Linux: 3,
    Unix: 4,
    iOS: 5,
    Andriod: 6,
    WindowsPhone: 7,
};
_OperatingSystem = OperatingSystems.Unknown;
var _UserAgent = window.navigator.userAgent;
if (_UserAgent.indexOf("Win") != -1) _OperatingSystem = OperatingSystems.Windows;
if (_UserAgent.indexOf("Mac") != -1) _OperatingSystem = OperatingSystems.MacOS;
if (_UserAgent.indexOf("X11") != -1) _OperatingSystem = OperatingSystems.Unix;
if (_UserAgent.indexOf("Linux") != -1) _OperatingSystem = OperatingSystems.Linux;
if (_UserAgent.indexOf("iPad") != -1) _OperatingSystem = OperatingSystems.iOS;
if (_UserAgent.indexOf("iPhone") != -1) _OperatingSystem = OperatingSystems.iOS;
if (_UserAgent.indexOf("iPod") != -1) _OperatingSystem = OperatingSystems.iOS;
if (_UserAgent.toLowerCase().indexOf("android") != -1) _OperatingSystem = OperatingSystems.Andriod;
if (_UserAgent.indexOf("Windows Phone") != -1) _OperatingSystem = OperatingSystems.WindowsPhone;
//alert(_UserAgent);

var getParameterByName = function (name, url)
{
    if (!url) url = window.location.href;
    url = decodeURIComponent(url);
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

var GetCurrentWeather = function(WeatherParameters)
{
    var Url = "https://forecast.weather.gov/MapClick.php?FcstType=dwml";
    Url += "&lat=" + WeatherParameters.Latitude.toString();
    Url += "&lon=" + WeatherParameters.Longitude.toString();
    //Url = "cors/?u=" + encodeURIComponent(Url);

    var success = function (xml)
    {
        var $xml = $(xml);
        console.log(xml);
        //console.log($xml);

        WeatherParameters.WeatherDwmlParser = new WeatherDwmlParser($xml);
        console.log(WeatherParameters.WeatherDwmlParser);

        if (WeatherParameters.WeatherDwmlParser.data_current_observations.parameters.conditions_icon.icon_link.length == 0
            || WeatherParameters.WeatherDwmlParser.data_current_observations.parameters.conditions_icon.icon_link[0] == "NULL"
            || WeatherParameters.WeatherDwmlParser.data_current_observations.parameters.temperature_apparent.value[0] == "NA")
        {
            console.error("No current conditions data for '" + WeatherParameters.WeatherDwmlParser.data_current_observations.location.area_description + "'");

            GetClosestCurrentWeather(WeatherParameters);
            return;
        }

        //WeatherParameters.WeatherCurrentConditions = new WeatherCurrentConditions(WeatherParameters.WeatherDwmlParser);
        //console.log(wco);
        //PopulateCurrentConditions(wco);

        WeatherParameters.WeatherExtendedForecast = new WeatherExtendedForecast(WeatherParameters.WeatherDwmlParser);
        console.log(WeatherParameters.WeatherExtendedForecast);
        //PopulateExtendedForecast(WeatherParameters);
        PopulateExtendedForecast(WeatherParameters, 1);
        PopulateExtendedForecast(WeatherParameters, 2);

        //WeatherParameters.Progress.FourDayForecast = LoadStatuses.Loaded;

        //WeatherParameters.WeatherLocalForecast = new WeatherLocalForecast(WeatherParameters.WeatherDwmlParser);
        //console.log(WeatherParameters.WeatherLocalForecast);
        //PopulateLocalForecast(WeatherParameters.WeatherLocalForecast);

        GetWeatherMetar(WeatherParameters);

        //GetWeatherHazards(WeatherParameters);
    };

    // Load the xml file using ajax 
    $.ajaxCORS({
        type: "GET",
        url: Url,
        dataType: "xml",
        crossDomain: true,
        cache: false,
        success: success,
        error: function (xhr, error, errorThrown)
        {
            if (xhr.readyState == 4 && xhr.status == 200)
            {
                if (error == "parsererror")
                {
                    var source = xhr.responseText;
                    source = source.replaceAll(" & ", " &amp; ");
                    var parser = new DOMParser();
                    var xml = parser.parseFromString(source, "application/xml");
                    success(xml);
                    return;
                }
            }

            console.error("GetCurrentWeather failed: " + errorThrown);
            WeatherParameters.Progress.FourDayForecast = LoadStatuses.Failed;
        }
    });
};

var GetClosestCurrentWeather = function (WeatherParameters, Distance)
{
    var FoundClosetStation = false;

    if (!Distance)
    {
        Distance = 5;
    }

    if (!WeatherParameters.SkipClosestWeatherStationIds)
    {
        WeatherParameters.SkipClosestWeatherStationIds = [];
    }

    // Get the current weather from the next closest station.
    var Url = "https://www.aviationweather.gov/adds/dataserver_current/httpparam?datasource=metars&requesttype=retrieve&format=xml&hoursBeforeNow=1";
    Url += "&radialDistance=" + Distance.toString();
    Url += ";" + WeatherParameters.Longitude;
    Url += "," + WeatherParameters.Latitude;
    //Url = "cors/?u=" + encodeURIComponent(Url);

    // Load the xml file using ajax 
    $.ajaxCORS({
        type: "GET",
        url: Url,
        dataType: "xml",
        crossDomain: true,
        cache: false,
        success: function (xml)
        {
            var $xml = $(xml);
            //console.log(xml);

            if ($xml.find("response").find("errors").find("error").length != 0)
            {
                console.error($xml.find("response").find("errors").text());
                return;
            }

            //var WeatherRegionalMetarsParser = new WeatherRegionalMetarsParser($xml);
            $xml.find("response").find("data").find("METAR").each(function ()
            {
                var data_METAR = $(this);
                var StationId = data_METAR.find("station_id").text();
                //var LatLons = data_METAR.find("latitude").text() + "," + data_METAR.find("longitude").text();
                var Latitude = data_METAR.find("latitude").text();
                var Longitude = data_METAR.find("longitude").text();
                var raw_text = data_METAR.find("raw_text").text();
                var temp_c = data_METAR.find("temp_c").text();

                if (raw_text == "")
                {
                    return true;
                }

                if (temp_c == "")
                {
                    return true;
                }

                if (WeatherParameters.SkipClosestWeatherStationIds.indexOf(StationId) != -1)
                {
                    return true;
                }


                //if (StationId == WeatherParameters.StationId)
                //{
                //    return true;
                //}
                //else if (WeatherParameters.WeatherCurrentRegionalConditions.SkipStationIds.indexOf(StationId) != -1)
                //{
                //    return true;
                //}

                //if (WeatherParameters.WeatherCurrentRegionalConditions.LatLons.indexOf(LatLons) != -1)
                //{
                //    return true;
                //}

                //if (WeatherParameters.WeatherCurrentRegionalConditions.StationIds.indexOf(StationId) == -1)
                //{
                //    WeatherParameters.WeatherCurrentRegionalConditions.StationIds.push(StationId);
                //    WeatherParameters.WeatherCurrentRegionalConditions.LatLons.push(LatLons);
                //    WeatherParameters.WeatherCurrentRegionalConditions.WeatherMetarsParser[StationId] = new WeatherMetarsParser($xml, StationId);
                //}

                //if (WeatherParameters.WeatherCurrentRegionalConditions.StationIds.length >= Total)
                //{
                //    return false;
                //}

                FoundClosetStation = true;
                WeatherParameters.Latitude = Latitude;
                WeatherParameters.Longitude = Longitude;
                WeatherParameters.SkipClosestWeatherStationIds.push(StationId);

                return false;
            });

            if (FoundClosetStation == true)
            {
                GetCurrentWeather(WeatherParameters);
            }
            else
            {
                // Stop if the distance is at 100 miles.
                if (Distance == 100)
                {
                    //throw "GetClosestCurrentWeather unable to find weather upto 100 miles";
                    console.error("GetClosestCurrentWeather unable to find weather upto 100 miles");

                    WeatherParameters.WeatherExtendedForecast = new WeatherExtendedForecast(WeatherParameters.WeatherDwmlParser);
                    console.log(WeatherParameters.WeatherExtendedForecast);
                    PopulateExtendedForecast(WeatherParameters, 1);
                    PopulateExtendedForecast(WeatherParameters, 2);

                    GetWeatherMetar(WeatherParameters);
                    return;
                }

                // Increase distance by 5 miles.
                GetClosestCurrentWeather(WeatherParameters, Distance + 5);
            }

        },
        error: function (xhr, error, errorThrown)
        {
            console.error("GetCurrentWeather for closest failed: " + errorThrown);
        }
    });

};

//var GetMonthPrecipitation = function (WeatherParameters)
//{
//    var Now = new Date();
//    var Url = "https://www.wunderground.com/history/airport/";
//    Url += WeatherParameters.StationId + "/";
//    Url += Now.getFullYear().pad() + "/";
//    Url += (Now.getMonth() + 1).pad(2) + "/";
//    Url += Now.getDate().pad(2) + "/";
//    Url += "MonthlyHistory.html";
//    //Url = "cors/?u=" + encodeURIComponent(Url);

//    // Load the xml file using ajax 
//    $.ajaxCORS({
//        type: "GET",
//        url: Url,
//        dataType: "html",
//        crossDomain: true,
//        cache: false,
//        success: function (html)
//        {
//            var $html = $(html);
//            //$html.find("img").attr("src", ""); // Prevents the browser from loading any images on this page.
//            $html.find("[src]").attr("src", ""); // Prevents the browser from loading any images on this page.

//            WeatherParameters.WeatherMonthlyTotalsParser = new WeatherMonthlyTotalsParser($html);
//            console.log(WeatherParameters.WeatherMonthlyTotalsParser);

//            WeatherParameters.WeatherMonthlyTotals = new WeatherMonthlyTotals(WeatherParameters.WeatherMonthlyTotalsParser);
//            console.log(WeatherParameters.WeatherMonthlyTotals);
//            //PopulateCurrentConditions(WeatherParameters.WeatherMonthlyTotals);

//            // Check to see if we need to also parse the Almanac information
//            if (WeatherParameters.Progress.Almanac != LoadStatuses.Loaded)
//            {
//                if (WeatherParameters.WeatherMonthlyTotalsParser.Precipitation == "")
//                {
//                    WeatherParameters.Progress.Almanac = LoadStatuses.NoData;
//                    GetCurrentWeather(WeatherParameters);
//                    ShowRegionalMap(_WeatherParameters);
//                    return;
//                }

//                WeatherParameters.MoonPhasesParser = new MoonPhasesParser2($html);
//                console.log(WeatherParameters.MoonPhasesParser);

//                WeatherParameters.SunRiseSetParserToday = new SunRiseSetParser2($html);
//                console.log(WeatherParameters.SunRiseSetParserToday);

//                var Now = new Date();
//                Now = Now.addDays(1);
//                var Url = "https://www.wunderground.com/history/airport/";
//                Url += WeatherParameters.StationId + "/";
//                Url += Now.getFullYear().pad() + "/";
//                Url += (Now.getMonth() + 1).pad(2) + "/";
//                Url += Now.getDate().pad(2) + "/";
//                Url += "MonthlyHistory.html";
//                //Url = "cors/?u=" + encodeURIComponent(Url);
//                $.ajaxCORS({
//                    type: "GET",
//                    url: Url,
//                    dataType: "html",
//                    crossDomain: true,
//                    cache: false,
//                    success: function (html)
//                    {
//                        var $html = $(html);
//                        $html.find("[src]").attr("src", ""); // Prevents the browser from loading any images on this page.

//                        WeatherParameters.SunRiseSetParserTomorrow = new SunRiseSetParser2($html);
//                        console.log(WeatherParameters.SunRiseSetParserTomorrow);

//                        WeatherParameters.AlmanacInfo = new AlmanacInfo(WeatherParameters.MoonPhasesParser, WeatherParameters.SunRiseSetParserToday, WeatherParameters.SunRiseSetParserTomorrow);
//                        console.log(WeatherParameters.AlmanacInfo);
//                        //PopulateAlmanacInfo(WeatherParameters);

//                        GetOutlook(WeatherParameters);
//                        //GetTideInfo(WeatherParameters);

//                        //GetCurrentWeather(WeatherParameters);
//                        //ShowRegionalMap(_WeatherParameters);
//                    },
//                    error: function (xhr, error, errorThrown)
//                    {
//                        console.error("Getting SunRiseSetParserTomorrow failed: " + errorThrown);
//                    }
//                });
//            }

//        },
//        error: function (xhr, error, errorThrown)
//        {
//            console.error("GetMonthPrecipitation failed: " + errorThrown);
//        }
//    });
//};

var GetMonthPrecipitation = function (WeatherParameters) {
    var Now = new Date();
    var FirstOfMonth = new Date(Now.getFullYear(), Now.getMonth(), 1);
    var LastOfMonth = new Date(Now.getFullYear(), Now.getMonth() + 1, 1).addDays(-1);

    //https://api.weather.com/v3/location/near?apiKey=6532d6454b8aa370768e63d6ba5a832e&geocode=40.83%2C-73.02&product=airport&subproduct=major&format=json
    var Url = "https://api.weather.com/v3/location/near?apiKey=6532d6454b8aa370768e63d6ba5a832e&geocode=";
    Url += WeatherParameters.Latitude.toString() + "%2C";
    Url += WeatherParameters.Longitude.toString();
    Url += "&product=airport&subproduct=major&format=json";
    $.ajaxCORS({
        type: "GET",
        url: Url,
        dataType: "json",
        crossDomain: true,
        cache: false,
        success: function (json) {
            var AirportName = json.location.airportName[0];
            var AirportCode = json.location.iataCode[0];
            WeatherParameters.AirportCode = AirportCode;

            //https://forecast.weather.gov/product.php?site=NWS&issuedby=ISP&product=CLI&format=txt&version=1&glossary=1&highlight=off
            var Url = "https://forecast.weather.gov/product.php?site=NWS&issuedby=";
            Url += AirportCode;
            Url += "&product=CLI&format=txt&version=1&glossary=1&highlight=off";
            $.ajaxCORS({
                type: "GET",
                url: Url,
                dataType: "text",
                crossDomain: true,
                cache: false,
                success: function (text) {

                    WeatherParameters.WeatherMonthlyTotalsParser = new WeatherMonthlyTotalsParser(text);
                    console.log(WeatherParameters.WeatherMonthlyTotalsParser);

                    WeatherParameters.WeatherMonthlyTotals = new WeatherMonthlyTotals(WeatherParameters.WeatherMonthlyTotalsParser);
                    console.log(WeatherParameters.WeatherMonthlyTotals);
                    //PopulateCurrentConditions(WeatherParameters.WeatherMonthlyTotals);

                    // Check to see if we need to also parse the Almanac information
                    if (WeatherParameters.Progress.Almanac != LoadStatuses.Loaded) {
                        if (WeatherParameters.WeatherMonthlyTotalsParser.Precipitation === "") {
                            WeatherParameters.Progress.Almanac = LoadStatuses.NoData;
                            GetCurrentWeather(WeatherParameters);
                            ShowRegionalMap(_WeatherParameters);
                            return;
                        }

                        //https://api.weather.com/v2/astro?apiKey=6532d6454b8aa370768e63d6ba5a832e&geocode=40.81999969%2C-73&days=1&date=20181223&format=json
                        //This also has the moon and sun data: https://api.weather.com/v3/wx/forecast/daily/3day?language=en-US&apiKey=6532d6454b8aa370768e63d6ba5a832e&geocode=40.83%2C-73.02&units=e&format=json
                        var Url = "https://api.weather.com/v2/astro?apiKey=6532d6454b8aa370768e63d6ba5a832e&geocode=";
                        Url += WeatherParameters.Latitude.toString() + "%2C";
                        Url += WeatherParameters.Longitude.toString();
                        Url += "&days=1&date=" + Now.getFullYear().pad() + (Now.getMonth() + 1).pad(2) + Now.getDate().pad(2) + "&format=json";

                        // Load the xml file using ajax 
                        $.ajaxCORS({
                            type: "GET",
                            url: Url,
                            dataType: "json",
                            crossDomain: true,
                            cache: false,
                            success: function (json) {
                                WeatherParameters.MoonPhasesParser = new MoonPhasesParser3(json);
                                console.log(WeatherParameters.MoonPhasesParser);

                                WeatherParameters.SunRiseSetParserToday = new SunRiseSetParser3(json);
                                console.log(WeatherParameters.SunRiseSetParserToday);

                                var Now = new Date();
                                Now = Now.addDays(1);
                                //https://api.weather.com/v2/astro?apiKey=6532d6454b8aa370768e63d6ba5a832e&geocode=40.81999969%2C-73&days=1&date=20181223&format=json
                                var Url = "https://api.weather.com/v2/astro?apiKey=6532d6454b8aa370768e63d6ba5a832e&geocode=";
                                Url += WeatherParameters.Latitude.toString() + "%2C";
                                Url += WeatherParameters.Longitude.toString();
                                Url += "&days=1&date=" + Now.getFullYear().pad() + (Now.getMonth() + 1).pad(2) + Now.getDate().pad(2) + "&format=json";

                                $.ajaxCORS({
                                    type: "GET",
                                    url: Url,
                                    dataType: "json",
                                    crossDomain: true,
                                    cache: false,
                                    success: function (json) {
                                        WeatherParameters.SunRiseSetParserTomorrow = new SunRiseSetParser3(json);
                                        console.log(WeatherParameters.SunRiseSetParserTomorrow);

                                        WeatherParameters.AlmanacInfo = new AlmanacInfo(WeatherParameters.MoonPhasesParser, WeatherParameters.SunRiseSetParserToday, WeatherParameters.SunRiseSetParserTomorrow);
                                        console.log(WeatherParameters.AlmanacInfo);

                                        GetOutlook(WeatherParameters);
                                    },
                                    error: function (xhr, error, errorThrown) {
                                        console.error("Getting SunRiseSetParserTomorrow failed: " + errorThrown);
                                    }
                                });
                            },
                            error: function (xhr, error, errorThrown) {
                                console.error("Getting SunRiseSetParserTomorrow failed: " + errorThrown);
                            }
                        });
                    }
                },
                error: function (xhr, error, errorThrown) {
                    console.error("GetMonthPrecipitation failed: " + errorThrown);
                }
            });

        },
        error: function (xhr, error, errorThrown) {
            console.error("GetMonthPrecipitation failed: " + errorThrown);
        }
    });

    ////https://api-ak.wunderground.com/api/d8585d80376a429e/history_2018120120181231/lang:EN/units:english/bestfct:1/v:2.0/q/KHWV.json?showObs=0&ttl=120
    //var Url = "https://api-ak.wunderground.com/api/d8585d80376a429e/history_";
    //Url += FirstOfMonth.getFullYear().pad() + (FirstOfMonth.getMonth() + 1).pad(2) + FirstOfMonth.getDate().pad(2);
    //Url += LastOfMonth.getFullYear().pad() + (LastOfMonth.getMonth() + 1).pad(2) + LastOfMonth.getDate().pad(2);
    //Url += "/lang:EN/units:english/bestfct:1/v:2.0/q/" + WeatherParameters.ZipCode + ".json?showObs=0&ttl=120";

    //// Load the xml file using ajax 
    //$.ajaxCORS({
    //    type: "GET",
    //    url: Url,
    //    dataType: "json",
    //    crossDomain: true,
    //    cache: false,
    //    success: function (json) {
    //        WeatherParameters.WeatherMonthlyTotalsParser = new WeatherMonthlyTotalsParser(json);
    //        console.log(WeatherParameters.WeatherMonthlyTotalsParser);

    //        WeatherParameters.WeatherMonthlyTotals = new WeatherMonthlyTotals(WeatherParameters.WeatherMonthlyTotalsParser);
    //        console.log(WeatherParameters.WeatherMonthlyTotals);
    //        //PopulateCurrentConditions(WeatherParameters.WeatherMonthlyTotals);

    //        // Check to see if we need to also parse the Almanac information
    //        if (WeatherParameters.Progress.Almanac != LoadStatuses.Loaded) {
    //            if (WeatherParameters.WeatherMonthlyTotalsParser.Precipitation === "") {
    //                WeatherParameters.Progress.Almanac = LoadStatuses.NoData;
    //                GetCurrentWeather(WeatherParameters);
    //                ShowRegionalMap(_WeatherParameters);
    //                return;
    //            }

    //            //https://api.weather.com/v2/astro?apiKey=6532d6454b8aa370768e63d6ba5a832e&geocode=40.81999969%2C-73&days=1&date=20181223&format=json
    //            //This also has the moon and sun data: https://api.weather.com/v3/wx/forecast/daily/3day?language=en-US&apiKey=6532d6454b8aa370768e63d6ba5a832e&geocode=40.83%2C-73.02&units=e&format=json
    //            var Url = "https://api.weather.com/v2/astro?apiKey=6532d6454b8aa370768e63d6ba5a832e&geocode=";
    //            Url += WeatherParameters.Latitude.toString() + "%2C";
    //            Url += WeatherParameters.Longitude.toString();
    //            Url += "&days=1&date=" + Now.getFullYear().pad() + (Now.getMonth() + 1).pad(2) + Now.getDate().pad(2) + "&format=json";

    //            // Load the xml file using ajax 
    //            $.ajaxCORS({
    //                type: "GET",
    //                url: Url,
    //                dataType: "json",
    //                crossDomain: true,
    //                cache: false,
    //                success: function (json) {
    //                    WeatherParameters.MoonPhasesParser = new MoonPhasesParser3(json);
    //                    console.log(WeatherParameters.MoonPhasesParser);

    //                    WeatherParameters.SunRiseSetParserToday = new SunRiseSetParser3(json);
    //                    console.log(WeatherParameters.SunRiseSetParserToday);

    //                    var Now = new Date();
    //                    Now = Now.addDays(1);
    //                    //https://api.weather.com/v2/astro?apiKey=6532d6454b8aa370768e63d6ba5a832e&geocode=40.81999969%2C-73&days=1&date=20181223&format=json
    //                    var Url = "https://api.weather.com/v2/astro?apiKey=6532d6454b8aa370768e63d6ba5a832e&geocode=";
    //                    Url += WeatherParameters.Latitude.toString() + "%2C";
    //                    Url += WeatherParameters.Longitude.toString();
    //                    Url += "&days=1&date=" + Now.getFullYear().pad() + (Now.getMonth() + 1).pad(2) + Now.getDate().pad(2) + "&format=json";

    //                    $.ajaxCORS({
    //                        type: "GET",
    //                        url: Url,
    //                        dataType: "json",
    //                        crossDomain: true,
    //                        cache: false,
    //                        success: function (json) {
    //                            WeatherParameters.SunRiseSetParserTomorrow = new SunRiseSetParser3(json);
    //                            console.log(WeatherParameters.SunRiseSetParserTomorrow);

    //                            WeatherParameters.AlmanacInfo = new AlmanacInfo(WeatherParameters.MoonPhasesParser, WeatherParameters.SunRiseSetParserToday, WeatherParameters.SunRiseSetParserTomorrow);
    //                            console.log(WeatherParameters.AlmanacInfo);

    //                            GetOutlook(WeatherParameters);
    //                        },
    //                        error: function (xhr, error, errorThrown) {
    //                            console.error("Getting SunRiseSetParserTomorrow failed: " + errorThrown);
    //                        }
    //                    });
    //                },
    //                error: function (xhr, error, errorThrown) {
    //                    console.error("Getting SunRiseSetParserTomorrow failed: " + errorThrown);
    //                }
    //            });

    //        }

    //    },
    //    error: function (xhr, error, errorThrown) {
    //        console.error("GetMonthPrecipitation failed: " + errorThrown);
    //    }
    //});
};

var GetTideInfo = function (WeatherParameters)
{
    var Url = "https://tidesandcurrents.noaa.gov/tide_predictions.html?type=Tide+Predictions&searchfor="; //[Latitude]%2C[Longitude]";
    Url += WeatherParameters.Latitude + "%2C";
    Url += WeatherParameters.Longitude;
    //Url = "cors/?u=" + encodeURIComponent(Url);

    var MaxStationCount = 2;
    var StationCount = 0;
    var TideInfoCount = 0;

    WeatherParameters.WeatherTides = null;

    // Load the xml file using ajax 
    $.ajaxCORS({
        type: "GET",
        url: Url,
        dataType: "html",
        crossDomain: true,
        cache: false,
        success: function (html)
        {
            var $html = $(html);
            $html.find("[src]").attr("src", ""); // Prevents the browser from loading any images on this page.

            var StationIds = $html.find("a[href*='Stationid=']");

            if (StationIds.length == 0)
            {
                // No tide stations available for this location.

                PopulateAlmanacInfo(_WeatherParameters);
                GetCurrentWeather(WeatherParameters);
                ShowRegionalMap(_WeatherParameters);
                //GetMarineForecast(_WeatherParameters);
                
                return;
            }

            StationIds.each(function ()
            {
                var Link = $(this);
                var StationName = Link.text();
                var Href = Link.attr("href");
                var StationId = Href.substr(Href.indexOf("Stationid=") + 10);

                //var Url = "https://tidesandcurrents.noaa.gov/stationhome.html?id="
                var Url = "https://tidesandcurrents.noaa.gov/noaatidepredictions/NOAATidesFacade.jsp?Stationid="
                Url += StationId;
                //Url = "cors/?u=" + encodeURIComponent(Url);

                if (WeatherParameters.WeatherTides == null)
                {
                    WeatherParameters.WeatherTides = [];
                }

                var WeatherTide = {
                    StationId: StationId,
                };
                WeatherTide.StationName = StationName;
                WeatherParameters.WeatherTides.push(WeatherTide);

                // Load the xml file using ajax 
                $.ajaxCORS({
                    type: "GET",
                    url: Url,
                    dataType: "html",
                    crossDomain: true,
                    cache: false,
                    success: function (html)
                    {
                        var $html = $(html);
                        $html.find("[src]").attr("src", ""); // Prevents the browser from loading any images on this page.

                        var TideTypes = [];
                        var TideTimes = [];
                        var TideDays = [];

                        $html.find(".hilow").find("tr").each(function (Index)
                        {
                            if (Index > 3)
                            {
                                return false;
                            }

                            var TideRow = $(this);
                            var TideHeight = $(TideRow.find("td")[3]).text().trim();

                            if (TideHeight.indexOf("H") != -1)
                            {
                                TideTypes.push("high");
                            }
                            else
                            {
                                TideTypes.push("low");
                            }

                            TideTimes.push($(TideRow.find("td")[2]).text().trim());
                            TideDays.push($(TideRow.find("td")[1]).text());
                        });

                        $(TideTimes).each(function(Index)
                        {
                            var TideTime = this.toString();
                            TideTime = TideTime.replaceAll(" AM", "am");
                            TideTime = TideTime.replaceAll(" PM", "pm");

                            if (TideTime.startsWith("0") == true)
                            {
                                TideTime = TideTime.substr(1);
                            }

                            TideTimes[Index] = TideTime;
                        });

                        WeatherTide.TideTypes = TideTypes;
                        WeatherTide.TideTimes = TideTimes;
                        WeatherTide.TideDays = TideDays;

                        TideInfoCount++;
                        if (TideInfoCount >= MaxStationCount)
                        {
                            PopulateTideInfo(WeatherParameters);

                            PopulateAlmanacInfo(_WeatherParameters);
                            GetCurrentWeather(WeatherParameters);
                            ShowRegionalMap(_WeatherParameters);
                            //GetMarineForecast(_WeatherParameters);
                        }
                    },
                    error: function (xhr, error, errorThrown)
                    {
                        console.error("GetTideInfo failed: " + errorThrown);
                    }
                });

                StationCount++;
                if (StationCount >= MaxStationCount)
                {
                    return false;
                }
            });

            //WeatherParameters.WeatherTideParser = new WeatherTideParser($html);
            //console.log(WeatherParameters.WeatherTideParser);

            //PopulateTideInfo(WeatherParameters);

        },
        error: function (xhr, error, errorThrown)
        {
            console.error("GetTideInfo failed: " + errorThrown);
        }
    });
};

var GetTideInfo2 = function (WeatherParameters) {
    var Url = "https://tidesandcurrents.noaa.gov/mdapi/latest/webapi/tidepredstations.json?"; //lat=40&lon=-73&radius=50";
    Url += "lat=" + WeatherParameters.Latitude + "&";
    Url += "lon=" + WeatherParameters.Longitude + "&radius=50";
    //Url = "cors/?u=" + encodeURIComponent(Url);

    var MaxStationCount = 2;
    var StationCount = 0;
    var TideInfoCount = 0;

    WeatherParameters.WeatherTides = null;

    // Load the xml file using ajax 
    $.ajaxCORS({
        type: "GET",
        url: Url,
        dataType: "json",
        crossDomain: true,
        cache: false,
        success: function (json) {
            var StationIds = $(json.stationList);

            if (StationIds.length == 0) {
                // No tide stations available for this location.

                PopulateAlmanacInfo(_WeatherParameters);
                GetCurrentWeather(WeatherParameters);
                ShowRegionalMap(_WeatherParameters);
                //GetMarineForecast(_WeatherParameters);

                return;
            }

            var Today = new Date();
            var Tomorrow = Today.addDays(1);

            StationIds.each(function () {
                var StationName = this.name;
                var StationId = this.stationId;

                //https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=20181228&end_date=20181229&datum=MLLW&station=9410840&time_zone=lst_ldt&units=english&interval=hilo&format=json
                var Url = "https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL";
                Url += "&begin_date=" + Today.getFullYear().pad() + (Today.getMonth() + 1).pad(2) + Today.getDate().pad(2);
                Url += "&end_date=" + Tomorrow.getFullYear().pad() + (Tomorrow.getMonth() + 1).pad(2) + Tomorrow.getDate().pad(2);
                Url += "&datum=MLLW&station=" + StationId;
                Url += "&time_zone=lst_ldt&units=english&interval=hilo&format=json";

                if (WeatherParameters.WeatherTides == null) {
                    WeatherParameters.WeatherTides = [];
                }

                var WeatherTide = {
                    StationId: StationId,
                };
                WeatherTide.StationName = StationName;
                WeatherParameters.WeatherTides.push(WeatherTide);

                // Load the xml file using ajax 
                $.ajaxCORS({
                    type: "GET",
                    url: Url,
                    dataType: "json",
                    crossDomain: true,
                    cache: false,
                    success: function (json) {

                        if (json.error)
                        {
                            console.error(json.error);
                        }

                        var TideTypes = [];
                        var TideTimes = [];
                        var TideDays = [];

                        var Predictions = json.predictions;

                        var Index = 0;

                        $(Predictions).each(function () {
                            if (Index > 3) {
                                return false;
                            }

                            var Now = new Date();
                            var date = new Date(this.t);

                            // Skip elements that are less than the current time.
                            if (date.getTime() < Now.getTime())
                            {
                                return true;
                            }

                            var TideHeight = this.v;

                            switch (this.type)
                            {
                                case "H":
                                    TideTypes.push("high");
                                    break;
                                default:
                                    TideTypes.push("low");
                                    break;
                            }

                            TideTimes.push(date.toTimeAMPM());
                            TideDays.push(date.getDayShortName());

                            Index++;
                        });

                        $(TideTimes).each(function (Index) {
                            var TideTime = this.toString();
                            TideTime = TideTime.replaceAll(" AM", "am");
                            TideTime = TideTime.replaceAll(" PM", "pm");

                            if (TideTime.startsWith("0") == true) {
                                TideTime = TideTime.substr(1);
                            }

                            TideTimes[Index] = TideTime;
                        });

                        WeatherTide.TideTypes = TideTypes;
                        WeatherTide.TideTimes = TideTimes;
                        WeatherTide.TideDays = TideDays;

                        TideInfoCount++;
                        if (TideInfoCount >= MaxStationCount) {
                            PopulateTideInfo(WeatherParameters);

                            PopulateAlmanacInfo(_WeatherParameters);
                            GetCurrentWeather(WeatherParameters);
                            ShowRegionalMap(_WeatherParameters);
                            //GetMarineForecast(_WeatherParameters);
                        }
                    },
                    error: function (xhr, error, errorThrown) {
                        console.error("GetTideInfo failed: " + errorThrown);

                        PopulateAlmanacInfo(_WeatherParameters);
                        GetCurrentWeather(WeatherParameters);
                        ShowRegionalMap(_WeatherParameters);
                            //GetMarineForecast(_WeatherParameters);
                    }
                });

                StationCount++;
                if (StationCount >= MaxStationCount) {
                    return false;
                }
            });

            //WeatherParameters.WeatherTideParser = new WeatherTideParser($html);
            //console.log(WeatherParameters.WeatherTideParser);

            //PopulateTideInfo(WeatherParameters);

        },
        error: function (xhr, error, errorThrown) {
            console.error("GetTideInfo failed: " + errorThrown);

            PopulateAlmanacInfo(_WeatherParameters);
            GetCurrentWeather(WeatherParameters);
            ShowRegionalMap(_WeatherParameters);
                            //GetMarineForecast(_WeatherParameters);
        }
    });
};

var PopulateTideInfo = function (WeatherParameters)
{
    if (WeatherParameters == null || (_DontLoadGifs == true && WeatherParameters.Progress.Almanac != LoadStatuses.Loaded))
    {
        return;
    }

    var AlmanacInfo = WeatherParameters.AlmanacInfo;
    var WeatherTides = WeatherParameters.WeatherTides;

    // Draw canvas
    var canvas = canvasAlmanacTides[0];
    var context = canvas.getContext("2d");

    var BackGroundImage = new Image();
    BackGroundImage.onload = function ()
    {
        context.drawImage(BackGroundImage, 0, 0);
        DrawHorizontalGradientSingle(context, 0, 30, 500, 90, _TopColor1, _TopColor2);
        DrawTriangle(context, "rgb(28, 10, 87)", 500, 30, 450, 90, 500, 90);
        DrawHorizontalGradientSingle(context, 0, 90, 52, 399, _SideColor1, _SideColor2);
        DrawHorizontalGradientSingle(context, 584, 90, 640, 399, _SideColor1, _SideColor2);

        DrawTitleText(context, "Almanac", "Tides");

        var Sunrise = "";
        if (isNaN(AlmanacInfo.TodaySunRise) == true)
        {
            Sunrise = "None";
        }
        else
        {
            Sunrise = AlmanacInfo.TodaySunRise.getFormattedTime();
            Sunrise = Sunrise.replaceAll(" am", "am");
            Sunrise = Sunrise.replaceAll(" pm", "pm");
        }
        DrawText(context, "Star4000", "24pt", "#FFFFFF", 115, 375, "Sunrise " + Sunrise, 2);

        var Sunset = "";
        if (isNaN(AlmanacInfo.TodaySunSet) == true)
        {
            Sunset = "None";
        }
        else
        {
            Sunset = AlmanacInfo.TodaySunSet.getFormattedTime();
            Sunset = Sunset.replaceAll(" am", "am");
            Sunset = Sunset.replaceAll(" pm", "pm");
        }
        DrawText(context, "Star4000", "24pt", "#FFFFFF", 360, 375, "Set " + Sunset, 2);

        var y = 140;
        var x = 0;
        $(WeatherTides).each(function ()
        {
            var WeatherTide = this;

            DrawText(context, "Star4000", "24pt", "#FFFFFF", 315, y, (WeatherTide.StationName + " Tides").substr(0, 32), 2, "center");
            y += 40;

            DrawText(context, "Star4000", "24pt", "#FFFFFF", 70, y, "Lows:", 2);
            x = 360;
            $(WeatherTide.TideTypes).each(function (Index)
            {
                var TideType = this.toString();

                if (TideType != "low")
                {
                    return true;
                }

                var TideTime = WeatherTide.TideTimes[Index];
                var TideDay = WeatherTide.TideDays[Index];

                if (_Units == Units.Metric)
                {
                    TideTime = ConvertTimeTo24Hour(TideTime);
                }

                DrawText(context, "Star4000", "24pt", "#FFFFFF", x, y, TideTime + " " + TideDay, 2, "right");
                x += 200;
            });
            y += 40;

            DrawText(context, "Star4000", "24pt", "#FFFFFF", 70, y, "Highs:", 2);
            x = 360;
            $(WeatherTide.TideTypes).each(function (Index)
            {
                var TideType = this.toString();

                if (TideType != "high")
                {
                    return true;
                }

                var TideTime = WeatherTide.TideTimes[Index];
                var TideDay = WeatherTide.TideDays[Index];

                if (_Units == Units.Metric)
                {
                    TideTime = ConvertTimeTo24Hour(TideTime);
                }

                DrawText(context, "Star4000", "24pt", "#FFFFFF", x, y, TideTime + " " + TideDay, 2, "right");
                x += 200;
            });
            y += 40;

        });

        //WeatherParameters.Progress.Almanac = LoadStatuses.Loaded;
        
        UpdateWeatherCanvas(WeatherParameters, canvasAlmanacTides);
    };
    //BackGroundImage.src = "images/BackGround1_1.png";
    //BackGroundImage.src = "images/BackGround1_" + _Themes.toString() + ".png";
    BackGroundImage.src = "images/BackGround1_1.png";
};

var GetOutlook = function (WeatherParameters)
{
    WeatherParameters.Outlook = null;

    // No current support for HI and AK.
    if (WeatherParameters.State == "HI" || WeatherParameters.State == "AK")
    {
        GetTideInfo2(WeatherParameters);
        return;
    }

    var ImagesLoadedCounter = 0;
    var ImagesLoadedMax = 2;

    var ImageOnError = function ()
    {
        GetTideInfo2(WeatherParameters);
    };

    var ImageOnLoad = function ()
    {
        ImagesLoadedCounter++;
        if (ImagesLoadedCounter < ImagesLoadedMax)
        {
            return;
        }

        var Outlook = {};

        var now = new Date();
        var CurrentMonth = new Date(now.getYear(), now.getMonth(), 1);
        if (now.getDate() <= 14)
        {
            CurrentMonth = CurrentMonth.addMonths(-1);
        }
        Outlook.From = CurrentMonth.getMonthShortName();
        CurrentMonth = CurrentMonth.addMonths(1);
        Outlook.To = CurrentMonth.getMonthShortName();

        var cnvOutlookTempId = "cnvOutlookTemp";
        var contextTemp;

        if (_DontLoadGifs == false)
        {
            // Clear the current image.
            divOutlookTemp.empty();

            divOutlookTemp.html("<canvas id='" + cnvOutlookTempId + "' />");
            cnvOutlookTemp = $("#" + cnvOutlookTempId);
            cnvOutlookTemp.attr("width", "719"); // For Chrome.
            cnvOutlookTemp.attr("height", "707"); // For Chrome.
        }
        cnvOutlookTemp = $("#" + cnvOutlookTempId);
        contextTemp = cnvOutlookTemp[0].getContext("2d");
        contextTemp.drawImage(TempImage, 0, 0);

        var TempColor = GetOutlookColor(WeatherParameters, contextTemp);
        var Temperature = GetOutlookTemperatureIndicator(TempColor);
        Outlook.Temperature = Temperature;

        var cnvOutlookPrcpId = "cnvOutlookPrcp";
        var contextPrcp;

        if (_DontLoadGifs == false)
        {
            // Clear the current image.
            divOutlookPrcp.empty();

            divOutlookPrcp.html("<canvas id='" + cnvOutlookPrcpId + "' />");
            cnvOutlookPrcp = $("#" + cnvOutlookPrcpId);
            cnvOutlookPrcp.attr("width", "719"); // For Chrome.
            cnvOutlookPrcp.attr("height", "707"); // For Chrome.
        }
        cnvOutlookPrcp = $("#" + cnvOutlookPrcpId);
        contextPrcp = cnvOutlookPrcp[0].getContext("2d");
        contextPrcp.drawImage(PrcpImage, 0, 0);

        var PrcpColor = GetOutlookColor(WeatherParameters, contextPrcp);
        var Precipitation = GetOutlookPrecipitationIndicator(PrcpColor);
        Outlook.Precipitation = Precipitation;

        WeatherParameters.Outlook = Outlook;

        PopulateOutlook(WeatherParameters);

        GetTideInfo2(WeatherParameters);
    };

    var TempUrl = "https://www.cpc.ncep.noaa.gov/products/predictions/30day/off14_temp.gif";
    TempUrl = "cors/?u=" + encodeURIComponent(TempUrl);
    var TempImage = new Image();
    TempImage.onload = ImageOnLoad;
    TempImage.onerror = ImageOnError;
    TempImage.src = TempUrl;

    var PrcpUrl = "https://www.cpc.ncep.noaa.gov/products/predictions/30day/off14_prcp.gif";
    PrcpUrl = "cors/?u=" + encodeURIComponent(PrcpUrl);
    var PrcpImage = new Image();
    PrcpImage.onload = ImageOnLoad;
    TempImage.onerror = ImageOnError;
    PrcpImage.src = PrcpUrl;

};

var GetOutlookColor = function (WeatherParameters, context)
{
    var X = 0;
    var Y = 0;
    var PixelColor = "";
    var Latitude = WeatherParameters.Latitude;
    var Longitude = WeatherParameters.Longitude;

    // The height is in the range of latitude 75'N (top) - 15'N (bottom)
    Y = ((75 - Latitude) / 53) * 707;

    if (Latitude < 48.83)
    {
        Y -= Math.abs(48.83 - Latitude) * 2.9;
    }
    if (Longitude < -100.46)
    {
        Y -= Math.abs(-100.46 - Longitude) * 1.7;
    }
    else
    {
        Y -= Math.abs(-100.46 - Longitude) * 1.7;
    }

    // The width is in the range of the longitude ???
    X = ((-155 - Longitude) / -110) * 719; // -155 - -40

    if (Longitude < -100.46)
    {
        X -= Math.abs(-100.46 - Longitude) * 1;

        if (Latitude > 40)
        {
            X += Math.abs(40 - Latitude) * 4;
        }
        else
        {
            X -= Math.abs(40 - Latitude) * 4;
        }
    }
    else
    {
        X += Math.abs(-100.46 - Longitude) * 2;

        if (Latitude < 36 && Longitude > -90)
        {
            X += Math.abs(36 - Latitude) * 8;
        }
        else
        {
            X -= Math.abs(36 - Latitude) * 6;
        }
    }

    // The further left and right from lat 45 and lon -97 the y increases
    X = Math.round(X);
    Y = Math.round(Y);

    // Determine if there is any "non-white" colors around the area.
    // Search a 16x16 region.
    var FoundColor = false;
    for (var ColorX = X - 8; ColorX <= X + 8; ColorX++)
    {
        for (var ColorY = Y - 8; ColorY <= Y + 8; ColorY++)
        {
            PixelColor = GetPixelColor(context, ColorX, ColorY);

            if (PixelColor != "#FFFFFF" && PixelColor != "#000000")
            {
                FoundColor = true;
            }

            if (FoundColor == true)
            {
                break;
            }
        }

        if (FoundColor == true)
        {
            break;
        }
    }

    return PixelColor;
};

var GetOutlookTemperatureIndicator = function (PixelColor)
{
    var RGB = HexToRgb(PixelColor);

    if (RGB.b > RGB.r)
    {
        return "B";
    }
    else if (RGB.r > RGB.b)
    {
        return "A";
    }
    else
    {
        return "N";
    }
};

var GetOutlookPrecipitationIndicator = function (PixelColor)
{
    var RGB = HexToRgb(PixelColor);

    if (RGB.g > RGB.r)
    {
        return "A";
    }
    else if (RGB.r > RGB.g)
    {
        return "B";
    }
    else
    {
        return "N";
    }

    //switch (PixelColor)
    //{
    //    case "B3D9AB":
    //    case "94CD7E":
    //    case "48AE38":
    //    case "397C5E":
    //    case "008E40":
    //    case "28553D":
    //    case "285517":
    //        return "A";

    //    case "F0D493":
    //    case "D8A74E":
    //    case "BB6D33":
    //    case "9B5031":
    //    case "934639":
    //    case "804000":
    //    case "4F2F2F":
    //        return "B";

    //    default:
    //        return "N";
    //}
};

var GetPixelColor = function (context, x, y)
{
    var PixelData = context.getImageData(x, y, 1, 1).data;
    var R = PixelData[0];
    var G = PixelData[1];
    var B = PixelData[2];
    var A = PixelData[3];
    return "#" + ("000000" + RgbToHex(R, G, B)).slice(-6);
};

var RgbToHex = function (r, g, b)
{
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16).toUpperCase();
};
var HexToRgb = function (h)
{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

var PopulateOutlook = function (WeatherParameters)
{
    if (WeatherParameters == null || (_DontLoadGifs == true && WeatherParameters.Progress.Almanac != LoadStatuses.Loaded))
    {
        return;
    }

    var Outlook = WeatherParameters.Outlook;

    // Draw canvas
    var canvas = canvasOutlook[0];
    var context = canvas.getContext("2d");

    var BackGroundImage = new Image();
    BackGroundImage.onload = function ()
    {
        context.drawImage(BackGroundImage, 0, 0);
        DrawHorizontalGradientSingle(context, 0, 30, 500, 90, _TopColor1, _TopColor2);
        DrawTriangle(context, "rgb(28, 10, 87)", 500, 30, 450, 90, 500, 90);
        DrawHorizontalGradientSingle(context, 0, 90, 52, 399, _SideColor1, _SideColor2);
        DrawHorizontalGradientSingle(context, 584, 90, 640, 399, _SideColor1, _SideColor2);

        DrawTitleText(context, "Almanac", "Outlook");

        DrawText(context, "Star4000", "24pt", "#FFFFFF", 320, 180, "30 Day Outlook", 2, "center");

        var DateRange = "MID-" + Outlook.From.toUpperCase() + " TO MID-" + Outlook.To.toUpperCase();
        DrawText(context, "Star4000", "24pt", "#FFFFFF", 320, 220, DateRange, 2, "center");

        var Temperature = GetOutlookDescription(Outlook.Temperature);
        DrawText(context, "Star4000", "24pt", "#FFFFFF", 70, 300, "Temperatures:  " + Temperature, 2);

        var Precipitation = GetOutlookDescription(Outlook.Precipitation);
        DrawText(context, "Star4000", "24pt", "#FFFFFF", 70, 380, "Precipitation: " + Precipitation, 2);

        UpdateWeatherCanvas(WeatherParameters, canvasOutlook);
    };
    //BackGroundImage.src = "images/BackGround1_" + _Themes.toString() + ".png";
    BackGroundImage.src = "images/BackGround1_1.png";
};

var GetOutlookDescription = function (OutlookIndicator)
{
    switch (OutlookIndicator)
    {
        case "N":
            return "Normal";
        case "A":
            return "Above Normal";
        case "B":
            return "Below Normal";
    }
};

var GetMarineForecast = function (WeatherParameters)
{

    // mjb 08/28/19 Begin
    //// mjb 08/02/19 Begin
    ////// mjb 05/19/19 Begin
    //////var Url = "https://www.wunderground.com/cgi-bin/findweather/getForecast?query="; //Montauk%2C+NY
    //////Url += encodeURIComponent(WeatherParameters.City) + "%2C";
    //////Url += WeatherParameters.State;
    //////Url += "&hdf=1"; // mjb 08/15/18

    ////var Url = "https://www.wunderground.com/weather/us/"; //ny/shirley
    ////Url += WeatherParameters.State + "/";
    ////Url += encodeURIComponent(WeatherParameters.City);
    ////// mjb 05/19/19 End

    //var Url = "https://www.wunderground.com/cgi-bin/marineRedirect?zip=";
    //Url += WeatherParameters.ZipCode;
    //// mjb 08/02/19 End

    var Url = "https://l-36.com/weather_marine_cg.php?lat_long2=";
    Url += encodeURIComponent(WeatherParameters.Latitude) + "," + encodeURIComponent(WeatherParameters.Longitude);
    // mjb 08/28/19 End

    WeatherParameters.MarineForecast = null;

    // Load the xml file using ajax 
    $.ajaxCORS({
        type: "GET",
        url: Url,
        dataType: "html",
        crossDomain: true,
        cache: false,
        success: function (html)
        {
            ////var $html = $(html);
            ////$html.find("[src]").attr("src", ""); // Prevents the browser from loading any images on this page.

            //////<a href="/marine-weather/AN/350.html" id="water-link">Marine Forecast</a>
            ////var aWaterLink = $html.find("#water-link");

            ////if (aWaterLink.length == 0)
            ////{
            ////    // Marine forecast available for this location.

            ////    //PopulateAlmanacInfo(_WeatherParameters);
            ////    //GetCurrentWeather(WeatherParameters);
            ////    //ShowRegionalMap(_WeatherParameters);

            ////    GetWeatherForecast(_WeatherParameters);

            ////    return;
            ////}

            ////var href = aWaterLink.attr("href");
            ////var MarineZoneId = href.replaceAll("/marine-weather/", "").replaceAll(".html", "").replaceAll("/", "Z");

            //var index1 = text.indexOf("https://www.wunderground.com/MAR/")
            //var href = text.substr(index1, "https://www.wunderground.com/MAR/XY/123.html".length);
            //var MarineZoneId = href.replaceAll("https://www.wunderground.com/MAR/", "").replaceAll(".html", "").replaceAll("/", "Z");

            var $html = $(html);
            $html.find("[src]").attr("src", ""); // Prevents the browser from loading any images on this page.
            var MarineZoneId = null;

            var select = $html.find("select[name=zone1]");
            var options = select.find("option");
            if (options.length != 0)
            {
                MarineZoneId = options.val();
            }

            WeatherParameters.MarineZoneId = MarineZoneId;

            if (MarineZoneId == null)
            {
                GetWeatherForecast(_WeatherParameters);
                return;
            }

            var Url = "https://forecast.weather.gov/shmrn.php?mz=";
            Url += MarineZoneId;

            // Load the xml file using ajax 
            $.ajaxCORS({
                type: "GET",
                url: Url,
                dataType: "html",
                crossDomain: true,
                cache: false,
                success: function (html)
                {
                    var $html = $(html);
                    $html.find("[src]").attr("src", ""); // Prevents the browser from loading any images on this page.

                    if ($html.text().indexOf("No Current Marine Product for Zone ") != -1)
                    {
                        //PopulateAlmanacInfo(_WeatherParameters);
                        //GetCurrentWeather(WeatherParameters);
                        //ShowRegionalMap(_WeatherParameters);

                        GetWeatherForecast(_WeatherParameters);

                        return;
                    }

                    var MarineForecast = {};

                    MarineForecast.Warning = "";
                    //var spanWarn = $html.find(".warn");
                    //if (spanWarn.length != 0)
                    //{
                    //    MarineForecast.Warning = spanWarn.text().trim();
                    //    MarineForecast.Warning = MarineForecast.Warning.replace(" For Hazardous Seas", "");
                    //}
                    var fontWarning = $html.find("font[size='+1'][color='#FF0000']");
                    if (fontWarning.length != 0)
                    {
                        MarineForecast.Warning = fontWarning.text().trim();
                        //MarineForecast.Warning = MarineForecast.Warning.replace(" For Hazardous Seas", "");

                        var Index = MarineForecast.Warning.indexOf(" FOR HAZARDOUS SEAS");
                        if (Index != -1)
                        {
                            MarineForecast.Warning = MarineForecast.Warning.substr(0, Index);
                        }

                        var Index = MarineForecast.Warning.indexOf(" IN EFFECT");
                        if (Index != -1)
                        {
                            MarineForecast.Warning = MarineForecast.Warning.substr(0, Index);
                        }

                        MarineForecast.Warning = MarineForecast.Warning.capitalize();
                    }

                    MarineForecast.SeasOrWaves = "SEAS";
                    
                    var fontForecast = $html.find("font[size='+1'][color='#800000']");
                    fontForecast.each(function (DayIndex)
                    {
                        var Day = $(this);
                        var ForecastText = $(Day.parent()[0].nextSibling).text().trim().toUpperCase();
                        ForecastText = ForecastText.replaceAll("\n", "").replaceAll(String.fromCharCode(160), " ");

                        var DayName = Day.text().trim().capitalize();
                        if (_DayLongNames.hasOwnProperty(DayName) == true)
                        {
                            DayName = _DayLongNames[DayName];
                        }
                        else if (DayName == "Overnight")
                        {
                            DayName = "Tonight";
                        }
                        DayName = DayName.replaceAll("Rest Of ", "");

                        var WindSpeedLow = 0;
                        var WindSpeedHigh = 0;
                        var WindSpeedLowC = 0;
                        var WindSpeedHighC = 0;
                        var WindDirection = "";
                        var TideLow = 0;
                        var TideHigh = 0;
                        var TideLowC = 0;
                        var TideHighC = 0;
                        var TideConditions = "";
                        var Index = 0;
                        var Index2 = 0;
                        var Offset = 0;

                        if (ForecastText.indexOf("N WINDS ") != -1 || ForecastText.indexOf("N WIND ") != -1 || ForecastText.indexOf("NORTH WINDS ") != -1 || ForecastText.indexOf("NORTH WIND ") != -1)
                        {
                            WindDirection = "N";
                        }
                        else if (ForecastText.indexOf("S WINDS ") != -1 || ForecastText.indexOf("S WIND ") != -1 || ForecastText.indexOf("SOUTH WINDS ") != -1 || ForecastText.indexOf("SOUTH WIND ") != -1)
                        {
                            WindDirection = "S";
                        }
                        else if (ForecastText.indexOf("E WINDS ") != -1 || ForecastText.indexOf("E WIND ") != -1 || ForecastText.indexOf("EAST WINDS ") != -1 || ForecastText.indexOf("EAST WIND ") != -1)
                        {
                            WindDirection = "E";
                        }
                        else if (ForecastText.indexOf("W WINDS ") != -1 || ForecastText.indexOf("W WIND ") != -1 || ForecastText.indexOf("WEST WINDS ") != -1 || ForecastText.indexOf("WEST WIND ") != -1)
                        {
                            WindDirection = "W";
                        }
                        if (ForecastText.indexOf("NE WINDS ") != -1 || ForecastText.indexOf("NE WIND ") != -1 || ForecastText.indexOf("NORTHEAST WINDS ") != -1 || ForecastText.indexOf("NORTHEAST WIND ") != -1)
                        {
                            WindDirection = "NE";
                        }
                        else if (ForecastText.indexOf("SE WINDS ") != -1 || ForecastText.indexOf("SE WIND ") != -1 || ForecastText.indexOf("SOUTHEAST WINDS ") != -1 || ForecastText.indexOf("SOUTHEAST WIND ") != -1)
                        {
                            WindDirection = "SE";
                        }
                        else if (ForecastText.indexOf("NW WINDS ") != -1 || ForecastText.indexOf("NW WIND ") != -1 || ForecastText.indexOf("NORTHWEST WINDS ") != -1 || ForecastText.indexOf("NORTHWEST WIND ") != -1)
                        {
                            WindDirection = "NW";
                        }
                        else if (ForecastText.indexOf("SW WINDS ") != -1 || ForecastText.indexOf("SW WIND ") != -1 || ForecastText.indexOf("SOUTHWEST WINDS ") != -1)
                        {
                            WindDirection = "SW";
                        }

                        Index = -1;
                        if (Index == -1) { Index = ForecastText.indexOf(" WINDS AROUND "); Offset = 14; }
                        if (Index == -1) { Index = ForecastText.indexOf(" WIND TO "); Offset = 9; }
                        if (Index != -1)
                        {
                            Index += Offset;
                            Index2 = ForecastText.indexOf(" KT", Index);
                            if (Index2 == -1) Index2 = ForecastText.indexOf(" KNOT", Index);
                            WindSpeedHigh = parseInt(ForecastText.substr(Index, Index2 - Index));
                        }
                        else
                        {
                            Index = -1;
                            if (Index == -1) { Index = ForecastText.indexOf(" WINDS "); Offset = 6; }
                            if (Index == -1) { Index = ForecastText.indexOf(" WIND "); Offset = 5;}
                            if (Index != -1)
                            {
                                Index += Offset;

                                Index2 = ForecastText.indexOf(" TO ", Index);
                                if (Index2 == -1)
                                {
                                    Index2 = ForecastText.indexOf(" KT", Index);
                                    if (Index2 == -1) Index2 = ForecastText.indexOf(" KNOT", Index);
                                    WindSpeedHigh = parseInt(ForecastText.substr(Index, Index2 - Index));
                                    WindSpeedLow = WindSpeedHigh;
                                }
                                else
                                {
                                    WindSpeedLow = parseInt(ForecastText.substr(Index, Index2 - Index));
                                    Index = Index2 + 4;
                                    Index2 = ForecastText.indexOf(" KT", Index);
                                    if (Index2 == -1) Index2 = ForecastText.indexOf(" KNOT", Index);
                                    WindSpeedHigh = parseInt(ForecastText.substr(Index, Index2 - Index));
                                    
                                    if (isNaN(WindSpeedLow) == true)
                                    {
                                        WindSpeedLow = WindSpeedHigh;
                                    }
                                    else if (isNaN(WindSpeedHigh) == true)
                                    {
                                        WindSpeedHigh = WindSpeedLow
                                    }
                                }
                            }
                        }

                        Index = -1;
                        if (Index == -1) { Index = ForecastText.indexOf("SEAS AROUND "); Offset = 12; }
                        if (Index == -1) { Index = ForecastText.indexOf("WAVES AROUND "); Offset = 13; MarineForecast.SeasOrWaves = "WAVES"; }
                        if (Index != -1)
                        {
                            Index += Offset;
                            Index2 = ForecastText.indexOf(" FT", Index);
                            TideHigh = parseInt(ForecastText.substr(Index, Index2 - Index));
                            TideLow = TideHigh;
                        }
                        else
                        {
                            Index = -1;
                            if (Index == -1) { Index = ForecastText.indexOf("SEAS 1 FT OR LESS"); }
                            if (Index == -1) { Index = ForecastText.indexOf("SEAS LESS THAN 1 FT"); }
                            if (Index == -1) { Index = ForecastText.indexOf("WAVES 1 FT OR LESS"); MarineForecast.SeasOrWaves = "WAVES"; }
                            if (Index == -1) { Index = ForecastText.indexOf("WAVES LESS THAN 1 FT"); MarineForecast.SeasOrWaves = "WAVES"; }
                            if (Index != -1)
                            {
                                TideHigh = 1;
                            }
                            else
                            {
                                Index = -1;
                                if (Index == -1) { Index = ForecastText.indexOf("SEAS "); Offset = 5; }
                                if (Index == -1) { Index = ForecastText.indexOf("WAVES "); Offset = 6; MarineForecast.SeasOrWaves = "WAVES"; }
                                if (Index != -1)
                                {
                                    Index += Offset;

                                    Index2 = ForecastText.indexOf(" FT OR LESS", Index);
                                    if (Index2 != -1)
                                    {
                                        TideHigh = parseInt(ForecastText.substr(Index, Index2 - Index));
                                        TideLow = 0;
                                    }
                                    else
                                    {
                                        Index2 = ForecastText.indexOf(" TO ", Index);
                                        if (Index2 == -1)
                                        {
                                            Index2 = ForecastText.indexOf(" FT", Index);
                                            TideHigh = parseInt(ForecastText.substr(Index, Index2 - Index));
                                            TideLow = TideHigh;
                                        }
                                        else
                                        {
                                            TideLow = parseInt(ForecastText.substr(Index, Index2 - Index));
                                            Index = Index2 + 4;
                                            Index2 = ForecastText.indexOf(" FT", Index);
                                            if (Index2 == -1) { Index2 = ForecastText.indexOf(" FEET", Index); }
                                            TideHigh = parseInt(ForecastText.substr(Index, Index2 - Index));
                                        }

                                        if (isNaN(TideLow) == true)
                                        {
                                            TideLow = TideHigh;
                                        }
                                        else if (isNaN(TideHigh) == true)
                                        {
                                            TideHigh = TideLow
                                        }
                                    }
                                }
                            }

                            //Index = ForecastText.indexOf("SEAS ");
                            //else
                            //{
                            //    Index = ForecastText.indexOf("SEAS 1 FT OR LESS");
                            //    if (Index != -1)
                            //    {
                            //        TideHigh = 1;
                            //    }
                            //    else
                            //    {
                            //        Index = ForecastText.indexOf("WAVES AROUND ");
                            //        if (Index != -1)
                            //        {
                            //            Index += 12;
                            //            Index2 = ForecastText.indexOf(" FT", Index);
                            //            TideHigh = parseInt(ForecastText.substr(Index, Index2 - Index));
                            //            MarineForecast.SeasOrWaves = "WAVES";
                            //        }
                            //        else
                            //        {
                            //            Index = ForecastText.indexOf("WAVES 1 FT OR LESS");
                            //            if (Index != -1)
                            //            {
                            //                TideHigh = 1;
                            //                MarineForecast.SeasOrWaves = "WAVES";
                            //            }
                            //            else
                            //            {
                            //                Index = ForecastText.indexOf("WAVES ");
                            //                if (Index != -1)
                            //                {
                            //                    Index += 4;
                            //                    Index2 = ForecastText.indexOf(" TO ", Index);
                            //                    TideLow = parseInt(ForecastText.substr(Index, Index2 - Index));
                            //                    Index = Index2 + 4;
                            //                    Index2 = ForecastText.indexOf(" FT", Index);
                            //                    TideHigh = parseInt(ForecastText.substr(Index, Index2 - Index));
                            //                    MarineForecast.SeasOrWaves = "WAVES";
                            //                }
                            //            }
                            //        }
                            //    }
                            //}
                        }

                        TideConditions = "LIGHT";
                        ////TideConditions = "";
                        //if (ForecastText.toLowerCase().indexOf(" light ") != -1)
                        //{
                        //    TideConditions = "LIGHT";
                        //}
                        //else if (ForecastText.toLowerCase().indexOf(" rough") != -1)
                        //{
                        //    TideConditions = "ROUGH";
                        //}
                        //else if (ForecastText.toLowerCase().indexOf(" chop") != -1)
                        //{
                        //    TideConditions = "CHOPPY";
                        //}
                        if (TideHigh > 7)
                        {
                            TideConditions = "ROUGH";
                        }
                        else if (TideHigh > 4)
                        {
                            TideConditions = "CHOPPY";
                        }

                        TideHighC = ConvertFeetToMeters(TideHigh);
                        TideLowC = ConvertFeetToMeters(TideLow);
                        WindSpeedHighC = WindSpeedHigh;
                        WindSpeedLowC = WindSpeedLow;

                        if (TideHighC == 0 && TideHigh > 0)
                        {
                            TideHighC = 1;
                        }

                        switch (DayIndex)
                        {
                            case 0:
                                // Today/Tonight
                                MarineForecast.TodayDayName = DayName;
                                MarineForecast.TodayWindSpeedHigh = WindSpeedHigh;
                                MarineForecast.TodayWindSpeedLow = WindSpeedLow;
                                MarineForecast.TodayWindDirection = WindDirection;
                                MarineForecast.TodayTideLow = TideLow;
                                MarineForecast.TodayTideHigh = TideHigh;
                                MarineForecast.TodayTideConditions = TideConditions;
                                MarineForecast.TodayTideHighC = TideHighC;
                                MarineForecast.TodayTideLowC = TideLowC;
                                MarineForecast.TodayWindSpeedHighC = WindSpeedHighC;
                                MarineForecast.TodayWindSpeedLowC = WindSpeedLowC;
                                return true;

                            case 1:
                                // Tomorrow
                                MarineForecast.TomorrowDayName = DayName;
                                MarineForecast.TomorrowWindSpeedHigh = WindSpeedHigh;
                                MarineForecast.TomorrowWindSpeedLow = WindSpeedLow;
                                MarineForecast.TomorrowWindDirection = WindDirection;
                                MarineForecast.TomorrowTideLow = TideLow;
                                MarineForecast.TomorrowTideHigh = TideHigh;
                                MarineForecast.TomorrowTideConditions = TideConditions;
                                MarineForecast.TomorrowTideHighC = TideHighC;
                                MarineForecast.TomorrowTideLowC = TideLowC;
                                MarineForecast.TomorrowWindSpeedHighC = WindSpeedHighC;
                                MarineForecast.TomorrowWindSpeedLowC = WindSpeedLowC;
                                return false;
                        }
                    });

                    if (MarineForecast.TodayWindSpeedHigh != undefined)
                    {
                        WeatherParameters.MarineForecast = MarineForecast;

                        PopulateMarineForecast(WeatherParameters);
                    }

                    //PopulateAlmanacInfo(_WeatherParameters);
                    //GetCurrentWeather(WeatherParameters);
                    //ShowRegionalMap(_WeatherParameters);

                    GetWeatherForecast(_WeatherParameters);

                },
                error: function (xhr, error, errorThrown)
                {
                    console.error("GetMarineForecast failed: " + errorThrown);
                }
            });

        },
        error: function (xhr, error, errorThrown)
        {
            console.error("GetMarineForecast failed: " + errorThrown);
        }
    });
};

var PopulateMarineForecast = function (WeatherParameters)
{
    if (WeatherParameters == null || (_DontLoadGifs == true && WeatherParameters.Progress.WordedForecast != LoadStatuses.Loaded))
    {
        return;
    }

    var MarineForecast = WeatherParameters.MarineForecast;

    // Draw canvas
    var canvas = canvasMarineForecast[0];
    var context = canvas.getContext("2d");

    var BackGroundImage = new Image();
    BackGroundImage.onload = function ()
    {
        context.drawImage(BackGroundImage, 0, 0);
        DrawHorizontalGradientSingle(context, 0, 30, 500, 90, _TopColor1, _TopColor2);
        DrawTriangle(context, "rgb(28, 10, 87)", 500, 30, 450, 90, 500, 90);

        DrawTitleText(context, "Marine Forecast");

        // Warning Message
        if (MarineForecast.Warning != "")
        {
            DrawBorder(context, "#000000", 4, 100, 135, 440, 40);
            color = "#ffff00";
            DrawText(context, "Star4000", "24pt", "#ffffff", 320, 165, MarineForecast.Warning, true, "center");
        }

        DrawText(context, "Star4000", "24pt", "#ffffff", 80, 250, "WINDS:", true);
        DrawText(context, "Star4000", "24pt", "#ffffff", 80, 360, MarineForecast.SeasOrWaves + ":", true);

        // Today's Forecast
        DrawText(context, "Star4000", "24pt", "#ffff00", 280, 210, MarineForecast.TodayDayName, true, "center");
        DrawText(context, "Star4000", "24pt", "#ffffff", 280, 250, MarineForecast.TodayWindDirection, true, "center");

        var TodayWindSpeedHigh = 0;
        var TodayWindSpeedLow = 0;
        switch (_Units)
        {
            case Units.English:
                TodayWindSpeedHigh = MarineForecast.TodayWindSpeedHigh;
                TodayWindSpeedLow = MarineForecast.TodayWindSpeedLow;
                break;
            case Units.Metric:
                TodayWindSpeedHigh = MarineForecast.TodayWindSpeedHighC;
                TodayWindSpeedLow = MarineForecast.TodayWindSpeedLowC;
                break;
        }

        var TodayWindSpeed = TodayWindSpeedHigh.toString() + "kts";
        //if (TodayWindSpeedLow > 0)
        if (TodayWindSpeedLow != TodayWindSpeedHigh)
        {
            TodayWindSpeed = TodayWindSpeedLow.toString() + " - " + TodayWindSpeed;
        }
        DrawText(context, "Star4000", "24pt", "#ffffff", 280, 285, TodayWindSpeed, true, "center");

        DrawBorder(context, "rgb(172, 165, 251)", "4", 205, 305, 150, 90);

        var TodayTideHigh = 0;
        var TodayTideLow = 0;
        var TideUnit = "";
        switch (_Units)
        {
            case Units.English:
                TodayTideHigh = MarineForecast.TodayTideHigh;
                TodayTideLow = MarineForecast.TodayTideLow;
                TideUnit = "'";
                break;
            case Units.Metric:
                TodayTideHigh = MarineForecast.TodayTideHighC;
                TodayTideLow = MarineForecast.TodayTideLowC;
                TideUnit = "m";
                break;
        }

        var TodayTide = "";
        if (TodayTideHigh > 0)
        {
            TodayTide = TodayTideHigh.toString() + TideUnit;
            //if (TodayTideLow > 0)
            if (TodayTideLow != TodayTideHigh)
            {
                TodayTide = TodayTideLow.toString() + TideUnit + " - " + TodayTide;
            }
        }
        DrawText(context, "Star4000", "24pt", "#ffffff", 280, 340, TodayTide, true, "center");

        DrawText(context, "Star4000", "24pt", "#ffffff", 280, 390, MarineForecast.TodayTideConditions, true, "center");

        //DrawWaves(context, 240, 340, "rgb(172, 165, 251)", "ROUGH");
        DrawWaves(context, 240, 340, "rgb(172, 165, 251)", MarineForecast.TodayTideConditions);

        // Tomorrow's Forecast
        DrawText(context, "Star4000", "24pt", "#ffff00", 490, 210, MarineForecast.TomorrowDayName, true, "center");
        DrawText(context, "Star4000", "24pt", "#ffffff", 490, 250, MarineForecast.TomorrowWindDirection, true, "center");

        var TomorrowWindSpeedHigh = 0;
        var TomorrowWindSpeedLow = 0;
        switch (_Units)
        {
            case Units.English:
                TomorrowWindSpeedHigh = MarineForecast.TomorrowWindSpeedHigh;
                TomorrowWindSpeedLow = MarineForecast.TomorrowWindSpeedLow;
                break;
            case Units.Metric:
                TomorrowWindSpeedHigh = MarineForecast.TomorrowWindSpeedHighC;
                TomorrowWindSpeedLow = MarineForecast.TomorrowWindSpeedLowC;
                break;
        }

        var TomorrowWindSpeed = TomorrowWindSpeedHigh.toString() + "kts";
        //if (TomorrowWindSpeedLow > 0)
        if (TomorrowWindSpeedLow != TomorrowWindSpeedHigh)
        {
            TomorrowWindSpeed = TomorrowWindSpeedLow.toString() + " - " + TomorrowWindSpeed;
        }
        DrawText(context, "Star4000", "24pt", "#ffffff", 490, 285, TomorrowWindSpeed, true, "center");

        DrawBorder(context, "rgb(172, 165, 251)", "4", 410, 305, 150, 90);

        var TomorrowTideHigh = 0;
        var TomorrowTideLow = 0;
        var TideUnit = "";
        switch (_Units)
        {
            case Units.English:
                TomorrowTideHigh = MarineForecast.TomorrowTideHigh;
                TomorrowTideLow = MarineForecast.TomorrowTideLow;
                TideUnit = "'";
                break;
            case Units.Metric:
                TomorrowTideHigh = MarineForecast.TomorrowTideHighC;
                TomorrowTideLow = MarineForecast.TomorrowTideLowC;
                TideUnit = "m";
                break;
        }

        var TomorrowTide = "";
        if (TomorrowTideHigh > 0)
        {
            TomorrowTide = TomorrowTideHigh.toString() + TideUnit;
            //if (TomorrowTideLow > 0)
            if (TomorrowTideLow != TomorrowTideHigh)
            {
                TomorrowTide = TomorrowTideLow.toString() + TideUnit + " - " + TomorrowTide;
            }
        }
        DrawText(context, "Star4000", "24pt", "#ffffff", 490, 340, TomorrowTide, true, "center");

        DrawText(context, "Star4000", "24pt", "#ffffff", 490, 390, MarineForecast.TomorrowTideConditions, true, "center");

        DrawWaves(context, 445, 340, "rgb(172, 165, 251)", MarineForecast.TomorrowTideConditions);

        //WeatherParameters.Progress.Almanac = LoadStatuses.Loaded;

        UpdateWeatherCanvas(WeatherParameters, canvasMarineForecast);
    };
    BackGroundImage.src = "images/BackGround8_1.png";
    //BackGroundImage.src = "images/BackGround8_" + _Themes.toString() + ".png";

};

var DrawWaves = function (context, x, y, color, conditions)
{
    //http://www.w3schools.com/tags/canvas_arc.asp

    switch (conditions)
    {
        case "LIGHT":
            y -= 10;
            context.beginPath();
            context.arc(x, y, 35, Math.PI * .3, Math.PI * .7);
            context.strokeStyle = color;
            context.lineWidth = 4;
            context.stroke();
            context.beginPath();
            x += 40;
            context.arc(x, y, 35, Math.PI * .3, Math.PI * .7);
            context.stroke();
            context.beginPath();
            x += 40;
            context.arc(x, y, 35, Math.PI * .3, Math.PI * .7);
            context.stroke();
            break;

        case "CHOPPY":
            context.beginPath();
            context.arc(x, y, 25, Math.PI * .2, Math.PI * .8);
            context.strokeStyle = color;
            context.lineWidth = 4;
            context.stroke();
            context.beginPath();
            x += 40;
            context.arc(x, y, 25, Math.PI * .2, Math.PI * .8);
            context.stroke();
            context.beginPath();
            x += 40;
            context.arc(x, y, 25, Math.PI * .2, Math.PI * .8);
            context.stroke();
            break;

        case "ROUGH":
            context.beginPath();
            context.arc(x, y, 20, Math.PI * .1, Math.PI * .9);
            context.strokeStyle = color;
            context.lineWidth = 4;
            context.stroke();
            context.beginPath();
            x += 40;
            context.arc(x, y, 20, Math.PI * .1, Math.PI * .9);
            context.stroke();
            context.beginPath();
            x += 40;
            context.arc(x, y, 20, Math.PI * .1, Math.PI * .9);
            context.stroke();
            break;
    }

};

var GetAirQuality = function (WeatherParameters)
{
    //http://airquality.weather.gov/probe_aq_data.php?latitude=40.850043&longitude=-72.971293
    var Url = "http://airquality.weather.gov/probe_aq_data.php?latitude=";
    Url += encodeURIComponent(WeatherParameters.Latitude) + "&longitude=";
    Url += encodeURIComponent(WeatherParameters.Longitude);

    WeatherParameters.AirQuality = null;

    // Load the xml file using ajax 
    $.ajaxCORS({
        type: "GET",
        url: Url,
        dataType: "html",
        crossDomain: true,
        cache: false,
        success: function (html)
        {
            var $html = $(html);
            $html.find("[src]").attr("src", ""); // Prevents the browser from loading any images on this page.

            var tdDate = $($html.find("td[bgcolor='#E1E2FE']")[0]);
            var tdPpb = $($html.find("td[bgcolor='CCCCCC']")[1]);
            var date = new Date();
            var ppb = tdPpb.text();
            var h3 = $html.find("h3");
            var CityAndState = h3.text().replaceAll("Air Quality Forecast Guidance for ", "");
            var CityAndStateArray = CityAndState.split(", ");
            var City = CityAndStateArray[0];
            var State = CityAndStateArray[1];
            var IndexValue = 0;

            var AirQuality = {};
            
            if (tdDate.text().indexOf("Tomorrow") != -1)
            {
                date = date.addDays(1);
            }

            IndexValue = AQIOzone8hr(ppb);

            AirQuality.City = City;
            AirQuality.State = State;
            AirQuality.Date = date;
            AirQuality.Ppb = parseInt(ppb);
            AirQuality.IndexValue = IndexValue;
            
            WeatherParameters.AirQuality = AirQuality;

            PopulateAirQuality(WeatherParameters);

            GetMarineForecast(WeatherParameters);
        },
        error: function (xhr, error, errorThrown)
        {
            console.error("GetAirQuality failed: " + errorThrown);

            GetMarineForecast(WeatherParameters);
        }
    });
};

var AQIOzone8hr = function (Concentration)
{
    var Conc = parseFloat(Concentration);
    var c;
    var AQI;
    c = (Math.floor(Conc)) / 1000;

    if (c >= 0 && c < .055)
    {
        AQI = Linear(50, 0, 0.054, 0, c);
    }
    else if (c >= .055 && c < .071)
    {
        AQI = Linear(100, 51, .070, .055, c);
    }
    else if (c >= .071 && c < .086)
    {
        AQI = Linear(150, 101, .085, .071, c);
    }
    else if (c >= .086 && c < .106)
    {
        AQI = Linear(200, 151, .105, .086, c);
    }
    else if (c >= .106 && c < .201)
    {
        AQI = Linear(300, 201, .200, .106, c);
    }
    else if (c >= .201 && c < .605)
    {
        AQI = "O3message";
    }
    else
    {
        AQI = "Out of Range";
    }
    return AQI;
};

var Linear = function (AQIhigh, AQIlow, Conchigh, Conclow, Concentration)
{
    var linear;
    var Conc = parseFloat(Concentration);
    var a;
    a = ((Conc - Conclow) / (Conchigh - Conclow)) * (AQIhigh - AQIlow) + AQIlow;
    linear = Math.round(a);
    return linear;
};

var GetAirQuality2 = function (WeatherParameters)
{
    //https://airnow.gov/index.cfm?action=airnow.local_city&zipcode=11763


    if (!WeatherParameters.ZipCode)
    {
        GetMarineForecast(WeatherParameters);
        return;
    }

    var ZipCode = WeatherParameters.ZipCode;
    switch (WeatherParameters.City)
    {
        case "Salt Lake City":
            ZipCode = "84105";
            break;
    }

    var Url = "https://airnow.gov/index.cfm?action=airnow.local_city&zipcode=";
    Url += encodeURIComponent(ZipCode);

    WeatherParameters.AirQuality = null;

    // Load the xml file using ajax 
    $.ajaxCORS({
        type: "GET",
        url: Url,
        dataType: "html",
        crossDomain: true,
        cache: false,
        success: function (html)
        {
            var $html = $(html);
            $html.find("[src]").attr("src", ""); // Prevents the browser from loading any images on this page.

            var City = $html.find(".ActiveCity").text().trim();

            if (City.length == 0)
            {
                GetMarineForecast(WeatherParameters);
                return;
            }

            var date = new Date();
            var Offset = 0;
            if (date.getHours() >= 12)
            {
                Offset = 1;
                date = date.addDays(1);
            }

            //var IndexValue = $($($($html.find(".AQData")[2]).find("tr")[3]).find("td")[Offset]).text().trim();
            //var Description = $($($($html.find(".AQData")[2]).find("tr")[3]).find("td")[Offset + 1]).text().trim();
            //$(".AQILegendText")
            var Description = $($html.find(".AQILegendText")[Offset]).text().trim();
            var IndexValue = $($html.find(".AQILegendText")[Offset]).prev().text().trim();

            if (IndexValue == "")
            {
                IndexValue = GetAqiIndexValue(Description);
            }
            else
            {
                IndexValue = parseInt(IndexValue);
            }

            var AirQuality = {};

            AirQuality.City = City;
            AirQuality.Date = date;
            AirQuality.IndexValue = IndexValue;

            WeatherParameters.AirQuality = AirQuality;

            PopulateAirQuality(WeatherParameters);

            GetMarineForecast(WeatherParameters);
        },
        error: function (xhr, error, errorThrown)
        {
            console.error("GetAirQuality failed: " + errorThrown);

            GetMarineForecast(WeatherParameters);
        }
    });
};

var GetAirQuality3 = function (WeatherParameters)
{
    //http://www.airnowapi.org/aq/forecast/zipCode/?format=application/json&zipCode=11763&date=2020-07-21&distance=25&API_KEY=E0E326E6-E199-4ABC-B382-0F9F9522E143


    if (!WeatherParameters.ZipCode)
    {
        GetMarineForecast(WeatherParameters);
        return;
    }

    var ZipCode = WeatherParameters.ZipCode;
    var date = new Date();
    if (date.getHours() >= 12)
    {
        date = date.addDays(1);
    }
    var _Date = date.getYYYYMMDD();

    var Url = "http://www.airnowapi.org/aq/forecast/zipCode/?format=application/json&distance=25&API_KEY=E0E326E6-E199-4ABC-B382-0F9F9522E143";
    Url += "&zipCode=" + encodeURIComponent(ZipCode);
    Url += "&date=" + encodeURIComponent(_Date);

    WeatherParameters.AirQuality = null;

    // Load the xml file using ajax 
    $.ajaxCORS({
        type: "GET",
        url: Url,
        dataType: "json",
        crossDomain: true,
        cache: false,
        success: function (json)
        {
            var maxAQI = 0;
            var City = "";

            $(json).each(function ()
            {
                if (this.AQI > maxAQI)
                {
                    City = this.ReportingArea;
                    maxAQI = this.AQI;
                }
            });

            if (maxAQI == 0)
            {
                GetMarineForecast(WeatherParameters);
                return;
            }

            var AirQuality = {};

            AirQuality.City = City;
            AirQuality.Date = date;
            AirQuality.IndexValue = maxAQI;

            WeatherParameters.AirQuality = AirQuality;

            PopulateAirQuality(WeatherParameters);

            GetMarineForecast(WeatherParameters);
        },
        error: function (xhr, error, errorThrown)
        {
            console.error("GetAirQuality failed: " + errorThrown);

            GetMarineForecast(WeatherParameters);
        }
    });
};


var PopulateAirQuality = function (WeatherParameters)
{
    if (WeatherParameters == null || (_DontLoadGifs == true && WeatherParameters.Progress.WordedForecast != LoadStatuses.Loaded))
    {
        return;
    }

    var AirQuality = WeatherParameters.AirQuality;

    // Draw canvas
    var canvas = canvasAirQuality[0];
    var context = canvas.getContext("2d");

    var BackGroundImage = new Image();
    BackGroundImage.onload = function ()
    {
        context.drawImage(BackGroundImage, 0, 0);
        DrawHorizontalGradientSingle(context, 0, 30, 500, 90, _TopColor1, _TopColor2);
        DrawTriangle(context, "rgb(28, 10, 87)", 500, 30, 450, 90, 500, 90);
        DrawHorizontalGradientSingle(context, 0, 90, 640, 399, _SideColor1, _SideColor2);

        // Title
        var DayName = AirQuality.Date.getDayName();
        DrawTitleText(context, "Air Quality", "For " + DayName);

        // Hazardous
        DrawBox(context, "#FF0000", 320, 90, 320, 309);
        DrawTriangle(context, "#FF0000", 300, 90, 320, 90, 320, 110);
        DrawText(context, "Star4000 Small", "20pt", "#FFFFFF", 320, 105, "HAZARDOUS", 1);

        // Very Unhealthy
        DrawBox(context, "#FF8000", 320, 110, 230, 289);
        DrawTriangle(context, "#FF8000", 300, 110, 320, 110, 320, 130);
        DrawTriangle(context, "#FF0000", 530, 110, 550, 110, 550, 130);
        DrawText(context, "Star4000 Small", "20pt", "#FFFFFF", 320, 125, "VERY UNHEALTHY", 1);

        // Unhealthy
        DrawBox(context, "#FFB000", 320, 130, 160, 269);
        DrawTriangle(context, "#FFB000", 300, 130, 320, 130, 320, 150);
        DrawTriangle(context, "#FF8000", 460, 130, 480, 130, 480, 150);
        DrawText(context, "Star4000 Small", "20pt", "#FFFFFF", 320, 145, "UNHEALTHY", 1);

        // Good
        DrawBox(context, "#FFFF00", 320, 150, 70, 249);
        DrawTriangle(context, "#FFFF00", 300, 150, 320, 150, 320, 170);
        DrawTriangle(context, "#FFB000", 370, 150, 390, 150, 390, 170);
        DrawText(context, "Star4000 Small", "20pt", "#FFFFFF", 320, 165, "GOOD", 1);

        // City Name
        DrawText(context, "Star4000", "24pt", "#FFFFFF", 240, 280, AirQuality.City, 2, "right");

        // Air Quality Value
        DrawText(context, "Star4000", "24pt", "#FFFFFF", 310, 280, AirQuality.IndexValue.toString(), 2, "right");

        // Draw Bar
        var BarWidth = GetAqiWidth(AirQuality.IndexValue);
        DrawHorizontalGradient(context, 315, 245, 315 + BarWidth, 295, "#404040", "#B0B0B0");
        DrawBox(context, "#000000", 315 + BarWidth - 2, 245, 2, 50);
        DrawBox(context, "#FFFFFF", 315, 245, BarWidth, 2);
        DrawBox(context, "#FFFFFF", 315, 245, 2, 50);
        DrawBox(context, "#000000", 315, 293, BarWidth, 2);

        UpdateWeatherCanvas(WeatherParameters, canvasAirQuality);
    };
    BackGroundImage.src = "images/BackGround9_1.png";
    //BackGroundImage.src = "images/BackGround9_" + _Themes.toString() + ".png";

};

var GetAqiWidth = function (IndexValue)
{
    var BarWidth = 0;

    if (IndexValue <= 100)
    {
        BarWidth = (IndexValue * 70) / 100;
    }
    else if (IndexValue <= 200)
    {
        //BarWidth = 70 + ((IndexValue - 100) * 160) / 200;
        BarWidth = 70 + ((IndexValue - 100) * 90) / 100;
    }
    else if (IndexValue <= 300)
    {
        //BarWidth = 160 + ((IndexValue - 200) * 230) / 300;
        BarWidth = 160 + ((IndexValue - 200) * 70) / 100;
    }
    else if (IndexValue <= 500)
    {
        //BarWidth = 230 + ((IndexValue - 300) * 320) / 500;
        BarWidth = 230 + ((IndexValue - 300) * 90) / 200;
    }
    BarWidth = Math.round(BarWidth);

    return BarWidth;
};

var GetAqiDescription = function (IndexValue)
{
    var Description = "unknown";

    if (IndexValue <= 100)
    {
        Description = "good";
    }
    else if (IndexValue <= 200)
    {
        Description = "unhealthy";
    }
    else if (IndexValue <= 300)
    {
        Description = "very unhealthy";
    }
    else if (IndexValue <= 500)
    {
        Description = "hazardous";
    }

    return Description;
};

var GetAqiIndexValue = function (Description)
{
    var IndexValue = 0;

    switch (Description.toLowerCase())
    {
        case "good":
            IndexValue = 0;
            break;
        case "moderate":
            IndexValue = 51;
            break;
        case "unhealthy for sensitive groups":
            IndexValue = 101;
            break;
        case "unhealthy":
            IndexValue = 151;
            break;
        case "very unhealthy":
            IndexValue = 201;
            break;
        case "hazardous":
            IndexValue = 301;
            break;
    }

    return IndexValue;
};

String.prototype.capitalize = function ()
{
    return this.toLowerCase().replace(/\b[a-z]/g, function (letter)
    {
        return letter.toUpperCase();
    });
};

var ConvertTimeTo24Hour = function (Time)
{
    var AMPM = Time.substr(Time.length - 2);
    var HH = Time.split(":")[0];
    var MM = Time.split(":")[1].substr(0, 2);
    var FormatedTime = "";

    switch (AMPM.toLowerCase())
    {
        case "am":
            if (HH == "12")
            {
                HH = "0";
            }
            break;

        case "pm":
            if (HH != "12")
            {
                HH = (parseInt(HH) + 12).toString();
            }
            break;
    }

    FormatedTime = HH + ":" + MM;

    return FormatedTime;
};

var GetTimeZone = function (WeatherParameters)
{
    var Now = new Date();

    jeoquery.getGeoNames(
        "timezone",
        { lat: WeatherParameters.Latitude.toString(), lng: WeatherParameters.Longitude.toString() },
        function (data)
        {
            WeatherParameters.TimeZoneOffsetDst = data.dstOffset;
            WeatherParameters.TimeZoneOffsetGmt = data.gmtOffset;

            GetMoonPhases(WeatherParameters);
        },
        function (errorThrown)
        {
            console.error("GetTimeZone failed: " + errorThrown);
            WeatherParameters.Progress.Almanac = LoadStatuses.Failed;
        });

};

var GetMoonPhases = function (WeatherParameters)
{
    var Done = function ()
    {
        //WeatherParameters.TravelCities = _TravelCities

        //GetRegionalStations(WeatherParameters);
        //GetTravelWeather(WeatherParameters); //_TravelCities);
        //GetCurrentWeather(WeatherParameters);
        //GetMonthPrecipitation(WeatherParameters);
        //ShowRegionalMap(WeatherParameters);
        //ShowRegionalMap(WeatherParameters, true);
        //ShowDopplerMap(WeatherParameters);
        //GetWeatherHazards3(WeatherParameters);
    };

    var Now = new Date();
    var tz = WeatherParameters.TimeZoneOffsetGmt;
    if (Now.dst() == true)
    {
        tz = WeatherParameters.TimeZoneOffsetDst;
    }

    var Url = "http://api.usno.navy.mil/moon/phase?nump=4&date=";
    Url += (Now.getMonth() + 1).pad(2) + "/";
    Url += Now.getDate().pad(2) + "/";
    Url += Now.getFullYear().pad();
    Url += "&tz=" + tz.toString();
    //Url = "cors/?u=" + encodeURIComponent(Url);

    // Load the xml file using ajax 
    $.ajax({
        type: "GET",
        url: Url,
        dataType: "json",
        crossDomain: true,
        cache: false,
        success: function (json)
        {
            console.log(json);

            WeatherParameters.MoonPhasesParser = new MoonPhasesParser(json);
            console.log(WeatherParameters.MoonPhasesParser);

            //WeatherParameters.WeatherMonthlyTotals = new WeatherMonthlyTotals(WeatherParameters.WeatherMonthlyTotalsParser);
            //console.log(WeatherParameters.WeatherMonthlyTotals);
            //PopulateCurrentConditions(WeatherParameters.WeatherMonthlyTotals);

            GetSunRiseSets(WeatherParameters);
        },
        error: function (xhr, error, errorThrown)
        {
            console.error("GetMoonPhases failed: " + errorThrown);
            WeatherParameters.Progress.Almanac = LoadStatuses.Failed;

            //GetSunRiseSets(WeatherParameters);
            Done();
        }
    });
};

var GetSunRiseSets = function (WeatherParameters, Tomorrow)
{
    var Done = function ()
    {
        //WeatherParameters.TravelCities = _TravelCities

        //GetRegionalStations(WeatherParameters);
        //GetTravelWeather(WeatherParameters); //_TravelCities);
        //GetCurrentWeather(WeatherParameters);
        //GetMonthPrecipitation(WeatherParameters);
        //ShowRegionalMap(WeatherParameters);
        //ShowRegionalMap(WeatherParameters, true);
        //ShowDopplerMap(WeatherParameters);
        //GetWeatherHazards3(WeatherParameters);
    };

    var Now = new Date();
    var tz = WeatherParameters.TimeZoneOffsetGmt;

    if (Tomorrow)
    {
        Now = Now.addDays(1);
    }

    if (Now.dst() == true)
    {
        tz = WeatherParameters.TimeZoneOffsetDst;
    }

    var Url = "http://api.usno.navy.mil/rstt/oneday?coords=";
    Url += (WeatherParameters.Latitude < 0 ? (WeatherParameters.Latitude * -1).toString() + "S" : WeatherParameters.Latitude.toString() + "N") + ",";
    Url += (WeatherParameters.Longitude < 0 ? (WeatherParameters.Longitude * -1).toString() + "W" : WeatherParameters.Longitude.toString() + "E") + "&";
    Url += "date=";
    Url += (Now.getMonth() + 1).pad(2) + "/";
    Url += Now.getDate().pad(2) + "/";
    Url += Now.getFullYear().pad();
    Url += "&tz=" + tz.toString();
    //Url = "cors/?u=" + encodeURIComponent(Url);

    // Load the xml file using ajax 
    $.ajax({
        type: "GET",
        url: Url,
        dataType: "json",
        crossDomain: true,
        cache: false,
        success: function (json)
        {
            console.log(json);

            if (Tomorrow)
            {
                WeatherParameters.SunRiseSetParserTomorrow = new SunRiseSetParser(json);
                console.log(WeatherParameters.SunRiseSetParserTomorrow);

                WeatherParameters.AlmanacInfo = new AlmanacInfo(WeatherParameters.MoonPhasesParser, WeatherParameters.SunRiseSetParserToday, WeatherParameters.SunRiseSetParserTomorrow);
                console.log(WeatherParameters.AlmanacInfo);
                PopulateAlmanacInfo(WeatherParameters);
                //WeatherParameters.Progress.Almanac = LoadStatuses.Loaded;

                //WeatherParameters.TravelCities = _TravelCities

                //GetRegionalStations(WeatherParameters);
                //GetTravelWeather(WeatherParameters); //_TravelCities);
                //GetCurrentWeather(WeatherParameters);
                //GetMonthPrecipitation(WeatherParameters);
                //ShowRegionalMap(WeatherParameters);
                //ShowRegionalMap(WeatherParameters, true);
                //ShowDopplerMap(WeatherParameters);
                //GetWeatherHazards3(WeatherParameters);
                Done();
            }
            else
            {
                WeatherParameters.SunRiseSetParserToday = new SunRiseSetParser(json);
                console.log(WeatherParameters.SunRiseSetParserToday);

                GetSunRiseSets(WeatherParameters, true);
            }
        },
        error: function (xhr, error, errorThrown)
        {
            console.error("GetSunRiseSets failed: " + errorThrown);
            WeatherParameters.Progress.Almanac = LoadStatuses.Failed;
            Done();
        }
    });
};

Date.prototype.stdTimezoneOffset = function ()
{
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

Date.prototype.dst = function ()
{
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
};

//var GetWeatherHazards = function (WeatherParameters)
//{
//    var Hazards = WeatherParameters.WeatherDwmlParser.data_forecast.parameters.hazards.hazards_conditions;

//    divHazards.empty();

//    if (Hazards.length == 0)
//    {
//        //WeatherParameters.Progress.Hazards = LoadStatuses.Loaded;
//        WeatherParameters.Progress.Hazards = LoadStatuses.NoData;
//        return;
//    }

//    var Url = Hazards[0].hazardTextURL;

//    // Load the xml file using ajax 
//    $.ajax({
//        type: "GET",
//        url: Url,
//        dataType: "html",
//        crossDomain: true,
//        cache: false,
//        success: function (html)
//        {
//            var $html = $(html);
//            //$html.find("img").attr("src", ""); // Prevents the browser from loading any images on this page.
//            $html.find("[src]").attr("src", ""); // Prevents the browser from loading any images on this page.
//            //console.log(html);

//            WeatherParameters.WeatherHazardsParser = new WeatherHazardsParser($html);
//            console.log(WeatherParameters.WeatherHazardsParser);

//            WeatherParameters.WeatherHazardConditions = new WeatherHazardConditions(WeatherParameters.WeatherHazardsParser, WeatherParameters);
//            console.log(WeatherParameters.WeatherHazardConditions);
//            PopulateHazardConditions(WeatherParameters);
//            //WeatherParameters.Progress.Hazards = LoadStatuses.Loaded;
//        },
//        error: function (xhr, error, errorThrown)
//        {
//            console.error("GetWeatherHazards failed: " + errorThrown);
//            WeatherParameters.Progress.Hazards = LoadStatuses.Failed;
//        }
//    });
//};

//var GetWeatherHazards2 = function (WeatherParameters)
//{
//    var RadarId = WeatherParameters.RadarId;
//    var ZoneId = WeatherParameters.ZoneId;

//    var Url = "http://www2.ehs.niu.edu/emulator/" + RadarId + "/";
//    //Url = "cors/?u=" + encodeURIComponent(Url);

//    // Load the xml file using ajax 
//    $.ajaxCORS({
//        type: "GET",
//        url: Url,
//        dataType: "html",
//        crossDomain: true,
//        cache: false,
//        success: function (html)
//        {
//            var $html = $(html);
//            //$html.find("img").attr("src", ""); // Prevents the browser from loading any images on this page.
//            $html.find("[src]").attr("src", ""); // Prevents the browser from loading any images on this page.
//            //console.log(html);

//            // Load the latest text from the server
//            var TextFile = $html.find("a").last().text();
//            var Url = "http://www2.ehs.niu.edu/emulator/" + RadarId + "/" + TextFile;

//            //WeatherParameters.WeatherHazardsParser = new WeatherHazardsParser($html);
//            //console.log(WeatherParameters.WeatherHazardsParser);

//            //WeatherParameters.WeatherHazardConditions = new WeatherHazardConditions(WeatherParameters.WeatherHazardsParser, WeatherParameters);
//            //console.log(WeatherParameters.WeatherHazardConditions);
//            //PopulateHazardConditions(WeatherParameters.WeatherHazardConditions);
//            //WeatherParameters.Progress.Hazards = LoadStatuses.Loaded;

//            GetWeatherForecast(WeatherParameters);
//        },
//        error: function (xhr, error, errorThrown)
//        {
//            console.error("GetWeatherHazards2 failed: " + errorThrown);
//            WeatherParameters.Progress.Hazards = LoadStatuses.Failed;

//            GetWeatherForecast(WeatherParameters);
//        }
//    });
//};

var GetWeatherHazards3 = function (WeatherParameters)
{
    var ZoneId = WeatherParameters.ZoneId;
    var HazardUrls = [];
    var HazardCounter = 0;

    WeatherParameters.WeatherHazardConditions = 
    {
        ZoneId: WeatherParameters.ZoneId,
        Hazards: [],
    };

    var Url = "https://alerts.weather.gov/cap/wwaatmget.php?x=" + ZoneId + "&y=0";
    //Url = "cors/?u=" + encodeURIComponent(Url);

    // Load the xml file using ajax 
    $.ajaxCORS({
        type: "GET",
        url: Url,
        dataType: "text",
        crossDomain: true,
        cache: false,
        success: function (text)
        {
            // IE doesn't support XML tags with colons.
            text = text.replaceAll("<cap:", "<cap_");
            text = text.replaceAll("</cap:", "</cap_");

            var $xml = $(text);
            //console.log(xml);

            $xml.find("entry").each(function ()
            {
                var entry = $(this);

                // Skip Special Weather Statements.
                //var cap_event = entry.find("*event");
                var cap_event = entry.find("cap_event");
                //if (cap_event.text() == "Special Weather Statement")
                //{
                //    return true;
                //}

                // Skip non-alerts.
                //var cap_msgType = entry.find("*msgType");
                var cap_msgType = entry.find("cap_msgType");
                if (cap_msgType.text() != "Alert")
                {
                    return true;
                }

                //var counter = 0;
                //var summary = entry.find("summary");
                //$(summary.text().split("...")).each(function ()
                //{
                //    var text = this.toString();
                //    if (text == "" || text == " ")
                //    {
                //        return true;
                //    }

                //    counter++;
                //    if (counter < 2)
                //    {
                //        return true;
                //    }

                //    WeatherParameters.WeatherHazardConditions.Summaries.push(text);
                //    return false;
                //});

                var link = entry.find("link");
                var Url = link.attr("href");

                HazardUrls.push(Url);
            });

            if (HazardUrls.length == 0)
            {
                //WeatherParameters.WeatherHazardConditions.Hazards.push("TESTING TESTING 1-2-3 TESTING.");
                //WeatherParameters.WeatherHazardConditions.Hazards.push("THIS IS A TEST\nTHIS IS SOME REALLY LONG MESSAGE THAT WE WOULD WANT TO WRAP AT SOME POINT.\n\nTHIS IS THE BEGINNING OF OTHER PARAGRAPH WHICH CAN THEN INDICATE THAT THERE IS SOME MORE TEXT THAT WOULD NEED TO BE WRAPPED.\n\n\I WOULD LIKE TO ADD SOME TEST TEXT HERE SO THAT IT WILL CAUSE THE SCREEN TO WRAP BECAUSE IT IS DISPLAYING MORE TEXT THAT WOULD NORMALLY FIX ON THE SCREEN; HOWEVER WE NEED TO ALSO TEST TO SEE IF THERE IS LESS HEIGHT THAN THE MAXIMUM HEIGHT.");
                //WeatherParameters.WeatherHazardConditions.Hazards.push("...WARNING... .THIS IS NOT A DRILL! .THE RED HOUR IS ALMOST UPON US.  DO YOU HAVE A PLACE TO SLEEP IT OFF, AYUH?");

                PopulateHazardConditions(WeatherParameters);
                console.log(WeatherParameters.WeatherHazardConditions);
                //WeatherParameters.Progress.Hazards = LoadStatuses.Loaded;
                return;
            }

            $(HazardUrls).each(function ()
            {
                var Url = this.toString();
                //Url = "cors/?u=" + encodeURIComponent(Url);

                $.ajaxCORS({
                    type: "GET",
                    url: Url,
                    dataType: "xml",
                    crossDomain: true,
                    cache: true,
                    success: function (xml)
                    {
                        var $xml = $(xml);
                        console.log(xml);

                        var description = $xml.find("description");
                        WeatherParameters.WeatherHazardConditions.Hazards.push(description.text());

                        HazardCounter++;
                        if (HazardCounter == HazardUrls.length)
                        {
                            PopulateHazardConditions(WeatherParameters);
                            console.log(WeatherParameters.WeatherHazardConditions);
                            //WeatherParameters.Progress.Hazards = LoadStatuses.Loaded;
                        }
                    },
                    error: function (xhr, error, errorThrown)
                    {
                        console.error("GetWeatherHazards3 failed for Url: " + Url);
                        WeatherParameters.Progress.Hazards = LoadStatuses.Failed;
                    }
                });
            });

        },
        error: function (xhr, error, errorThrown)
        {
            console.error("GetWeatherHazards3 failed: " + errorThrown);
            WeatherParameters.Progress.Hazards = LoadStatuses.Failed;
        }
    });
};

//var parseResponse = function (data)
////{
////    console.log(data);
////};

var GetWeatherMetar = function (WeatherParameters)
{
    var Url = "https://www.aviationweather.gov/adds/dataserver_current/httpparam?datasource=metars&requesttype=retrieve&format=xml&hoursBeforeNow=3";
    Url += "&stationString=" + WeatherParameters.StationId;
    //Url += "," + (new Date().getTime()); // Prevents caching
    //Url = "https://crossorigin.me/" + Url; // Need to do this for Chrome and CORS
    //Url = "cors/?u=" + encodeURIComponent(Url);

    //<script type="application/javascript"
    //    src="http://server.example.com/Users/1234?callback=parseResponse">
    //</script>
    //$("body").append("<script type='text/html' scr='" + Url + "?callback=parseResponse'></script>");

    //var s = document.createElement("script");
    //s.type = "text/javascript";
    //s.src = Url + "?callback=parseResponse";
    //$("head").append(s);
    //return;

    // Load the xml file using ajax 
    $.ajaxCORS({
        type: "GET",
        url: Url,
        dataType: "xml",
        crossDomain: true,
        //cache: false,
        success: function (xml)
        {
            var $xml = $(xml);
            console.log(xml);
            //console.log($xml);

            WeatherParameters.WeatherMetarsParser = new WeatherMetarsParser($xml);
            console.log(WeatherParameters.WeatherMetarsParser);

            WeatherParameters.WeatherCurrentConditions = new WeatherCurrentConditions(WeatherParameters.WeatherDwmlParser, WeatherParameters.WeatherMetarsParser);
            console.log(WeatherParameters.WeatherCurrentConditions);

            //if (WeatherParameters.WeatherCurrentConditions.Conditions == "")
            //{
            //    console.error("No current conditions data for '" + WeatherParameters.WeatherCurrentConditions.StationName + "'");
            //}

            PopulateCurrentConditions(WeatherParameters);
            //WeatherParameters.Progress.CurrentConditions = LoadStatuses.Loaded;

            //GetWeatherForecast(WeatherParameters);
            GetRegionalStations(_WeatherParameters);
        },
        error: function (xhr, error, errorThrown)
        {
            console.error("GetWeatherMetar failed: " + errorThrown);
            WeatherParameters.Progress.CurrentConditions = LoadStatuses.Failed;
        }
    });
};

var GetWeatherForecast = function (WeatherParameters)
{
    var Url = "https://tgftp.nws.noaa.gov/data/forecasts/zone/";
    Url += WeatherParameters.ZoneId.substr(0, 2).toLowerCase() + "/";
    Url += WeatherParameters.ZoneId.toLowerCase() + ".txt";
    //Url += "," + (new Date().getTime()); // Prevents caching
    //Url = "https://crossorigin.me/" + Url; // Need to do this for Chrome and CORS
    //Url = "cors/?u=" + encodeURIComponent(Url);

    //var Count = 0;

    //var DoAjax = function ()
    //{
    //    // Load the xml file using ajax 
    //    $.ajax({
    //        type: "GET",
    //        url: Url,
    //        dataType: "text",
    //        crossDomain: true,
    //        cache: false,
    //        success: function (text)
    //        {
    //            //console.log(text);

    //            WeatherParameters.WeatherForecastParser = new WeatherForecastParser(text);
    //            console.log(WeatherParameters.WeatherForecastParser);

    //            WeatherParameters.WeatherLocalForecast = new WeatherLocalForecast(WeatherParameters.WeatherForecastParser);
    //            console.log(WeatherParameters.WeatherLocalForecast);
    //            PopulateLocalForecast(WeatherParameters);
    //            //WeatherParameters.Progress.WordedForecast = LoadStatuses.Loaded;
    //        },
    //        error: function (xhr, error, errorThrown)
    //        {
    //            console.error("GetWeatherForecast failed: " + errorThrown);

    //            Count++;
    //            if (Count == 1)
    //            {
    //                Url = "http://tgftp.nws.noaa.gov/data/forecasts/zone/";
    //                Url += WeatherParameters.ZoneId.substr(0, 2).toLowerCase() + "/";
    //                Url += WeatherParameters.ZoneId.toLowerCase() + ".txt";
    //                //Url = "cors/?u=" + encodeURIComponent(Url);
    //                Url = "https://crossorigin.me/" + Url; // Need to do this for Chrome and CORS

    //                DoAjax();
    //                return;
    //            }
    //            WeatherParameters.Progress.WordedForecast = LoadStatuses.Failed;
    //        }
    //    });
    //};
    //DoAjax();

    $.ajaxCORS({
        type: "GET",
        url: Url,
        dataType: "text",
        crossDomain: true,
        cache: false,
        success: function (text)
        {
            //console.log(text);

            WeatherParameters.WeatherForecastParser = new WeatherForecastParser(text);
            console.log(WeatherParameters.WeatherForecastParser);

            WeatherParameters.WeatherLocalForecast = new WeatherLocalForecast(WeatherParameters.WeatherForecastParser);
            console.log(WeatherParameters.WeatherLocalForecast);
            PopulateLocalForecast(WeatherParameters);
            //WeatherParameters.Progress.WordedForecast = LoadStatuses.Loaded;
        },
        error: function (xhr, error, errorThrown)
        {
            console.error("GetWeatherForecast failed: " + errorThrown);
            WeatherParameters.Progress.WordedForecast = LoadStatuses.Failed;
        }
    });
};

$(function ()
{
    canvasBackGroundDateTime = $("#canvasBackGroundDateTime");
    canvasBackGroundCurrentConditions = $("#canvasBackGroundCurrentConditions");
    canvasProgress = $("#canvasProgress");
    divProgress = $("#divProgress");

    tblDopplerRadarMap = $("#tblDopplerRadarMap");
    divDopplerRadarMap = $("#divDopplerRadarMap");
    canvasLocalRadar = $("#canvasLocalRadar");

    tblRegionalForecastMap = $("#tblRegionalForecastMap");
    divRegionalForecastMap1 = $("#divRegionalForecastMap1");
    divRegionalForecastMap2 = $("#divRegionalForecastMap2");
    canvasRegionalForecast1 = $("#canvasRegionalForecast1");
    canvasRegionalForecast2 = $("#canvasRegionalForecast2");

    tblRegionalCurrentMap = $("#tblRegionalCurrentMap");
    divRegionalCurrentMap = $("#divRegionalCurrentMap");
    canvasRegionalObservations = $("#canvasRegionalObservations");

    btnGetCurrentWeather = $("#btnGetCurrentWeather");
    tblCurrentWeather = $("#tblCurrentWeather");
    divTemperature = $("#divTemperature");
    divStation = $("#divStation");
    divConditions = $("#divConditions");
    divHumidity = $("#divHumidity");
    divIcon = $("#divIcon");
    divDewpoint = $("#divDewpoint");
    divCeiling = $("#divCeiling");
    divVisibility = $("#divVisibility");
    divWind = $("#divWind");
    divPressure = $("#divPressure");
    divGust = $("#divGust");
    divHeatIndex = $("#divHeatIndex");
    canvasCurrentWeather = $("#canvasCurrentWeather");

    tblExtendedForecast = $("#tblExtendedForecast");
    divDayShortName1 = $("#divDayShortName1");
    divDayShortName2 = $("#divDayShortName2");
    divDayShortName3 = $("#divDayShortName3");
    divIcon1 = $("#divIcon1");
    divIcon2 = $("#divIcon2");
    divIcon3 = $("#divIcon3");
    divConditions1 = $("#divConditions1");
    divConditions2 = $("#divConditions2");
    divConditions3 = $("#divConditions3");
    divLo1 = $("#divLo1");
    divLo2 = $("#divLo2");
    divLo3 = $("#divLo3");
    divHi1 = $("#divHi1");
    divHi2 = $("#divHi2");
    divHi3 = $("#divHi3");
    canvasExtendedForecast1 = $("#canvasExtendedForecast1");
    canvasExtendedForecast2 = $("#canvasExtendedForecast2");

    tblLocalForecast = $("#tblLocalForecast");
    divLocalForecast1 = $("#divLocalForecast1");
    divLocalForecast2 = $("#divLocalForecast2");
    divLocalForecast3 = $("#divLocalForecast3");
    canvasLocalForecast = $("#canvasLocalForecast");

    tblHazards = $("#tblHazards");
    divHazards = $("#divHazards");
    tblHazardsScroll = $("#tblHazardsScroll");
    divHazardsScroll = $("#divHazardsScroll");
    canvasHazards = $("#canvasHazards");

    tblSunData = $("#tblSunData");
    divSunriseTodayName = $("#divSunriseTodayName");
    divSunsetTomorrowName = $("#divSunsetTomorrowName");
    divSunrise = $("#divSunrise");
    divSunriseToday = $("#divSunriseToday");
    divSunriseTomorrow = $("#divSunriseTomorrow");
    divSunset = $("#divSunset");
    divSunsetToday = $("#divSunsetToday");
    divSunsetTomorrow = $("#divSunsetTomorrow");
    canvasAlmanac = $("#canvasAlmanac");
    canvasAlmanacTides = $("#canvasAlmanacTides");
    canvasOutlook = $("#canvasOutlook");
    canvasMarineForecast = $("#canvasMarineForecast");
    canvasAirQuality = $("#canvasAirQuality");

    tblOutlook = $("#tblOutlook");
    divOutlookTemp = $("#divOutlookTemp");
    divOutlookPrcp = $("#divOutlookPrcp");

    tblTravelCities = $("#tblTravelCities");
    divTravelCitiesHigh = $("#divTravelCitiesHigh");
    divTravelCitiesLow = $("#divTravelCitiesLow");
    tblTravelCitiesScroll = $("#tblTravelCitiesScroll");
    divTravelCitiesScroll = $("#divTravelCitiesScroll");
    canvasTravelForecast = $("#canvasTravelForecast");

    tblRegionalObservations = $("#tblRegionalObservations");
    divRegionalObservationsCityName = $("#divRegionalObservationsCityName");
    divRegionalObservationsTemperature = $("#divRegionalObservationsTemperature");
    divRegionalObservationsConditions = $("#divRegionalObservationsConditions");
    divRegionalObservationsWindDirection = $("#divRegionalObservationsWindDirection");
    divRegionalObservationsWindSpeed = $("#divRegionalObservationsWindSpeed");
    canvasLatestObservations = $("#canvasLatestObservations");

    audMusic = $("#audMusic");
    PopulateMusicUrls();
    //audMusic[0].onerror = audMusic_OnError;
    //audMusic[0].ontimeupdate = AudioOnTimeUpdate;
    //audMusic[0].onplay = RefreshStateOfMusicAudio;
    //audMusic[0].onpause = RefreshStateOfMusicAudio;
    //audMusic[0].onplaying = RefreshStateOfMusicAudio;

    audBeep = $("#audBeep");

    canvasProgress.mousemove(canvasProgress_mousemove);
    canvasProgress.click(canvasProgress_click);

    _WeatherParameters = {};

    _WeatherParameters.WeatherHazardConditions = {};

    var WeatherCanvases = [];
    WeatherCanvases.push(canvasProgress);
    WeatherCanvases.push(canvasCurrentWeather);
    WeatherCanvases.push(canvasLatestObservations);
    WeatherCanvases.push(canvasTravelForecast);
    WeatherCanvases.push(canvasRegionalForecast1);
    WeatherCanvases.push(canvasRegionalForecast2);
    WeatherCanvases.push(canvasRegionalObservations);
    WeatherCanvases.push(canvasAlmanac);
    WeatherCanvases.push(canvasAlmanacTides);
    WeatherCanvases.push(canvasOutlook);
    WeatherCanvases.push(canvasMarineForecast);
    WeatherCanvases.push(canvasAirQuality);
    WeatherCanvases.push(canvasLocalForecast);
    WeatherCanvases.push(canvasExtendedForecast1);
    WeatherCanvases.push(canvasExtendedForecast2);
    WeatherCanvases.push(canvasHazards);
    WeatherCanvases.push(canvasLocalRadar);
    _WeatherParameters.WeatherCanvases = WeatherCanvases;

    $(WeatherCanvases).each(function ()
    {
        var WeatherCanvas = $(this);
        WeatherCanvas.css("position", "absolute");
        WeatherCanvas.css("top", "0px");
        WeatherCanvas.css("left", "0px");
        WeatherCanvas.hide();
    });
    canvasProgress.show();

    _WeatherParameters.TravelCities = _TravelCities;

    var GetWeatherIntervalId = null;
    var GetWeather = function ()
    {
        if (!_Url)
        {
            return;
        }
        window.clearInterval(GetWeatherIntervalId);

        $.ajax({
            type: "GET",
            url: _Url,
            dataType: "html",
            crossDomain: true,
            cache: false,
            success: function (html)
            {
                //"http://forecast.weather.gov/MapClick.php?lat=40.8224&lon=-72.9847"
                //var RadarId = getParameterByName("site", ResponseURL);

                var Latitude = getParameterByName("lat", _Url);
                var Longitude = getParameterByName("lon", _Url);

                //divLat.html("Latitude: " + Latitude);
                //divLng.html("Longitude: " + Longitude);

                //MapClick.php?zoneid=NYZ078
                var Index1 = html.indexOf("MapClick.php?zoneid=");
                var ZoneId = html.substr(Index1 + 20, 6);

                if (Index1 == -1)
                {
                    Index1 = html.indexOf("MapClick.php%3Fzoneid%3D");
                    ZoneId = html.substr(Index1 + 24, 6);
                }

                ////obhistory/KHWV.html
                //var Index2 = html.indexOf("obhistory/");
                //var StationId = html.substr(Index2 + 10, 4);
                var Index2_1 = html.indexOf(")</h2>");
                var Index2 = html.lastIndexOf("(", Index2_1);
                var StationId = html.substr(Index2 + 1, Index2_1 - (Index2 + 1));

                //a:"OKX"
                var Index3 = html.indexOf("a:\"");
                var RadarId = html.substr(Index3 + 3, 3).toUpperCase();

                //<div id="about_forecast">
                //<div class="fullRow">
                //                <div class="left">Point Forecast:</div>
                //                <div class="right">Medford NY<br>&nbsp;40.81&deg;N 72.99&deg;W (Elev. 79 ft)</div>
                //                    </div>
                var Index4 = html.indexOf("<div id=\"about_forecast\">");
                var Index5 = html.substr(Index4).indexOf("<br>");
                var Index6 = html.substr(Index4, Index5).lastIndexOf("<div") + Index4;
                var City = html.substr(Index6 + 19, (Index5 + Index4 - 3) - (Index6 + 19));
                var State = html.substr(Index6 + 19 + City.length + 1, (Index5 + Index4) - (Index6 + 19 + City.length + 1));

                ////<div class="fullRow">
                ////    <div class="left"><a target="_blank" href="http://www.weather.gov/glossary/index.php?word=Last+update">Last Update</a>: </div>
                ////    <div class="right">6:01 pm HST Dec 25, 2016</div>
                ////</div>
                //var Index7 = html.indexOf("Last Update</a>");
                //var Index8 = html.substr(Index7).indexOf("<div class=\"right\">");
                //var Index9 = html.substr(Index7 + Index8).indexOf("</div>");
                //var TimeZone = html.substr(Index7 + Index8 + 19, (Index7 + Index8 + Index9) - (Index7 + Index8 + 19)).split(' ')[2];

                //<div class="fullRow">
                //    <div class="left"><a target="_blank" href="//www.weather.gov/glossary/index.php?word=forecast+valid+for">Forecast Valid</a>: </div>
                //    <div class="right">8am EST Nov 1, 2020-6pm EST Nov 7, 2020</div>
                //</div>
                var Index7 = html.indexOf("Forecast Valid</a>: ");
                var Index8 = html.substr(Index7).indexOf("<div class=\"right\">");
                var Index9 = html.substr(Index7 + Index8).indexOf("</div>");
                var TimeZone = html.substr(Index7 + Index8 + 19, (Index7 + Index8 + Index9) - (Index7 + Index8 + 19)).split(' ')[1];

                //_WeatherParameters = {
                //    Latitude: Latitude,
                //    Longitude: Longitude,
                //    ZoneId: ZoneId,
                //    RadarId: RadarId,
                //    StationId: StationId,
                //    City: City,
                //    State: State,
                //    TimeZone: TimeZone,
                //};

                if (StationId in _StationInfo)
                {
                    City = _StationInfo[StationId].City;
                    City = City.split("/")[0];
                }

                _WeatherParameters.Latitude = Latitude;
                _WeatherParameters.Longitude = Longitude;
                _WeatherParameters.ZoneId = ZoneId;
                _WeatherParameters.RadarId = RadarId;
                _WeatherParameters.StationId = StationId;
                _WeatherParameters.City = City;
                _WeatherParameters.State = State;
                _WeatherParameters.TimeZone = TimeZone;
                //alert(_WeatherParameters.TimeZone);

                //http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?location=-72.971293%2C+40.850043&f=pjson
                request = $.ajax({
                    url: location.protocol + '//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode',
                    data: {
                        location: Longitude + "," + Latitude,
                        distance: 1000, // Find location upto 1 KM.
                        f: 'json',
                        featureTypes: 'postal',
                    },
                    jsonp: 'callback',
                    dataType: 'jsonp'
                });
                request.done(function (data)
                {
                    console.log(data);

                    if (!("error" in data))
                    {
                        var ZipCode = data.address.Postal;
                        var Country = data.address.CountryCode;

                        switch (ZipCode)
                        {
                            case "88888": // The North Pole.
                                ZipCode = "20001";
                                break;
                        }

                        _WeatherParameters.ZipCode = ZipCode;
                        _WeatherParameters.Country = Country;
                    }

                    GetMonthPrecipitation(_WeatherParameters);
                    GetTravelWeather(_WeatherParameters);
                    //GetAirQuality2(_WeatherParameters);
                    GetAirQuality3(_WeatherParameters);
                    ShowRegionalMap(_WeatherParameters, true);
                    ShowRegionalMap(_WeatherParameters, false, true);
                    //ShowDopplerMap(_WeatherParameters);
                    ShowDopplerMap2(_WeatherParameters);
                    GetWeatherHazards3(_WeatherParameters);

                    if (_UpdateWeatherCanvasInterval)
                    {
                        window.clearInterval(_UpdateWeatherCanvasInterval);
                    }
                    _UpdateWeatherCanvasInterval = window.setInterval(function ()
                    {
                        UpdateWeatherCanvases(_WeatherParameters);
                    }, _UpdateWeatherUpdateMs);

                    if (_CallBack) _CallBack({ Status: "WEATHERPARAMETERS", WeatherParameters: _WeatherParameters, });
                });

                //////GetMoonPhases(_WeatherParameters);
                ////GetTimeZone(_WeatherParameters);

                ////GetCurrentWeather(_WeatherParameters);
                //GetMonthPrecipitation(_WeatherParameters);
                ////GetRegionalStations(_WeatherParameters);
                //GetTravelWeather(_WeatherParameters); //_TravelCities);
                //GetAirQuality(_WeatherParameters);
                ////GetMarineForecast(_WeatherParameters);
                ////GetWeatherForecast(_WeatherParameters);
                ////ShowRegionalMap(_WeatherParameters);
                //ShowRegionalMap(_WeatherParameters, true);
                //ShowDopplerMap(_WeatherParameters);
                //GetWeatherHazards3(_WeatherParameters);

                //if (_UpdateWeatherCanvasInterval)
                //{
                //    window.clearInterval(_UpdateWeatherCanvasInterval);
                //}
                //_UpdateWeatherCanvasInterval = window.setInterval(function ()
                //{
                //    UpdateWeatherCanvases(_WeatherParameters);
                //}, _UpdateWeatherUpdateMs);

                //if (_CallBack) _CallBack({ Status: "WEATHERPARAMETERS", WeatherParameters: _WeatherParameters, });

            },
            error: function (xhr, error, errorThrown)
            {
                console.error("GetLatLng failed: " + errorThrown);
            }
        });
    };

    _WeatherParameters.Progress = new Progress({
        WeatherParameters: _WeatherParameters,
        OnLoad: function ()
        {
            GetWeatherIntervalId = window.setInterval(function () { GetWeather(); }, 100);
            GetWeather();
        },
    });
});

var NavigateMenu = function ()
{
    if (_IsPlaying == true)
    {
        NavigatePlayToggle();
    }
    Navigate(0);
    _PlayMs = 0;
};
var NavigateNext = function ()
{
    //if (_IsPlaying == true)
    //{
    //    _PlayMs += 10000;
    //}
    //else
    //{
    //    Navigate(1);
    //}

    if (_CurrentCanvasType == CanvasTypes.Progress)
    {
        _PlayMs = 0;
    }
    else
    {
        _PlayMs += 10000;
    }

    _IsSpeaking = false; // Force navigation

    UpdatePlayPosition();
};
var NavigatePrevious = function ()
{
    //if (_IsPlaying == true)
    //{
    //    _PlayMs -= 10000;
    //}
    //else
    //{
    //    Navigate(-1);
    //}

    if (_CurrentCanvasType == CanvasTypes.Progress)
    {
        _PlayMs = _PlayMsOffsets.End - 10000;
    }
    else
    {
        _PlayMs -= 10000;
    }

    _IsSpeaking = false; // Force navigation

    UpdatePlayPosition();
};
var NavigateReset = function ()
{
    Navigate();
};
var Navigate = function (Offset)
{
    var LocalForecastScreenTexts = _WeatherParameters.LocalForecastScreenTexts;
    var Hazards = _WeatherParameters.WeatherHazardConditions.Hazards;
    var cnvTravelCitiesScroll = $("#cnvTravelCitiesScroll");
    var cnvHazardsScroll = $("#cnvHazardsScroll");

    if (Offset == 0)
    {
        _CurrentCanvasType = _FirstCanvasType;
    }
    else if (Offset != undefined)
    {
        switch (Offset)
        {
            case 1:
                switch (_CurrentCanvasType)
                {
                    case CanvasTypes.LocalForecast:
                        if (_WeatherParameters.Progress.WordedForecast == LoadStatuses.Loaded)
                        {
                            if (LocalForecastScreenTexts)
                            {
                                if (_UpdateLocalForecastIndex < LocalForecastScreenTexts.length - 1)
                                {
                                    UpdateLocalForecast(1);
                                    return;
                                }
                            }
                        }
                        break;

                    case CanvasTypes.TravelForecast:
                        if (_WeatherParameters.Progress.TravelForecast == LoadStatuses.Loaded)
                        {
                            if (_UpdateTravelCitiesY < cnvTravelCitiesScroll.height() - 289)
                            {
                                UpdateTravelCities(1);
                                return;
                            }
                        }
                        break;

                    case CanvasTypes.Hazards:
                        if (_WeatherParameters.Progress.Hazards == LoadStatuses.Loaded && Hazards.length > 0)
                        {
                            if (_UpdateHazardsY < cnvHazardsScroll.height())
                            {
                                UpdateHazards(1);
                                return;
                            }
                        }
                        break;

                    case CanvasTypes.LocalRadar:
                        if (_WeatherParameters.Progress.DopplerRadar == LoadStatuses.Loaded)
                        {
                            if (_DopplerRadarImageIndex > 0)
                            {
                                UpdateDopplarRadarImage(1);
                                return;
                            }
                        }
                        break;
                }

                break;

            case -1:
                switch (_CurrentCanvasType)
                {
                    case CanvasTypes.LocalForecast:
                        if (_WeatherParameters.Progress.WordedForecast == LoadStatuses.Loaded)
                        {
                            if (LocalForecastScreenTexts)
                            {
                                if (_UpdateLocalForecastIndex > 0)
                                {
                                    UpdateLocalForecast(-1);
                                    return;
                                }
                            }
                        }
                        break;

                    case CanvasTypes.TravelForecast:
                        if (_WeatherParameters.Progress.TravelForecast == LoadStatuses.Loaded)
                        {
                            if (_UpdateTravelCitiesY > 0)
                            {
                                UpdateTravelCities(-1);
                                return;
                            }
                        }
                        break;

                    case CanvasTypes.Hazards:
                        if (_WeatherParameters.Progress.Hazards == LoadStatuses.Loaded && Hazards.length > 0)
                        {
                            if (_UpdateHazardsY > 0)
                            {
                                UpdateHazards(-1);
                                return;
                            }
                        }
                        break;

                    case CanvasTypes.LocalRadar:
                        if (_WeatherParameters.Progress.DopplerRadar == LoadStatuses.Loaded)
                        {
                            if (_DopplerRadarImageIndex < (_DopplerRadarImageMax - 1))
                            {
                                UpdateDopplarRadarImage(-1);
                                return;
                            }
                        }
                        break;
                }

                break;
        }

        _CurrentCanvasType += Offset;
        if (_CurrentCanvasType > _LastCanvasType)
        {
            _CurrentCanvasType = _FirstCanvasType;
        }
        else if (_CurrentCanvasType < _FirstCanvasType)
        {
            _CurrentCanvasType = _LastCanvasType;
        }

    }

    //window.location.hash = "";

    switch (_CurrentCanvasType)
    {
        case CanvasTypes.Progress:
            //window.location.hash = "aProgress";
            canvasProgress.scrollIntoView();
            break;
        case CanvasTypes.CurrentWeather:
            if (_WeatherParameters.Progress.CurrentConditions != LoadStatuses.Loaded)
            {
                if (Offset) { Navigate(Offset); } return;
            }
            //window.location.hash = "aCurrentWeather";
            //canvasCurrentWeather[0].scrollIntoView();
            //canvasCurrentWeather[0].scrollIntoView(true);
            //$("body").scrollTop(canvasCurrentWeather.offset().top);
            //canvasCurrentWeather[0].parentNode.scrollTop = canvasCurrentWeather[0].offsetTop;
            canvasCurrentWeather.scrollIntoView();
            break;
        case CanvasTypes.LatestObservations:
            if (_WeatherParameters.Progress.NearbyConditions != LoadStatuses.Loaded)
            {
                if (Offset) { Navigate(Offset); } return;
            }
            //window.location.hash = "aLatestObservations";
            canvasLatestObservations.scrollIntoView();
            break;
        case CanvasTypes.TravelForecast:
            if (_WeatherParameters.Progress.TravelForecast != LoadStatuses.Loaded)
            {
                if (Offset) { Navigate(Offset); } return;
            }
            if (Offset == 1)
            {
                UpdateTravelCities(0);
            }
            else if (Offset == -1)
            {
                UpdateTravelCities(Infinity);
            }
            //window.location.hash = "aTravelForecast";
            canvasTravelForecast.scrollIntoView();
            break;
        case CanvasTypes.RegionalForecast1:
            if (_WeatherParameters.Progress.TomorrowsRegionalMap != LoadStatuses.Loaded)
            {
                if (Offset) { Navigate(Offset); } return;
            }
            //window.location.hash = "aRegionalForecast";
            canvasRegionalForecast1.scrollIntoView();
            break;
        case CanvasTypes.RegionalForecast2:
            if (_WeatherParameters.Progress.TomorrowsRegionalMap != LoadStatuses.Loaded)
            {
                if (Offset) { Navigate(Offset); } return;
            }
            //window.location.hash = "aRegionalForecast";
            canvasRegionalForecast2.scrollIntoView();
            break;
        case CanvasTypes.RegionalObservations:
            if (_WeatherParameters.Progress.CurrentRegionalMap != LoadStatuses.Loaded)
            {
                if (Offset) { Navigate(Offset); } return;
            }
            //window.location.hash = "aRegionalObservations";
            canvasRegionalObservations.scrollIntoView();
            break;
        case CanvasTypes.LocalForecast:
            if (_WeatherParameters.Progress.WordedForecast != LoadStatuses.Loaded)
            {
                if (Offset) { Navigate(Offset); } return;
            }
            if (Offset == 1)
            {
                UpdateLocalForecast(0);
            }
            else if (Offset == -1)
            {
                UpdateLocalForecast(Infinity);
            }
            //window.location.hash = "aLocalForecast";
            canvasLocalForecast.scrollIntoView();
            break;
        case CanvasTypes.MarineForecast:
            if (_WeatherParameters.Progress.WordedForecast != LoadStatuses.Loaded && _WeatherParameters.MarineForecast)
            {
                if (Offset) { Navigate(Offset); } return;
            }
            canvasMarineForecast.scrollIntoView();
            break;
        case CanvasTypes.AirQuality:
            if (_WeatherParameters.Progress.WordedForecast != LoadStatuses.Loaded && _WeatherParameters.AirQuality)
            {
                if (Offset) { Navigate(Offset); } return;
            }
            canvasAirQuality.scrollIntoView();
            break;
        case CanvasTypes.ExtendedForecast1:
            if (_WeatherParameters.Progress.FourDayForecast != LoadStatuses.Loaded)
            {
                if (Offset) { Navigate(Offset); } return;
            }
            //window.location.hash = "aExtendedForecast";
            canvasExtendedForecast1.scrollIntoView();
            break;
        case CanvasTypes.ExtendedForecast2:
            if (_WeatherParameters.Progress.FourDayForecast != LoadStatuses.Loaded)
            {
                if (Offset) { Navigate(Offset); } return;
            }
            //window.location.hash = "aExtendedForecast";
            canvasExtendedForecast2.scrollIntoView();
            break;
        case CanvasTypes.Almanac:
            if (_WeatherParameters.Progress.Almanac != LoadStatuses.Loaded)
            {
                if (Offset) { Navigate(Offset); } return;
            }
            //window.location.hash = "aAlmanac";
            canvasAlmanac.scrollIntoView();
            break;
        case CanvasTypes.AlmanacTides:
            if (_WeatherParameters.Progress.Almanac != LoadStatuses.Loaded && _WeatherParameters.WeatherTides)
            {
                if (Offset) { Navigate(Offset); } return;
            }
            //window.location.hash = "aAlmanac";
            canvasAlmanacTides.scrollIntoView();
            break;
        case CanvasTypes.Outlook:
            if (_WeatherParameters.Progress.Almanac != LoadStatuses.Loaded && _WeatherParameters.Outlook)
            {
                if (Offset) { Navigate(Offset); } return;
            }
            canvasOutlook.scrollIntoView();
            break;
        case CanvasTypes.LocalRadar:
            if (_WeatherParameters.Progress.DopplerRadar != LoadStatuses.Loaded)
            {
                if (Offset) { Navigate(Offset); } return;
            }
            if (Offset == 1)
            {
                UpdateDopplarRadarImage(0);
            }
            else if (Offset == -1)
            {
                UpdateDopplarRadarImage(Infinity);
            }
            //window.location.hash = "aLocalRadar";
            canvasLocalRadar.scrollIntoView();
            break;
        case CanvasTypes.Hazards:
            if (_WeatherParameters.Progress.Hazards != LoadStatuses.Loaded || Hazards.length == 0)
            {
                if (Offset) { Navigate(Offset); } return;
            }
            if (Offset == 1)
            {
                UpdateHazards(0);
            }
            else if (Offset == -1)
            {
                UpdateHazards(Infinity);
            }
            //window.location.hash = "aHazards";
            canvasHazards.scrollIntoView();
            break;
    }

    if (Math.floor(_CurrentPosition) != _CurrentCanvasType)
    {
        _CurrentPosition = _CurrentCanvasType;
    }

    if (_PreviousPosition != _CurrentPosition)
    {
        _PreviousPosition = _CurrentPosition;
        SpeakUtterance();
    }

};

$.fn.scrollIntoView = function ()
{
    var _self = this;
    var date = new Date();
    var OkToFadeOut = true;

    //if ((date.getTime() - _LastDateScrolledIntoView.getTime()) < 600)
    //{
    //    OkToFadeOut = false;
    //}
    //_LastDateScrolledIntoView = date;

    //$("body").scrollTop(this.offset().top);

    $(_WeatherParameters.WeatherCanvases).each(function ()
    {
        var WeatherCanvas = $(this);

        if (WeatherCanvas[0] != _self[0])
        {
            if (WeatherCanvas.css("display") != "none")
            {
                WeatherCanvas.css("z-index", "9999");
                if (OkToFadeOut == false)
                {
                    WeatherCanvas.hide();
                }
                else
                {
                    //WeatherCanvas.fadeOut();
                    WeatherCanvas.fadeOut({
                        progress: function ()
                        {
                            UpdateWeatherCanvas(_WeatherParameters, WeatherCanvas);
                            UpdateWeatherCanvas(_WeatherParameters, $(_self));
                        },
                    });
                }
            }
        }
        else
        {
            if (WeatherCanvas.css("display") == "none")
            {
                WeatherCanvas.css("z-index", "");
                WeatherCanvas.show();
                //WeatherCanvas.show({
                //    progress: function ()
                //    {
                //        UpdateWeatherCanvas(_WeatherParameters, WeatherCanvas);
                //    },
                //});
            }
            WeatherCanvas.stop();
            WeatherCanvas.css("opacity", "");
            UpdateWeatherCanvas(_WeatherParameters, WeatherCanvas);
        }
    });

    _RefreshGifs = true;
    window.setTimeout(function () { _RefreshGifs = false; }, 200);

};


var _PlayInterval = 100;
var _PlayMs = 0;
var _PlayMsOffsets = {
    Start: 0,
    End: 0,
    Length: 0,
    CurrentWeather_Start: 0,
    CurrentWeather_End: 10000,
    CurrentWeather_Length: 10000,
    CurrentWeather_Loaded: false,
    LatestObservations_Start: 0,
    LatestObservations_End: 0,
    LatestObservations_Length: 10000,
    LatestObservations_Loaded: false,
    TravelForecast_Start: 0,
    TravelForecast_End: 0,
    TravelForecast_Length: 60000,
    TravelForecast_Loaded: false,
    RegionalForecast1_Start: 0,
    RegionalForecast1_End: 0,
    RegionalForecast1_Length: 10000,
    RegionalForecast1_Loaded: false,
    RegionalForecast2_Start: 0,
    RegionalForecast2_End: 0,
    RegionalForecast2_Length: 10000,
    RegionalForecast2_Loaded: false,
    RegionalObservations_Start: 0,
    RegionalObservations_End: 0,
    RegionalObservations_Length: 10000,
    RegionalObservations_Loaded: false,
    LocalForecast_Start: 0,
    LocalForecast_End: 0,
    LocalForecast_Length: 0,
    LocalForecast_Loaded: false,
    MarineForecast_Start: 0,
    MarineForecast_End: 0,
    MarineForecast_Length: 10000,
    MarineForecast_Loaded: false,
    AirQuality_Start: 0,
    AirQuality_End: 0,
    AirQuality_Length: 10000,
    AirQuality_Loaded: false,
    ExtendedForecast1_Start: 0,
    ExtendedForecast1_End: 0,
    ExtendedForecast1_Length: 10000,
    ExtendedForecast1_Loaded: false,
    ExtendedForecast2_Start: 0,
    ExtendedForecast2_End: 0,
    ExtendedForecast2_Length: 10000,
    ExtendedForecast2_Loaded: false,
    Almanac_Start: 0,
    Almanac_End: 0,
    Almanac_Length: 10000,
    Almanac_Loaded: false,
    AlmanacTides_Start: 0,
    AlmanacTides_End: 0,
    AlmanacTides_Length: 10000,
    AlmanacTides_Loaded: false,
    Outlook_Start: 0,
    Outlook_End: 0,
    Outlook_Length: 10000,
    Outlook_Loaded: false,
    LocalRadar_Start: 0,
    LocalRadar_End: 0,
    LocalRadar_Length: 15000,
    LocalRadar_Loaded: false,
    Hazards_Start: 0,
    Hazards_End: 0,
    Hazards_Length: 0,
    Hazards_Loaded: false,
}

var AssignPlayMsOffsets = function (CalledFromProgress)
{
    var cnvTravelCitiesScroll = $("#cnvTravelCitiesScroll");
    var LocalForecastScreenTexts = _WeatherParameters.LocalForecastScreenTexts;
    var cnvHazardsScroll = $("#cnvHazardsScroll");
    var Hazards = _WeatherParameters.WeatherHazardConditions.Hazards;
    var Progress = _WeatherParameters.Progress;

    //CurrentWeather
    _PlayMsOffsets.CurrentWeather_Start = 0
    if (Progress.CurrentConditions == LoadStatuses.Loaded)
    {
        _PlayMsOffsets.LatestObservations_Length = 10000;
    }
    else
    {
        _PlayMsOffsets.LatestObservations_Length = 0;
    }
    _PlayMsOffsets.CurrentWeather_End = _PlayMsOffsets.CurrentWeather_Start + _PlayMsOffsets.LatestObservations_Length;

    //LatestObservations
    _PlayMsOffsets.LatestObservations_Start = _PlayMsOffsets.CurrentWeather_End;
    if (Progress.NearbyConditions == LoadStatuses.Loaded)
    {
        _PlayMsOffsets.LatestObservations_Length = 10000;
    }
    else
    {
        _PlayMsOffsets.LatestObservations_Length = 0;
    }
    _PlayMsOffsets.LatestObservations_End = _PlayMsOffsets.LatestObservations_Start + _PlayMsOffsets.LatestObservations_Length;

    //TravelForecast
    _PlayMsOffsets.TravelForecast_Start = _PlayMsOffsets.LatestObservations_End;
    if (Progress.TravelForecast == LoadStatuses.Loaded)
    {
        _PlayMsOffsets.TravelForecast_Length = 60000;
    }
    else
    {
        _PlayMsOffsets.TravelForecast_Length = 0;
    }
    _PlayMsOffsets.TravelForecast_End = _PlayMsOffsets.TravelForecast_Start + _PlayMsOffsets.TravelForecast_Length;

    //RegionalForecast1
    _PlayMsOffsets.RegionalForecast1_Start = _PlayMsOffsets.TravelForecast_End;
    if (Progress.TomorrowsRegionalMap == LoadStatuses.Loaded)
    {
        _PlayMsOffsets.RegionalForecast1_Length = 10000;
    }
    else
    {
        _PlayMsOffsets.RegionalForecast1_Length = 0;
    }
    _PlayMsOffsets.RegionalForecast1_End = _PlayMsOffsets.RegionalForecast1_Start + _PlayMsOffsets.RegionalForecast1_Length;

    //RegionalForecast2
    _PlayMsOffsets.RegionalForecast2_Start = _PlayMsOffsets.RegionalForecast1_End;
    if (Progress.TomorrowsRegionalMap == LoadStatuses.Loaded)
    {
        _PlayMsOffsets.RegionalForecast2_Length = 10000;
    }
    else
    {
        _PlayMsOffsets.RegionalForecast2_Length = 0;
    }
    _PlayMsOffsets.RegionalForecast2_End = _PlayMsOffsets.RegionalForecast2_Start + _PlayMsOffsets.RegionalForecast2_Length;

    //RegionalObservations
    _PlayMsOffsets.RegionalObservations_Start = _PlayMsOffsets.RegionalForecast2_End;
    if (Progress.CurrentRegionalMap == LoadStatuses.Loaded)
    {
        _PlayMsOffsets.RegionalObservations_Length = 10000;
    }
    else
    {
        _PlayMsOffsets.RegionalObservations_Length = 0;
    }
    _PlayMsOffsets.RegionalObservations_End = _PlayMsOffsets.RegionalObservations_Start + _PlayMsOffsets.RegionalObservations_Length;

    //LocalForecast
    _PlayMsOffsets.LocalForecast_Start = _PlayMsOffsets.RegionalObservations_End;
    if (Progress.WordedForecast == LoadStatuses.Loaded)
    {
        _PlayMsOffsets.LocalForecast_Length = LocalForecastScreenTexts.length * 10000;
    }
    else
    {
        _PlayMsOffsets.LocalForecast_Length = 0;
    }
    _PlayMsOffsets.LocalForecast_End = _PlayMsOffsets.LocalForecast_Start + _PlayMsOffsets.LocalForecast_Length;

    //Marine Forecast
    _PlayMsOffsets.MarineForecast_Start = _PlayMsOffsets.LocalForecast_End;
    if (Progress.WordedForecast == LoadStatuses.Loaded && _WeatherParameters.MarineForecast)
    {
        _PlayMsOffsets.MarineForecast_Length = 10000;
    }
    else
    {
        _PlayMsOffsets.MarineForecast_Length = 0;
    }
    _PlayMsOffsets.MarineForecast_End = _PlayMsOffsets.MarineForecast_Start + _PlayMsOffsets.MarineForecast_Length;

    //Air Quality
    _PlayMsOffsets.AirQuality_Start = _PlayMsOffsets.MarineForecast_End;
    if (Progress.WordedForecast == LoadStatuses.Loaded && _WeatherParameters.AirQuality)
    {
        _PlayMsOffsets.AirQuality_Length = 10000;
    }
    else
    {
        _PlayMsOffsets.AirQuality_Length = 0;
    }
    _PlayMsOffsets.AirQuality_End = _PlayMsOffsets.AirQuality_Start + _PlayMsOffsets.AirQuality_Length;

    //ExtendedForecast1
    _PlayMsOffsets.ExtendedForecast1_Start = _PlayMsOffsets.AirQuality_End;
    if (Progress.FourDayForecast == LoadStatuses.Loaded)
    {
        _PlayMsOffsets.ExtendedForecast1_Length = 10000;
    }
    else
    {
        _PlayMsOffsets.ExtendedForecast1_Length = 0;
    }
    _PlayMsOffsets.ExtendedForecast1_End = _PlayMsOffsets.ExtendedForecast1_Start + _PlayMsOffsets.ExtendedForecast1_Length;

    //ExtendedForecast2
    _PlayMsOffsets.ExtendedForecast2_Start = _PlayMsOffsets.ExtendedForecast1_End;
    if (Progress.FourDayForecast == LoadStatuses.Loaded)
    {
        _PlayMsOffsets.ExtendedForecast2_Length = 10000;
    }
    else
    {
        _PlayMsOffsets.ExtendedForecast2_Length = 0;
    }
    _PlayMsOffsets.ExtendedForecast2_End = _PlayMsOffsets.ExtendedForecast2_Start + _PlayMsOffsets.ExtendedForecast2_Length;

    //Almanac
    _PlayMsOffsets.Almanac_Start = _PlayMsOffsets.ExtendedForecast2_End;
    if (Progress.Almanac == LoadStatuses.Loaded)
    {
        _PlayMsOffsets.Almanac_Length = 10000;
    }
    else
    {
        _PlayMsOffsets.Almanac_Length = 0;
    }
    _PlayMsOffsets.Almanac_End = _PlayMsOffsets.Almanac_Start + _PlayMsOffsets.Almanac_Length;

    //Almanac (Tides)
    _PlayMsOffsets.AlmanacTides_Start = _PlayMsOffsets.Almanac_End;
    if (Progress.Almanac == LoadStatuses.Loaded && _WeatherParameters.WeatherTides)
    {
        _PlayMsOffsets.AlmanacTides_Length = 10000;
    }
    else
    {
        _PlayMsOffsets.AlmanacTides_Length = 0;
    }
    _PlayMsOffsets.AlmanacTides_End = _PlayMsOffsets.AlmanacTides_Start + _PlayMsOffsets.AlmanacTides_Length;

    //Outlook
    _PlayMsOffsets.Outlook_Start = _PlayMsOffsets.AlmanacTides_End;
    if (Progress.Almanac == LoadStatuses.Loaded && _WeatherParameters.Outlook)
    {
        _PlayMsOffsets.Outlook_Length = 10000;
    }
    else
    {
        _PlayMsOffsets.Outlook_Length = 0;
    }
    _PlayMsOffsets.Outlook_End = _PlayMsOffsets.Outlook_Start + _PlayMsOffsets.Outlook_Length;

    //LocalRadar
    _PlayMsOffsets.LocalRadar_Start = _PlayMsOffsets.Outlook_End;
    if (Progress.DopplerRadar == LoadStatuses.Loaded)
    {
        _PlayMsOffsets.LocalRadar_Length = 15000;
    }
    else
    {
        _PlayMsOffsets.LocalRadar_Length = 0;
    }
    _PlayMsOffsets.LocalRadar_End = _PlayMsOffsets.LocalRadar_Start + _PlayMsOffsets.LocalRadar_Length;

    //Hazards
    _PlayMsOffsets.Hazards_Start = _PlayMsOffsets.LocalRadar_End;
    if (Progress.Hazards == LoadStatuses.Loaded && Hazards.length > 0)
    {
        _PlayMsOffsets.Hazards_Length = (((385 + cnvHazardsScroll.height()) / 385) * 13000) + 3000;
    }
    else
    {
        _PlayMsOffsets.Hazards_Length = 0;
    }
    _PlayMsOffsets.Hazards_End = _PlayMsOffsets.Hazards_Start + _PlayMsOffsets.Hazards_Length;

    //Global offsets
    _PlayMsOffsets.Start = 0;
    _PlayMsOffsets.End = _PlayMsOffsets.Hazards_End;
    _PlayMsOffsets.Length = _PlayMsOffsets.Hazards_End;

    // Update the Play Position
    if (CalledFromProgress)
    {
        if (Progress.CurrentConditions == LoadStatuses.Loaded && _PlayMsOffsets.CurrentWeather_Loaded == false)
        {
            //if (_PlayMs > _PlayMsOffsets.CurrentWeather_End)
            //if (_PlayMs <= _PlayMsOffsets.CurrentWeather_Start
            //if (_PlayMs < _PlayMsOffsets.CurrentWeather_End)
            if (_CurrentCanvasType > CanvasTypes.CurrentWeather)
            {
                _PlayMs += _PlayMsOffsets.CurrentWeather_Length;
            }
            _PlayMsOffsets.CurrentWeather_Loaded = true;
        }
        if (Progress.NearbyConditions == LoadStatuses.Loaded && _PlayMsOffsets.LatestObservations_Loaded == false)
        {
            //if (_PlayMs > _PlayMsOffsets.LatestObservations_End)
            //if (_PlayMs <= _PlayMsOffsets.LatestObservations_Start)
            //if (_PlayMs < _PlayMsOffsets.LatestObservations_End)
            if (_CurrentCanvasType > CanvasTypes.LatestObservations)
            {
                _PlayMs += _PlayMsOffsets.LatestObservations_Length;
            }
            _PlayMsOffsets.LatestObservations_Loaded = true;
        }
        if (Progress.TravelForecast == LoadStatuses.Loaded && _PlayMsOffsets.TravelForecast_Loaded == false)
        {
            //if (_PlayMs > _PlayMsOffsets.TravelForecast_End)
            //if (_PlayMs <= _PlayMsOffsets.TravelForecast_Start)
            //if (_PlayMs < _PlayMsOffsets.TravelForecast_End)
            if (_CurrentCanvasType > CanvasTypes.TravelForecast)
            {
                _PlayMs += _PlayMsOffsets.TravelForecast_Length;
            }
            _PlayMsOffsets.TravelForecast_Loaded = true;
        }
        if (Progress.TomorrowsRegionalMap == LoadStatuses.Loaded && _PlayMsOffsets.RegionalForecast1_Loaded == false)
        {
            //if (_PlayMs > _PlayMsOffsets.RegionalForecast_End)
            //if (_PlayMs <= _PlayMsOffsets.RegionalForecast_Start)
            //if (_PlayMs < _PlayMsOffsets.RegionalForecast_End)
            if (_CurrentCanvasType > CanvasTypes.RegionalForecast1)
            {
                _PlayMs += _PlayMsOffsets.RegionalForecast1_Length;
            }
            _PlayMsOffsets.RegionalForecast1_Loaded = true;
        }
        if (Progress.TomorrowsRegionalMap == LoadStatuses.Loaded && _PlayMsOffsets.RegionalForecast2_Loaded == false)
        {
            //if (_PlayMs > _PlayMsOffsets.RegionalForecast_End)
            //if (_PlayMs <= _PlayMsOffsets.RegionalForecast_Start)
            //if (_PlayMs < _PlayMsOffsets.RegionalForecast_End)
            if (_CurrentCanvasType > CanvasTypes.RegionalForecast2)
            {
                _PlayMs += _PlayMsOffsets.RegionalForecast2_Length;
            }
            _PlayMsOffsets.RegionalForecast2_Loaded = true;
        }
        if (Progress.CurrentRegionalMap == LoadStatuses.Loaded && _PlayMsOffsets.RegionalObservations_Loaded == false)
        {
            //if (_PlayMs > _PlayMsOffsets.RegionalObservations_End)
            //if (_PlayMs <= _PlayMsOffsets.RegionalObservations_Start)
            //if (_PlayMs < _PlayMsOffsets.RegionalObservations_End)
            if (_CurrentCanvasType > CanvasTypes.RegionalObservations)
            {
                _PlayMs += _PlayMsOffsets.RegionalObservations_Length;
            }
            _PlayMsOffsets.RegionalObservations_Loaded = true;
        }
        if (Progress.WordedForecast == LoadStatuses.Loaded && _PlayMsOffsets.LocalForecast_Loaded == false)
        {
            //if (_PlayMs > _PlayMsOffsets.LocalForecast_End)
            //if (_PlayMs <= _PlayMsOffsets.LocalForecast_Start)
            //if (_PlayMs < _PlayMsOffsets.LocalForecast_Start)
            if (_CurrentCanvasType > CanvasTypes.LocalForecast)
            {
                _PlayMs += _PlayMsOffsets.LocalForecast_Length;
            }
            _PlayMsOffsets.LocalForecast_Loaded = true;
        }
        if (Progress.WordedForecast == LoadStatuses.Loaded && _PlayMsOffsets.MarineForecast_Loaded == false && _WeatherParameters.MarineForecast)
        {
            if (_CurrentCanvasType > CanvasTypes.MarineForecast)
            {
                _PlayMs += _PlayMsOffsets.MarineForecast_Length;
            }
            _PlayMsOffsets.MarineForecast_Loaded = true;
        }
        if (Progress.WordedForecast == LoadStatuses.Loaded && _PlayMsOffsets.AirQuality_Loaded == false && _WeatherParameters.AirQuality)
        {
            if (_CurrentCanvasType > CanvasTypes.AirQuality)
            {
                _PlayMs += _PlayMsOffsets.AirQuality_Length;
            }
            _PlayMsOffsets.AirQuality_Loaded = true;
        }
        if (Progress.FourDayForecast == LoadStatuses.Loaded && _PlayMsOffsets.ExtendedForecast1_Loaded == false)
        {
            //if (_PlayMs > _PlayMsOffsets.ExtendedForecast_End)
            //if (_PlayMs <= _PlayMsOffsets.ExtendedForecast_Start)
            //if (_PlayMs > _PlayMsOffsets.ExtendedForecast_Start)
            if (_CurrentCanvasType > CanvasTypes.ExtendedForecast1)
            {
                _PlayMs += _PlayMsOffsets.ExtendedForecast1_Length;
            }
            _PlayMsOffsets.ExtendedForecast1_Loaded = true;
        }
        if (Progress.FourDayForecast == LoadStatuses.Loaded && _PlayMsOffsets.ExtendedForecast2_Loaded == false)
        {
            if (_CurrentCanvasType > CanvasTypes.ExtendedForecast2)
            {
                _PlayMs += _PlayMsOffsets.ExtendedForecast2_Length;
            }
            _PlayMsOffsets.ExtendedForecast2_Loaded = true;
        }
        if (Progress.Almanac == LoadStatuses.Loaded && _PlayMsOffsets.Almanac_Loaded == false)
        {
            //if (_PlayMs > _PlayMsOffsets.Almanac_End)
            //if (_PlayMs <= _PlayMsOffsets.Almanac_Start)
            //if (_PlayMs > _PlayMsOffsets.Almanac_Start)
            if (_CurrentCanvasType > CanvasTypes.Almanac)
            {
                _PlayMs += _PlayMsOffsets.Almanac_Length;
            }
            _PlayMsOffsets.Almanac_Loaded = true;
        }
        if (Progress.Almanac == LoadStatuses.Loaded && _PlayMsOffsets.AlmanacTides_Loaded == false && _WeatherParameters.WeatherTides)
        {
            if (_CurrentCanvasType > CanvasTypes.AlmanacTides)
            {
                _PlayMs += _PlayMsOffsets.AlmanacTides_Length;
            }
            _PlayMsOffsets.AlmanacTides_Loaded = true;
        }
        if (Progress.Almanac == LoadStatuses.Loaded && _PlayMsOffsets.Outlook_Loaded == false && _WeatherParameters.Outlook)
        {
            if (_CurrentCanvasType > CanvasTypes.Outlook)
            {
                _PlayMs += _PlayMsOffsets.Outlook_Length;
            }
            _PlayMsOffsets.Outlook_Loaded = true;
        }
        if (Progress.DopplerRadar == LoadStatuses.Loaded && _PlayMsOffsets.LocalRadar_Loaded == false)
        {
            //if (_PlayMs > _PlayMsOffsets.LocalRadar_End)
            //if (_PlayMs <= _PlayMsOffsets.LocalRadar_Start)
            //if (_PlayMs > _PlayMsOffsets.LocalRadar_Start)
            if (_CurrentCanvasType > CanvasTypes.LocalRadar)
            {
                _PlayMs += _PlayMsOffsets.LocalRadar_Length;
            }
            _PlayMsOffsets.LocalRadar_Loaded = true;
        }
        if (Progress.Hazards == LoadStatuses.Loaded && _PlayMsOffsets.Hazards_Loaded == false)
        {
            //if (_PlayMs > _PlayMsOffsets.Hazards_End)
            //if (_PlayMs <= _PlayMsOffsets.Hazards_Start)
            //if (_PlayMs > _PlayMsOffsets.Hazards_Start)
            if (_CurrentCanvasType > CanvasTypes.Hazards)
            {
                _PlayMs += _PlayMsOffsets.Hazards_Length;
            }
            _PlayMsOffsets.Hazards_Loaded = true;
        }
    }
    else
    {
        switch (_CurrentCanvasType)
        {
            case CanvasTypes.Progress:
                _PlayMs = 0;
                break;
            case CanvasTypes.CurrentWeather:
                _PlayMs = _PlayMsOffsets.CurrentWeather_Start;
                break;
            case CanvasTypes.LatestObservations:
                _PlayMs = _PlayMsOffsets.LatestObservations_Start;
                break;
            case CanvasTypes.TravelForecast:
                _PlayMs = _PlayMsOffsets.TravelForecast_Start;
                break;
            case CanvasTypes.RegionalForecast1:
                _PlayMs = _PlayMsOffsets.RegionalForecast1_Start;
                break;
            case CanvasTypes.RegionalForecast2:
                _PlayMs = _PlayMsOffsets.RegionalForecast2_Start;
                break;
            case CanvasTypes.RegionalObservations:
                _PlayMs = _PlayMsOffsets.RegionalObservations_Start;
                break;
            case CanvasTypes.LocalForecast:
                _PlayMs = _PlayMsOffsets.LocalForecast_Start;
                break;
            case CanvasTypes.MarineForecast:
                _PlayMs = _PlayMsOffsets.MarineForecast_Start;
                break;
            case CanvasTypes.AirQuality:
                _PlayMs = _PlayMsOffsets.AirQuality_Start;
                break;
            case CanvasTypes.ExtendedForecast1:
                _PlayMs = _PlayMsOffsets.ExtendedForecast1_Start;
                break;
            case CanvasTypes.ExtendedForecast2:
                _PlayMs = _PlayMsOffsets.ExtendedForecast2_Start;
                break;
            case CanvasTypes.Almanac:
                _PlayMs = _PlayMsOffsets.Almanac_Start;
                break;
            case CanvasTypes.AlmanacTides:
                _PlayMs = _PlayMsOffsets.AlmanacTides_Start;
                break;
            case CanvasTypes.Outlook:
                _PlayMs = _PlayMsOffsets.Outlook_Start;
                break;
            case CanvasTypes.LocalRadar:
                _PlayMs = _PlayMsOffsets.LocalRadar_Start;
                break;
            case CanvasTypes.Hazards:
                _PlayMs = _PlayMsOffsets.Hazards_Start;
                break;
        }
    }

};

var UpdatePlayPosition = function ()
{
    var cnvTravelCitiesScroll = $("#cnvTravelCitiesScroll");
    var LocalForecastScreenTexts = _WeatherParameters.LocalForecastScreenTexts;
    var cnvHazardsScroll = $("#cnvHazardsScroll");
    var Hazards = _WeatherParameters.WeatherHazardConditions.Hazards;
    var Progress = _WeatherParameters.Progress;
    var SubMs;

    var PrevPlayMs = _PlayMs;
    var PrevCanvasType = _CurrentCanvasType;
    var PrevPosition = _CurrentPosition;
    var PrevUpdateLocalForecastIndex = _UpdateLocalForecastIndex;

    if (_PlayMs < _PlayMsOffsets.Start)
    {
        _PlayMs = _PlayMsOffsets.End + _PlayMs;
    }
    else if (_PlayMs >= _PlayMsOffsets.End)
    {
        _PlayMs = _PlayMs - _PlayMsOffsets.End;
    }

    if (_PlayMs >= _PlayMsOffsets.CurrentWeather_Start && _PlayMs < _PlayMsOffsets.CurrentWeather_End)
    {
        _CurrentCanvasType = CanvasTypes.CurrentWeather;
        _CurrentPosition = _CurrentCanvasType;
    }
    else if (_PlayMs >= _PlayMsOffsets.LatestObservations_Start && _PlayMs < _PlayMsOffsets.LatestObservations_End)
    {
        _CurrentCanvasType = CanvasTypes.LatestObservations;
        _CurrentPosition = _CurrentCanvasType;
    }
    else if (_PlayMs >= _PlayMsOffsets.TravelForecast_Start && _PlayMs < _PlayMsOffsets.TravelForecast_End)
    {
        _CurrentCanvasType = CanvasTypes.TravelForecast;
        _CurrentPosition = _CurrentCanvasType;
        SubMs = _PlayMs - _PlayMsOffsets.TravelForecast_Start;

        // Wait 3 seconds and then start scrolling.
        if (SubMs < 3000)
        {
            _UpdateTravelCitiesY = 0;
        }
        if (SubMs >= 3000)
        {
            //y += 1;
            _UpdateTravelCitiesY = 3 * ((SubMs - 3000) / _PlayInterval);
        }
        if (_UpdateTravelCitiesY > cnvTravelCitiesScroll.height() - 289)
        {
            _UpdateTravelCitiesY = cnvTravelCitiesScroll.height() - 289;

            // Wait 10 seconds and start all over.
        }

        //_CurrentPosition += Math.floor(_UpdateTravelCitiesY / 72) / 10;

        UpdateTravelCities();
    }
    else if (_PlayMs >= _PlayMsOffsets.RegionalForecast1_Start && _PlayMs < _PlayMsOffsets.RegionalForecast1_End)
    {
        _CurrentCanvasType = CanvasTypes.RegionalForecast1;
        _CurrentPosition = _CurrentCanvasType;
    }
    else if (_PlayMs >= _PlayMsOffsets.RegionalForecast2_Start && _PlayMs < _PlayMsOffsets.RegionalForecast2_End)
    {
        _CurrentCanvasType = CanvasTypes.RegionalForecast2;
        _CurrentPosition = _CurrentCanvasType;
    }
    else if (_PlayMs >= _PlayMsOffsets.RegionalObservations_Start && _PlayMs < _PlayMsOffsets.RegionalObservations_End)
    {
        _CurrentCanvasType = CanvasTypes.RegionalObservations;
        _CurrentPosition = _CurrentCanvasType;
    }
    else if (_PlayMs >= _PlayMsOffsets.LocalForecast_Start && _PlayMs < _PlayMsOffsets.LocalForecast_End)
    {
        _CurrentCanvasType = CanvasTypes.LocalForecast;
        _CurrentPosition = _CurrentCanvasType;
        SubMs = _PlayMs - _PlayMsOffsets.LocalForecast_Start;

        _UpdateLocalForecastIndex = Math.floor(SubMs / 10000);
        _CurrentPosition += _UpdateLocalForecastIndex / 10;

        if (_IsSpeaking == true)
        {
            if (_UpdateLocalForecastIndex != PrevUpdateLocalForecastIndex)
            {
                _UpdateLocalForecastIndex = PrevUpdateLocalForecastIndex;
                _CurrentPosition = _CurrentCanvasType;
                _CurrentPosition += _UpdateLocalForecastIndex / 10;
            }
        }

        UpdateLocalForecast();
    }
    else if (_PlayMs >= _PlayMsOffsets.MarineForecast_Start && _PlayMs < _PlayMsOffsets.MarineForecast_End)
    {
        _CurrentCanvasType = CanvasTypes.MarineForecast;
        _CurrentPosition = _CurrentCanvasType;
    }
    else if (_PlayMs >= _PlayMsOffsets.AirQuality_Start && _PlayMs < _PlayMsOffsets.AirQuality_End)
    {
        _CurrentCanvasType = CanvasTypes.AirQuality;
        _CurrentPosition = _CurrentCanvasType;
    }
    else if (_PlayMs >= _PlayMsOffsets.ExtendedForecast1_Start && _PlayMs < _PlayMsOffsets.ExtendedForecast1_End)
    {
        _CurrentCanvasType = CanvasTypes.ExtendedForecast1;
        _CurrentPosition = _CurrentCanvasType;
    }
    else if (_PlayMs >= _PlayMsOffsets.ExtendedForecast2_Start && _PlayMs < _PlayMsOffsets.ExtendedForecast2_End)
    {
        _CurrentCanvasType = CanvasTypes.ExtendedForecast2;
        _CurrentPosition = _CurrentCanvasType;
    }
    else if (_PlayMs >= _PlayMsOffsets.Almanac_Start && _PlayMs < _PlayMsOffsets.Almanac_End)
    {
        _CurrentCanvasType = CanvasTypes.Almanac;
        _CurrentPosition = _CurrentCanvasType;
    }
    else if (_PlayMs >= _PlayMsOffsets.AlmanacTides_Start && _PlayMs < _PlayMsOffsets.AlmanacTides_End)
    {
        _CurrentCanvasType = CanvasTypes.AlmanacTides;
        _CurrentPosition = _CurrentCanvasType;
    }
    else if (_PlayMs >= _PlayMsOffsets.Outlook_Start && _PlayMs < _PlayMsOffsets.Outlook_End)
    {
        _CurrentCanvasType = CanvasTypes.Outlook;
        _CurrentPosition = _CurrentCanvasType;
    }
    else if (_PlayMs >= _PlayMsOffsets.LocalRadar_Start && _PlayMs < _PlayMsOffsets.LocalRadar_End)
    {
        _CurrentCanvasType = CanvasTypes.LocalRadar;
        _CurrentPosition = _CurrentCanvasType;
        SubMs = _PlayMs - _PlayMsOffsets.LocalRadar_Start;

        SubMs = SubMs % 4500;

        if (SubMs < 2000)
        {
            _DopplerRadarImageIndex = 0;
        }
        else
        {
            _DopplerRadarImageIndex = (_DopplerRadarImageMax - 1) - (Math.floor((SubMs - 2000) / 500));
        }

        //_CurrentPosition += _DopplerRadarImageIndex / 10;

        UpdateDopplarRadarImage();
    }
    else if (_PlayMs >= _PlayMsOffsets.Hazards_Start && _PlayMs < _PlayMsOffsets.Hazards_End)
    {
        _CurrentCanvasType = CanvasTypes.Hazards;
        _CurrentPosition = _CurrentCanvasType;

        SubMs = _PlayMs - _PlayMsOffsets.Hazards_Start;

        // Wait 3 seconds and then start scrolling.
        if (SubMs < 3000)
        {
            _UpdateHazardsY = -385;
        }
        if (SubMs >= 3000)
        {
            //y += 1;
            _UpdateHazardsY = (3 * ((SubMs - 3000) / _PlayInterval)) - 385;
        }
        if (_UpdateHazardsY > cnvHazardsScroll.height())
        {
            _UpdateHazardsY = cnvHazardsScroll.height();

            // Wait 10 seconds and start all over.
        }

        //_CurrentPosition += Math.round(_UpdateHazardsY / 385) / 10;

        UpdateHazards();
    }

    if (_IsSpeaking == true)
    {
        if (_CurrentCanvasType != PrevCanvasType)
        {
            _CurrentCanvasType = PrevCanvasType;
            _CurrentPosition = PrevPosition;
            _PlayMs = PrevPlayMs - _PlayInterval;
        }
    }
    //console.log("_PlayMs=" + _PlayMs);


    Navigate();

    //_PlayMs += _PlayInterval;


    //switch (_CurrentCanvasType)
    //{
    //    case CanvasTypes.TravelForecast:
    //        // Wait 3 seconds and then start scrolling.
    //        if (_PlayMs < 3000)
    //        {
    //            _UpdateTravelCitiesY = 0;
    //        }
    //        if (_PlayMs >= 3000)
    //        {
    //            //y += 1;
    //            _UpdateTravelCitiesY = 3 * ((_PlayMs - 3000) / _PlayInterval);
    //        }
    //        if (_PlayMs >= 60000)
    //        {
    //            _PlayMs = 0;
    //            Navigate(1);
    //        }
    //        if (_UpdateTravelCitiesY > cnvTravelCitiesScroll.height() - 289)
    //        {
    //            _UpdateTravelCitiesY = cnvTravelCitiesScroll.height() - 289;

    //            // Wait 10 seconds and start all over.
    //        }

    //        UpdateTravelCities(-1);
    //        break;

    //    default:
    //        if (_PlayMs >= 10000)
    //        {
    //            _PlayMs = 0;
    //            Navigate(1);
    //        }
    //        break;
    //}


    //if (_CurrentCanvasType == CanvasTypes.Progress)
    //{
    //    _PlayMs = 0;
    //    Navigate(1);
    //}
            

    //NavigateNext();
};

var NavigatePlayToggle = function ()
{

    _IsPlaying = !(_IsPlaying);

    if (_PlayIntervalId)
    {
        window.clearInterval(_PlayIntervalId);
        _PlayIntervalId = null;
    }

    if (_IsPlaying == true)
    {

        _PlayIntervalId = window.setInterval(function ()
        {
            if (_WeatherParameters.Progress.GetTotalPercentage() != 100)
            {
                return;
            }

            UpdatePlayPosition();
            _PlayMs += _PlayInterval;

        }, _PlayInterval);
        //NavigateNext();
    }
    else
    {
        //if (_PlayIntervalId)
        //{
        //    window.clearInterval(_PlayIntervalId);
        //    _PlayIntervalId = null;
        //}
    }

    if (_CallBack) _CallBack({ Status: "ISPLAYING", Value: _IsPlaying });

};

var IsPlaying = function ()
{
    return _IsPlaying;
};

var canvasProgress_mousemove = function (e)
{
    canvasProgress.css("cursor", "");

    var RatioX = canvasProgress.width() / 640;
    var RatioY = canvasProgress.height() / 480;

    if (e.offsetX >= (70 * RatioX) && e.offsetX <= (565 * RatioX))
    {
        //if (e.offsetY >= (105 * RatioY) && e.offsetY <= (350 * RatioY))
        if (e.offsetY >= (100 * RatioY) && e.offsetY <= (385 * RatioY))
        {
            // Show hand cursor.
            canvasProgress.css("cursor", "pointer");
        }
    }
};
var canvasProgress_click = function (e)
{
    var Hazards = _WeatherParameters.WeatherHazardConditions.Hazards;

    var RatioX = canvasProgress.width() / 640;
    var RatioY = canvasProgress.height() / 480;

    if (e.offsetX >= (70 * RatioX) && e.offsetX <= (565 * RatioX))
    {
        if (e.offsetY >= (100 * RatioY) && e.offsetY < (129 * RatioY))
        {
            if (_WeatherParameters.Progress.CurrentConditions == LoadStatuses.Loaded)
            {
                // Current Conditions
                _CurrentCanvasType = CanvasTypes.CurrentWeather;
                AssignPlayMsOffsets();
                //window.location.hash = "#aCurrentWeather";
                NavigateReset();
            }
        }
        else if (e.offsetY >= (129 * RatioY) && e.offsetY < (158 * RatioY))
        {
            // Latest Observations
            if (_WeatherParameters.Progress.NearbyConditions == LoadStatuses.Loaded)
            {
                _CurrentCanvasType = CanvasTypes.LatestObservations;
                AssignPlayMsOffsets();
                //window.location.hash = "#aLatestObservations";
                NavigateReset();
            }
        }
        else if (e.offsetY >= (158 * RatioY) && e.offsetY < (187 * RatioY))
        {
            // Travel Forecast
            if (_WeatherParameters.Progress.TravelForecast == LoadStatuses.Loaded)
            {
                _CurrentCanvasType = CanvasTypes.TravelForecast;
                UpdateTravelCities(0);
                AssignPlayMsOffsets();
                //window.location.hash = "#aTravelForecast";
                NavigateReset();
            }
        }
        else if (e.offsetY >= (187 * RatioY) && e.offsetY < (216 * RatioY))
        {
            // Regional Forecast
            if (_WeatherParameters.Progress.TomorrowsRegionalMap == LoadStatuses.Loaded)
            {
                _CurrentCanvasType = CanvasTypes.RegionalForecast1;
                //window.location.hash = "#aRegionalForecast";
                AssignPlayMsOffsets();
                NavigateReset();
            }
        }
        else if (e.offsetY >= (216 * RatioY) && e.offsetY < (245 * RatioY))
        {
            if (_WeatherParameters.Progress.CurrentRegionalMap == LoadStatuses.Loaded)
            {
                // Regional Observations
                _CurrentCanvasType = CanvasTypes.RegionalObservations;
                AssignPlayMsOffsets();
                //window.location.hash = "#aRegionalObservations";
                NavigateReset();
            }
        }
        else if (e.offsetY >= (245 * RatioY) && e.offsetY < (274 * RatioY))
        {
            // Local Forecast
            if (_WeatherParameters.Progress.WordedForecast == LoadStatuses.Loaded)
            {
                _CurrentCanvasType = CanvasTypes.LocalForecast;
                UpdateLocalForecast(0);
                AssignPlayMsOffsets();
                //window.location.hash = "#aLocalForecast";
                NavigateReset();
            }
        }
        else if (e.offsetY >= (274 * RatioY) && e.offsetY < (303 * RatioY))
        {
            // Extended Forecast
            if (_WeatherParameters.Progress.FourDayForecast == LoadStatuses.Loaded)
            {
                _CurrentCanvasType = CanvasTypes.ExtendedForecast1;
                AssignPlayMsOffsets();
                //window.location.hash = "#aExtendedForecast";
                NavigateReset();
            }
        }
        else if (e.offsetY >= (303 * RatioY) && e.offsetY < (332 * RatioY))
        {
            // Almanac
            if (_WeatherParameters.Progress.Almanac == LoadStatuses.Loaded)
            {
                _CurrentCanvasType = CanvasTypes.Almanac;
                AssignPlayMsOffsets();
                //window.location.hash = "#aAlmanac";
                NavigateReset();
            }
        }
        else if (e.offsetY >= (332 * RatioY) && e.offsetY < (361 * RatioY))
        {
            // Local Radar
            if (_WeatherParameters.Progress.DopplerRadar == LoadStatuses.Loaded)
            {
                _CurrentCanvasType = CanvasTypes.LocalRadar;
                UpdateDopplarRadarImage(0);
                AssignPlayMsOffsets();
                //window.location.hash = "#aLocalRadar";
                NavigateReset();
            }
        }
        else if (e.offsetY >= (361 * RatioY) && e.offsetY < (390 * RatioY))
        {
            // Hazards
            if (_WeatherParameters.Progress.Hazards == LoadStatuses.Loaded && Hazards.length > 0)
            {
                _CurrentCanvasType = CanvasTypes.Hazards;
                UpdateHazards(0);
                AssignPlayMsOffsets();
                //window.location.hash = "#aHazards";
                NavigateReset();
            }
        }


    }
};

// See: http://www.nws.noaa.gov/mdl/XML/Design/MDL_XML_Design.htm
//<dwml xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0" xsi:noNamespaceSchemaLocation="http://graphical.weather.gov/xml/DWMLgen/schema/DWML.xsd">
var WeatherDwmlParser = function (xml)
{
    //this._self = this;

    var dwml = xml.find("dwml");

    this.xmlns_xsd = dwml.attr("xmlns:xsd");
    this.xmlns_xsi = dwml.attr("xmlns:xsi");
    this.version = dwml.attr("version");
    this.xsi_noNamespaceSchemaLocation = dwml.attr("xsi:noNamespaceSchemaLocation");

    this.head = new DwmlHead(dwml.find("head"));
    this.data_current_observations = new DwmlData(dwml.find("data[type='current observations']"));
    this.data_forecast = new DwmlData(dwml.find("data[type='forecast']"));
};

//<head>
//</head>
var DwmlHead = function (head)
{
    this.product = new DwmlHeadProduct(head.find("product"));
    this.source = new DwmlHeadSource(head.find("source"));
};

//<product concise-name="dwmlByDay" operational-mode="developmental" srsName="WGS 1984">
//<creation-date refresh-frequency="PT1H">2016-09-08T22:27:56-04:00</creation-date>
//<category>current observations and forecast</category>
//</product>
var DwmlHeadProduct = function (product)
{
    this.concise_name = product.attr("concise-name");
    this.operational_mode = product.attr("operational-mode");
    this.srsName = product.attr("srsName");

    this.creation_date = new DwmlHeadProductCreationDate(product.find("creation-date"));
    //this.category = new DwmlHeadProductCategory(product.find("category"));
    this.category = product.find("category").text();
};
var DwmlHeadProductCreationDate = function (creation_date)
{
    this.refresh_frequency = creation_date.attr("refresh-frequency");
    this.value = creation_date.text();
};
//var DwmlHeadProductCategory = function (category)
//{
//    this.value = category.text();
//};

//<source>
//<production-center>Baltimore, MD/Washington, D.C.</production-center>
//<credit>http://www.weather.gov/lwx</credit>
//<more-information>http://www.nws.noaa.gov/forecasts/xml/</more-information>
//</source>
var DwmlHeadSource = function (source)
{
    this.production_center = source.find("production-center").text();
    this.credit = source.find("credit").text();
    this.more_information = source.find("more-information").text();
};
//var DwmlHeadSourceProductionCenter = function (production_center)
//{
//    this.value = production_center.text();
//};
//var DwmlHeadSourceCredit = function (credit)
//{
//    this.value = credit.text();
//};
//var DwmlHeadSourceMoreInformation = function (more_information)
//{
//    this.value = more_information.text();
//};


//<data type="current observations">
var DwmlData = function (data)
{
    var applicable_location;
    var time_layout;

    this.location = new DwmlDataLocation(data.find("location"));

    applicable_location = this.location.location_key; //.value;

    this.moreWeatherInformation = new DwmlDataMoreWeatherInformation(data.find("moreWeatherInformation[applicable-location='" + applicable_location + "']"));

    //this.time_layout = new DwmlDataTimeLayout(data.find("time-layout"));
    var _self = this;
    this.time_layout = [];
    data.find("time-layout").each(function ()
    {
        _self.time_layout.push(new DwmlDataTimeLayout($(this)));
    });

    this.parameters = new DwmlDataParameters(data.find("parameters[applicable-location='" + applicable_location + "']"));
};

//<location>
//<location-key>point1</location-key>
//<point latitude="39.4" longitude="-77.98"/>
//<area-description>Eastern WV Regional Airport/Shepherd Field, WV</area-description>
//<height datum="mean sea level" height-units="feet">538</height>
//</location>
//<location-key>point1</location-key>
//<description>Medford, NY</description>
//<point latitude="40.84" longitude="-72.99"/>
//<city state="NY">Medford</city>
//<height datum="mean sea level">128</height>
var DwmlDataLocation = function (location)
{
    //this.location_key = new DwmlDataLocationLocationKey(location.find("location-key"));
    this.location_key = location.find("location-key").text();
    this.point = new DwmlDataLocationPoint(location.find("point"));
    this.height = new DwmlDataLocationHeight(location.find("height"));

    // Current Observations Only
    //this.area_description = new DwmlDataLocationAreaDescription(location.find("area-description"));
    this.area_description = location.find("area-description").text();

    // Forecast Only
    //this.description = new DwmlDataLocationDescription(location.find("description"));
    this.description = location.find("description").text();
    this.city = new DwmlDataLocationCity(location.find("city"));
};
//var DwmlDataLocationLocationKey = function (location_key)
//{
//    this.value = location_key.text();
//};
var DwmlDataLocationPoint = function (point)
{
    this.latitude = point.attr("latitude");
    this.longitude = point.attr("longitude");
};
var DwmlDataLocationHeight = function (height)
{
    this.datum = height.attr("datum");
    this.height_units = height.attr("height-units");
    this.value = height.text();
};
//var DwmlDataLocationAreaDescription = function (area_description)
//{
//    this.value = area_description.text();
//};
//var DwmlDataLocationDescription = function (description)
//{
//    this.value = description.text();
//};
var DwmlDataLocationCity = function (city)
{
    this.state = city.attr("state");
    this.value = city.text();
};

//<moreWeatherInformation applicable-location="point1">http://www.nws.noaa.gov/data/obhistory/KMRB.html</moreWeatherInformation>
var DwmlDataMoreWeatherInformation = function (moreWeatherInformation)
{
    this.applicable_location = moreWeatherInformation.attr("applicable-location");
    this.value = moreWeatherInformation.text();
};

//<time-layout time-coordinate="local">
//<layout-key>k-p1h-n1-1</layout-key>
//<start-valid-time period-name="current">2016-09-08T22:53:00-04:00</start-valid-time>
//</time-layout>
var DwmlDataTimeLayout = function (time_layout)
{
    this.time_coordinate = time_layout.attr("time-coordinate");
    this.summarization = time_layout.attr("summarization");

    //this.layout_key = new DwmlDataTimeLayoutLayoutKey(time_layout.find("layout-key"));
    this.layout_key = time_layout.find("layout-key").text();

    var _self = this;
    this.start_valid_time = [];
    time_layout.find("start-valid-time").each(function ()
    {
        _self.start_valid_time.push(new DwmlDataTimeLayoutStartValidTime($(this)));
    });
};
//var DwmlDataTimeLayoutLayoutKey = function (layout_key)
//{
//    this.value = layout_key.text();
//};
var DwmlDataTimeLayoutStartValidTime = function (start_valid_time)
{
    this.period_name = start_valid_time.attr("period-name");
    this.value = start_valid_time.text();
};

//<parameters applicable-location="point1">
//<temperature type="apparent" units="Fahrenheit" time-layout="k-p1h-n1-1">
//<value>73</value>
//</temperature>
//<temperature type="dew point" units="Fahrenheit" time-layout="k-p1h-n1-1">
//<value>71</value>
//</temperature>
//<humidity type="relative" time-layout="k-p1h-n1-1">
//<value>94</value>
//</humidity>
var DwmlDataParameters = function (parameters)
{
    this.applicable_location = parameters.attr("applicable-location");
    this.weather = new DwmlDataParametersWeather(parameters.find("weather"));
    this.conditions_icon = new DwmlDataParametersConditionsIcon(parameters.find("conditions-icon"));

    // Current Observations Only
    this.temperature_apparent = new DwmlDataParametersTemperature(parameters.find("temperature[type='apparent']"));
    this.temperature_dew_point = new DwmlDataParametersTemperature(parameters.find("temperature[type='dew point']"));
    this.humidity = new DwmlDataParametersHumidity(parameters.find("humidity"));
    this.direction = new DwmlDataParametersDirection(parameters.find("direction"));
    this.wind_speed_gust = new DwmlDataParametersWindSpeed(parameters.find("wind-speed[type='gust']"));
    this.wind_speed_sustained = new DwmlDataParametersWindSpeed(parameters.find("wind-speed[type='sustained']"));
    this.pressure = new DwmlDataParametersPressure(parameters.find("pressure"));

    // Forecast Only
    this.temperature_maximum = new DwmlDataParametersTemperature(parameters.find("temperature[type='maximum']"));
    this.temperature_minimum = new DwmlDataParametersTemperature(parameters.find("temperature[type='minimum']"));
    this.probability_of_precipitation = new DwmlDataParametersProbabilityOfPrecipitation(parameters.find("probability-of-precipitation"));
    this.wordedForecast = new DwmlDataParametersWordedForecast(parameters.find("wordedForecast"));
    this.hazards = new DwmlDataParametersHazards(parameters.find("hazards"));
};
var DwmlDataParametersTemperature = function (temperature)
{
    this.type = temperature.attr("type");
    this.units = temperature.attr("units");
    this.time_layout = temperature.attr("time-layout");

    var _self = this;
    this.value = [];
    temperature.find("value").each(function ()
    {
        _self.value.push($(this).text());
    });

    // Forecast Only
    this.name = temperature.find("name").text();
};
var DwmlDataParametersHumidity = function (humidity)
{
    this.type = humidity.attr("type");
    this.time_layout = humidity.attr("time-layout");
    this.value = humidity.find("value").text();
};
//<weather time-layout="k-p1h-n1-1">
//<name>Weather Type, Coverage, Intensity</name>
//<weather-conditions weather-summary=" Fog/Mist"/>
//<weather-conditions>
//<value>
//<visibility units="statute miles">6.00</visibility>
//</value>
//</weather-conditions>
//</weather>
var DwmlDataParametersWeather = function (weather)
{
    this.time_layout = weather.attr("time-layout");
    this.name = weather.find("name").text();

    var _self = this;
    this.weather_conditions = [];
    weather.find("weather-conditions").each(function ()
    {
        _self.weather_conditions.push(new DwmlDataParametersWeatherWeatherConditions($(this)));
    });
};
var DwmlDataParametersWeatherWeatherConditions = function (weather_conditions)
{
    this.weather_summary = weather_conditions.attr("weather-summary");
    this.visibility = new DwmlDataParametersWeatherWeatherConditionsVisibility(weather_conditions.find("value").find("visibility"));
};
var DwmlDataParametersWeatherWeatherConditionsVisibility = function (visibility)
{
    this.units = visibility.attr("units");
    this.value = visibility.text();
};
//<conditions-icon type="forecast-NWS" time-layout="k-p1h-n1-1">
//<name>Conditions Icon</name>
//<icon-link>
//http://forecast.weather.gov/newimages/medium/nfg.png
//</icon-link>
//</conditions-icon>
var DwmlDataParametersConditionsIcon = function (conditions_icon)
{
    this.type = conditions_icon.attr("type");
    this.time_layout = conditions_icon.attr("time-layout");
    this.name = conditions_icon.find("name").text();

    var _self = this;
    this.icon_link = [];
    conditions_icon.find("icon-link").each(function ()
    {
        _self.icon_link.push($(this).text());
    });
};
//<direction type="wind" units="degrees true" time-layout="k-p1h-n1-1">
//<value>180</value>
//</direction>
var DwmlDataParametersDirection = function (direction)
{
    this.type = direction.attr("type");
    this.units = direction.attr("units");
    this.time_layout = direction.attr("time-layout");
    this.value = direction.find("value").text();
};
//<wind-speed type="gust" units="knots" time-layout="k-p1h-n1-1">
//<value>NA</value>
//</wind-speed>
//<wind-speed type="sustained" units="knots" time-layout="k-p1h-n1-1">
//<value>5</value>
//</wind-speed>
var DwmlDataParametersWindSpeed = function (wind_speed)
{
    this.type = wind_speed.attr("type");
    this.units = wind_speed.attr("units");
    this.time_layout = wind_speed.attr("time-layout");
    this.value = wind_speed.find("value").text();
};
//<pressure type="barometer" units="inches of mercury" time-layout="k-p1h-n1-1">
//<value>29.85</value>
//</pressure>
var DwmlDataParametersPressure = function (pressure)
{
    this.type = pressure.attr("type");
    this.units = pressure.attr("units");
    this.time_layout = pressure.attr("time-layout");
    this.value = pressure.find("value").text();
};
//<probability-of-precipitation type="12 hour" units="percent" time-layout="k-p12h-n15-1">
//<name>12 Hourly Probability of Precipitation</name>
//<value>30</value>
//<value>30</value>
//<value>20</value>
//<value>20</value>
//<value xsi:nil="true"/>
//<value xsi:nil="true"/>
//<value xsi:nil="true"/>
//<value xsi:nil="true"/>
//<value xsi:nil="true"/>
//<value xsi:nil="true"/>
//<value xsi:nil="true"/>
//<value xsi:nil="true"/>
//<value xsi:nil="true"/>
//<value xsi:nil="true"/>
//<value xsi:nil="true"/>
//</probability-of-precipitation>
var DwmlDataParametersProbabilityOfPrecipitation = function (probability_of_precipitation)
{
    this.type = probability_of_precipitation.attr("type");
    this.units = probability_of_precipitation.attr("units");
    this.time_layout = probability_of_precipitation.attr("time-layout");

    var _self = this;
    this.value = [];
    probability_of_precipitation.find("value").each(function ()
    {
        _self.value.push($(this).text());
    });

    // Forecast Only
    this.name = probability_of_precipitation.find("name").text();
};
//<wordedForecast time-layout="k-p12h-n15-1" dataSource="lwxNetcdf" wordGenerator="markMitchell">
//<name>Text Forecast</name>
//<text>
//Scattered showers and thunderstorms. Partly sunny, with a high near 93. West wind around 7 mph. Chance of precipitation is 30%.
//</text>
//<text>
//Scattered showers and thunderstorms before midnight, then a slight chance of showers between midnight and 3am. Patchy fog after 2am. Otherwise, mostly cloudy, with a low around 71. Northwest wind around 5 mph becoming calm in the evening. Chance of precipitation is 30%.
//</text>
//<text>
//A slight chance of showers and thunderstorms after 2pm. Patchy fog before 8am. Otherwise, partly sunny, with a high near 94. Southwest wind 3 to 8 mph. Chance of precipitation is 20%.
//</text>
//<text>
//A slight chance of showers and thunderstorms before 8pm, then a slight chance of showers and thunderstorms after 2am. Mostly cloudy, with a low around 68. South wind 6 to 8 mph becoming west after midnight. Chance of precipitation is 20%.
//</text>
//<text>
//Mostly sunny, with a high near 82. Northwest wind 8 to 11 mph.
//</text>
//<text>Clear, with a low around 57.</text>
//<text>Sunny, with a high near 82.</text>
//<text>Mostly clear, with a low around 61.</text>
//<text>Mostly sunny, with a high near 85.</text>
//<text>Mostly clear, with a low around 64.</text>
//<text>Mostly sunny, with a high near 85.</text>
//<text>Partly cloudy, with a low around 56.</text>
//<text>Sunny, with a high near 77.</text>
//<text>Partly cloudy, with a low around 56.</text>
//<text>Mostly sunny, with a high near 78.</text>
//</wordedForecast>
var DwmlDataParametersWordedForecast = function (wordedForecast)
{
    this.time_layout = wordedForecast.attr("time-layout");
    this.dataSource = wordedForecast.attr("dataSource");
    this.wordGenerator = wordedForecast.attr("wordGenerator");
    this.name = wordedForecast.find("name").text();

    var _self = this;
    this.text = [];
    wordedForecast.find("text").each(function ()
    {
        _self.text.push($(this).text());
    });
};
//<hazards time-layout="">
//<name>Watches, Warnings, and Advisories</name>
//<hazard-conditions>
//<hazard headline="Short Term Forecast">
//<hazardTextURL>
//    http://forecast.weather.gov/showsigwx.php?warnzone=FLZ045&warncounty=FLC095&firewxzone=FLZ045&local_place1=2+Miles+N+Orlando+FL&product1=Short+Term+Forecast
//</hazardTextURL>
//</hazard>
//</hazard-conditions>
//</hazards>
var DwmlDataParametersHazards = function (hazards)
{
    this.time_layout = hazards.attr("time-layout");
    this.name = hazards.find("name").text();

    var _self = this;
    this.hazards_conditions = [];
    hazards.find("hazard-conditions").each(function ()
    {
        _self.hazards_conditions.push(new DwmlDataParametersHazardsHazardConditions($(this)));
    });
};
var DwmlDataParametersHazardsHazardConditions = function (hazards_conditions)
{
    this.headline = hazards_conditions.find("hazard").attr("headline");
    this.hazardTextURL = hazards_conditions.find("hazard").find("hazardTextURL").text();
};
//</parameters>

// See: http://www.moratech.com/aviation/metar-class/metar.html
//<response xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XML-Schema-instance" version="1.2" xsi:noNamespaceSchemaLocation="http://aviationweather.gov/adds/schema/metar1_2.xsd">
//<request_index>293913582</request_index>
//<data_source name="metars"/>
//<request type="retrieve"/>
//<errors/>
//<warnings/>
//<time_taken_ms>3</time_taken_ms>
var WeatherMetarsParser = function (xml, StationId)
{
    //this._self = this;

    var response = xml.find("response");

    this.xmlns_xsd = response.attr("xmlns:xsd");
    this.xmlns_xsi = response.attr("xmlns:xsi");
    this.version = response.attr("version");
    this.xsi_noNamespaceSchemaLocation = response.attr("xsi:noNamespaceSchemaLocation");

    this.request_index = response.find("request_index").text();
    this.data_source_name = response.find("data_source").attr("name");
    this.request_type = response.find("request").attr("type");
    this.errors = response.find("errors").text();
    this.warnings = response.find("warnings").text();
    this.time_taken_ms = response.find("time_taken_ms").text();

    if (StationId)
    {
        this.data_METAR = new ResponseDataMetar(response.find("data").find("METAR").find("station_id:contains(" + StationId + ")").parent().first());
    }
    else
    {
        this.data_METAR = new ResponseDataMetar(response.find("data").find("METAR").first());
    }
    
};

//var WeatherRegionalMetarsParser = function (xml)
//{
//    var _self = this;

//    var response = xml.find("response");

//    this.xmlns_xsd = response.attr("xmlns:xsd");
//    this.xmlns_xsi = response.attr("xmlns:xsi");
//    this.version = response.attr("version");
//    this.xsi_noNamespaceSchemaLocation = response.attr("xsi:noNamespaceSchemaLocation");

//    this.request_index = response.find("request_index").text();
//    this.data_source_name = response.find("data_source").attr("name");
//    this.request_type = response.find("request").attr("type");
//    this.errors = response.find("errors").text();
//    this.warnings = response.find("warnings").text();
//    this.time_taken_ms = response.find("time_taken_ms").text();

//    this.data_METAR = [];
//    response.find("data").find("METAR").each(function()
//    {
//        var DataMetar = new ResponseDataMetar($(this));
//        _self.data_METAR.push(DataMetar);
//    });

    
//};

//http://www.moratech.com/aviation/metar-class/metar-pg10-sky.html
//<raw_text>
//KHWV 120156Z AUTO 36010KT 10SM CLR 22/08 A3011 RMK AO2 SLP196 T02170083 TSNO
//</raw_text>
//<station_id>KHWV</station_id>
//<observation_time>2016-09-12T01:56:00Z</observation_time>
//<latitude>40.82</latitude>
//<longitude>-72.87</longitude>
//<temp_c>21.7</temp_c>
//<dewpoint_c>8.3</dewpoint_c>
//<wind_dir_degrees>360</wind_dir_degrees>
//<wind_speed_kt>10</wind_speed_kt>
//<visibility_statute_mi>10.0</visibility_statute_mi>
//<altim_in_hg>30.109253</altim_in_hg>
//<sea_level_pressure_mb>1019.6</sea_level_pressure_mb>
//<quality_control_flags>
//<auto>TRUE</auto>
//<auto_station>TRUE</auto_station>
//<lightning_sensor_off>TRUE</lightning_sensor_off>
//</quality_control_flags>
//<sky_condition sky_cover="CLR"/>
//<sky_condition sky_cover="FEW" cloud_base_ft_agl="1600"/>
//<sky_condition sky_cover="SCT" cloud_base_ft_agl="2200"/>
//<sky_condition sky_cover="SCT" cloud_base_ft_agl="3000"/>
//<flight_category>VFR</flight_category>
//<three_hr_pressure_tendency_mb>1.1</three_hr_pressure_tendency_mb>
//<metar_type>METAR</metar_type>
//<elevation_m>21.0</elevation_m>
var ResponseDataMetar = function (METAR)
{
    this.raw_text = METAR.find("raw_text").text();
    this.station_id = METAR.find("station_id").text();
    this.observation_time = METAR.find("observation_time").text();
    this.latitude = METAR.find("latitude").text();
    this.longitude = METAR.find("longitude").text();
    this.temp_c = METAR.find("temp_c").text();
    this.dewpoint_c = METAR.find("dewpoint_c").text();
    this.wind_dir_degrees = METAR.find("wind_dir_degrees").text();
    this.wind_speed_kt = METAR.find("wind_speed_kt").text();
    this.wind_gust_kt = METAR.find("wind_gust_kt").text();
    this.visibility_statute_mi = METAR.find("visibility_statute_mi").text();
    this.altim_in_hg = METAR.find("altim_in_hg").text();
    this.sea_level_pressure_mb = METAR.find("sea_level_pressure_mb").text();
    this.flight_category = METAR.find("flight_category").text();
    this.metar_type = METAR.find("metar_type").text();
    this.elevation_m = METAR.find("elevation_m").text();

    this.three_hr_pressure_tendency_mb = METAR.parent().find("METAR:has('> three_hr_pressure_tendency_mb')").find("three_hr_pressure_tendency_mb").text();

    this.sea_level_pressure_mb_prev = METAR.parent().find("sea_level_pressure_mb").eq(1).text();
    this.altim_in_hg_prev = METAR.parent().find("altim_in_hg").eq(1).text();

    this.quality_control_flags = new ResponseDataMetarQualityControlFlags(METAR.find("quality_control_flags"));

    var _self = this;
    this.sky_condition = [];
    METAR.find("sky_condition").each(function ()
    {
        _self.sky_condition.push(new ResponseDataMetarSkyCondition($(this)));
    });
};
var ResponseDataMetarQualityControlFlags = function (quality_control_flags)
{
    this.auto = quality_control_flags.find("auto").text();
    this.auto_station = quality_control_flags.find("auto_station").text();
    this.lightning_sensor_off = quality_control_flags.find("lightning_sensor_off").text();
};
var ResponseDataMetarSkyCondition = function(sky_condition)
{
    this.sky_cover = sky_condition.attr("sky_cover");
    this.cloud_base_ft_agl = sky_condition.attr("cloud_base_ft_agl");
};
//</response>


var WeatherCurrentConditions = function (WeatherDwmlParser, WeatherMetarsParser)
{
    var CurrentObservations = WeatherDwmlParser.data_current_observations;
    var MetarData = (WeatherMetarsParser ? WeatherMetarsParser.data_METAR :  null);

    if (CurrentObservations.location.area_description && CurrentObservations.location.area_description != ", ")
    {
        this.StationName = CurrentObservations.location.area_description;
    }
    else
    {
        this.StationName = MetarData.station_id;
    }
    //this.StationId = GetStationIdFromUrl(CurrentObservations.moreWeatherInformation.value);
    this.StationId = (MetarData.station_id || GetStationIdFromUrl(CurrentObservations.moreWeatherInformation.value));
    this.Latitude = CurrentObservations.location.point.latitude;
    this.Longitude = CurrentObservations.location.point.longitude;

    if (this.StationId in _StationInfo)
    {
        this.StationName = _StationInfo[this.StationId].City;
        this.StationName = this.StationName.split("/")[0];
    }

    ////this.DateTime = ConvertXmlDateToJsDate(CurrentObservations.time_layout[0].start_valid_time[0].value);
    //this.DateTime = ConvertXmlDateToJsDate(MetarData.observation_time);

    if (MetarData && MetarData.raw_text && MetarData.temp_c)
    {
        this.Temperature = ConvertCelsiusToFahrenheit(MetarData.temp_c);
        this.DewPoint = ConvertCelsiusToFahrenheit(MetarData.dewpoint_c);
        this.Humidity = CalculateRelativeHumidity(MetarData.temp_c, MetarData.dewpoint_c);
    }
    else
    {
        this.Temperature = CurrentObservations.parameters.temperature_apparent.value[0];
        this.DewPoint = CurrentObservations.parameters.temperature_dew_point.value[0];
        this.Humidity = CurrentObservations.parameters.humidity.value;
    }
    this.HeatIndex = CalculateHeatIndex(this.Temperature, this.Humidity);

    this.TemperatureC = ConvertFahrenheitToCelsius(this.Temperature);
    this.DewPointC = ConvertFahrenheitToCelsius(this.DewPoint);
    this.HeatIndexC = ConvertFahrenheitToCelsius(this.HeatIndex);

    this.Conditions = "";
    if (CurrentObservations.parameters.weather.weather_conditions[0].weather_summary.trim() != "")
    {
        this.Conditions = CurrentObservations.parameters.weather.weather_conditions[0].weather_summary.trim();
    }
    else if (MetarData && MetarData.raw_text)
    {
        this.Conditions = ParseMetarCurrentObservations(MetarData.raw_text);
    }

    this.Conditions = this.Conditions.replaceAll("A ", "");
    this.Conditions = this.Conditions.replaceAll(" and ", "/");
    //this.Conditions = this.Conditions.replaceAll("Light", "Lt");
    //this.Conditions = this.Conditions.replaceAll("Heavy", "Hvy");
    //this.Conditions = this.Conditions.replaceAll("Partly", "Ptly");
    this.ShortConditions = this.Conditions;
    this.ShortConditions = this.ShortConditions.replaceAll("Light", "L");
    this.ShortConditions = this.ShortConditions.replaceAll("Heavy", "H");
    this.ShortConditions = this.ShortConditions.replaceAll("Partly", "P");
    this.ShortConditions = this.ShortConditions.replaceAll("Mostly", "M");
    this.ShortConditions = this.ShortConditions.replaceAll("Few", "F");
    this.ShortConditions = this.ShortConditions.replaceAll("Thunderstorm", "T'storm");
    this.ShortConditions = this.ShortConditions.replaceAll(" in ", "");
    this.ShortConditions = this.ShortConditions.replaceAll("Vicinity", "");
    this.ShortConditions = this.ShortConditions.replaceAll(" and ", " ");
    this.ShortConditions = this.ShortConditions.replaceAll("Freezing Rain", "Frz Rn");
    this.ShortConditions = this.ShortConditions.replaceAll("Freezing", "Frz");
    this.ShortConditions = this.ShortConditions.replaceAll("Unknown Precip", "");
    this.ShortConditions = this.ShortConditions.replaceAll("L Snow Fog", "L Snw/Fog");
    this.ShortConditions = this.ShortConditions.replaceAll(" with ", "/");

    this.Icon = CurrentObservations.parameters.conditions_icon.icon_link[0];
    //this.Icon = GetWeatherIconFromIconLink(this.Icon);
    //this.Icon = GetWeatherIconFromIconLink(this.Icon, this.Conditions, _WeatherParameters);
    this.Icon = GetWeatherIcon2FromIconLink(this.Icon, this.Conditions, _WeatherParameters);

    if (MetarData && MetarData.visibility_statute_mi)
    {
        this.Visibility = MetarData.visibility_statute_mi;
    }
    else
    {
        this.Visibility = CurrentObservations.parameters.weather.weather_conditions[1].visibility.value;
    }
    this.VisibilityC = "";
    if (this.Visibility) this.VisibilityC = ConvertMilesToKilometers(this.Visibility);

    //this.Ceiling = "";
    this.Ceiling = "";
    this.CeilingC = "";
    var _self = this;
    if (MetarData && MetarData.sky_condition)
    {
        $(MetarData.sky_condition).each(function ()
        {
            switch (this.sky_cover)
            {
                case "BKN":
                case "OVC":
                case "VV":
                    if (_self.Ceiling != "" && parseInt(this.cloud_base_ft_agl) < parseInt(_self.Ceiling))
                    {
                        _self.Ceiling = this.cloud_base_ft_agl;
                    }
                    else
                    {
                        _self.Ceiling = this.cloud_base_ft_agl;
                    }

                    break;
            }
        });
    }
    if (this.Ceiling) this.CeilingC = ConvertFeetToMeters(this.Ceiling);

    if (MetarData && MetarData.altim_in_hg)
    {
        this.Pressure = Math.round2(parseFloat(MetarData.altim_in_hg), 2);
    }
    else
    {
        this.Pressure = CurrentObservations.parameters.pressure.value;
    }
    this.Pressure = parseFloat(Math.round(this.Pressure * 100) / 100).toFixed(2);
    this.PressureC = ConvertInchesToMillibars(this.Pressure);

    if (MetarData && MetarData.raw_text)
    {
        //var pressure_tendency = parseFloat(MetarData.three_hr_pressure_tendency_mb);
        //var pressure_tendency = parseFloat(MetarData.sea_level_pressure_mb_prev);
        var pressure_tendency = 0;
        if (MetarData.sea_level_pressure_mb_prev != "" && MetarData.sea_level_pressure_mb != "")
        {
            pressure_tendency = parseFloat(MetarData.sea_level_pressure_mb) - parseFloat(MetarData.sea_level_pressure_mb_prev);
        }
        else
        {
            pressure_tendency = parseFloat(MetarData.altim_in_hg) - parseFloat(MetarData.altim_in_hg_prev);
        }
        if (pressure_tendency > 0)
        {
            this.PressureDirection = "R";
        }
        else if (pressure_tendency < 0)
        {
            this.PressureDirection = "F";
        }
        else
        {
            this.PressureDirection = "S";
        }
    }
    else
    {
        this.PressureDirection = "";
    }

    if (MetarData && MetarData.raw_text)
    {
        this.WindDirection = ConvertDirectionToNSEW(MetarData.wind_dir_degrees);
        this.WindSpeed = "Calm";
        //if (CurrentObservations.parameters.wind_speed_sustained.value != "0")
        if (MetarData.wind_speed_kt != "" && MetarData.wind_speed_kt != "0")
        {
            this.WindSpeed = ConvertKnotsToMph(MetarData.wind_speed_kt);
        }
        else if (MetarData.wind_speed_kt == "")
        {
            this.WindSpeed = "NA";
            this.WindDirection = "";
        }
        else
        {
            this.WindDirection = "";
        }

        this.WindGust = "";
        //if (CurrentObservations.parameters.wind_speed_gust.value != "NA")
        if (MetarData.wind_gust_kt != "" && MetarData.wind_gust_kt != "0")
        {
            this.WindGust = ConvertKnotsToMph(MetarData.wind_gust_kt);
        }
    }
    else
    {
        this.WindDirection = ConvertDirectionToNSEW(CurrentObservations.parameters.direction.value);
        this.WindSpeed = "Calm";
        if (CurrentObservations.parameters.wind_speed_sustained.value != "NA" && CurrentObservations.parameters.wind_speed_sustained.value != "0")
        {
            this.WindSpeed = ConvertKnotsToMph(CurrentObservations.parameters.wind_speed_sustained.value);
        }
        else if (CurrentObservations.parameters.wind_speed_sustained.value == "NA")
        {
            this.WindSpeed = "NA";
            this.WindDirection = "";
        }
        else
        {
            this.WindDirection = "";
        }

        this.WindGust = "";
        if (CurrentObservations.parameters.wind_speed_gust.value != "NA")
        {
            this.WindGust = ConvertKnotsToMph(CurrentObservations.parameters.wind_speed_gust.value);
        }
    }
    this.WindSpeedC = "";
    if (this.WindSpeed == "Calm")
    {
        this.WindSpeedC = "Calm";
    }
    else if (this.WindSpeed == "NA")
    {
        this.WindSpeedC = "NA";
    }
    else
    {
        this.WindSpeedC = ConvertMphToKph(this.WindSpeed);
    }
    this.WindGustC = "";
    if (this.WindGust) this.WindGustC = ConvertMphToKph(this.WindGust);

    //this.WindChill = CalculateWindChill(CurrentObservations.parameters.temperature_apparent.value[0], ConvertKnotsToMph(CurrentObservations.parameters.wind_speed_sustained.value));
    this.WindChill = CalculateWindChill(this.Temperature, this.WindSpeed);
    this.WindChillC = ConvertFahrenheitToCelsius(this.WindChill);
};

var ParseMetarCurrentObservations = function (raw_text)
{
    // See: https://math.la.asu.edu/~eric/workshop/METAR.html
    // "KSEM 272315Z AUTO 02006KT 3SM -TSRA FEW005 BKN018 OVC060 21/20 A3003 RMK AO2 LTG DSNT ALQDS"
    // "KISP 272256Z 00000KT 10SM OVC070 11/08 A2997 RMK AO2 SLP148 T01060078"

    var parsedMetar = parseMETAR(raw_text);
    var result = "";

    var intensity = "";
    var descriptor = "";
    var precipitation = "";
    var obscuration = "";

    var found_few = false;
    var found_overcast = false;
    var found_broken = false;
    var found_scat = false;

    if (parsedMetar.weather)
    {
        $(parsedMetar.weather).each(function ()
        {
            var info = this;

            switch (info.abbreviation)
            {
                case "-":
                    intensity = "Light";
                    break;
                case "+":
                    intensity = "Heavy";
                    break;

                case "TS":
                    descriptor = "Thunderstorm";
                    break;
                case "FZ":
                    descriptor = "Freezing";
                    break;
                case "SH":
                    descriptor = "Shower";
                    break;

                case "DZ":
                    precipitation = "Drizzle";
                    break;
                case "RA":
                    precipitation = "Rain";
                    break;
                case "SN":
                    precipitation = "Snow";
                    break;
                case "SG":
                    precipitation = "Snow";
                    break;
                case "IC":
                    precipitation = "Ice Crystals";
                    break;
                case "PE":
                    precipitation = "Ice Pellets";
                    break;
                case "GR":
                    precipitation = "Hail";
                    break;
                case "GS":
                    precipitation = "Hail";
                    break;

                case "BR":
                    obscuration = "Mist";
                    break;
                case "FG":
                    obscuration = "Fog";
                    break;
                case "FU":
                    obscuration = "Smoke";
                    break;
                case "VA":
                    obscuration = "Volcanic Ash";
                    break;
                case "DU":
                    obscuration = "Dust";
                    break;
                case "SA":
                    obscuration = "Sand";
                    break;
                case "HZ":
                    obscuration = "Haze";
                    break;
                case "PY":
                    obscuration = "Spray";
                    break;
            }
        });


        if (descriptor != "")
        {
            if (result != "")
            {
                result += " ";
            }
            result += descriptor;
        }
        if (intensity != "")
        {
            if (result != "")
            {
                result += " ";
            }
            result += intensity;
        }
        if (precipitation != "")
        {
            if (result != "")
            {
                result += " ";
            }
            result += precipitation;
        }
        if (obscuration != "")
        {
            if (result != "")
            {
                result += " / ";
            }
            result += obscuration;
        }
    }
    else if (parsedMetar.clouds)
    {
        $(parsedMetar.clouds).each(function ()
        {
            var info = this;

            switch (info.abbreviation)
            {
                case "CLR":
                case "SKC":
                    if (found_overcast == true || found_broken == true || found_scat == true || found_few == true)
                    {
                        return true;
                    }
                    result = "Clear";
                    break;

                case "FEW":
                    if (found_overcast == true || found_broken == true || found_scat == true)
                    {
                        return true;
                    }
                    result = "Few Clouds";
                    found_few = true;
                    break;

                case "SCT":
                    if (found_overcast == true || found_broken == true)
                    {
                        return true;
                    }
                    result = "Partly Cloudy";
                    found_scat = true;
                    break;

                case "BKN":
                    if (found_overcast == true)
                    {
                        return true;
                    }
                    result = "Mostly Cloudy";
                    found_broken = true;
                    break;

                case "OVC":
                    result = "Overcast";
                    found_overcast = true;
                    break;

            }
        });

    }

    return result;
};

Math.round2 = function(value, decimals)
{
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

var ConvertKnotsToMph = function (Knots)
{
    return Math.round(parseFloat(Knots) * 1.15078);
};
var ConvertKontsToKph = function (Knots)
{
    return Math.round(parseFloat(Knots) * 1.852);
};
var ConvertMphToKph = function (Mph)
{
    return Math.round(parseFloat(Mph) * 1.60934);
};

var ConvertCelsiusToFahrenheit = function (Celsius)
{
    return Math.round(parseFloat(Celsius) * 9 / 5 + 32);
};
var ConvertFahrenheitToCelsius = function (Fahrenheit)
{
    return  Math.round2(((parseFloat(Fahrenheit) - 32) * 5) / 9, 1);
};

var ConvertMilesToKilometers = function (Miles)
{
    return Math.round(parseFloat(Miles) * 1.60934);
};
var ConvertFeetToMeters = function (Feet)
{
    return Math.round(parseFloat(Feet) * 0.3048);
};

var ConvertInchesToMillibars = function (Inches)
{
    return Math.round2(parseFloat(Inches) / 0.0295301, 1);
};

var ConvertInchesToCentimeters = function (Inches)
{
    return Math.round2(parseFloat(Inches) * 2.54, 2);
};

var ConvertDirectionToNSEW = function (Direction)
{
    var val = Math.floor((Direction / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
};

var GetStationIdFromUrl = function (Url)
{
    var txt = Url;

    var re1 = '.*?';	// Non-greedy match on filler
    var re2 = '(?:[a-z][a-z]+)';	// Uninteresting: word
    var re3 = '.*?';	// Non-greedy match on filler
    var re4 = '(?:[a-z][a-z]+)';	// Uninteresting: word
    var re5 = '.*?';	// Non-greedy match on filler
    var re6 = '(?:[a-z][a-z]+)';	// Uninteresting: word
    var re7 = '.*?';	// Non-greedy match on filler
    var re8 = '(?:[a-z][a-z]+)';	// Uninteresting: word
    var re9 = '.*?';	// Non-greedy match on filler
    var re10 = '(?:[a-z][a-z]+)';	// Uninteresting: word
    var re11 = '.*?';	// Non-greedy match on filler
    var re12 = '(?:[a-z][a-z]+)';	// Uninteresting: word
    var re13 = '.*?';	// Non-greedy match on filler
    var re14 = '(?:[a-z][a-z]+)';	// Uninteresting: word
    var re15 = '.*?';	// Non-greedy match on filler
    var re16 = '((?:[a-z][a-z]+))';	// Word 1

    var p = new RegExp(re1 + re2 + re3 + re4 + re5 + re6 + re7 + re8 + re9 + re10 + re11 + re12 + re13 + re14 + re15 + re16, ["i"]);
    var m = p.exec(txt);
    if (m != null)
    {
        var word1 = m[1];
        return word1.replace(/</, "&lt;");
    }
};

var ConvertXmlDateToJsDate = function (XmlDate)
{
    var bits = XmlDate.split(/[-T:+]/g);

    if (bits[5] === undefined)
    {
        console.log("bit[5] is undefined");
    }

    bits[5] = bits[5].replace("Z", "");
    var d = new Date(bits[0], bits[1] - 1, bits[2]);
    d.setHours(bits[3], bits[4], bits[5]);

    // Case for when no time zone offset if specified
    if (bits.length < 8)
    {
        bits.push("00");
        bits.push("00");
    }

    // Get supplied time zone offset in minutes
    var offsetMinutes = bits[6] * 60 + Number(bits[7]);
    var sign = /\d\d-\d\d:\d\d$/.test(XmlDate) ? '-' : '+';

    // Apply the sign
    offsetMinutes = 0 + (sign == '-' ? -1 * offsetMinutes : offsetMinutes);

    // Apply offset and local timezone
    d.setMinutes(d.getMinutes() - offsetMinutes - d.getTimezoneOffset())

    // d is now a local time equivalent to the supplied time
    return d;
};

var CalculateRelativeHumidity = function (Temperature, DewPoint)
{
    var T = parseFloat(Temperature);
    var TD = parseFloat(DewPoint);

    return Math.round(100 * (Math.exp((17.625 * TD) / (243.04 + TD)) / Math.exp((17.625 * T) / (243.04 + T))));
};

var CalculateHeatIndex = function (Temperature, RelativeHumidity)
{
    // See: http://www.wpc.ncep.noaa.gov/html/heatindex_equation.shtml
    var T = parseFloat(Temperature);
    var RH = parseFloat(RelativeHumidity);
    var HI = 0.5 * (T + 61.0 + ((T - 68.0) * 1.2) + (RH * 0.094));
    var ADJUSTMENT;

    if (T >= 80)
    {
        HI = -42.379 + 2.04901523 * T + 10.14333127 * RH - .22475541 * T * RH - .00683783 * T * T - .05481717 * RH * RH + .00122874 * T * T * RH + .00085282 * T * RH * RH - .00000199 * T * T * RH * RH;

        if (RH < 13 && (T > 80 && T < 112))
        {
            ADJUSTMENT = ((13 - RH) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17);
            HI -= ADJUSTMENT;
        }
        else if (RH > 85 && (T > 80 && T < 87))
        {
            ADJUSTMENT = ((RH - 85) / 10) * ((87 - T) / 5);
            HI += ADJUSTMENT;
        }
    }

    if (HI < Temperature)
    {
        HI = Temperature;
    }

    return Math.round(HI);
};

var CalculateWindChill = function (Temperature, WindSpeed)
{
    // See: http://www.calculator.net/wind-chill-calculator.html

    if (WindSpeed == "0" || WindSpeed == "Calm" || WindSpeed == "NA")
    {
        return "";
    }

    var T = parseFloat(Temperature);
    var V = parseFloat(WindSpeed);
    var WC = 35.74 + (0.6215 * T) - (35.75 * Math.pow(V, 0.16)) + (0.4275 * T * Math.pow(V, 0.16));

    return Math.round(WC);
};

var PopulateCurrentConditions = function (WeatherParameters)
{
    if (WeatherParameters == null || (_DontLoadGifs == true && WeatherParameters.Progress.CurrentConditions != LoadStatuses.Loaded))
    {
        return;
    }

    var WeatherCurrentConditions = WeatherParameters.WeatherCurrentConditions;

    var Temperature;
    var DewPoint;
    var Ceiling;
    var CeilingUnit;
    var WindSpeed;
    var Pressure;
    var Visibility;
    var VisibilityUnit;
    var HeatIndex;
    var WindChill;
    var WindGust;
    var Humidity;

    switch (_Units)
    {
        case Units.English:
            Temperature = WeatherCurrentConditions.Temperature;
            DewPoint = WeatherCurrentConditions.DewPoint;
            Ceiling = WeatherCurrentConditions.Ceiling;
            CeilingUnit = "ft.";
            Visibility = WeatherCurrentConditions.Visibility;
            VisibilityUnit = " mi.";
            WindSpeed = WeatherCurrentConditions.WindSpeed;
            Pressure = WeatherCurrentConditions.Pressure;
            HeatIndex = WeatherCurrentConditions.HeatIndex;
            WindChill = WeatherCurrentConditions.WindChill;
            WindGust = WeatherCurrentConditions.WindGust;
            Humidity = WeatherCurrentConditions.Humidity;
            break;

        case Units.Metric:
            Temperature = WeatherCurrentConditions.TemperatureC;
            DewPoint = WeatherCurrentConditions.DewPointC;
            Ceiling = WeatherCurrentConditions.CeilingC;
            CeilingUnit = "m.";
            Visibility = WeatherCurrentConditions.VisibilityC;
            VisibilityUnit = " km.";
            WindSpeed = WeatherCurrentConditions.WindSpeedC;
            Pressure = WeatherCurrentConditions.PressureC;
            HeatIndex = WeatherCurrentConditions.HeatIndexC;
            WindChill = WeatherCurrentConditions.WindChillC;
            WindGust = WeatherCurrentConditions.WindGustC;
            Humidity = WeatherCurrentConditions.Humidity;
            break;
    }

    divTemperature.html(WeatherCurrentConditions.Temperature + "&deg;");
    divStation.html(WeatherCurrentConditions.StationName);
    divConditions.html(WeatherCurrentConditions.Conditions);
    divHumidity.html("Humidity: " + WeatherCurrentConditions.Humidity + "%");
    divDewpoint.html("Dewpoint: " + WeatherCurrentConditions.DewPoint + "&deg;");
    divCeiling.html("Ceiling: " + (WeatherCurrentConditions.Ceiling == "" ? "Unlimited" : WeatherCurrentConditions.Ceiling + " ft."));
    divVisibility.html("Visibility: " + parseInt(WeatherCurrentConditions.Visibility) + " mi.");
    divWind.html("Wind: " + WeatherCurrentConditions.WindDirection + " " + WeatherCurrentConditions.WindSpeed);
    divPressure.html("Pressure: " + WeatherCurrentConditions.Pressure + " " + WeatherCurrentConditions.PressureDirection);// + " " + WeatherCurrentConditions.PressureDirection);
    
    //switch (WeatherCurrentConditions.PressureDirection)
    //{
    //    case "R": //&uarr;
    //        divPressure.html(divPressure.html() + " &uarr;");
    //        break;
    //    case "F": //&darr;
    //        divPressure.html(divPressure.html() + " &darr;");
    //        break;
    //}

    divHeatIndex.empty();
    if (WeatherCurrentConditions.HeatIndex != WeatherCurrentConditions.Temperature)
    {
        divHeatIndex.html("Heat Index: " + WeatherCurrentConditions.HeatIndex + "&deg;");
    }

    divGust.empty();
    if (WeatherCurrentConditions.WindGust != "")
    {
        divGust.html("Gust to " + WeatherCurrentConditions.WindGust);
    }

    divIcon.html("<img src='" + WeatherCurrentConditions.Icon + "' />");

    // Draw canvas
    var canvas = canvasCurrentWeather[0];
    var context = canvas.getContext("2d");

    var DrawCurrentConditions = function ()
    {
        var BackGroundImage = new Image();
        BackGroundImage.onload = function ()
        {
            context.drawImage(BackGroundImage, 0, 0);
            DrawHorizontalGradientSingle(context, 0, 30, 500, 90, _TopColor1, _TopColor2);
            DrawTriangle(context, "rgb(28, 10, 87)", 500, 30, 450, 90, 500, 90);
            DrawHorizontalGradientSingle(context, 0, 90, 52, 399, _SideColor1, _SideColor2);
            DrawHorizontalGradientSingle(context, 584, 90, 640, 399, _SideColor1, _SideColor2);

            DrawTitleText(context, "Current", "Conditions");

            DrawText(context, "Star4000 Large", "24pt", "#FFFFFF", 170, 135, Temperature + String.fromCharCode(176), 2);

            var Conditions = WeatherCurrentConditions.Conditions;
            if (Conditions.length > 15)
            {
                Conditions = WeatherCurrentConditions.ShortConditions;
                if (Conditions.length > 15)
                {
                    Conditions = Conditions.substr(0, 15);
                }
            }
            //DrawText(context, "Star4000 Extended", "24pt", "#FFFFFF", 190, 170, WeatherCurrentConditions.Conditions, 2, "center");
            //DrawText(context, "Star4000 Extended", "24pt", "#FFFFFF", 190, 170, WeatherCurrentConditions.ShortConditions, 2, "center");
            //Conditions = "12345679012345";
            DrawText(context, "Star4000 Extended", "24pt", "#FFFFFF", 195, 170, Conditions, 2, "center");

            //gifIcon.get_canvas().width = gifIcon.get_canvas().width * 0.75;

            DrawText(context, "Star4000 Extended", "24pt", "#FFFFFF", 80, 330, "Wind:", 2);
            //DrawText(context, "Star4000 Extended", "24pt", "#FFFFFF", 205, 330, WeatherCurrentConditions.WindDirection, 2, "center");
            DrawText(context, "Star4000 Extended", "24pt", "#FFFFFF", 300, 330, WeatherCurrentConditions.WindDirection + " " + WindSpeed, 2, "right");

            //WeatherCurrentConditions.WindGust = 10;
            if (WindGust != "")
            {
                DrawText(context, "Star4000 Extended", "24pt", "#FFFFFF", 80, 375, "Gusts to " + WindGust, 2);
            }

            DrawText(context, "Star4000 Large", "bold 16pt", "#FFFF00", 315, 120, WeatherCurrentConditions.StationName.substr(0, 20), 2);

            DrawText(context, "Star4000 Large", "bold 16pt", "#FFFFFF", 340, 165, "Humidity:", 2);
            DrawText(context, "Star4000 Large", "bold 16pt", "#FFFFFF", 560, 165, Humidity + "%", 2, "right");

            DrawText(context, "Star4000 Large", "bold 16pt", "#FFFFFF", 340, 205, "Dewpoint:", 2);
            DrawText(context, "Star4000 Large", "bold 16pt", "#FFFFFF", 560, 205, DewPoint + String.fromCharCode(176), 2, "right");

            DrawText(context, "Star4000 Large", "bold 16pt", "#FFFFFF", 340, 245, "Ceiling:", 2);
            DrawText(context, "Star4000 Large", "bold 16pt", "#FFFFFF", 560, 245, (Ceiling == "" ? "Unlimited" : Ceiling + CeilingUnit), 2, "right");

            DrawText(context, "Star4000 Large", "bold 16pt", "#FFFFFF", 340, 285, "Visibility:", 2);
            DrawText(context, "Star4000 Large", "bold 16pt", "#FFFFFF", 560, 285, parseInt(Visibility) + VisibilityUnit, 2, "right");

            DrawText(context, "Star4000 Large", "bold 16pt", "#FFFFFF", 340, 325, "Pressure:", 2);
            DrawText(context, "Star4000 Large", "bold 16pt", "#FFFFFF", 535, 325, Pressure, 2, "right");
            //WeatherCurrentConditions.PressureDirection = "R";
            switch (WeatherCurrentConditions.PressureDirection)
            {
                case "R":
                    // Shadow
                    DrawTriangle(context, "#000000", 552, 302, 542, 312, 562, 312);
                    DrawBox(context, "#000000", 549, 312, 6, 15);

                    // Border
                    DrawTriangle(context, "#000000", 550, 300, 540, 310, 560, 310);
                    DrawBox(context, "#000000", 547, 310, 6, 15);

                    // Fill
                    DrawTriangle(context, "#FFFF00", 550, 301, 541, 309, 559, 309);
                    DrawBox(context, "#FFFF00", 548, 309, 4, 15);
                    break;
                case "F":
                    // Shadow
                    DrawTriangle(context, "#000000", 552, 327, 542, 317, 562, 317);
                    DrawBox(context, "#000000", 549, 302, 6, 15);

                    // Border
                    DrawTriangle(context, "#000000", 550, 325, 540, 315, 560, 315);
                    DrawBox(context, "#000000", 547, 300, 6, 15);

                    // Fill
                    DrawTriangle(context, "#FFFF00", 550, 324, 541, 314, 559, 314);
                    DrawBox(context, "#FFFF00", 548, 301, 4, 15);
                    break;
            }

            //WeatherCurrentConditions.HeatIndex = "100";
            if (HeatIndex != Temperature)
            {
                DrawText(context, "Star4000 Large", "bold 16pt", "#FFFFFF", 340, 365, "Heat Index:", 2);
                DrawText(context, "Star4000 Large", "bold 16pt", "#FFFFFF", 560, 365, HeatIndex + String.fromCharCode(176), 2, "right");
            }
            else if (WindChill != "" && WindChill < Temperature)
            {
                DrawText(context, "Star4000 Large", "bold 16pt", "#FFFFFF", 340, 365, "Wind Chill:", 2);
                DrawText(context, "Star4000 Large", "bold 16pt", "#FFFFFF", 560, 365, WindChill + String.fromCharCode(176), 2, "right");
            }

            WeatherParameters.Progress.CurrentConditions = LoadStatuses.Loaded;

            UpdateWeatherCanvas(WeatherParameters, canvasCurrentWeather);
        };
        BackGroundImage.src = "images/BackGround1_1.png";
        //BackGroundImage.src = "images/BackGround1_" + _Themes.toString() + ".png";
    };

    if (_DontLoadGifs == true || WeatherCurrentConditions.Icon == "")
    {
        DrawCurrentConditions();
    }
    else
    {
        var gifIcon = new SuperGif({
            src: WeatherCurrentConditions.Icon,
            loop_delay: 100,
            auto_play: true,
            canvas: canvas,
            x: 140,
            y: 175,
            max_width: 126,
        });
        gifIcon.load(DrawCurrentConditions);
    }
};


var WeatherExtendedForecast = function (WeatherParser)
{
    //var _Today = new Date();
    //var _NextDay = _Today.addDays(2);
    var Today = new Date();
    //var _Days = [1, 2, 3];
    //var _Days = [0, 1, 2, 3, 4, 5];
    var _Days = [0, 1, 2, 3, 4, 5, 6];
    //if (Today.getHours() >= 12)
    //if (Today.getHours() >= 15)
    //{
    //    //_Days = [2, 3, 4];
    //    var _Days = [1, 2, 3, 4, 5, 6];
    //}
    Today.setHours(0, 0, 0, 0);

    var _LayoutKey;
    var _PeriodIndex = [];
    //var _Days = [];
    var _Dates = [];
    var _Day = {};
    //var _DayName;

    var _self = this;
    this.Day = [];

    //$([2, 3, 4]).each(function ()
    //{
    //    var DayName = Today.addDays(this).getDayName();

    //    $(WeatherParser.data_forecast.time_layout).each(function ()
    //    {
    //        _LayoutKey = this.layout_key;

    //        $(this.start_valid_time).each(function (Index, Value)
    //        {
    //            if (this.period_name == DayName || this.period_name == DayName + " Night")
    //            {
    //                _PeriodIndex[DayName + "_" + _LayoutKey] = Index;
    //                return false;
    //            }
    //        });
    //    });

    //    _Days.push(DayName);
    //});

    $(_Days).each(function ()
    {
        var NewDate = Today.addDays(this);
        var Date = NewDate.getYYYYMMDD();
        var DayName = NewDate.getDayName();

        $(WeatherParser.data_forecast.time_layout).each(function ()
        {
            _LayoutKey = this.layout_key;

            $(this.start_valid_time).each(function (Index, Value)
            {
                if (this.value.indexOf(Date) != -1)
                {
                    _PeriodIndex[Date + "_" + _LayoutKey] = Index;
                    return false;
                }
            });
        });

        _Dates.push({
            Date: Date,
            DayName: DayName,
        });
    });


    //$(WeatherParser.data_forecast.time_layout).each(function ()
    //{
    //    //if (this.layout_key != "k-p24h-n7-2")
    //    //if (this.layout_key != "k-p24h-n7-1")
    //    if (this.layout_key.startsWith("k-p24h-") == false)
    //    {
    //        return true;
    //    }

    //    if (this.start_valid_time[1].period_name.endsWith("Night") == true)
    //    {
    //        return true;
    //    }

    //    _Days.push(this.start_valid_time[1].period_name);
    //    _Days.push(this.start_valid_time[2].period_name);
    //    _Days.push(this.start_valid_time[3].period_name);

    //    return false;
    //});

    ////_Days.push(_Today.addDays(2));
    ////_Days.push(_Today.addDays(3));
    ////_Days.push(_Today.addDays(4));

    $(_Dates).each(function ()
    {
        //_PeriodIndex = [];
        _Day = {};
        var Date = this.Date;
        var DayName = this.DayName;

        //$(WeatherParser.data_forecast.time_layout).each(function ()
        //{
        //    _LayoutKey = this.layout_key;

        //    $(this.start_valid_time).each(function (Index, Value)
        //    {
        //        if (this.period_name == DayName || this.period_name == DayName + " Night")
        //        {
        //            _PeriodIndex[_LayoutKey] = Index;
        //            return false;
        //        }
        //    });
        //});

        _Day.Date = Date;
        _Day.DayName = DayName;
        _Day.DayShortName = _DayShortNames[DayName];

        _LayoutKey = WeatherParser.data_forecast.parameters.temperature_maximum.time_layout;
        _Day.MaximumTemperature = WeatherParser.data_forecast.parameters.temperature_maximum.value[_PeriodIndex[Date + "_" + _LayoutKey]];
        _Day.MaximumTemperatureC = ConvertFahrenheitToCelsius(_Day.MaximumTemperature);
        if (!_Day.MaximumTemperature)
        {
            return true;
        }
        else if ($.isNumeric(_Day.MaximumTemperature) == false)
        {
            //return true;
            _Day.MaximumTemperature = "?";
        }

        _LayoutKey = WeatherParser.data_forecast.parameters.temperature_minimum.time_layout;
        _Day.MinimumTemperature = WeatherParser.data_forecast.parameters.temperature_minimum.value[_PeriodIndex[Date + "_" + _LayoutKey]];
        _Day.MinimumTemperatureC = ConvertFahrenheitToCelsius(_Day.MinimumTemperature);
        if (!_Day.MinimumTemperature)
        {
            return true;
        }
        else if ($.isNumeric(_Day.MinimumTemperature) == false)
        {
            //return true;
            _Day.MinimumTemperature = "?";
        }

        _LayoutKey = WeatherParser.data_forecast.parameters.weather.time_layout;
        _Day.Conditions = WeatherParser.data_forecast.parameters.weather.weather_conditions[_PeriodIndex[Date + "_" + _LayoutKey]].weather_summary.trim();
        _Day.Conditions = _Day.Conditions.replaceAll(" and ", " ");
        _Day.Conditions = _Day.Conditions.replaceAll("Slight ", "");
        _Day.Conditions = _Day.Conditions.replaceAll("Chance ", "");
        _Day.Conditions = _Day.Conditions.replaceAll("Very ", "");
        _Day.Conditions = _Day.Conditions.replaceAll("Patchy ", "");
        _Day.Conditions = _Day.Conditions.replaceAll("Areas ", "");
        _Day.Conditions = _Day.Conditions.replaceAll("Dense ", "");

        var Conditions = _Day.Conditions.split(" ");
        if (_Day.Conditions.indexOf("then") != -1)
        {
            Conditions = _Day.Conditions.split(" then ");
            Conditions = Conditions[1].split(" ");
        }

        _Day.Conditions1 = Conditions[0].substr(0, 10);
        _Day.Conditions2 = "";
        if (Conditions[1])
        {
            if (_Day.Conditions1.endsWith(".") == false)
            {
                _Day.Conditions2 = Conditions[1].substr(0, 10);
            }
            else
            {
                _Day.Conditions1 = Conditions1.replaceAll(".", "");
            }

            if (_Day.Conditions2 == "Blowing")
            {
                _Day.Conditions2 = "";
            }
        }
        _Day.Conditions = _Day.Conditions1;
        if (_Day.Conditions2 != "")
        {
            _Day.Conditions += " " + _Day.Conditions2;
        }

        _LayoutKey = WeatherParser.data_forecast.parameters.conditions_icon.time_layout;
        _Day.Icon = WeatherParser.data_forecast.parameters.conditions_icon.icon_link[_PeriodIndex[Date + "_" + _LayoutKey]];
        //_Day.Icon = GetWeatherIconFromIconLink(_Day.Icon);
        //_Day.Icon = GetWeatherIconFromIconLink(_Day.Icon, _Day.Conditions);
        _Day.Icon = GetWeatherIcon2FromIconLink(_Day.Icon, _Day.Conditions);

        _self.Day.push(_Day);
    });


};

Date.prototype.addHours = function (hours)
{
    var dat = new Date(this.valueOf());
    dat.setHours(dat.getHours() + hours);
    return dat;
};
Date.prototype.addDays = function (days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};
Date.prototype.addMonths = function (months)
{
    var dat = new Date(this.valueOf());
    dat.setMonth(dat.getMonth() + months);
    return dat;
};
Date.prototype.getMonthName = function ()
{
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[this.getMonth()];
};
Date.prototype.getMonthShortName = function ()
{
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[this.getMonth()];
};
Date.prototype.getDayName = function ()
{
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[this.getDay()];
};
Date.prototype.getDayShortName = function ()
{
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[this.getDay()];
};
Date.prototype.getYYYYMMDD = function ()
{
    return this.toISOString().split('T')[0];
};
Date.prototype.getYYYYMMDDSlashed = function ()
{
    //return this.toISOString().split('T')[0].replaceAll("-", "/");
    return this.getFullYear() + "/" + (this.getMonth() + 1).pad(2) + "/" + this.getDate().pad(2);
};

var PopulateExtendedForecast = function (WeatherParameters, ScreenIndex)
{
    if (WeatherParameters == null || (_DontLoadGifs == true && WeatherParameters.Progress.FourDayForecast != LoadStatuses.Loaded))
    {
        return;
    }

    var WeatherExtendedForecast = WeatherParameters.WeatherExtendedForecast;

    $(WeatherExtendedForecast.Day).each(function (Index, Day)
    {
        $("#divDayShortName" + (Index + 1)).html(Day.DayShortName.toUpperCase());
        $("#divConditions" + (Index + 1)).html(Day.Conditions);
        $("#divIcon" + (Index + 1)).html("<img src='" + Day.Icon + "' />");
        $("#divLo" + (Index + 1)).html("Lo<br />" + Day.MinimumTemperature);
        $("#divHi" + (Index + 1)).html("Hi<br />" + Day.MaximumTemperature);
    });

    // Draw canvas
    //var canvas = canvasExtendedForecast[0];
    var canvas = null;
    var LBound;
    var UBound;
    switch (ScreenIndex)
    {
        case 1:
            LBound = 0;
            UBound = 2;
            canvas = canvasExtendedForecast1[0];
            break;
        case 2:
            LBound = 3;
            UBound = 5;
            canvas = canvasExtendedForecast2[0];
            break;
    }
    var context = canvas.getContext("2d");

    var Counter = 0;
    //var MaxIcons = WeatherExtendedForecast.Day.length;
    var MaxIcons = 3;

    var gifIcons = [];

    var DrawExtendedForecast = function ()
    {
        var BackGroundImage = new Image();
        BackGroundImage.onload = function ()
        {
            context.drawImage(BackGroundImage, 0, 0);
            DrawHorizontalGradientSingle(context, 0, 30, 500, 90, _TopColor1, _TopColor2);
            DrawTriangle(context, "rgb(28, 10, 87)", 500, 30, 450, 90, 500, 90);
            DrawHorizontalGradientSingle(context, 0, 90, 640, 399, _SideColor1, _SideColor2);
            context.drawImage(BackGroundImage, 38, 100, 174, 297, 38, 100, 174, 297);
            context.drawImage(BackGroundImage, 232, 100, 174, 297, 232, 100, 174, 297);
            context.drawImage(BackGroundImage, 426, 100, 174, 297, 426, 100, 174, 297);

            DrawTitleText(context, "Extended", "Forecast");

            var x = 100;
            $(WeatherExtendedForecast.Day).each(function (Index)
            {
                if (Index < LBound || Index > UBound) return true;

                var Day = this;
                DrawText(context, "Star4000", "24pt", "#FFFF00", x, 135, Day.DayShortName.toUpperCase(), 2);
                x += 195;
            });

            var x = 85;
            $(WeatherExtendedForecast.Day).each(function (Index)
            {
                if (Index < LBound || Index > UBound) return true;

                var Day = this;
                DrawText(context, "Star4000", "24pt", "#8080FF", x, 345, "Lo", 2, "center");
                x += 195;
            });

            var x = 165;
            $(WeatherExtendedForecast.Day).each(function (Index)
            {
                if (Index < LBound || Index > UBound) return true;

                var Day = this;
                DrawText(context, "Star4000", "24pt", "#FFFF00", x, 345, "Hi", 2, "center");
                x += 195;
            });

            var x = 85;
            $(WeatherExtendedForecast.Day).each(function (Index)
            {
                if (Index < LBound || Index > UBound) return true;

                var Day = this;

                var MinimumTemperature;

                switch (_Units)
                {
                    case Units.English:
                        MinimumTemperature = Day.MinimumTemperature;
                        break;

                    case Units.Metric:
                        MinimumTemperature = Math.round(Day.MinimumTemperatureC);
                        break;
                }

                DrawText(context, "Star4000 Large", "24pt", "#FFFFFF", x, 385, MinimumTemperature, 2, "center");
                x += 195;
            });

            var x = 165;
            $(WeatherExtendedForecast.Day).each(function (Index)
            {
                if (Index < LBound || Index > UBound) return true;

                var Day = this;

                var MaximumTemperature;

                switch (_Units)
                {
                    case Units.English:
                        MaximumTemperature = Day.MaximumTemperature;
                        break;

                    case Units.Metric:
                        MaximumTemperature = Math.round(Day.MaximumTemperatureC);
                        break;
                }

                DrawText(context, "Star4000 Large", "24pt", "#FFFFFF", x, 385, MaximumTemperature, 2, "center");
                x += 195;
            });

            var x = 120;
            $(WeatherExtendedForecast.Day).each(function (Index)
            {
                if (Index < LBound || Index > UBound) return true;

                //var Day = this;
                //var Conditions = Day.Conditions.split(" ");

                //if (Day.Conditions.indexOf("then") != -1)
                //{
                //    Conditions = Day.Conditions.split(" then ");
                //    Conditions = Conditions[1].split(" ");
                //}

                //var Conditions1 = Conditions[0].substr(0, 10);
                //var Conditions2 = "";
                //if (Conditions[1])
                //{
                //    if (Conditions1.endsWith(".") == false)
                //    {
                //        Conditions2 = Conditions[1].substr(0, 10);
                //    }
                //    else
                //    {
                //        Conditions1 = Conditions1.replaceAll(".", "");
                //    }

                //    //if (Conditions2.indexOf("then") != -1)
                //    //{
                //    //    Conditions2 = "";
                //    //}
                //}

                var Day = this;
                var Conditions1 = Day.Conditions1;
                var Conditions2 = Day.Conditions2;

                DrawText(context, "Star4000", "24pt", "#FFFFFF", x, 270, Conditions1, 2, "center");
                DrawText(context, "Star4000", "24pt", "#FFFFFF", x, 310, Conditions2, 2, "center");
                x += 195;
            });

            var x = 46;
            $(gifIcons).each(function ()
            {
                // Max Width = 158px
                var gifIcon = this;
                gifIcon.setX(x + (158 / 2) - (gifIcon.get_canvas().width / 2));
                gifIcon.setFirstTime();
                x += 195;
            });

            if (ScreenIndex == 1)
            {
                WeatherParameters.Progress.FourDayForecast1 = LoadStatuses.Loaded;
            }
            else if (ScreenIndex == 2)
            {
                WeatherParameters.Progress.FourDayForecast2 = LoadStatuses.Loaded;
            }

            //WeatherParameters.Progress.FourDayForecast = LoadStatuses.Loaded;
            if (WeatherParameters.Progress.FourDayForecast1 == LoadStatuses.Loaded && WeatherParameters.Progress.FourDayForecast2 == LoadStatuses.Loaded)
            {
                WeatherParameters.Progress.FourDayForecast = LoadStatuses.Loaded;
            }

            UpdateWeatherCanvas(WeatherParameters, $(canvas));
        };
        BackGroundImage.src = "images/BackGround2_1.png";
        //BackGroundImage.src = "images/BackGround2_" + _Themes.toString() + ".png";

    };

    var x = 70;

    if (_DontLoadGifs == true)
    {
        DrawExtendedForecast();
    }
    else
    {
        $(WeatherExtendedForecast.Day).each(function (Index)
        {
            if (Index < LBound || Index > UBound) return true;

            var Day = this;
            var Icon = Day.Icon;

            var gifIcon = new SuperGif({
                src: Icon,
                loop_delay: 100,
                auto_play: true,
                canvas: canvas,
                x: x,
                y: 150,
                //max_width: 126,
                max_height: 75,
            });

            gifIcons.push(gifIcon);

            x += 195;

            gifIcon.load(function ()
            {
                Counter++;
                if (Counter == MaxIcons)
                {
                    DrawExtendedForecast();
                };
            });

        });
    }
};


var WeatherForecastParser = function (text)
{
    var Lines = text.split("\n");
    var Index;
    var InCondition = false;
    var InAlert = false;
    var _self = this;

    this.Alert = "";
    this.Text = [];

    $(Lines).each(function ()
    {
        var Line = this.toString();

        if (Line == "")
        {
            InCondition = false;
            return true;
        }

        if (Line.startsWith(".") == false)
        {
            if (InCondition == true)
            {
                _self.Text[_self.Text.length - 1] += " " + Line;
            }
            else if (InAlert == true)
            {
                _self.Alert += " " + Line;
            }

            return true;
        }

        if (Line.startsWith("...") == true)
        {

            if (_self.Alert != "")
            {
                var skipAlert = false;
                if (Line.indexOf("...COASTAL FLOOD ADVISORY") == 0)
                {
                    skipAlert = true;
                }
                else if (Line.indexOf("...COASTAL FLOOD WARNING") == 0)
                {
                    skipAlert = true;
                }
                else if (Line.indexOf("...COASTAL FLOOD WATCH") == 0)
                {
                    skipAlert = true;
                }

                if (skipAlert == true)
                {
                    InAlert = false;
                    return true;
                }
            }

            // Line is an alert.
            InAlert = true;
            _self.Alert = Line;
            return true;
        }

        InAlert = false;
        InCondition = true;

        _self.Text.push(Line.toString());

        //Index = Line.indexOf("...");
        //_self.Conditions.push({
        //    DayName: Line.substr(1, Index - 1),
        //    Text: Line.substr(Index + 3),
        //});
    });

};

//var WeatherLocalForecast = function (WeatherParser)
//{
//    var _self = this;

//    this.Conditions = [];

//    $(WeatherParser.data_forecast.time_layout).each(function ()
//    {
//        if (this.layout_key.startsWith("k-p12h-") == false)
//        {
//            return true;
//        }

//        $(this.start_valid_time).each(function (Index, start_valid_time)
//        {
//            if (Index > 2)
//            {
//                return false;
//            }

//            _self.Conditions.push({
//                DayName: start_valid_time.period_name,
//                Text: WeatherParser.data_forecast.parameters.wordedForecast.text[Index],
//            });
//        });

//        return false;
//    });

//};

var WeatherLocalForecast = function (WeatherForecastParser)
{
    var Index2;
    var _self = this;

    this.Alerts = "";
    this.AlertsC = "";
    if (WeatherForecastParser.Alert != "")
    {
        //this.Alerts = "*** " + WeatherForecastParser.Alert + " ***";
        this.Alerts = WeatherForecastParser.Alert;
        this.AlertsC = ConvertConditionsToMetric(WeatherForecastParser.Alert);
    }

    this.Conditions = [];

    $(WeatherForecastParser.Text).each(function (Index, Text)
    {
        //if (Index > 2)
        if (Index > 5)
        {
            return false;
        }

        Index2 = Text.indexOf("...");

        var DayName = Text.substr(1, Index2 - 1);
        var Condition = Text.substr(Index2 + 3);
        Condition = Condition.replaceAll("  ", " ");
        var ConditionC = ConvertConditionsToMetric(Condition);

        _self.Conditions.push({
            DayName: DayName,
            Text: Condition,
            TextC: ConditionC,
        });
    });

};

var ConvertConditionsToMetric = function (Condition)
{
    var Words = Condition.toUpperCase().split(' ');
    var Word;
    var Metric = "";

    // X TO Y MPH.
    for (var Index = 0; Index <= Words.length - 1; Index++)
    {
        Word = Words[Index];

        try {
            if (Word.startsWith("MPH") == true) {
                if ($.isNumeric(Words[Index - 1]) == true) {
                    Words[Index - 1] = ConvertMphToKph(Words[Index - 1]);
                }
                if (Words[Index - 2] == "TO") {
                    if ($.isNumeric(Words[Index - 3]) == true) {
                        Words[Index - 3] = ConvertMphToKph(Words[Index - 3]);
                    }
                }

                Words[Index] = Word.replaceAll("MPH", "KPH");
            }

                // X TO Y INCH[ES].
            else if (Word.startsWith("INCH") == true) {
                //if (Words[Index - 1] == "AN")

                if ($.isNumeric(Words[Index - 1]) == true) {
                    Words[Index - 1] = Math.round(ConvertInchesToCentimeters(Words[Index - 1]));
                }
                if (Words[Index - 2] == "TO") {
                    if ($.isNumeric(Words[Index - 3]) == true) {
                        Words[Index - 3] = Math.round(ConvertInchesToCentimeters(Words[Index - 3]));
                    }
                }

                Words[Index] = Words[Index].replaceAll("INCHES", "CMS");
                Words[Index] = Words[Index].replaceAll("INCH", "CM");
            }

                // X TO Y FEET.
            else if (Word.startsWith("FEET") == true) {
                if ($.isNumeric(Words[Index - 1]) == true) {
                    Words[Index - 1] = ConvertFeetToMeters(Words[Index - 1]);
                }
                if (Words[Index - 2] == "TO") {
                    if ($.isNumeric(Words[Index - 3]) == true) {
                        Words[Index - 3] = ConvertFeetToMeters(Words[Index - 3]);
                    }
                }

                Words[Index] = Word.replaceAll("FEET", "METERS");
            }

                // X TO Y MILE[S].
            else if (Word.startsWith("MILE") == true) {
                if ($.isNumeric(Words[Index - 1]) == true) {
                    Words[Index - 1] = ConvertMilesToKilometers(Words[Index - 1]);
                }
                if (Words[Index - 2] == "TO") {
                    if ($.isNumeric(Words[Index - 3]) == true) {
                        Words[Index - 3] = ConvertMilesToKilometers(Words[Index - 3]);
                    }
                }

                Words[Index] = Word.replaceAll("MILE", "KM");
            }

                // X AM.
            else if (Word.startsWith("AM") == true) {
                if ($.isNumeric(Words[Index - 1]) == true) {
                    var HH = parseInt(Words[Index - 1]);
                    if (HH == 12) {
                        HH = 0;
                    }
                    Words[Index - 1] = HH.toString() + ":00";
                    Words[Index] = Word.replaceAll("AM", "?");
                }
            }

                // X PM.
            else if (Word.startsWith("PM") == true) {
                if ($.isNumeric(Words[Index - 1]) == true) {
                    var HH = parseInt(Words[Index - 1]);
                    if (HH < 12) {
                        HH += 12;
                    }
                    Words[Index - 1] = HH.toString() + ":00";
                    Words[Index] = Word.replaceAll("PM", "?");
                }
            }

                //// LOWS|HIGHS IN THE MID|UPPER|LOWER XS.
                //else if (Word == "MID" || Word == "UPPER" || Word == "LOWER")
                //{
                //    var TempF = parseInt(Words[Index + 1]);
                //    var TempC = TempF;

                //    switch (Word)
                //    {
                //        case "MID":
                //            TempC += 5;
                //            break;
                //        case "UPPER":
                //            TempC += 9;
                //            break;
                //        case "LOWER":
                //            TempC += 1;
                //            break;
                //    }
                //    TempC = Math.round(ConvertFahrenheitToCelsius(TempC));

                //    Words[Index + 1] = Words[Index + 1].replaceAll(TempF.toString() + "S", TempC.toString());
                //    Words[Index] = "NEAR";
                //}

                // LOWS|HIGHS IN THE [MID|UPPER|LOWER] XS.
                // LOWS|HIGHS NEAR XS.
            else if (Word == "LOWS" || Word == "HIGHS") {
                if (Words[Index + 1] == "IN" && Words[Index + 2] == "THE") {
                    if (Words[Index + 3] == "MID" || Words[Index + 3] == "UPPER" || Words[Index + 3] == "LOWER") {
                        var TempF = parseInt(Words[Index + 4]);
                        var TempC = TempF;

                        switch (Words[Index + 3]) {
                            case "MID":
                                TempC += 5;
                                break;
                            case "UPPER":
                                TempC += 9;
                                break;
                            case "LOWER":
                                TempC += 1;
                                break;
                        }
                        TempC = Math.round(ConvertFahrenheitToCelsius(TempC));

                        Words[Index + 4] = Words[Index + 4].replaceAll(TempF.toString() + "S", TempC.toString());
                        Words[Index + 3] = "NEAR";

                        if (Words[Index + 5] && Words[Index + 5] == "TO") {
                            var TempF = parseInt(Words[Index + 7]);
                            var TempC = TempF;

                            switch (Words[Index + 6]) {
                                case "MID":
                                    TempC += 5;
                                    break;
                                case "UPPER":
                                    TempC += 9;
                                    break;
                                case "LOWER":
                                    TempC += 1;
                                    break;
                            }
                            TempC = Math.round(ConvertFahrenheitToCelsius(TempC));

                            Words[Index + 7] = Words[Index + 7].replaceAll(TempF.toString() + "S", TempC.toString());
                            Words[Index + 6] = "NEAR";
                        }
                    }
                    else if (Words[Index + 3] == "NEAR") {
                        if (Words[Index + 4] == "MID" || Words[Index + 4] == "UPPER" || Words[Index + 4] == "LOWER") {
                            var TempF = parseInt(Words[Index + 5]);
                            var TempC = TempF;

                            switch (Words[Index + 4]) {
                                case "MID":
                                    TempC += 5;
                                    break;
                                case "UPPER":
                                    TempC += 9;
                                    break;
                                case "LOWER":
                                    TempC += 1;
                                    break;
                            }
                            TempC = Math.round(ConvertFahrenheitToCelsius(TempC));

                            Words[Index + 5] = Words[Index + 5].replaceAll(TempF.toString() + "S", TempC.toString());
                            Words[Index + 4] = "?";

                        }
                    }
                    else {
                        var TempF = parseInt(Words[Index + 3]);
                        var TempC = TempF;
                        TempC += 5;
                        TempC = Math.round(ConvertFahrenheitToCelsius(TempC));

                        Words[Index + 3] = "NEAR " + Words[Index + 3].replaceAll(TempF.toString() + "S", TempC.toString());
                    }
                }
                else if (Words[Index + 1] == "NEAR" || Words[Index + 1] == "AROUND") {
                    var TempF = parseInt(Words[Index + 2]);
                    var TempC = TempF;
                    if (Words[Index + 3].indexOf("BELOW") == 0) {
                        TempC *= -1;
                    }
                    TempC += 1;
                    TempC = Math.round(ConvertFahrenheitToCelsius(TempC));

                    Words[Index + 2] = Words[Index + 2].replaceAll(TempF.toString(), TempC.toString());

                    Words[Index + 3] = Words[Index + 3].replaceAll("ABOVE", "?");
                    Words[Index + 3] = Words[Index + 3].replaceAll("BELOW", "?");
                }
                else {
                    var TempF = parseInt(Words[Index + 1]);
                    var TempC = TempF;
                    TempC += 5;
                    TempC = Math.round(ConvertFahrenheitToCelsius(TempC));

                    Words[Index + 1] = Words[Index + 1].replaceAll(TempF.toString(), TempC.toString());

                    if (Words[Index + 2] && Words[Index + 2] == "TO") {
                        var TempF = parseInt(Words[Index + 3]);
                        var TempC = TempF;
                        TempC += 5;
                        TempC = Math.round(ConvertFahrenheitToCelsius(TempC));

                        Words[Index + 3] = Words[Index + 3].replaceAll(TempF.toString(), TempC.toString());
                    }
                }
            }
            else if (Words[Index] == "LOW" || Words[Index] == "HIGH" || Words[Index + 1] == "AS") {
                var TempF = parseInt(Words[Index + 2]);
                var TempC = TempF;
                if (Words[Index + 3].indexOf("BELOW") == 0) {
                    TempC *= -1;
                }
                TempC += 1;
                TempC = Math.round(ConvertFahrenheitToCelsius(TempC));

                Words[Index + 2] = Words[Index + 2].replaceAll(TempF.toString(), TempC.toString());

                Words[Index + 3] = Words[Index + 3].replaceAll("ABOVE", "?");
                Words[Index + 3] = Words[Index + 3].replaceAll("BELOW", "?");
            }
            else if (Word == "MID" || Word == "UPPER" || Word == "LOWER") {
                var TempF = parseInt(Words[Index + 1]);
                var TempC = TempF;

                switch (Word) {
                    case "MID":
                        TempC += 5;
                        break;
                    case "UPPER":
                        TempC += 9;
                        break;
                    case "LOWER":
                        TempC += 1;
                        break;
                }
                TempC = Math.round(ConvertFahrenheitToCelsius(TempC));

                Words[Index + 1] = Words[Index + 1].replaceAll(TempF.toString() + "S", TempC.toString());
                Words[Index + 1] = Words[Index + 1].replaceAll(TempF.toString(), TempC.toString());
                Words[Index] = "NEAR";
            }
            else if (Word == "AROUND") {
                if (Words[Index - 1] == "TEMPERATURES") {
                    var TempF = parseInt(Words[Index + 1]);
                    var TempC = TempF;
                    if (Words[Index + 3].indexOf("BELOW") == 0) {
                        TempC *= -1;
                    }
                    TempC += 1;
                    TempC = Math.round(ConvertFahrenheitToCelsius(TempC));

                    Words[Index + 1] = Words[Index + 1].replaceAll(TempF.toString(), TempC.toString());

                    Words[Index + 2] = Words[Index + 2].replaceAll("ABOVE", "?");
                    Words[Index + 2] = Words[Index + 2].replaceAll("BELOW", "?");
                }
            }

            else if (Word.startsWith("-20S") == true) {
                Words[Index] = Word.replace("-20S", "NEAR -25");
            }
            else if (Word.startsWith("-10S") == true) {
                Words[Index] = Word.replace("-10S", "NEAR -20");
            }
            else if (Word.startsWith("0S") == true) {
                Words[Index] = Word.replace("0S", "NEAR -15");
            }
            else if (Word.startsWith("10S") == true) {
                Words[Index] = Word.replace("10S", "NEAR -10");
            }
            else if (Word.startsWith("20S") == true) {
                Words[Index] = Word.replace("20S", "NEAR -5");
            }
            else if (Word.startsWith("30S") == true) {
                Words[Index] = Word.replace("30S", "NEAR 0");
            }
            else if (Word.startsWith("40S") == true) {
                Words[Index] = Word.replace("40S", "NEAR 5");
            }
            else if (Word.startsWith("50S") == true) {
                Words[Index] = Word.replace("50S", "NEAR 12");
            }
            else if (Word.startsWith("60S") == true) {
                Words[Index] = Word.replace("60S", "NEAR 17");
            }
            else if (Word.startsWith("70S") == true) {
                Words[Index] = Word.replace("70S", "NEAR 25");
            }
            else if (Word.startsWith("80S") == true) {
                Words[Index] = Word.replace("80S", "NEAR 30");
            }
            else if (Word.startsWith("90S") == true) {
                Words[Index] = Word.replace("90S", "NEAR 35");
            }
            else if (Word.startsWith("100S") == true) {
                Words[Index] = Word.replace("100S", "NEAR 40");
            }
            else if (Word.startsWith("110S") == true) {
                Words[Index] = Word.replace("110S", "NEAR 45");
            }
            else if (Word.startsWith("120S") == true) {
                Words[Index] = Word.replace("120S", "NEAR 50");
            }
        }
        catch (ex) { }
    }
    
    Metric = Words.join(' ');
    Metric = Metric.replaceAll(" ?", "");

    return Metric;
};

if (!String.prototype.startsWith)
{
    String.prototype.startsWith = function (searchString, position)
    {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}
if (!String.prototype.endsWith) 
{
    String.prototype.endsWith = function(searchString, position)
    {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) 
        {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.lastIndexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

var PopulateLocalForecast = function (WeatherParameters)
{
    if (WeatherParameters == null || (_DontLoadGifs == true && WeatherParameters.Progress.WordedForecast != LoadStatuses.Loaded))
    {
        return;
    }
    
    var WeatherLocalForecast = WeatherParameters.WeatherLocalForecast;

    var DontLoadGifs = _DontLoadGifs;

    $("#divLocalForecastAlerts").html(WeatherLocalForecast.Alerts.replaceAll("...", ""));
    $(WeatherLocalForecast.Conditions).each(function (Index, Condition)
    {
        $("#divLocalForecast" + (Index + 1)).html(Condition.DayName.toUpperCase() + "..." + Condition.Text.toUpperCase());
    });

    // Draw canvas
    var canvas = canvasLocalForecast[0];
    var context = canvas.getContext("2d");

    var BackGroundImage = new Image();
    BackGroundImage.onload = function ()
    {
        context.drawImage(BackGroundImage, 0, 0);
        DrawHorizontalGradientSingle(context, 0, 30, 500, 90, _TopColor1, _TopColor2);
        DrawTriangle(context, "rgb(28, 10, 87)", 500, 30, 450, 90, 500, 90);
        DrawHorizontalGradientSingle(context, 0, 90, 52, 399, _SideColor1, _SideColor2);
        DrawHorizontalGradientSingle(context, 584, 90, 640, 399, _SideColor1, _SideColor2);

        DrawTitleText(context, "Local ", "Forecast");

        // Max: 7 rows, 32 columns

        var MaxRows = 7;
        var MaxCols = 32;
        var LocalForecastScreenTexts = [];

        //var AlertText = WeatherLocalForecast.Alerts.replaceAll("...", "");
        var AlertText = "";
        if (_Units == Units.English)
        {
            AlertText = WeatherLocalForecast.Alerts;
        }
        else if (_Units == Units.Metric)
        {
            AlertText = WeatherLocalForecast.AlertsC;
        }
        AlertText = AlertText.replaceAll("...", "");

        var PrependAlert = false;
        //AlertText = "WIND ADVISORY IN EFFECT FROM 2 PM THIS AFTERNOON TO 6 AM EDT SUNDAY";
        //AlertText = "WIND ADVISORY IN EFFECT FROM 2 PM THIS AFTERNOON TO 6 AM EDT SUNDAY WIND ADVISORY IN EFFECT FROM 2 PM THIS AFTERNOON TO 6 AM EDT SUNDAY";
        //AlertText = "WIND ADVISORY IN EFFECT FROM 2 PM THIS AFTERNOON TO 6 AM EDT SUNDAY. THE RED HOUR IS UPON US!  SEEK SHELTER IF YOU DO NOT WANT TO PARTAKE IN THE PARTY. WE RECOMMEND THAT YOU DRESS ACCORDINGLY";
        //AlertText = "WIND ADVISORY IN EFFECT FROM 2 PM THIS AFTERNOON TO 6 AM EDT SUNDAY. THE RED HOUR IS UPON US!  SEEK SHELTER IF YOU DO NOT WANT TO PARTAKE IN THE PARTY. WE RECOMMEND THAT YOU DRESS ACCORDINGLY.  IF YOU DO NOT PARTAKE THEN YOU WILL BE ABSORBED";
        if (AlertText != "")
        {
            var NumberOfRevChars = 5;
            var Text = AlertText.wordWrap(MaxCols - NumberOfRevChars, "\n");
            var Lines = Text.split("\n");
            var LineCount = Lines.length;
            var ScreenText = "";

            for (var Index = 0; Index <= LineCount - 1; Index++)
            {
                if (Index > 0 && Index % MaxRows == 0)
                {
                    LocalForecastScreenTexts.push(ScreenText);
                    ScreenText = "";
                }
                //var Line = Lines[Index].trim();
                //var Line = Lines[Index].centerText((MaxCols - 4));
                var Line = Lines[Index].centerText((MaxCols - NumberOfRevChars));

                //var l = Line.length;
                //var w2 = Math.floor((MaxCols - 4) / 2);
                //var l2 = Math.floor(l / 2);
                //var s = new Array(w2 - l2 + 1).join(" ");
                //Line = s + Line + s;
                //if (Line.length < (MaxCols - 4))
                //{
                //    Line += new Array((MaxCols - 4) - Line.length + 1).join(" ");
                //}

                //ScreenText += "*  " + Line + "*\n";
                ScreenText += "*  " + Line + " *\n";
            }
            ScreenText += "\n";
            LocalForecastScreenTexts.push(ScreenText);
            PrependAlert = true;
        }

        $(WeatherLocalForecast.Conditions).each(function ()
        {
            var Condition = this;

            //var Text = Condition.DayName.toUpperCase() + "..." + Condition.Text.toUpperCase().replaceAll("...", " ");
            var Text = Condition.DayName.toUpperCase() + "...";
            var ConditionText = "";
            if (_Units == Units.English)
            {
                ConditionText = Condition.Text;
            }
            else if (_Units == Units.Metric)
            {
                ConditionText = Condition.TextC;
            }
            Text += ConditionText.toUpperCase().replaceAll("...", " ");

            Text = Text.wordWrap(MaxCols, "\n");
            var Lines = Text.split("\n");
            var LineCount = Lines.length;
            var ScreenText = "";
            var MaxRowCount = MaxRows;
            var RowCount = 0;

            if (PrependAlert == true)
            {
                ScreenText = LocalForecastScreenTexts[LocalForecastScreenTexts.length - 1];
                //MaxRowCount = MaxRows - ScreenText.split("\n").length;
                RowCount = ScreenText.split("\n").length - 1;
                //PrependAlert = false;
            }

            for (var Index = 0; Index <= LineCount - 1; Index++)
            {
                if (Lines[Index] == "")
                {
                    continue;
                }

                if (RowCount > MaxRowCount - 1)
                {
                    if (PrependAlert == true)
                    {
                        LocalForecastScreenTexts[LocalForecastScreenTexts.length - 1] = ScreenText;
                        PrependAlert = false;
                    }
                    else
                    {
                        LocalForecastScreenTexts.push(ScreenText);
                    }
                    ScreenText = "";
                    RowCount = 0;
                }

                ScreenText += Lines[Index] + "\n";
                RowCount++;
            }
            if (PrependAlert == true)
            {
                LocalForecastScreenTexts[LocalForecastScreenTexts.length - 1] = ScreenText;
                PrependAlert = false;
            }
            else
            {
                LocalForecastScreenTexts.push(ScreenText);
            }
        });

        if (DontLoadGifs == false)
        {
            _UpdateLocalForecastIndex = 0;
            _UpdateLocalForecastCounterMs = 0;
        }

        //window.setInterval(function ()
        //{
        //    // Determine which screen text to show.
        //    if (_UpdateLocalForecastCounterMs >= 10000)
        //    {
        //        _UpdateLocalForecastCounterMs = 0;
        //        _UpdateLocalForecastIndex++;
        //        if (_UpdateLocalForecastIndex > LocalForecastScreenTexts.length - 1)
        //        {
        //            _UpdateLocalForecastIndex = 0;
        //        }
        //    }

        //    // Clear the previous text.
        //    DrawBox(context, "rgb(33, 40, 90)", 65, 105, 505, 280);

        //    // Draw the text.
        //    var y = 140;
        //    $(LocalForecastScreenTexts[_UpdateLocalForecastIndex].split("\n")).each(function ()
        //    {
        //        var Text = this.toString();

        //        DrawText(context, "Star4000", "24pt", "#FFFFFF", 75, y, Text, 2);
        //        y += 40;
        //    });
        //}, 500);

        WeatherParameters.LocalForecastScreenTexts = LocalForecastScreenTexts;
        WeatherParameters.Progress.WordedForecast = LoadStatuses.Loaded;

        if (DontLoadGifs == true)
        {
            UpdateLocalForecast();
        }

        UpdateWeatherCanvas(WeatherParameters, canvasLocalForecast);
    };
    BackGroundImage.src = "images/BackGround1_1.png";
    //BackGroundImage.src = "images/BackGround1_" + _Themes.toString() + ".png";

};

var UpdateLocalForecast = function (Offset)
{
    if (_WeatherParameters == null || (_DontLoadGifs == true && _WeatherParameters.Progress.WordedForecast != LoadStatuses.Loaded))
    {
        return;
    }

    var canvas = canvasLocalForecast[0];
    var context = canvas.getContext("2d");
    var LocalForecastScreenTexts = _WeatherParameters.LocalForecastScreenTexts;

    switch (Offset)
    {
        case undefined:
            break;
        case 0:
            _UpdateLocalForecastIndex = 0;
            break;
        case Infinity:
            _UpdateLocalForecastIndex = LocalForecastScreenTexts.length - 1;
            break;
        default:
            _UpdateLocalForecastIndex += Offset;
            if (_UpdateLocalForecastIndex > LocalForecastScreenTexts.length - 1)
            {
                _UpdateLocalForecastIndex = 0;
            }
            else if (_UpdateLocalForecastIndex < 0)
            {
                _UpdateLocalForecastIndex = LocalForecastScreenTexts.length - 1;
            }
            break;
    }

    // Clear the previous text.
    DrawBox(context, "rgb(33, 40, 90)", 65, 105, 505, 280);

    // Draw the text.
    var y = 140;
    $(LocalForecastScreenTexts[_UpdateLocalForecastIndex].split("\n")).each(function ()
    {
        var Text = this.toString();

        DrawText(context, "Star4000", "24pt", "#FFFFFF", 75, y, Text, 2);
        y += 40;
    });
};


String.prototype.centerText = function(numberOfSpaces)
{
    var text = this;
    text = text.trim();
    if (text.length > numberOfSpaces)
    {
        return text;
    }
    var l = text.length;
    var w2 = Math.floor(numberOfSpaces / 2);
    var l2 = Math.floor(l / 2);
    var s = new Array(w2 - l2).join(" ");
    text = s + text + s;
    if (text.length < numberOfSpaces)
    {
        text += new Array(numberOfSpaces - text.length + 1).join(" ");
    }
    return text;
};

var WeatherHazardsParser = function (html)
{
    this.hazards = [];
    var _self = this;

    html.find("h3").each(function ()
    {
        _self.hazards.push({
            head_line: $(this).text(),
            text: $(this).next().text()
        });
    });
};

var WeatherHazardConditions = function (WeatherHazardsParser, WeatherParameters)
{
    this.ZoneId = WeatherParameters.ZoneId;
    this.Hazards = [];
    var _self = this;

    $(WeatherHazardsParser.hazards).each(function ()
    {
        _self.Hazards.push(this.text);
    });
};

var PopulateHazardConditions = function (WeatherParameters)
{
    if (WeatherParameters == null || (_DontLoadGifs == true && WeatherParameters.Progress.Hazards != LoadStatuses.Loaded))
    {
        return;
    }

    var WeatherHazardConditions = WeatherParameters.WeatherHazardConditions;
    var ZoneId = WeatherHazardConditions.ZoneId;
    var StateId = WeatherHazardConditions.ZoneId.substr(0, 3);
    var CountyId = WeatherHazardConditions.ZoneId.substr(0, 2) + "C";
    var Text;
    var Line;
    var SkipLine;

    var DontLoadGifs = _DontLoadGifs;

    divHazards.empty();

    // Remove duplicate hazard texts
    WeatherHazardConditions.Hazards = WeatherHazardConditions.Hazards.unique();

    // Reorder hazard texts
    if (WeatherHazardConditions.Hazards.length > 1)
    {
        for (var index = 0; index < WeatherHazardConditions.Hazards.length - 1; index++)
        {
            var text = WeatherHazardConditions.Hazards[index];
            var needToReorder = false;

            if (text.indexOf("...COASTAL FLOOD ADVISORY ") == 0)
            {
                needToReorder = true;
            }
            else if (text.indexOf("...COASTAL FLOOD WARNING ") == 0)
            {
                needToReorder = true;
            }
            else if (text.indexOf("...COASTAL FLOOD WATCH ") == 0)
            {
                needToReorder = true;
            }

            if (needToReorder == true)
            {
                WeatherHazardConditions.Hazards[index] = WeatherHazardConditions.Hazards[WeatherHazardConditions.Hazards.length - 1];
                WeatherHazardConditions.Hazards[WeatherHazardConditions.Hazards.length - 1] = text;
            }
        }
    }

    $(WeatherHazardConditions.Hazards).each(function ()
    {
        //Text = this.replaceAll("\n", "<br/>");
        //divHazards.html(divHazards.html() + "<br/><br/>" + Text);

        Text = this.toString();

        SkipLine = false;

        Text = Text.replaceAll("\n", " ");
        //Text = Text.replaceAll("*** ", "");

        //$(Text.split("\n")).each(function ()
        $(Text.split(" ")).each(function ()
        {
            Line = this.toString();
            Line = Line.toUpperCase();

            if (Line.startsWith("&&") == true)
            {
                return false;
            }
            else if (Line.startsWith("$$") == true)
            {
                return false;
            }
            if (SkipLine == true)
            {
                if (Line == "")
                {
                    SkipLine = false;
                    return true;
                }

                return true;
            }

            if (Line.startsWith(ZoneId) == true)
            {
                SkipLine = true;
                return true;
            }
            //else if (Line.startsWith(StateId) == true)
            //{
            //    SkipLine = true;
            //    return true;
            //}
            //else if (Line.startsWith(CountyId) == true)
            //{
            //    SkipLine = true;
            //    return true;
            //}
            else if (Line.indexOf(">") != -1)
            {
                SkipLine = true;
                return true;
            }
            //else if (Line.indexOf(StateId) != -1)
            //{
            //    SkipLine = true;
            //    return true;
            //}
            else if (Line.indexOf("LAT...LON ") != -1)
            {
                SkipLine = true;
                return true;
            }

            //divHazards.html(divHazards.html() + "<br/>" + Line);
            if (Line.indexOf(".") == 0 || Line.indexOf("*") == 0)
            {
                divHazards.html(divHazards.html() + "<br/><br/>");
                if (Line.indexOf(".") == 0 && Line.indexOf("...") != 0)
                {
                    Line = Line.substr(1);
                }
            }

            divHazards.html(divHazards.html() + Line + " ");

        });

        divHazards.html(divHazards.html() + "<br/><br/>");
    });

    var DrawHazards = function ()
    {
        // Draw canvas
        var canvas = canvasHazards[0];
        var context = canvas.getContext("2d");

        var BackGroundImage = new Image();
        BackGroundImage.onload = function ()
        {
            context.drawImage(BackGroundImage, 0, 0);

            var y = -385;

            //window.setInterval(function ()
            //{
            //    context.drawImage(cnvHazardsScroll[0], 0, y, 640, 385, 0, 0, 640, 385);

            //    // Wait until the weather has been loaded.
            //    if (WeatherParameters.Progress.GetTotalPercentage() != 100)
            //    {
            //        return;
            //    }

            //    // Wait 3 seconds and then start scrolling.
            //    if (_UpdateHazardsCounterMs == 0)
            //    {
            //        y = -385;
            //    }
            //    if (_UpdateHazardsCounterMs > 0)
            //    {
            //        //y += 1;
            //        y += 5;
            //    }
            //    if (y > cnvHazardsScroll.height())
            //    {
            //        y = cnvHazardsScroll.height();
            //        _UpdateHazardsCounterMs = 0;
            //    }

            //}, _UpdateHazardsInterval);

            if (DontLoadGifs == true)
            {
                UpdateHazards();
            }

            if (WeatherHazardConditions.Hazards.length > 0)
            {
                WeatherParameters.Progress.Hazards = LoadStatuses.Loaded;
            }
            else
            {
                WeatherParameters.Progress.Hazards = LoadStatuses.NoData;
            }

            UpdateWeatherCanvas(WeatherParameters, canvasHazards);
        };
        BackGroundImage.src = "images/BackGround7.png";
    };

    var HazardsText = divHazards.html();

    //if (_Units == Units.Metric)
    //{
    //    HazardsText = ConvertConditionsToMetric(HazardsText);
    //}

    HazardsText = HazardsText.replaceAll("<br>", "\n");
    HazardsText = HazardsText.replaceAll("<br/>", "\n");
    HazardsText = HazardsText.replaceAll("<br />", "\n");
    HazardsText = HazardsText.replaceAll("<br></br>", "\n");
    //HazardsText = HazardsText.replaceAll("\n\n", "\?");
    //HazardsText = HazardsText.replaceAll("\n", " ");
    //HazardsText = HazardsText.replaceAll("\?", "\n\n");
//    var HazardsWrapped = HazardsText.wordWrap(32);
    //var HazardsWrapped = HazardsText.trim().replace(/(\S(.{0,32}\S)?)\s+/g, '$1\n');
    //HazardsWrapped = HazardsWrapped.replaceAll("\?", "\n");

    WeatherHazardConditions.HazardsText = HazardsText;
    WeatherHazardConditions.HazardsTextC = ConvertConditionsToMetric(HazardsText);
    if (_Units == Units.Metric)
    {
        HazardsText = WeatherHazardConditions.HazardsTextC;
    }

    WeatherHazardConditions.HazardsScrollText = WeatherHazardConditions.HazardsText.replaceAll("\n", " ");
    WeatherHazardConditions.HazardsScrollTextC = WeatherHazardConditions.HazardsText.replaceAll("\n", " ");

    var HazardsWrapped = HazardsText.wordWrap(32);
    //HazardsWrapped = HazardsWrapped.replaceAll("\n ", "\n");

    var cnvHazardsScroll;

    var ShowHazardsScroll = function ()
    {
        var img = new Image();
        var cnvHazardsScrollId;
        var context;
        var Hazards = WeatherParameters.Hazards;

        cnvHazardsScrollId = "cnvHazardsScroll";

        var HazardsWrappedLines = HazardsWrapped.split("\n");
        var MaxHazardsWrappedLines = 365;
        if (_OperatingSystem == OperatingSystems.Andriod)
        {
            MaxHazardsWrappedLines = 92;
        }

        if (HazardsWrappedLines.length > MaxHazardsWrappedLines)
        {
            HazardsWrappedLines = HazardsWrappedLines.splice(0, MaxHazardsWrappedLines - 1);
        }
        var height = 0 + (HazardsWrappedLines.length * 45);

        if (DontLoadGifs == false)
        {
            // Clear the current image.
            divHazardsScroll.empty();
            divHazardsScroll.html("<canvas id='" + cnvHazardsScrollId + "' />");
            cnvHazardsScroll = $("#" + cnvHazardsScrollId);
            cnvHazardsScroll.attr("width", "640"); // For Chrome.
            cnvHazardsScroll.attr("height", height); // For Chrome.
        }
        cnvHazardsScroll = $("#" + cnvHazardsScrollId);
        context = cnvHazardsScroll[0].getContext("2d");

        DrawBox(context, "rgb(112, 35, 35)", 0, 0, 640, height);

        //var y = 0;
        var y = 45;

        $(HazardsWrappedLines).each(function ()
        {
            var HazardLine = this.toString();

            DrawText(context, "Star4000", "24pt", "#FFFFFF", 80, y, HazardLine, 1);

            y += 45;
        });

        DrawHazards();
    };
    ShowHazardsScroll();

};

var UpdateHazards = function (Offset)
{
    var canvas = canvasHazards[0];
    var context = canvas.getContext("2d");
    var cnvHazardsScroll = $("#cnvHazardsScroll");

    switch (Offset)
    {
        case undefined:
            break;
        case 0:
            _UpdateHazardsY = 0;
            break;
        case Infinity:
            _UpdateHazardsY = cnvHazardsScroll.height();
            break;
        default:
            _UpdateHazardsY += (385 * Offset);
            if (_UpdateHazardsY > cnvHazardsScroll.height())
            {
                _UpdateHazardsY = cnvHazardsScroll.height();
            }
            else if (_UpdateHazardsY < 0)
            {
                _UpdateHazardsY = 0;
            }
            break;
    }

    DrawBox(context, "rgb(112, 35,35)", 0, 0, 640, 385);
    context.drawImage(cnvHazardsScroll[0], 0, _UpdateHazardsY, 640, 385, 0, 0, 640, 385);

    //    // Wait until the weather has been loaded.
    //    if (WeatherParameters.Progress.GetTotalPercentage() != 100)
    //    {
    //        return;
    //    }

    //    // Wait 3 seconds and then start scrolling.
    //    if (_UpdateHazardsCounterMs == 0)
    //    {
    //        y = -385;
    //    }
    //    if (_UpdateHazardsCounterMs > 0)
    //    {
    //        //y += 1;
    //        y += 5;
    //    }
    //    if (y > cnvHazardsScroll.height())
    //    {
    //        y = cnvHazardsScroll.height();
    //        _UpdateHazardsCounterMs = 0;
    //    }
};

String.prototype.wordWrap =  function (intWidth, strBreak, cut)
{
    //  discuss at: http://locutus.io/php/wordwrap/
    // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // improved by: Nick Callen
    // improved by: Kevin van Zonneveld (http://kvz.io)
    // improved by: Sakimori
    //  revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // bugfixed by: Michael Grier
    // bugfixed by: Feras ALHAEK
    //      note 1: It would be great if this function could be split up to have
    //      note 1: smaller line lengths, less ternary operators, and more readable variable names
    //   example 1: wordwrap('Kevin van Zonneveld', 6, '|', true)
    //   returns 1: 'Kevin |van |Zonnev|eld'
    //   example 2: wordwrap('The quick brown fox jumped over the lazy dog.', 20, '<br />\n')
    //   returns 2: 'The quick brown fox <br />\njumped over the lazy<br />\n dog.'
    //   example 3: wordwrap('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')
    //   returns 3: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod \ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim \nveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea \ncommodo consequat.'

    var str = this;

    var m = ((arguments.length >= 1) ? arguments[0] : 75)
    var b = ((arguments.length >= 2) ? arguments[1] : '\n')
    var c = ((arguments.length >= 3) ? arguments[2] : false)

    var i, j, l, s, r

    str += ''

    if (m < 1)
    {
        return str
    }

    for (i = -1, l = (r = str.split(/\r\n|\n|\r/)).length; ++i < l; r[i] += s)
    {
        // @todo: Split this up over many more lines and more semantic variable names
        // so it becomes readable
        for (s = r[i], r[i] = '';
          s.length > m;
          r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : ''))
        {
            j = c === 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1]
              ? m
              : j.input.length - j[0].length || c === true && m ||
                j.input.length + (j = s.slice(m).match(/^\S*/))[0].length
        }
    }

    return r.join('\n').replaceAll("\n ", "\n");
};

//var wordwrap = function (long_string, max_char)
//{

//    var sum_length_of_words = function (word_array)
//    {
//        var out = 0;
//        if (word_array.length != 0)
//        {
//            for (var i = 0; i < word_array.length; i++)
//            {
//                var word = word_array[i];
//                out = out + word.length;
//            }
//        };
//        return out;
//    }

//    var split_out = [[]];
//    var split_string = long_string.split(' ');
//    for (var i = 0; i < split_string.length; i++)
//    {
//        var word = split_string[i];

//        if ((sum_length_of_words(split_out[split_out.length - 1]) + word.length) > max_char)
//        {
//            split_out = split_out.concat([[]]);
//        }

//        split_out[split_out.length - 1] = split_out[split_out.length - 1].concat(word);
//    }

//    for (var i = 0; i < split_out.length; i++)
//    {
//        split_out[i] = split_out[i].join(" ");
//    }

//    return split_out.join('\n');
//};

//function wordwrap(str, width, brk, cut)
//{

//    brk = brk || 'n';
//    width = width || 75;
//    cut = cut || false;

//    if (!str) { return str; }

//    var regex = '.{1,' + width + '}(\s|$)' + (cut ? '|.{' + width + '}|.+$' : '|\S+?(\s|$)');

//    return str.match(RegExp(regex, 'g')).join(brk);

//}

String.prototype.replaceAll = function (search, replacement)
{
    var target = this;
    return target.split(search).join(replacement);
};

//String.prototype.wordWrap = function (maxWidth)
//{
//    var str = this;
//    var testWhite = function (x)
//    {
//        var white = new RegExp(/^\s$/);
//        return white.test(x.charAt(0));
//    };

//    var newLineStr = "\n"; done = false; res = '';
//    do
//    {
//        found = false;
//        // Inserts new line at first whitespace of the line
//        for (i = maxWidth - 1; i >= 0; i--)
//        {
//            if (testWhite(str.charAt(i)))
//            {
//                res = res + [str.slice(0, i), newLineStr].join('');
//                str = str.slice(i + 1);
//                found = true;
//                break;
//            }
//        }
//        // Inserts new line at maxWidth position, the word is too long to wrap
//        if (!found)
//        {
//            res += [str.slice(0, maxWidth), newLineStr].join('');
//            str = str.slice(maxWidth);
//        }

//        if (str.length < maxWidth)
//            done = true;
//    } while (!done);

//    return res + str;
//}

Array.prototype.unique = function ()
{
    var seen = {};
    return this.filter(function (item)
    {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
};

var GetLatLng = function (Url)
{
    //alert(window.maxConnectionsPerServer);
    //window.maxConnectionsPerServer = 100;
    //alert(window.maxConnectionsPerServer);

    //$.ajax({
    //    type: "GET",
    //    url: "1" + Url,
    //    dataType: "html",
    //    crossDomain: true,
    //    cache: false,
    //    success: function (html)
    //    {
    //        //"http://forecast.weather.gov/MapClick.php?lat=40.8224&lon=-72.9847"
    //        //var RadarId = getParameterByName("site", ResponseURL);

    //        var Latitude = getParameterByName("lat", Url);
    //        var Longitude = getParameterByName("lon", Url);

    //        //divLat.html("Latitude: " + Latitude);
    //        //divLng.html("Longitude: " + Longitude);

    //        //MapClick.php?zoneid=NYZ078
    //        var Index1 = html.indexOf("MapClick.php?zoneid=");
    //        var ZoneId = html.substr(Index1 + 20, 6);

    //        ////obhistory/KHWV.html
    //        //var Index2 = html.indexOf("obhistory/");
    //        //var StationId = html.substr(Index2 + 10, 4);
    //        var Index2_1 = html.indexOf(")</h2>");
    //        var Index2 = html.lastIndexOf("(", Index2_1);
    //        var StationId = html.substr(Index2 + 1, Index2_1 - (Index2 + 1));

    //        //a:"OKX"
    //        var Index3 = html.indexOf("a:\"");
    //        var RadarId = html.substr(Index3 + 3, 3).toUpperCase();

    //        //<div id="about_forecast">
    //        //<div class="fullRow">
    //        //                <div class="left">Point Forecast:</div>
    //        //                <div class="right">Medford NY<br>&nbsp;40.81&deg;N 72.99&deg;W (Elev. 79 ft)</div>
    //        //                    </div>
    //        var Index4 = html.indexOf("<div id=\"about_forecast\">");
    //        var Index5 = html.substr(Index4).indexOf("<br>");
    //        var Index6 = html.substr(Index4, Index5).lastIndexOf("<div") + Index4;
    //        var City = html.substr(Index6 + 19, (Index5 + Index4 - 3) - (Index6 + 19));
    //        var State = html.substr(Index6 + 19 + City.length + 1, (Index5 + Index4) - (Index6 + 19 + City.length + 1));

    //        //<div class="fullRow">
    //        //    <div class="left"><a target="_blank" href="http://www.weather.gov/glossary/index.php?word=Last+update">Last Update</a>: </div>
    //        //    <div class="right">6:01 pm HST Dec 25, 2016</div>
    //        //</div>
    //        var Index7 = html.indexOf("Last Update</a>");
    //        var Index8 = html.substr(Index7).indexOf("<div class=\"right\">");
    //        var Index9 = html.substr(Index7 + Index8).indexOf("</div>");
    //        var TimeZone = html.substr(Index7 + Index8 + 19, (Index7 + Index8 + Index9) - (Index7 + Index8 + 19)).split(' ')[2];

    //        //_WeatherParameters = {
    //        //    Latitude: Latitude,
    //        //    Longitude: Longitude,
    //        //    ZoneId: ZoneId,
    //        //    RadarId: RadarId,
    //        //    StationId: StationId,
    //        //    City: City,
    //        //    State: State,
    //        //    TimeZone: TimeZone,
    //        //};

    //        _WeatherParameters.Latitude = Latitude;
    //        _WeatherParameters.Longitude = Longitude;
    //        _WeatherParameters.ZoneId = ZoneId;
    //        _WeatherParameters.RadarId = RadarId;
    //        _WeatherParameters.StationId = StationId;
    //        _WeatherParameters.City = City;
    //        _WeatherParameters.State = State;
    //        _WeatherParameters.TimeZone = TimeZone;
            
    //        _WeatherParameters.Progress = new Progress({
    //            WeatherParameters: _WeatherParameters,
    //            OnLoad: function ()
    //            {
    //                ////GetMoonPhases(_WeatherParameters);
    //                //GetTimeZone(_WeatherParameters);

    //                //GetCurrentWeather(_WeatherParameters);
    //                GetMonthPrecipitation(_WeatherParameters);
    //                //GetRegionalStations(_WeatherParameters);
    //                GetTravelWeather(_WeatherParameters); //_TravelCities);
    //                GetWeatherForecast(_WeatherParameters);
    //                //ShowRegionalMap(_WeatherParameters);
    //                ShowRegionalMap(_WeatherParameters, true);
    //                ShowDopplerMap(_WeatherParameters);
    //                GetWeatherHazards3(_WeatherParameters);
    //            },
    //        });

    //        //var WeatherCanvases = [];
    //        //WeatherCanvases.push(canvasProgress);
    //        //WeatherCanvases.push(canvasCurrentWeather);
    //        //WeatherCanvases.push(canvasLatestObservations);
    //        //WeatherCanvases.push(canvasTravelForecast);
    //        //WeatherCanvases.push(canvasRegionalForecast);
    //        //WeatherCanvases.push(canvasRegionalObservations);
    //        //WeatherCanvases.push(canvasAlmanac);
    //        //WeatherCanvases.push(canvasLocalForecast);
    //        //WeatherCanvases.push(canvasExtendedForecast);
    //        //WeatherCanvases.push(canvasHazards);
    //        //WeatherCanvases.push(canvasLocalRadar);
    //        //_WeatherParameters.WeatherCanvases = WeatherCanvases;

    //        //$(WeatherCanvases).each(function ()
    //        //{
    //        //    var WeatherCanvas = $(this);
    //        //    WeatherCanvas.css("position", "absolute");
    //        //    WeatherCanvas.css("top", "0px");
    //        //    WeatherCanvas.css("left", "0px");
    //        //    WeatherCanvas.hide();
    //        //});
    //        //canvasProgress.show();

    //        //if (_UpdateWeatherCanvasInterval)
    //        //{
    //        //    window.clearInterval(_UpdateWeatherCanvasInterval);
    //        //}
    //        //_UpdateWeatherCanvasInterval = window.setInterval(function ()
    //        //{
    //        //    UpdateWeatherCanvases(_WeatherParameters);
    //        //}, _UpdateWeatherUpdateMs);

    //        //_WeatherParameters.TravelCities = _TravelCities

    //        //////GetMoonPhases(_WeatherParameters);
    //        ////GetTimeZone(_WeatherParameters);

    //        //GetRegionalStations(_WeatherParameters);
    //        //GetTravelWeather(_WeatherParameters); //_TravelCities);
    //        //GetCurrentWeather(_WeatherParameters);
    //        //GetMonthPrecipitation(_WeatherParameters);
    //        //ShowRegionalMap(_WeatherParameters);
    //        //ShowRegionalMap(_WeatherParameters, true);
    //        //ShowDopplerMap(_WeatherParameters);
    //        //GetWeatherHazards3(_WeatherParameters);
    //    },
    //    error: function (xhr, error, errorThrown)
    //    {
    //        console.error("GetLatLng failed: " + errorThrown);
    //    }
    //});

    _Url = Url;



};

//var WeatherMonthlyTotalsParser = function (html)
//{
//    this.Precipitation = html.find("span:contains(Precipitation)").parent().parent().children().eq(4).find(".wx-value").text();
//};
//var WeatherMonthlyTotalsParser = function (json) {
var WeatherMonthlyTotalsParser = function (text) {
    this.Precipitation = "";

    //try {
    //    this.Precipitation = json.history.summary.precip_sum;
    //} catch (ex) { }

    var PrecipitationIndex = text.indexOf("PRECIPITATION (IN)");
    var SubText = text.substr(PrecipitationIndex);
    var MonthIndex = SubText.indexOf("MONTH TO DATE");
    var MonthText = SubText.substr(MonthIndex + 13);
    var MonthArray = MonthText.split(" ");
    var self = this;

    $(MonthArray).each(function () {
        var item = this.toString();
        if (item == "") {
            return true;
        }
        else {
            self.Precipitation = item;
            return false;
        }
    });

};

var WeatherMonthlyTotals = function (WeatherMonthlyTotalsParser)
{
    var Now = new Date();
    this.MonthName = Now.getMonthName();

    this.PrecipitationTotal = WeatherMonthlyTotalsParser.Precipitation;
    this.PrecipitationTotalC = ConvertInchesToCentimeters(this.PrecipitationTotal);
};

Number.prototype.pad = function(size)
{
    var s = String(this);
    while (s.length < (size || 1))
    {
        s = "0" + s;
    }
    return s;
};

var MoonPhasesParser = function (json)
{
    var _self = this;

    this.Phases = [];
    $(json.phasedata).each(function ()
    {
        _self.Phases.push(this);

        if (_self.Phases.length == 4)
        {
            return false;
        }
    });
};

var MoonPhasesParser2 = function (html)
{
    var Now = new Date();

    var _self = this;
    this.Phases = [];

    html.find(".phaseIcon").find("td").each(function()
    {
        var td = $(this);

        var Phase = {
            date: td.find("span").text(),
            time: "12:00:00",
            phase: td.clone().children().remove().end().text().trim(),
        };

        // Skip today
        if (Phase.date == "Today")
        {
            return true;
        }

        // Need to convert date to mm/dd/yyyy
        var MonthNumber = getMonthFromString(Phase.date.split(" ")[0]);
        var DayNumber = parseInt(Phase.date.split(" ")[1]);
        var YearNumber = Now.getFullYear();

        if (MonthNumber - 1 < Now.getMonth())
        {
            YearNumber++;
        }

        Phase.date = MonthNumber.toString() + "/" + DayNumber.toString() + "/" + YearNumber.toString();

        _self.Phases.push(Phase);

        if (_self.Phases.length == 4)
        {
            return false;
        }
    });
};

var MoonPhasesParser3 = function (json) {
    var Now = new Date();

    var _self = this;
    this.Phases = [];

    $(json.astroPhases).each(function () {
        var phase = this;

        //    Url += Now.getFullYear().pad() + "/";
        //    Url += (Now.getMonth() + 1).pad(2) + "/";
        //    Url += Now.getDate().pad(2) + "/";

        var phaseDate = new Date(phase.date);

        var Phase = {
            date: (phaseDate.getMonth() + 1).pad(2) + "/" + phaseDate.getDate().pad(2) + "/" + phaseDate.getFullYear().pad(),
            time: "12:00:00",
            phase: "",
        };

        switch (phase.moonPhase)
        {
            case "WANING_HALF_LAST_QTR":
                Phase.phase = "Last";
                break;
            case "NEW_MOON":
                Phase.phase = "New";
                break;
            case "WAXING_HALF_FIRST_QTR":
                Phase.phase = "First";
                break;
            case "FULL_MOON":
                Phase.phase = "Full";
                break;
        }

        _self.Phases.push(Phase);

        if (_self.Phases.length == 4) {
            return false;
        }
    });
};

function getMonthFromString(mon)
{
    return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1
}

var SunRiseSetParser = function (json)
{
    var _self = this;

    $(json.sundata).each(function()
    {
        switch (this.phen)
        {
            case "R": // Sunrise
                //_self.SunRiseUTC = this.time;
                _self.SunRise = this.time;
                break;
            case "S": // Sunset
                //_self.SunSetUTC = this.time;
                _self.SunSet = this.time;
                break;
            default:
                return true;
        }
    });
};

var SunRiseSetParser2 = function (html)
{
    var _self = this;
    
    _self.SunRise = html.find("td:contains(Actual Time)").next().text();
    _self.TimeZone = _self.SunRise.split(" ").splice(2, 1).join(" ");
    _self.SunRise = _self.SunRise.split(" ").splice(0, 2).join(" ");
    if (_self.SunRise == "Sun does")
    {
        _self.SunRise = "";
    }
    else
    {
        _self.SunRise = getTimeFromString(_self.SunRise);
    }

    _self.SunSet = html.find("td:contains(Actual Time)").next().next().text();
    _self.SunSet = _self.SunSet.split(" ").splice(0, 2).join(" ");
    if (_self.SunSet == "Sun does")
    {
        _self.SunSet = "";
    }
    else
    {
        _self.SunSet = getTimeFromString(_self.SunSet);
    }
};

var SunRiseSetParser3 = function (json) {
    var _self = this;

    var riseSet = json.astroData[0].sun.riseSet

    //if (riseSet.riseUTC == "Sun rise doesn't exist")
    //{
    //    _self.SunRise = "";
    //}
    //else
    //{
    //    //_self.SunRise = riseSet.riseUTC;
    //    var riseUtcTime = riseSet.riseUTC.split("T")[1].split(":");
    //    _self.SunRise = riseUtcTime[0] + ":" + riseUtcTime[1];
    //}

    //if (riseSet.setUTC == "Sun set doesn't exist")
    //{
    //    _self.SunSet = "";
    //}
    //else
    //{
    //    //_self.SunSet = riseSet.setUTC;
    //    var setUtcTime = riseSet.setUTC.split("T")[1].split(":");
    //    _self.SunSet = setUtcTime[0] + ":" + setUtcTime[1];
    //}

    if (riseSet.rise == "Sun rise doesn't exist" || riseSet.rise == undefined)
    {
        _self.SunRise = "";
    }
    else
    {
        var riseTime = riseSet.rise.split("T")[1].split(":");
        _self.SunRise = riseTime[0] + ":" + riseTime[1];
    }

    if (riseSet.set == "Sun set doesn't exist" || riseSet.set == undefined)
    {    
        _self.SunSet = "";
    }
    else 
    {
        var setTime = riseSet.set.split("T")[1].split(":");
        _self.SunSet = setTime[0] + ":" + setTime[1];
    }

    if (riseSet.riseLocal == "Sun rise doesn't exist" || riseSet.riseLocal == undefined)
    {
        _self.SunRiseLocal = "";
    }
    else
    {
        var riseLocalTime = new Date(riseSet.riseLocal);
        _self.SunRiseLocal = riseLocalTime.getHours().pad(2) + ":" + riseLocalTime.getMinutes().pad(2);
    }

    if (riseSet.setLocal == "Sun set doesn't exist" || riseSet.setLocal == undefined)
    {
        _self.SunSetLocal = "";
    }
    else
    {
        var setLocalTime = new Date(riseSet.setLocal);
        _self.SunSetLocal = setLocalTime.getHours().pad(2) + ":" + setLocalTime.getMinutes().pad(2);
    }

    var tz = parseInt(riseSet.riseLocal.split("-")[3]) * -1;

    var dt = new Date();
    if (dt.dst() == true)
    {
        tz++;
    }

    switch (tz)
    {
        case -5:
            _self.TimeZone = "EST";
            break;
        case -6:
            _self.TimeZone = "CST";
            break;
        case -7:
            _self.TimeZone = "MST";
            break;
        case -8:
            _self.TimeZone = "PST";
            break;
        case -9:
            _self.TimeZone = "AST";
            break;
        case -10:
            _self.TimeZone = "HST";
            break;
    }

};

var getTimeFromString = function (tim)
{
    var time = tim;
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return sHours + ":" + sMinutes;
};

var AlmanacInfo = function (MoonPhasesParser, SunRiseSetParserToday, SunRiseSetParserTomorrow)
{
    var _self = this;
    //var Today = new Date();
    //var Tomorrow = Today.addDays(1);

    this.MoonPhases = [];
    $(MoonPhasesParser.Phases).each(function ()
    {
        //var date = this.date.split(" ");
        var date = new Date(this.date);
        var time = this.time;
        var phase = this.phase.split(" ");

        _self.MoonPhases.push({
            //Date: date[1] + " " + date[2],
            //Date: GetDateFromUTC(date, time),
            Date: GetDateFromTime(date, time),
            Phase: phase[0],
        });
    });

    //this.TodaySunRise = GetDateFromUTC(new Date(), SunRiseSetParserToday.SunRiseUTC);
    //this.TodaySunSet = GetDateFromUTC(new Date(), SunRiseSetParserToday.SunSetUTC);

    //this.TomorrowSunRise = GetDateFromUTC((new Date()).addDays(1), SunRiseSetParserTomorrow.SunRiseUTC);
    //this.TomorrowSunSet = GetDateFromUTC((new Date()).addDays(1), SunRiseSetParserTomorrow.SunSetUTC);

    this.TodaySunRise = GetDateFromTime(new Date(), SunRiseSetParserToday.SunRiseLocal);
    this.TodaySunSet = GetDateFromTime(new Date(), SunRiseSetParserToday.SunSetLocal);

    this.TomorrowSunRise = GetDateFromTime((new Date()).addDays(1), SunRiseSetParserTomorrow.SunRiseLocal);
    this.TomorrowSunSet = GetDateFromTime((new Date()).addDays(1), SunRiseSetParserTomorrow.SunSetLocal);

    this.TodaySunRiseLocal = GetDateFromTime(new Date(), SunRiseSetParserToday.SunRiseLocal);//, SunRiseSetParserToday.TimeZone);
    this.TodaySunSetLocal = GetDateFromTime(new Date(), SunRiseSetParserToday.SunSetLocal);///, SunRiseSetParserToday.TimeZone);

    this.TomorrowSunRiseLocal = GetDateFromTime((new Date()).addDays(1), SunRiseSetParserTomorrow.SunRiseLocal);//, SunRiseSetParserToday.TimeZone);
    this.TomorrowSunSetLocal = GetDateFromTime((new Date()).addDays(1), SunRiseSetParserTomorrow.SunSetLocal);//, SunRiseSetParserToday.TimeZone);

    //this.TodaySunRise = new Date(SunRiseSetParserToday.SunRise);
    //this.TodaySunSet = new Date(SunRiseSetParserToday.SunSet);

    //this.TomorrowSunRise = new Date(SunRiseSetParserTomorrow.SunRise);
    //this.TomorrowSunSet = new Date(SunRiseSetParserTomorrow.SunSet);

    //this.TodaySunRiseLocal = new Date(SunRiseSetParserToday.SunRiseLocal);
    //this.TodaySunSetLocal = new Date(SunRiseSetParserToday.SunSetLocal);

    //this.TomorrowSunRiseLocal = new Date(SunRiseSetParserTomorrow.SunRiseLocal);
    //this.TomorrowSunSetLocal = new Date(SunRiseSetParserTomorrow.SunSetLocal);

};

var PopulateAlmanacInfo = function (WeatherParameters)
{
    if (WeatherParameters == null || (_DontLoadGifs == true && WeatherParameters.Progress.Almanac != LoadStatuses.Loaded))
    {
        return;
    }

    var AlmanacInfo = WeatherParameters.AlmanacInfo;
    divSunrise.html("Sunrise:");

    divSunriseTodayName.html(AlmanacInfo.TodaySunRise.getDayName());
    divSunriseToday.html(AlmanacInfo.TodaySunRise.getFormattedTime());
    divSunriseTomorrow.html(AlmanacInfo.TomorrowSunRise.getFormattedTime());

    divSunset.html("Sunset:");
    divSunsetTomorrowName.html(AlmanacInfo.TomorrowSunRise.getDayName());
    divSunsetToday.html(AlmanacInfo.TodaySunSet.getFormattedTime());
    divSunsetTomorrow.html(AlmanacInfo.TomorrowSunSet.getFormattedTime());

    $(AlmanacInfo.MoonPhases).each(function (Index, MoonPhase)
    {
        var date = MoonPhase.Date.getMonthShortName() + " " + MoonPhase.Date.getDate().toString();

        $("#divMoonDate" + (Index + 1).toString()).html(date);
        $("#divMoonPhase" + (Index + 1).toString()).html(MoonPhase.Phase);
    });

    // Draw canvas
    var canvas = canvasAlmanac[0];
    var context = canvas.getContext("2d");

    var MoonImageCounter = 0;

    var MoonImageLoaded = function()
    {
        MoonImageCounter++;
        if (MoonImageCounter == 4)
        {
            var BackGroundImage = new Image();
            BackGroundImage.onload = function ()
            {
                context.drawImage(BackGroundImage, 0, 0);
                DrawHorizontalGradientSingle(context, 0, 30, 500, 90, _TopColor1, _TopColor2);
                DrawTriangle(context, "rgb(28, 10, 87)", 500, 30, 450, 90, 500, 90);
                DrawHorizontalGradientSingle(context, 0, 90, 640, 190, _SideColor1, _SideColor2);

                DrawTitleText(context, "Almanac", "Astronomical");

                //DrawText(context, "Star4000", "24pt", "#FFFF00", 320, 120, AlmanacInfo.TodaySunRise.getDayName(), 2, "center");
                //DrawText(context, "Star4000", "24pt", "#FFFF00", 500, 120, AlmanacInfo.TomorrowSunRise.getDayName(), 2, "center");
                var Today = new Date();
                var Tomorrow = Today.addDays(1);
                DrawText(context, "Star4000", "24pt", "#FFFF00", 320, 120, Today.getDayName(), 2, "center");
                DrawText(context, "Star4000", "24pt", "#FFFF00", 500, 120, Tomorrow.getDayName(), 2, "center");

                DrawText(context, "Star4000", "24pt", "#FFFFFF", 70, 150, "Sunrise:", 2);
                if (isNaN(AlmanacInfo.TodaySunRise) == true)
                {
                    DrawText(context, "Star4000", "24pt", "#FFFFFF", 270, 150, "No Sunrise", 2);
                }
                else
                {
                    DrawText(context, "Star4000", "24pt", "#FFFFFF", 270, 150, AlmanacInfo.TodaySunRise.getFormattedTime(), 2);
                }
                if (isNaN(AlmanacInfo.TomorrowSunRise) == true)
                {
                    DrawText(context, "Star4000", "24pt", "#FFFFFF", 450, 150, "No Sunrise", 2);
                }
                else
                {
                    DrawText(context, "Star4000", "24pt", "#FFFFFF", 450, 150, AlmanacInfo.TomorrowSunRise.getFormattedTime(), 2);
                }

                DrawText(context, "Star4000", "24pt", "#FFFFFF", 70, 180, " Sunset:", 2);
                if (isNaN(AlmanacInfo.TodaySunSet) == true)
                {
                    DrawText(context, "Star4000", "24pt", "#FFFFFF", 270, 180, "No Sunset", 2);
                }
                else
                {
                    DrawText(context, "Star4000", "24pt", "#FFFFFF", 270, 180, AlmanacInfo.TodaySunSet.getFormattedTime(), 2);
                }
                if (isNaN(AlmanacInfo.TomorrowSunSet) == true)
                {
                    DrawText(context, "Star4000", "24pt", "#FFFFFF", 450, 180, "No Sunset", 2);
                }
                else
                {
                    DrawText(context, "Star4000", "24pt", "#FFFFFF", 450, 180, AlmanacInfo.TomorrowSunSet.getFormattedTime(), 2);
                }

                DrawText(context, "Star4000", "24pt", "#FFFF00", 70, 220, "Moon Data:", 2);

                var x = 120;
                $(AlmanacInfo.MoonPhases).each(function (Index, MoonPhase)
                {
                    var date;
                    switch (_Units)
                    {
                        case Units.English:
                            date = MoonPhase.Date.getMonthShortName() + " " + MoonPhase.Date.getDate().toString();
                            break;
                        case Units.Metric:
                            date = MoonPhase.Date.getDate().toString() + " " + MoonPhase.Date.getMonthShortName();
                            break;
                    }

                    DrawText(context, "Star4000", "24pt", "#FFFFFF", x, 260, MoonPhase.Phase, 2, "center");
                    DrawText(context, "Star4000", "24pt", "#FFFFFF", x, 390, date, 2, "center");

                    switch (MoonPhase.Phase)
                    {
                        case "Full":
                            context.drawImage(FullMoonImage, x - 45, 270);
                            break;
                        case "Last":
                            context.drawImage(LastMoonImage, x - 45, 270);
                            break;
                        case "New":
                            context.drawImage(NewMoonImage, x - 45, 270);
                            break;
                        case "First":
                            context.drawImage(FirstMoonImage, x - 45, 270);
                            break;
                    }

                    x += 130;
                });

                WeatherParameters.Progress.Almanac = LoadStatuses.Loaded;

                UpdateWeatherCanvas(WeatherParameters, canvasAlmanac);
            };
            BackGroundImage.src = "images/BackGround3_1.png";
            //BackGroundImage.src = "images/BackGround3_" + _Themes.toString() + ".png";
        }
    }

    var FullMoonImage = new Image();
    FullMoonImage.onload = MoonImageLoaded;
    //FullMoonImage.src = "images/Moon1.gif";
    FullMoonImage.src = "images/2/Full-Moon.gif";

    var LastMoonImage = new Image();
    LastMoonImage.onload = MoonImageLoaded;
    //LastMoonImage.src = "images/Moon2.gif";
    LastMoonImage.src = "images/2/Last-Quarter.gif";

    var NewMoonImage = new Image();
    NewMoonImage.onload = MoonImageLoaded;
    //NewMoonImage.src = "images/Moon3.gif";
    NewMoonImage.src = "images/2/New-Moon.gif";

    var FirstMoonImage = new Image();
    FirstMoonImage.onload = MoonImageLoaded;
    //FirstMoonImage.src = "images/Moon4.gif";
    FirstMoonImage.src = "images/2/First-Quarter.gif";

};

var GetDateFromUTC = function (date, utc)
{
    var time = utc.split(":");
    
    //date.setUTCHours(time[0], time[1], 0, 0);
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), time[0], time[1], 0));

    return date;
};

var GetTimeZoneOffsetFromUTC = function (timezone)
{
    var Offset = null;

    switch (timezone)
    {
        case "EST":
            Offset = -5;
            break;
        case "EDT":
            Offset = -4;
            break;
        case "CST":
            Offset = -6;
            break;
        case "CDT":
            Offset = -5;
            break;
        case "MST":
            Offset = -7;
            break;
        case "MDT":
            Offset = -6;
            break;
        case "PST":
            Offset = -8;
            break;
        case "PDT":
            Offset = -7;
            break;
        case "AST":
        case "AKST":
            Offset = -9;
            break;
        case "ADT":
        case "AKDT":
            Offset = -8;
            break;
        case "HST":
            Offset = -10;
            break;
        case "HDT":
            Offset = -9;
            break;
    }

    //if (Offset != null)
    //{
    //    var dt = new Date();
    //    if (dt.dst() == true)
    //    {
    //        Offset++;
    //    }
    //}

    return Offset;
};

Date.prototype.getTimeZone = function ()
{
    var tz = this.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2];

    if (tz == null)
    {
        switch (this.toTimeString().split(' ')[2])
        {
            case "(Eastern":
                tz = "EST";
                break;
            case "(Central":
                tz = "CST";
                break;
            case "(Mountain":
                tz = "MST";
                break;
            case "(Pacific":
                tz = "PST";
                break;
            case "(Alaskan":
                tz = "AST";
                break;
            case "(Hawaiian":
                tz = "HST";
                break;
        }
    }
    else if (tz.length == 4)
    {
        // Fix weird bug in Edge where it returns the timezone with a null character in the first position.
        tz = tz.substr(1);
    }

    return tz;
};

var ConvertDateToTimeZone = function(date, timezone)
{
    var OldOffset = GetTimeZoneOffsetFromUTC(date.getTimeZone());
    var NewOffset = GetTimeZoneOffsetFromUTC(timezone);

    //var dt = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    var dt = new Date(date);
    dt = dt.addHours(OldOffset * -1);
    dt = dt.addHours(NewOffset);
    
    return dt;
}

var GetDateFromTime = function (date, time, timezone)
{
    var Time = time.split(":");
    var Offset = 0;

    //date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), Time[0], Time[1], 0);

    if (timezone)
    {
        //switch (timezone)
        //{
        //    case "EST":
        //        Offset = 5;
        //        break;
        //    case "CST":
        //        Offset = 6;
        //        break;
        //    case "MST":
        //        Offset = 7;
        //        break;
        //    case "PST":
        //        Offset = 8;
        //        break;
        //    case "AST":
        //    case "AKST":
        //        Offset = 9;
        //        break;
        //    case "HST":
        //        Offset = 10;
        //        break;
        //}

        //var dt = new Date();
        //if (dt.dst() == true)
        //{
        //    Offset--
        //}

        Offset = GetTimeZoneOffsetFromUTC(timezone) * -1;

        date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), Time[0], Time[1], 0));
        date = date.addHours(Offset);
    }
    else
    {
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), Time[0], Time[1], 0);
    }

    return date;
};

Date.prototype.getFormattedTime = function ()
{
    var hours;
    var minutes;
    var ampm;
    var formattedTime;

    switch (_Units)
    {
        case Units.English:
            hours = this.getHours() == 0 ? "12" : this.getHours() > 12 ? this.getHours() - 12 : this.getHours();
            minutes = (this.getMinutes() < 10 ? "0" : "") + this.getMinutes();
            ampm = this.getHours() < 12 ? "am" : "pm";
            formattedTime = hours + ":" + minutes + " " + ampm;
            break;

        case Units.Metric:
            hours = (this.getHours() < 10 ? " " : "") + this.getHours();
            minutes = (this.getMinutes() < 10 ? "0" : "") + this.getMinutes();
            formattedTime = hours + ":" + minutes;
            break;
    }

    return formattedTime;
}

Date.prototype.toTimeAMPM = function ()
{
    var date = this;
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

var GetTravelWeather = function (WeatherParameters)
{
    var TravelCities = WeatherParameters.TravelCities;
    var Total = TravelCities.length;
    var Count = 0;

    $(TravelCities).each(function ()
    {
        var TravelCity = this;

        //var Url = "https://forecast.weather.gov/MapClick.php?FcstType=dwml";
        var Url;

        //if (TravelCity.WFO)
        //{
        //    Url = "https://api.weather.gov/gridpoints";
        //    Url += "/" + TravelCity.WFO.toString();
        //    Url += "/" + TravelCity.X.toString();
        //    Url += "," + TravelCity.Y.toString();
        //    Url += "/forecast";

        //    //Url = "https://api.weather.gov/gridpoints/LWX/96,70/forecast";
        //}
        //else
        {
            Url = "https://forecast.weather.gov/MapClick.php?FcstType=dwml";
            Url += "&lat=" + TravelCity.Latitude.toString();
            Url += "&lon=" + TravelCity.Longitude.toString();
        }

        //console.log("TravelCities: Url='" + Url + "'");

        //Url = "cors/?u=" + encodeURIComponent(Url);

        // Load the xml file using ajax 
        $.ajaxCORS({
            type: "GET",
            url: Url,
            dataType: "xml",
            crossDomain: true,
            cache: false,
            success: function (xml)
            {
                var $xml = $(xml);
                //console.log(xml);

                TravelCity.WeatherDwmlParser = new WeatherDwmlParser($xml);
                //console.log(WeatherDwmlParser);

                TravelCity.WeatherTravelForecast = new WeatherTravelForecast(TravelCity.WeatherDwmlParser);

                Count++;
                if (Count == Total)
                {
                    PopulateTravelCities(WeatherParameters);
                    //WeatherParameters.Progress.TravelForecast = LoadStatuses.Loaded;
                }
            },
            error: function (xhr, error, errorThrown)
            {
                console.error("GetTravelWeather for city '" + TravelCity.Name + "' failed: " + errorThrown);

                Count++;
                if (Count == Total)
                {
                    PopulateTravelCities(WeatherParameters);
                    //WeatherParameters.Progress.TravelForecast = LoadStatuses.Loaded;
                }
            }
        });

    });

};

var WeatherTravelForecast = function (WeatherDwmlParser, ForceToday, ForceTonight, ForceTomorrow)
{
    var Today = new Date();
    var addDays = 0;

    if (ForceToday || ForceTonight || ForceTomorrow)
    {
        if (ForceToday)
        {
            if (Today.getHours() == 0)
            {
                // Prevent Midnight from causing the wrong icons to appear.
                Today.setHours(1, 0, 0, 0);
            }
        }
        else if (ForceTonight)
        {
            Today.setHours(12, 0, 0, 0);
        }
        else if (ForceTomorrow)
        {
            addDays = 1;
            Today.setHours(0, 0, 0, 0);
        }
    }
    else
    {
        if (Today.getHours() >= 12)
        {
            addDays = 1;
            Today.setHours(0, 0, 0, 0);
        }
        else if (Today.getHours() == 0)
        {
            // Prevent Midnight from causing the wrong icons to appear.
            Today.setHours(1, 0, 0, 0);
        }
    }
//addDays = 0;

    var Tomorrow = Today.addDays(addDays);
    var _Date = Tomorrow.getYYYYMMDD();
    var DayName = Tomorrow.getDayName();

    var _LayoutKey;
    var _PeriodIndex = [];

    var _self = this;

    //$(WeatherDwmlParser.data_forecast.time_layout).each(function ()
    //{
    //    _LayoutKey = this.layout_key;

    //    $(this.start_valid_time).each(function (Index, Value)
    //    {
    //        if (this.period_name == DayName || this.period_name == DayName + " Night")
    //        {
    //            _PeriodIndex[_LayoutKey] = Index;
    //            return false;
    //        }
    //    });
    //});

    //if (WeatherDwmlParser.data_forecast.location.description == "Boston, MA")
    //{
    //    var debug = 1;
    //}

    $(WeatherDwmlParser.data_forecast.time_layout).each(function ()
    {
        _LayoutKey = this.layout_key;

        $(this.start_valid_time).each(function (Index, Value)
        {
            if (this.value.indexOf(_Date) != -1)
            {
                var d = ConvertXmlDateToJsDate(this.value);

                if (ForceTonight)
                {
                    if (this.period_name == "Overnight" || this.period_name == "Tonight" || this.period_name == "Rest of Tonight" || this.period_name == "This Evening")
                    {
                        _PeriodIndex[_LayoutKey] = Index;
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                }

                if (d.getHours() == 0)
                {
                    return true;
                }
                if (addDays != 0)
                {
                    if (d.getTime() < Tomorrow.getTime())
                    {
                        return true;
                    }
                }

                _PeriodIndex[_LayoutKey] = Index;
                return false;
            }
        });
    });

    _LayoutKey = WeatherDwmlParser.data_forecast.parameters.temperature_maximum.time_layout;
    var index = _PeriodIndex[_LayoutKey];
    if (index == undefined)
    {
        index = 0;
    }
    this.MaximumTemperature = WeatherDwmlParser.data_forecast.parameters.temperature_maximum.value[index];
    this.MaximumTemperatureC = ConvertFahrenheitToCelsius(this.MaximumTemperature);

    _LayoutKey = WeatherDwmlParser.data_forecast.parameters.temperature_minimum.time_layout;
    var index = _PeriodIndex[_LayoutKey];
    if (index == undefined)
    {
        index = 0;
    }
    this.MinimumTemperature = WeatherDwmlParser.data_forecast.parameters.temperature_minimum.value[index];
    this.MinimumTemperatureC = ConvertFahrenheitToCelsius(this.MinimumTemperature);

    _LayoutKey = WeatherDwmlParser.data_forecast.parameters.weather.time_layout;
    var index = _PeriodIndex[_LayoutKey];
    if (index == undefined)
    {
        index = 0;
    }
    this.Conditions = WeatherDwmlParser.data_forecast.parameters.weather.weather_conditions[index].weather_summary.trim();

    _LayoutKey = WeatherDwmlParser.data_forecast.parameters.conditions_icon.time_layout;
    var index = _PeriodIndex[_LayoutKey];
    if (index == undefined)
    {
        index = 0;
    }
    this.Icon = WeatherDwmlParser.data_forecast.parameters.conditions_icon.icon_link[index];
    //this.Icon = GetWeatherIconFromIconLink(this.Icon);
    //this.Icon = GetWeatherRegionalIconFromIconLink(this.Icon);
    //this.Icon = GetWeatherRegionalIconFromIconLink(this.Icon, this.Conditions, _WeatherParameters);
    this.Icon = GetWeatherRegionalIconFromIconLink(this.Icon, this.Conditions, _WeatherParameters, ForceTonight);

    this.DayName = DayName;
};

var PopulateTravelCities = function (WeatherParameters)
{
    if (WeatherParameters == null || (_DontLoadGifs == true && WeatherParameters.Progress.TravelForecast != LoadStatuses.Loaded))
    {
        return;
    }

    var TravelCities = WeatherParameters.TravelCities;
    //console.log(TravelCities);

    var Html = "";

    var tbodyTravelCities = tblTravelCities.find("tbody");
    tbodyTravelCities.empty();

    Html = "<tr>";
    Html += "<td></td>";
    Html += "<td></td>";
    Html += "<td>LOW</td>";
    Html += "<td>HIGH</td>";
    Html += "</tr>";
    tbodyTravelCities.append(Html);

    $(TravelCities).each(function ()
    {
        var WeatherTravelForecast = this.WeatherTravelForecast;

        Html = "<tr>";
        Html += "<td>" + this.Name + "</td>";

        if (WeatherTravelForecast)
        {
            Html += "<td><img src='" + WeatherTravelForecast.Icon + "' /></td>";
            Html += "<td>" + WeatherTravelForecast.MinimumTemperature + "</td>";
            Html += "<td>" + WeatherTravelForecast.MaximumTemperature + "</td>";
        }
        else
        {
            Html += "<td colspan='3'>NO TRAVEL DATA AVAILABLE</td>";
        }
        Html += "</tr>";
        tbodyTravelCities.append(Html);
    });

    var DrawTravelCities = function ()
    {
        // Draw canvas
        var canvas = canvasTravelForecast[0];
        var context = canvas.getContext("2d");

        var BackGroundImage = new Image();
        BackGroundImage.onload = function ()
        {
            context.drawImage(BackGroundImage, 0, 0);
            DrawHorizontalGradientSingle(context, 0, 30, 500, 90, _TopColor1, _TopColor2);
            DrawTriangle(context, "rgb(28, 10, 87)", 500, 30, 450, 90, 500, 90);

            //DrawTitleText(context, "Travel Forecast", "For " + TravelCities[0].WeatherTravelForecast.DayName);
            DrawTitleText(context, "Travel Forecast", "For " + GetTravelCitiesDayName(TravelCities));

            DrawText(context, "Star4000 Small", "24pt", "#FFFF00", 455, 105, "LOW", 2);
            DrawText(context, "Star4000 Small", "24pt", "#FFFF00", 510, 105, "HIGH", 2);

            var y = 0;

            //window.setInterval(function ()
            //{
            //    context.drawImage(cnvTravelCitiesScroll[0], 0, y, 640, 289, 0, 110, 640, 289);

            //    // Wait until the weather has been loaded.
            //    if (WeatherParameters.Progress.GetTotalPercentage() != 100)
            //    {
            //        return;
            //    }

            //    // Wait 3 seconds and then start scrolling.
            //    if (_UpdateTravelCitiesCounterMs == 0)
            //    {
            //        y = 0;
            //    }
            //    if (_UpdateTravelCitiesCounterMs > 3000)
            //    {
            //        //y += 1;
            //        y += 5;
            //    }
            //    if (y > cnvTravelCitiesScroll.height() - 289)
            //    {
            //        y = cnvTravelCitiesScroll.height() - 289;

            //        // Wait 10 seconds and start all over.
            //        _UpdateTravelCitiesCounterMs = -10000;
            //    }

            //}, _UpdateTravelCitiesInterval);

            window.setInterval(function ()
            {
                var Elm = document.elementFromPoint(0, 100);
                if (Elm != canvas)
                {
                    return;
                }

                context.drawImage(cnvTravelCitiesScroll[0], 0, _UpdateTravelCitiesY, 640, 289, 0, 110, 640, 289);
            }, 100);

            WeatherParameters.Progress.TravelForecast = LoadStatuses.Loaded;

            UpdateWeatherCanvas(WeatherParameters, canvasTravelForecast);
        };
        BackGroundImage.src = "images/BackGround6_1.png";
        //BackGroundImage.src = "images/BackGround6_" + _Themes.toString() + ".png";
    };

    var cnvTravelCitiesScroll;

    var ShowTravelCitiesScroll = function ()
    {
        var img = new Image();
        var cnvTravelCitiesScrollId;
        var context;
        var TravelCities = WeatherParameters.TravelCities;

        cnvTravelCitiesScrollId = "cnvTravelCitiesScroll";

        if (_DontLoadGifs == false)
        {
            // Clear the current image.
            divTravelCitiesScroll.empty();

            divTravelCitiesScroll.html("<canvas id='" + cnvTravelCitiesScrollId + "' />");
            cnvTravelCitiesScroll = $("#" + cnvTravelCitiesScrollId);
            cnvTravelCitiesScroll.attr("width", "640"); // For Chrome.
            cnvTravelCitiesScroll.attr("height", "1728"); // For Chrome.
            cnvTravelCitiesScroll[0].RelatedCanvas = canvasTravelForecast[0];
            //cnvTravelCitiesScroll.css("background",  "repeating-linear-gradient(#4040ff, #202080, #202080, #4040ff 20%)");
        }
        cnvTravelCitiesScroll = $("#" + cnvTravelCitiesScrollId);
        context = cnvTravelCitiesScroll[0].getContext("2d");

        DrawBox(context, "rgb(35, 50, 112)", 0, 0, 640, 1728);

        for (var Index = 0; Index <= 4; Index++)
        {
            var y = Index * 346;
            DrawHorizontalGradient(context, 0, y, 640, y + 346, "#102080", "#001040");
        }

        var y = 50;
        var Counter = 0;
        var MaxIcons = TravelCities.length;

        $(TravelCities).each(function ()
        {
            var TravelCity = this;
            var WeatherTravelForecast = TravelCity.WeatherTravelForecast;
            
            DrawText(context, "Star4000 Large Compressed", "24pt", "#FFFF00", 80, y, TravelCity.Name, 2);

            if (WeatherTravelForecast && WeatherTravelForecast.Icon != "images/r/")
            {
                var MinimumTemperature;
                var MaximumTemperature;

                switch (_Units)
                {
                    case Units.English:
                        MinimumTemperature = WeatherTravelForecast.MinimumTemperature.toString();
                        MaximumTemperature = WeatherTravelForecast.MaximumTemperature.toString();
                        break;

                    case Units.Metric:
                        MinimumTemperature = Math.round(WeatherTravelForecast.MinimumTemperatureC).toString();
                        MaximumTemperature = Math.round(WeatherTravelForecast.MaximumTemperatureC).toString();
                        break;
                }

                //DrawText(context, "Star4000 Large", "24pt", "#FFFF00", 460, y, WeatherTravelForecast.MinimumTemperature, 2);
                //var MinimumTemperature = WeatherTravelForecast.MinimumTemperature.toString();
                var x = (500 - (MinimumTemperature.length * 20));
                DrawText(context, "Star4000 Large", "24pt", "#FFFF00", x, y, MinimumTemperature, 2);

                //DrawText(context, "Star4000 Large", "24pt", "#FFFF00", 520, y, WeatherTravelForecast.MaximumTemperature, 2);
                //var MaximumTemperature = WeatherTravelForecast.MaximumTemperature.toString();
                var x = (560 - (MaximumTemperature.length * 20));
                DrawText(context, "Star4000 Large", "24pt", "#FFFF00", x, y, MaximumTemperature, 2);

                if (_DontLoadGifs == true)
                {
                    Counter++;
                    if (Counter == MaxIcons)
                    {
                        DrawTravelCities();
                    }
                }
                else
                {
                    var gifIcon = new SuperGif({
                        src: WeatherTravelForecast.Icon,
                        loop_delay: 100,
                        auto_play: true,
                        canvas: cnvTravelCitiesScroll[0],
                        x: 330,
                        y: y - 35,
                        max_width: 47,
                    });

                    gifIcon.load(function ()
                    {
                        Counter++;
                        if (Counter == MaxIcons)
                        {
                            DrawTravelCities();
                        };
                    });
                }
            }
            else
            {
                DrawText(context, "Star4000 Small", "24pt", "#FFFFFF", 400, y - 18, "NO TRAVEL", 2);
                DrawText(context, "Star4000 Small", "24pt", "#FFFFFF", 400, y, "DATA AVAILABLE", 2);

                Counter++;
                if (Counter == MaxIcons)
                {
                    DrawTravelCities();
                };
            }

            y += 72;
        });
    };
    ShowTravelCitiesScroll();

};

var DrawHorizontalGradient = function (context, x1, y1, x2, y2, color1, color2)
{
    // http://www.w3schools.com/tags/canvas_createlineargradient.asp

    var LinearGradient = context.createLinearGradient(0, y1, 0, y2);
    LinearGradient.addColorStop(0, color1);
    LinearGradient.addColorStop(0.4, color2);
    LinearGradient.addColorStop(0.6, color2);
    LinearGradient.addColorStop(1, color1);
    context.fillStyle = LinearGradient;
    context.fillRect(x1, y1, x2 - x1, y2 - y1);
};

var DrawHorizontalGradientSingle = function (context, x1, y1, x2, y2, color1, color2)
{
    // http://www.w3schools.com/tags/canvas_createlineargradient.asp

    var LinearGradient = context.createLinearGradient(0, y1, 0, y2);
    LinearGradient.addColorStop(0, color1);
    LinearGradient.addColorStop(1, color2);
    context.fillStyle = LinearGradient;
    context.fillRect(x1, y1, x2 - x1, y2 - y1);
};

var UpdateTravelCities = function (Offset)
{
    var canvas = canvasTravelForecast[0];
    var context = canvas.getContext("2d");
    var cnvTravelCitiesScroll = $("#cnvTravelCitiesScroll");

    switch (Offset)
    {
        case undefined:
            break;
        case 0:
            _UpdateTravelCitiesY = 0;
            break;
        case Infinity:
            _UpdateTravelCitiesY = cnvTravelCitiesScroll.height() - 289;
            break;
        default:
            _UpdateTravelCitiesY += (289 * Offset);
            if (_UpdateTravelCitiesY > cnvTravelCitiesScroll.height() - 289)
            {
                _UpdateTravelCitiesY = cnvTravelCitiesScroll.height() - 289;
            }
            else if (_UpdateTravelCitiesY < 0)
            {
                _UpdateTravelCitiesY = 0;
            }
            break;
    }

    context.drawImage(cnvTravelCitiesScroll[0], 0, _UpdateTravelCitiesY, 640, 289, 0, 110, 640, 289);

    //// Wait 3 seconds and then start scrolling.
    //if (_UpdateTravelCitiesCounterMs == 0)
    //{
    //    y = 0;
    //}
    //if (_UpdateTravelCitiesCounterMs > 3000)
    //{
    //    //y += 1;
    //    y += 5;
    //}
    //if (y > cnvTravelCitiesScroll.height() - 289)
    //{
    //    y = cnvTravelCitiesScroll.height() - 289;

    //    // Wait 10 seconds and start all over.
    //    _UpdateTravelCitiesCounterMs = -10000;
    //}

};


var GetRegionalStations = function (WeatherParameters, Distance)
{
    if (!Distance)
    {
        Distance = 20;
        WeatherParameters.WeatherCurrentRegionalConditions = new WeatherCurrentRegionalConditions();
    }

    var Url = "https://www.aviationweather.gov/adds/dataserver_current/httpparam?datasource=metars&requesttype=retrieve&format=xml&hoursBeforeNow=1";
    Url += "&radialDistance=" + Distance.toString();
    Url += ";" + WeatherParameters.Longitude;
    Url += "," + WeatherParameters.Latitude;
    //Url += "," + (new Date().getTime()); // Prevents caching
    //Url = "cors/?u=" + encodeURIComponent(Url);

    var Total = _MaximumRegionalStations;
    var Count = 0;

    // Load the xml file using ajax 
    $.ajaxCORS({
        type: "GET",
        url: Url,
        dataType: "xml",
        crossDomain: true,
        cache: false,
        success: function (xml)
        {
            var $xml = $(xml);
            //console.log(xml);

            if ($xml.find("response").find("errors").find("error").length != 0)
            {
                console.error($xml.find("response").find("errors").text());
                return;
            }

            //var WeatherRegionalMetarsParser = new WeatherRegionalMetarsParser($xml);
            $xml.find("response").find("data").find("METAR").each(function ()
            {
                var data_METAR = $(this);
                var StationId = data_METAR.find("station_id").text();
                var LatLons = data_METAR.find("latitude").text() + "," + data_METAR.find("longitude").text();

                if (StationId == WeatherParameters.StationId)
                {
                    return true;
                }
                else if (WeatherParameters.WeatherCurrentRegionalConditions.SkipStationIds.indexOf(StationId) != -1)
                {
                    return true;
                }

                if (WeatherParameters.WeatherCurrentRegionalConditions.LatLons.indexOf(LatLons) != -1)
                {
                    return true;
                }

                if (WeatherParameters.WeatherCurrentRegionalConditions.StationIds.indexOf(StationId) == -1)
                {
                    WeatherParameters.WeatherCurrentRegionalConditions.StationIds.push(StationId);
                    WeatherParameters.WeatherCurrentRegionalConditions.LatLons.push(LatLons);
                    WeatherParameters.WeatherCurrentRegionalConditions.WeatherMetarsParser[StationId] = new WeatherMetarsParser($xml, StationId);
                }

                if (WeatherParameters.WeatherCurrentRegionalConditions.StationIds.length >= Total)
                {
                    return false;
                }
            });

            if (WeatherParameters.WeatherCurrentRegionalConditions.StationIds.length >= Total)
            {
                //console.log(WeatherParameters.WeatherRegionalMetarsParser);
                console.log(WeatherParameters.WeatherCurrentRegionalConditions);

                GetDwmlRegionalStations(WeatherParameters, Distance);
            }
            else
            {

                if (Distance >= 500)
                {
                    console.error("GetRegionalStations unable to find weather upto 500 miles");
                    WeatherParameters.Progress.NearbyConditions = LoadStatuses.Failed;
                    return;
                }

                // Increase distance by 10 miles.
                GetRegionalStations(WeatherParameters, Distance + 10);
            }

        },
        error: function (xhr, error, errorThrown)
        {
            console.error("GetRegionalStations failed: " + errorThrown);
            WeatherParameters.Progress.NearbyConditions = LoadStatuses.Failed;
        }
    });

};

var WeatherCurrentRegionalConditions = function ()
{
    this.StationIds = [];
    this.WeatherMetarsParser = [];
    this.WeatherDwmlParser = [];
    this.WeatherCurrentConditions = [];
    this.LatLons = [];
    this.StationNames = [];
    this.SkipStationIds = [];

    // Always skip these stations.
    this.SkipStationIds.push("KANE"); // "Minneapls"
    this.SkipStationIds.push("KMIC"); // "Mnpls"
    this.SkipStationIds.push("KLVN"); // "Mnpls"
    this.SkipStationIds.push("KFCM"); // "Mnpls"

};
//var WeatherCurrentRegionalCondition = function (MetarData)
//{
//    this.CityName = "";
//    this.StationId = MetarData.station_id;
//    this.Latitude = MetarData.latitude;
//    this.Longitude = MetarData.longitude;

//    this.Conditions = "";
//    this.Icon = "";
//    this.Temperature = ConvertCelsiusToFahrenheit(MetarData.temp_c);

//    this.WindDirection = ConvertDirectionToNSEW(MetarData.wind_dir_degrees);
//    this.WindSpeed = "Calm";
//    if (MetarData.wind_speed_kt != "" && MetarData.wind_speed_kt != "0")
//    {
//        this.WindSpeed = ConvertKnotsToMph(MetarData.wind_speed_kt);
//    }
//    else
//    {
//        this.WindDirection = "";
//    }
//};

var GetDwmlRegionalStations = function (WeatherParameters, Distance)
{
    var Total = WeatherParameters.WeatherCurrentRegionalConditions.StationIds.length;
    var Count = 0;
    var NeedToGetRegionalStations = false;

    $(WeatherParameters.WeatherCurrentRegionalConditions.StationIds).each(function ()
    {
        var StationId = this.toString();
        var _WeatherMetarsParser = WeatherParameters.WeatherCurrentRegionalConditions.WeatherMetarsParser[StationId];

        if (WeatherParameters.WeatherCurrentRegionalConditions.WeatherCurrentConditions[StationId])
        {
            var StationName = WeatherParameters.WeatherCurrentRegionalConditions.WeatherCurrentConditions[StationId].StationName;
            WeatherParameters.WeatherCurrentRegionalConditions.StationNames.push(StationName);
            Count++;
            if (Count == Total)
            {
                //console.log(WeatherParameters.WeatherCurrentRegionalConditions);
                PopulateRegionalObservations(WeatherParameters);
                //WeatherParameters.Progress.NearbyConditions = LoadStatuses.Loaded;
                return false;
            }
            return true;
        }

        var Url = "https://forecast.weather.gov/MapClick.php?FcstType=dwml";
        Url += "&lat=" + _WeatherMetarsParser.data_METAR.latitude.toString();
        Url += "&lon=" + _WeatherMetarsParser.data_METAR.longitude.toString();
        //Url = "cors/?u=" + encodeURIComponent(Url);

        // Load the xml file using ajax 
        $.ajaxCORS({
            type: "GET",
            url: Url,
            dataType: "xml",
            crossDomain: true,
            cache: false,
            success: function (xml)
            {
                var $xml = $(xml);
                //console.log(xml);

                var _WeatherDwmlParser = new WeatherDwmlParser($xml);
                WeatherParameters.WeatherCurrentRegionalConditions.WeatherDwmlParser[StationId] = _WeatherDwmlParser;
                WeatherParameters.WeatherCurrentRegionalConditions.WeatherCurrentConditions[StationId] = new WeatherCurrentConditions(_WeatherDwmlParser, _WeatherMetarsParser);

                var StationName = WeatherParameters.WeatherCurrentRegionalConditions.WeatherCurrentConditions[StationId].StationName;
                if ((StationName == WeatherParameters.WeatherCurrentConditions.StationName) ||
                    (WeatherParameters.WeatherCurrentRegionalConditions.StationNames.indexOf(StationName) != -1) ||
                    (WeatherParameters.WeatherCurrentRegionalConditions.WeatherCurrentConditions[StationId].Conditions == "") ||
                    (WeatherParameters.WeatherCurrentRegionalConditions.WeatherCurrentConditions[StationId].Conditions == "NA") ||
                    (WeatherParameters.WeatherCurrentRegionalConditions.WeatherCurrentConditions[StationId].Conditions.trim() == "Unknown Precip") ||
                    (WeatherParameters.WeatherCurrentRegionalConditions.WeatherCurrentConditions[StationId].Temperature == "NA"))
                {
                    //WeatherParameters.WeatherCurrentRegionalConditions.StationNames = [];
                    WeatherParameters.WeatherCurrentRegionalConditions.SkipStationIds.push(StationId);
                    WeatherParameters.WeatherCurrentRegionalConditions.StationIds.splice(WeatherParameters.WeatherCurrentRegionalConditions.StationIds.indexOf(StationId), 1);
                    delete WeatherParameters.WeatherCurrentRegionalConditions.WeatherCurrentConditions[StationId];
                    delete WeatherParameters.WeatherCurrentRegionalConditions.WeatherDwmlParser[StationId];
                    //GetRegionalStations(WeatherParameters, Distance);
                    NeedToGetRegionalStations = true;
                }
                else
                {
                    WeatherParameters.WeatherCurrentRegionalConditions.StationNames.push(StationName);
                }

                Count++;
                if (Count == Total)
                {
                    if (NeedToGetRegionalStations == true)
                    {
                        WeatherParameters.WeatherCurrentRegionalConditions.StationNames = [];
                        GetRegionalStations(WeatherParameters, Distance);
                    }
                    else
                    {
                        //console.log(WeatherParameters.WeatherCurrentRegionalConditions);
                        PopulateRegionalObservations(WeatherParameters);
                        //WeatherParameters.Progress.NearbyConditions = LoadStatuses.Loaded;
                    }
                }
            },
            error: function (xhr, error, errorThrown)
            {
                console.error("GetDwmlRegionalStations failed: " + errorThrown);

                //WeatherParameters.WeatherCurrentRegionalConditions.StationNames = [];
                WeatherParameters.WeatherCurrentRegionalConditions.SkipStationIds.push(StationId);
                WeatherParameters.WeatherCurrentRegionalConditions.StationIds.splice(WeatherParameters.WeatherCurrentRegionalConditions.StationIds.indexOf(StationId), 1);
                NeedToGetRegionalStations = true;

                Count++;
                if (Count == Total)
                {
                    if (NeedToGetRegionalStations == true)
                    {
                        WeatherParameters.WeatherCurrentRegionalConditions.StationNames = [];
                        GetRegionalStations(WeatherParameters, Distance);
                    }
                }
            }
        });
    });
};

var PopulateRegionalObservations = function (WeatherParameters)
{
    if (WeatherParameters == null || (_DontLoadGifs == true && WeatherParameters.Progress.NearbyConditions != LoadStatuses.Loaded))
    {
        return;
    }

    var WeatherCurrentRegionalConditions = WeatherParameters.WeatherCurrentRegionalConditions;
    console.log(WeatherCurrentRegionalConditions);

    var Html = "";

    var tbodyRegionalObservations = tblRegionalObservations.find("tbody");
    tbodyRegionalObservations.empty();

    Html = "<tr>";
    Html += "<td></td>";
    Html += "<td>&deg;F</td>";
    Html += "<td>WEATHER</td>";
    Html += "<td>WIND</td>";
    Html += "</tr>";
    tbodyRegionalObservations.append(Html);

    var SortedArray = [];
    $(WeatherCurrentRegionalConditions.StationIds).each(function ()
    {
        var WeatherCurrentCondition = WeatherCurrentRegionalConditions.WeatherCurrentConditions[this.toString()];
        SortedArray.push(WeatherCurrentCondition)
    });
    SortedArray.sort(function (a, b)
    {
        var aName = a.StationName.toLowerCase();
        var bName = b.StationName.toLowerCase();
        return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
    });

    $(SortedArray).each(function ()
    {
        var WeatherCurrentCondition = this;

        Html = "<tr>";
        Html += "<td>" + WeatherCurrentCondition.StationName + "</td>";
        Html += "<td>" + WeatherCurrentCondition.Temperature + "</td>";
        Html += "<td>" + WeatherCurrentCondition.ShortConditions + "</td>";
        Html += "<td>" + (WeatherCurrentCondition.WindSpeed == 0 ? "Calm" : WeatherCurrentCondition.WindDirection + " " + WeatherCurrentCondition.WindSpeed) + "</td>";
        Html += "</tr>";
        tbodyRegionalObservations.append(Html);
    });

    WeatherCurrentRegionalConditions.SortedArray = SortedArray;

    // Draw canvas
    var canvas = canvasLatestObservations[0];
    var context = canvas.getContext("2d");

    var BackGroundImage = new Image();
    BackGroundImage.onload = function ()
    {
        context.drawImage(BackGroundImage, 0, 0);
        DrawHorizontalGradientSingle(context, 0, 30, 500, 90, _TopColor1, _TopColor2);
        DrawTriangle(context, "rgb(28, 10, 87)", 500, 30, 450, 90, 500, 90);
        DrawHorizontalGradientSingle(context, 0, 90, 52, 399, _SideColor1, _SideColor2);
        DrawHorizontalGradientSingle(context, 584, 90, 640, 399, _SideColor1, _SideColor2);

        DrawTitleText(context, "Latest", "Observations");

        if (_Units == Units.English)
        {
            DrawText(context, "Star4000 Small", "24pt", "#FFFFFF", 295, 105, String.fromCharCode(176) + "F", 2);
        }
        else if (_Units == Units.Metric)
        {
            DrawText(context, "Star4000 Small", "24pt", "#FFFFFF", 295, 105, String.fromCharCode(176) + "C", 2);
        }
        DrawText(context, "Star4000 Small", "24pt", "#FFFFFF", 345, 105, "WEATHER", 2);
        DrawText(context, "Star4000 Small", "24pt", "#FFFFFF", 495, 105, "WIND", 2);

        var y = 140;

        $(SortedArray).each(function ()
        {
            var WeatherCurrentCondition = this;

            var Temperature;
            var WindSpeed;

            switch (_Units)
            {
                case Units.English:
                    Temperature = WeatherCurrentCondition.Temperature;
                    WindSpeed = WeatherCurrentCondition.WindSpeed;
                    break;

                case Units.Metric:
                    Temperature = Math.round(WeatherCurrentCondition.TemperatureC);
                    WindSpeed = WeatherCurrentCondition.WindSpeedC;
                    break;
            }

            DrawText(context, "Star4000", "24pt", "#FFFFFF", 65, y, WeatherCurrentCondition.StationName.substr(0, 14), 2);
            //DrawText(context, "Star4000", "24pt", "#FFFFFF", 295, y, Temperature, 2);
            DrawText(context, "Star4000", "24pt", "#FFFFFF", 345, y, WeatherCurrentCondition.ShortConditions.substr(0, 9), 2);

            //DrawText(context, "Star4000", "24pt", "#FFFFFF", 495, y, (WeatherCurrentCondition.WindSpeed == 0 ? "Calm" : WeatherCurrentCondition.WindDirection + (Array(6 - WeatherCurrentCondition.WindDirection.length - WeatherCurrentCondition.WindSpeed.toString().length).join(" ")) + WeatherCurrentCondition.WindSpeed), 2);
            //if (WeatherCurrentCondition.WindSpeed > 0)
            if (WindSpeed > 0)
            {
                DrawText(context, "Star4000", "24pt", "#FFFFFF", 495, y, WeatherCurrentCondition.WindDirection + (Array(6 - WeatherCurrentCondition.WindDirection.length - WindSpeed.toString().length).join(" ")) + WindSpeed.toString(), 2);
            }
            else if (WindSpeed == "NA")
            {
                DrawText(context, "Star4000", "24pt", "#FFFFFF", 495, y, "NA", 2);
            }
            else
            {
                DrawText(context, "Star4000", "24pt", "#FFFFFF", 495, y, "Calm", 2);
            }

            var x = (325 - (Temperature.toString().length * 15));
            DrawText(context, "Star4000", "24pt", "#FFFFFF", x, y, Temperature, 2);

            y += 40;
        });

        WeatherParameters.Progress.NearbyConditions = LoadStatuses.Loaded;

        UpdateWeatherCanvas(WeatherParameters, canvasLatestObservations);
    };
    BackGroundImage.src = "images/BackGround1_1.png";
    //BackGroundImage.src = "images/BackGround1_" + _Themes.toString() + ".png";

};

var ShowRegionalMap = function (WeatherParameters, TomorrowForecast1, TomorrowForecast2)
{
    if (TomorrowForecast1 == true)
    {
        if (WeatherParameters == null || (_DontLoadGifs == true && WeatherParameters.Progress.TomorrowsRegionalMap != LoadStatuses.Loaded))
        {
            return;
        }
    }
    else if (TomorrowForecast2 == true)
    {
        if (WeatherParameters == null || (_DontLoadGifs == true && WeatherParameters.Progress.TomorrowsRegionalMap != LoadStatuses.Loaded))
        {
            return;
        }
    }
    else
    {
        if (WeatherParameters == null || (_DontLoadGifs == true && WeatherParameters.Progress.CurrentRegionalMap != LoadStatuses.Loaded))
        {
            return;
        }
    }

    //// ALASKA ISN'T SUPPORTED!
    //if (WeatherParameters.State == "AK")
    //{
    //    if (TomorrowForecast == true)
    //    {
    //        WeatherParameters.Progress.TomorrowsRegionalMap = LoadStatuses.NoData;
    //    }
    //    else
    //    {
    //        WeatherParameters.Progress.CurrentRegionalMap = LoadStatuses.NoData;
    //    }
    //    return;
    //}

    var img = new Image();
    var cnvRegionalMap;
    var cnvRegionalMapId;
    var divRegionalMap;
    var context;
    var SourceX;
    var SourceY;
    var OffsetY;
    var OffsetX;
    var canvasRegionalMap;
    var FirstTime = true;
    var Gifs = [];

    if (TomorrowForecast1 == true)
    {
        divRegionalMap = divRegionalForecastMap1;
        cnvRegionalMapId = "cnvRegionalForecastMap1";
        canvasRegionalMap = canvasRegionalForecast1;
    }
    else if (TomorrowForecast2 == true)
    {
        divRegionalMap = divRegionalForecastMap2;
        cnvRegionalMapId = "cnvRegionalForecastMap2";
        canvasRegionalMap = canvasRegionalForecast2;
    }
    else
    {
        divRegionalMap = divRegionalCurrentMap;
        cnvRegionalMapId = "cnvRegionalCurrentMap";
        canvasRegionalMap = canvasRegionalObservations;
    }

    if (_DontLoadGifs == false)
    {
        // Clear the current image.
        divRegionalMap.empty();
    }

    var RegionalMapLoaded = false;

    var RegionalCities = [];
    var SkipCities = [];

    var Total = 0;
    var Count = 0;
    var BeforeTotal = 0;
    var OkToFail = false;
    var DontLoadGifs = _DontLoadGifs;

    var Today = new Date();
    var addDays = 0;
    var IsNightTime;
    var GetTodaysForecast;
    var GetTonightsForecast;
    var GetTomorrowsForecast;
    var RegionalForecastCities;

    if (TomorrowForecast2 == true)
    {
        if (!WeatherParameters.RegionalForecastCities2)
        {
            WeatherParameters.RegionalForecastCities2 = [];
        }
        RegionalForecastCities = WeatherParameters.RegionalForecastCities2;

        if (Today.getHours() >= 12)
        {
            // Tomorrow's daytime forecast
            addDays = 1;
            Today.setHours(0, 0, 0, 0);
            IsNightTime = false;
            GetTomorrowsForecast = true;
        }
        else 
        {
            // Todays's nighttime forecast
            if (Today.getHours() == 0)
            {
                // Prevent Midnight from causing the wrong icons to appear.
                Today.setHours(1, 0, 0, 0);
            }
            IsNightTime = true;
            GetTonightsForecast = true;
        }
    }
    else
    {
        if (!WeatherParameters.RegionalForecastCities1)
        {
            WeatherParameters.RegionalForecastCities1 = [];
        }
        RegionalForecastCities = WeatherParameters.RegionalForecastCities1;

        if (Today.getHours() >= 12)
        {
            // Todays's nighttime forecast
            // Prevent Midnight from causing the wrong icons to appear.
            Today.setHours(1, 0, 0, 0);
            IsNightTime = true;
            GetTonightsForecast = true;
        }
        else 
        {
            // Today's daytime forecast
            if (Today.getHours() == 0)
            {
                // Prevent Midnight from causing the wrong icons to appear.
                Today.setHours(1, 0, 0, 0);
            }
            IsNightTime = false;
            GetTodaysForecast = true;
        }
    }

    var Tomorrow = Today.addDays(addDays);
    var _Date = Tomorrow.getYYYYMMDD();
    var DayName = Tomorrow.getDayName();

    var PopulateRegionalMap = function ()
    {
        if (TomorrowForecast1 == true || TomorrowForecast2 == true)
        {
            //var Today = new Date();
            //var addDays = 0;
            //var IsNightTime;

            //if (TomorrowForecast2 == true)
            //{
            //    if (Today.getHours() >= 12)
            //    {
            //        // Tomorrow's daytime forecast
            //        addDays = 1;
            //        Today.setHours(0, 0, 0, 0);
            //        IsNightTime = false;
            //    }
            //    else if (Today.getHours() == 0)
            //    {
            //        // Todays's nighttime forecast
            //        // Prevent Midnight from causing the wrong icons to appear.
            //        Today.setHours(1, 0, 0, 0);
            //        IsNightTime = true;
            //    }
            //}
            //else
            //{
            //    if (Today.getHours() >= 12)
            //    {
            //        // Todays's nighttime forecast
            //        // Prevent Midnight from causing the wrong icons to appear.
            //        Today.setHours(1, 0, 0, 0);
            //        IsNightTime = true;
            //    }
            //    else if (Today.getHours() == 0)
            //    {
            //        // Today's daytime forecast
            //        // Prevent Midnight from causing the wrong icons to appear.
            //        Today.setHours(1, 0, 0, 0);
            //        IsNightTime = false;
            //    }
            //}

            //var Tomorrow = Today.addDays(addDays);
            //var _Date = Tomorrow.getYYYYMMDD();
            //var DayName = Tomorrow.getDayName();

            // Draw canvas
            var BackGroundImage = new Image();
            BackGroundImage.onload = function ()
            {
                var canvas = canvasRegionalMap[0];
                var context = canvas.getContext("2d");
                context.drawImage(BackGroundImage, 0, 0);
                DrawHorizontalGradientSingle(context, 0, 30, 500, 90, _TopColor1, _TopColor2);
                DrawTriangle(context, "rgb(28, 10, 87)", 500, 30, 450, 90, 500, 90);

                if (IsNightTime == true)
                {
                    DrawTitleText(context, "Forecast for", DayName + " Night");
                }
                else
                {
                    DrawTitleText(context, "Forecast for", DayName);
                }

                if (TomorrowForecast1 == true || TomorrowForecast2 == true)
                {
                    $(RegionalForecastCities).each(function ()
                    {
                        var RegionalForecastCity = this;

                        var RegionalCity = RegionalForecastCity.RegionalCity;
                        var CityXY = RegionalForecastCity.CityXY;
                        var weatherTravelForecast = RegionalForecastCity.weatherTravelForecast;

                        var x = CityXY.X;
                        var y = CityXY.Y;

                        if (DontLoadGifs == false)
                        {
                            // Conditions Icon
                            var Gif = new SuperGif({
                                src: weatherTravelForecast.Icon,
                                max_width: 42,
                                loop_delay: 100,
                                auto_play: true,
                                canvas: cnvRegionalMap[0],
                                x: x,
                                y: y - 15,
                            });
                            Gif.load();
                            Gifs.push(Gif);
                        }

                        // City Name
                        DrawText(cnvRegionalMap[0].getContext("2d"), "Star4000", "20px", "#ffffff", x - 40, y - 15, RegionalCity.Name, 2);

                        // Temperature
                        if (IsNightTime == true)
                        {
                            var MinimumTemperature;
                            if (_Units == Units.English)
                            {
                                MinimumTemperature = weatherTravelForecast.MinimumTemperature.toString();
                            }
                            else
                            {
                                MinimumTemperature = Math.round(weatherTravelForecast.MinimumTemperatureC).toString();
                            }
                            DrawText(cnvRegionalMap[0].getContext("2d"), "Star4000 Large Compressed", "28px", "#ffff00", x - (MinimumTemperature.length * 15), y + 20, MinimumTemperature, 2);
                        }
                        else
                        {
                            var MaximumTemperature;
                            if (_Units == Units.English)
                            {
                                MaximumTemperature = weatherTravelForecast.MaximumTemperature.toString();
                            }
                            else
                            {
                                MaximumTemperature = Math.round(weatherTravelForecast.MaximumTemperatureC).toString();
                            }
                            //DrawText(cnvRegionalMap[0].getContext("2d"), "Star4000LCN", "28px", "#ffff00", x - 30, y + 20, MaximumTemperature, 2);
                            DrawText(cnvRegionalMap[0].getContext("2d"), "Star4000 Large Compressed", "28px", "#ffff00", x - (MaximumTemperature.length * 15), y + 20, MaximumTemperature, 2);
                        }

                    });
                }

                if (DontLoadGifs == false)
                {
                    window.setInterval(function ()
                    {
                        if (FirstTime == false && _RefreshGifs == false)
                        {
                            var Elm = document.elementFromPoint(0, 100);
                            if (Elm != canvas)
                            {
                                return;
                            }
                        }
                        else
                        {
                            FirstTime = false;

                            $(Gifs).each(function ()
                            {
                                this.setFirstTime();
                            });
                        }

                        context.drawImage(cnvRegionalMap[0], 0, 0, 640, 309, 0, 90, 640, 309);
                        UpdateWeatherCanvas(WeatherParameters, canvasRegionalMap);
                    }, 100);
                }

                WeatherParameters.Progress.TomorrowsRegionalMap = LoadStatuses.Loaded;

                UpdateWeatherCanvas(WeatherParameters, canvasRegionalMap);
            };
            BackGroundImage.src = "images/BackGround5_1.png";
            //BackGroundImage.src = "images/BackGround5_" + _Themes.toString() + ".png";
        }
        else
        {
            // Draw canvas
            var BackGroundImage = new Image();
            BackGroundImage.onload = function ()
            {
                var canvas = canvasRegionalObservations[0];
                var context = canvas.getContext("2d");
                context.drawImage(BackGroundImage, 0, 0);
                DrawHorizontalGradientSingle(context, 0, 30, 500, 90, _TopColor1, _TopColor2);
                DrawTriangle(context, "rgb(28, 10, 87)", 500, 30, 450, 90, 500, 90);

                DrawTitleText(context, "Regional", "Observations");

                $(WeatherParameters.RegionalObservationsCities).each(function ()
                {
                    var RegionalObservationsCity = this;

                    var RegionalCity = RegionalObservationsCity.RegionalCity;
                    var CityXY = RegionalObservationsCity.CityXY;
                    var weatherCurrentConditions = RegionalObservationsCity.weatherCurrentConditions;

                    var x = CityXY.X;
                    var y = CityXY.Y;

                    if (DontLoadGifs == false)
                    {
                        // Conditions Icon
                        var Gif = new SuperGif({
                            src: GetWeatherRegionalIconFromIconLink(weatherCurrentConditions.Icon, undefined, undefined, IsNightTime),
                            max_width: 42,
                            loop_delay: 100,
                            auto_play: true,
                            canvas: cnvRegionalMap[0],
                            x: x,
                            y: y - 15,
                        });
                        Gif.load();
                        Gifs.push(Gif);
                    }

                    // City Name
                    DrawText(cnvRegionalMap[0].getContext("2d"), "Star4000", "20px", "#ffffff", x - 40, y - 15, RegionalCity.Name, 2);

                    // Temperature
                    var Temperature;
                    if (_Units == Units.English)
                    {
                        Temperature = weatherCurrentConditions.Temperature.toString();
                    }
                    else
                    {
                        Temperature = Math.round(weatherCurrentConditions.TemperatureC).toString();
                    }
                    //DrawText(cnvRegionalMap[0].getContext("2d"), "Star4000LCN", "28px", "#ffff00", x - 30, y + 20, Temperature, 2);
                    DrawText(cnvRegionalMap[0].getContext("2d"), "Star4000 Large Compressed", "28px", "#ffff00", x - (Temperature.length * 15), y + 20, Temperature, 2);
                });

                if (DontLoadGifs == false)
                {
                    window.setInterval(function ()
                    {
                        if (FirstTime == false && _RefreshGifs == false)
                        {
                            var Elm = document.elementFromPoint(0, 100);
                            if (Elm != canvas)
                            {
                                return;
                            }
                        }
                        else
                        {
                            FirstTime = false;

                            $(Gifs).each(function ()
                            {
                                this.setFirstTime();
                            });
                        }

                        context.drawImage(cnvRegionalMap[0], 0, 0, 640, 309, 0, 90, 640, 309);
                        UpdateWeatherCanvas(WeatherParameters, canvasRegionalObservations);
                    }, 100);
                }

                WeatherParameters.Progress.CurrentRegionalMap = LoadStatuses.Loaded;

                UpdateWeatherCanvas(WeatherParameters, canvasRegionalObservations);
            };
            BackGroundImage.src = "images/BackGround5_1.png";
            //BackGroundImage.src = "images/BackGround5_" + _Themes.toString() + ".png";
        }
    };

    var RegionalMapOnLoad = function ()
    {
        BeforeTotal = Total;

        if (RegionalMapLoaded == false)
        {
            RegionalMapLoaded = true;
            console.log("Image Loaded");

            if (DontLoadGifs == false)
            {
                //divMap.html("<canvas id='cnvMap' /><img id='imgMap' />");
                divRegionalMap.html("<canvas id='" + cnvRegionalMapId + "' />");
                cnvRegionalMap = $("#" + cnvRegionalMapId);
                cnvRegionalMap.attr("width", "640"); // For Chrome.
                cnvRegionalMap.attr("height", "312"); // For Chrome.
                cnvRegionalMap[0].RelatedCanvas = canvasRegionalMap[0];
            }
            cnvRegionalMap = $("#" + cnvRegionalMapId);
            context = cnvRegionalMap[0].getContext("2d");

            OffsetX = 240;
            OffsetY = 117;
            if (WeatherParameters.State == "HI")
            {
                var SourceXY = GetXYFromLatitudeLongitudeHI(WeatherParameters.Latitude, WeatherParameters.Longitude, OffsetX, OffsetY);
            }
            else if (WeatherParameters.State == "AK")
            {
                var SourceXY = GetXYFromLatitudeLongitudeAK(WeatherParameters.Latitude, WeatherParameters.Longitude, OffsetX, OffsetY);
            }
            else
            {
                var SourceXY = GetXYFromLatitudeLongitude(WeatherParameters.Latitude, WeatherParameters.Longitude, OffsetX, OffsetY);
            }
            SourceX = SourceXY.X;
            SourceY = SourceXY.Y;
            context.drawImage(img, SourceX, SourceY, (OffsetX * 2), (OffsetY * 2), 0, 0, 640, 312);

            //http://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&hoursBeforeNow=4&minLon=-73&minLat=40&maxLon=-72&maxLat=41
            if (WeatherParameters.State == "HI")
            {
                var MinMaxLatLon = GetMinMaxLatitudeLongitudeHI(SourceX, SourceY, OffsetX, OffsetY);
            }
            else if (WeatherParameters.State == "AK")
            {
                var MinMaxLatLon = GetMinMaxLatitudeLongitudeAK(SourceX, SourceY, OffsetX, OffsetY);
            }
            else
            {
                var MinMaxLatLon = GetMinMaxLatitudeLongitude(SourceX, SourceY, OffsetX, OffsetY);
            }
            //var MinMaxLatLon = GetMinMaxLatitudeLongitude(SourceX, SourceY, OffsetX, OffsetY);
            var maxLat = MinMaxLatLon.MaxLatitude;
            var minLat = MinMaxLatLon.MinLatitude;
            var maxLon = MinMaxLatLon.MaxLongitude - 1; // Prevent cities from being cut off on the right side.
            var minLon = MinMaxLatLon.MinLongitude;

            var Url = "https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&hoursBeforeNow=1&minLon=" + minLon + "&minLat=" + minLat + "&maxLon=" + maxLon + "&maxLat=" + maxLat;

            if (DontLoadGifs == true)
            {
                PopulateRegionalMap();
                return;
            }
        }

        // Determine which cities are within the max/min latitude/longitude.
        $(_RegionalCities).each(function ()
        {
            var RegionalCity = this;
            var OkToAddCity = true;
            var NeedToSkipCity = false;

            $(SkipCities).each(function ()
            {
                var SkipCity = this;
                if (RegionalCity.Latitude == SkipCity.Latitude && RegionalCity.Longitude == SkipCity.Longitude)
                {
                    NeedToSkipCity = true;
                    return false;
                }
            });
            if (NeedToSkipCity == true)
            {
                return true;
            }

            if (RegionalCity.Latitude > minLat && RegionalCity.Latitude < maxLat)
            {
                if (RegionalCity.Longitude > minLon && RegionalCity.Longitude < maxLon)
                {
                    // Only add the city as long as it isn't within 1 degree of any other city already in the array.
                    $(RegionalCities).each(function ()
                    {
                        var Distance = GetDistance(RegionalCity.Longitude, RegionalCity.Latitude, this.Longitude, this.Latitude);
                        if (Distance < 1)
                        {
                            OkToAddCity = false;
                            return false;
                        }
                    });

                    if (OkToAddCity == false)
                    {
                        return true;
                    }

                    Total++;
                    RegionalCities.push(RegionalCity);
                }
            }
        });

        $(Object.keys(_StationInfo)).each(function ()
        {
            var key = this;
            var RegionalCity = _StationInfo[key];
            RegionalCity.Name = RegionalCity.City;
            var OkToAddCity = true;
            var NeedToSkipCity = false;

            $(SkipCities).each(function ()
            {
                var SkipCity = this;
                if (RegionalCity.Latitude == SkipCity.Latitude && RegionalCity.Longitude == SkipCity.Longitude)
                {
                    NeedToSkipCity = true;
                    return false;
                }
            });
            if (NeedToSkipCity == true)
            {
                return true;
            }

            if (RegionalCity.Latitude > minLat && RegionalCity.Latitude < maxLat)
            {
                if (RegionalCity.Longitude > minLon && RegionalCity.Longitude < maxLon)
                {
                    // Only add the city as long as it isn't within 1 degree of any other city already in the array.
                    $(RegionalCities).each(function ()
                    {
                        var Distance = GetDistance(RegionalCity.Longitude, RegionalCity.Latitude, this.Longitude, this.Latitude);

                        if (WeatherParameters.State == "HI")
                        {
                            if (Distance < 1)
                            {
                                OkToAddCity = false;
                                return false;
                            }
                        }
                        else if (WeatherParameters.State == "AK")
                        {
                            if (Distance < 2.5)
                            {
                                OkToAddCity = false;
                                return false;
                            }
                        }
                        else
                        {
                            if (Distance < 2.5)
                            {
                                OkToAddCity = false;
                                return false;
                            }
                        }

                    });

                    if (OkToAddCity == false)
                    {
                        return true;
                    }

                    Total++;
                    RegionalCities.push(RegionalCity);
                }
            }
        });

        //if (BeforeTotal == Total)
        //{
        //    if (TomorrowForecast == true)
        //    {
        //        WeatherParameters.Progress.TomorrowsRegionalMap = LoadStatuses.Failed;
        //    }
        //    else
        //    {
        //        WeatherParameters.Progress.CurrentRegionalMap = LoadStatuses.Failed;
        //    }

        //    return;
        //}

        var RegionalCityProcessing = false;

        $(RegionalCities).each(function ()
        {
            // Get the current conditionals and today's/tonight's forecast for each city.
            var RegionalCity = this;

            var NeedToSkipCity = false;
            $(SkipCities).each(function ()
            {
                var SkipCity = this;
                if (RegionalCity.Latitude == SkipCity.Latitude && RegionalCity.Longitude == SkipCity.Longitude)
                {
                    NeedToSkipCity = true;
                    return false;
                }
            });
            if (NeedToSkipCity == true)
            {
                return true;
            }

            RegionalCityProcessing = true;

            SkipCities.push(RegionalCity);

            var Url = "https://forecast.weather.gov/MapClick.php?FcstType=dwml";
            Url += "&lat=" + RegionalCity.Latitude.toString();
            Url += "&lon=" + RegionalCity.Longitude.toString();
            //Url = "cors/?u=" + encodeURIComponent(Url);

            // Load the xml file using ajax 
            $.ajaxCORS({
                type: "GET",
                url: Url,
                dataType: "xml",
                crossDomain: true,
                cache: false,
                success: function (xml)
                {
                    var $xml = $(xml);
                    //console.log(xml);

                    var weatherDwmlParser = new WeatherDwmlParser($xml);
                    //console.log(WeatherParameters.WeatherDwmlParser);

                    if (TomorrowForecast1 == true || TomorrowForecast2 == true)
                    {
                        var weatherTravelForecast = new WeatherTravelForecast(weatherDwmlParser, GetTodaysForecast, GetTonightsForecast, GetTomorrowsForecast);
                        //console.log(WeatherTravelForecast);

                        if (weatherTravelForecast.Conditions == "")
                        {
                            console.error("No forecast data for '" + RegionalCity.Name + "'");
                            for (var RegionalCityIndex = 0; RegionalCityIndex < RegionalCities.length; RegionalCityIndex++)
                            {
                                if (RegionalCity.Latitude == RegionalCities[RegionalCityIndex].Latitude &&
                                    RegionalCity.Longitude == RegionalCities[RegionalCityIndex].Longitude)
                                {
                                    RegionalCities.splice(RegionalCityIndex, 1);
                                    Total--;
                                }
                            }

                            RegionalMapOnLoad();
                            return;
                        }

                        if (WeatherParameters.State == "HI")
                        {
                            var CityXY = GetXYForCityHI(RegionalCity, maxLat, minLon);
                        }
                        else if (WeatherParameters.State == "AK")
                        {
                            var CityXY = GetXYForCityAK(RegionalCity, maxLat, minLon);
                        }
                        else
                        {
                            var CityXY = GetXYForCity(RegionalCity, maxLat, minLon);
                        }

                        //if (!WeatherParameters.RegionalForecastCities)
                        //{
                        //    WeatherParameters.RegionalForecastCities = [];
                        //}
                        //WeatherParameters.RegionalForecastCities.push({ RegionalCity: RegionalCity, CityXY: CityXY, weatherTravelForecast: weatherTravelForecast });
                        RegionalForecastCities.push({ RegionalCity: RegionalCity, CityXY: CityXY, weatherTravelForecast: weatherTravelForecast });

                        //var x = CityXY.X;
                        //var y = CityXY.Y;

                        //// Conditions Icon
                        //var Gif = new SuperGif({
                        //    src: weatherTravelForecast.Icon,
                        //    max_width: 42,
                        //    loop_delay: 100,
                        //    auto_play: true,
                        //    canvas: cnvRegionalMap[0],
                        //    x: x,
                        //    y: y - 15,
                        //});
                        //Gif.load();

                        //// City Name
                        //DrawText(context, "Star4000", "20px", "#ffffff", x - 40, y - 15, RegionalCity.Name, 2);

                        //// Temperature
                        //DrawText(context, "Star4000LCN", "28px", "#ffff00", x - 30, y + 20, weatherTravelForecast.MaximumTemperature, 2);

                        Count++;
                        if (Count == Total)
                        {
                            PopulateRegionalMap();
                        }

                        return;
                    }

                    var Url = "https://www.aviationweather.gov/adds/dataserver_current/httpparam?datasource=metars&requesttype=retrieve&format=xml&hoursBeforeNow=3";
                    Url += "&stationString=" + GetStationIdFromUrl(weatherDwmlParser.data_current_observations.moreWeatherInformation.value);
                    //Url = "cors/?u=" + encodeURIComponent(Url);

                    // Load the xml file using ajax 
                    $.ajaxCORS({
                        type: "GET",
                        url: Url,
                        dataType: "xml",
                        crossDomain: true,
                        cache: false,
                        success: function (xml)
                        {
                            var $xml = $(xml);
                            console.log(xml);
                            //console.log($xml);

                            var weatherMetarsParser = new WeatherMetarsParser($xml);
                            //console.log(WeatherParameters.WeatherMetarsParser);

                            var weatherCurrentConditions = new WeatherCurrentConditions(weatherDwmlParser, weatherMetarsParser);
                            //console.log(WeatherParameters.WeatherCurrentConditions);
                            
                            if (weatherCurrentConditions.Conditions == "")
                            {
                                console.error("No current conditions data for '" + RegionalCity.Name + "'");
                                for (var RegionalCityIndex = 0; RegionalCityIndex < RegionalCities.length; RegionalCityIndex++)
                                {
                                    if (RegionalCity.Latitude == RegionalCities[RegionalCityIndex].Latitude &&
                                        RegionalCity.Longitude == RegionalCities[RegionalCityIndex].Longitude)
                                    {
                                        RegionalCities.splice(RegionalCityIndex, 1);
                                        Total--;
                                    }
                                }

                                RegionalMapOnLoad();
                                return;
                            }

                            if (WeatherParameters.State == "HI")
                            {
                                var CityXY = GetXYForCityHI(RegionalCity, maxLat, minLon);
                            }
                            else if (WeatherParameters.State == "AK")
                            {
                                var CityXY = GetXYForCityAK(RegionalCity, maxLat, minLon);
                            }
                            else
                            {
                                var CityXY = GetXYForCity(RegionalCity, maxLat, minLon);
                            }
                            if (!WeatherParameters.RegionalObservationsCities)
                            {
                                WeatherParameters.RegionalObservationsCities = [];
                            }
                            WeatherParameters.RegionalObservationsCities.push({ RegionalCity: RegionalCity, CityXY: CityXY, weatherCurrentConditions: weatherCurrentConditions });

                            //var x = CityXY.X;
                            //var y = CityXY.Y;

                            //// Conditions Icon
                            //var Gif = new SuperGif({
                            //    src: GetWeatherRegionalIconFromIconLink(weatherCurrentConditions.Icon),
                            //    max_width: 42,
                            //    loop_delay: 100,
                            //    auto_play: true,
                            //    canvas: cnvRegionalMap[0],
                            //    x: x,
                            //    y: y - 15,
                            //});
                            //Gif.load();

                            //// City Name
                            //DrawText(context, "Star4000", "20px", "#ffffff", x - 40, y - 15, RegionalCity.Name, 2);

                            //// Temperature
                            //DrawText(context, "Star4000LCN", "28px", "#ffff00", x - 30, y + 20, weatherCurrentConditions.Temperature, 2);

                            Count++;
                            if (Count == Total)
                            {
                                PopulateRegionalMap();
                            }

                        },
                        error: function (xhr, error, errorThrown)
                        {
                            console.error("GetRegionalMapCity METARS failed: " + errorThrown);

                            for (var RegionalCityIndex = 0; RegionalCityIndex < RegionalCities.length; RegionalCityIndex++)
                            {
                                if (RegionalCity.Latitude == RegionalCities[RegionalCityIndex].Latitude &&
                                    RegionalCity.Longitude == RegionalCities[RegionalCityIndex].Longitude)
                                {
                                    RegionalCities.splice(RegionalCityIndex, 1);
                                    Total--;
                                }
                            }

                            RegionalMapOnLoad();
                            return;
                        }
                    });

                },
                error: function (xhr, error, errorThrown)
                {
                    console.error("GetRegionalMapCity DWML failed: " + errorThrown + " (" + Url + ")");

                    for (var RegionalCityIndex = 0; RegionalCityIndex < RegionalCities.length; RegionalCityIndex++)
                    {
                        if (RegionalCity.Latitude == RegionalCities[RegionalCityIndex].Latitude &&
                            RegionalCity.Longitude == RegionalCities[RegionalCityIndex].Longitude)
                        {
                            RegionalCities.splice(RegionalCityIndex, 1);
                            Total--;
                        }
                    }

                    RegionalMapOnLoad();
                    return;
                }
            });

        });

        if (Total == Count)
        {
            //if (TomorrowForecast == true)
            //{
            //    WeatherParameters.Progress.TomorrowsRegionalMap = LoadStatuses.Loaded;
            //}
            //else
            //{
            //    WeatherParameters.Progress.CurrentRegionalMap = LoadStatuses.Loaded;
            //}

            PopulateRegionalMap();
            return;
        }
    };
    img.onload = RegionalMapOnLoad;
    if (WeatherParameters.State == "HI")
    {
        img.src = "images/HawaiiRadarMap4.png";
    }
    else if (WeatherParameters.State == "AK")
    {
        img.src = "images/AlaskaRadarMap6.png";
    }
    else
    {
        img.src = "images/basemap2.png";
    }
}

var DrawText = function (context, font, size, color, x, y, text, shadow, align)
{
    if (!shadow)
    {
        shadow = 0;
    }
    if (!align)
    {
        align = "start";
    }

    context.textAlign = align;
    context.font = size + " '" + font + "'";
    context.shadowColor = "#000000";
    context.shadowOffsetX = shadow;
    context.shadowOffsetY = shadow;
    context.strokeStyle = "#000000";
    context.lineWidth = 2;
    context.strokeText(text, x, y);
    context.fillStyle = color;
    context.fillText(text, x, y);
    context.fillStyle = "";
    context.strokeStyle = "";
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
};

var GetDistance = function(x1 ,y1, x2, y2)
{
    return Math.sqrt((x2-=x1)*x2 + (y2-=y1)*y2);
};

var GetXYFromLatitudeLongitude = function (Latitude, Longitude, OffsetX, OffsetY)
{
    var SourceY = 0;
    var SourceX = 0;
    var ImgHeight = 1600;
    var ImgWidth = 2550;

    SourceY = (50.5 - Latitude) * 55.2;
    SourceY -= OffsetY; // Centers map.
    // Do not allow the map to exceed the max/min coordinates.
    if (SourceY > (ImgHeight - (OffsetY * 2))) // The OffsetY * 2
    {
        SourceY = ImgHeight - (OffsetY * 2);
    }
    else if (SourceY < 0)
    {
        SourceY = 0;
    }

    SourceX = ((-127.5 - Longitude) * 41.775) * -1;
    SourceX -= OffsetX; // Centers map.
    // Do not allow the map to exceed the max/min coordinates.
    if (SourceX > (ImgWidth - (OffsetX * 2))) // The OffsetX * 2
    {
        SourceX = ImgWidth - (OffsetX * 2);
    }
    else if (SourceX < 0)
    {
        SourceX = 0;
    }

    return { X: SourceX, Y: SourceY };
}

var GetXYFromLatitudeLongitudeDoppler = function (Latitude, Longitude, OffsetX, OffsetY)
{
    var SourceY = 0;
    var SourceX = 0;
    //var ImgHeight = 1600;
    //var ImgWidth = 2550;
    var ImgHeight = 3200;
    var ImgWidth = 5100;

    //SourceY = (50.5 - Latitude) * 55.2;
    SourceY = (51.75 - Latitude) * 55.2;
    SourceY -= OffsetY; // Centers map.
    // Do not allow the map to exceed the max/min coordinates.
    if (SourceY > (ImgHeight - (OffsetY * 2))) // The OffsetY * 2
    {
        SourceY = ImgHeight - (OffsetY * 2);
    }
    else if (SourceY < 0)
    {
        SourceY = 0;
    }

    //SourceX = ((-127.5 - Longitude) * 41.775) * -1;
    SourceX = ((-130.37 - Longitude) * 41.775) * -1;
    SourceX -= OffsetX; // Centers map.
    // Do not allow the map to exceed the max/min coordinates.
    if (SourceX > (ImgWidth - (OffsetX * 2))) // The OffsetX * 2
    {
        SourceX = ImgWidth - (OffsetX * 2);
    }
    else if (SourceX < 0)
    {
        SourceX = 0;
    }

    return { X: SourceX * 2, Y: SourceY * 2 };
}

var GetXYFromLatitudeLongitudeDoppler2 = function (Latitude, Longitude, OffsetX, OffsetY)
{
    var SourceY = 0;
    var SourceX = 0;
    var ImgHeight = 6000;
    var ImgWidth = 2800;

    //SourceY = (51.75 - Latitude) * 56.5; (Org)
    //SourceY = (53.05 - Latitude) * 55.2; //(Montgomery: 32.3802) 1140.97296
    //SourceY = (51.95 - Latitude) * 55.2; //(Binghamton: 42.0987) 543.79176
    SourceY = (51 - Latitude) * 61.4481; //
    //SourceY = (50.7483 - Latitude) * 61.4481; //(New Orleans: 29.83) = 1285.38979023
    SourceY -= OffsetY; // Centers map.

    // Do not allow the map to exceed the max/min coordinates.
    if (SourceY > (ImgHeight - (OffsetY * 2))) // The OffsetY * 2
    {
        SourceY = ImgHeight - (OffsetY * 2);
    }
    else if (SourceY < 0)
    {
        SourceY = 0;
    }

    //SourceX = ((-130.37 - Longitude) * 41.775) * -1; (Org)
    //SourceX = ((-129.55 - Longitude) * 41.775) * -1; //(Montgomery: -86.3001) = -1,806.7645725
    //SourceX = ((-129.65 - Longitude) * 41.775) * -1; //(Binghamton: -75.9112) = -2,244.93837
    SourceX = ((-129.138 - Longitude) * 42.1768) * -1; //
    //SourceX = ((-129.038 - Longitude) * 42.1768) * -1; //(New Orleans: -90.02) =  -1645.6543824
    SourceX -= OffsetX; // Centers map.

    // Do not allow the map to exceed the max/min coordinates.
    if (SourceX > (ImgWidth - (OffsetX * 2))) // The OffsetX * 2
    {
        SourceX = ImgWidth - (OffsetX * 2);
    }
    else if (SourceX < 0)
    {
        SourceX = 0;
    }

    return { X: SourceX * 2, Y: SourceY * 2 };
}

var GetMinMaxLatitudeLongitude = function (X, Y, OffsetX, OffsetY)
{
    var maxLat = ((Y / 55.2) - 50.5) * -1;
    var minLat = (((Y + (OffsetY * 2)) / 55.2) - 50.5) * -1;
    var minLon = (((X * -1) / 41.775) + 127.5) * -1;
    var maxLon = ((((X + (OffsetX * 2)) * -1) / 41.775) + 127.5) * -1;

    return { MinLatitude: minLat, MaxLatitude: maxLat, MinLongitude: minLon, MaxLongitude: maxLon };
};

var GetXYForCity = function (City, MaxLatitude, MinLongitude)
{
    var x = (City.Longitude - MinLongitude) * 57;
    var y = (MaxLatitude - City.Latitude) * 70;

    if (y < 30)
    {
        y = 30;
    }
    else if (y > 282)
    {
        y = 282;
    }

    if (x < 40)
    {
        x = 40;
    }
    else if (x > 580)
    {
        x = 580;
    }

    return { X: x, Y: y };
};

var GetXYFromLatitudeLongitudeAK = function (Latitude, Longitude, OffsetX, OffsetY)
{
    var SourceY = 0;
    var SourceX = 0;
    var ImgHeight = 1142;
    var ImgWidth = 1200;

    SourceY = (73.0 - Latitude) * 56;
    SourceY -= OffsetY; // Centers map.
    // Do not allow the map to exceed the max/min coordinates.
    if (SourceY > (ImgHeight - (OffsetY * 2))) // The OffsetY * 2
    {
        SourceY = ImgHeight - (OffsetY * 2);
    }
    else if (SourceY < 0)
    {
        SourceY = 0;
    }

    SourceX = ((-175.0 - Longitude) * 25.0) * -1;
    SourceX -= OffsetX // Centers map.
    // Do not allow the map to exceed the max/min coordinates.
    if (SourceX > (ImgWidth - (OffsetX * 2))) // The OffsetX * 2
    {
        SourceX = ImgWidth - (OffsetX * 2);
    }
    else if (SourceX < 0)
    {
        SourceX = 0;
    }

    return { X: SourceX, Y: SourceY };
}

var GetMinMaxLatitudeLongitudeAK = function (X, Y, OffsetX, OffsetY)
{
    var maxLat = ((Y / 56) - 73.0) * -1;
    var minLat = (((Y + (OffsetY * 2)) / 56) - 73.0) * -1;
    var minLon = (((X * -1) / 25) + 175.0) * -1;
    var maxLon = ((((X + (OffsetX * 2)) * -1) / 25) + 175.0) * -1;

    return { MinLatitude: minLat, MaxLatitude: maxLat, MinLongitude: minLon, MaxLongitude: maxLon };
};

var GetXYForCityAK = function (City, MaxLatitude, MinLongitude)
{
    var x = (City.Longitude - MinLongitude) * 37;
    var y = (MaxLatitude - City.Latitude) * 70;

    if (y < 30)
    {
        y = 30;
    }
    else if (y > 282)
    {
        y = 282;
    }

    if (x < 40)
    {
        x = 40;
    }
    else if (x > 580)
    {
        x = 580;
    }

    return { X: x, Y: y };
};

var GetXYFromLatitudeLongitudeHI = function (Latitude, Longitude, OffsetX, OffsetY)
{
    var SourceY = 0;
    var SourceX = 0;
    var ImgHeight = 571;
    var ImgWidth = 600;

    SourceY = (25 - Latitude) * 55.2;
    SourceY -= OffsetY; // Centers map.
    // Do not allow the map to exceed the max/min coordinates.
    if (SourceY > (ImgHeight - (OffsetY * 2))) // The OffsetY * 2
    {
        SourceY = ImgHeight - (OffsetY * 2);
    }
    else if (SourceY < 0)
    {
        SourceY = 0;
    }

    SourceX = ((-164.5 - Longitude) * 41.775) * -1;
    SourceX -= OffsetX // Centers map.
    // Do not allow the map to exceed the max/min coordinates.
    if (SourceX > (ImgWidth - (OffsetX * 2))) // The OffsetX * 2
    {
        SourceX = ImgWidth - (OffsetX * 2);
    }
    else if (SourceX < 0)
    {
        SourceX = 0;
    }

    return { X: SourceX, Y: SourceY };
}

var GetMinMaxLatitudeLongitudeHI = function (X, Y, OffsetX, OffsetY)
{
    var maxLat = ((Y / 55.2) - 25) * -1;
    var minLat = (((Y + (OffsetY * 2)) / 55.2) - 25) * -1;
    var minLon = (((X * -1) / 41.775) + 164.5) * -1;
    var maxLon = ((((X + (OffsetX * 2)) * -1) / 41.775) + 164.5) * -1;

    return { MinLatitude: minLat, MaxLatitude: maxLat, MinLongitude: minLon, MaxLongitude: maxLon };
};

var GetXYForCityHI = function (City, MaxLatitude, MinLongitude)
{
    var x = (City.Longitude - MinLongitude) * 57;
    var y = (MaxLatitude - City.Latitude) * 70;

    if (y < 30)
    {
        y = 30;
    }
    else if (y > 282)
    {
        y = 282;
    }

    if (x < 40)
    {
        x = 40;
    }
    else if (x > 580)
    {
        x = 580;
    }

    return { X: x, Y: y };
};

var ShowDopplerMap = function (WeatherParameters)
{

    // ALASKA ISN'T SUPPORTED!
    if (WeatherParameters.State == "AK")
    {
        WeatherParameters.Progress.DopplerRadar = LoadStatuses.NoData;
        return;
    }

    var img = new Image();
    var cnvDopplerMap;
    var cnvDopplerMapId;
    var divDopplerMap;
    var context;
    var SourceX;
    var SourceY;
    var OffsetY;
    var OffsetX;
    var cnvRadarWorkerId;
    var cnvRadarWorker;
    var contextWorker;

    divDopplerMap = divDopplerRadarMap;
    cnvDopplerMapId = "cnvDopplerRadarMap";
    cnvRadarWorkerId = "cnvRadarWorker";

    // Clear the current image.
    divDopplerMap.empty();

    if (_DopplerRadarInterval != null)
    {
        //window.clearInterval(_DopplerRadarInterval);
        window.clearTimeout(_DopplerRadarInterval);
        _DopplerRadarInterval = null;
    }

    img.onload = function ()
    {
        console.log("Image Loaded");

        divDopplerMap.html("<canvas id='" + cnvDopplerMapId + "' /><canvas id='" + cnvRadarWorkerId + "' />");
        cnvDopplerMap = $("#" + cnvDopplerMapId);
        cnvDopplerMap.attr("width", "640"); // For Chrome.
        cnvDopplerMap.attr("height", "367"); // For Chrome.
        context = cnvDopplerMap[0].getContext("2d");

        cnvRadarWorker = $("#" + cnvRadarWorkerId);
        OffsetX = 120;
        OffsetY = 69;
        if (WeatherParameters.State == "HI")
        {
            cnvRadarWorker.attr("width", "600"); // For Chrome.
            cnvRadarWorker.attr("height", "571"); // For Chrome.

            var SourceXY = GetXYFromLatitudeLongitudeHI(WeatherParameters.Latitude, WeatherParameters.Longitude, OffsetX, OffsetY);
        }
        else
        {
            cnvRadarWorker.attr("width", "2550"); // For Chrome.
            cnvRadarWorker.attr("height", "1600"); // For Chrome.
            //cnvRadarWorker.attr("width", "5100"); // For Chrome.
            //cnvRadarWorker.attr("height", "3200"); // For Chrome.

            //cnvDopplerMap.attr("width", "1280"); // For Chrome.
            //cnvDopplerMap.attr("height", "734"); // For Chrome.
            OffsetX *= 2;
            OffsetY *= 2;

            var SourceXY = GetXYFromLatitudeLongitudeDoppler(WeatherParameters.Latitude, WeatherParameters.Longitude, OffsetX, OffsetY);
        }
        cnvRadarWorker.css("display", "none");
        contextWorker = cnvRadarWorker[0].getContext("2d");
        SourceX = SourceXY.X;
        SourceY = SourceXY.Y;

        // Draw them onto the map.
        context.drawImage(img, SourceX, SourceY, (OffsetX * 2), (OffsetY * 2), 0, 0, 640, 367);

        // Find the most current doppler radar image.
        //var Url = "http://radar.weather.gov/Conus/RadarImg/mosaic_times.txt";
        var Url = "https://radar.weather.gov/Conus/RadarImg/";
        //Url = "cors/?u=" + encodeURIComponent(Url);

        //var TimesMax = 6;
        var TimesCount = 0;
        var RadarUrls = [];
        var RadarImages = [];
        var RadarContexts = [];

        // Load the xml file using ajax 
        $.ajaxCORS({
            type: "GET",
            url: Url,
            dataType: "text",
            crossDomain: true,
            cache: false,
            success: function (text)
            {
                //console.log(text);

                //// Get the doppler radar image urls.
                //var Times = text.split(" \n");
                //var TimesUbnd = Times.length - 2;

                //for (var Index = TimesUbnd; Index > TimesUbnd - _DopplerRadarImageMax; Index--)
                //{
                //    //http://radar.weather.gov/Conus/RadarImg/Conus_20161004_0028_N0Ronly.gif
                //    var Url = "http://radar.weather.gov/Conus/RadarImg/Conus_";
                //    Url += Times[Index] + "_N0Ronly.gif";
                //    Url = "cors/?u=" + encodeURIComponent(Url);

                //    RadarUrls.push(Url);
                //}
                ////console.log(RadarUrls);

                var $text = $(text);
                $text.find("[src]").attr("src", "");

                if (WeatherParameters.State == "HI")
                {
                    var Urls = $text.find("a[href*='hawaii_']");
                    var UrlsUnd = Urls.length - 3;
                    var latest = "https://radar.weather.gov/Conus/RadarImg/hawaii_radaronly.gif";
                }
                else
                {
                    var Urls = $text.find("a[href*='Conus_']");
                    var UrlsUnd = Urls.length - 1;
                    var latest = "https://radar.weather.gov/Conus/RadarImg/latest_radaronly.gif";
                }

                // add the fixed named latest image
                RadarUrls.push("cors/?u=" + encodeURIComponent(latest));
                for (var Index = UrlsUnd; Index > UrlsUnd - _DopplerRadarImageMax + 1; Index--)
                {
                    //http://radar.weather.gov/Conus/RadarImg/Conus_20161004_0028_N0Ronly.gif
                    var Url = "https://radar.weather.gov/Conus/RadarImg/";
                    Url += $(Urls[Index]).attr("href");
                    Url = "cors/?u=" + encodeURIComponent(Url);

                    RadarUrls.push(Url);
                }

                // Load the most recent doppler radar images.
                $(RadarUrls).each(function (Index, Value)
                {
                    var Url = this.toString();
                    var RadarImage = new Image();

                    RadarImage.onload = function ()
                    {
                        TimesCount++;

                        if (TimesCount == _DopplerRadarImageMax)
                        {
                            $(RadarImages).each(function (Index, Value)
                            {
                                var RadarImage = this;
                                var RadarContext = RadarContexts[Index][0].getContext("2d");

                                contextWorker.clearRect(0, 0, contextWorker.canvas.width, contextWorker.canvas.height);
                                //DrawBox(contextWorker, "rgb(255,255,255)", 0, 0, 640, 480);

                                //contextWorker.imageSmoothingEnabled = false;
                                //contextWorker.webkitImageSmoothingEnabled = false;
                                //contextWorker.mozImageSmoothingEnabled = false;
                                //contextWorker.msImageSmoothingEnabled = false;
                                //contextWorker.oImageSmoothingEnabled = false;
                                SmoothingEnabled(contextWorker, false);

                                if (WeatherParameters.State == "HI")
                                {
                                    contextWorker.drawImage(RadarImage, 0, 0, 571, 600);
                                }
                                else
                                {
                                    contextWorker.drawImage(RadarImage, 0, 0, 2550, 1600);
                                    //contextWorker.drawImage(RadarImage, 0, 0, 5100, 3200, 0, 0, 2550, 1600);
                                }
                                //context.drawImage(RadarImage, 0, 0);

                                if (WeatherParameters.State == "HI")
                                {
                                    var RadarOffsetX = 120;
                                    var RadarOffsetY = 69;
                                    //var RadarSourceXY = GetRadarXYFromLatitudeLongitude(WeatherParameters.Latitude, WeatherParameters.Longitude, OffsetX, OffsetY);
                                    var RadarSourceXY = GetXYFromLatitudeLongitudeHI(WeatherParameters.Latitude, WeatherParameters.Longitude, OffsetX, OffsetY);
                                    var RadarSourceX = RadarSourceXY.X;
                                    var RadarSourceY = RadarSourceXY.Y;
                                }
                                else
                                {
                                    //var RadarOffsetX = 120;
                                    //var RadarOffsetY = 69;
                                    var RadarOffsetX = 117;
                                    var RadarOffsetY = 60;
                                    //var RadarSourceXY = GetRadarXYFromLatitudeLongitude(WeatherParameters.Latitude, WeatherParameters.Longitude, OffsetX, OffsetY);
                                    //var RadarSourceXY = GetXYFromLatitudeLongitude(WeatherParameters.Latitude, WeatherParameters.Longitude, OffsetX, OffsetY);
                                    //var RadarSourceX = RadarSourceXY.X;
                                    //var RadarSourceY = RadarSourceXY.Y;
                                    var RadarSourceXY = GetXYFromLatitudeLongitudeDoppler(WeatherParameters.Latitude, WeatherParameters.Longitude, OffsetX, OffsetY);
                                    var RadarSourceX = RadarSourceXY.X / 2;
                                    var RadarSourceY = RadarSourceXY.Y / 2;
                                }

                                // Draw them onto the map.
                                RadarContext.clearRect(0, 0, RadarContext.canvas.width, RadarContext.canvas.height);
                                //DrawBox(RadarContext, "rgb(255,255,255)", 0, 0, 640, 480);

                                // Disable Image Smoothing for the doppler radar!
                                //RadarContext.imageSmoothingEnabled = false;
                                //RadarContext.webkitImageSmoothingEnabled = false;
                                //RadarContext.mozImageSmoothingEnabled = false;
                                //RadarContext.msImageSmoothingEnabled = false;
                                //RadarContext.oImageSmoothingEnabled = false;
                                SmoothingEnabled(RadarContext, false);

                                //RadarImage.width = 2550;

                                RadarContext.drawImage(contextWorker.canvas, RadarSourceX, RadarSourceY, (RadarOffsetX * 2), (RadarOffsetY * 2.33), 0, 0, 640, 367);
                                RemoveDopplerRadarImageNoise(RadarContext);

                            });

                            console.log("Doppler Radar Images Loaded");

                            //_DopplerRadarImageIndex = _DopplerRadarImageMax - 2;

                            //var ShowDopplarRadarImage = function ()
                            //{
                            //    var RadarContext = RadarContexts[_DopplerRadarImageIndex][0].getContext("2d");
                            //    context.drawImage(img, SourceX, SourceY, (OffsetX * 2), (OffsetY * 2), 0, 0, 640, 367);
                            //    MergeDopplerRadarImage(context, RadarContext);

                            //    var Interval = 500;
                            //    _DopplerRadarImageIndex--;
                            //    if (_DopplerRadarImageIndex == -1)
                            //    {
                            //        Interval = 2000;
                            //        _DopplerRadarImageIndex = _DopplerRadarImageMax - 1;
                            //    }

                            //    _DopplerRadarInterval = window.setTimeout(function () { ShowDopplarRadarImage() }, Interval);
                            //};
                            //_DopplerRadarInterval = window.setTimeout(function () { ShowDopplarRadarImage() }, 5000);

                            WeatherParameters.DopplerRadarInfo = {
                                RadarContexts: RadarContexts,
                                RadarImage: img,
                                RadarMapContext: context,
                                RadarSourceX: SourceX,
                                RadarSourceY: SourceY,
                                OffsetY: OffsetY,
                                OffsetX: OffsetX,
                            };

                            var RadarContext = RadarContexts[0][0].getContext("2d");
                            context.drawImage(img, SourceX, SourceY, (OffsetX * 2), (OffsetY * 2), 0, 0, 640, 367);
                            MergeDopplerRadarImage(context, RadarContext);

                            //WeatherParameters.Progress.DopplerRadar = LoadStatuses.Loaded;

                            // Draw canvas
                            var BackGroundImage = new Image();
                            BackGroundImage.onload = function ()
                            {
                                var canvas = canvasLocalRadar[0];
                                var context = canvas.getContext("2d");
                                context.drawImage(BackGroundImage, 0, 0);

                                // Title
                                DrawText(context, "Arial", "bold 28pt", "#ffffff", 175, 65, "Local", 2);
                                DrawText(context, "Arial", "bold 28pt", "#ffffff", 175, 100, "Radar", 2);

                                DrawText(context, "Arial", "bold 18pt", "#ffffff", 390, 49, "PRECIP", 2);
                                DrawText(context, "Arial", "bold 18pt", "#ffffff", 298, 73, "Light", 2);
                                DrawText(context, "Arial", "bold 18pt", "#ffffff", 517, 73, "Heavy", 2);

                                var x = 362;
                                var y = 52;
                                DrawBox(context, "#000000", x - 2, y - 2, 154, 28);
                                DrawBox(context, "rgb(49, 210, 22)", x, y, 17, 24); x += 19;
                                DrawBox(context, "rgb(28, 138, 18)", x, y, 17, 24); x += 19;
                                DrawBox(context, "rgb(20, 90, 15)", x, y, 17, 24); x += 19;
                                DrawBox(context, "rgb(10, 40, 10)", x, y, 17, 24); x += 19;
                                DrawBox(context, "rgb(196, 179, 70)", x, y, 17, 24); x += 19;
                                DrawBox(context, "rgb(190, 72, 19)", x, y, 17, 24); x += 19;
                                DrawBox(context, "rgb(171, 14, 14)", x, y, 17, 24); x += 19;
                                DrawBox(context, "rgb(115, 31, 4)", x, y, 17, 24); x += 19;

                                DrawBox(context, "rgb(143, 73, 95)", 318, 83, 32, 24);
                                DrawBox(context, "rgb(250, 122, 232)", 320, 85, 28, 20);
                                DrawText(context, "Arial", "bold 18pt", "#ffffff", 355, 105, "= Incomplete Data", 2);

                                window.setInterval(function ()
                                {
                                    context.drawImage(cnvDopplerMap[0], 0, 0, 640, 367, 0, 113, 640, 367);
                                    UpdateWeatherCanvas(WeatherParameters, canvasLocalRadar);
                                }, 100);

                                WeatherParameters.Progress.DopplerRadar = LoadStatuses.Loaded;
                            };
                            BackGroundImage.src = "images/BackGround4_1.png";
                            //BackGroundImage.src = "images/BackGround4_" + _Themes.toString() + ".png";

                        }
                    };
                    RadarImage.src = Url;
                    RadarImages.push(RadarImage);

                    var id = "cnvRadar" + Index.toString();
                    var RadarContext = $("#" + id);
                    if (RadarContext.length == 0)
                    {
                        $("body").append("<canvas id='" + id + "' />");
                        RadarContext = $("#" + id);
                        RadarContext.attr("width", "640"); // For Chrome.
                        RadarContext.attr("height", "367"); // For Chrome.
                        RadarContext.css("display", "none");
                    }
                    RadarContexts.push(RadarContext);
                });

            },
            error: function (xhr, error, errorThrown)
            {
                console.error("Get mosaic_times.txt failed: " + errorThrown);
                WeatherParameters.Progress.DopplerRadar = LoadStatuses.Failed;
            }
        });

    };
    if (WeatherParameters.State == "HI")
    {
        img.src = "images/HawaiiRadarMap2.png";
    }
    else
    {
        img.src = "images/4000RadarMap2.jpg";
        //img.src = "images/4000RadarMap2.png";
    }
}

var ShowDopplerMap2 = function (WeatherParameters)
{

    // ALASKA ISN'T SUPPORTED!
    if (WeatherParameters.State == "AK")
    {
        WeatherParameters.Progress.DopplerRadar = LoadStatuses.NoData;
        return;
    }
    // HAWAII ISN'T SUPPORTED!
    if (WeatherParameters.State == "HI")
    {
        WeatherParameters.Progress.DopplerRadar = LoadStatuses.NoData;
        return;
    }

    var img = new Image();
    var cnvDopplerMap;
    var cnvDopplerMapId;
    var divDopplerMap;
    var context;
    var SourceX;
    var SourceY;
    var OffsetY;
    var OffsetX;
    var cnvRadarWorkerId;
    var cnvRadarWorker;
    var contextWorker;

    divDopplerMap = divDopplerRadarMap;
    cnvDopplerMapId = "cnvDopplerRadarMap";
    cnvRadarWorkerId = "cnvRadarWorker";

    // Clear the current image.
    divDopplerMap.empty();

    if (_DopplerRadarInterval != null)
    {
        window.clearTimeout(_DopplerRadarInterval);
        _DopplerRadarInterval = null;
    }

    img.onload = function ()
    {
        console.log("Image Loaded");

        divDopplerMap.html("<canvas id='" + cnvDopplerMapId + "' /><canvas id='" + cnvRadarWorkerId + "' />");
        cnvDopplerMap = $("#" + cnvDopplerMapId);
        cnvDopplerMap.attr("width", "640"); // For Chrome.
        cnvDopplerMap.attr("height", "367"); // For Chrome.
        context = cnvDopplerMap[0].getContext("2d");

        var FolderName;

        cnvRadarWorker = $("#" + cnvRadarWorkerId);
        OffsetX = 120;
        OffsetY = 69;
        var SourceXY;

        if (WeatherParameters.State == "HI")
        {
            FolderName = "hicomp";
            cnvRadarWorker.attr("width", "600"); // For Chrome.
            cnvRadarWorker.attr("height", "571"); // For Chrome.

            SourceXY = GetXYFromLatitudeLongitudeHI(WeatherParameters.Latitude, WeatherParameters.Longitude, OffsetX, OffsetY);
        }
        else
        {
            FolderName = "uscomp";
            cnvRadarWorker.attr("width", "2550"); // For Chrome.
            cnvRadarWorker.attr("height", "1600"); // For Chrome.
            OffsetX *= 2;
            OffsetY *= 2;

            SourceXY = GetXYFromLatitudeLongitudeDoppler(WeatherParameters.Latitude, WeatherParameters.Longitude, OffsetX, OffsetY);
        }
        cnvRadarWorker.css("display", "none");
        contextWorker = cnvRadarWorker[0].getContext("2d");
        SourceX = SourceXY.X;
        SourceY = SourceXY.Y;

        // Draw them onto the map.
        context.drawImage(img, SourceX, SourceY, (OffsetX * 2), (OffsetY * 2), 0, 0, 640, 367);

        // Find the most current doppler radar image.
        //var Url = "https://radar.weather.gov/Conus/RadarImg/";
        //https://mesonet.agron.iastate.edu/archive/data/2020/11/26/GIS/uscomp/
        var Today = new Date();
        var Tomorrow = Today.addDays(1);
        var Yesterday = Today.addDays(-1);
        var UrlLinks = [
            "https://mesonet.agron.iastate.edu/archive/data/" + Yesterday.getYYYYMMDDSlashed() + "/GIS/" + FolderName + "/",
            "https://mesonet.agron.iastate.edu/archive/data/" + Today.getYYYYMMDDSlashed() + "/GIS/" + FolderName + "/",
            "https://mesonet.agron.iastate.edu/archive/data/" + Tomorrow.getYYYYMMDDSlashed() + "/GIS/" + FolderName + "/"
        ];

        var TimesCount = 0;
        var RadarUrls = [];
        var RadarImages = [];
        var RadarContexts = [];

        var UrlCounter = 0;
        var UrlMax = 3;
        var CheckFinishedRadarUrls = function ()
        {
            UrlCounter++;
            if (UrlCounter == UrlMax)
            {
                FinishedRadarUrls();
            }
        };

        $(UrlLinks).each(function ()
        {
            var UrlLink = this.toString();

            $.ajaxCORS({
                type: "GET",
                url: UrlLink,
                dataType: "text",
                crossDomain: true,
                cache: false,
                success: function (text)
                {
                    var $text = $(text);
                    $text.find("[src]").attr("src", "");

                    var Urls = $text.find("a[href^='n0r_'][href$='.png']");
                    var UrlsUnd = Urls.length - 1;

                    // Get the 6 most recent images.
                    for (var Index = UrlsUnd; Index > UrlsUnd - _DopplerRadarImageMax; Index--)
                    {
                        var Url = UrlLink;
                        var href = $(Urls[Index]).attr("href");
                        if (href == undefined)
                        {
                            break;
                        }

                        Url += href;
                        Url = "cors/?u=" + encodeURIComponent(Url);

                        RadarUrls.push(Url);
                    }

                    CheckFinishedRadarUrls();
                },
                error: function (xhr, error, errorThrown)
                {
                    CheckFinishedRadarUrls();
                }
            });
        });

        var FinishedRadarUrls = function ()
        {
            // Verify that we have at least the maximum number of images that can be used by frames
            if (RadarUrls.length < _DopplerRadarImageMax)
            {
                console.error("No radar urls found!");
                WeatherParameters.Progress.DopplerRadar = LoadStatuses.Failed;
                return;
            }

            // Sort the images by newest first
            RadarUrls.sort();
            // Reverse the order of the array
            RadarUrls.reverse();
            // Remove all but the last max number of files
            RadarUrls.splice(_DopplerRadarImageMax);

            // Load the most recent doppler radar images.
            $(RadarUrls).each(function (Index, Value)
            {
                var Url = this.toString();
                var RadarImage = new Image();

                RadarImage.onload = function ()
                {
                    TimesCount++;

                    if (TimesCount == _DopplerRadarImageMax)
                    {
                        $(RadarImages).each(function (Index, Value)
                        {
                            var RadarImage = this;
                            var RadarContext = RadarContexts[Index][0].getContext("2d");

                            contextWorker.clearRect(0, 0, contextWorker.canvas.width, contextWorker.canvas.height);
                            SmoothingEnabled(contextWorker, false);

                            if (WeatherParameters.State == "HI")
                            {
                                contextWorker.drawImage(RadarImage, 0, 0, 571, 600);
                            }
                            else
                            {
                                contextWorker.drawImage(RadarImage, 0, 0, 2550, 1600);
                            }

                            var RadarOffsetX;
                            var RadarOffsetY;
                            var RadarSourceXY;
                            var RadarSourceX;
                            var RadarSourceY;

                            if (WeatherParameters.State == "HI")
                            {
                                RadarOffsetX = 120;
                                RadarOffsetY = 69;
                                RadarSourceXY = GetXYFromLatitudeLongitudeHI(WeatherParameters.Latitude, WeatherParameters.Longitude, OffsetX, OffsetY);
                                RadarSourceX = RadarSourceXY.X;
                                RadarSourceY = RadarSourceXY.Y;
                            }
                            else
                            {
                                RadarOffsetX = 120;
                                RadarOffsetY = 70;
                                RadarSourceXY = GetXYFromLatitudeLongitudeDoppler2(WeatherParameters.Latitude, WeatherParameters.Longitude, OffsetX, OffsetY);
                                RadarSourceX = RadarSourceXY.X / 2;
                                RadarSourceY = RadarSourceXY.Y / 2;
                            }

                            // Draw them onto the map.
                            RadarContext.clearRect(0, 0, RadarContext.canvas.width, RadarContext.canvas.height);

                            // Disable Image Smoothing for the doppler radar!
                            SmoothingEnabled(RadarContext, false);

                            //RadarContext.drawImage(contextWorker.canvas, RadarSourceX * .986, RadarSourceY * 1.04, (RadarOffsetX * 2), (RadarOffsetY * 2.33), 0, 0, 640, 367);
                            RadarContext.drawImage(contextWorker.canvas, RadarSourceX, RadarSourceY, (RadarOffsetX * 2), (RadarOffsetY * 2.33), 0, 0, 640, 367);
                            RemoveDopplerRadarImageNoise2(RadarContext);

                        });

                        console.log("Doppler Radar Images Loaded");

                        WeatherParameters.DopplerRadarInfo = {
                            RadarContexts: RadarContexts,
                            RadarImage: img,
                            RadarMapContext: context,
                            RadarSourceX: SourceX,
                            RadarSourceY: SourceY,
                            OffsetY: OffsetY,
                            OffsetX: OffsetX,
                        };

                        var RadarContext = RadarContexts[0][0].getContext("2d");
                        context.drawImage(img, SourceX, SourceY, (OffsetX * 2), (OffsetY * 2), 0, 0, 640, 367);
                        MergeDopplerRadarImage(context, RadarContext);

                        // Draw canvas
                        var BackGroundImage = new Image();
                        BackGroundImage.onload = function ()
                        {
                            var canvas = canvasLocalRadar[0];
                            var context = canvas.getContext("2d");
                            context.drawImage(BackGroundImage, 0, 0);

                            // Title
                            DrawText(context, "Arial", "bold 28pt", "#ffffff", 175, 65, "Local", 2);
                            DrawText(context, "Arial", "bold 28pt", "#ffffff", 175, 100, "Radar", 2);

                            DrawText(context, "Arial", "bold 18pt", "#ffffff", 390, 49, "PRECIP", 2);
                            DrawText(context, "Arial", "bold 18pt", "#ffffff", 298, 73, "Light", 2);
                            DrawText(context, "Arial", "bold 18pt", "#ffffff", 517, 73, "Heavy", 2);

                            var x = 362;
                            var y = 52;
                            DrawBox(context, "#000000", x - 2, y - 2, 154, 28);
                            DrawBox(context, "rgb(49, 210, 22)", x, y, 17, 24); x += 19;
                            DrawBox(context, "rgb(28, 138, 18)", x, y, 17, 24); x += 19;
                            DrawBox(context, "rgb(20, 90, 15)", x, y, 17, 24); x += 19;
                            DrawBox(context, "rgb(10, 40, 10)", x, y, 17, 24); x += 19;
                            DrawBox(context, "rgb(196, 179, 70)", x, y, 17, 24); x += 19;
                            DrawBox(context, "rgb(190, 72, 19)", x, y, 17, 24); x += 19;
                            DrawBox(context, "rgb(171, 14, 14)", x, y, 17, 24); x += 19;
                            DrawBox(context, "rgb(115, 31, 4)", x, y, 17, 24); x += 19;

                            DrawBox(context, "rgb(143, 73, 95)", 318, 83, 32, 24);
                            DrawBox(context, "rgb(250, 122, 232)", 320, 85, 28, 20);
                            DrawText(context, "Arial", "bold 18pt", "#ffffff", 355, 105, "= Incomplete Data", 2);

                            window.setInterval(function ()
                            {
                                context.drawImage(cnvDopplerMap[0], 0, 0, 640, 367, 0, 113, 640, 367);
                                UpdateWeatherCanvas(WeatherParameters, canvasLocalRadar);
                            }, 100);

                            WeatherParameters.Progress.DopplerRadar = LoadStatuses.Loaded;
                        };
                        BackGroundImage.src = "images/BackGround4_1.png";
                    }
                };
                RadarImage.src = Url;
                RadarImages.push(RadarImage);

                var id = "cnvRadar" + Index.toString();
                var RadarContext = $("#" + id);
                if (RadarContext.length == 0)
                {
                    $("body").append("<canvas id='" + id + "' />");
                    RadarContext = $("#" + id);
                    RadarContext.attr("width", "640"); // For Chrome.
                    RadarContext.attr("height", "367"); // For Chrome.
                    RadarContext.css("display", "none");
                }
                RadarContexts.push(RadarContext);
            });
        }

    };

    if (WeatherParameters.State == "HI")
    {
        img.src = "images/HawaiiRadarMap2.png";
    }
    else
    {
        img.src = "images/4000RadarMap2.jpg";
    }
}

var UpdateDopplarRadarImage = function (Offset)
{
    switch (Offset)
    {
        case undefined:
            break;
        case 0:
            _DopplerRadarImageIndex = _DopplerRadarImageMax - 1;
            break;
        case Infinity:
            _DopplerRadarImageIndex = 0;
            break;
        default:
            _DopplerRadarImageIndex -= Offset;
            if (_DopplerRadarImageIndex > _DopplerRadarImageMax - 1)
            {
                _DopplerRadarImageIndex = 0;
            }
            else if (_DopplerRadarImageIndex < 0)
            {
                _DopplerRadarImageIndex = _DopplerRadarImageMax - 1;
            }
            break;
    }

    var RadarContexts = _WeatherParameters.DopplerRadarInfo.RadarContexts;
    var img = _WeatherParameters.DopplerRadarInfo.RadarImage;
    var context = _WeatherParameters.DopplerRadarInfo.RadarMapContext;
    var SourceX = _WeatherParameters.DopplerRadarInfo.RadarSourceX;
    var SourceY = _WeatherParameters.DopplerRadarInfo.RadarSourceY;
    var OffsetY = _WeatherParameters.DopplerRadarInfo.OffsetY;
    var OffsetX = _WeatherParameters.DopplerRadarInfo.OffsetX;

    var RadarContext = RadarContexts[_DopplerRadarImageIndex][0].getContext("2d");
    context.drawImage(img, SourceX, SourceY, (OffsetX * 2), (OffsetY * 2), 0, 0, 640, 367);
    MergeDopplerRadarImage(context, RadarContext);

    //var Interval = 500;
    //_DopplerRadarImageIndex--;
    //if (_DopplerRadarImageIndex == -1)
    //{
    //    Interval = 2000;
    //    _DopplerRadarImageIndex = _DopplerRadarImageMax - 1;
    //}

    //_DopplerRadarInterval = window.setTimeout(function () { ShowDopplarRadarImage() }, Interval);
};

var GetRadarXYFromLatitudeLongitude = function (Latitude, Longitude, OffsetX, OffsetY)
{
    var SourceY = 0;
    var SourceX = 0;
    var ImgHeight = 1600;
    var ImgWidth = 3400;

    SourceY = (50.5 - Latitude) * 55;
    SourceY -= OffsetY; // Centers map.
    // Do not allow the map to exceed the max/min coordinates.
    if (SourceY > (ImgHeight - (OffsetY * 2))) // The OffsetY * 2
    {
        SourceY = ImgHeight - (OffsetY * 2);
    }
    else if (SourceY < 0)
    {
        SourceY = 0;
    }

    //SourceX = ((-127.5 - Longitude) * 41.775) * -1;
    //SourceX = ((-127.5 - Longitude) * 31.33) * -1;
    SourceX = ((-127.5 - Longitude) * 55.8) * -1;
    SourceX -= OffsetX // Centers map.
    // Do not allow the map to exceed the max/min coordinates.
    if (SourceX > (ImgWidth - (OffsetX * 2))) // The OffsetX * 2
    {
        SourceX = ImgWidth - (OffsetX * 2);
    }
    else if (SourceX < 0)
    {
        SourceX = 0;
    }

    return { X: SourceX, Y: SourceY };
}

var RemoveDopplerRadarImageNoise = function (RadarContext)
{
    var RadarImageData = RadarContext.getImageData(0, 0, RadarContext.canvas.width, RadarContext.canvas.height);

    // examine every pixel, 
    // change any old rgb to the new-rgb
    for (var i = 0; i < RadarImageData.data.length; i += 4)
    {
        // i + 0 = red
        // i + 1 = green
        // i + 2 = blue
        // i + 3 = alpha (0 = transparent, 255 = opaque)
        var R = RadarImageData.data[i];
        var G = RadarImageData.data[i + 1];
        var B = RadarImageData.data[i + 2];
        var A = RadarImageData.data[i + 3];

        // is this pixel the old rgb?
        if ((R == 1 && G == 159 && B == 244)
            || (R >= 200 && G >= 200 && B >= 200)
            || (R == 4 && G == 233 && B == 231)
            || (R == 3 && G == 0 && B == 244))
        {
            // change to your new rgb

            // Transparent
            R = 0;
            G = 0;
            B = 0;
            A = 0;
        }
        else if (R == 2 && G == 253 && B == 2)
        {
            // Light Green 1
            R = 49;
            G = 210;
            B = 22;
            A = 255;
        }
        else if (R == 1 && G == 197 && B == 1)
        {
            // Light Green 2
            R = 0;
            G = 142;
            B = 0;
            A = 255;
        }
        else if (R == 0 && G == 142 && B == 0)
        {
            // Dark Green 1
            R = 20;
            G = 90;
            B = 15;
            A = 255;
        }
        else if (R == 253 && G == 248 && B == 2)
        {
            // Dark Green 2
            R = 10;
            G = 40;
            B = 10;
            A = 255;
        }
        else if (R == 229 && G == 188 && B == 0)
        {
            // Yellow
            R = 196;
            G = 179;
            B = 70;
            A = 255;
        }
        else if (R == 253 && G == 139 && B == 0)
        {
            // Orange
            R = 190;
            G = 72;
            B = 19;
            A = 255;
        }
        else if (R == 212 && G == 0 && B == 0)
        {
            // Red
            R = 171;
            G = 14;
            B = 14;
            A = 255;
        }
        else if (R == 188 && G == 0 && B == 0)
        {
            // Brown
            R = 115;
            G = 31;
            B = 4;
            A = 255;
        }


        RadarImageData.data[i] = R;
        RadarImageData.data[i + 1] = G;
        RadarImageData.data[i + 2] = B;
        RadarImageData.data[i + 3] = A;
    }

    RadarContext.putImageData(RadarImageData, 0, 0);

    //MapContext.drawImage(RadarContext.canvas, 0, 0);
};

var RemoveDopplerRadarImageNoise2 = function (RadarContext)
{
    var RadarImageData = RadarContext.getImageData(0, 0, RadarContext.canvas.width, RadarContext.canvas.height);

    // examine every pixel, 
    // change any old rgb to the new-rgb
    for (var i = 0; i < RadarImageData.data.length; i += 4)
    {
        // i + 0 = red
        // i + 1 = green
        // i + 2 = blue
        // i + 3 = alpha (0 = transparent, 255 = opaque)
        var R = RadarImageData.data[i];
        var G = RadarImageData.data[i + 1];
        var B = RadarImageData.data[i + 2];
        var A = RadarImageData.data[i + 3];

        // is this pixel the old rgb?
        if ((R == 0 && G == 0 && B == 0)
            || (R == 0 && G == 236 && B == 236)
            || (R == 1 && G == 160 && B == 246)
            || (R == 0 && G == 0 && B == 246))
        {
            // change to your new rgb

            // Transparent
            R = 0;
            G = 0;
            B = 0;
            A = 0;
        }
        else if ((R == 0 && G == 255 && B == 0))
        {
            // Light Green 1
            R = 49;
            G = 210;
            B = 22;
            A = 255;
        }
        else if ((R == 0 && G == 200 && B == 0))
        {
            // Light Green 2
            R = 0;
            G = 142;
            B = 0;
            A = 255;
        }
        else if ((R == 0 && G == 144 && B == 0))
        {
            // Dark Green 1
            R = 20;
            G = 90;
            B = 15;
            A = 255;
        }
        else if ((R == 255 && G == 255 && B == 0))
        {
            // Dark Green 2
            R = 10;
            G = 40;
            B = 10;
            A = 255;
        }
        else if ((R == 231 && G == 192 && B == 0))
        {
            // Yellow
            R = 196;
            G = 179;
            B = 70;
            A = 255;
        }
        else if ((R == 255 && G == 144 && B == 0))
        {
            // Orange
            R = 190;
            G = 72;
            B = 19;
            A = 255;
        }
        else if ((R == 214 && G == 0 && B == 0)
            || (R == 255 && G == 0 && B == 0))
        {
            // Red
            R = 171;
            G = 14;
            B = 14;
            A = 255;
        }
        else if ((R == 192 && G == 0 && B == 0)
            || (R == 255 && G == 0 && B == 255))
        {
            // Brown
            R = 115;
            G = 31;
            B = 4;
            A = 255;
        }


        RadarImageData.data[i] = R;
        RadarImageData.data[i + 1] = G;
        RadarImageData.data[i + 2] = B;
        RadarImageData.data[i + 3] = A;
    }

    RadarContext.putImageData(RadarImageData, 0, 0);

    //MapContext.drawImage(RadarContext.canvas, 0, 0);
};

var MergeDopplerRadarImage = function (MapContext, RadarContext)
{
    var MapImageData = MapContext.getImageData(0, 0, MapContext.canvas.width, MapContext.canvas.height);
    var RadarImageData = RadarContext.getImageData(0, 0, RadarContext.canvas.width, RadarContext.canvas.height);

    // examine every pixel, 
    // change any old rgb to the new-rgb
    for (var i = 0; i < RadarImageData.data.length; i += 4)
    {
        // i + 0 = red
        // i + 1 = green
        // i + 2 = blue
        // i + 3 = alpha (0 = transparent, 255 = opaque)

        // is this pixel the old rgb?
        if ((MapImageData.data[i] < 116 && MapImageData.data[i + 1] < 116 && MapImageData.data[i + 2] < 116))
        {
            // change to your new rgb

            // Transparent
            RadarImageData.data[i] = 0;
            RadarImageData.data[i + 1] = 0;
            RadarImageData.data[i + 2] = 0;
            RadarImageData.data[i + 3] = 0;
        }
    }

    RadarContext.putImageData(RadarImageData, 0, 0);

    MapContext.drawImage(RadarContext.canvas, 0, 0);
};

var Progress = function (e)
{
    var WeatherParameters = e.WeatherParameters;

    this.CurrentConditions = LoadStatuses.Loading;
    this.WordedForecast = LoadStatuses.Loading;
    this.FourDayForecast = LoadStatuses.Loading;
    this.TravelForecast = LoadStatuses.Loading;
    this.NearbyConditions = LoadStatuses.Loading;
    this.CurrentRegionalMap = LoadStatuses.Loading;
    this.TomorrowsRegionalMap = LoadStatuses.Loading;
    this.Almanac = LoadStatuses.Loading;
    this.DopplerRadar = LoadStatuses.Loading;
    this.Hazards = LoadStatuses.Loading;

    this.Loaded = false;

    var _self = this;
    var _ProgressInterval;

    var canvas = canvasProgress[0];

    _ProgressInterval = window.setInterval(function ()
    {
        if (_self.Loaded == false)
        {
            return;
        }

        if (!gifProgress)
        {
            return;
        }

        var Progress = _self.GetTotalPercentage();
        divProgress.html(Progress.toString());

        //context.drawImage(BackGroundImage, 0, 0);
        //console.log(gifProgress.get_canvas());
        var width = (Progress / 100) * 530 + 1;
        gifProgress.get_canvas().width = width;

        if (Progress > 0)
        {
            // Put white at the end of the progress incase it doesn't render properly
            DrawBox(context, "#ffffff", 53 + width, 430, 530 - width, 18);

            gifProgress.setX(53);
            gifProgress.setY(430);
            //gifProgress.pause();
            //gifProgress.play();
            //context.drawImage(gifProgress.get_canvas(), 50, 430);
        }

        _DisplayLoadingDetails();
        AssignPlayMsOffsets(true);

        if (Progress == 100)
        {
            gifProgress.pause();
            window.clearInterval(_ProgressInterval);
            if (_CallBack) _CallBack({ Status: "LOADED", LastUpdate: new Date(), });
        }

    }, 250);

    var _DisplayLoadingDetails = function ()
    {
        //context.drawImage(BackGroundImage, 0, 0, 640, 400, 0, 0, 640, 400);
        context.drawImage(BackGroundImage, 0, 100, 640, 300, 0, 100, 640, 300);
        //DrawHorizontalGradientSingle(context, 0, 90, 52, 399, "rgb(46, 18, 81)", "rgb(115, 27, 201)");
        //DrawHorizontalGradientSingle(context, 584, 90, 640, 399, "rgb(46, 18, 81)", "rgb(115, 27, 201)");
        DrawHorizontalGradientSingle(context, 0, 90, 52, 399, _SideColor1, _SideColor2);
        DrawHorizontalGradientSingle(context, 584, 90, 640, 399, _SideColor1, _SideColor2);

        var OffsetY = 120;
        var __DrawText = function (caption, status)
        {
            var StatusText;
            var StatusColor;
            var Dots;

            Dots = Array(120 - Math.floor(caption.length * 2.5)).join(".");
            DrawText(context, "Star4000 Extended", "19pt", "#ffffff", 70, OffsetY, caption + Dots, 2);

            // Erase any dots that spill into the status text.
            context.drawImage(BackGroundImage, 475, OffsetY - 20, 165, 30, 475, OffsetY - 20, 165, 30);
            //DrawHorizontalGradientSingle(context, 584, 90, 640, 399, "rgb(46, 18, 81)", "rgb(115, 27, 201)");
            DrawHorizontalGradientSingle(context, 584, 90, 640, 399, _SideColor1, _SideColor2);

            switch (status)
            {
                case LoadStatuses.Loading:
                    StatusText = "Loading";
                    StatusColor = "#ffff00";
                    break;
                case LoadStatuses.Loaded:
                    //StatusText = "Loaded";
                    StatusText = "Press Here";
                    StatusColor = "#00ff00";

                    if (caption == "Hazardous Weather")
                    {
                        StatusColor = "#ff0000";
                    }

                    //DrawBox(context, "rgb(33, 40, 90)", 440, OffsetY - 20, 75, 25);
                    context.drawImage(BackGroundImage, 440, OffsetY - 20, 75, 25, 440, OffsetY - 20, 75, 25);
                    break;
                case LoadStatuses.Failed:
                    StatusText = "Failed";
                    StatusColor = "#ff0000";
                    break;
                case LoadStatuses.NoData:
                    StatusText = "No Data";
                    StatusColor = "#C0C0C0";
                    DrawBox(context, "rgb(33, 40, 90)", 475, OffsetY - 15, 75, 15);
                    break;
            }
            //DrawText(context, "Star4000 Extended", "16pt", StatusColor, 500, OffsetY, StatusText, 2);
            DrawText(context, "Star4000 Extended", "19pt", StatusColor, 565, OffsetY, StatusText, 2, "end");
            
            //OffsetY += 25;
            OffsetY += 29;
        };

        __DrawText("Current Conditions", WeatherParameters.Progress.CurrentConditions);
        __DrawText("Latest Observations", WeatherParameters.Progress.NearbyConditions);
        __DrawText("Travel Forecast", WeatherParameters.Progress.TravelForecast);
        __DrawText("Regional Forecast", WeatherParameters.Progress.TomorrowsRegionalMap);
        __DrawText("Regional Observations", WeatherParameters.Progress.CurrentRegionalMap);
        __DrawText("Local Forecast", WeatherParameters.Progress.WordedForecast);
        __DrawText("Extended Forecast", WeatherParameters.Progress.FourDayForecast);
        __DrawText("Almanac", WeatherParameters.Progress.Almanac);
        __DrawText("Local Radar", WeatherParameters.Progress.DopplerRadar);
        __DrawText("Hazardous Weather", WeatherParameters.Progress.Hazards);

        ////DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Current Coniditions: " + (WeatherParameters.Progress.CurrentConditions == true ? "Loaded" : "Loading...")); OffsetY += 25;
        //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Latest Observations: " + (WeatherParameters.Progress.NearbyConditions == true ? "Loaded" : "Loading...")); OffsetY += 25;
        //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Travel Forecast: " + (WeatherParameters.Progress.TravelForecast == true ? "Loaded" : "Loading...")); OffsetY += 25;
        //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Today's Forecast: " + (WeatherParameters.Progress.TomorrowsRegionalMap == true ? "Loaded" : "Loading...")); OffsetY += 25;
        //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Regional Observations: " + (WeatherParameters.Progress.CurrentRegionalMap == true ? "Loaded" : "Loading...")); OffsetY += 25;
        //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Local Forecast: " + (WeatherParameters.Progress.WordedForecast == true ? "Loaded" : "Loading...")); OffsetY += 25;
        //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Extended Forecast: " + (WeatherParameters.Progress.FourDayForecast == true ? "Loaded" : "Loading...")); OffsetY += 25;
        //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Almanac: " + (WeatherParameters.Progress.Almanac == true ? "Loaded" : "Loading...")); OffsetY += 25;
        //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Local Radar: " + (WeatherParameters.Progress.DopplerRadar == true ? "Loaded" : "Loading...")); OffsetY += 25;
        //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Hazardous Weather: " + (WeatherParameters.Progress.Hazards == true ? "Loaded" : "Loading...")); OffsetY += 25;

        UpdateWeatherCanvas(WeatherParameters, $(canvas));
        
    };

    this.GetTotalPercentage = function()
    {
        var Percentage = 0;
        var IncreaseAmount = 10;

        if (this.CurrentConditions != LoadStatuses.Loading)
        {
            Percentage += IncreaseAmount;
        }
        if (this.WordedForecast != LoadStatuses.Loading)
        {
            Percentage += IncreaseAmount;
        }
        if (this.FourDayForecast != LoadStatuses.Loading)
        {
            Percentage += IncreaseAmount;
        }
        if (this.TravelForecast != LoadStatuses.Loading)
        {
            Percentage += IncreaseAmount;
        }
        if (this.NearbyConditions != LoadStatuses.Loading)
        {
            Percentage += IncreaseAmount;
        }
        if (this.CurrentRegionalMap != LoadStatuses.Loading)
        {
            Percentage += IncreaseAmount;
        }
        if (this.TomorrowsRegionalMap != LoadStatuses.Loading)
        {
            Percentage += IncreaseAmount;
        }
        if (this.Almanac != LoadStatuses.Loading)
        {
            Percentage += IncreaseAmount;
        }
        if (this.DopplerRadar != LoadStatuses.Loading)
        {
            Percentage += IncreaseAmount;
        }
        if (this.Hazards != LoadStatuses.Loading)
        {
            Percentage += IncreaseAmount;
        }

        return Percentage;
    }

    var BackGroundImage = new Image();
    var context = canvas.getContext("2d");
    var gifProgress;

    this.DrawProgress = function ()
    {
        var DontLoadGifs = _DontLoadGifs;

        BackGroundImage.onload = function ()
        {
            _self.Loaded = false;

            //context.drawImage(BackGroundImage, 0, 0);

            if (DontLoadGifs == false || !gifProgress)
            {
                // Conditions Icon
                gifProgress = new SuperGif({
                    src: "images/Progress1.gif",
                    loop_delay: 100,
                    auto_play: true,
                    canvas: canvas,
                    x: 50,
                    y: 480,
                });
                gifProgress.load();
            }

            //SmoothingEnabled(context, false);

            context.drawImage(BackGroundImage, 0, 0);
            //DrawHorizontalGradientSingle(context, 0, 30, 500, 90, "rgb(114, 27, 200)", "rgb(73, 34, 66)");
            DrawHorizontalGradientSingle(context, 0, 30, 500, 90, _TopColor1, _TopColor2);
            DrawTriangle(context, "rgb(28, 10, 87)", 500, 30, 450, 90, 500, 90);

            //canvasBackGroundDateTime[0].getContext("2d").drawImage(canvas, 0, 0, 175, 60, 410, 30, 175, 60);
            canvasBackGroundDateTime[0].getContext("2d").drawImage(canvas, 410, 30, 175, 60, 0, 0, 175, 60);
            canvasBackGroundCurrentConditions[0].getContext("2d").drawImage(canvas, 0, 405, 640, 75, 0, 0, 640, 75);

            ////DrawText(context, "Star4000 Large", "16pt", "#ffff00", 170, 55, "Current", 3);
            ////DrawText(context, "Star4000 Large", "16pt", "#ffff00", 170, 80, "Conditions", 3);
            //DrawText(context, "Star4000 Large", "16pt", "#ffff00", 170, 55, "WeatherStar", 3);
            //DrawText(context, "Star4000 Large", "16pt", "#ffff00", 170, 80, "4000+", 3);
            DrawTitleText(context, "WeatherStar", "4000+ 1.67");

            // Draw a box for the progress.
            //context.fillStyle = "#000000";
            //context.fillRect(51, 428, 534, 22);
            //context.fillStyle = "#ffffff";
            //context.fillRect(53, 430, 530, 18);
            DrawBox(context, "#000000", 51, 428, 534, 22);
            DrawBox(context, "#ffffff", 53, 430, 530, 18);

            //DrawText(context, "Star4000 Extended", "24pt", "#ffffff", 70, 150, "Mostly Cloudy");
            //var OffsetY = 120;
            //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Current Coniditions: Loading"); OffsetY += 25;
            //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Latest Observations: Loading"); OffsetY += 25;
            //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Travel Forecast: Loading"); OffsetY += 25;
            //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Today's Forecast: Loading"); OffsetY += 25;
            //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Regional Observations: Loading"); OffsetY += 25;
            //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Local Forecast: Loading"); OffsetY += 25;
            //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Extended Forecast: Loading"); OffsetY += 25;
            //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Almanac: Loading"); OffsetY += 25;
            //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Local Radar: Loading"); OffsetY += 25;
            //DrawText(context, "Star4000 Extended", "16pt", "#ffffff", 70, OffsetY, "Hazardous Weather: Loading"); OffsetY += 25;
            _DisplayLoadingDetails();

            UpdateWeatherCanvas(WeatherParameters, canvasProgress);
            //Gif.get_canvas().width = 100

            _self.Loaded = true;

            if (DontLoadGifs == false)
            {
                e.OnLoad();
            }
        };
        //BackGroundImage.src = "images/BackGround1_1.png";
        //BackGroundImage.src = "images/BackGround1_" + _Themes.toString() + ".png";
        BackGroundImage.src = "images/BackGround1_1.png";
    };
    this.DrawProgress();
};


var DrawBox = function (context, color, x, y, width, height)
{
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
};

var DrawBorder = function (context, color, lineWith, x, y, width, height)
{
    context.strokeStyle = color;
    context.lineWidth = lineWith;
    context.strokeRect(x, y, width, height);
};

var DrawTriangle = function (context, color, x1, y1, x2, y2, x3, y3)
{
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.fill();
}

var SmoothingEnabled = function (context, enable)
{
    context.imageSmoothingEnabled = enable;
    context.webkitImageSmoothingEnabled = enable;
    context.mozImageSmoothingEnabled = enable;
    context.msImageSmoothingEnabled = enable;
    context.oImageSmoothingEnabled = enable;
};

var DrawTitleText = function (context, title1, title2)
{
    var font, size, color, x, y, shadow;

    //font = "Star4000 Large";
    //font = "Star4000 Extended";
    font = "Star4000";
    //size = "16pt";
    //size = "24pt";
    size = "24pt";
    color = "#ffff00";
    shadow = 3;
    x = 170;
    y = 55;

    if (title2)
    {
        DrawText(context, font, size, color, x, y, title1, shadow); y += 30;
        DrawText(context, font, size, color, x, y, title2, shadow); y += 30;
    }
    else
    {
        y += 15;
        DrawText(context, font, size, color, x, y, title1, shadow); y += 30;
    }
};

var UpdateWeatherCanvases = function (WeatherParameters)
{
    if (WeatherParameters == null)
    {
        return;
    }

    $(WeatherParameters.WeatherCanvases).each(function ()
    {
        var WeatherCanvas = this;

        // Attempt to save battery/cpu.
        if (document.elementFromPoint(0, 0) != WeatherCanvas[0])
        {
            return true;
        }

        UpdateWeatherCanvas(WeatherParameters, WeatherCanvas);
    });

    if (WeatherParameters.Progress.GetTotalPercentage() == 100)
    {
        _UpdateWeatherCurrentConditionCounterMs += _UpdateWeatherUpdateMs;
        _UpdateTravelCitiesCounterMs += _UpdateWeatherUpdateMs;
        _UpdateHazardsCounterMs += _UpdateWeatherUpdateMs;
        _UpdateLocalForecastCounterMs += _UpdateWeatherUpdateMs;
        _UpdateCustomScrollTextMs += _UpdateWeatherUpdateMs;
        _UpdateScrollHazardTextMs += _UpdateWeatherUpdateMs;
        //console.log(_UpdateWeatherUpdateMs);
    }
};

var UpdateWeatherCanvas = function (WeatherParameters, Canvas)
{
    var OkToDrawCurrentConditions = true;
    var OkToDrawNoaaImage = true;
    var OkToDrawCurrentDateTime = true;
    var OkToDrawLogoImage = true;
    var OkToDrawCustomScrollText = false;
    var OkToDrawScrollHazardText = false;
    var bottom = undefined;

    var context = Canvas[0].getContext("2d");
    
    if (_ScrollText != "")
    {
        OkToDrawCustomScrollText = true;
    }

    if (_ScrollHazardText == true && WeatherParameters.WeatherHazardConditions.HazardsText != "")
    {
        OkToDrawCustomScrollText = false;
        OkToDrawScrollHazardText = true;
    }

    if (Canvas[0] == canvasProgress[0])
    {
        //OkToDrawCurrentConditions = false;
    }

    if (Canvas[0] == canvasAlmanac[0])
    {
        OkToDrawNoaaImage = false;
    }

    if (Canvas[0] == canvasAlmanacTides[0])
    {
        OkToDrawNoaaImage = false;
    }

    if (Canvas[0] == canvasOutlook[0])
    {
        OkToDrawNoaaImage = false;
    }

    if (Canvas[0] == canvasMarineForecast[0])
    {
        OkToDrawNoaaImage = false;
    }

    if (Canvas[0] == canvasAirQuality[0])
    {
        OkToDrawNoaaImage = false;
    }

    if (Canvas[0] == canvasTravelForecast[0])
    {
        OkToDrawNoaaImage = false;
    }

    if (Canvas[0] == canvasRegionalForecast1[0])
    {
        OkToDrawNoaaImage = false;
    }
    if (Canvas[0] == canvasRegionalForecast2[0])
    {
        OkToDrawNoaaImage = false;
    }
    if (Canvas[0] == canvasRegionalObservations[0])
    {
        OkToDrawNoaaImage = false;
    }

    if (Canvas[0] == canvasLocalRadar[0])
    {
        OkToDrawCurrentConditions = false;
        OkToDrawCurrentDateTime = false;
        OkToDrawNoaaImage = false;
        OkToDrawCustomScrollText = false;
    }

    if (Canvas[0] == canvasHazards[0])
    {
        OkToDrawNoaaImage = false;
        bottom = true;
        OkToDrawLogoImage = false;
    }

    if (OkToDrawCurrentDateTime == true)
    {
        DrawCurrentDateTime(context, bottom);
    }

    if (OkToDrawLogoImage == true)
    {
        DrawLogoImage(context);
    }

    if (OkToDrawNoaaImage == true)
    {
        DrawNoaaImage(context);
    }

    if (OkToDrawCurrentConditions == true)
    {
        DrawCurrentConditions(WeatherParameters, context);
    }

    if (OkToDrawCustomScrollText == true)
    {
        DrawCustomScrollText(WeatherParameters, context);
    }

    if (OkToDrawScrollHazardText == true)
    {
        DrawScrollHazardText(WeatherParameters, context);
    }

};

var DrawCurrentDateTime = function (context, bottom)
{
    if (_WeatherParameters == null || _WeatherParameters.TimeZone == undefined)
    {
        return;
    }

    var font, size, color, x, y, shadow;
    var now, time, h, m, s, date, M, W, D;

    font = "Star4000 Small";
    size = "24pt";
    color = "#ffffff";
    shadow = 2;
    //x = 410;
    //y = 65;
    
    // Clear the date and time area.
    if (bottom)
    {
        DrawBox(context, "rgb(25, 50, 112)", 0, 389, 640, 16);
    }
    else
    {
        context.drawImage(canvasBackGroundDateTime[0], 0, 0, 175, 60, 410, 30, 175, 60);
    }

    // Get the current date and time.
    now = new Date();
    now = ConvertDateToTimeZone(now, _WeatherParameters.TimeZone);

    //time = "11:35:08 PM";
    h = now.getHours();
    m = now.getMinutes();
    s = now.getSeconds();
    time = "";

    if (_Units == Units.English)
    {
        if (h < 10)
        {
            if (h == 0)
            {
                time = "12";
            }
            else
            {
                time += " " + h.toString();
            }
        }
        else if (h > 12)
        {
            if (h - 12 < 10)
            {
                time += " " + (h - 12).toString();
            }
            else
            {
                time += (h - 12).toString();
            }
        }
        else
        {
            time += h.toString();
        }
    }
    else if (_Units == Units.Metric)
    {
        if (h < 10)
        {
            time += " " + h.toString();
        }
        else
        {
            time += h.toString();
        }
    }

    time += ":";
    if (m < 10)
    {
        time += "0";
    }
    time += m.toString() + ":";
    if (s < 10)
    {
        time += "0";
    }
    time += s.toString() + " ";

    if (_Units == Units.English)
    {
        if (h >= 12)
        {
            time += "PM";
        }
        else
        {
            time += "AM";
        }
    }

    if (bottom)
    {
        x = 400;
        y = 402;
    }
    else
    {
        x = 410;
        y = 65;
    }
    if (_Units == Units.Metric)
    {
        x += 45;
    }

    DrawText(context, font, size, color, x, y, time, shadow); //y += 20;

    //date = "SUN NOV  11";
    //date = "";
    if (_Units == Units.English)
    {
        date = " ";
        W = now.getDayShortName().toUpperCase();
        date += W + " ";
        M = now.getMonthShortName().toUpperCase();
        date += M + " ";
        D = now.getDate();
        if (D < 10)
        {
            date += " ";
        }
        //date += " " + D.toString();
        date += D.toString();
    }
    else
    {
        date = " ";
        W = now.getDayShortName().toUpperCase();
        date += W + " ";
        D = now.getDate();
        if (D < 10)
        {
            date += " ";
        }
        date += D.toString();
        M = now.getMonthShortName().toUpperCase();
        date += " " + M;
    }

    if (bottom)
    {
        x = 55;
        y = 402;
    }
    else
    {
        x = 410;
        y = 85;
    }
    DrawText(context, font, size, color, x, y, date, shadow); //y += 20;
};

var DrawNoaaImage = function (context)
{
    if (!_NoaaImage)
    {
        _NoaaImage = new Image();

        _NoaaImage.onload = function ()
        {
            context.drawImage(_NoaaImage, 356, 39);
        };
        //_NoaaImage.src = "Images/noaa4.png";
        _NoaaImage.src = "Images/noaa5.gif";
    }
    else
    {
        context.drawImage(_NoaaImage, 356, 39);
    }
};

var DrawLogoImage = function (context)
{
    if (!_LogoImage)
    {
        _LogoImage = new Image();

        _LogoImage.onload = function ()
        {
            //SmoothingEnabled(context, true);
            context.drawImage(_LogoImage, 50, 30, 85, 67);
        };
        //LogoImage.src = "Images/Logo1.png";
        //_LogoImage.src = "Images/Logo3.gif";
        _LogoImage.src = "Images/Logo3.png";
    }
    else
    {
        context.drawImage(_LogoImage, 50, 30, 85, 67);
    }
};

var DrawCurrentConditions = function (WeatherParameters, context)
{
    var Humidity;
    var DewPoint;
    var Temperature;
    var TemperatureUnit;
    var HeatIndex;
    var WindChill;
    var Pressure;
    var PressureUnit;
    var PressureDirection;
    var WindSpeed;
    var WindDirection;
    var WindGust;
    var WindUnit;
    var Visibility;
    var VisibilityUnit;
    var Ceiling;
    var CeilingUnit;
    var PrecipitationTotal;
    var PrecipitationTotalUnit;

    var font, size, color, x, y, shadow;
    var text;

    font = "Star4000";
    size = "24pt";
    color = "#ffffff";
    shadow = 2;
    x = 70;
    y = 430;

    if (WeatherParameters.Progress.GetTotalPercentage() != 100)
    {
        return;
    }

    // Clear the date and time area.
    context.drawImage(canvasBackGroundCurrentConditions[0], 0, 0, 640, 75, 0, 405, 640, 75);

    var WeatherCurrentConditions = WeatherParameters.WeatherCurrentConditions;
    var WeatherMonthlyTotals = WeatherParameters.WeatherMonthlyTotals;

    switch (_Units)
    {
        case Units.English:
            Temperature = WeatherCurrentConditions.Temperature;
            TemperatureUnit = "F";
            HeatIndex = WeatherCurrentConditions.HeatIndex;
            WindChill = WeatherCurrentConditions.WindChill;
            Humidity = WeatherCurrentConditions.Humidity;
            DewPoint = WeatherCurrentConditions.DewPoint;
            Pressure = WeatherCurrentConditions.Pressure;
            PressureDirection = WeatherCurrentConditions.PressureDirection;
            WindSpeed = WeatherCurrentConditions.WindSpeed;
            WindGust = WeatherCurrentConditions.WindGust;
            WindDirection = WeatherCurrentConditions.WindDirection;
            WindUnit = " MPH";
            VisibilityUnit = " mi.";
            Visibility = WeatherCurrentConditions.Visibility;
            Ceiling = WeatherCurrentConditions.Ceiling;
            CeilingUnit = " ft.";
            PrecipitationTotal = WeatherMonthlyTotals.PrecipitationTotal;
            PrecipitationTotalUnit = " in";
            break;

        case Units.Metric:
            Temperature = WeatherCurrentConditions.TemperatureC;
            TemperatureUnit = "C";
            HeatIndex = WeatherCurrentConditions.HeatIndexC;
            WindChill = WeatherCurrentConditions.WindChillC;
            Humidity = WeatherCurrentConditions.Humidity;
            DewPoint = WeatherCurrentConditions.DewPointC;
            Pressure = WeatherCurrentConditions.PressureC;
            PressureDirection = WeatherCurrentConditions.PressureDirection;
            WindSpeed = WeatherCurrentConditions.WindSpeedC;
            WindGust = WeatherCurrentConditions.WindGustC;
            WindDirection = WeatherCurrentConditions.WindDirection;
            WindUnit = " KPH";
            VisibilityUnit = " km.";
            Visibility = WeatherCurrentConditions.VisibilityC;
            Ceiling = WeatherCurrentConditions.CeilingC;
            CeilingUnit = " m.";
            PrecipitationTotal = WeatherMonthlyTotals.PrecipitationTotalC;
            PrecipitationTotalUnit = " cm";
            break;
    }

    if (_UpdateWeatherCurrentConditionCounterMs >= 4000)
    {
        _UpdateWeatherCurrentConditionCounterMs = 0;
        _UpdateWeatherCurrentConditionType++;
        if (_UpdateWeatherCurrentConditionType > CurrentConditionTypes.MonthPrecipitation)
        {
            _UpdateWeatherCurrentConditionType = CurrentConditionTypes.Title;
        }
    }

    switch(_UpdateWeatherCurrentConditionType)
    {
        case CurrentConditionTypes.Title:
            // mjb 06/01/19 text = "Conditions at " + WeatherCurrentConditions.StationName;
            text = "Conditions at " + WeatherCurrentConditions.StationName.substr(0, 20); // mjb 06/01/19
            break;
        case CurrentConditionTypes.Conditions:
            text = WeatherCurrentConditions.Conditions;
            if (text.length > 37)
            {
                text = WeatherCurrentConditions.ShortConditions;
                if (text.length > 37)
                {
                    text = text.substr(0, 37);
                }
            }
            break;
        case CurrentConditionTypes.Temperature:
            text = "Temp: " + Temperature + String.fromCharCode(176) + TemperatureUnit;
            if (HeatIndex != Temperature)
            {
                text += "    ";
                text += "Heat Index: " + HeatIndex + String.fromCharCode(176) + TemperatureUnit;
            }
            else if (WindChill != "" && WindChill < Temperature)
            {
                text += "    ";
                text += "Wind Chill: " + WindChill + String.fromCharCode(176) + TemperatureUnit;
            }
            break;
        case CurrentConditionTypes.HumidityDewpoint:
            text = "Humidity: " + Humidity + "%";
            text += "  ";
            text += "Dewpoint: " + DewPoint + String.fromCharCode(176) + TemperatureUnit;
            break;
        case CurrentConditionTypes.BarometricPressure:
            text = "Barometric Pressure: " + Pressure + " " + PressureDirection;
            break;
        case CurrentConditionTypes.Wind:
            if (WindSpeed > 0)
            {
                text = "Wind: " + WindDirection + " " + WindSpeed + WindUnit;
            }
            else if (WindSpeed == "NA")
            {
                text = "Wind: NA";
            }
            else
            {
                text = "Wind: Calm";
            }
            if (WindGust != "")
            {
                text += "  ";
                text += "Gusts to " + WindGust;
            }
            break;
        case CurrentConditionTypes.VisibilityCeiling:
            text = "Visib: " + parseInt(Visibility).toString() + VisibilityUnit;
            text += "  ";
            text += "Ceiling: " + (Ceiling == "" ? "Unlimited" : Ceiling + CeilingUnit);
            break;
        case CurrentConditionTypes.MonthPrecipitation:
            if (PrecipitationTotal.toString() == "")
            {
                _UpdateWeatherCurrentConditionCounterMs += 4000;
                DrawCurrentConditions(WeatherParameters, context);
                return;
            }

            // mjb 10/02/19 Begin
            //text = WeatherMonthlyTotals.MonthName + " Precipitation: " + PrecipitationTotal.toString() + PrecipitationTotalUnit;

            if (PrecipitationTotal.toString() == "T")
            {
                text = WeatherMonthlyTotals.MonthName + " Precipitation: Trace";
            }
            else
            {
                text = WeatherMonthlyTotals.MonthName + " Precipitation: " + PrecipitationTotal.toString() + PrecipitationTotalUnit;
            }

            // mjb 10/02/19 End
            break;
    }

    // Draw the current condition.
    DrawText(context, font, size, color, x, y, text, shadow);

    //_UpdateWeatherCurrentConditionCounterMs += _UpdateWeatherUpdateMs;
    //console.log(_UpdateWeatherUpdateMs);
};

var DrawCustomScrollText = function (WeatherParameters, context)
{
    var font, size, color, x, y, shadow;
    var text;

    font = "Star4000";
    size = "24pt";
    color = "#ffffff";
    shadow = 2;
    x = 640;
    y = 430;

    if (WeatherParameters.Progress.GetTotalPercentage() != 100)
    {
        return;
    }

    // Clear the date and time area.
    context.drawImage(canvasBackGroundCurrentConditions[0], 0, 0, 640, 75, 0, 405, 640, 75);

    text = _ScrollText;

    x = 640 - ((_UpdateCustomScrollTextMs / _UpdateWeatherUpdateMs) * 5);
    if (x < ((text.length + 10) * 15 * -1)) // Wait an extra 5 characters.
    {
        _UpdateCustomScrollTextMs = 0;
        x = 640;
    }

    // Draw the current condition.
    DrawText(context, font, size, color, x, y, text, shadow);

};

var DrawScrollHazardText = function (WeatherParameters, context)
{
    var font, size, color, x, y, shadow;
    var text;

    font = "Star4000";
    size = "24pt";
    color = "#ffffff";
    shadow = 2;
    x = 640;
    y = 430;

    if (WeatherParameters.Progress.GetTotalPercentage() != 100)
    {
        return;
    }

    // Clear the date and time area.
    DrawBox(context, "rgb(112, 35, 35)", 0, 405, 640, 75);

    var WeatherHazardConditions = WeatherParameters.WeatherHazardConditions;

    var text = "";
    if (_Units == Units.Metric)
    {
        text = WeatherHazardConditions.HazardsScrollTextC;
    }
    else
    {
        text = WeatherHazardConditions.HazardsScrollText;
    }

    x = 640 - ((_UpdateScrollHazardTextMs / _UpdateWeatherUpdateMs) * 5);
    if (x < ((text.length + 10) * 15 * -1)) // Wait an extra 5 characters.
    {
        _UpdateScrollHazardTextMs = 0;
        x = 640;
    }

    if (_UpdateScrollHazardTextMs == 0)
    {
        //console.log("Hazard text reseted");

        if (IsAudioPlaying() == true)
        {
            // Start the beeping sound
            LoadBeep();
        }
    }

    // Draw the text.
    DrawText(context, font, size, color, x, y, text, shadow);
};

$.ajaxCORS = function (e)
{
    // If error 403 is being returned from the server, you may need to update the switch block under HOST CHECK in the CORS codebase.

    var Type = e.type;
    var DataType = e.dataType;
    var CrossDomain = e.crossDomain;
    var Cache = e.cache;
    var Success = e.success;
    var Error = e.error;
    var Url = e.url;

    var Methods = [
        //{
        //    Url: "https://crossorigin.me/",
        //    EncodeURIComponent: false,
        //},
        //{
        //    Url: "http://anyorigin.com/go?url=",
        //    EncodeURIComponent: false,
        //},
        //{
        //    Url: "http://www.whateverorigin.org/get?url=",
        //    EncodeURIComponent: true,
        //},

        // Make this one last
        {
            Url: "cors/?u=",
            EncodeURIComponent: true,
        },
    ];
    var MethodIndex = 0;

    var DoAjax = function ()
    {
        var Method = Methods[MethodIndex];
        Url = Method.Url;
        
        if (Method.EncodeURIComponent == true)
        {
            Url += encodeURIComponent(e.url);
        }
        else
        {
            Url += e.url;
        }

        //console.log("CORS: " + e.url);

        $.ajax({
            type: Type,
            url: Url,
            dataType: DataType,
            crossDomain: CrossDomain,
            cache: Cache,
            success: Success,
            error: function (xhr, error, errorThrown)
            {
                MethodIndex++;

                if (MethodIndex > Methods.length - 1)
                {
                    if (Error) Error(xhr, error, errorThrown);
                    return;
                }

                DoAjax();
            }
        });
    };
    DoAjax();

};

var _CallBack = null;

var SetCallBack = function (e)
{
    _CallBack = e.CallBack;
};

var Units = {
    English: 0,
    Metric: 1,
};
var _Units = Units.English;

var Themes = {
    ThemeA: 1, // Classic
    ThemeB: 2, // Sea Foam
    ThemeC: 3, // Comsic
    ThemeD: 4, // Dark
};
var _Themes = Themes.ThemeA;
var _TopColor1 = "rgb(192, 91, 2)";
var _TopColor2 = "rgb(72, 34, 64)";
var _SideColor1 = "rgb(46, 18, 80)";
var _SideColor2 = "rgb(192, 91, 2)";

var _ScrollText = "";
var _ScrollHazardText = false;

var _DontLoadGifs = false;
var _RefreshGifs = false;

var AssignUnits = function (e)
{
    switch (e.Units)
    {
        case "ENGLISH":
            _Units = Units.English;
            break;
        case "METRIC":
            _Units = Units.Metric;
            break;
    }

    //_DontLoadGifs = true;
    //PopulateCurrentConditions(_WeatherParameters);
    //PopulateRegionalObservations(_WeatherParameters);
    ////PopulateExtendedForecast(_WeatherParameters);
    //PopulateExtendedForecast(_WeatherParameters, 1);
    //PopulateExtendedForecast(_WeatherParameters, 2);
    //PopulateAlmanacInfo(_WeatherParameters);
    //PopulateTideInfo(_WeatherParameters);
    //PopulateTravelCities(_WeatherParameters);
    //ShowRegionalMap(_WeatherParameters, true);
    //ShowRegionalMap(_WeatherParameters);
    //PopulateLocalForecast(_WeatherParameters);
    //PopulateHazardConditions(_WeatherParameters);
    //UpdateWeatherCanvases(_WeatherParameters);
    //_DontLoadGifs = false;

    RefreshSegments();
};

var AssignThemes = function (e)
{
    switch (e.Themes)
    {
        case "THEMEA":
            _Themes = Themes.ThemeA;
            _TopColor1 = "rgb(192, 91, 2)";
            _TopColor2 = "rgb(72, 34, 64)";
            _SideColor1 = "rgb(46, 18, 80)";
            _SideColor2 = "rgb(192, 91, 2)";
            break;
        case "THEMEB":
            _Themes = Themes.ThemeB;
            _TopColor1 = "rgb(0, 253, 127)";
            _TopColor2 = "rgb(46, 21, 82)";
            _SideColor1 = "rgb(46, 19, 81)";
            _SideColor2 = "rgb(0, 254, 128)";
            break;
        case "THEMEC":
            _Themes = Themes.ThemeC;
            _TopColor1 = "rgb(114, 27, 200)";
            _TopColor2 = "rgb(73, 34, 66)";
            _SideColor1 = "rgb(46, 18, 81)";
            _SideColor2 = "rgb(115, 27, 201)";
            break;
        case "THEMED":
            _Themes = Themes.ThemeD;
            _TopColor1 = "rgb(96, 96, 96)";
            _TopColor2 = "rgb(0, 0, 0)";
            _SideColor1 = "rgb(0, 0, 0)";
            _SideColor2 = "rgb(128, 128, 128)";
            break;
    }

    RefreshSegments();
};

var RefreshSegments = function ()
{
    _DontLoadGifs = true;

    if (_WeatherParameters)
    {
        _WeatherParameters.Progress.DrawProgress();
    }

    PopulateCurrentConditions(_WeatherParameters);
    PopulateRegionalObservations(_WeatherParameters);
    //PopulateExtendedForecast(_WeatherParameters);
    PopulateExtendedForecast(_WeatherParameters, 1);
    PopulateExtendedForecast(_WeatherParameters, 2);
    PopulateAlmanacInfo(_WeatherParameters);
    PopulateTideInfo(_WeatherParameters);
    PopulateOutlook(_WeatherParameters);
    PopulateMarineForecast(_WeatherParameters);
    PopulateAirQuality(_WeatherParameters);
    PopulateTravelCities(_WeatherParameters);
    ShowRegionalMap(_WeatherParameters, true);
    ShowRegionalMap(_WeatherParameters, false, true);
    ShowRegionalMap(_WeatherParameters);
    PopulateLocalForecast(_WeatherParameters);
    PopulateHazardConditions(_WeatherParameters);
    UpdateWeatherCanvases(_WeatherParameters);

    _DontLoadGifs = false;

    _RefreshGifs = true;
    window.setTimeout(function () { _RefreshGifs = false; }, 200);
};

var AudioPlayToggle = function ()
{
    //var audio = $("#audMusic")[0];

    _IsAudioPlaying = !(_IsAudioPlaying);

    if (_IsAudioPlaying == true)
    {
        _AudioPlayIntervalId = window.setIntervalWorker(function ()
        {
            if (_WeatherParameters.Progress.GetTotalPercentage() != 100)
            {
                return;
            }

            window.clearIntervalWorker(_AudioPlayIntervalId);
            _AudioPlayIntervalId = null;

            if (_AudioContext == null && audMusic.attr("src") == "")
            {
                ////audio.src = "Audio/Andrew Korus - Hello There.mp3";
                //audio.src = GetNextMusicUrl();
                //audio.load();
                LoadAudio(GetNextMusicUrl());
                return;
            }
            //audio.volume = 1.0;
            //audio.play();
            PlayAudio();
            //RefreshStateOfMusicAudio();

            if (_BeepRefreshIntervalId)
            {
                PlayBeep();
            }

        }, _AudioPlayInterval);
    }
    else
    {
        if (_AudioPlayIntervalId)
        {
            window.clearIntervalWorker(_AudioPlayIntervalId);
            _AudioPlayIntervalId = null;
        }

        //audio.pause();
        PauseAudio();

        if (_BeepRefreshIntervalId)
        {
            PauseBeep();
        }
    }

    if (_CallBack) _CallBack({ Status: "ISAUDIOPLAYING", Value: _IsAudioPlaying });

};

var IsAudioPlaying = function ()
{
    return _IsAudioPlaying;
};

var audMusic_OnError = function ()
{
    //RefreshStateOfMusicAudio();
};

var RefreshStateOfMusicAudio = function ()
{
    var IsAudioPlaying = _IsAudioPlaying;

    if (window.AudioContext)
    {
        _IsAudioPlaying = (_AudioContext.state == "running" && _AudioDuration != 0);
    }
    else
    {
        var audio = audMusic[0];
        _IsAudioPlaying = (audio.paused == false && _AudioDuration != 0);
    }

    if (IsAudioPlaying != _IsAudioPlaying)
    {
        if (_CallBack) _CallBack({ Status: "ISAUDIOPLAYING", Value: _IsAudioPlaying });
    }
};

var AudioOnTimeUpdate = function ()
{
    if (window.AudioContext)
    {
        _AudioCurrentTime = _AudioContext.currentTime;
    }
    else
    {
        //audio.currentTime
        var audio = audMusic[0];

        //console.log(audio.currentTime.toString() + " " + audio.duration.toString());
        _AudioCurrentTime = audio.currentTime;
    }
    //console.log(_AudioCurrentTime.toString() + " " + _AudioDuration.toString());

    if (_IsAudioPlaying == true)
    {
        var EndingOffsetInSeconds = 3;
        var VolumeDecrementBy = 0.0;
        var IntervalMs = 50;

        VolumeDecrementBy = 1 / ((EndingOffsetInSeconds * 1000) / IntervalMs);

        //if (_AudioCurrentTime >= (_AudioDuration - 2))
        //if (_AudioCurrentTime >= 10)
        if (_AudioCurrentTime >= (_AudioDuration - EndingOffsetInSeconds))
        {
            if (!_AudioFadeOutIntervalId)
            {
                //var AudioFadeOutInterval = new Worker("Scripts/Interval.js");
                //AudioFadeOutInterval.onmessage = function (e)
                //{
                //    switch (e.data.Action)
                //    {
                //        case "SET":
                //            _AudioFadeOutIntervalId = e.data.Id;
                //            break;
                //        case "ELASPED":
                //            if (e.data.Id == _AudioFadeOutIntervalId)
                //            {
                //                var volume = VolumeAudio();
                //                volume -= VolumeDecrementBy;
                //                VolumeAudio(volume);

                //                if (volume <= 0)
                //                {
                //                    AudioFadeOutInterval.postMessage({ Action: "CLEAR", Id: _AudioFadeOutIntervalId });
                //                    _AudioFadeOutIntervalId = null;

                //                    if (_IsAudioPlaying == true)
                //                    {
                //                        LoadAudio(GetNextMusicUrl());
                //                    }
                //                }
                //            }
                //            break;
                //    }
                //};
                //AudioFadeOutInterval.postMessage({ Action: "SET", Ms: IntervalMs });

                _AudioFadeOutIntervalId = window.setIntervalWorker(function ()
                {
                    var volume = VolumeAudio();
                    volume -= VolumeDecrementBy;
                    VolumeAudio(volume);

                    if (volume <= 0)
                    {
                        window.clearIntervalWorker(_AudioFadeOutIntervalId);
                        _AudioFadeOutIntervalId = null;

                        if (_IsAudioPlaying == true)
                        {
                            LoadAudio(GetNextMusicUrl());
                        }
                    }
                }, IntervalMs);

                //_AudioFadeOutIntervalId = window.setInterval(function ()
                //{
                //    //var volume = Math.round2(audio.volume, 2);
                //    //volume -= 0.05;
                //    //audio.volume = volume;
                //    var volume = VolumeAudio();
                //    volume -= VolumeDecrementBy;
                //    VolumeAudio(volume);

                //    //if (volume == 0)
                //    if (volume <= 0)
                //    {
                //        window.clearInterval(_AudioFadeOutIntervalId);
                //        _AudioFadeOutIntervalId = null;

                //        //audio.pause();
                //        //audio.volume = 1.0;
                //        //audio.src = GetNextMusicUrl();
                //        //audio.load();
                //        //audio.play();

                //        //PauseAudio();
                //        LoadAudio(GetNextMusicUrl());
                //        //PlayAudio();

                //        //RefreshStateOfMusicAudio();
                //    }
                //}, IntervalMs);
            }
        }
    }

};

var PopulateMusicUrls = function ()
{
    _MusicUrls = [];
    _MusicUrls.push("Audio/Andrew Korus - Hello There.mp3");
    _MusicUrls.push("Audio/Ficara - Stormy Weather.mp3");
    _MusicUrls.push("Audio/Incognito - Larc En Ciel De Miles.mp3");
    _MusicUrls.push("Audio/Ozzie Ahlers - Fingerpainting.mp3");
    _MusicUrls.push("Audio/Ray Obiedo - Blue Kiss.mp3");
    _MusicUrls.push("Audio/Richard Tyznik - Hi Times.mp3");
    _MusicUrls.push("Audio/Torcuato Mariano - Ocean Way.mp3");
    _MusicUrls.push("Audio/Gota - All Alone.mp3");
    _MusicUrls.push("Audio/Ficara - High Tides Of Maui.mp3");
    _MusicUrls.push("Audio/Chris Camozzi - Swing Shift.mp3");
    _MusicUrls.push("Audio/Brian Hughes - StringBean.mp3");
    _MusicUrls.push("Audio/Brian Hughes - Postcard From Brazil.mp3");
    _MusicUrls.push("Audio/Brian Hughes - One 2 One.mp3");
    _MusicUrls.push("Audio/Brian Hughes - Here We Go.mp3");
    _MusicUrls.push("Audio/Brian Hughes - Three Graces.mp3");
    _MusicUrls.push("Audio/Ficara - Friends Forever.mp3");
    _MusicUrls.push("Audio/Physical Therapy - What The Flush.mp3");
    _MusicUrls.push("Audio/Trammell Starks - The Blizzard Song.mp3");
    _MusicUrls.push("Audio/Terry Coleman - Just Groovin.mp3");
    _MusicUrls.push("Audio/Terry Coleman - Autumn Dance.mp3");
    _MusicUrls.push("Audio/Terry Coleman - Amazed.mp3");
    _MusicUrls.push("Audio/Ray Obiedo - Sienna.mp3");
    _MusicUrls.push("Audio/Incognito - Sunchild.mp3");
    _MusicUrls.push("Audio/Ficara - Gliding.mp3");
    _MusicUrls.push("Audio/Ficara - Craig.mp3");
    _MusicUrls.push("Audio/Eddie Reasoner - Sea Breeze.mp3");
    _MusicUrls.push("Audio/Chris Camozzi - My Dancing Heart.mp3");
    _MusicUrls.push("Audio/Chris Camozzi - Suede.mp3");
    _MusicUrls.push("Audio/Joe Sample - Rainbow Seeker.mp3");
    _MusicUrls.push("Audio/Norman Brown - Celebration.mp3");
    _MusicUrls.push("Audio/Wayne Gerard - Aint She Sweet.mp3");
    _MusicUrls.push("Audio/Wayman Tisdale - Brazilia.mp3");
    _MusicUrls.push("Audio/The Rippingtons - In Another Life.mp3");
    _MusicUrls.push("Audio/The Rippingtons - Life In The Tropics.mp3");
    _MusicUrls.push("Audio/Chris Camozzi - Hangin Out.mp3");
    _MusicUrls.push("Audio/Bryan Savage - Two Cool.mp3");
    _MusicUrls.push("Audio/Trammell Starks - 50 Below.mp3");
    _MusicUrls.push("Audio/Trammell Starks - After Midnight.mp3");
    _MusicUrls.push("Audio/Trammell Starks - After The Rain.mp3");
    _MusicUrls.push("Audio/Trammell Starks - All I Need To Know.mp3");
    // GIT-33 _MusicUrls.push("Audio/Trammell Starks - All That Jazz.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Autumn Blue.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Better Than Nothing.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Bobbys Theme.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Broken Record.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Crazy Pianos.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Desert Nights.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Here Comes The Rain.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Im So Dizzy.mp3");
    _MusicUrls.push("Audio/Trammell Starks - If You Only Knew.mp3");
    // GIT-33 _MusicUrls.push("Audio/Trammell Starks - Island Groove.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Just For The Moment.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Midnight Rain.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Pier 32.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Rainbeat.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Road Trip.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Rollercoaster Ride.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Round And Round.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Season On Edge.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Slightly Blued.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Someday.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Something About You.mp3");
    _MusicUrls.push("Audio/Trammell Starks - The End.mp3");
    _MusicUrls.push("Audio/Trammell Starks - The Last Song.mp3");
    _MusicUrls.push("Audio/Trammell Starks - The Mist.mp3");
    _MusicUrls.push("Audio/Trammell Starks - The Only One For Me.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Under The Influence.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Ups And Downs.mp3");
    _MusicUrls.push("Audio/Trammell Starks - Water Colors.mp3");
    //_MusicUrls.push("Audio/.mp3");

    _MusicUrlsTemp = _MusicUrls.slice(0);
};

var GetNextMusicUrl = function ()
{
    if (_MusicUrlsTemp.length < 1) { _MusicUrlsTemp = _MusicUrls.slice(0); }
    var index = Math.floor(Math.random() * _MusicUrlsTemp.length);
    var item = _MusicUrlsTemp[index];
    _MusicUrlsTemp.splice(index, 1);
    return item;
};

var LoadAudio = function(Url)
{
    if (_AudioRefreshIntervalId)
    {
        window.clearIntervalWorker(_AudioRefreshIntervalId);
        _AudioRefreshIntervalId = null;
    }

    if (window.AudioContext)
    {
        if (_AudioContext)
        {
            _AudioContext.close();
            _AudioContext = null;
            //_AudioContext = new AudioContext();
            //_AudioContext.ontimeupdate = AudioOnTimeUpdate;
            //_AudioContext.onplay = RefreshStateOfMusicAudio;
            //_AudioContext.onpause = RefreshStateOfMusicAudio;
            //_AudioContext.onplaying = RefreshStateOfMusicAudio;
            //_AudioContext.onstatechange = RefreshStateOfMusicAudio;
        }
        if (_AudioBufferSource)
        {
            _AudioBufferSource.stop();
            _AudioBufferSource = null;
        }
        _AudioContext = new AudioContext();
        _AudioDuration = 0;
        _AudioCurrentTime = 0;

        var req = new XMLHttpRequest();
        //req.open("GET", "Audio/Trammell Starks - The Blizzard Song.mp3", true);
        //req.open("GET", "Audio/Brian Hughes - Here We Go.mp3", true);
        req.open("GET", Url, true);
        req.responseType = "arraybuffer";
        req.onload = function ()
        {
            //decode the loaded data 
            _AudioContext.decodeAudioData(req.response, function (buffer)
            {
                //create a source node from the buffer 
                _AudioBufferSource = _AudioContext.createBufferSource();
                _AudioBufferSource.buffer = buffer;
                ////connect to the final output node (the speakers) 
                //_AudioBufferSource.connect(_AudioContext.destination);

                _AudioDuration = buffer.duration;
                _AudioCurrentTime = 0;

                //create a gain node
                _AudioGain = _AudioContext.createGain();
                _AudioBufferSource.connect(_AudioGain);
                _AudioGain.connect(_AudioContext.destination);
                _AudioGain.gain.value = 1.00;
                //_AudioGain.gain.value = 0.1;

                //PlayAudio();
                _AudioBufferSource.start();
                _AudioContext.resume();

                _AudioRefreshIntervalId = window.setIntervalWorker(function ()
                {
                    AudioOnTimeUpdate();
                    RefreshStateOfMusicAudio();
                }, 500);

            });
        };
        req.send();
    }
    else
    {
        var audio = audMusic[0];

        PauseAudio();

        _AudioDuration = 0;
        _AudioCurrentTime = 0;

        audio.volume = 1.00;
        audio.oncanplaythrough = function ()
        {
            _AudioDuration = audio.duration;
            _AudioCurrentTime = 0;

            PlayAudio();

            _AudioRefreshIntervalId = window.setIntervalWorker(function ()
            {
                AudioOnTimeUpdate();
                RefreshStateOfMusicAudio();
            }, 500);

        };
        audio.src = Url;
        audio.load();
    }
};
var PlayAudio = function()
{
    if (window.AudioContext)
    {
        if (_AudioDuration != 0)
        {
            //_AudioBufferSource.start(0, _AudioCurrentTime, _AudioDuration);
            _AudioContext.resume();
        }
    }
    else
    {
        var audio = audMusic[0];
        audio.play();
    }
};
var PauseAudio = function()
{
    if (window.AudioContext)
    {
        if (_AudioDuration != 0)
        {
            //_AudioBufferSource.stop();
            _AudioContext.suspend();
        }
    }
    else
    {
        var audio = audMusic[0];
        audio.pause();
    }
};
var VolumeAudio = function(vol)
{
    var volume = -1;

    if (window.AudioContext)
    {
        if (_AudioGain)
        {
            if (vol != undefined)
            {
                _AudioGain.gain.value = vol;
            }
            //volume = Math.round2(_AudioGain.gain.value, 2);
            volume =_AudioGain.gain.value;
        }
    }
    else
    {
        var audio = audMusic[0];
        if (vol != undefined)
        {
            audio.volume = vol;
        }
        //volume = Math.round2(audio.volume, 2);
        volume = audio.volume;
    }

    return volume;
}

var NarrationPlayToggle = function ()
{
    _IsNarrationPlaying = !(_IsNarrationPlaying);

    if (_IsNarrationPlaying == true)
    {
        if (!window.speechSynthesis)
        {
            _IsNarrationPlaying = false;
            return;
        }

        if (_OperatingSystem == OperatingSystems.iOS)
        {
            _IsNarrationPlaying = false;
            return;
        }

        _NarrationPlayIntervalId = window.setIntervalWorker(function ()
        {
            //if (_WeatherParameters.Progress.GetTotalPercentage() != 100)
            //{
            //    return;
            //}

            window.clearIntervalWorker(_NarrationPlayIntervalId);
            _NarrationPlayIntervalId = null;

            _Utterance = new SpeechSynthesisUtterance();

            _Utterance.lang = "en-US";
            _Utterance.volume = 1.0;
            _Utterance.rate = 0.9;
            _Utterance.pitch = 1.0;
            //_Utterance.text = GetNarrationText();

            //SelectVoice(_Utterance);
            //_Utterance.onend = function ()
            //{
            //    console.log("Narration Finished.");
            //};

            //window.speechSynthesis.speak(_Utterance);
            SpeakUtterance();

        }, 100);
    }
    else
    {
        if (_NarrationPlayIntervalId)
        {
            window.clearIntervalWorker(_NarrationPlayIntervalId);
            _NarrationPlayIntervalId = null;
        }
        if (window.speechSynthesis.speaking == true)
        {
            window.speechSynthesis.cancel();
        }
        _IsSpeaking = false;
    }

    if (_CallBack) _CallBack({ Status: "ISNARRATIONPLAYING", Value: _IsNarrationPlaying });

};

var IsNarrationPlaying = function ()
{
    return _IsNarrationPlaying;
};

var SpeakUtterance = function ()
{
    if (_IsNarrationPlaying == false)
    {
        return;
    }

    var CurrentUtteranceId = new Date().getTime();
    _CurrentUtteranceId = CurrentUtteranceId;

    if (window.speechSynthesis.speaking == true)
    {
        window.speechSynthesis.cancel();
    }

    var Text = GetNarrationText();
    if (Text == "")
    {
        return;
    }
    console.log("Speak Utterance: '" + Text + "'");

    var Sentences = Text.split(".");
    var SentenceIndex = -1;

    var SpeakNextSentence = function()
    {
        if (_IsNarrationPlaying == false)
        {
            console.log("_IsNarrationPlaying == false.");
            _IsSpeaking = false;
            return;
        }

        if (CurrentUtteranceId != _CurrentUtteranceId)
        {
            console.log("CurrentUtteranceId (" + CurrentUtteranceId + ") != _CurrentUtteranceId (" + _CurrentUtteranceId + ")");
            return;
        }

        SentenceIndex++;
        if (SentenceIndex > Sentences.length - 1)
        {
            console.log("Narration Finished.");
            _IsSpeaking = false;
            return;
        }

        var Sentence = Sentences[SentenceIndex];

        _CurrentUtterance = new SpeechSynthesisUtterance();
        _CurrentUtterance.text = Sentence;
        _CurrentUtterance.onend = SpeakNextSentence;
        _CurrentUtterance.rate = _Utterance.rate;
        _CurrentUtterance.pitch = _Utterance.pitch;
        _CurrentUtterance.volume = _Utterance.volume;

        window.speechSynthesis.speak(_CurrentUtterance);
        console.log("Speaking '" + Sentence + "'");
        _IsSpeaking = true;
    };

    //SpeakNextSentence();
    setTimeout(function () { SpeakNextSentence(); }, 500);

};

var GetNarrationText = function ()
{
    var CanvasType = Math.floor(_CurrentPosition);
    var SubCanvasType = Math.round2((_CurrentPosition - CanvasType), 1) * 10;

    var Temperature;
    var Text = "";

    switch (CanvasType)
    {
        case CanvasTypes.CurrentWeather:
            var WeatherCurrentConditions = _WeatherParameters.WeatherCurrentConditions;

            switch (_Units)
            {
                case Units.English:
                    Temperature = WeatherCurrentConditions.Temperature;
                    HeatIndex = WeatherCurrentConditions.HeatIndex;
                    WindChill = WeatherCurrentConditions.WindChill;
                    Humidity = WeatherCurrentConditions.Humidity;
                    DewPoint = WeatherCurrentConditions.DewPoint;
                    Pressure = WeatherCurrentConditions.Pressure;
                    PressureDirection = WeatherCurrentConditions.PressureDirection;
                    PressureUnit = " inches ";
                    WindSpeed = WeatherCurrentConditions.WindSpeed;
                    WindGust = WeatherCurrentConditions.WindGust;
                    WindDirection = WeatherCurrentConditions.WindDirection;
                    WindUnit = " miles per hour ";
                    VisibilityUnit = " miles ";
                    Visibility = WeatherCurrentConditions.Visibility;
                    Ceiling = WeatherCurrentConditions.Ceiling;
                    CeilingUnit = " feet ";
                    break;
                case Units.Metric:
                    Temperature = WeatherCurrentConditions.TemperatureC.toString();
                    HeatIndex = WeatherCurrentConditions.HeatIndexC.toString();
                    WindChill = WeatherCurrentConditions.WindChillC.toString();
                    Humidity = WeatherCurrentConditions.Humidity.toString();
                    DewPoint = WeatherCurrentConditions.DewPointC.toString();
                    Pressure = WeatherCurrentConditions.PressureC.toString();
                    PressureDirection = WeatherCurrentConditions.PressureDirection;
                    PressureUnit = " millibars ";
                    WindSpeed = WeatherCurrentConditions.WindSpeedC.toString();
                    WindGust = WeatherCurrentConditions.WindGustC.toString();
                    WindDirection = WeatherCurrentConditions.WindDirection;
                    WindUnit = " kilometers per hour ";
                    VisibilityUnit = " kilometers ";
                    Visibility = WeatherCurrentConditions.VisibilityC.toString();
                    Ceiling = WeatherCurrentConditions.CeilingC.toString();
                    CeilingUnit = " meters ";
                    break;
            }

            Text += "The current conditions at " + WeatherCurrentConditions.StationName + ". ";
            Text += WeatherCurrentConditions.Conditions + ". ";
            Text += Temperature.toString().replaceAll(".", " point ") + " degrees ";

            if (HeatIndex != Temperature)
            {
                Text += "with a heat index of " + HeatIndex.toString().replaceAll(".", " point ") + " degrees ";
            }
            else if (WindChill != "" && WindChill < Temperature)
            {
                Text += "with a wind chill of " + WindChill.toString().replaceAll(".", " point ") + " degrees";
            }
            Text += ". ";

            if (WindSpeed > 0)
            {
                Text += "Winds " + GetWindDirectionWords(WindDirection) + " at " + WindSpeed + WindUnit;
            }
            else if (WindSpeed == "NA")
            {
                Text += "Winds are not available ";
            }
            else
            {
                Text += "Winds are calm ";
            }
            if (WindGust != "")
            {
                Text += " gusts to " + WindGust;
            }
            Text += ". ";

            Text += "Humidity is " + Humidity.toString() + " percent. ";
            Text += "Dewpoint is " + DewPoint.toString().replaceAll(".", " point ") + " degrees. ";

            Text += "Ceiling  is " + (Ceiling == "" ? "Unlimited" : Ceiling + CeilingUnit) + ". ";
            Text += "Visibility is " + parseInt(Visibility).toString() + VisibilityUnit + ". ";

            Text += "Barometric Pressure is " + Pressure.replaceAll(".", " point ") + " " + PressureUnit + " and ";
            switch (PressureDirection)
            {
                case "R":
                    Text += "rising";
                    break;
                case "F":
                    Text += "falling";
                    break;
                case "R":
                    Text += "steady";
                    break;
            }
            Text += ". ";

            break;

        case CanvasTypes.LatestObservations:
            var WeatherCurrentRegionalConditions = _WeatherParameters.WeatherCurrentRegionalConditions;
            var SortedArray = WeatherCurrentRegionalConditions.SortedArray;

            Text += "Latest observations for the following cities. ";

            $(SortedArray).each(function ()
            {
                var WeatherCurrentCondition = this;

                var Temperature;
                var WindSpeed;

                switch (_Units)
                {
                    case Units.English:
                        Temperature = WeatherCurrentCondition.Temperature;
                        WindSpeed = WeatherCurrentCondition.WindSpeed;
                        WindUnit = " miles per hour ";
                        break;

                    case Units.Metric:
                        Temperature = Math.round(WeatherCurrentCondition.TemperatureC);
                        WindSpeed = WeatherCurrentCondition.WindSpeedC;
                        WindUnit = " kilometers per hour ";
                        break;
                }

                Text += WeatherCurrentCondition.StationName + " ";
                Text += WeatherCurrentCondition.Conditions + ". ";
                Text += Temperature.toString().replaceAll(".", " point ") + " degrees ";

                if (WeatherCurrentCondition.WindSpeed > 0)
                {
                    Text += " with Winds " + GetWindDirectionWords(WeatherCurrentCondition.WindDirection) + " at " + WindSpeed.toString() + " " + WindUnit + " ";
                }
                else
                {
                    Text += " with Calm Winds ";
                }

                Text += ". ";

            });

            break;

        case CanvasTypes.ExtendedForecast1:
        case CanvasTypes.ExtendedForecast2:
            var WeatherExtendedForecast = _WeatherParameters.WeatherExtendedForecast;

            Text += "Extended Forecast. ";

            var LBound;
            var UBound;
            switch (CanvasType)
            {
                case CanvasTypes.ExtendedForecast1:
                    LBound = 0;
                    UBound = 2;
                    break;
                case CanvasTypes.ExtendedForecast2:
                    LBound = 3;
                    UBound = 5;
                    break;
            }

            $(WeatherExtendedForecast.Day).each(function (Index)
            {
                if (Index < LBound || Index > UBound) return true;

                var Day = this;

                switch (_Units)
                {
                    case Units.English:
                        MinimumTemperature = Day.MinimumTemperature;
                        MaximumTemperature = Day.MaximumTemperature;
                        break;

                    case Units.Metric:
                        MinimumTemperature = Math.round(Day.MinimumTemperatureC);
                        MaximumTemperature = Math.round(Day.MaximumTemperatureC);
                        break;
                }

                Text += Day.DayName + " ";
                Text += Day.Conditions + ". ";
                Text += " with a high of " + MaximumTemperature.toString().replaceAll(".", " point ") + " ";
                Text += " and a low of " + MinimumTemperature.toString().replaceAll(".", " point ") + " ";
                Text += ". ";
            });

            break;

        case CanvasTypes.Almanac:
            var AlmanacInfo = _WeatherParameters.AlmanacInfo;
            var Today = new Date();
            var Tomorrow = Today.addDays(1);

            if (isNaN(AlmanacInfo.TodaySunRise) == true)
            {
                Text += "No sunrise for " + Today.getDayName() + " ";
            }
            else
            {
                Text += "Sunrise for " + Today.getDayName() + " is at " + AlmanacInfo.TodaySunRise.getFormattedTime() + " ";
            }
            if (isNaN(AlmanacInfo.TodaySunSet) == true)
            {
                Text += "no setset. ";
            }
            else
            {
                Text += "sunset is at " + AlmanacInfo.TodaySunSet.getFormattedTime() + ". ";
            }

            if (isNaN(AlmanacInfo.TomorrowSunRise) == true)
            {
                Text += "No sunrise for " + Tomorrow.getDayName() + " ";
            }
            else
            {
                Text += "Sunrise for " + Tomorrow.getDayName() + " is at " + AlmanacInfo.TomorrowSunRise.getFormattedTime() + " ";
            }
            if (isNaN(AlmanacInfo.TomorrowSunSet) == true)
            {
                Text += "no setset. ";
            }
            else
            {
                Text += "sunset is at " + AlmanacInfo.TomorrowSunSet.getFormattedTime() + ". ";
            }

            $(AlmanacInfo.MoonPhases).each(function (Index, MoonPhase)
            {
                switch (MoonPhase.Phase)
                {
                    case "Full":
                        Text += "Full moon ";
                        break;
                    case "Last":
                        Text += "Last quarter ";
                        break;
                    case "New":
                        Text += "New moon ";
                        break;
                    case "First":
                        Text += "First quarter ";
                        break;
                }
                Text += "is on " + MoonPhase.Date.getMonthName() + " " + MoonPhase.Date.getDate().toString() + ". ";
            });

            Text += ". ";

            break;

        case CanvasTypes.AlmanacTides:
            var AlmanacInfo = _WeatherParameters.AlmanacInfo;
            var WeatherTides = _WeatherParameters.WeatherTides;
            var TideCounter = 0;

            $(WeatherTides).each(function (Index, WeatherTide)
            {
                Text += WeatherTide.StationName.toLowerCase() + " Tides. ";

                TideCounter = 0;
                Text += "Low tides at ";
                $(WeatherTide.TideTypes).each(function (Index, TideType)
                {
                    if (TideType != "low")
                    {
                        return true;
                    }

                    var TideTime = WeatherTide.TideTimes[Index];
                    var TideDay = WeatherTide.TideDays[Index];

                    if (_Units == Units.Metric)
                    {
                        TideTime = ConvertTimeTo24Hour(TideTime);
                    }
                    TideDay = _DayLongNames[TideDay];

                    Text += TideDay + " at " + TideTime;
                    if (TideCounter == 0)
                    {
                        Text += " and ";
                    }
                    else
                    {
                        Text += ". ";
                    }
                    TideCounter++;
                });

                TideCounter = 0;
                Text += "High tides at ";
                $(WeatherTide.TideTypes).each(function (Index, TideType)
                {
                    if (TideType != "high")
                    {
                        return true;
                    }

                    var TideTime = WeatherTide.TideTimes[Index];
                    var TideDay = WeatherTide.TideDays[Index];

                    if (_Units == Units.Metric)
                    {
                        TideTime = ConvertTimeTo24Hour(TideTime);
                    }
                    TideDay = _DayLongNames[TideDay];

                    Text += TideDay + " at " + TideTime;
                    if (TideCounter == 0)
                    {
                        Text += " and ";
                    }
                    else
                    {
                        Text += ". ";
                    }
                    TideCounter++;
                });

            });

            if (isNaN(AlmanacInfo.TodaySunRise) == true)
            {
                Text += "No sunrise for today ";
            }
            else
            {
                Text += "Sunrise for today is at " + AlmanacInfo.TodaySunRise.getFormattedTime() + " ";
            }
            if (isNaN(AlmanacInfo.TodaySunSet) == true)
            {
                Text += " and no setset. ";
            }
            else
            {
                Text += " and sunset is at " + AlmanacInfo.TodaySunSet.getFormattedTime() + ". ";
            }

            //Text += ". ";

            break;

        case CanvasTypes.Outlook:
            var Outlook = _WeatherParameters.Outlook;

            Text += "Your 30 day outlook from mid " + _MonthLongNames[Outlook.From] + " to mid " + _MonthLongNames[Outlook.To] + ". ";
            Text += "Temperatures are expected to be " + GetOutlookDescription(Outlook.Temperature) + ". ";
            Text += "Precipitation is expected to be " + GetOutlookDescription(Outlook.Precipitation) + ". ";

            break;

        case CanvasTypes.MarineForecast:
            var MarineForecast = _WeatherParameters.MarineForecast;
            var WindSpeed;
            var Tide;

            Text += "Marine Forecast. ";

            if (MarineForecast.Warning != "")
            {
                Text += MarineForecast.Warning + ". ";
            }

            Text += MarineForecast.TodayDayName;

            switch (_Units)
            {
                case Units.English:
                    WindSpeed = MarineForecast.TodayWindSpeedHigh.toString() + " knots.";
                    if (MarineForecast.TodayWindSpeedLow != MarineForecast.TodayWindSpeedHigh)
                    {
                        WindSpeed = MarineForecast.TodayWindSpeedLow.toString() + " to " + WindSpeed;
                    }
                    break;
                case Units.Metric:
                    WindSpeed = MarineForecast.TodayWindSpeedHighC.toString() + " knots.";
                    if (MarineForecast.TodayWindSpeedLowC != MarineForecast.TodayWindSpeedHighC)
                    {
                        WindSpeed = MarineForecast.TodayWindSpeedLowC.toString() + " to " + WindSpeed;
                    }
                    break;
            }
            Text += " winds " + GetWindDirectionWords(MarineForecast.TodayWindDirection) + " at " + WindSpeed;

            switch (_Units)
            {
                case Units.English:
                    Tide = MarineForecast.TodayTideHigh.toString() + " feet. ";
                    if (MarineForecast.TodayTideLow != MarineForecast.TodayTideHigh)
                    {
                        Tide = MarineForecast.TodayTideLow.toString() + " to " + Tide;
                    }
                    break;
                case Units.Metric:
                    Tide = MarineForecast.TodayTideHighC.toString() + " meters. ";
                    if (MarineForecast.TodayTideLowC != MarineForecast.TodayTideHighC)
                    {
                        Tide = MarineForecast.TodayTideLowC.toString() + " to " + Tide;
                    }
                    break;
            }
            Text += " " + MarineForecast.SeasOrWaves.capitalize() + " at " + Tide;


            Text += MarineForecast.TomorrowDayName;

            switch (_Units)
            {
                case Units.English:
                    WindSpeed = MarineForecast.TomorrowWindSpeedHigh.toString() + " knots. ";
                    if (MarineForecast.TomorrowWindSpeedLow != MarineForecast.TomorrowWindSpeedHigh)
                    {
                        WindSpeed = MarineForecast.TomorrowWindSpeedLow.toString() + " to " + WindSpeed;
                    }
                    break;
                case Units.Metric:
                    WindSpeed = MarineForecast.TomorrowWindSpeedHighC.toString() + " knots. ";
                    if (MarineForecast.TomorrowWindSpeedLowC != MarineForecast.TomorrowWindSpeedHighC)
                    {
                        WindSpeed = MarineForecast.TomorrowWindSpeedLowC.toString() + " to " + WindSpeed;
                    }
                    break;
            }
            Text += " winds " + GetWindDirectionWords(MarineForecast.TomorrowWindDirection) + " at " + WindSpeed;

            switch (_Units)
            {
                case Units.English:
                    Tide = MarineForecast.TomorrowTideHigh.toString() + " feet. ";
                    if (MarineForecast.TomorrowTideLow != MarineForecast.TomorrowTideHigh)
                    {
                        Tide = MarineForecast.TomorrowTideLow.toString() + " to " + Tide;
                    }
                    break;
                case Units.Metric:
                    Tide = MarineForecast.TomorrowTideHighC.toString() + " meters. ";
                    if (MarineForecast.TomorrowTideLowC != MarineForecast.TomorrowTideHighC)
                    {
                        Tide = MarineForecast.TomorrowTideLowC.toString() + " to " + Tide;
                    }
                    break;
            }
            Text += " " + MarineForecast.SeasOrWaves.capitalize() + " at " + Tide;

            break;

        case CanvasTypes.AirQuality:
            var AirQuality = _WeatherParameters.AirQuality;

            Text = "Air quality forecast for " + AirQuality.Date.getDayName() + ". ";
            Text += AirQuality.City + ", " + GetAqiDescription(AirQuality.IndexValue) + " with an air quality index of " + AirQuality.IndexValue.toString() + ".";

            break;

        case CanvasTypes.RegionalForecast1:
        case CanvasTypes.RegionalForecast2:
            //var Today = new Date();
            //var addDays = 0;
            //if (Today.getHours() >= 12)
            //{
            //    addDays = 1;
            //    Today.setHours(0, 0, 0, 0);
            //}
            //else if (Today.getHours() == 0)
            //{
            //    // Prevent Midnight from causing the wrong icons to appear.
            //    Today.setHours(1, 0, 0, 0);
            //}

            //var Tomorrow = Today.addDays(addDays);
            //var _Date = Tomorrow.getYYYYMMDD();
            //var DayName = Tomorrow.getDayName();

            var Today = new Date();
            var addDays = 0;
            var IsNightTime;
            var GetTodaysForecast;
            var GetTonightsForecast;
            var GetTomorrowsForecast;
            var RegionalForecastCities;

            if (CanvasType == CanvasTypes.RegionalForecast2)
            {
                RegionalForecastCities = _WeatherParameters.RegionalForecastCities2;

                if (Today.getHours() >= 12)
                {
                    // Tomorrow's daytime forecast
                    addDays = 1;
                    Today.setHours(0, 0, 0, 0);
                    IsNightTime = false;
                    GetTomorrowsForecast = true;
                }
                else
                {
                    // Todays's nighttime forecast
                    if (Today.getHours() == 0)
                    {
                        // Prevent Midnight from causing the wrong icons to appear.
                        Today.setHours(1, 0, 0, 0);
                    }
                    IsNightTime = true;
                    GetTonightsForecast = true;
                }
            }
            else
            {
                RegionalForecastCities = _WeatherParameters.RegionalForecastCities1;

                if (Today.getHours() >= 12)
                {
                    // Todays's nighttime forecast
                    // Prevent Midnight from causing the wrong icons to appear.
                    Today.setHours(1, 0, 0, 0);
                    IsNightTime = true;
                    GetTonightsForecast = true;
                }
                else
                {
                    // Today's daytime forecast
                    if (Today.getHours() == 0)
                    {
                        // Prevent Midnight from causing the wrong icons to appear.
                        Today.setHours(1, 0, 0, 0);
                    }
                    IsNightTime = false;
                    GetTodaysForecast = true;
                }
            }

            var Tomorrow = Today.addDays(addDays);
            var _Date = Tomorrow.getYYYYMMDD();
            var DayName = Tomorrow.getDayName();

            Text += "Regional forecast for " + DayName + (IsNightTime == true ? " Night " : "") + " for the following cities. ";

            $(RegionalForecastCities).each(function ()
            {
                var RegionalForecastCity = this;

                var RegionalCity = RegionalForecastCity.RegionalCity;
                var weatherTravelForecast = RegionalForecastCity.weatherTravelForecast;

                // City Name
                Text += RegionalCity.Name + " ";
                Text += weatherTravelForecast.Conditions + " ";

                // Temperature
                if (IsNightTime == true)
                {
                    var MinimumTemperature;
                    if (_Units == Units.English)
                    {
                        MinimumTemperature = weatherTravelForecast.MinimumTemperature.toString();
                    }
                    else
                    {
                        MinimumTemperature = Math.round(weatherTravelForecast.MinimumTemperatureC).toString();
                    }
                    Text += " with a low of " + MinimumTemperature.toString().replaceAll(".", " point ") + ". ";
                }
                else
                {
                    var MaximumTemperature;
                    if (_Units == Units.English)
                    {
                        MaximumTemperature = weatherTravelForecast.MaximumTemperature.toString();
                    }
                    else
                    {
                        MaximumTemperature = Math.round(weatherTravelForecast.MaximumTemperatureC).toString();
                    }
                    Text += " with a high of " + MaximumTemperature.toString().replaceAll(".", " point ") + ". ";
                }
            });

            Text += ". ";

            break;

        case CanvasTypes.RegionalObservations:
            Text += "Regional Observations for the following cities. ";

            $(_WeatherParameters.RegionalObservationsCities).each(function ()
            {
                var RegionalObservationsCity = this;

                var RegionalCity = RegionalObservationsCity.RegionalCity;
                var weatherCurrentConditions = RegionalObservationsCity.weatherCurrentConditions;

                // City Name
                Text += RegionalCity.Name + " ";
                Text += weatherCurrentConditions.Conditions + " ";

                // Temperature
                var Temperature;
                if (_Units == Units.English)
                {
                    Temperature = weatherCurrentConditions.Temperature.toString();
                }
                else
                {
                    Temperature = Math.round(weatherCurrentConditions.TemperatureC).toString();
                }
                Text += Temperature.toString().replaceAll(".", " point ") + ". ";

            });

            Text += ". ";

            break;

        case CanvasTypes.LocalForecast:
            var LocalForecastScreenTexts = _WeatherParameters.LocalForecastScreenTexts;
            var UpdateLocalForecastIndex = SubCanvasType;
            Text = LocalForecastScreenTexts[UpdateLocalForecastIndex];
            Text = GetVerboseText(Text);
            Text = Text.toLowerCase();
            break;

        case CanvasTypes.LocalRadar:
            Text = "Your local radar.";
            break;

        case CanvasTypes.TravelForecast:
            var TravelCities = _WeatherParameters.TravelCities;
            var UpdateTravelCitiesIndex = SubCanvasType;

            if (UpdateTravelCitiesIndex == 0)
            {
                //Text += "Travel Forecast for " + TravelCities[0].WeatherTravelForecast.DayName + " for the following cities. ";
                Text += "Travel Forecast for " + GetTravelCitiesDayName(TravelCities) + " for the following cities. ";
            }

            //for (var Index = (UpdateTravelCitiesIndex * 3) ; Index <= ((UpdateTravelCitiesIndex * 3) + 3) - 1; Index++)
            $(TravelCities).each(function ()
            {
                var TravelCity = this;
                var WeatherTravelForecast = TravelCity.WeatherTravelForecast;

                Text += TravelCity.Name + " ";

                if (WeatherTravelForecast && WeatherTravelForecast.Icon != "images/r/")
                {
                    Text += WeatherTravelForecast.Conditions + " ";

                    var MinimumTemperature;
                    var MaximumTemperature;

                    switch (_Units)
                    {
                        case Units.English:
                            MinimumTemperature = WeatherTravelForecast.MinimumTemperature.toString();
                            MaximumTemperature = WeatherTravelForecast.MaximumTemperature.toString();
                            break;

                        case Units.Metric:
                            MinimumTemperature = Math.round(WeatherTravelForecast.MinimumTemperatureC).toString();
                            MaximumTemperature = Math.round(WeatherTravelForecast.MaximumTemperatureC).toString();
                            break;
                    }

                    Text += " with high of " + MaximumTemperature.replaceAll(".", " point ") + " ";
                    Text += " and low of " + MinimumTemperature.replaceAll(".", " point ") + " ";
                }
                else
                {
                    Text += " No travel data available ";
                }
                Text += ". ";
            });

            break;

        case CanvasTypes.Hazards:
            var WeatherHazardConditions = _WeatherParameters.WeatherHazardConditions;

            switch (_Units)
            {
                case Units.English:
                    Text = WeatherHazardConditions.HazardsText;
                    break;

                case Units.Metric:
                    Text = WeatherHazardConditions.HazardsTextC;
                    break;
            }

            Text = GetVerboseText(Text);
            Text = Text.toLowerCase();

            break;

    }

    return Text;
};

var GetVerboseText = function (Text)
{
    Text = " " + Text;
    Text = Text.replaceAll("\n", " ");
    Text = Text.replaceAll("*", " ");
    
    Text = Text.replaceAll(" MPH", " MILES PER HOUR");
    Text = Text.replaceAll(" KPH", " KILOMETERS PER HOUR");
    Text = Text.replaceAll(" IN.", " INCHES ");
    Text = Text.replaceAll(" CM.", " CENTIMETERS ");

    Text = Text.replaceAll(" EST", " EASTERN STANDARD TIME");
    Text = Text.replaceAll(" CST", " CENTRAL STANDARD TIME");
    Text = Text.replaceAll(" MST", " MOUNTAIN STANDARD TIME");
    Text = Text.replaceAll(" PST", " PACIFIC STANDARD TIME");
    Text = Text.replaceAll(" AST", " ALASKA STANDARD TIME");
    Text = Text.replaceAll(" AKST", " ALASKA STANDARD TIME");
    Text = Text.replaceAll(" HST", " HAWAII STANDARD TIME");

    //'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety
    Text = Text.replaceAll(" -0S", " MINUS SINGLE DIGITS ");
    Text = Text.replaceAll(" -10S", " MINUS TEENS ");
    Text = Text.replaceAll(" -20S", " MINUS TWENTIES ");
    Text = Text.replaceAll(" -30S", " MINUS THIRTIES ");
    Text = Text.replaceAll(" -40S", " MINUS FORTIES ");
    Text = Text.replaceAll(" -50S", " MINUS FIFTIES ");
    Text = Text.replaceAll(" -60S", " MINUS SIXTIES ");
    Text = Text.replaceAll(" -70S", " MINUS SEVENTIES ");
    Text = Text.replaceAll(" -80S", " MINUS EIGHTIES ");
    Text = Text.replaceAll(" -90S", " MINUS NINETIES ");
    Text = Text.replaceAll(" 0S", " SINGLE DIGITS ");
    Text = Text.replaceAll(" 10S", " TEENS ");
    Text = Text.replaceAll(" 20S", " TWENTIES ");
    Text = Text.replaceAll(" 30S", " THIRTIES ");
    Text = Text.replaceAll(" 40S", " FORTIES ");
    Text = Text.replaceAll(" 50S", " FIFTIES ");
    Text = Text.replaceAll(" 60S", " SIXTIES ");
    Text = Text.replaceAll(" 70S", " SEVENTIES ");
    Text = Text.replaceAll(" 80S", " EIGHTIES ");
    Text = Text.replaceAll(" 90S", " NINETIES ");
    Text = Text.replaceAll(" 100S", " HUNDREDS ");
    Text = Text.replaceAll(" 110S", " HUNDRED TEENS ");
    Text = Text.replaceAll(" 120S", " HUNDRED TWENTIES ");
    Text = Text.replaceAll(" 130S", " HUNDRED THIRTIES ");
    Text = Text.replaceAll(" 140S", " HUNDRED FORTIES ");
    Text = Text.replaceAll(" 150S", " HUNDRED FIFTIES ");
    Text = Text.replaceAll(" 160S", " HUNDRED SIXTIES ");
    Text = Text.replaceAll(" 170S", " HUNDRED SEVENTIES ");
    Text = Text.replaceAll(" 180S", " HUNDRED EIGHTIES ");
    Text = Text.replaceAll(" 190S", " HUNDRED NINETIES ");

    //Text = Text.toLowerCase();

    return Text;
};

var GetWindDirectionWords = function (WindDirection)
{
    var Words = WindDirection;

    Words = Words.replaceAll("N", "North ");
    Words = Words.replaceAll("S", "South ");
    Words = Words.replaceAll("E", "East ");
    Words = Words.replaceAll("W", "West ");

    return Words;
};

var AssignScrollText = function (e)
{
    if (e && e.ScrollText)
    {
        _ScrollText = e.ScrollText;
    }
    else if (e && e.ScrollRss)
    {
        _ScrollText = "Loading RSS Feed '" + e.ScrollRss + "'...";
        GetRssFeed(e.ScrollRss);
    }
    else
    {
        _ScrollText = "";
    }

    _UpdateCustomScrollTextMs = 0;
    _UpdateWeatherCurrentConditionType = CurrentConditionTypes.Title;
    _UpdateWeatherCurrentConditionCounterMs = 0;
};

var GetRssFeed = function (RssUrl)
{
    $.ajaxCORS({
        type: "GET",
        url: RssUrl + "?rss=1",
        dataType: "xml",
        crossDomain: true,
        cache: false,
        success: function (data)
        {
            var ScrollText = "";

            var $xml = $(data);
            $xml.find("item").each(function ()
            {
                var $this = $(this),
                    item = {
                        title: $this.find("title").text().trim(),
                        link: $this.find("link").text(),
                        description: $this.find("description").text(),
                        pubDate: $this.find("pubDate").text(),
                        author: $this.find("author").text()
                    };

                ScrollText += item.title + "... ";
            });

            AssignScrollText({ ScrollText: ScrollText });
        },
        error: function (xhr, error, errorThrown)
        {
            console.error("GetRssFeed failed: " + errorThrown);
            AssignScrollText(null);
        }
    });
};

var GetTravelCitiesDayName = function (TravelCities)
{
    var DayName = "";

    $(TravelCities).each(function ()
    {
        var TravelCity = this;

        if (TravelCity.WeatherTravelForecast)
        {
            DayName = TravelCity.WeatherTravelForecast.DayName;
            return false;
        }
    });

    return DayName;
};

var ScrollHazardText = function (enable)
{
    _ScrollHazardText = enable;

    if (_ScrollHazardText == true)
    {
        _UpdateScrollHazardTextMs = 0;
    }
    else
    {
        PauseBeep();

        if (_WeatherParameters.WeatherHazardConditions.HazardsScrollText != "")
        {
            AssignScrollText({ ScrollText: _ScrollText });
        }
    }
};

var LoadBeep = function ()
{
    var Url = "Audio/beep.mp3";

    if (_BeepRefreshIntervalId)
    {
        window.clearIntervalWorker(_BeepRefreshIntervalId);
        _BeepRefreshIntervalId = null;
    }

    if (window.AudioContext)
    {
        if (_BeepContext)
        {
            _BeepContext.close();
            _BeepContext = null;
        }
        if (_BeepBufferSource)
        {
            _BeepBufferSource.stop();
            _BeepBufferSource = null;
        }
        _BeepContext = new AudioContext();
        _BeepDuration = 0;
        _BeepCurrentTime = 0;

        var req = new XMLHttpRequest();
        req.open("GET", Url, true);
        req.responseType = "arraybuffer";
        req.onload = function ()
        {
            //decode the loaded data 
            _BeepContext.decodeAudioData(req.response, function (buffer)
            {
                if (_IsBeepPlaying == true)
                {
                    return;
                }

                //create a source node from the buffer 
                _BeepBufferSource = _BeepContext.createBufferSource();
                _BeepBufferSource.buffer = buffer;

                _BeepDuration = buffer.duration;
                _BeepCurrentTime = 0;

                //create a gain node
                _BeepGain = _BeepContext.createGain();
                _BeepBufferSource.connect(_BeepGain);
                _BeepGain.connect(_BeepContext.destination);
                _BeepGain.gain.value = 1.00;

                _BeepBufferSource.start();
                _BeepContext.resume();

                _BeepRefreshIntervalId = window.setIntervalWorker(function ()
                {
                    BeepOnTimeUpdate();
                }, 100);

                RefreshStateOfBeepAudio();
            });
        };
        req.send();
    }
    else
    {
        var beep = audMusic[0];

        PauseBeep();

        _BeepDuration = 0;
        _BeepCurrentTime = 0;

        beep.volume = 1.00;
        beep.oncanplaythrough = function ()
        {
            if (_IsBeepPlaying == true)
            {
                return;
            }

            _BeepDuration = beep.duration;
            _BeepCurrentTime = 0;

            PlayBeep();

            _BeepRefreshIntervalId = window.setIntervalWorker(function ()
            {
                BeepOnTimeUpdate();
            }, 100);

            RefreshStateOfBeepAudio();
        };
        beep.src = Url;
        beep.load();
    }
};
var PlayBeep = function ()
{
    if (window.AudioContext)
    {
        if (_BeepDuration != 0)
        {
            _BeepContext.resume();
        }
    }
    else
    {
        var beep = audBeep[0];
        beep.play();
    }
    RefreshStateOfBeepAudio();
};
var PauseBeep = function ()
{
    if (window.AudioContext)
    {
        if (_BeepDuration != 0)
        {
            _BeepContext.suspend();
        }
    }
    else
    {
        var beep = audBeep[0];
        beep.pause();
    }
    RefreshStateOfBeepAudio();
};

var RefreshStateOfBeepAudio = function ()
{
    var IsBeepPlaying = _IsBeepPlaying;
    var MaxDuration = 5.0;

    if (window.AudioContext)
    {
        _IsBeepPlaying = (_BeepContext.state == "running" && _BeepDuration != 0 && _BeepCurrentTime < MaxDuration);
    }
    else
    {
        var beep = audBeep[0];
        _IsBeepPlaying = (beep.paused == false && _BeepDuration != 0 && _BeepCurrentTime < MaxDuration);
    }

    //if (IsBeepPlaying != _IsBeepPlaying)
    //{
    //    if (_CallBack) _CallBack({ Status: "ISBEEPPLAYING", Value: _IsBeepPlaying });
    //}
};

var BeepOnTimeUpdate = function ()
{
    if (window.AudioContext)
    {
        _BeepCurrentTime = _BeepContext.currentTime;
    }
    else
    {
        var beep = audBeep[0];

        _BeepCurrentTime = beep.currentTime;
    }
    //console.log(_BeepCurrentTime.toString() + " " + _BeepDuration.toString());

    var vol = VolumeAudio();

    if (_IsBeepPlaying == true && vol == 1)
    {
        VolumeAudio(0.25);
    }
    else if (_IsBeepPlaying == false && vol == 0.25)
    {
        VolumeAudio(1);
    }

    RefreshStateOfBeepAudio();
};
