26 Weather APIs, 12 Support JSON:
https://www.programmableweb.com/news/26-weather-apis-12-support-json/2012/01/11

Icons: http://s122.photobucket.com/user/weatherstooge/library/TWC%20Icons%20-%201990-1998/RFTF?sort=4&page=1
http://twcclassics.com/downloads/icons.html
http://twctodayforums.com/forums/twc-fan-art/michael's-modified-twc-icons/

http://forecast.weather.gov/MapClick.php?lat=40.84706&lon=-72.989731&FcstType=dwml
The above link includes both current and forecast information.
Look at the dataSource attribute for the wordedForest tag to get the station id (example, "okxNetcdf" the station is okx).

http://radar.weather.gov/ridge/RadarImg/N0R/[StationId]_N0R_0.gif
The above link is the current overlay of the radar.
http://radar.weather.gov/ridge/RadarImg/N0R/[StationId]/*.gif 
The above links are the past 3-4 hours worth of radar data in roughly 5 minute intervals.
http://www.srh.noaa.gov/jetstream/doppler/ridge_download.html
The above link shows how to get the overlays of all of the images.
http://radar.weather.gov/Conus/RadarImg/Conus_20161004_0028_N0Ronly.gif (Filenames: http://radar.weather.gov/Conus/RadarImg/mosaic_times.txt)
http://radar.weather.gov/Conus/full_lite.php

Google Geocoding API Key: AIzaSyBGo5DG2OHdUE_zdJsHd8eSilMxq3UXX9g

See: http://graphical.weather.gov/xml/sample_products/browser_interface/ndfdXML.htm
 or http://graphical.weather.gov/xml/SOAP_server/ndfdXML.htm
to know to generate data which includes variables such as indicated on the site.

Get description of weather-summary as to link up with icons:
http://graphical.weather.gov/xml/xml_fields_icon_weather_conditions.php

Use for current conditions (appears to update every hour):
http://www.aviationweather.gov/adds/dataserver_current/httpparam?datasource=metars&requesttype=retrieve&format=xml&hoursBeforeNow=1&stationString=KHWV
http://heras-gilsanz.com/manuel/METAR-Decoder.html
https://aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&hoursBeforeNow=4&minLon=-73&minLat=40&maxLon=-72&maxLat=41
https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&radialDistance=20;-72.989731,40.84706&hoursBeforeNow=4
https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&radialDistance=20;-74.0059,40.7142&hoursBeforeNow=1
http://www.moratech.com/aviation/metar-class/metar-pg10-sky.html
http://www.moratech.com/aviation/metar-class/metar.html#INDEX
https://www.aviationweather.gov/adds/dataserver/metars/MetarExamples.php

Warnings/Alerts:
https://alerts.weather.gov/cap/wwaatmget.php?x=NYZ080&y=0
http://tgftp.nws.noaa.gov/data/forecasts/nowcast/ny/nyz080.txt (need to check when they expire)

http://cheesehead-techblog.blogspot.com/2012/09/us-national-weather-service-info-feeds.html
TWC Local Forecast: http://tgftp.nws.noaa.gov/data/forecasts/zone/ny/nyz080.txt (need to get the state zone).
 Hazard starts with three dots
 The line that starts with a period is a new time or day.
Regional Weather: http://tgftp.nws.noaa.gov/data/forecasts/state/ny/nyz080.txt

XML Field Icons: http://graphical.weather.gov/xml/xml_fields_icon_weather_conditions.php

Rainfall and onther monthly totals: http://w2.weather.gov/climate/getclimate.php?date=&wfo=dmx&sid=DSM&pil=CLM&recent=yes&specdate=2016-09-01+15%3A03%3A53
http://w2.weather.gov/climate/getclimate.php?wfo=dmx&sid=DSM&pil=CLM&recent=yes
 wfo=RadarId
 pil=CLM
 recent=yes
 sid=???
https://www.wunderground.com/history/airport/KISP/2016/09/16/MonthlyHistory.html

Sunrise/Sunset + Moon phases: http://w2.weather.gov/climate/astronomical.php?wfo=okx
 http://aa.usno.navy.mil/cgi-bin/aa_rstablew.pl?ID=AA&year=2016&task=2&state=NY&place=New%20York
 http://aa.usno.navy.mil/cgi-bin/aa_rstablew.pl?ID=AA&year=2016&task=0&state=NY&place=New%20York
 http://api.usno.navy.mil/rstt/oneday?date=9/18/2016&coords=41.89N,12.48E (Times are UTC)
 http://aa.usno.navy.mil/cgi-bin/aa_moonphases.pl?year=2017&ZZZZ=END
 http://api.usno.navy.mil/moon/phase?date=9/18/2016&nump=4
 
Travel forcast: http://forecast.weather.gov/product.php?site=NWS&issuedby=ERN&product=TPT&format=txt&version=1&glossary=1
Travel cities: (City, Conditions, Low, High for the following day)
 Atlanta
 Boston
 Chicago
 Cleveland
 Dallas
 Denver
 Detroit
 Hartford
 Houston
 Indianapolis
 Log Angeles
 Miama
 Minneapolis
 New York
 Norfolk
 Orlando
 Philadelphia
 Pittsburgh
 St. Louis
 San Francisco
 Seattle
 Syracuse
 Tampa
 Washington DC
 

NWS Products: http://forecast.weather.gov/product_types.php?site=NWS

Map Region:		Lat, Lon
Top,Left		50.5, -127.5
Top,Right		50.5, -67
Bottom,Right	21.5, -67
Bottom,Left		21.5, -127.5
Width: 3400px  55.7 (56.198347107438016528925619834711 * degree)
Height: 1600px 55.2 (55.172413793103448275862068965517 * degree)
3063.94817549 px
533.47297008 px

Screen res: 640x312px

Create JSON file which contains the information in "stations.txt"
Create dictionary/object keyed by StationId with the following fields:
	City: 
	State: 
	Latitude:
	Longitude: 
Patch code that gets the city name from the DWML to check the newly created JSON object first.
	If the StationId does not exist then fall back onto the DWML.

The Up/Down arrows need to be drawn onto the canvas manually since the Star 4000 fonts do not have arrows.

Logo Font: https://www.myfonts.com/fonts/bitstream/futura/ (Futura Condensed ExtraBlack [Size 20])

----------------------------------------------------------------------------------------------------------------------------

[4 second delay on each item]
Conditions at [Station]
[Conditions]
Temp: [xxx]'F  [Heat Index: [xxx]'F]
Humidity: [xx]%   Dewpoint: [xxx]'F
Barometric Pressure: [xx.xx] [R/F]
Wind: [DIR] [XXX] MPH  [Gust to XXX]
Visib: [xx] mi. Ceiling: [xxxxx] ft.
[Month] Precipitation: [xxx.xx] in

----------------------------------------------------------------------------------------------------------------------------

Need to take the time zone of the query city into account when displaying the sun rise/set information.

Implement security check into CORS to ensure that calls are coming from same domain.
Remove '***' from Alert text in worded local forecast.
See why the temperate is 'NaN' when looking at the nearby forecast from Kississmee, FL.

----------------------------------------------------------------------------------------------------------------------------

<!DOCTYPE html>
<html>
<head>
<style>
#grad1 {
background-color: rgb(33,40,90);
border: 16px solid #000;
-moz-border-bottom-colors: rgb(38, 82, 178) rgb(38, 79, 173) rgb(38, 76, 167) rgb(38, 73, 161) rgb(37, 70, 155) rgb(37, 67, 149) rgb(37, 64, 143) rgb(37, 61, 137) rgb(36, 58, 131) rgb(36, 55, 125) rgb(36, 52, 120) rgb(36, 50, 115) rgb(35, 48, 110) rgb(35, 46, 105) rgb(35, 44, 100) rgb(34, 42, 95) rgb(34,40,90);
-moz-border-top-colors:  rgb(38, 82, 178) rgb(38, 79, 173) rgb(38, 76, 167) rgb(38, 73, 161) rgb(37, 70, 155) rgb(37, 67, 149) rgb(37, 64, 143) rgb(37, 61, 137) rgb(36, 58, 131) rgb(36, 55, 125) rgb(36, 52, 120) rgb(36, 50, 115) rgb(35, 48, 110) rgb(35, 46, 105) rgb(35, 44, 100) rgb(34, 42, 95) rgb(34,40,90);
-moz-border-left-colors: rgb(38, 82, 178) rgb(38, 79, 173) rgb(38, 76, 167) rgb(38, 73, 161) rgb(37, 70, 155) rgb(37, 67, 149) rgb(37, 64, 143) rgb(37, 61, 137) rgb(36, 58, 131) rgb(36, 55, 125) rgb(36, 52, 120) rgb(36, 50, 115) rgb(35, 48, 110) rgb(35, 46, 105) rgb(35, 44, 100) rgb(34, 42, 95) rgb(34,40,90);
-moz-border-right-colors:rgb(38, 82, 178) rgb(38, 79, 173) rgb(38, 76, 167) rgb(38, 73, 161) rgb(37, 70, 155) rgb(37, 67, 149) rgb(37, 64, 143) rgb(37, 61, 137) rgb(36, 58, 131) rgb(36, 55, 125) rgb(36, 52, 120) rgb(36, 50, 115) rgb(35, 48, 110) rgb(35, 46, 105) rgb(35, 44, 100) rgb(34, 42, 95) rgb(34,40,90);
/*padding: 16px 16px 16px 15px;*/
width: 500px;
height: 277px; 
}
</style>
</head>
<body>

<h3>Linear Gradient - Top to Bottom</h3>
<p>This linear gradient starts at the top. It starts red, transitioning to yellow:</p>

<div id="grad1"></div>

<p><strong>Note:</strong> Internet Explorer 9 and earlier versions do not support gradients.</p>

</body>
</html>

----------------------------------------------------------------------------------------------------------------------------

Make the background of the NOAA logo transparent.
Create a FavIcon (Use existing WS4K+ logo).
Current Observations show NA for San Francisco.
Dayton, Ohio needs lattidue and longitude adjusted in the AJAX look up.

----------------------------------------------------------------------------------------------------------------------------

Tides: https://tidesandcurrents.noaa.gov/api/
Example: https://www.youtube.com/watch?v=t24GqrPgoyg&feature=plcp
Find station: https://tidesandcurrents.noaa.gov/tide_predictions.html?type=Tide+Predictions&searchfor=[Latitude]%2C[Longitude]
https://tidesandcurrents.noaa.gov/tide_predictions.html?type=Tide+Predictions&searchfor=41.0359%2C-71.9545 (Gets the StationId)
https://tidesandcurrents.noaa.gov/stationhome.html?id=[StationId]
https://tidesandcurrents.noaa.gov/stationhome.html?id=8510560
https://tidesandcurrents.noaa.gov/noaatidepredictions/NOAATidesFacade.jsp?Stationid=8510560

Marine Forecast: https://www.youtube.com/watch?v=1ahzR5KWwsM&t=84s
Rough https://www.youtube.com/watch?v=12guXf5iHyo
Light https://www.youtube.com/watch?v=eSiKyCffY1s
http://www.nws.noaa.gov/om/marine/zone/usamz.htm
http://marine.weather.gov/MapClick.php?map.x=305&map.y=188&marine=0&site=OKX&zmx=1&zmy=1&FcstType=text&lat=&lon=#.WH7lLBsrLIV
http://marine.weather.gov/MapClick.php?map.x=305&map.y=188&marine=0&site=OKX&zmx=1&zmy=1&FcstType=xml&lat=&lon=#.WH7lLBsrLIV
http://marine.weather.gov/MapClick.php?map.x=305&map.y=188&marine=0&site=OKX&zmx=1&zmy=1&FcstType=json&lat=&lon=#.WH7lLBsrLIV
http://marine.weather.gov/MapClick.php?lon=-72.33394&lat=40.81377#.WH7qHxsrLIW
Get the marine zone (search for Marine): https://www.wunderground.com/cgi-bin/findweather/getForecast?query=montauk,ny
Forecast: http://forecast.weather.gov/shmrn.php?mz=anz350
Warnings (Small Craft Advisories, Gale Warnings) http://marine.weather.gov/showsigwx.php?warnzone=ANZ350&warncounty=marine

----------------------------------------------------------------------------------------------------------------------------

Air Quality: https://www.youtube.com/watch?v=7ajToNqno-4
http://airquality.weather.gov/probe_aq_data.php?latitude=42.2&longitude=71.0
http://airquality.weather.gov/probe_aq_data.php?latitude=40.850043&longitude=-72.971293
http://www.weather.gov/sti/stimodeling_airquality_faq#aqitable
https://www.airnow.gov/index.cfm?action=airnow.print_summary&stateid=33
https://airnow.gov/index.cfm?action=resources.conc_aqi_calc (convert O3 ppb to AQI [Air Quality Index])

----------------------------------------------------------------------------------------------------------------------------

Record Canvas Into Video: https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=javascript+convert+multiple+canvases+to+video

----------------------------------------------------------------------------------------------------------------------------

Reno Nevada Almanac doesn't display the correct moon data and sunrise/sunset information.
Auto refresh every 10 minutes; indicate date/time when the refresh was done; should it remember your last play position?. (Radar updates every 10 minutes and the current conditions can update from every 30-60 minutes)
Figure out way to display weather maps (regional/doppler) for both Alaska and Hawaii (any US territories).
Use transitions between segments.
Convert English and Metric standards.
Times should be local to area querying.

----------------------------------------------------------------------------------------------------------------------------

Create a new theme (keep old one by allow user to switch).
Version 2 icons: http://twcclassics.com/downloads/icons.html
Have the local forecast details include in addition to the current, 12 and 24 hour forecasts, 36, 48, and 60 hour.
Have the extended forecast include 6 days instead of 3.
Append tides to the Alamac.
Display Ids (Station, Radar, Zone, etc.).

----------------------------------------------------------------------------------------------------------------------------

Create transparent images (PNG) https://www.lunapic.com/editor/?action=transparent
Manifest: https://developer.chrome.com/multidevice/android/installtohomescreen
https://developers.google.com/web/fundamentals/native-hardware/fullscreen/

----------------------------------------------------------------------------------------------------------------------------

Outlook:
http://www.cpc.ncep.noaa.gov/products/predictions/30day/
	http://www.cpc.ncep.noaa.gov/products/predictions/30day/off14_temp.gif
	http://www.cpc.ncep.noaa.gov/products/predictions/30day/off14_prcp.gif
https://www.weather.gov/climate/l3mto.php
https://www.weather.gov/climate/calendar_outlook.php?wfo=okx 
 Also see http://www.cpc.ncep.noaa.gov/products/predictions/multi_season/13_seasonal_outlooks/color/shortlegend.gif

----------------------------------------------------------------------------------------------------------------------------

Weather.gov changes:
https://forecast-v3.weather.gov/documentation?redirect=legacy
https://forecast-v3.weather.gov/documentation

Marine Forecast: Advisories: https://api.weather.gov/alerts?active=1&zone_type=marine&zone=ANZ345 (features[i].properties[i].event)

----------------------------------------------------------------------------------------------------------------------------

Puerto Rico and the Virgin Islands:

Doppler image: (http://radar.weather.gov/ridge/RadarImg/N0R/JUA/) http://radar.weather.gov/ridge/radar.php?rid=jua
Map: http://imgur.com/FmQpVYp
