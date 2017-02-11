# WeatherStar 4000+ (BETA)

## About

Welcome to the WeatherStar 4000+ project page!

This project was originally created by Mike Battaglia in the Fall of 2016 because of wanting to create his own weather site which displayed the information in a way that was done by the Weather Channel in the mid to late 90's.  Eventually he watched enough videos and YouTube and read enough articles on how to get and parse data directly from the National Weather Service (NWS) that he was able to create his own version of the site.  After three interations, he is now considering the site feature complete and you can view the live version here: https://battaglia.ddns.net/twc/twc2.html

## Segments

* Current Conditions
* Latest Observations
* Travel Forecast
* Regional Forecast
* Regional Observations
* Local Forecast
* Almanac
* Local Radar
* Hazardous Weather

## Features

* Support weather for all 50 US states.
* Can utilitize mobile GPS.
* Fullscreen mode.
* Plays background music.
* Uses narration to read the information on the screen (does not work in iOS).
* Display Station, Radar, and Zone Ids for current location.
* 10 minute auto refresh setting.
* Convert between English and Metric units.
* Choose between three built-in themes.
* Supply custom text to scroll at the bottom of the screen.

## Set up

The design of this site was to have a little back end logic on the server side as possible. However due to issues with specific AJAX calls to weather.gov there are too many issues with cross-origin resource sharing (CORS).  In order to work around CORS prevention in most browsers the AJAX calls go through a server first acting as a middle man which sends the request to weather.gov and the response back to the end user.

The live site uses itself as the CORS server however there are a few free third-party CORS servers that can be used if you are not able/willing to set one up yourself.

Below is a list that work with the site:
* https://crossorigin.me/
* http://anyorigin.com/go?url=
* http://www.whateverorigin.org/get?url=

They are disabled by default and if you want to use them you will need to update the code in the routine `$.ajaxCORS` in the file `twc3.js`.

## Disclaimer

This web site should NOT be used in life threatening weather situations, or be relied on to inform the public of such situations. The Internet is an unreliable network subject to server and network outages and by nature is not suitable for such mission critical use. If you require such access to NWS data, please consider one of their subscription services. The authors of this web site shall not be held liable in the event of injury, death or property damage that occur as a result of disregarding this warning.

The WeatherSTAR 4000 unit and technology is owned by The Weather Channel. This web site is a free, non-profit work by fans. All of the back ground graphics of this web site were created from scratch.  The icons were created by Charles Abel and Nick Smith (http://twcclassics.com/downloads/icons.html).  The fonts were originally created by Nick Smith (http://twcclassics.com/downloads/fonts.html).

