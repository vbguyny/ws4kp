# WeatherStar 4000+

## About

Welcome to the WeatherStar 4000+ project page!

This project was originally created by Mike Battaglia in the Fall of 2016 because of the desire to create his own weather site which displayed the information in a way that was done by the Weather Channel in the mid to late 90's.  Eventually he watched enough videos and YouTube and read enough articles on how to get and parse data directly from the National Weather Service (NWS) which allowed him to create his own version of the WeatherStar 4000.  After three interations, he now considers the site feature complete and you can view the live version here: https://battaglia.ddns.net/twc

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

* Support for all 50 US states.
* Utilitize mobile GPS.
* Fullscreen mode.
* Plays background music.
* Uses narration to read the information on the screen (does not work in iOS).
* Displays station, radar, and zone IDs for the current location.
* 10 minute auto refresh setting.
* Convert between English and Metric units.
* Choose between three built-in themes.
* Supply custom text to scroll at the bottom of the screen.
* Supply RSS feed to scroll at the bottom of the screen.

## Setup

It is recommended that you download all of the source code to a folder and use Internet Information Services (IIS) 7.5 or later with ASP .NET 4.5 or later to create a virtual directory which points to this folder.

Please refer to the instructions here: https://github.com/vbguyny/ws4kp/blob/master/HowToInstall.txt

If you plan on exposing this site publicly, you will need to update the code in `CORS/Default.aspx` to have your public IP address and domain name:
```c#
	switch (Page.Request.Url.Host)
	{
		case "localhost":
		case "192.168.2.98":
		case "battaglia.ddns.net":
		case "[Your domain here]":
			OkToProcessRequest = true;
			break;
	}
```

Then use a browser to access the site by navigating to the `index.html` page.

NOTE: The GPS function will not work in Chrome 50 or later if the site is not using an SSL certificate.

### CORS

The design of this site was to have as little back end logic on the server side as possible. However weather.gov has too many issues with cross-origin resource sharing (CORS).  In order to work around CORS prevention in most browsers the AJAX calls go through a server first acting as a middle man which sends the request to weather.gov and the response back to the end user.

In order to setup CORS on your server you will need IIS 7.5 or later which is able to support ASP .NET 4.5 or later.

The live site uses itself as the CORS server however there are a few free third-party CORS servers that can be used if you are not able/willing to set one up yourself.

If you want to use them you will need to update the code in the routine `$.ajaxCORS` in the file `twc3.js`.

## Disclaimer

This web site should NOT be used in life threatening weather situations, or be relied on to inform the public of such situations. The Internet is an unreliable network subject to server and network outages and by nature is not suitable for such mission critical use. If you require such access to NWS data, please consider one of their subscription services. The authors of this web site shall not be held liable in the event of injury, death or property damage that occur as a result of disregarding this warning.

The WeatherSTAR 4000 unit and technology is owned by The Weather Channel. This web site is a free, non-profit work by fans. All of the back ground graphics of this web site were created from scratch.  The icons were created by Charles Abel and Nick Smith (http://twcclassics.com/downloads/icons.html) as well as by Malek Masoud.  The fonts were originally created by Nick Smith (http://twcclassics.com/downloads/fonts.html).  The music is copyrighted by the respective artists and/or label companies. The voices used by the narration is owned by the creators of the web browser that is used to access the web site.

