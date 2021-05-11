

var GetWeatherIconFromSummary = function (WeatherParameters, WeatherSummary, OverrideIsDay)
{
    var Now = new Date();
    var Icon = "";

    //if (WeatherParameters && WeatherParameters.AlmanacInfo)
    //{
    //    alert("t");
    //}
    //else
    //{
    //    alert("f");
    //}

    var IsDay = true;
    if (WeatherParameters && WeatherParameters.AlmanacInfo)
    {
        //alert(WeatherParameters.AlmanacInfo.TodaySunSetLocal + " " + WeatherParameters.AlmanacInfo.TodaySunRiseLocal)

        if (Now.getTime() > WeatherParameters.AlmanacInfo.TodaySunSetLocal.getTime())
        {
            IsDay = false;
        }
        else if (Now.getTime() < WeatherParameters.AlmanacInfo.TodaySunRiseLocal.getTime())
        {
            IsDay = false;
        }
    }

    if (OverrideIsDay !== undefined)
    {
        IsDay = OverrideIsDay;
    }

    switch (WeatherSummary)
    {
        case "Sunny":
        case "Clear":
        case "Patchy Frost":
        case "Areas Frost":
        case "Frost":
        case "Hot":
        case "Cold":
        case "Few Clouds":
            Icon = IsDay === true ? "cc_clear1.gif" : "cc_clear0.gif";
            break;

        case "Mostly Cloudy":
        case "Partly Sunny":
        case "Partly Clear":
        case "Increasing Clouds":
        case "Becoming Cloudy":
            Icon = IsDay === true ? "cc_mostlycloudy1.gif" : "cc_mostlycloudy0.gif";
            break;

        case "Mostly Sunny":
        case "Mostly Clear":
        case "Partly Cloudy":
        case "Fair":
        case "Decreasing Clouds":
        case "Clearing":
        case "Gradual Clearing":
        case "Clearing Late":
        case "Becoming Sunny":
        case "Patchy Haze":
        case "Areas Haze":
        case "Haze":
            Icon = IsDay === true ? "cc_partlycloudy1.gif" : "cc_partlycloudy0.gif";
            break;

        case "Cloudy":
        case "Overcast": // mjb 10/02/19
            Icon = "cc_cloudy.gif";
            break;

        case "Fog":
        case "Patchy Fog":
        case "Dense Fog":
        case "Areas Fog":
        case "Patchy Ice Fog":
        case "Areas Ice Fog":
        case "Ice Fog":
        case "Patchy Freezing Fog":
        case "Areas Freezing Fog":
        case "Freezing Fog":
        case "Patchy Smoke":
        case "Areas Smoke":
        case "Smoke":
        case "Patchy Ash":
        case "Areas Ash":
        case "Volcanic Ash":
            Icon = "cc_fog.gif";
            break;

        case "Blowing Snow":
            Icon = "blowing-snow.gif";
            break;

        case "Blowing Dust":
        case "Blowing Sand":
            Icon = "cc_windy.gif";
            break;

        //case "Blowing Sand":
        //    Icon = "cc_windy.gif";
        //    break;

        case "Ice Crystals":
        case "Areas Ice Crystals":
        case "Patchy Ice Crystals":
        case "Sleet":
        case "Slight Chance Sleet":
        case "Chance Sleet":
        case "Sleet Likely ":
            Icon = "sleet.gif";
            break;

        case "Freezing Spray":
            Icon = "cc_freezingrain.gif";
            break;

        case "Slight Chance Rain Showers":
        case "Chance Rain Showers":
        case "Slight Chance Rain":
        case "Chance Rain":
            Icon = "ef_scatshowers.gif";
            break;

        case "Showers":
        case "Showers Likely":
        case "Rain Showers Likely":
        case "Rain Showers":
        case "Slight Chance Drizzle":
        case "Chance Drizzle":
        case "Drizzle Likely":
        case "Light Drizzle":
        case "Light Drizzle Fog":
        case "Drizzle":
        case "Drizzle Fog":
        case "Light Rain":
        case "Light Rain Fog":
        case "Light Rain Fog/Mist":
        case "Lt Rain":
        case "Lt Rain Fog":
        case "Lt Rain, Fog":
        case "Drizzle Patchy Fog":
            Icon = "cc_showers.gif";
            break;

        case "Rain Likely":
        case "Rain":
        case "Heavy Rain":
            Icon = "cc_rain.gif";
            break;

        case "Slight Chance Snow Showers":
        case "Chance Snow Showers":
        case "Slight Chance Flurries":
        case "Flurries Likely":
        case "Flurries":
        case "Slight Chance Snow":
        case "Scattered Flurries":
            Icon = "ef_scatsnowshowers.gif";
            break;

        case "Snow Showers Likely":
        case "Snow Showers":
        case "Chance Flurries":
        case "Chance Snow":
        case "Light Snow":
        case "Lt Snow":
        case "Light Snow Fog/Mist":
        case "Lt Snow, Fog":
            Icon = "light-snow.gif";
            break;

        case "Snow Likely":
        case "Snow":
        case "Blizzard":
            Icon = "heavy-snow.gif";
            break;

        case "Rain/Snow":
        case "Slight Chance Rain/Snow":
        case "Chance Rain/Snow":
        case "Rain/Snow Likely":
            Icon = "cc_rainsnow.gif";
            break;

        case "Freezing Rain":
        case "Slight Chance Freezing Rain":
        case "Chance Freezing Rain":
        case "Freezing Rain Likely":
        case "Freezing Drizzle":
        case "Freezing Drizzle Likely":
        case "Chance Freezing Drizzle":
        case "Slight Chance Freezing Drizzle":
        case "Slight Chance Rain/Freezing Rain":
        case "Chance Rain/Freezing Rain":
        case "Rain/Freezing Rain Likely":
        case "Rain/Freezing Rain":
            Icon = "cc_freezingrain.gif";
            break;

        case "Slight Chance Wintry Mix":
        case "Chance Wintry Mix":
        case "Wintry Mix Likely":
        case "Wintry Mix":
            Icon = "cc_mix.gif";
            break;

        case "Slight Chance Rain/Sleet":
        case "Chance Rain/Sleet":
        case "Rain/Sleet Likely":
        case "Rain/Sleet":
        case "Slight Chance Snow/Sleet":
        case "Chance Snow/Sleet":
        case "Snow/Sleet Likely":
        case "Snow/Sleet":
            Icon = "freezing-rain-sleet.gif";
            break;

        case "Isolated Snow":
            Icon = "ef_scatsnowshowers.gif";
            break;

        case "Isolated Thunderstorms":
            Icon = "ef_isolatedtstorms.gif";
            break;

        case "Slight Chance Thunderstorms":
        case "Chance Thunderstorms":
            Icon = "ef_scattstorms.gif";
            break;

        case "Thunderstorms Likely":
        case "Thunderstorms":
        case "Severe Tstms":
            Icon = "cc_tstorm.gif";
            break;

        case "Windy":
        case "Breezy":
        case "Blustery":
        case "Water Spouts":
            Icon = "cc_windy.gif";
            break;

        default:
            return null;
    }

    Icon = "images/" + Icon;
    return Icon;
};

var GetWeatherIconFromIconLink = function (WeatherIconLink, WeatherConditions, WeatherParameters, OverrideIsDay)
{
    //http://forecast.weather.gov/newimages/medium/few.png
    var Icon = "";
    var SummaryIcon = "";

    if (WeatherConditions)
    {
        SummaryIcon = GetWeatherIconFromSummary(WeatherParameters, WeatherConditions, OverrideIsDay);
        if (SummaryIcon)
        {
            return SummaryIcon;
        }
    }

    // mjb 10/02/19 Begin
    if (WeatherParameters)
    {
        if (WeatherParameters.WeatherCurrentConditions)
        {
            SummaryIcon = GetWeatherIconFromSummary(WeatherParameters, WeatherParameters.WeatherCurrentConditions.Conditions, OverrideIsDay);
            if (SummaryIcon)
            {
                return SummaryIcon;
            }
        }
    }
    // mjb 10/02/19 End

    if (!WeatherIconLink)
    {
        return "";
    }
    else if (WeatherIconLink === 'images/')
    {
        return "";
    }

    var IconLinkName = GetFileNameFromUrl(WeatherIconLink.toLowerCase());

    //DualImage.php?i=few&j=hi_tsra&jp=20
    if (IconLinkName.indexOf("dualimage.php") !== -1)
    {
        var ImageParts = IconLinkName.split('&');
        IconLinkName = ImageParts[1].split('=')[1];
        //if (ImageParts.length == 3)
        //{
        //    IconLinkName += ImageParts[2].split('=')[1];
        //    //IconLinkName = ImageParts[2].split('=')[1];
        //}
        IconLinkName += ".png";
    }

    switch (IconLinkName)
    {

        case "skc.png":
        case "skc10.png":
        case "skc20.png":
        case "skc30.png":
        case "skc40.png":
        case "skc50.png":
        case "skc60.png":
        case "skc70.png":
        case "skc80.png":
        case "skc90.png":
        case "skc100.png":
        case "m_skc.png":
            //case "Sunny":
            //case "Clear":
            //case "Patchy Frost":
            //case "Areas Frost":
            //case "Frost":
            //case "Hot":
            //case "Cold":
            Icon = "cc_clear1.gif";
            break;

        case "few.png":
        case "few10.png":
        case "few20.png":
        case "few30.png":
        case "few40.png":
        case "few50.png":
        case "few60.png":
        case "few70.png":
        case "few80.png":
        case "few90.png":
        case "few100.png":
        case "m_few.png":
            Icon = "Mostly-Sunny.gif";
            break;

        case "hot.png":
            Icon = "cc_hot.gif";
            break;

        case "cold.png":
            Icon = "cc_cold.gif";
            break;

        case "nskc.png":
        case "nskc10.png":
        case "nskc20.png":
        case "nskc30.png":
        case "nskc40.png":
        case "nskc50.png":
        case "nskc60.png":
        case "nskc70.png":
        case "nskc80.png":
        case "nskc90.png":
        case "nskc100.png":
            Icon = "cc_clear0.gif";
            break;

        case "nfew.png":
        case "nfew10.png":
        case "nfew20.png":
        case "nfew30.png":
        case "nfew40.png":
        case "nfew50.png":
        case "nfew60.png":
        case "nfew70.png":
        case "nfew80.png":
        case "nfew90.png":
        case "nfew100.png":
            Icon = "Mostly-Clear2.gif";
            break;

        case "bkn.png":
        case "bkn10.png":
        case "bkn20.png":
        case "bkn30.png":
        case "bkn40.png":
        case "bkn50.png":
        case "bkn60.png":
        case "bkn70.png":
        case "bkn80.png":
        case "bkn90.png":
        case "bkn100.png":
            //case "Mostly Cloudy":
            //case "Partly Sunny":
            //case "Partly Sunny":
            //case "Increasing Clouds":
            //case "Becoming Cloudy":
            Icon = "cc_mostlycloudy1.gif";
            break;

        case "nbkn.png":
        case "nbkn10.png":
        case "nbkn20.png":
        case "nbkn30.png":
        case "nbkn40.png":
        case "nbkn50.png":
        case "nbkn60.png":
        case "nbkn70.png":
        case "nbkn80.png":
        case "nbkn90.png":
        case "nbkn100.png":
            //case "Mostly Cloudy":
            //case "Partly Sunny":
            //case "Partly Sunny":
            //case "Increasing Clouds":
            //case "Becoming Cloudy":
            Icon = "cc_mostlycloudy0.gif";
            break;

        case "sct.png":
        case "sct10.png":
        case "sct20.png":
        case "sct30.png":
        case "sct40.png":
        case "sct50.png":
        case "sct60.png":
        case "sct70.png":
        case "sct80.png":
        case "sct90.png":
        case "sct100.png":
        case "m_sct.png":
            //case "Mostly Sunny":
            //case "Mostly Clear":
            //case "Partly Cloudy":
            //case "Fair":
            //case "Decreasing Clouds":
            //case "Clearing":
            //case "Gradual Clearing":
            //case "Clearing Late":
            //case "Becoming Sunny":
            //case "Patchy Haze":
            //case "Areas Haze":
            //case "Haze":
            Icon = "cc_partlycloudy1.gif";
            break;

        case "nsct.png":
        case "nsct10.png":
        case "nsct20.png":
        case "nsct30.png":
        case "nsct40.png":
        case "nsct50.png":
        case "nsct60.png":
        case "nsct70.png":
        case "nsct80.png":
        case "nsct90.png":
        case "nsct100.png":
        case "m_nsct.png":
            Icon = "cc_partlycloudy0.gif";
            break;

        case "ovc.png":
        case "ovc10.png":
        case "ovc20.png":
        case "ovc30.png":
        case "ovc40.png":
        case "ovc50.png":
        case "ovc60.png":
        case "ovc70.png":
        case "ovc80.png":
        case "ovc90.png":
        case "ovc100.png":
        case "novc.png":
        case "novc10.png":
        case "novc20.png":
        case "novc30.png":
        case "novc40.png":
        case "novc50.png":
        case "novc60.png":
        case "novc70.png":
        case "novc80.png":
        case "novc90.png":
        case "novc100.png":
            //case "Cloudy":
            Icon = "cc_cloudy.gif";
            break;

        case "hz.png":
            Icon = "cc_haze.gif";
            break;

        case "fg.png":
        case "fg10.png":
        case "fg20.png":
        case "fg30.png":
        case "fg40.png":
        case "fg50.png":
        case "fg60.png":
        case "fg70.png":
        case "fg80.png":
        case "fg90.png":
        case "fg100.png":
        case "nfg.png":
        case "nfg10.png":
        case "nfg20.png":
        case "nfg30.png":
        case "nfg40.png":
        case "nfg50.png":
        case "nfg60.png":
        case "nfg70.png":
        case "nfg80.png":
        case "nfg90.png":
        case "nfg100.png":
        case "sctfg.png":
        case "sctfg10.png":
        case "sctfg20.png":
        case "sctfg30.png":
        case "sctfg40.png":
        case "sctfg50.png":
        case "sctfg60.png":
        case "sctfg70.png":
        case "sctfg80.png":
        case "sctfg90.png":
        case "sctfg100.png":
        case "nbknfg.png":
        case "nbknfg10.png":
        case "nbknfg20.png":
        case "nbknfg30.png":
        case "nbknfg40.png":
        case "nbknfg50.png":
        case "nbknfg60.png":
        case "nbknfg70.png":
        case "nbknfg80.png":
        case "nbknfg90.png":
        case "nbknfg100.png":
        case "du.png":
        case "du10.png":
        case "du20.png":
        case "du30.png":
        case "du40.png":
        case "du50.png":
        case "du60.png":
        case "du70.png":
        case "du80.png":
        case "du90.png":
        case "du100.png":
        case "ndu.png":
        case "ndu10.png":
        case "ndu20.png":
        case "ndu30.png":
        case "ndu40.png":
        case "ndu50.png":
        case "ndu60.png":
        case "ndu70.png":
        case "ndu80.png":
        case "ndu90.png":
        case "ndu100.png":
            Icon = "cc_fog.gif";
            break;

        case "fu.png":
        case "fu10.png":
        case "fu20.png":
        case "fu30.png":
        case "fu40.png":
        case "fu50.png":
        case "fu60.png":
        case "fu70.png":
        case "fu80.png":
        case "fu90.png":
        case "fu100.png":
        case "nfu.png":
        case "nfu10.png":
        case "nfu20.png":
        case "nfu30.png":
        case "nfu40.png":
        case "nfu50.png":
        case "nfu60.png":
        case "nfu70.png":
        case "nfu80.png":
        case "nfu90.png":
        case "nfu100.png":
            Icon = "cc_smoke.gif";
            break;

        //case "Blowing Snow":
        //    Icon = "blowing-snow.gif";
        //    break;

        //case "Blowing Dust":
        //case "Blowing Sand":
        //    Icon = "cc_windy.gif";
        //    break;

        //case "Blowing Sand":
        //    Icon = "cc_windy.gif";
        //    break;

        case "nsn_ip.png":
        case "nsn_ip10.png":
        case "nsn_ip20.png":
        case "nsn_ip30.png":
        case "nsn_ip40.png":
        case "nsn_ip50.png":
        case "nsn_ip60.png":
        case "nsn_ip70.png":
        case "nsn_ip80.png":
        case "nsn_ip90.png":
        case "nsn_ip100.png":
        case "ip.png":
        case "ip10.png":
        case "ip20.png":
        case "ip30.png":
        case "ip40.png":
        case "ip50.png":
        case "ip60.png":
        case "ip70.png":
        case "ip80.png":
        case "ip90.png":
        case "ip100.png":
            //case "Ice Crystals":
            //case "Areas Ice Crystals":
            //case "Patchy Ice Crystals":
            //case "Sleet":
            //case "Slight Chance Sleet":
            //case "Chance Sleet":
            //case "Sleet Likely ":
            Icon = "sleet.gif";
            break;

        //case "Freezing Spray":
        //    Icon = "cc_freezingrain.gif";
        //    break;

        case "hi_shwrs10.png":
        case "hi_shwrs20.png":
        case "hi_shwrs30.png":
        case "hi_shwrs40.png":
        case "hi_shwrs50.png":
        case "hi_nshwrs10.png":
        case "hi_nshwrs20.png":
        case "hi_nshwrs30.png":
        case "hi_nshwrs40.png":
        case "hi_nshwrs50.png":
        case "shra10.png":
        case "shra20.png":
        case "shra30.png":
        case "shra40.png":
        case "shra50.png":
        case "nshra10.png":
        case "nshra20.png":
        case "nshra30.png":
        case "nshra40.png":
        case "nshra50.png":
        case "ra10.png":
        case "ra20.png":
        case "ra30.png":
        case "ra40.png":
        case "ra50.png":
        case "nra10.png":
        case "nra20.png":
        case "nra30.png":
        case "nra40.png":
        case "nra50.png":
            //case "Slight Chance Rain Showers":
            //case "Chance Rain Showers":
            //case "Slight Chance Rain":
            //case "Chance Rain":
            Icon = "ef_scatshowers.gif";
            break;

        //case "hi_shwrs.png":
        //case "hi_nshwrs.png":
        case "m_shra.png":
        case "m_nshra.png":
            //case "shra.png":
            //case "nshra.png":
            Icon = "CC_Showers.gif";
            break;

        case "m_ra.png":
        case "m_nra.png":
            //case "ra.png":
            //case "nra.png":
            Icon = "CC_Rain.gif";
            break;

        case "hi_shwrs.png":
        case "hi_shwrs60.png":
        case "hi_shwrs70.png":
        case "hi_shwrs80.png":
        case "hi_shwrs90.png":
        case "hi_shwrs100.png":
        case "hi_nshwrs.png":
        case "hi_nshwrs60.png":
        case "hi_nshwrs70.png":
        case "hi_nshwrs80.png":
        case "hi_nshwrs90.png":
        case "hi_nshwrs100.png":
        case "shra.png":
        case "shra1.png":
        case "shra60.png":
        case "shra70.png":
        case "shra80.png":
        case "shra90.png":
        case "shra100.png":
        case "nshra.png":
        case "nshra1.png":
        case "nshra60.png":
        case "nshra70.png":
        case "nshra80.png":
        case "nshra90.png":
        case "nshra100.png":
            //case "Rain Showers Likely":
            //case "Rain Showers":
            //case "Slight Chance Drizzle":
            //case "Chance Drizzle":
            //case "Drizzle Likely":
            //case "Drizzle":
            Icon = "cc_showers.gif";
            break;

        case "nra.png":
        case "nra60.png":
        case "nra70.png":
        case "nra80.png":
        case "nra90.png":
        case "nra100.png":
        case "ra.png":
        case "ra60.png":
        case "ra70.png":
        case "ra80.png":
        case "ra90.png":
        case "ra100.png":
            //case "Rain Likely":
            //case "Rain":
            //case "Heavy Rain":
            Icon = "cc_rain.gif";
            break;

        case "nsn10.png":
        case "nsn20.png":
        case "nsn30.png":
        case "nsn40.png":
        case "nsn50.png":
        case "sn10.png":
        case "sn20.png":
        case "sn30.png":
        case "sn40.png":
        case "sn50.png":
            //case "Slight Chance Snow Showers":
            //case "Chance Snow Showers":
            //case "Slight Chance Flurries":
            //case "Flurries Likely":
            //case "Flurries":
            //case "Slight Chance Snow":
            Icon = "ef_scatsnowshowers.gif";
            break;

        case "blizzard10.png":
        case "blizzard20.png":
        case "blizzard30.png":
        case "blizzard40.png":
        case "blizzard50.png":
        case "nblizzard10.png":
        case "nblizzard20.png":
        case "nblizzard30.png":
        case "nblizzard40.png":
        case "nblizzard50.png":
            //case "Snow Showers Likely":
            //case "Snow Showers":
            //case "Chance Flurries":
            //case "Chance Snow":
            Icon = "cc_snowshowers.gif";
            break;

        //case "Snow Likely":
        //case "Snow":
        case "blizzard60.png":
        case "blizzard70.png":
        case "blizzard80.png":
        case "blizzard90.png":
        case "blizzard100.png":
        case "blizzard.png":
        case "nblizzard60.png":
        case "nblizzard70.png":
        case "nblizzard80.png":
        case "nblizzard90.png":
        case "nblizzard100.png":
        case "nblizzard.png":
        case "nsn.png":
        case "nsn60.png":
        case "nsn70.png":
        case "nsn80.png":
        case "nsn90.png":
        case "nsn100.png":
        case "sn.png":
        case "sn60.png":
        case "sn70.png":
        case "sn80.png":
        case "sn90.png":
        case "sn100.png":
            Icon = "cc_snow.gif";
            break;

        case "rasn.png":
        case "rasn10.png":
        case "rasn20.png":
        case "rasn30.png":
        case "rasn40.png":
        case "rasn50.png":
        case "rasn60.png":
        case "rasn70.png":
        case "rasn80.png":
        case "rasn90.png":
        case "rasn100.png":
        case "ra_sn.png":
        case "ra_sn10.png":
        case "ra_sn20.png":
        case "ra_sn30.png":
        case "ra_sn40.png":
        case "ra_sn50.png":
        case "ra_sn60.png":
        case "ra_sn70.png":
        case "ra_sn80.png":
        case "ra_sn90.png":
        case "ra_sn100.png":
        case "nrasn.png":
        case "nrasn10.png":
        case "nrasn20.png":
        case "nrasn30.png":
        case "nrasn40.png":
        case "nrasn50.png":
        case "nrasn60.png":
        case "nrasn70.png":
        case "nrasn80.png":
        case "nrasn90.png":
        case "nrasn100.png":
        case "nra_sn.png":
        case "nra_sn10.png":
        case "nra_sn20.png":
        case "nra_sn30.png":
        case "nra_sn40.png":
        case "nra_sn50.png":
        case "nra_sn60.png":
        case "nra_sn70.png":
        case "nra_sn80.png":
        case "nra_sn90.png":
        case "nra_sn100.png":
            //case "Rain/Snow":
            //case "Slight Chance Rain/Snow":
            //case "Chance Rain/Snow":
            //case "Rain/Snow Likely":
            Icon = "cc_rainsnow.gif";
            break;

        case "fzra.png":
        case "fzra10.png":
        case "fzra20.png":
        case "fzra30.png":
        case "fzra40.png":
        case "fzra50.png":
        case "fzra60.png":
        case "fzra70.png":
        case "fzra80.png":
        case "fzra90.png":
        case "fzra100.png":
        case "nfzra.png":
        case "nfzra10.png":
        case "nfzra20.png":
        case "nfzra30.png":
        case "nfzra40.png":
        case "nfzra50.png":
        case "nfzra60.png":
        case "nfzra70.png":
        case "nfzra80.png":
        case "nfzra90.png":
        case "nfzra100.png":
        case "ra_fzra.png":
        case "ra_fzra10.png":
        case "ra_fzra20.png":
        case "ra_fzra30.png":
        case "ra_fzra40.png":
        case "ra_fzra50.png":
        case "ra_fzra60.png":
        case "ra_fzra70.png":
        case "ra_fzra80.png":
        case "ra_fzra90.png":
        case "ra_fzra100.png":
        case "nra_fzra.png":
        case "nra_fzra10.png":
        case "nra_fzra20.png":
        case "nra_fzra30.png":
        case "nra_fzra40.png":
        case "nra_fzra50.png":
        case "nra_fzra60.png":
        case "nra_fzra70.png":
        case "nra_fzra80.png":
        case "nra_fzra90.png":
        case "nra_fzra100.png":
            //case "Freezing Rain":
            //case "Slight Chance Freezing Rain":
            //case "Chance Freezing Rain":
            //case "Freezing Rain Likely":
            //case "Freezing Drizzle":
            //case "Freezing Drizzle Likely":
            //case "Chance Freezing Drizzle":
            //case "Slight Chance Freezing Drizzle":
            //case "Slight Chance Rain/Freezing Rain":
            //case "Chance Rain/Freezing Rain":
            //case "Rain/Freezing Rain Likely":
            //case "Rain/Freezing Rain":
            Icon = "cc_freezingrain.gif";
            break;

        case "mix.png":
        case "mix10.png":
        case "mix20.png":
        case "mix30.png":
        case "mix40.png":
        case "mix50.png":
        case "mix60.png":
        case "mix70.png":
        case "mix80.png":
        case "mix90.png":
        case "mix100.png":
        case "nmix.png":
        case "nmix10.png":
        case "nmix20.png":
        case "nmix30.png":
        case "nmix40.png":
        case "nmix50.png":
        case "nmix60.png":
        case "nmix70.png":
        case "nmix80.png":
        case "nmix90.png":
        case "nmix100.png":
        case "fzra_sn.png":
        case "fzra_sn10.png":
        case "fzra_sn20.png":
        case "fzra_sn30.png":
        case "fzra_sn40.png":
        case "fzra_sn50.png":
        case "fzra_sn60.png":
        case "fzra_sn70.png":
        case "fzra_sn80.png":
        case "fzra_sn90.png":
        case "fzra_sn100.png":
        case "nfzra_sn.png":
        case "nfzra_sn10.png":
        case "nfzra_sn20.png":
        case "nfzra_sn30.png":
        case "nfzra_sn40.png":
        case "nfzra_sn50.png":
        case "nfzra_sn60.png":
        case "nfzra_sn70.png":
        case "nfzra_sn80.png":
        case "nfzra_sn90.png":
        case "nfzra_sn100.png":
            //case "Slight Chance Wintry Mix":
            //case "Chance Wintry Mix":
            //case "Wintry Mix Likely":
            //case "Wintry Mix":
            //case "Slight Chance Wintry Mix":
            //case "Chance Wintry Mix":
            //case "Wintry Mix Likely":
            //case "Wintry Mix":
            Icon = "cc_mix.gif";
            break;

        case "raip.png":
        case "raip10.png":
        case "raip20.png":
        case "raip30.png":
        case "raip40.png":
        case "raip50.png":
        case "raip60.png":
        case "raip70.png":
        case "raip80.png":
        case "raip100.png":
        case "nraip.png":
        case "nraip10.png":
        case "nraip20.png":
        case "nraip30.png":
        case "nraip40.png":
        case "nraip50.png":
        case "nraip60.png":
        case "nraip70.png":
        case "nraip80.png":
        case "nraip100.png":
            //case "Slight Chance Rain/Sleet":
            //case "Chance Rain/Sleet":
            //case "Rain/Sleet Likely":
            //case "Rain/Sleet":
            //case "Slight Chance Snow/Sleet":
            //case "Chance Snow/Sleet":
            //case "Snow/Sleet Likely":
            //case "Snow/Sleet":
            Icon = "freezing-rain-sleet.gif";
            break;

        case "sn_ip.png":
        case "sn_ip10.png":
        case "sn_ip20.png":
        case "sn_ip30.png":
        case "sn_ip40.png":
        case "sn_ip50.png":
        case "sn_ip60.png":
        case "sn_ip70.png":
        case "sn_ip80.png":
        case "sn_ip90.png":
        case "sn_ip100.png":
            Icon = "snow-sleet.gif";
            break;

        //case "Isolated Thunderstorms":
        //    Icon = "ef_isolatedtstorms.gif";
        //    break;

        case "scttsra.png":
        case "scttsra10.png":
        case "scttsra20.png":
        case "scttsra30.png":
        case "scttsra40.png":
        case "scttsra50.png":
        case "scttsra60.png":
        case "scttsra70.png":
        case "scttsra80.png":
        case "scttsra90.png":
        case "scttsra100.png":
        case "nscttsra.png":
        case "nscttsra10.png":
        case "nscttsra20.png":
        case "nscttsra30.png":
        case "nscttsra40.png":
        case "nscttsra50.png":
        case "nscttsra60.png":
        case "nscttsra70.png":
        case "nscttsra80.png":
        case "nscttsra90.png":
        case "nscttsra100.png":
            //case "Slight Chance Thunderstorms":
            //case "Chance Thunderstorms":
            Icon = "ef_scattstorms.gif";
            break;

        case "hi_tsra.png":
        case "hi_tsra10.png":
        case "hi_tsra20.png":
        case "hi_tsra30.png":
        case "hi_tsra40.png":
        case "hi_tsra50.png":
        case "hi_tsra60.png":
        case "hi_tsra70.png":
        case "hi_tsra80.png":
        case "hi_tsra90.png":
        case "hi_tsra100.png":
        case "tsra.png":
        case "tsra10.png":
        case "tsra20.png":
        case "tsra30.png":
        case "tsra40.png":
        case "tsra50.png":
        case "tsra60.png":
        case "tsra70.png":
        case "tsra80.png":
        case "tsra90.png":
        case "tsra100.png":
        case "ntsra.png":
        case "ntsra10.png":
        case "ntsra20.png":
        case "ntsra30.png":
        case "ntsra40.png":
        case "ntsra50.png":
        case "ntsra60.png":
        case "ntsra70.png":
        case "ntsra80.png":
        case "ntsra90.png":
        case "ntsra100.png":
        case "hi_ntsra.png":
        case "hi_ntsra10.png":
        case "hi_ntsra20.png":
        case "hi_ntsra30.png":
        case "hi_ntsra40.png":
        case "hi_ntsra50.png":
        case "hi_ntsra60.png":
        case "hi_ntsra70.png":
        case "hi_ntsra80.png":
        case "hi_ntsra90.png":
        case "hi_ntsra100.png":
        case "m_tsra.png":
            //case "Thunderstorms Likely":
            //case "Thunderstorms":
            //case "Severe Tstms":
            Icon = "cc_tstorm.gif";
            break;

        case "wind.png":
        case "wind_skc.png":
        case "tropstorm.png":
        case "tropstorm-noh.png":
        case "hurr-noh.png":
        case "nhurr-noh.png":
        case "hurr.png":
        case "ts_hur_flags10.png":
        case "ts_hur_flags20.png":
        case "ts_hur_flags30.png":
        case "ts_hur_flags40.png":
        case "ts_hur_flags50.png":
        case "ts_hur_flags60.png":
        case "ts_hur_flags70.png":
        case "ts_hur_flags80.png":
        case "ts_hur_flags90.png":
        case "ts_hur_flags100.png":
            //case "Windy":
            //case "Breezy":
            //case "Blustery":
            //case "Water Spouts":
            Icon = "cc_windy.gif";
            break;

        case "wind_sct.png":
        case "wind_few.png":
            Icon = "cc_partly_cloudy_windy.gif";
            break;

        case "wind_bkn.png":
        case "wind_ovc.png":
            Icon = "cc_mostly_cloudy_windy.gif";
            break;

        //case "nhurr-noh.png":
        case "nwind.png":
        case "nwind_skc.png":
        case "ntropstorm.png":
        case "ntropstorm-noh.png":
        case "nhurr.png":
            Icon = "cc_windy2.gif";
            break;

        case "nwind_few.png":
        case "nwind_sct.png":
            Icon = "cc_mostly_clear_windy.gif";
            break;

        case "nwind_bkn.png":
        case "nwind_ovc.png":
            Icon = "cc_partly_clear_windy.gif";
            break;

        case "null":
            Icon = "";
            break;

        default:
            console.error("Unable to locate icon for '" + WeatherIconLink + "'");
            Icon = "";
            break;

    }

    Icon = "images/" + Icon;
    return Icon;
};

var GetFileNameFromUrl = function (Url)
{
    var UrlParts;

    if (!Url)
    {
        return "";
    }

    UrlParts = Url.split('/');

    return UrlParts[UrlParts.length - 1];
};

//var GetWeatherRegionalIconFromIconLink = function (WeatherIconLink)
//var GetWeatherRegionalIconFromIconLink = function (WeatherIconLink, WeatherConditions, WeatherParameters)
var GetWeatherRegionalIconFromIconLink = function (WeatherIconLink, WeatherConditions, WeatherParameters, IsNightTime)
{
    var Icon = "";
    var WeatherIcon = WeatherIconLink;

    if (WeatherIconLink.indexOf(".gif") === -1)
    {
        if (IsNightTime)
        {
            WeatherIcon = GetWeatherIconFromIconLink(WeatherIconLink, WeatherConditions, WeatherParameters, false);
        }
        else
        {
            WeatherIcon = GetWeatherIconFromIconLink(WeatherIconLink, WeatherConditions, WeatherParameters, true);
        }
    }

    if (!WeatherIcon)
    {
        return Icon;
    }

    WeatherIcon = WeatherIcon.replace("images/", "");
    WeatherIcon = WeatherIcon.replace("2/", "");
    WeatherIcon = WeatherIcon.toLowerCase();

    switch (WeatherIcon)
    {
        case "cc_clear1.gif":
        case "sunny.gif":
            Icon = "Sunny.gif";
            break;

        case "cc_clear0.gif":
        case "clear.gif":
            Icon = "Clear-1992.gif";
            break;

        case "cc_mostlycloudy1.gif":
        case "mostly-cloudy.gif":
            Icon = "Mostly-Cloudy-1994-2.gif";
            break;

        case "cc_mostlycloudy0.gif":
        case "partly-clear.gif":
            Icon = "Partly-Clear-1994-2.gif";
            break;

        case "cc_partlycloudy1.gif":
        case "partly-cloudy.gif":
            Icon = "Partly-Cloudy.gif";
            break;

        case "cc_partlycloudy0.gif":
        case "mostly-clear.gif":
            Icon = "Mostly-Clear.gif";
            break;

        case "cc_cloudy.gif":
        case "cloudy.gif":
            Icon = "Cloudy.gif";
            break;

        case "cc_fog.gif":
        case "fog.gif":
            Icon = "Fog.gif";
            break;

        case "sleet.gif":
            Icon = "Sleet.gif";
            break;

        case "ef_scatshowers.gif":
        case "scattered-showers.gif":
            if (IsNightTime)
            {
                Icon = "Scattered-Showers-Night-1994-2.gif";
            }
            else
            {
                Icon = "Scattered-Showers-1994-2.gif";
            }
            break;

        case "CC_Showers.gif":
        case "cc_showers.gif":
        case "shower.gif":
            Icon = "Shower.gif";
            break;

        case "CC_Rain.gif":
        case "cc_rain.gif":
        case "rain.gif":
            Icon = "Rain-1992.gif";
            break;

        //case "ef_scatsnowshowers.gif":
        case "light-snow.gif":
            Icon = "Light-Snow.gif";
            break;

        case "cc_snowshowers.gif":
            //case "heavy-snow.gif":
            Icon = "AM-Snow-1994.gif";
            break;

        case "cc_snow.gif":
        case "heavy-snow.gif":
            Icon = "Heavy-Snow-1994-2.gif";
            break;

        case "cc_rainsnow.gif":
            Icon = "Rain-Snow-1992.gif";
            break;

        case "freezing-rain-snow.gif":
            Icon = "Freezing-Rain-Snow-1992.gif";
            break;

        case "cc_freezingrain.gif":
        case "freezing-rain.gif":
            Icon = "Freezing-Rain-1992.gif";
            break;

        case "cc_mix.gif":
        case "wintry-mix.gif":
            Icon = "Wintry-Mix-1992.gif";
            break;

        case "freezing-rain-sleet.gif":
            Icon = "Freezing-Rain-Sleet-1992.gif";
            break;

        case "snow-sleet.gif":
            Icon = "Snow-Sleet.gif";
            break;

        case "ef_scattstorms.gif":
        case "scattered-tstorms.gif":
            if (IsNightTime)
            {
                Icon = "Scattered-Tstorms-Night-1994-2.gif";
            }
            else
            {
                Icon = "Scattered-Tstorms-1994-2.gif";
            }
            break;

        case "cc_tstorm.gif":
        case "thunderstorm.gif":
            Icon = "Thunderstorm.gif";
            break;

        case "windy.gif":
            Icon = "Wind.gif";
            break;

        case "cc_windy.gif":
            Icon = "Sunny-Wind-1994.gif";
            break;

        case "cc_windy2.gif":
            Icon = "Clear-Wind-1994.gif";
            break;

        case "blowing-snow.gif":
            Icon = "Blowing Snow.gif";
            break;

        case "ef_scatsnowshowers.gif":
            if (IsNightTime)
            {
                Icon = "Scattered-Snow-Showers-Night-1994-2.gif";
            }
            else
            {
                Icon = "Scattered-Snow-Showers-1994-2.gif";
            }
            break;

        case "ef_isolatedtstorms.gif":
            Icon = "Thunderstorm.gif";
            break;

        case "cc_hot.gif":
            Icon = "hot.gif";
            break;

        case "cc_cold.gif":
            Icon = "cold.gif";
            break;

        case "cc_smoke.gif":
            Icon = "smoke.gif";
            break;

        case "cc_haze.gif":
            Icon = "haze.gif";
            break;

        case "cc_partly_cloudy_windy.gif":
            Icon = "partly-cloudy-wind.gif";
            break;

        case "cc_mostly_cloudy_windy.gif":
            Icon = "mostly-cloudy-wind.gif";
            break;

        case "cc_mostly_clear_windy.gif":
            Icon = "mostly-clear-wind.gif";
            break;

        case "cc_partly_clear_windy.gif":
            Icon = "partly-clear-wind.gif";
            break;

        case "mostly-clear2.gif":
            Icon = "Mostly-Clear2.gif";
            break;

        case "mostly-sunny.gif":
            Icon = "Mostly-Sunny.gif";
            break;

        default:
            console.error("Unable to locate regional icon for '" + WeatherIcon + "'");
            Icon = "";
            break;

    }

    Icon = "images/r/" + Icon;
    return Icon;
};

var GetWeatherIcon2FromIconLink = function (WeatherIconLink, WeatherConditions, WeatherParameters, OverrideIsDay)
{
    var WeatherIcon = GetWeatherIconFromIconLink(WeatherIconLink, WeatherConditions, WeatherParameters, OverrideIsDay);
    WeatherIcon = WeatherIcon.replace("images/", "").toLowerCase();

    switch (WeatherIcon)
    {
        case "cc_clear1.gif":
        case "cc_cold.gif":
        case "cc_hot.gif":
            Icon = "Sunny.gif";
            break;

        case "cc_clear0.gif":
            Icon = "Clear.gif";
            break;

        case "cc_mostlycloudy1.gif":
            Icon = "Mostly-Cloudy.gif";
            break;

        case "cc_mostlycloudy0.gif":
            Icon = "Partly-Clear.gif";
            break;

        case "cc_partlycloudy1.gif":
            Icon = "Partly-Cloudy.gif";
            break;

        case "cc_partlycloudy0.gif":
            Icon = "Mostly-Clear.gif";
            break;

        case "cc_cloudy.gif":
        case "cc_haze.gif":
            Icon = "Cloudy.gif";
            break;

        case "cc_fog.gif":
        case "cc_smoke.gif":
            Icon = "Fog.gif";
            break;

        case "sleet.gif":
            Icon = "Sleet.gif";
            break;

        case "ef_scatshowers.gif":
            Icon = "Scattered-Showers.gif";
            break;

        case "cc_showers.gif":
            Icon = "Shower.gif";
            break;

        case "cc_rain.gif":
            Icon = "Rain.gif";
            break;

        //case "ef_scatsnowshowers.gif":
        case "light-snow.gif":
            Icon = "Light-Snow.gif";
            break;

        case "cc_snowshowers.gif":
            Icon = "Heavy-Snow.gif";
            break;

        case "cc_snow.gif":
        case "heavy-snow.gif":
            Icon = "Heavy-Snow.gif";
            break;

        case "cc_rainsnow.gif":
            //Icon = "Ice-Snow.gif";
            Icon = "Rain-Snow.gif";
            break;

        case "cc_freezingrain.gif":
            Icon = "Freezing-Rain.gif";
            break;

        case "cc_mix.gif":
            Icon = "Wintry-Mix.gif";
            break;

        case "freezing-rain-sleet.gif":
            Icon = "Freezing-Rain-Sleet.gif";
            break;

        case "snow-sleet.gif":
            Icon = "Snow-Sleet.gif";
            break;

        case "ef_scattstorms.gif":
            Icon = "Scattered-Tstorms.gif";
            break;

        case "ef_scatsnowshowers.gif":
            Icon = "Scattered-Snow-Showers.gif";
            break;

        case "cc_tstorm.gif":
        case "ef_isolatedtstorms.gif":
            Icon = "Thunderstorm.gif";
            break;

        case "cc_windy.gif":
        case "cc_windy2.gif":
        case "cc_partly_cloudy_windy.gif":
        case "cc_mostly_cloudy_windy.gif":
        case "cc_mostly_clear_windy.gif":
        case "cc_partly_clear_windy.gif":
            Icon = "Windy.gif";
            break;

        case "blowing-snow.gif":
            Icon = "Blowing-Snow.gif";
            break;

        default:
            console.error("Unable to locate icon for '" + WeatherIcon + "'");
            Icon = "";
            break;
    }

    if (Icon)
    {
        Icon = "images/2/" + Icon;
    }
    return Icon;
};
