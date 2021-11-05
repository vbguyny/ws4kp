/// <reference path="jquery-3.1.0.min.js" />
/// <reference path="jquery.touchSwipe.min.js" />

// Redirect user to SSL version of site.
if (location.protocol != "https:" && location.href.indexOf("localhost") == -1 && location.href.indexOf("192.") == -1)
{
    location.href = location.href.replace("http:", "https:");
}

var frmGetLatLng;
var txtAddress;
var btnGetLatLng;
var btnClearQuery;
var btnGetGps;
var divLat;
var spanLat;
var divLng;
var spanLng;

var divTwc;
var divTwcTop;
var divTwcMiddle;
var divTwcBottom;
var divTwcLeft;
var divTwcRight;
var divTwcNavContainer;
var divTwcNav;
var iframeTwc;
var btnFullScreen;
var divTwcBottomLeft;
var divTwcBottomMiddle;
var divTwcBottomRight;

var divRefresh;
var spanLastRefresh;
var chkAutoRefresh;
var lblRefreshCountDown;
var spanRefreshCountDown;

var spanCity;
var spanState;
var spanStationId;
var spanRadarId;
var spanZoneId;

var radScrollDefault;

var frmScrollText;
var radScrollText;
var txtScrollText;
var btnScrollText;

var frmScrollRss;
var radScrollRss;
var txtScrollRss;
var btnScrollRss;

var chkScrollHazardText;

//var _InFullScreen = false;
var _AutoSelectQuery = false;
var _TwcDataUrl = "";
var _IsPlaying = false;

var _NoSleep = new NoSleep();

var _LastUpdate = null;
var _AutoRefreshIntervalId = null;
var _AutoRefreshIntervalMs = 500;
//var _AutoRefreshTotalIntervalMs = 10000; // 10 sec.
//var _AutoRefreshTotalIntervalMs = 300000; // 5 min.
var _AutoRefreshTotalIntervalMs = 600000; // 10 min.
var _AutoRefreshCountMs = 0;

var _IsAudioPlaying = false;
var _IsBeepPlaying = false;

var _IsNarrationPlaying = false;

var _FullScreenOverride = false;

var _WeatherParameters = null;

var _WindowHeight = 0;
var _WindowWidth = 0;

var _AllowKeyDown = true;

var _canvasIds = [
        "canvasProgress",
        "canvasCurrentWeather",
        "canvasLatestObservations",
        "canvasTravelForecast",
        "canvasRegionalForecast1",
        "canvasRegionalForecast2",
        "canvasRegionalObservations",
        "canvasLocalForecast",
        "canvasExtendedForecast1",
        "canvasExtendedForecast2",
        "canvasAlmanac",
        "canvasAlmanacTides",
        "canvasOutlook",
        "canvasMarineForecast",
        "canvasAirQuality",
        "canvasLocalRadar",
        "canvasHazards"
];

var FullScreenResize = function (AutoRefresh)
{
    var iframeDoc = $(iframeTwc[0].contentWindow.document);
    var WindowWidth = $(window).width();
    var WindowHeight = $(window).height();
    var NewWidth;
    var NewHeight;
    var IFrameWidth;
    var IFrameHeight;
    var LeftWidth;
    var LeftHeight;
    var RightWidth;
    var RightHeight;
    var TopHeight;
    var TopWidth;
    var BottomHeight;
    var BottomWidth;
    var Offset;
    var inFullScreen = InFullScreen();

    if (inFullScreen == true)
    {
        //if (WindowWidth > WindowHeight)
        //if (WindowWidth > 850)
        //if (WindowWidth > 0)
        //if (WindowWidth > 640)
        if ((WindowWidth / WindowHeight) >= 1.583333333333333) // = 640 (TWC Width) + 48 (Icon min width on left side) + 12 (left padding) + 48 (Right icons) + 12 (right padding) / 480 (TWC Height)
        {
            NewHeight = WindowHeight + "px";
            NewWidth = "";
            divTwcTop.hide();
            divTwcBottom.hide();
            divTwcLeft.show();
            divTwcRight.show();

            divTwcMiddle.attr("style", "width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;");

            //IFrameWidth = (WindowHeight * 1.33333333333333333333);
            //iframeTwc.attr("style", "width:" + IFrameWidth + "px; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;");

            //LeftWidth = ((((WindowHeight * 16) / 9) - (WindowHeight * 1.25)) / 2) + "px";
            LeftWidth = ((WindowWidth - (WindowHeight * 1.33333333333333333333)) / 2);
            if (LeftWidth < 60)
            {
                LeftWidth = 60;
            }
            divTwcLeft.find("div>div>a>img").css("width", "");
            //divTwcLeft.find(">div").css("padding-right", "12px").css("padding-left", "");
            divTwcLeft.attr("style", "width:" + LeftWidth + "px; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;");
            divTwcLeft.css("visibility", "visible");
            divTwcLeft.css("opacity", "1");
            if (AutoRefresh === true)
            {
                divTwcLeft.css("opacity", "0");
                divTwcLeft.css("visibility", "hidden");
            }
            divTwcLeft.css("position", "");

            //RightWidth = ((((WindowHeight * 16) / 9) - (WindowHeight * 1.25)) / 2) + "px";
            RightWidth = ((WindowWidth - (WindowHeight * 1.33333333333333333333)) / 2);
            if (RightWidth < 60)
            {
                RightWidth = 60;
            }
            divTwcRight.find("div>div>a>img").css("width", "");
            //divTwcRight.find(">div").css("padding-left", "12px").css("padding-right", "");
            divTwcRight.attr("style", "width:" + RightWidth + "px; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;");
            divTwcRight.css("visibility", "visible");
            divTwcRight.css("opacity", "1");
            if (AutoRefresh === true)
            {
                divTwcRight.css("opacity", "0");
                divTwcRight.css("visibility", "hidden");
            }
            divTwcRight.css("position", "");

            IFrameWidth = WindowWidth - LeftWidth - RightWidth;
            NewWidth = IFrameWidth + "px";
            iframeTwc.attr("style", "width:" + IFrameWidth + "px; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;");

            //console.log(WindowWidth);
        }
        else
        {
            NewHeight = "";
            NewWidth = WindowWidth + "px";
            divTwcTop.show();
            divTwcBottom.show();

            //divTwcLeft.hide();
            //divTwcRight.hide();
            //Offset = 400;
            Offset = 0;

            //IFrameHeight = ((WindowWidth - Offset) * 0.75) + "px";
            //iframeTwc.attr("style", "width:100%; height:" + IFrameHeight + "; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;");
            //divTwcMiddle.attr("style", "width:100%; height:" + IFrameHeight + "; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;");

            TopHeight = ((WindowHeight - ((WindowWidth - Offset) * 0.75)) / 2);
            if (TopHeight < 0)
            {
                TopHeight = 0;
            }
            divTwcTop.attr("style", "width:100%; height:" + TopHeight + "px; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;");

            BottomHeight = ((WindowHeight - ((WindowWidth - Offset) * 0.75)) / 2);
            if (BottomHeight < 30)
            {
                //BottomHeight = 30;
                BottomHeight = 0;
            }
            divTwcBottom.attr("style", "width:100%; height:" + BottomHeight + "px; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;");
            divTwcBottom.css("visibility", "visible");
            divTwcBottom.css("opacity", "1");
            if (AutoRefresh === true)
            {
                divTwcBottom.css("opacity", "0");
                divTwcBottom.css("visibility", "hidden");
            }

            IFrameHeight = WindowHeight - TopHeight - BottomHeight;
            NewHeight = IFrameHeight + "px";
            iframeTwc.attr("style", "width:100%; height:" + IFrameHeight + "px; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;");
            divTwcMiddle.attr("style", "width:100%; height:" + IFrameHeight + "px; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;");

            divTwcBottomLeft.hide();
            divTwcBottomMiddle.hide();
            divTwcBottomRight.hide();
            divTwcLeft.show();
            divTwcRight.show();

            LeftWidth = (WindowWidth / 13);
            if (LeftWidth < 25)
            {
                LeftWidth = 25;
            }
            divTwcLeft.find("div>div>a>img").css("width", "100%");
            //divTwcLeft.find(">div").css("padding-right", "0px");
            divTwcLeft.attr("style", "width:" + LeftWidth + "px; height:" + IFrameHeight + "px; border:none; margin:0; padding:0; overflow:hidden; z-index:1000000;");
            divTwcLeft.css("visibility", "visible");
            divTwcLeft.css("opacity", "1");
            if (AutoRefresh === true)
            {
                divTwcLeft.css("opacity", "0");
                divTwcLeft.css("visibility", "hidden");
            }
            divTwcLeft.css("position", "absolute");
            divTwcLeft.css("left", "12px");

            RightWidth = (WindowWidth / 13);
            if (RightWidth < 25)
            {
                RightWidth = 25;
            }
            divTwcRight.find("div>div>a>img").css("width", "100%");
            //divTwcRight.find(">div").css("padding-left", "0px");
            divTwcRight.attr("style", "width:" + RightWidth + "px; height:" + IFrameHeight + "px; border:none; margin:0; padding:0; overflow:hidden; z-index:1000000;");
            divTwcRight.css("visibility", "visible");
            divTwcRight.css("opacity", "1");
            if (AutoRefresh === true)
            {
                divTwcRight.css("opacity", "0");
                divTwcRight.css("visibility", "hidden");
            }
            divTwcRight.css("position", "absolute");
            divTwcRight.css("right", "12px");
        }
    }

    if (inFullScreen == false)
    {
        NewHeight = "";
        NewWidth = "";
        divTwcTop.hide();
        divTwcBottom.hide();
        divTwcLeft.hide();
        divTwcRight.hide();

        divTwc.attr("style", "");
        divTwcMiddle.attr("style", "");
        iframeTwc.attr("style", "");

        divTwcBottomLeft.show();
        divTwcBottomMiddle.show();
        divTwcBottomRight.show();

        $(window).off("resize", FullScreenResize);
    }

    //iframeDoc.find("#canvasProgress").css("width", NewWidth);
    //iframeDoc.find("#canvasProgress").css("height", NewHeight);
    $(_canvasIds).each(function ()
    {
        var canvas = iframeDoc.find("#" + this.toString());
        canvas.css("width", NewWidth);
        canvas.css("height", NewHeight);
    });

    if (inFullScreen == true)
    {
        $("body").css("overflow", "hidden");
        $(".ToggleFullScreen").val("Exit Full Screen");

        if (!GetFullScreenElement())
        {
            EnterFullScreen();
        }
    }
    else
    {
        $("body").css("overflow", "");
        $(".ToggleFullScreen").val("Full Screen");
    }

    //divTwc.show();
    ////divTwc.css("display", "block");
    //if (divTwc.css("display") != "block")
    //{
    //    divTwc.css("display", "block");
    //}

    divTwcNavContainer.show();
};

var _lockOrientation = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;
var _unlockOrientation = screen.unlockOrientation || screen.mozUnlockOrientation || screen.msUnlockOrientation || (screen.orientation && screen.orientation.unlock);

var OnFullScreen = function ()
{
    if (InFullScreen() == true)
    {
        divTwc.attr("style", "position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;");
        FullScreenResize();

        $(window).on("resize", FullScreenResize);
        //FullScreenResize();

        if (_lockOrientation) try { _lockOrientation("landscape-primary"); } catch (ex) { console.log("Unable to lock screen orientation."); };
    }
    else
    {
        divTwc.attr("style", "");
        divTwcMiddle.attr("style", "");
        iframeTwc.attr("style", "");

        $(window).off("resize", FullScreenResize);
        FullScreenResize();

        if (_unlockOrientation) try { _unlockOrientation(); } catch (ex) { console.log("Unable to unlock screen orientation."); };
    }
};

var InFullScreen = function()
{
    //return true;
    //return (document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled);
    //return (window.innerHeight == screen.height);
    //return (((document.fullScreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) != null) || (window.innerHeight >= screen.height));
    //return ((GetFullScreenElement() != null) || (window.innerHeight == screen.height));
    return ((_FullScreenOverride == true) || (GetFullScreenElement() != null) || (window.innerHeight == screen.height) || (window.innerHeight == (screen.height - 1)));
};

var GetFullScreenElement = function()
{
    if (_FullScreenOverride == true)
    {
        return document.body;
    }

    return (document.fullScreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
}

var btnFullScreen_click = function ()
{
    //_InFullScreen = !(_InFullScreen);

    if (InFullScreen() == false)
    {
        EnterFullScreen();

        ////position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;
        //divTwc.attr("style", "position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;");
        ////iframeTwc.attr("style", "width:100%; height:90%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;");

        ////divTwcMiddle.attr("style", "width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;");
        ////divTwcLeft.attr("style", "width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;");
        ////iframeTwc.attr("style", "width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;");

        //FullScreenResize();

        //$(window).on("resize", FullScreenResize);
        //FullScreenResize();
    }
    else
    {
        ExitFullscreen();

        //divTwc.attr("style", "");
        //divTwcMiddle.attr("style", "");
        //iframeTwc.attr("style", "");

        //$(window).off("resize", FullScreenResize);
        //FullScreenResize();
    }

    if (_IsPlaying == true)
    {
        _NoSleep.enable();
    }
    else
    {
        _NoSleep.disable();
    }

    UpdateFullScreenNavigate();

    return false;
};

var EnterFullScreen = function ()
{
    var element = document.body;

    // Supports most browsers and their versions.
    var requestMethod;
    requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

    if (requestMethod)
    {
        // Native full screen.
        //requestMethod.call(element);
        requestMethod.call(element, { navigationUI: "hide" }); // https://bugs.chromium.org/p/chromium/issues/detail?id=933436#c7
    } 
    else if (typeof window.ActiveXObject !== "undefined")
    {
        // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null)
        {
            wscript.SendKeys("{F11}");
        }
    }
    else
    {
        // iOS doesn't support FullScreen API.
        window.scrollTo(0, 0);
        _FullScreenOverride = true;
        $(window).resize();
    }

    UpdateFullScreenNavigate();
};

var ExitFullscreen = function ()
{
    // exit full-screen

    if (_FullScreenOverride == true)
    {
        _FullScreenOverride = false;
        $(window).resize();
    }

    if (document.exitFullscreen)
    {
        // Chrome 71 broke this if the user pressed F11 to enter full screen mode.
        document.exitFullscreen();
    }
    else if (document.webkitExitFullscreen)
    {
        document.webkitExitFullscreen();
    }
    else if (document.mozCancelFullScreen)
    {
        document.mozCancelFullScreen();
    }
    else if (document.msExitFullscreen)
    {
        document.msExitFullscreen();
    }
};

var btnNavigateMenu_click = function ()
{
    //var iFrameLocation = iframeTwc[0].contentWindow.location;
    //iFrameLocation.hash = "";
    //iFrameLocation.hash = "aProgress";
    iframeTwc[0].contentWindow.NavigateMenu();
    UpdateFullScreenNavigate();

    return false;
};

var LoadTwcData = function (Url, AutoRefresh)
{
    txtAddress.blur();
    StopAutoRefreshTimer();
    _LastUpdate = null;
    AssignLastUpdate();

    console.log("Url: " + Url);
    _TwcDataUrl = Url;

    iframeTwc.off("load");

    iframeTwc.on("load", function (e)
    {
        switch (iframeTwc.attr("src"))
        {
            case "about:blank":
                if (Url == "")
                {
                    iframeTwc.off("load");
                    return;
                }

                iframeTwc.attr("src", "twc3.html?_=" + (new Date).getTime().toString());
                break;

            default:
                iframeTwc.off("load");
                FullScreenResize(AutoRefresh);

                if (radScrollText.is(":checked") == true)
                {
                    AssignScrollText({ ScrollText: txtScrollText.val() });
                }
                else if (radScrollRss.is(":checked") == true)
                {
                    AssignScrollText({ ScrollRss: txtScrollRss.val() });
                }

                if (chkScrollHazardText.is(":checked") == true)
                {
                    ScrollHazardText(true);
                }

                AssignThemes({ Themes: $("input[type='radio'][name='radThemes']:checked").val() });
                iframeTwc[0].contentWindow.AssignThemes({ Themes: $("input[type='radio'][name='radThemes']:checked").val() });

                iframeTwc[0].contentWindow.AssignUnits({ Units: $("input[type='radio'][name='radUnits']:checked").val() });

                iframeTwc[0].contentWindow.SetCallBack({ CallBack: TwcCallBack });

                iframeTwc[0].contentWindow.GetLatLng(Url);
                
                if (_IsPlaying == true)
                {
                    iframeTwc[0].contentWindow.NavigatePlayToggle();
                }

                if (_IsAudioPlaying == true)
                {
                    iframeTwc[0].contentWindow.AudioPlayToggle();
                }

                if (_IsNarrationPlaying == true)
                {
                    iframeTwc[0].contentWindow.NarrationPlayToggle();
                }

                $(iframeTwc[0].contentWindow.document).on("mousemove", document_mousemove);
                $(iframeTwc[0].contentWindow.document).on("mousedown", document_mousemove);
                $(iframeTwc[0].contentWindow.document).on("keydown", document_keydown);

                var SwipeCallBack = function (event, direction, distance, duration, fingerCount, fingerData)
                {
                    console.log("You swiped " + direction);

                    switch (direction)
                    {
                        case "left":
                            btnNavigateNext_click();
                            break;

                        case "right":
                            btnNavigatePrevious_click();
                            break;
                    }
                };

                $(iframeTwc[0].contentWindow.document).swipe({
                    //Generic swipe handler for all directions
                    swipeRight: SwipeCallBack,
                    swipeLeft: SwipeCallBack,

                    ////Default is 75px, set to 0 for demo so any distance triggers swipe
                    //threshold: 0
                });


                break;
        }
    });
    iframeTwc.attr("src", "about:blank");
};

var Themes = {
    ThemeA: 1, // Classic
    ThemeB: 2, // Sea Foam
    ThemeC: 3, // Comsic
    ThemeD: 4, // Dark
};
var _Themes = Themes.ThemeA;

var AssignThemes = function (e)
{
    var forecolor;
    var backcolor;
    var butncolor;
    var brdrcolor;
    var invert;
    var themecolor;

    switch (e.Themes)
    {
        case "THEMEA":
            _Themes = Themes.ThemeA;
            break;
        case "THEMEB":
            _Themes = Themes.ThemeB;
            break;
        case "THEMEC":
            _Themes = Themes.ThemeC;
            break;
        case "THEMED":
            _Themes = Themes.ThemeD;
            break;
    }

    switch (_Themes)
    {
        case Themes.ThemeD:
            forecolor = "rgb(255, 255, 255)";
            backcolor = "rgb(0, 0, 0)";
            butncolor = "rgb(96, 96, 96)";
            brdrcolor = "rgb(255, 255, 255)";
            invert = "100";
            themecolor = "#000000";
            break;
        default:
            forecolor = "rgb(0, 0, 0)";
            backcolor = "rgb(255, 255, 255)";
            butncolor = "rgb(224, 224, 224)";
            brdrcolor = "rgb(0, 0, 0)";
            invert = "0";
            themecolor = "#ffffff";
            break;
    }

    $("button, input").css("background-color", butncolor);
    $("input, button, .autocomplete-suggestions").css("border", "solid 1px " + brdrcolor);
    $("body, input, button, .autocomplete-suggestion").css("color", forecolor);
    $("body, input[type=text], .autocomplete-suggestions").css("background-color", backcolor);
    $("#imgGetGps").css("filter", "invert(" + invert + "%)");
    $("meta[name=theme-color]").attr("content", themecolor);
};

var AssignLastUpdate = function ()
{
    var LastUpdate = "(None)";

    if (_LastUpdate)
    {
        switch ($("input[type='radio'][name='radUnits']:checked").val())
        {
            case "ENGLISH":
                LastUpdate = _LastUpdate.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' });
                break;
            case "METRIC":
                LastUpdate = _LastUpdate.toLocaleString('en-GB', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' });
                break;
        }
    }

    spanLastRefresh.html(LastUpdate);

    if (_LastUpdate)
    {
        if (chkAutoRefresh.is(":checked") == true)
        {
            StartAutoRefreshTimer();
        }
    }
};

var TwcCallBack = function (e)
{
    switch (e.Status)
    {
        case "LOADED":
            console.log("Twc Loaded");

            _LastUpdate = e.LastUpdate;
            AssignLastUpdate();
            break;

        case "WEATHERPARAMETERS":
            console.log("Weather Parameters");

            _WeatherParameters = e.WeatherParameters;
            PopulateWeatherParameters();
            break;

        case "ISPLAYING":
            console.log("Play Toggled");
            _IsPlaying = e.Value;
            localStorage.setItem("TwcPlay", _IsPlaying);

            if (_IsPlaying == true)
            {
                _NoSleep.enable();

                $("img[src='images/nav/ic_play_arrow_white_24dp_1x.png']").attr("title", "Pause");
                $("img[src='images/nav/ic_play_arrow_white_24dp_1x.png']").attr("src", "images/nav/ic_pause_white_24dp_1x.png");
                $("img[src='images/nav/ic_play_arrow_white_24dp_2x.png']").attr("title", "Pause");
                $("img[src='images/nav/ic_play_arrow_white_24dp_2x.png']").attr("src", "images/nav/ic_pause_white_24dp_2x.png");
            }
            else
            {
                _NoSleep.disable();

                $("img[src='images/nav/ic_pause_white_24dp_1x.png']").attr("title", "Play");
                $("img[src='images/nav/ic_pause_white_24dp_1x.png']").attr("src", "images/nav/ic_play_arrow_white_24dp_1x.png");
                $("img[src='images/nav/ic_pause_white_24dp_2x.png']").attr("title", "Play");
                $("img[src='images/nav/ic_pause_white_24dp_2x.png']").attr("src", "images/nav/ic_play_arrow_white_24dp_2x.png");
            }
            break;

        case "ISAUDIOPLAYING":
            console.log("Audio Play Toggled");
            _IsAudioPlaying = e.Value;
            localStorage.setItem("TwcAudioPlay", _IsAudioPlaying);

            if (_IsAudioPlaying == true)
            {
                $("img[src='images/nav/ic_volume_off_white_24dp_1x.png']").attr("title", "Mute");
                $("img[src='images/nav/ic_volume_off_white_24dp_1x.png']").attr("src", "images/nav/ic_volume_up_white_24dp_1x.png");
                $("img[src='images/nav/ic_volume_off_white_24dp_2x.png']").attr("title", "Mute");
                $("img[src='images/nav/ic_volume_off_white_24dp_2x.png']").attr("src", "images/nav/ic_volume_up_white_24dp_2x.png");
            }
            else
            {
                $("img[src='images/nav/ic_volume_up_white_24dp_1x.png']").attr("title", "Unmute");
                $("img[src='images/nav/ic_volume_up_white_24dp_1x.png']").attr("src", "images/nav/ic_volume_off_white_24dp_1x.png");
                $("img[src='images/nav/ic_volume_up_white_24dp_2x.png']").attr("title", "Unmute");
                $("img[src='images/nav/ic_volume_up_white_24dp_2x.png']").attr("src", "images/nav/ic_volume_off_white_24dp_2x.png");
            }
            break;

        case "ISNARRATIONPLAYING":
            console.log("Narration Play Toggled");
            _IsNarrationPlaying = e.Value;
            localStorage.setItem("TwcNarrationPlay", _IsNarrationPlaying);

            if (_IsNarrationPlaying == true)
            {
                $("img[src='images/nav/ic_no_hearing_white_24dp_1x.png']").attr("title", "Turn off Narration");
                $("img[src='images/nav/ic_no_hearing_white_24dp_1x.png']").attr("src", "images/nav/ic_hearing_white_24dp_1x.png");
                $("img[src='images/nav/ic_no_hearing_white_24dp_2x.png']").attr("title", "Turn off Narration");
                $("img[src='images/nav/ic_no_hearing_white_24dp_2x.png']").attr("src", "images/nav/ic_hearing_white_24dp_2x.png");
            }
            else
            {
                $("img[src='images/nav/ic_hearing_white_24dp_1x.png']").attr("title", "Turn on Narration");
                $("img[src='images/nav/ic_hearing_white_24dp_1x.png']").attr("src", "images/nav/ic_no_hearing_white_24dp_1x.png");
                $("img[src='images/nav/ic_hearing_white_24dp_2x.png']").attr("title", "Turn on Narration");
                $("img[src='images/nav/ic_hearing_white_24dp_2x.png']").attr("src", "images/nav/ic_no_hearing_white_24dp_2x.png");
            }
            break;
    }
};

var btnNavigateRefresh_click = function ()
{
    LoadTwcData(_TwcDataUrl);
    UpdateFullScreenNavigate();

    return false;
};

var btnNavigateNext_click = function ()
{
    iframeTwc[0].contentWindow.NavigateNext();
    UpdateFullScreenNavigate();

    return false;
};

var btnNavigatePrevious_click = function ()
{
    iframeTwc[0].contentWindow.NavigatePrevious();
    UpdateFullScreenNavigate();

    return false;
};

var window_resize = function ()
{
    //var iFrameLocation = iframeTwc[0].contentWindow.location;
    //var Hash = iFrameLocation.hash;

    var $window = $(window);

    if ($window.height() == _WindowHeight || $window.width() == _WindowWidth)
    {
        return;
    }

    _WindowHeight = $window.height();
    _WindowWidth = $window.width();

    try
    {
        ////iFrameLocation.hash = "";
        ////iFrameLocation.hash = Hash;
        //iframeTwc[0].contentWindow.history.replaceState("", document.title, iFrameLocation.pathname);
        //iframeTwc[0].contentWindow.history.replaceState("", document.title, iFrameLocation.pathname + Hash);
        iframeTwc[0].contentWindow.NavigateReset();
    } catch (ex) { }

    UpdateFullScreenNavigate();
};

var _NavigateFadeIntervalId = null;

var UpdateFullScreenNavigate = function ()
{
    $(document.activeElement).blur();

    //console.log("window_mousemove: inFullScreen = True");
    //console.log(e);

    //if (divTwcLeft.css("visibility") != "")
    //{
    //    divTwcLeft.css("visibility", "");
    //    divTwcLeft.css("opacity", "0.0");
    //    divTwcLeft.animate({ opacity: 1.0 }, 1000);
    //    //divTwcLeft.fadeIn();
    //}
    //$("body").css("cursor", "");
    $("body").removeClass("HideCursor");
    $(iframeTwc[0].contentWindow.document).find("body").removeClass("HideCursor");
    divTwcLeft.fadeIn2();
    divTwcRight.fadeIn2();
    divTwcBottom.fadeIn2();

    //divTwcRight.fadeIn();

    if (_NavigateFadeIntervalId)
    {
        window.clearTimeout(_NavigateFadeIntervalId);
        _NavigateFadeIntervalId = null;
    }

    _NavigateFadeIntervalId = window.setTimeout(function ()
    {
        //console.log("window_mousemove: TimeOut");
        var inFullScreen = InFullScreen();
        //alert(inFullScreen)

        if (inFullScreen == true)
        {
            //$("body").css("cursor", "none !important");
            $("body").addClass("HideCursor");
            //$(iframeTwc[0].contentWindow).css("cursor", "none !important");
            $(iframeTwc[0].contentWindow.document).find("body").addClass("HideCursor");

            //divTwcLeft.css("visibility", "");
            //divTwcLeft.animate({ opacity: 0.0 }, 1000, function ()
            //{
            //    divTwcLeft.css("visibility", "hidden");
            //});
            divTwcLeft.fadeOut2();
            divTwcRight.fadeOut2();
            divTwcBottom.fadeOut2();
        }

        //divTwcRight.fadeOut();
    }, 2000);
};

var document_mousemove = function (e)
{
    var inFullScreen = InFullScreen();
    //alert("document_mousemove")

    //console.log(e.originalEvent.buttons);
    if (inFullScreen == true)
    {
        if ((e.originalEvent.movementX == 0 && e.originalEvent.movementY == 0 && e.originalEvent.buttons == 0))
        {
            return;
        }

        UpdateFullScreenNavigate();
    }
};

var document_keydown = function (e)
{
    //if (_AllowKeyDown == false)
    //{
    //    return;
    //}
    //_AllowKeyDown = false;

    //window.setTimeout(function ()
    //{
    //    _AllowKeyDown = true;
    //}, 500);

    var inFullScreen = InFullScreen();
    var code = (e.keyCode || e.which);

    if (inFullScreen == true || document.activeElement == document.body)
    {
        switch (code)
        {
            case 32: // Space
                btnNavigatePlay_click();
                return false;
                break;

            case 39: // Right Arrow
            case 34: // Page Down
                btnNavigateNext_click();
                return false;
                break;

            case 37: // Left Arrow
            case 33: // Page Up
                btnNavigatePrevious_click();
                return false;
                break;

            case 36: // Home
                btnNavigateMenu_click();
                return false;
                break;

            case 48: // Restart
                btnNavigateRefresh_click();
                return false;
                break;

            case 77: // M
                btnAudioPlay_click();
                return false;
                break;

            case 78: // N
                btnNarrationPlay_click();
                return false;
                break;

            case 70: // F
                btnFullScreen_click();
                return false;
                break;
                
        }
    }
};

$.fn.fadeIn2 = function ()
{
    var _self = this;
    var opacity = 0.0;
    var IntervalId = null;

    if (_self.css("opacity") != "0")
    {
        return;
    }

    //_self.css("visibility", "");
    _self.css("visibility", "visible");
    _self.css("opacity", "0.0");

    IntervalId = window.setInterval(function ()
    {
        opacity += 0.1;
        opacity = Math.round2(opacity, 1);
        _self.css("opacity", opacity.toString());

        if (opacity == 1.0)
        {
            //_self.css("visibility", "");
            _self.css("visibility", "visible");
            window.clearInterval(IntervalId);
        }
    }, 50);

    return _self;
};

$.fn.fadeOut2 = function ()
{
    var _self = this;
    var opacity = 1.0;
    var IntervalId = null;

    if (_self.css("opacity") != "1")
    {
        return;
    }

    //_self.css("visibility", "");
    _self.css("visibility", "visible");
    _self.css("opacity", "1.0");

    IntervalId = window.setInterval(function ()
    {
        opacity -= 0.2;
        opacity = Math.round2(opacity, 1);
        _self.css("opacity", opacity.toString());

        if (opacity == 0)
        {
            _self.css("visibility", "hidden");
            window.clearInterval(IntervalId);
        }
    }, 50);

    return _self;
};

Math.round2 = function (value, decimals)
{
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

var btnNavigatePlay_click = function ()
{
    iframeTwc[0].contentWindow.NavigatePlayToggle();
    UpdateFullScreenNavigate();

    //if (iframeTwc[0].contentWindow.IsPlaying() == true)
    //{
    //    _NoSleep.enable();

    //    $("img[src='images/nav/ic_play_arrow_white_24dp_1x.png']").attr("title", "Pause");
    //    $("img[src='images/nav/ic_play_arrow_white_24dp_1x.png']").attr("src", "images/nav/ic_pause_white_24dp_1x.png");
    //    $("img[src='images/nav/ic_play_arrow_white_24dp_2x.png']").attr("title", "Pause");
    //    $("img[src='images/nav/ic_play_arrow_white_24dp_2x.png']").attr("src", "images/nav/ic_pause_white_24dp_2x.png");
    //}
    //else
    //{
    //    _NoSleep.disable();

    //    $("img[src='images/nav/ic_pause_white_24dp_1x.png']").attr("title", "Play");
    //    $("img[src='images/nav/ic_pause_white_24dp_1x.png']").attr("src", "images/nav/ic_play_arrow_white_24dp_1x.png");
    //    $("img[src='images/nav/ic_pause_white_24dp_2x.png']").attr("title", "Play");
    //    $("img[src='images/nav/ic_pause_white_24dp_2x.png']").attr("src", "images/nav/ic_play_arrow_white_24dp_2x.png");
    //}

    return false;
};

var btnAudioPlay_click = function ()
{
    iframeTwc[0].contentWindow.AudioPlayToggle();
    UpdateFullScreenNavigate();

    return false;
};

var btnNarrationPlay_click = function ()
{
    iframeTwc[0].contentWindow.NarrationPlayToggle();
    UpdateFullScreenNavigate();

    return false;
};

$(function ()
{
    _WindowHeight = $(window).height();
    _WindowWidth = $(window).width();

    frmGetLatLng = $("#frmGetLatLng");
    txtAddress = $("#txtAddress");
    btnGetLatLng = $("#btnGetLatLng");
    btnClearQuery = $("#btnClearQuery");
    btnGetGps = $("#btnGetGps");

    divLat = $("#divLat");
    spanLat = $("#spanLat");
    divLng = $("#divLng");
    spanLng = $("#spanLng");

    iframeTwc = $("#iframeTwc");
    btnFullScreen = $("#btnFullScreen");
    divTwc = $("#divTwc");
    divTwcTop = $("#divTwcTop");
    divTwcMiddle = $("#divTwcMiddle");
    divTwcBottom = $("#divTwcBottom");
    divTwcLeft = $("#divTwcLeft");
    divTwcRight = $("#divTwcRight");
    divTwcNav = $("#divTwcNav");
    divTwcNavContainer = $("#divTwcNavContainer");
    divTwcBottomLeft = $("#divTwcBottomLeft");
    divTwcBottomMiddle = $("#divTwcBottomMiddle");
    divTwcBottomRight = $("#divTwcBottomRight");

    radScrollDefault = $("#radScrollDefault");
    radScrollDefault.on("change", radScroll_change);

    frmScrollText = $("#frmScrollText");
    radScrollText = $("#radScrollText");
    txtScrollText = $("#txtScrollText");
    btnScrollText = $("#btnScrollText");

    frmScrollText.on("submit", frmScrollText_submit);
    txtScrollText.on("focus", function ()
    {
        txtScrollText.select();
    });
    radScrollText.on("change", radScroll_change);

    frmScrollRss = $("#frmScrollRss");
    radScrollRss = $("#radScrollRss");
    txtScrollRss = $("#txtScrollRss");
    btnScrollRss = $("#btnScrollRss");

    frmScrollRss.on("submit", frmScrollRss_submit);
    txtScrollRss.on("focus", function ()
    {
        txtScrollRss.select();
    });
    radScrollRss.on("change", radScroll_change);

    txtAddress.on("focus", function ()
    {
        txtAddress.select();
    });

    txtAddress.focus();

    $(".NavigateMenu").on("click", btnNavigateMenu_click);
    $(".NavigateRefresh").on("click", btnNavigateRefresh_click);
    $(".NavigateNext").on("click", btnNavigateNext_click);
    $(".NavigatePrevious").on("click", btnNavigatePrevious_click);
    $(".NavigatePlay").on("click", btnNavigatePlay_click);

    $(".ToggleVolume").on("click", btnAudioPlay_click);

    $(".ToggleNarration").on("click", btnNarrationPlay_click);

    $(btnGetGps).on("click", btnGetGps_click);

    //$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', OnFullScreen);
    $(window).on("resize", OnFullScreen);
    $(window).on("resize", window_resize);
    $(document).on("mousemove", document_mousemove);
    $(document).on("mousedown", document_mousemove);
    divTwc.on("mousedown", document_mousemove);
    $(document).on("keydown", document_keydown);
    document.addEventListener("touchmove", function (e) { if (_FullScreenOverride == true) e.preventDefault() });
    //$(document).on("keypress", document_keydown);
    $(".ToggleFullScreen").on("click", btnFullScreen_click);
    FullScreenResize();

    //var AutoSelectQuery = false;

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
		    'San Francisco, California, United States': { x: -122.3758, y: 37.6188 },
		    //'Dayton, Ohio, United States (City)': { x: -84.05, y: 39.85 },
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
		        //Url = location.protocol + '//' + domain + '/MapClick.php' + query;
		        Url =  'https://' + domain + '/MapClick.php' + query;
		    }
		    Url = "cors/?u=" + encodeURIComponent(Url);

		    //GetLatLng(Url);

		    //// First clear the iframe
		    //iframeTwc.on("load", function (e)
		    //{
		    //    //console.log("loaded...");

		    //    switch (iframeTwc.attr("src"))
		    //    {
		    //        case "about:blank":
		    //            iframeTwc.attr("src", "twc3.html?_=" + (new Date).getTime().toString());
		    //            //iframeTwc.attr("src", "twc3.html?a");
		    //            break;

		    //            //case "twc3.html":
            //        default:
		    //            iframeTwc.off("load");
		    //            iframeTwc[0].contentWindow.GetLatLng(Url);
		    //            break;
		    //    }
		    //});
		    //iframeTwc.attr("src", "about:blank");
		    LoadTwcData(Url);

		    // Save the query
		    localStorage.setItem("TwcQuery", txtAddress.val());

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
                url: location.protocol + '//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find',
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
        serviceUrl: location.protocol + '//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest',
        deferRequestBy: 300,
        paramName: 'text',
        params: {
            f: 'json',
            countryCode: 'USA', //'USA,PRI,VIR,GUM,ASM',
            category: cats,
            maxSuggestions: 10
        },
        dataType: 'jsonp',
        transformResult: function (response)
        {
            if (_AutoSelectQuery == true)
            {
                _AutoSelectQuery = false;
                window.setTimeout(function ()
                {
                    $(ac.suggestionsContainer.children[0]).click();
                }, 1);
            }

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
        //width: 400
        width: 493
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

    // Auto load the previous query
    var TwcQuery = localStorage.getItem("TwcQuery");

    var TwcQueryStr = getParameterByName("location");
    if (TwcQueryStr)
    {
        console.log(TwcQueryStr);
        TwcQuery = TwcQueryStr;
    }

    if (TwcQuery)
    {
        _AutoSelectQuery = true;
        txtAddress.val(TwcQuery);
        txtAddress.blur();
        txtAddress.focus();
    }

    var TwcPlay = localStorage.getItem("TwcPlay");
    if (!TwcPlay || TwcPlay == "true")
    {
        _IsPlaying = true;
    }

    var TwcAudioPlay = localStorage.getItem("TwcAudioPlay");
    if (!TwcAudioPlay || TwcAudioPlay == "true")
    {
        _IsAudioPlaying = true;
    }

    var TwcNarrationPlay = localStorage.getItem("TwcNarrationPlay");
    if (TwcNarrationPlay == "true")
    {
        _IsNarrationPlaying = true;
    }

    radScrollDefault.prop("checked", "");
    radScrollText.prop("checked", "");
    radScrollRss.prop("checked", "");

    var TwcScrollText = localStorage.getItem("TwcScrollText");
    if (TwcScrollText)
    {
        txtScrollText.val(TwcScrollText);
    }

    var TwcScrollRss = localStorage.getItem("TwcScrollRss");
    if (TwcScrollRss)
    {
        txtScrollRss.val(TwcScrollRss);
    }

    var TwcScrollChecked = localStorage.getItem("TwcScrollChecked");
    if (TwcScrollChecked)
    {
        $("#" + TwcScrollChecked).prop("checked", "checked");
    }
    else
    {
        radScrollDefault.prop("checked", "checked");
    }

    radScroll_change();

    btnClearQuery.on("click", function ()
    {
        spanCity.text("");
        spanState.text("");
        spanStationId.text("");
        spanRadarId.text("");
        spanZoneId.text("");

        radScrollDefault.prop("checked", "checked");

        radScrollText.prop("checked", "");
        txtScrollText.val("");

        radScrollRss.prop("checked", "");
        txtScrollRss.val("");

        radScroll_change();

        localStorage.removeItem("TwcScrollText");
        localStorage.removeItem("TwcScrollTextChecked");

        chkScrollHazardText.prop("checked", "");
        localStorage.removeItem("TwcScrollHazardText");

        chkAutoRefresh.prop("checked", "checked");
        localStorage.removeItem("TwcAutoRefresh");

        $("#radEnglish").prop("checked", "checked");
        localStorage.removeItem("TwcUnits");

        $("#radThemeA").prop("checked", "checked");
        AssignThemes({ Themes: "THEMEA" });
        localStorage.removeItem("TwcThemes");

        TwcCallBack({ Status: "ISNARRATIONPLAYING", Value: false });
        localStorage.removeItem("TwcNarrationPlay");
        _IsNarrationPlaying = false;

        TwcCallBack({ Status: "ISAUDIOPLAYING", Value: false });
        localStorage.removeItem("TwcAudioPlay");
        _IsAudioPlaying = true;

        TwcCallBack({ Status: "ISPLAYING", Value: false });
        localStorage.removeItem("TwcPlay");
        _IsPlaying = true;

        localStorage.removeItem("TwcQuery");
        PreviousSeggestionValue = null;
        PreviousSeggestion = null;

        LoadTwcData("");
    });

    var TwcUnits = localStorage.getItem("TwcUnits");
    if (!TwcUnits || TwcUnits == "ENGLISH")
    {
        $("#radEnglish").prop("checked", "checked");
    }
    else if (TwcUnits == "METRIC")
    {
        $("#radMetric").prop("checked", "checked");
    }

    var TwcThemes = localStorage.getItem("TwcThemes");
    if (!TwcThemes || TwcThemes == "THEMEA")
    {
        $("#radThemeA").prop("checked", "checked");
    }
    else if (TwcThemes == "THEMEB")
    {
        $("#radThemeB").prop("checked", "checked");
    }
    else if (TwcThemes == "THEMEC")
    {
        $("#radThemeC").prop("checked", "checked");
    }
    else if (TwcThemes == "THEMED")
    {
        $("#radThemeD").prop("checked", "checked");
    }
    AssignThemes({ Themes: TwcThemes });

    $("input[type='radio'][name='radUnits']").on("change", function ()
    {
        var Units = $(this).val();
        localStorage.setItem("TwcUnits", Units);
        AssignLastUpdate();
        iframeTwc[0].contentWindow.AssignUnits({ Units: Units });
    });

    $("input[type='radio'][name='radThemes']").on("change", function ()
    {
        var Themes = $(this).val();
        localStorage.setItem("TwcThemes", Themes);
        AssignThemes({ Themes: Themes });
        iframeTwc[0].contentWindow.AssignThemes({ Themes: Themes });
    });

    divRefresh = $("#divRefresh");
    spanLastRefresh = $("#spanLastRefresh");
    chkAutoRefresh = $("#chkAutoRefresh");
    lblRefreshCountDown = $("#lblRefreshCountDown");
    spanRefreshCountDown = $("#spanRefreshCountDown");

    chkAutoRefresh.on("change", function ()
    {
        var Checked = $(this).is(":checked");

        if (_LastUpdate)
        {
            if (Checked == true)
            {
                StartAutoRefreshTimer();
            }
            else
            {
                StopAutoRefreshTimer();
            }
        }

        localStorage.setItem("TwcAutoRefresh", Checked);
    });

    var TwcAutoRefresh = localStorage.getItem("TwcAutoRefresh");
    if (!TwcAutoRefresh || TwcAutoRefresh == "true")
    {
        chkAutoRefresh.prop("checked", "checked");
    }
    else
    {
        chkAutoRefresh.prop("checked", "");
    }

    spanCity = $("#spanCity");
    spanState = $("#spanState");
    spanStationId = $("#spanStationId");
    spanRadarId = $("#spanRadarId");
    spanZoneId = $("#spanZoneId");

    chkScrollHazardText = $("#chkScrollHazardText");
    chkScrollHazardText.on("change", function ()
    {
        var Checked = $(this).is(":checked");

        ScrollHazardText(Checked);

        localStorage.setItem("TwcScrollHazardText", Checked);
    });

    var TwcScrollHazardText = localStorage.getItem("TwcScrollHazardText");
    if (TwcScrollHazardText && TwcScrollHazardText == "true")
    {
        chkScrollHazardText.prop("checked", "checked");
    }
    else
    {
        chkScrollHazardText.prop("checked", "");
    }

});

var ScrollHazardText = function (enable)
{
    if (iframeTwc[0].contentWindow.ScrollHazardText)
    {
        iframeTwc[0].contentWindow.ScrollHazardText(enable);
    }
};

var StartAutoRefreshTimer = function ()
{
    //// Esnure that any previous timer has already stopped.
    //StopAutoRefreshTimer();
    if (_AutoRefreshIntervalId)
    {
        // Timer is already running.
        return;
    }

    // Reset the time elapsed.
    _AutoRefreshCountMs = 0;

    var AutoRefreshTimer = function ()
    {
        // Increment the total time elapsed.
        _AutoRefreshCountMs += _AutoRefreshIntervalMs;

        // Display the count down.
        var RemainingMs = (_AutoRefreshTotalIntervalMs - _AutoRefreshCountMs);
        if (RemainingMs < 0)
        {
            RemainingMs = 0;
        }
        var dt = new Date(RemainingMs);
        spanRefreshCountDown.html((dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes()) + ":" + (dt.getSeconds() < 10 ? "0" + dt.getSeconds() : dt.getSeconds()));

        if (_AutoRefreshCountMs >= _AutoRefreshTotalIntervalMs)
        {
            // Time has elapsed.
            LoadTwcData(_TwcDataUrl, true);
        }
    };
    _AutoRefreshIntervalId = window.setInterval(AutoRefreshTimer, _AutoRefreshIntervalMs);
    AutoRefreshTimer();
};
var StopAutoRefreshTimer = function ()
{
    if (_AutoRefreshIntervalId)
    {
        window.clearInterval(_AutoRefreshIntervalId);
        spanRefreshCountDown.html("--:--");
        _AutoRefreshIntervalId = null;
    }
};

var btnGetGps_click = function ()
{
    if (!navigator.geolocation)
    {
        return;
    }

    var CurrentPosition = function (Position)
    {
        var Latitude = Position.coords.latitude;
        var Longitude = Position.coords.longitude;
        //Latitude = 40.7754622; Longitude = -73.2411506;

        console.log("Latitude: " + Latitude + "; Longitude: " + Longitude);

        //http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?location=-72.971293%2C+40.850043&f=pjson
        request = $.ajax({
            url: location.protocol + '//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode',
            data: {
                location: Longitude + "," + Latitude,
                distance: 1000, // Find location upto 1 KM.
                f: 'json'
            },
            jsonp: 'callback',
            dataType: 'jsonp'
        });
        request.done(function (data)
        {
            console.log(data);

            var ZipCode = data.address.Postal;
            var City = data.address.City;
            var State = getStateTwoDigitCode(data.address.Region);
            var Country = data.address.CountryCode;
            var TwcQuery = ZipCode + ", " + City + ", " + State + ", " + Country;
            //var Url = "http://forecast.weather.gov/MapClick.php?lat=" + Latitude + "&lon=" + Longitude;

            txtAddress.val(TwcQuery);
            txtAddress.blur();
            txtAddress.focus();

            // Save the query
            localStorage.setItem("TwcQuery", TwcQuery);

            //LoadTwcData(Url);
        });

    };

    navigator.geolocation.getCurrentPosition(CurrentPosition);
};

var PopulateWeatherParameters = function ()
{
    spanCity.text(_WeatherParameters.City + ", ");
    spanState.text(_WeatherParameters.State);
    spanStationId.text(_WeatherParameters.StationId);
    spanRadarId.text(_WeatherParameters.RadarId);
    spanZoneId.text(_WeatherParameters.ZoneId);
};

var frmScrollText_submit = function (e)
{
    radScroll_change();

    return false;
};

var frmScrollRss_submit = function (e)
{
    radScroll_change();

    return false;
};

var radScroll_change = function (e)
{
    txtScrollText.blur();
    txtScrollText.addClass("Disabled");
    btnScrollText.addClass("Disabled");

    txtScrollRss.blur();
    txtScrollRss.addClass("Disabled");
    btnScrollRss.addClass("Disabled");

    var ScrollCheckedId = $("input[name='radScroll']:checked").attr("id");
    localStorage.setItem("TwcScrollChecked", ScrollCheckedId);

    switch (ScrollCheckedId)
    {
        case "radScrollDefault":
            AssignScrollText(null);
            break;

        case "radScrollText":
            txtScrollText.removeClass("Disabled");
            btnScrollText.removeClass("Disabled");

            var ScrollText = txtScrollText.val();
            localStorage.setItem("TwcScrollText", ScrollText);

            AssignScrollText({ ScrollText: ScrollText });
            break;

        case "radScrollRss":
            txtScrollRss.removeClass("Disabled");
            btnScrollRss.removeClass("Disabled");

            var ScrollRss = txtScrollRss.val();
            localStorage.setItem("TwcScrollRss", ScrollRss);

            AssignScrollText({ ScrollRss: ScrollRss });
            break;

    }
};

var AssignScrollText = function (e)
{
    if (iframeTwc[0].contentWindow.AssignScrollText)
    {
        iframeTwc[0].contentWindow.AssignScrollText(e);
    }
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
