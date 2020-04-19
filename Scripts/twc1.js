/// <reference path="jquery-3.1.0.min.js" />

var frmGetLatLng;
var txtAddress;
var btnGetLatLng;
var divLat;
var spanLat;
var divLng;
var spanLng;

var tblRegionalCurrentMap;
var divRegionalCurrentMap;

var tblRegionalForecastMap;
var divRegionalForecastMap;

var tblDopplerRadarMap;
var divDopplerRadarMap;

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

var tblLocalForecast;
var divLocalForecast1;
var divLocalForecast2;
var divLocalForecast3;

var tblHazards;
var divHazards;

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

var tblTravelCities;
var divTravelCitiesLow;
var divTravelCitiesHigh;

var tblRegionalObservations;
var divRegionalObservationsCityName;
var divRegionalObservationsTemperature;
var divRegionalObservationsConditions;
var divRegionalObservationsWindDirection;
var divRegionalObservationsWindSpeed;

var _MaximumRegionalStations = 7;

var _WeatherParameters = null;

var _DopplerRadarInterval = null;
var _DopplerRadarImageIndex = 0;

//var _WeatherDwmlParser = null;
//var _WeatherMetarsParser = null;

//var _WeatherCurrentConditions = null;
//var _WeatherExtendedForecast = null;
//var _WeatherLocalForecast = null;

//var Geocoder = new google.maps.Geocoder();

//var btnGetLatLng_Click = function (e)
//{
//    //GetGoogleLatLng();
//    GetNoaaLatLng();
//};

var frmGetLatLng_Submit = function (e)
{
    if (txtAddress.suggestions && txtAddress.suggestions[0])
    {
        $(txtAddress.suggestionsContainer.children[0]).click();
    }

    GetNoaaLatLng();

    return false;
};

//var GetGoogleLatLng = function ()
//{
//    var Address = txtAddress.val();
//    var Parameters = { address: Address };

//    Geocoder.geocode(Parameters, function (results, status)
//    {
//        if (status == "OK")
//        {
//            console.log(results);

//            var Location = results[0].geometry.location;

//            spanLat.text(Location.lat().toString());
//            spanLng.text(Location.lng().toString());
//        }
//        else
//        {
//            alert("Geocode was not successful for the following reason: " + status);
//        }
//    });
//};

var GetNoaaLatLng = function ()
{
    //http://forecast.weather.gov/zipcity.php?inputstring=
    var Address = txtAddress.val();
    var Url = "https://forecast.weather.gov/zipcity.php?inputstring=" + Address;

    var xhr;
    var _orgAjax = jQuery.ajaxSettings.xhr;
    jQuery.ajaxSettings.xhr = function ()
    {
        xhr = _orgAjax();
        return xhr;
    };

    $.ajax({
        type: "GET",
        url: Url,
        dataType: "html",
        crossDomain: true,
        cache: false,
        success: function (html)
        {
            //console.log(xhr.responseURL);
            //console.log(html);

            var ResponseURL = xhr.responseURL;

            if (ResponseURL.startsWith("https://forecast.weather.gov/zipcity.php?inputstring=") == true)
            {
                alert("Invalid query");
                return;
            }

            //"http://forecast.weather.gov/MapClick.php?CityName=Medford&state=NY&site=OKX&lat=40.8224&lon=-72.9847"
            var CityName = getParameterByName("CityName", ResponseURL);
            var State = getParameterByName("state", ResponseURL);
            var RadarId = getParameterByName("site", ResponseURL);

            var Latitude = getParameterByName("lat", ResponseURL);
            if (!Latitude)
            {
                Latitude = getParameterByName("textField1", ResponseURL);
            }

            var Longitude = getParameterByName("lon", ResponseURL);
            if (!Longitude)
            {
                Longitude = getParameterByName("textField2", ResponseURL);
            }

            divLat.html("Latitude: " + Latitude);
            divLng.html("Longitude: " + Longitude);

            //MapClick.php?zoneid=NYZ078
            var Index1 = html.indexOf("MapClick.php?zoneid=");
            var ZoneId = html.substr(Index1 + 20, 6);

            //obhistory/KHWV.html
            var Index2 = html.indexOf("obhistory/");
            var StationId = html.substr(Index2 + 10, 4);

            _WeatherParameters = {
                Latitude: Latitude,
                Longitude: Longitude,
                ZoneId: ZoneId,
                RadarId: RadarId,
                StationId: StationId,
            };
            GetCurrentWeather(_WeatherParameters);
        },
        error: function (xhr, error, errorThrown)
        {
            //if (xhr.status && xhr.status == 400)
            //{
            //    alert(xhr.responseText);
            //}
            //else
            //{
            //    alert("Something went wrong");
            //}
            console.error("GetMonthPrecipitation failed: " + errorThrown);
        }
    });

    //jQuery.ajax(Url, {
    //    success: function (responseText)
    //    {
    //        console.log('responseURL:', xhr.responseURL, 'responseText:', responseText);
    //    }
    //});
};

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

//var btnGetCurrentWeather_Click = function (e)
//{
//    var Lat = parseFloat(spanLat.text());
//    var Lng = parseFloat(spanLng.text());

//    GetCurrentWeather(Lat, Lng);
//};

var GetCurrentWeather = function(WeatherParameters)
{
    var Url = "https://forecast.weather.gov/MapClick.php?FcstType=dwml";
    Url += "&lat=" + WeatherParameters.Latitude.toString();
    Url += "&lon=" + WeatherParameters.Longitude.toString();
    Url = "cors/?u=" + encodeURIComponent(Url);

    // Load the xml file using ajax 
    $.ajax({
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

            WeatherParameters.WeatherDwmlParser = new WeatherDwmlParser($xml);
            console.log(WeatherParameters.WeatherDwmlParser);

            if (WeatherParameters.WeatherDwmlParser.data_current_observations.parameters.conditions_icon.icon_link[0] == "NULL")
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
            PopulateExtendedForecast(WeatherParameters.WeatherExtendedForecast);

            //WeatherParameters.WeatherLocalForecast = new WeatherLocalForecast(WeatherParameters.WeatherDwmlParser);
            //console.log(WeatherParameters.WeatherLocalForecast);
            //PopulateLocalForecast(WeatherParameters.WeatherLocalForecast);

            GetWeatherMetar(WeatherParameters);

            GetWeatherHazards(WeatherParameters);

        },
        error: function (xhr, error, errorThrown)
        {
            //if (xhr.status && xhr.status == 400)
            //{
            //    alert(xhr.responseText);
            //}
            //else
            //{
            //    alert("Something went wrong");
            //}
            console.error("GetMonthPrecipitation failed: " + errorThrown);
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

    // Get the current weather from the next closest station.
    var Url = "https://www.aviationweather.gov/adds/dataserver_current/httpparam?datasource=metars&requesttype=retrieve&format=xml&hoursBeforeNow=1";
    Url += "&radialDistance=" + Distance.toString();
    Url += ";" + WeatherParameters.Longitude;
    Url += "," + WeatherParameters.Latitude;
    Url = "cors/?u=" + encodeURIComponent(Url);

    // Load the xml file using ajax 
    $.ajax({
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
                var raw_text = data_METAR.find("latitude").text();
                
                if (raw_text == "")
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

                return false;
            });

            if (FoundClosetStation == true)
            {
                GetCurrentWeather(WeatherParameters);
            }
            else
            {
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

var GetMonthPrecipitation = function (WeatherParameters)
{
    var Now = new Date();
    var Url = "https://www.wunderground.com/history/airport/";
    Url += WeatherParameters.StationId + "/";
    Url += Now.getFullYear().pad() + "/";
    Url += (Now.getMonth() + 1).pad(2) + "/";
    Url += Now.getDate().pad(2) + "/";
    Url += "MonthlyHistory.html";
    Url = "cors/?u=" + encodeURIComponent(Url);

    // Load the xml file using ajax 
    $.ajax({
        type: "GET",
        url: Url,
        dataType: "html",
        crossDomain: true,
        cache: false,
        success: function (html)
        {
            var $html = $(html);
            $html.find("img").attr("src", ""); // Prevents the browser from loading any images on this page.

            WeatherParameters.WeatherMonthlyTotalsParser = new WeatherMonthlyTotalsParser($html);
            console.log(WeatherParameters.WeatherMonthlyTotalsParser);

            WeatherParameters.WeatherMonthlyTotals = new WeatherMonthlyTotals(WeatherParameters.WeatherMonthlyTotalsParser);
            console.log(WeatherParameters.WeatherMonthlyTotals);
            //PopulateCurrentConditions(WeatherParameters.WeatherMonthlyTotals);

        },
        error: function (xhr, error, errorThrown)
        {
            //if (xhr.status && xhr.status == 400)
            //{
            //    alert(xhr.responseText);
            //}
            //else
            //{
            //    alert("Something went wrong");
            //}
            console.error("GetMonthPrecipitation failed: " + errorThrown);
        }
    });
};

var GetMoonPhases = function (WeatherParameters)
{
    var Now = new Date();
    var Url = "http://api.usno.navy.mil/moon/phase?nump=4&date=";
    Url += (Now.getMonth() + 1).pad(2) + "/";
    Url += Now.getDate().pad(2) + "/";
    Url += Now.getFullYear().pad();
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
            //if (xhr.status && xhr.status == 400)
            //{
            //    alert(xhr.responseText);
            //}
            //else
            //{
            //    alert("Something went wrong");
            //}
            console.error("GetMonthPrecipitation failed: " + errorThrown);
        }
    });
};

var GetSunRiseSets = function (WeatherParameters, Tomorrow)
{
    var Now = new Date();

    if (Tomorrow)
    {
        Now = Now.addDays(1);
    }

    var Url = "http://api.usno.navy.mil/rstt/oneday?coords=";
    Url += (WeatherParameters.Latitude < 0 ? (WeatherParameters.Latitude * -1).toString() + "S" : WeatherParameters.Latitude.toString() + "N") + ",";
    Url += (WeatherParameters.Longitude < 0 ? (WeatherParameters.Longitude * -1).toString() + "W" : WeatherParameters.Longitude.toString() + "E") + "&";
    Url += "date=";
    Url += (Now.getMonth() + 1).pad(2) + "/";
    Url += Now.getDate().pad(2) + "/";
    Url += Now.getFullYear().pad();
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
                PopulateAlmanacInfo(WeatherParameters.AlmanacInfo);

                GetRegionalStations(_WeatherParameters);
                GetTravelWeather(_TravelCities);
                GetCurrentWeather(_WeatherParameters);
                GetMonthPrecipitation(_WeatherParameters);
                ShowRegionalMap(_WeatherParameters);
                ShowRegionalMap(_WeatherParameters, true);
                ShowDopplerMap(_WeatherParameters);
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
            //if (xhr.status && xhr.status == 400)
            //{
            //    alert(xhr.responseText);
            //}
            //else
            //{
            //    alert("Something went wrong");
            //}
            console.error("GetMonthPrecipitation failed: " + errorThrown);
        }
    });
};

var GetWeatherHazards = function (WeatherParameters)
{
    var Hazards = WeatherParameters.WeatherDwmlParser.data_forecast.parameters.hazards.hazards_conditions;

    divHazards.empty();

    if (Hazards.length == 0)
    {
        return;
    }

    var Url = Hazards[0].hazardTextURL;

    // Load the xml file using ajax 
    $.ajax({
        type: "GET",
        url: Url,
        dataType: "html",
        crossDomain: true,
        cache: false,
        success: function (html)
        {
            var $html = $(html);
            $html.find("img").attr("src", ""); // Prevents the browser from loading any images on this page.
            //console.log(html);

            WeatherParameters.WeatherHazardsParser = new WeatherHazardsParser($html);
            console.log(WeatherParameters.WeatherHazardsParser);

            WeatherParameters.WeatherHazardConditions = new WeatherHazardConditions(WeatherParameters.WeatherHazardsParser, WeatherParameters);
            console.log(WeatherParameters.WeatherHazardConditions);
            PopulateHazardConditions(WeatherParameters.WeatherHazardConditions);

        },
        error: function (xhr, error, errorThrown)
        {
            //if (xhr.status && xhr.status == 400)
            //{
            //    alert(xhr.responseText);
            //}
            //else
            //{
            //    alert("Something went wrong");
            //}
            console.error("GetMonthPrecipitation failed: " + errorThrown);
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
    Url = "cors/?u=" + encodeURIComponent(Url);

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
    $.ajax({
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

            PopulateCurrentConditions(WeatherParameters.WeatherCurrentConditions);

            GetWeatherForecast(WeatherParameters);
        },
        error: function (xhr, error, errorThrown)
        {
            //if (xhr.status && xhr.status == 400)
            //{
            //    alert(xhr.responseText);
            //}
            //else
            //{
            //    alert("Something went wrong");
            //}
            console.error("GetMonthPrecipitation failed: " + errorThrown);
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
    Url = "cors/?u=" + encodeURIComponent(Url);

    // Load the xml file using ajax 
    $.ajax({
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
            PopulateLocalForecast(WeatherParameters.WeatherLocalForecast);

        },
        error: function (xhr, error, errorThrown)
        {
            //if (xhr.status && xhr.status == 400)
            //{
            //    alert(xhr.responseText);
            //}
            //else
            //{
            //    alert("Something went wrong");
            //}
            console.error("GetMonthPrecipitation failed: " + errorThrown);
        }
    });
};

$(function ()
{
    frmGetLatLng = $("#frmGetLatLng");
    txtAddress = $("#txtAddress");
    btnGetLatLng = $("#btnGetLatLng");

    divLat = $("#divLat");
    spanLat = $("#spanLat");
    divLng = $("#divLng");
    spanLng = $("#spanLng");

    tblDopplerRadarMap = $("#tblDopplerRadarMap");
    divDopplerRadarMap = $("#divDopplerRadarMap");

    tblRegionalForecastMap = $("#tblRegionalForecastMap");
    divRegionalForecastMap = $("#divRegionalForecastMap");

    tblRegionalCurrentMap = $("#tblRegionalCurrentMap");
    divRegionalCurrentMap = $("#divRegionalCurrentMap");

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

    tblLocalForecast = $("#tblLocalForecast");
    divLocalForecast1 = $("#divLocalForecast1");
    divLocalForecast2 = $("#divLocalForecast2");
    divLocalForecast3 = $("#divLocalForecast3");

    tblHazards = $("#tblHazards");
    divHazards = $("#divHazards");

    tblSunData = $("#tblSunData");
    divSunriseTodayName = $("#divSunriseTodayName");
    divSunsetTomorrowName = $("#divSunsetTomorrowName");
    divSunrise = $("#divSunrise");
    divSunriseToday = $("#divSunriseToday");
    divSunriseTomorrow = $("#divSunriseTomorrow");
    divSunset = $("#divSunset");
    divSunsetToday = $("#divSunsetToday");
    divSunsetTomorrow = $("#divSunsetTomorrow");

    tblTravelCities = $("#tblTravelCities");
    divTravelCitiesHigh = $("#divTravelCitiesHigh");
    divTravelCitiesLow = $("#divTravelCitiesLow");

    tblRegionalObservations = $("#tblRegionalObservations");
    divRegionalObservationsCityName = $("#divRegionalObservationsCityName");
    divRegionalObservationsTemperature = $("#divRegionalObservationsTemperature");
    divRegionalObservationsConditions = $("#divRegionalObservationsConditions");
    divRegionalObservationsWindDirection = $("#divRegionalObservationsWindDirection");
    divRegionalObservationsWindSpeed = $("#divRegionalObservationsWindSpeed");

    //txtAddress.click(function ()
    //{
    //    alert("hi");
    //});

    //btnGetLatLng.click(btnGetLatLng_Click);
    //frmGetLatLng.submit(frmGetLatLng_Submit);
    //btnGetCurrentWeather.click(btnGetCurrentWeather_Click);

    txtAddress.focus();

});

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
    }

    ////this.DateTime = ConvertXmlDateToJsDate(CurrentObservations.time_layout[0].start_valid_time[0].value);
    //this.DateTime = ConvertXmlDateToJsDate(MetarData.observation_time);

    if (MetarData && MetarData.raw_text)
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

    this.Conditions = CurrentObservations.parameters.weather.weather_conditions[0].weather_summary;
    this.Icon = CurrentObservations.parameters.conditions_icon.icon_link[0];
    this.Icon = GetWeatherIconFromIconLink(this.Icon);

    if (MetarData && MetarData.raw_text)
    {
        this.Visibility = MetarData.visibility_statute_mi;
    }
    else
    {
        this.Visibility = CurrentObservations.parameters.weather.weather_conditions[1].visibility.value;
    }

    //this.Ceiling = "";
    this.Ceiling = "";
    var _self = this;
    if (MetarData && MetarData.raw_text)
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

    if (MetarData && MetarData.raw_text)
    {
        this.Pressure = Math.round2(parseFloat(MetarData.altim_in_hg), 2);
    }
    else
    {
        this.Pressure = CurrentObservations.parameters.pressure.value;
    }
    
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
        if (CurrentObservations.parameters.wind_speed_sustained.value != "0")
        {
            this.WindSpeed = ConvertKnotsToMph(CurrentObservations.parameters.wind_speed_sustained.value);
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

    //this.WindChill = CalculateWindChill(CurrentObservations.parameters.temperature_apparent.value[0], ConvertKnotsToMph(CurrentObservations.parameters.wind_speed_sustained.value));
    this.WindChill = CalculateWindChill(this.Temperature, this.WindSpeed);

};

Math.round2 = function(value, decimals)
{
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

var ConvertKnotsToMph = function (Knots)
{
    return Math.round(parseFloat(Knots) * 1.15078);
};

var ConvertCelsiusToFahrenheit = function (Celsius)
{
    return Math.round(parseFloat(Celsius) * 9 / 5 + 32);
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

    if (WindSpeed == "0" || WindSpeed == "Calm")
    {
        return "";
    }

    var T = parseFloat(Temperature);
    var V = parseFloat(WindSpeed);
    var WC = 35.74 + (0.6215 * T) - (35.75 * Math.pow(V, 0.16)) + (0.4275 * T * Math.pow(V, 0.16));

    return Math.round(WC);
};

var PopulateCurrentConditions = function (WeatherCurrentConditions)
{
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

};

var WeatherExtendedForecast = function (WeatherParser)
{
    //var _Today = new Date();
    //var _NextDay = _Today.addDays(2);
    var Today = new Date();
    Today.setHours(0, 0, 0, 0);
    var _LayoutKey;
    var _PeriodIndex = [];
    //var _Days = [];
    var _Dates = [];
    var _Day = {};
    //var _DayName;

    var _DayShortNames = {'Sunday': 'Sun', 'Monday': 'Mon', 'Tuesday': 'Tue', 'Wednesday': 'Wed', 'Thursday': 'Thu', 'Friday': 'Fri', 'Saturday': 'Sat'};

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
    $([2, 3, 4]).each(function ()
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
        _Day.MaximumTemperatue = WeatherParser.data_forecast.parameters.temperature_maximum.value[_PeriodIndex[Date + "_" + _LayoutKey]];

        _LayoutKey = WeatherParser.data_forecast.parameters.temperature_minimum.time_layout;
        _Day.MinimumTemperatue = WeatherParser.data_forecast.parameters.temperature_minimum.value[_PeriodIndex[Date + "_" + _LayoutKey]];

        _LayoutKey = WeatherParser.data_forecast.parameters.weather.time_layout;
        _Day.Conditions = WeatherParser.data_forecast.parameters.weather.weather_conditions[_PeriodIndex[Date + "_" + _LayoutKey]].weather_summary;

        _LayoutKey = WeatherParser.data_forecast.parameters.conditions_icon.time_layout;
        _Day.Icon = WeatherParser.data_forecast.parameters.conditions_icon.icon_link[_PeriodIndex[Date + "_" + _LayoutKey]];
        _Day.Icon = GetWeatherIconFromIconLink(_Day.Icon);

        _self.Day.push(_Day);
    });


};

Date.prototype.addDays = function (days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
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
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
    return days[this.getDay()];
};
Date.prototype.getYYYYMMDD = function ()
{
    return this.toISOString().split('T')[0];
};

var PopulateExtendedForecast = function (WeatherExtendedForecast)
{
    $(WeatherExtendedForecast.Day).each(function (Index, Day)
    {
        $("#divDayShortName" + (Index + 1)).html(Day.DayShortName.toUpperCase());
        $("#divConditions" + (Index + 1)).html(Day.Conditions);
        $("#divIcon" + (Index + 1)).html("<img src='" + Day.Icon + "' />");
        $("#divLo" + (Index + 1)).html("Lo<br />" + Day.MinimumTemperatue);
        $("#divHi" + (Index + 1)).html("Hi<br />" + Day.MaximumTemperatue);
    });
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
        if (this == "")
        {
            InCondition = false;
            return true;
        }

        if (this.startsWith(".") == false)
        {
            if (InCondition == true)
            {
                _self.Text[_self.Text.length - 1] += " " + this;
            }
            else if (InAlert == true)
            {
                _self.Alert += " " + this;
            }

            return true;
        }

        if (this.startsWith("...") == true)
        {
            // This is an alert.
            InAlert = true;
            this.Alert = this;
            return true;
        }

        InAlert = false;
        InCondition = true;

        _self.Text.push(this.toString());

        //Index = this.indexOf("...");
        //_self.Conditions.push({
        //    DayName: this.substr(1, Index - 1),
        //    Text: this.substr(Index + 3),
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
    if (WeatherForecastParser.Alert != "")
    {
        this.Alerts = "*** " + WeatherForecastParser.Alert + " ***";
    }

    this.Conditions = [];

    $(WeatherForecastParser.Text).each(function (Index, Text)
    {
        if (Index > 2)
        {
            return false;
        }

        Index2 = Text.indexOf("...");
        _self.Conditions.push({
            DayName: Text.substr(1, Index2 - 1),
            Text: Text.substr(Index2 + 3),
        });
    });

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

var PopulateLocalForecast = function (WeatherLocalForecast)
{
    $(WeatherLocalForecast.Conditions).each(function (Index, Condition)
    {
        $("#divLocalForecast" + (Index + 1)).html(Condition.DayName.toUpperCase() + "..." + Condition.Text.toUpperCase());
    });
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

var PopulateHazardConditions = function (WeatherHazardConditions)
{
    var ZoneId = WeatherHazardConditions.ZoneId;
    var StateId = WeatherHazardConditions.ZoneId.substr(0, 3);
    var CountyId = WeatherHazardConditions.ZoneId.substr(0, 2) + "C";
    var Text;
    var Line;
    var SkipLine;

    divHazards.empty();

    $(WeatherHazardConditions.Hazards).each(function ()
    {
        //Text = this.replaceAll("\n", "<br/>");
        //divHazards.html(divHazards.html() + "<br/><br/>" + Text);

        Text = this.toString();

        SkipLine = false;

        $(Text.split("\n")).each(function ()
        {
            Line = this.toString();

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
            else if (Line.startsWith(StateId) == true)
            {
                SkipLine = true;
                return true;
            }
            else if (Line.startsWith(CountyId) == true)
            {
                SkipLine = true;
                return true;
            }
            else if (Line.indexOf(">") != -1)
            {
                SkipLine = true;
                return true;
            }
            else if (Line.indexOf(StateId) != -1)
            {
                SkipLine = true;
                return true;
            }
            else if (Line.indexOf("LAT...LON ") != -1)
            {
                SkipLine = true;
                return true;
            }

            divHazards.html(divHazards.html() + "<br/>" + Line);
        });

        divHazards.html(divHazards.html() + "<br/><br/>");
    });
};

String.prototype.replaceAll = function (search, replacement)
{
    var target = this;
    return target.split(search).join(replacement);
};


$(function ()
{
    var categories = [
			'Land Features',
			'Bay', 'Channel', 'Cove', 'Dam', 'Delta', 'Gulf', 'Lagoon', 'Lake', 'Ocean', 'Reef', 'Reservoir', 'Sea', 'Sound', 'Strait', 'Waterfall', 'Wharf', // Water Features
			'Amusement Park', 'Historical Monument', 'Landmark', 'Tourist Attraction', 'Zoo', // POI/Arts and Entertainment
			'College', // POI/Education
			'Beach', 'Campground', 'Golf Course', 'Harbor', 'Nature Reserve', 'Other Parks and Outdoors', 'Park', 'Racetrack',
				'Scenic Overlook', 'Ski Resort', 'Sports Center', 'Sports Field', 'Wildlife Reserve', // POI/Parks and Outdoors
			'Airport', 'Ferry', 'Marina', 'Pier', 'Port', 'Resort', // POI/Travel
			'Postal', 'Populated Place'
    ],
		cats = categories.join(','),
		overrides = {
		    '08736, Manasquan, New Jersey, USA': { x: -74.037, y: 40.1128 },
		    '32899, Orlando, Florida, USA': { x: -80.6774, y: 28.6143 },
		    '97003, Beaverton, Oregon, USA': { x: -122.8752489, y: 45.5050916 },
		    '99734, Prudhoe Bay, Alaska, USA': { x: -148.3372, y: 70.2552 },

		    'Guam, Oceania': { x: 144.74, y: 13.46 },
		    'Andover, Maine, United States': { x: -70.7525, y: 44.634167 },
		    'Bear Creek, Pennsylvania, United States': { x: -75.772809, y: 41.204074 },
		    'Bear Creek Village, Pennsylvania, United States': { x: -75.772809, y: 41.204074 },
		    'New York City, New York, United States': { x: -74.0059, y: 40.7142 },
		    'Pinnacles National Monument, San Benito County,California, United States': { x: -121.147278, y: 36.47075 },
		    'Pinnacles National Park, CA-146, Paicines, California': { x: -121.147278, y: 36.47075 },
		    'Welcome, Maryland, United States': { x: -77.081212, y: 38.4692469 },
		    'Tampa, Florida, United States (City)': { x: -82.5329, y: 27.9756 },
		},
		roundToPlaces = function (num, decimals)
		{
		    var n = Math.pow(10, decimals);
		    return Math.round((n * num).toFixed(decimals)) / n;
		},
		doRedirectToGeometry = function (geom)
		{
		    var location = window.location,
				query = '?lat=' + roundToPlaces(geom.y, 4) + '&lon=' + roundToPlaces(geom.x, 4),
				origin, domain;
		    var Url = "";

		    if (location.pathname.match(/MapClick.php$/))
		    {
		        if (location.origin)
		        {
		            origin = location.origin;
		        } else
		        {
		            origin = location.protocol + "//" + location.hostname + (location.port ? ':' + location.port : '');
		        }
		        //window.location = origin + location.pathname + query;
		        Url = origin + location.pathname + query;
		    }
		    else
		    {
		        if (location.hostname.match(/dev\.nids\.noaa\.gov$/))
		        {
		            domain = 'forecast.dev.nids.noaa.gov';
		        } else if (location.hostname.match(/preview.*\.weather\.gov$/))
		        {
		            domain = 'preview-forecast.weather.gov';
		        } else
		        {
		            domain = 'forecast.weather.gov';
		        }
		        //window.location = location.protocol + '//' + domain + '/MapClick.php' + query;
		        Url = location.protocol + '//' + domain + '/MapClick.php' + query;
		    }
		    Url = "cors/?u=" + encodeURIComponent(Url);

		    GetLatLng(Url);
		};

    var PreviousSeggestionValue = null;
    var PreviousSeggestion = null;
    var OnSelect = function (suggestion)
    {
        var request;

        // Do not auto get the same city twice.
        if (PreviousSeggestionValue == suggestion.value)
        {
            return;
        }
        PreviousSeggestionValue = suggestion.value;
        PreviousSeggestion = suggestion;

        if (overrides[suggestion.value])
        {
            doRedirectToGeometry(overrides[suggestion.value]);
        }
        else
        {
            request = $.ajax({
                url: 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find',
                data: {
                    text: suggestion.value,
                    magicKey: suggestion.data,
                    f: 'json'
                },
                jsonp: 'callback',
                dataType: 'jsonp'
            });
            request.done(function (data)
            {
                var loc = data.locations[0];
                if (loc)
                {
                    doRedirectToGeometry(loc.feature.geometry);
                }
                else
                {
                    alert('An unexpected error occurred. Please try a different search string.');
                }
            });
        }
    };

    $("#frmGetLatLng #txtAddress").devbridgeAutocomplete({
        serviceUrl: 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest',
        deferRequestBy: 300,
        paramName: 'text',
        params: {
            f: 'json',
            countryCode: 'USA,PRI,VIR,GUM,ASM',
            category: cats,
            maxSuggestions: 10
        },
        dataType: 'jsonp',
        transformResult: function (response)
        {
            return {
                suggestions: $.map(response.suggestions, function (i)
                {
                    return {
                        value: i.text,
                        data: i.magicKey
                    };
                })
            };
        },
        minChars: 3,
        showNoSuggestionNotice: true,
        noSuggestionNotice: 'No results found. Please try a different search string.',
        onSelect: OnSelect,
        width: 400
    });

    var ac = $("#frmGetLatLng #txtAddress").devbridgeAutocomplete();
    frmGetLatLng.submit(function ()
    {
        if (ac.suggestions[0])
        {
            $(ac.suggestionsContainer.children[0]).click();
            return false;
            //PreviousSeggestion = ac.suggestions[0];
        }
        if (PreviousSeggestion)
        {
            PreviousSeggestionValue = null;
            OnSelect(PreviousSeggestion);
        }

        return false;
    });
});

var GetLatLng = function (Url)
{
    $.ajax({
        type: "GET",
        url: Url,
        dataType: "html",
        crossDomain: true,
        cache: false,
        success: function (html)
        {
            //"http://forecast.weather.gov/MapClick.php?lat=40.8224&lon=-72.9847"
            //var RadarId = getParameterByName("site", ResponseURL);

            var Latitude = getParameterByName("lat", Url);
            var Longitude = getParameterByName("lon", Url);

            divLat.html("Latitude: " + Latitude);
            divLng.html("Longitude: " + Longitude);

            //MapClick.php?zoneid=NYZ078
            var Index1 = html.indexOf("MapClick.php?zoneid=");
            var ZoneId = html.substr(Index1 + 20, 6);

            ////obhistory/KHWV.html
            //var Index2 = html.indexOf("obhistory/");
            //var StationId = html.substr(Index2 + 10, 4);
            var Index2_1 = html.indexOf(")</h2>");
            var Index2 = html.lastIndexOf("(", Index2_1);
            var StationId = html.substr(Index2 + 1, Index2_1 - (Index2 + 1));

            //a:"OKX"
            var Index3 = html.indexOf("a:\"");
            var RadarId = html.substr(Index3 + 3, 3).toUpperCase();

            _WeatherParameters = {
                Latitude: Latitude,
                Longitude: Longitude,
                ZoneId: ZoneId,
                RadarId: RadarId,
                StationId: StationId,
            };

            GetMoonPhases(_WeatherParameters);
        },
        error: function (xhr, error, errorThrown)
        {
            //if (xhr.status && xhr.status == 400)
            //{
            //    alert(xhr.responseText);
            //}
            //else
            //{
            //    alert("Something went wrong");
            //}
            console.error("GetMonthPrecipitation failed: " + errorThrown);
        }
    });

};

var WeatherMonthlyTotalsParser = function (html)
{
    this.Precipitation = html.find("span:contains(Precipitation)").parent().parent().children().eq(4).find(".wx-value").text();
};

var WeatherMonthlyTotals = function (WeatherMonthlyTotalsParser)
{
    var Now = new Date();
    this.MonthName = Now.getMonthName();

    this.PrecipitationTotal = WeatherMonthlyTotalsParser.Precipitation;
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
    });
};

var SunRiseSetParser = function (json)
{
    var _self = this;

    $(json.sundata).each(function()
    {
        switch (this.phen)
        {
            case "R": // Sunrise
                _self.SunRiseUTC = this.time;
                break;
            case "S": // Sunset
                _self.SunSetUTC = this.time;
                break;
            default:
                return true;
        }
    });
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
            Date: GetDateFromUTC(date, time),
            Phase: phase[0],
        });
    });

    this.TodaySunRise = GetDateFromUTC(new Date(), SunRiseSetParserToday.SunRiseUTC);
    this.TodaySunSet = GetDateFromUTC(new Date(), SunRiseSetParserToday.SunSetUTC);

    this.TomorrowSunRise = GetDateFromUTC((new Date()).addDays(1), SunRiseSetParserTomorrow.SunRiseUTC);
    this.TomorrowSunSet = GetDateFromUTC((new Date()).addDays(1), SunRiseSetParserTomorrow.SunSetUTC);
};

var PopulateAlmanacInfo = function (AlmanacInfo)
{
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

};

var GetDateFromUTC = function (date, utc)
{
    var time = utc.split(":");
    
    date.setUTCHours(time[0], time[1], 0, 0);

    return date;
};

Date.prototype.getFormattedTime = function ()
{
    var hours = this.getHours() == 0 ? "12" : this.getHours() > 12 ? this.getHours() - 12 : this.getHours();
    var minutes = (this.getMinutes() < 10 ? "0" : "") + this.getMinutes();
    var ampm = this.getHours() < 12 ? "am" : "pm";
    var formattedTime = hours + ":" + minutes + " " + ampm;
    return formattedTime;
}

var GetTravelWeather = function (TravelCities)
{
    var Total = TravelCities.length;
    var Count = 0;

    $(TravelCities).each(function ()
    {
        var TravelCity = this;

        var Url = "https://forecast.weather.gov/MapClick.php?FcstType=dwml";
        Url += "&lat=" + TravelCity.Latitude.toString();
        Url += "&lon=" + TravelCity.Longitude.toString();
        Url = "cors/?u=" + encodeURIComponent(Url);

        // Load the xml file using ajax 
        $.ajax({
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
                    PopulateTravelCities(TravelCities);
                }
            },
            error: function (xhr, error, errorThrown)
            {
                //if (xhr.status && xhr.status == 400)
                //{
                //    alert(xhr.responseText);
                //}
                //else
                //{
                //    alert("Something went wrong");
                //}
                console.error("GetTravelWeather for city '" + TravelCity.Name + "' failed: " + errorThrown);

                Count++;
                if (Count == Total)
                {
                    PopulateTravelCities(TravelCities);
                }
            }
        });

    });

};

var WeatherTravelForecast = function (WeatherDwmlParser)
{
    var Today = new Date();
    Today.setHours(0, 0, 0, 0);
    var Tomorrow = Today.addDays(1);
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
    $(WeatherDwmlParser.data_forecast.time_layout).each(function ()
    {
        _LayoutKey = this.layout_key;

        $(this.start_valid_time).each(function (Index, Value)
        {
            if (this.value.indexOf(_Date) != -1)
            {
                _PeriodIndex[_LayoutKey] = Index;
                return false;
            }
        });
    });

    _LayoutKey = WeatherDwmlParser.data_forecast.parameters.temperature_maximum.time_layout;
    this.MaximumTemperatue = WeatherDwmlParser.data_forecast.parameters.temperature_maximum.value[_PeriodIndex[_LayoutKey]];

    _LayoutKey = WeatherDwmlParser.data_forecast.parameters.temperature_minimum.time_layout;
    this.MinimumTemperatue = WeatherDwmlParser.data_forecast.parameters.temperature_minimum.value[_PeriodIndex[_LayoutKey]];

    _LayoutKey = WeatherDwmlParser.data_forecast.parameters.weather.time_layout;
    this.Conditions = WeatherDwmlParser.data_forecast.parameters.weather.weather_conditions[_PeriodIndex[_LayoutKey]].weather_summary;

    _LayoutKey = WeatherDwmlParser.data_forecast.parameters.conditions_icon.time_layout;
    this.Icon = WeatherDwmlParser.data_forecast.parameters.conditions_icon.icon_link[_PeriodIndex[_LayoutKey]];
    this.Icon = GetWeatherIconFromIconLink(this.Icon);

};

var PopulateTravelCities = function (TravelCities)
{
    console.log(TravelCities);

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
            Html += "<td>" + WeatherTravelForecast.MinimumTemperatue + "</td>";
            Html += "<td>" + WeatherTravelForecast.MaximumTemperatue + "</td>";
        }
        else
        {
            Html += "<td colspan='3'>NO TRAVEL DATA AVAILABLE</td>";
        }
        Html += "</tr>";
        tbodyTravelCities.append(Html);
    });

};

var GetRegionalStations = function (WeatherParameters, Distance)
{
    if (!Distance)
    {
        Distance = 10;
        WeatherParameters.WeatherCurrentRegionalConditions = new WeatherCurrentRegionalConditions();
    }

    var Url = "https://www.aviationweather.gov/adds/dataserver_current/httpparam?datasource=metars&requesttype=retrieve&format=xml&hoursBeforeNow=1";
    Url += "&radialDistance=" + Distance.toString();
    Url += ";" + WeatherParameters.Longitude;
    Url += "," + WeatherParameters.Latitude;
    //Url += "," + (new Date().getTime()); // Prevents caching
    Url = "cors/?u=" + encodeURIComponent(Url);

    var Total = _MaximumRegionalStations;
    var Count = 0;

    // Load the xml file using ajax 
    $.ajax({
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
                // Increase distance by 10 miles.
                GetRegionalStations(WeatherParameters, Distance + 10);
            }

        },
        error: function (xhr, error, errorThrown)
        {
            //if (xhr.status && xhr.status == 400)
            //{
            //    alert(xhr.responseText);
            //}
            //else
            //{
            //    alert("Something went wrong");
            //}
            console.error("GetRegionalStations failed: " + errorThrown);
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
                PopulateRegionalObservations(WeatherParameters.WeatherCurrentRegionalConditions);
                return false;
            }
            return true;
        }

        var Url = "https://forecast.weather.gov/MapClick.php?FcstType=dwml";
        Url += "&lat=" + _WeatherMetarsParser.data_METAR.latitude.toString();
        Url += "&lon=" + _WeatherMetarsParser.data_METAR.longitude.toString();
        Url = "cors/?u=" + encodeURIComponent(Url);

        // Load the xml file using ajax 
        $.ajax({
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
                if ((WeatherParameters.WeatherCurrentRegionalConditions.StationNames.indexOf(StationName) != -1) ||
                    (WeatherParameters.WeatherCurrentRegionalConditions.WeatherCurrentConditions[StationId].Conditions == ""))
                {
                    WeatherParameters.WeatherCurrentRegionalConditions.StationNames = [];
                    WeatherParameters.WeatherCurrentRegionalConditions.SkipStationIds.push(StationId);
                    WeatherParameters.WeatherCurrentRegionalConditions.StationIds.splice(WeatherParameters.WeatherCurrentRegionalConditions.StationIds.indexOf(StationId), 1);
                    //delete WeatherParameters.WeatherCurrentRegionalConditions.WeatherCurrentConditions[StationId];
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
                        GetRegionalStations(WeatherParameters, Distance);
                    }
                    else
                    {
                        //console.log(WeatherParameters.WeatherCurrentRegionalConditions);
                        PopulateRegionalObservations(WeatherParameters.WeatherCurrentRegionalConditions);
                    }
                }
            },
            error: function (xhr, error, errorThrown)
            {
                //if (xhr.status && xhr.status == 400)
                //{
                //    alert(xhr.responseText);
                //}
                //else
                //{
                //    alert("Something went wrong");
                //}
                console.error("GetMonthPrecipitation failed: " + errorThrown);
            }
        });
    });
};

var PopulateRegionalObservations = function (WeatherCurrentRegionalConditions)
{
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
        Html += "<td>" + WeatherCurrentCondition.Conditions + "</td>";
        Html += "<td>" + (WeatherCurrentCondition.WindSpeed == 0 ? "Calm" : WeatherCurrentCondition.WindDirection + " " + WeatherCurrentCondition.WindSpeed) + "</td>";
        Html += "</tr>";
        tbodyRegionalObservations.append(Html);
    });

};

var ShowRegionalMap = function (WeatherParameters, TomorrowForecast)
{
    var img = new Image();
    var cnvRegionalMap;
    var cnvRegionalMapId;
    var divRegionalMap;
    var canvas;
    var SourceX;
    var SourceY;
    var OffsetY;
    var OffsetX;

    if (TomorrowForecast == true)
    {
        divRegionalMap = divRegionalForecastMap;
        cnvRegionalMapId = "cnvRegionalForecastMap";
    }
    else
    {
        divRegionalMap = divRegionalCurrentMap;
        cnvRegionalMapId = "cnvRegionalCurrentMap";
    }

    // Clear the current image.
    divRegionalMap.empty();

    var RegionalMapLoaded = false;

    var RegionalCities = [];
    var SkipCities = [];

    var RegionalMapOnLoad = function ()
    {
        if (RegionalMapLoaded == false)
        {
            RegionalMapLoaded = true;
            console.log("Image Loaded");

            //divMap.html("<canvas id='cnvMap' /><img id='imgMap' />");
            divRegionalMap.html("<canvas id='" + cnvRegionalMapId + "' />");
            cnvRegionalMap = $("#" + cnvRegionalMapId);
            cnvRegionalMap.attr("width", "640"); // For Chrome.
            cnvRegionalMap.attr("height", "312"); // For Chrome.
            canvas = cnvRegionalMap[0].getContext("2d");

            //SourceY = (50.5 - WeatherParameters.Latitude) * 55.2;
            ////OffsetY = 156;
            //OffsetY = 117;
            ////SourceY -= 156; // Centers map.
            //SourceY -= OffsetY; // Centers map.
            //// Do not allow the map to exceed the max/min coordinates.
            //if (SourceY > (img.height - (OffsetY * 2))) // The OffsetY * 2
            //{
            //    SourceY = img.height - (OffsetY * 2);
            //}
            //else if (SourceY < 0)
            //{
            //    SourceY = 0;
            //}

            //SourceX = ((-127.5 - WeatherParameters.Longitude) * 41.775) * -1;
            ////OffsetX = 320;
            //OffsetX = 240;
            ////SourceX -= 320; // Centers map.
            //SourceX -= OffsetX // Centers map.
            //// Do not allow the map to exceed the max/min coordinates.
            //if (SourceX > (img.width - (OffsetX * 2))) // The OffsetX * 2
            //{
            //    SourceX = img.width - (OffsetX * 2);
            //}
            //else if (SourceX < 0)
            //{
            //    SourceX = 0;
            //}
            OffsetX = 240;
            OffsetY = 117;
            var SourceXY = GetXYFromLatitudeLongitude(WeatherParameters.Latitude, WeatherParameters.Longitude, OffsetX, OffsetY);
            SourceX = SourceXY.X;
            SourceY = SourceXY.Y;


            //canvas.drawImage(img, SourceX, SourceY, 640, 312, 0, 0, 640, 312);
            canvas.drawImage(img, SourceX, SourceY, (OffsetX * 2), (OffsetY * 2), 0, 0, 640, 312);

            //imgRegionalMap = $("#imgRegionalMap");
            //imgRegionalMap.attr("src", cnvRegionalMap[0].toDataURL());

            //http://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&hoursBeforeNow=4&minLon=-73&minLat=40&maxLon=-72&maxLat=41
            ////SourceY = (50.5 - WeatherParameters.Latitude) * 55.2;
            //var maxLat = ((SourceY / 55.2) - 50.5) * -1;
            //var minLat = (((SourceY + (OffsetY * 2)) / 55.2) - 50.5) * -1;
            ////SourceX = ((-127.5 - WeatherParameters.Longitude) * 41.775) * -1;
            //var minLon = (((SourceX * -1) / 41.775) + 127.5) * -1;
            //var maxLon = ((((SourceX + (OffsetX * 2)) * -1) / 41.775) + 127.5) * -1;
            var MinMaxLatLon = GetMinMaxLatitudeLongitude(SourceX, SourceY, OffsetX, OffsetY);
            var maxLat = MinMaxLatLon.MaxLatitude;
            var minLat = MinMaxLatLon.MinLatitude;
            var maxLon = MinMaxLatLon.MaxLongitude;
            var minLon = MinMaxLatLon.MinLongitude;

            var Url = "https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&hoursBeforeNow=1&minLon=" + minLon + "&minLat=" + minLat + "&maxLon=" + maxLon + "&maxLat=" + maxLat;

            //var Gif = new SuperGif({
            //    src: 'images/sunny.gif',
            //    max_width: 56,
            //    loop_delay: 100,
            //    auto_play: true,
            //    canvas: cnvRegionalMap[0],
            //    x: 50,
            //    y: 100,
            //});
            //Gif.load();

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
                        if (Distance < 2.5)
                        {
                            OkToAddCity = false;
                            return false;
                        }
                    });

                    if (OkToAddCity == false)
                    {
                        return true;
                    }

                    RegionalCities.push(RegionalCity);
                }
            }
        });

        $(RegionalCities).each(function ()
        {
            // Get the current conditionals and today's/tonight's forecast for each city.
            var RegionalCity = this;

            $(SkipCities).each(function ()
            {
                var SkipCity = this;
                if (RegionalCity.Latitude == SkipCity.Latitude && RegionalCity.Longitude == SkipCity.Longitude)
                {
                    return true;
                }
            });
            SkipCities.push(RegionalCity);

            var Url = "https://forecast.weather.gov/MapClick.php?FcstType=dwml";
            Url += "&lat=" + RegionalCity.Latitude.toString();
            Url += "&lon=" + RegionalCity.Longitude.toString();
            Url = "cors/?u=" + encodeURIComponent(Url);

            // Load the xml file using ajax 
            $.ajax({
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
                    //var weatherCurrentConditions = new WeatherCurrentConditions(WeatherDwmlParser, null);
                    //console.log(WeatherParameters.WeatherDwmlParser);

                    if (TomorrowForecast == true)
                    {
                        var weatherTravelForecast = new WeatherTravelForecast(weatherDwmlParser);
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
                                }
                            }

                            RegionalMapOnLoad();
                        }

                        //var x = (RegionalCity.Longitude - minLon) * 57;
                        //var y = (maxLat - RegionalCity.Latitude) * 70;

                        //if (y < 30)
                        //{
                        //    y = 30;
                        //}
                        //else if (y > 282)
                        //{
                        //    y = 282;
                        //}

                        //if (x < 40)
                        //{
                        //    x = 40;
                        //}
                        //else if (x > 580)
                        //{
                        //    x = 580;
                        //}
                        var CityXY = GetXYForCity(RegionalCity, maxLat, minLon);
                        var x = CityXY.X;
                        var y = CityXY.Y;

                        // Conditions Icon
                        var Gif = new SuperGif({
                            src: weatherTravelForecast.Icon,
                            max_width: 51,
                            loop_delay: 100,
                            auto_play: true,
                            canvas: cnvRegionalMap[0],
                            x: x,
                            y: y - 15,
                        });
                        Gif.load();

                        // City Name
                        DrawText(canvas, "Star4000", "20px", "#ffffff", x - 40, y - 15, RegionalCity.Name);

                        // Temperature
                        DrawText(canvas, "Star4000 Large Compressed Numbers", "28px", "#ffff00", x - 30, y + 20, weatherTravelForecast.MaximumTemperatue);

                        return;
                    }

                    var Url = "https://www.aviationweather.gov/adds/dataserver_current/httpparam?datasource=metars&requesttype=retrieve&format=xml&hoursBeforeNow=3";
                    Url += "&stationString=" + GetStationIdFromUrl(weatherDwmlParser.data_current_observations.moreWeatherInformation.value);
                    Url = "cors/?u=" + encodeURIComponent(Url);

                    // Load the xml file using ajax 
                    $.ajax({
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
                                    }
                                }

                                RegionalMapOnLoad();
                                return;
                            }

                            ////var x = ((-127.5 - (RegionalCity.Longitude - minLon)) * 41.775) * -1;
                            ////var y = (50.5 - (RegionalCity.Latitude - minLat)) * 55.2
                            ////var x = (RegionalCity.Longitude - minLon) * 41.775;
                            ////x += 44;
                            ////var y = (maxLat - RegionalCity.Latitude) * 55.2;
                            ////y += 23;
                            //var x = (RegionalCity.Longitude - minLon) * 57;
                            //var y = (maxLat - RegionalCity.Latitude) * 70;

                            //if (y < 30)
                            //{
                            //    y = 30;
                            //}
                            //else if (y > 282)
                            //{
                            //    y = 282;
                            //}

                            //if (x < 40)
                            //{
                            //    x = 40;
                            //}
                            //else if (x > 580)
                            //{
                            //    x = 580;
                            //}
                            var CityXY = GetXYForCity(RegionalCity, maxLat, minLon);
                            var x = CityXY.X;
                            var y = CityXY.Y;

                            // Conditions Icon
                            var Gif = new SuperGif({
                                src: weatherCurrentConditions.Icon,
                                max_width: 51,
                                loop_delay: 100,
                                auto_play: true,
                                canvas: cnvRegionalMap[0],
                                x: x,
                                y: y - 15,
                            });
                            Gif.load();

                            // City Name
                            //canvas.font = "28px 'Star4000'";
                            //canvas.shadowColor = "#000000";
                            //canvas.shadowOffsetX = 2;
                            //canvas.shadowOffsetY = 2;
                            //canvas.strokeStyle = "#000000";
                            //canvas.strokeText(RegionalCity.Name, x - 40, y);
                            //canvas.fillStyle = "#ffffff";
                            //canvas.fillText(RegionalCity.Name, x - 40, y);
                            //DrawText(canvas, "Star4000", "28px", "#ffffff", x - 40, y, RegionalCity.Name);
                            DrawText(canvas, "Star4000", "20px", "#ffffff", x - 40, y - 15, RegionalCity.Name);

                            // Temperature
                            //canvas.font = "32px 'Star4000 Large Compressed Numbers'";
                            //canvas.shadowColor = "#000000";
                            //canvas.shadowOffsetX = 2;
                            //canvas.shadowOffsetY = 2;
                            //canvas.strokeStyle = "#000000";
                            //canvas.strokeText(weatherCurrentConditions.Temperature, x - 30, y + 40);
                            //canvas.fillStyle = "#ffff00";
                            //canvas.fillText(weatherCurrentConditions.Temperature, x - 30, y + 40);
                            //DrawText(canvas, "Star4000 Large Compressed Numbers", "32px", "#ffff00", x - 30, y + 40, weatherCurrentConditions.Temperature);
                            DrawText(canvas, "Star4000 Large Compressed Numbers", "28px", "#ffff00", x - 30, y + 20, weatherCurrentConditions.Temperature);

                            //canvas.fillStyle = "";
                            //canvas.strokeStyle = "";
                            //canvas.shadowOffsetX = 0;
                            //canvas.shadowOffsetY = 0;

                        },
                        error: function (xhr, error, errorThrown)
                        {
                            console.error("GetRegionalMapCity METARS failed: " + errorThrown);
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
                        }
                    }

                    RegionalMapOnLoad();
                    return;
                }
            });
        });

        // Draw them onto the map.

    };
    img.onload = RegionalMapOnLoad;
    img.src = "images/basemap2.png";
}

var DrawText = function (canvas, font, size, color, x, y, text)
{
    canvas.font = size + " '" + font + "'";
    canvas.shadowColor = "#000000";
    canvas.shadowOffsetX = 2;
    canvas.shadowOffsetY = 2;
    canvas.strokeStyle = "#000000";
    canvas.lineWidth = 4;
    canvas.strokeText(text, x, y);
    canvas.fillStyle = color;
    canvas.fillText(text, x, y);
    canvas.fillStyle = "";
    canvas.strokeStyle = "";
    canvas.shadowOffsetX = 0;
    canvas.shadowOffsetY = 0;
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

var ShowDopplerMap = function (WeatherParameters, TomorrowForecast)
{
    var img = new Image();
    var cnvDopplerMap;
    var cnvDopplerMapId;
    var divDopplerMap;
    var canvas;
    var SourceX;
    var SourceY;
    var OffsetY;
    var OffsetX;
    var cnvRadarWorkerId;
    var cnvRadarWorker;

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
        canvas = cnvDopplerMap[0].getContext("2d");

        cnvRadarWorker = $("#" + cnvRadarWorkerId);
        cnvRadarWorker.attr("width", "2550"); // For Chrome.
        cnvRadarWorker.attr("height", "1600"); // For Chrome.
        cnvRadarWorker.css("display", "none");
        canvasWorker = cnvRadarWorker[0].getContext("2d");

        OffsetX = 120;
        OffsetY = 69;
        var SourceXY = GetXYFromLatitudeLongitude(WeatherParameters.Latitude, WeatherParameters.Longitude, OffsetX, OffsetY);
        SourceX = SourceXY.X;
        SourceY = SourceXY.Y;

        // Draw them onto the map.
        canvas.drawImage(img, SourceX, SourceY, (OffsetX * 2), (OffsetY * 2), 0, 0, 640, 367);

        // Find the most current doppler radar image.
        var Url = "http://radar.weather.gov/Conus/RadarImg/mosaic_times.txt";
        Url = "cors/?u=" + encodeURIComponent(Url);

        var TimesMax = 6;
        var TimesCount = 0;
        var RadarUrls = [];
        var RadarImages = [];
        var RadarCanvases = [];

        // Load the xml file using ajax 
        $.ajax({
            type: "GET",
            url: Url,
            dataType: "text",
            crossDomain: true,
            cache: false,
            success: function (text)
            {
                //console.log(text);

                // Get the doppler radar image urls.
                var Times = text.split(" \n");
                var TimesUbnd = Times.length - 2;

                for (var Index = TimesUbnd; Index > TimesUbnd - TimesMax; Index--)
                {
                    //http://radar.weather.gov/Conus/RadarImg/Conus_20161004_0028_N0Ronly.gif
                    var Url = "http://radar.weather.gov/Conus/RadarImg/Conus_";
                    Url += Times[Index] + "_N0Ronly.gif";
                    Url = "cors/?u=" + encodeURIComponent(Url);

                    RadarUrls.push(Url);
                }
                //console.log(RadarUrls);

                // Load the most recent doppler radar images.
                $(RadarUrls).each(function (Index, Value)
                {
                    var Url = this.toString();
                    var RadarImage = new Image();

                    RadarImage.onload = function ()
                    {
                        TimesCount++;

                        var RadarImage = RadarImages[Index];
                        var RadarCanvas = RadarCanvases[Index][0].getContext("2d");

                        canvasWorker.clearRect(0, 0, RadarCanvas.canvas.width, RadarCanvas.canvas.height);

                        canvasWorker.imageSmoothingEnabled = false;
                        canvasWorker.webkitImageSmoothingEnabled = false;
                        canvasWorker.mozImageSmoothingEnabled = false;
                        canvasWorker.msImageSmoothingEnabled = false;
                        canvasWorker.oImageSmoothingEnabled = false;

                        canvasWorker.drawImage(RadarImage, 0, 0, 2550, 1600);

                        //canvas.drawImage(RadarImage, 0, 0);

                        var RadarOffsetX = 120;
                        var RadarOffsetY = 69;
                        //var RadarSourceXY = GetRadarXYFromLatitudeLongitude(WeatherParameters.Latitude, WeatherParameters.Longitude, OffsetX, OffsetY);
                        var RadarSourceXY = GetXYFromLatitudeLongitude(WeatherParameters.Latitude, WeatherParameters.Longitude, OffsetX, OffsetY);
                        var RadarSourceX = RadarSourceXY.X;
                        var RadarSourceY = RadarSourceXY.Y;

                        // Draw them onto the map.
                        RadarCanvas.clearRect(0, 0, RadarCanvas.canvas.width, RadarCanvas.canvas.height);

                        // Disable Image Smoothing for the doppler radar!
                        RadarCanvas.imageSmoothingEnabled = false;
                        RadarCanvas.webkitImageSmoothingEnabled = false;
                        RadarCanvas.mozImageSmoothingEnabled = false;
                        RadarCanvas.msImageSmoothingEnabled = false;
                        RadarCanvas.oImageSmoothingEnabled = false;

                        //RadarImage.width = 2550;

                        RadarCanvas.drawImage(canvasWorker.canvas, RadarSourceX, RadarSourceY, (RadarOffsetX * 2), (RadarOffsetY * 2), 0, 0, 640, 367);
                        RemoveDopplerRadarImageNoise(RadarCanvas);

                        if (TimesCount == TimesMax)
                        {
                            console.log("Doppler Radar Images Loaded");

                            //_DopplerRadarInterval = window.setTimeout(function ()
                            //{
                            //    var RadarCanvas = RadarCanvases[0][0].getContext("2d");
                            //    canvas.drawImage(img, SourceX, SourceY, (OffsetX * 2), (OffsetY * 2), 0, 0, 640, 312);
                            //    MergeDopplerRadarImage(canvas, RadarCanvas);
                            //}, 2000);

                            //_DopplerRadarInterval = window.setInterval(function ()
                            //{
                            //    var RadarCanvas = RadarCanvases[_DopplerRadarImageIndex][0].getContext("2d");
                            //    canvas.drawImage(img, SourceX, SourceY, (OffsetX * 2), (OffsetY * 2), 0, 0, 640, 312);
                            //    MergeDopplerRadarImage(canvas, RadarCanvas);

                            //    _DopplerRadarImageIndex--;
                            //    if (_DopplerRadarImageIndex == -1)
                            //    {
                            //        _DopplerRadarImageIndex = 3;
                            //    }
                            //}, 500);

                            _DopplerRadarImageIndex = TimesMax - 2;

                            var ShowDopplarRadarImage = function ()
                            {
                                var RadarCanvas = RadarCanvases[_DopplerRadarImageIndex][0].getContext("2d");
                                canvas.drawImage(img, SourceX, SourceY, (OffsetX * 2), (OffsetY * 2), 0, 0, 640, 367);
                                MergeDopplerRadarImage(canvas, RadarCanvas);

                                var Interval = 500;
                                _DopplerRadarImageIndex--;
                                if (_DopplerRadarImageIndex == -1)
                                {
                                    Interval = 2000;
                                    _DopplerRadarImageIndex = TimesMax - 1;
                                }

                                _DopplerRadarInterval = window.setTimeout(function () { ShowDopplarRadarImage() }, Interval);
                            };
                            _DopplerRadarInterval = window.setTimeout(function () { ShowDopplarRadarImage() }, 5000);
                            var RadarCanvas = RadarCanvases[0][0].getContext("2d");
                            canvas.drawImage(img, SourceX, SourceY, (OffsetX * 2), (OffsetY * 2), 0, 0, 640, 367);
                            MergeDopplerRadarImage(canvas, RadarCanvas);

                        }
                    };
                    RadarImage.src = Url;
                    RadarImages.push(RadarImage);

                    var id = "cnvRadar" + Index.toString();
                    var RadarCanvas = $("#" + id);
                    if (RadarCanvas.length == 0)
                    {
                        $("body").append("<canvas id='" + id + "' />");
                        RadarCanvas = $("#" + id);
                        RadarCanvas.attr("width", "640"); // For Chrome.
                        RadarCanvas.attr("height", "367"); // For Chrome.
                        RadarCanvas.css("display", "none");
                    }
                    RadarCanvases.push(RadarCanvas);
                });

            },
            error: function (xhr, error, errorThrown)
            {
                console.error("Get mosaic_times.txt failed: " + errorThrown);
            }
        });


        //var d = new Image();
        //d.onload = function ()
        //{
            
        //    //d.width = 2550;
        //    //canvas.drawImage(d, 0, 0, 320, 480, 0, 0, 640, 312);
        //    //canvas.drawImage(GetCanvasForImage(d), 0, 0, 320, 480);
        //    //canvas.drawImage(GetImageData(d), 0, 0);

        //    //var c = ManImage1(d);            
        //    //canvas.drawImage(c, 0, 0);
        //};
        //d.src = "images/Conus_20161004_0028_N0Ronly.gif";

    };
    img.src = "images/4000RadarMap2.jpg";
}

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


//var GetCanvasForImage = function (image)
//{
//    var id = "Canvas" + (new Date()).getTime().toString();
//    $("body").append("<canvas id='" + id + "' />");
//    var cnv = $("#" + id);
//    var canvas = cnv[0].getContext("2d");

//    canvas.drawImage(image, 0, 0, image.width, image.height);
//    var imageData = canvas.getImageData(0, 0, image.width, image.height);

//    return cnv[0];
//};

//var GetImageData = function (image)
//{
//    var id = "Canvas" + (new Date()).getTime().toString();
//    $("body").append("<canvas id='" + id + "' />");
//    var cnv = $("#" + id);
//    var canvas = cnv[0].getContext("2d");

//    canvas.drawImage(image, 0, 0, image.width, image.height);
//    return canvas.getImageData(0, 0, image.width, image.height);
//};

//var ManImage1 = function (image)
//{
//    var id = "Canvas" + (new Date()).getTime().toString();
//    $("body").append("<canvas id='" + id + "' />");
//    var cnv = $("#" + id);
//    cnv.attr("width", "640"); // For Chrome.
//    cnv.attr("height", "312"); // For Chrome.
//    var canvas = cnv[0].getContext("2d");

//    canvas.drawImage(image, 0, 0, image.width, image.height);
//    var imageData = canvas.getImageData(0, 0, image.width, image.height);

//    // examine every pixel, 
//    // change any old rgb to the new-rgb
//    for (var i = 0; i < imageData.data.length; i += 4)
//    {
//        // i + 0 = red
//        // i + 1 = green
//        // i + 2 = blue
//        // i + 3 = alpha (0 = transparent, 255 = opaque)

//        // is this pixel the old rgb?
//        if ((imageData.data[i] == 1 && imageData.data[i + 1] == 159 && imageData.data[i + 2] == 244)
//            || (imageData.data[i] >= 200 && imageData.data[i + 1] >= 200 && imageData.data[i + 2] >= 200)
//            || (imageData.data[i] == 4 && imageData.data[i + 1] == 233 && imageData.data[i + 2] == 231)
//            || (imageData.data[i] == 3 && imageData.data[i + 1] == 0 && imageData.data[i + 2] == 244))
//        {
//            // change to your new rgb

//            // Transparent
//            imageData.data[i] = 0;
//            imageData.data[i + 1] = 0;
//            imageData.data[i + 2] = 0;
//            imageData.data[i + 3] = 0;
//        }
//    }

//    canvas.putImageData(imageData, 0, 0);

//    cnv.remove();

//    return cnv[0];
//};

var RemoveDopplerRadarImageNoise = function (RadarCanvas)
{
    var RadarImageData = RadarCanvas.getImageData(0, 0, RadarCanvas.canvas.width, RadarCanvas.canvas.height);

    // examine every pixel, 
    // change any old rgb to the new-rgb
    for (var i = 0; i < RadarImageData.data.length; i += 4)
    {
        // i + 0 = red
        // i + 1 = green
        // i + 2 = blue
        // i + 3 = alpha (0 = transparent, 255 = opaque)

        // is this pixel the old rgb?
        if ((RadarImageData.data[i] == 1 && RadarImageData.data[i + 1] == 159 && RadarImageData.data[i + 2] == 244)
            || (RadarImageData.data[i] >= 200 && RadarImageData.data[i + 1] >= 200 && RadarImageData.data[i + 2] >= 200)
            || (RadarImageData.data[i] == 4 && RadarImageData.data[i + 1] == 233 && RadarImageData.data[i + 2] == 231)
            || (RadarImageData.data[i] == 3 && RadarImageData.data[i + 1] == 0 && RadarImageData.data[i + 2] == 244))
        {
            // change to your new rgb

            // Transparent
            RadarImageData.data[i] = 0;
            RadarImageData.data[i + 1] = 0;
            RadarImageData.data[i + 2] = 0;
            RadarImageData.data[i + 3] = 0;
        }
    }

    RadarCanvas.putImageData(RadarImageData, 0, 0);

    //MapCanvas.drawImage(RadarCanvas.canvas, 0, 0);
};

var MergeDopplerRadarImage = function (MapCanvas, RadarCanvas)
{
    var MapImageData = MapCanvas.getImageData(0, 0, MapCanvas.canvas.width, MapCanvas.canvas.height);
    var RadarImageData = RadarCanvas.getImageData(0, 0, RadarCanvas.canvas.width, RadarCanvas.canvas.height);

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

    RadarCanvas.putImageData(RadarImageData, 0, 0);

    MapCanvas.drawImage(RadarCanvas.canvas, 0, 0);
};

