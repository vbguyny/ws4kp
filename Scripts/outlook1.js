/// <reference path="jquery-3.1.0.min.js" />

var canvas1;

var frmSubmit;
var inputLatitude;
var inputLongitude;
var inputSubmit;

$(function ()
{
    canvas1 = $("#canvas1");

    frmSubmit = $("#frmSubmit");
    inputLatitude = $("#inputLatitude");
    inputLongitude = $("#inputLongitude");
    inputSubmit = $("#inputSubmit");

    frmSubmit.on("submit", frmSubmit_submit);

});

var frmSubmit_submit = function (e)
{
    DrawPointOnMap({
        Latitude: inputLatitude.val(),
        Longitude: inputLongitude.val(),
    });

    return false;
};

var DrawPointOnMap = function (e)
{
    var Latitude = parseFloat(e.Latitude);
    var Longitude = parseFloat(e.Longitude);

    var canvas = canvas1[0];
    var context = canvas.getContext("2d");
    var MapImage = new Image();

    MapImage.onload = function (e)
    {
        context.drawImage(MapImage, 0, 0);

        var X = 10;
        var Y = 10;

        // The height is in the range of latitude 75'N (top) - 15'N (bottom)
        //Y = ((75 - Latitude) / 60) * 707;
        Y = ((75 - Latitude) / 53) * 707;
        //Y = ((72 - Latitude) / 53) * 707;

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
        //X = ((-180 - Longitude) / -165) * 719;
        //X = ((-135 - Longitude) / -75) * 719; // -135 - -60
        //X = ((-155 - Longitude) / -110) * 719; // -155 - -45
        //X = ((-155 - Longitude) / -102) * 719; // -155 - -53
        //X = ((-151 - Longitude) / -102) * 719; // -151 - -49
        X = ((-155 - Longitude) / -110) * 719; // -155 - -40

        //X += Math.abs(40 - Latitude) * 1.9;

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
        //X += (Longitude - -100.46) * 1;

        // The further left and right from lat 45 and lon -97 the y increases
        //Y -= Math.abs(-97 - Longitude) / 60 * 75;

        X = Math.round(X);
        Y = Math.round(Y);

        // Determine if there is any "non-white" colors around the area.
        // Search a 16x16 region.
        var FoundColor = false;
        for (var ColorX = X - 8; ColorX <= X + 8; ColorX++)
        {
            for (var ColorY = Y - 8; ColorY <= Y + 8; ColorY++)
            {
                // i + 0 = red
                // i + 1 = green
                // i + 2 = blue
                // i + 3 = alpha (0 = transparent, 255 = opaque)

                //var PixelData = context.getImageData(ColorX, ColorY, 1, 1).data;
                //var R = PixelData[0];
                //var G = PixelData[1];
                //var B = PixelData[2];
                //var A = PixelData[3];
                //var PixelColor = "#" + ("000000" + rgbToHex(R, G, B)).slice(-6);

                var PixelColor = GetPixelColor(context, ColorX, ColorY);

                if (PixelColor != "#FFFFFF" && PixelColor != "#000000")
                {
                    alert(PixelColor);
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

        // Indicate on the map where we are at.
        DrawBox(context, "red", X, Y, 4, 4);

    };
    MapImage.src = "Images/off14_prcp.gif";
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

var DrawBox = function (context, color, x, y, width, height)
{
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
};

var deg2rad = function(degrees)
{
    return degrees * (Math.PI / 180);
};
var rad2deg = function(radians)
{
    return radians * (180 / Math.PI);
};
