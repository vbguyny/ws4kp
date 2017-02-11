<%@ Page Language="C#" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="System.Globalization" %>

<script runat="server">
    protected void Page_Load()
    {
        string TextFileName = Server.MapPath(@"stations.txt");
        string JsFileName = Server.MapPath(@"stations.js");
        string JsText = string.Empty;

        using (TextWriter tw = new StreamWriter(JsFileName))
        {
            JsText = "var _StationInfo = {" + Environment.NewLine;
            tw.Write(JsText);

            using (TextReader tr = new StreamReader(TextFileName))
            {
                while (true)
                {
                    string Line = tr.ReadLine();

                    string StationId = string.Empty;
                    string City = string.Empty;
                    string State = string.Empty;
                    string Latitude = string.Empty;
                    string Longitude = string.Empty;

                    if (Line == null)
                    {
                        // Finished reading entire file.
                        break;
                    }
                    else if (string.IsNullOrWhiteSpace(Line) == true)
                    {
                        // Empty Line.
                        continue;
                    }
                    else if (Line.StartsWith("!") == true)
                    {
                        // Comment line.
                        continue;
                    }
                    else if (Line.Length == 30)
                    {
                        // State header.
                        continue;
                    }
                    else if (Line.Length != 83)
                    {
                        continue;
                    }

                    StationId = Line.Substring(20, 4);

                    if (string.IsNullOrWhiteSpace(StationId) == true)
                    {
                        // Empty Station Id.
                        continue;
                    }
                    else if (StationId == "ICAO")
                    {
                        // Station Id header.
                        continue;
                    }

                    State = Line.Substring(0, 2);

                    if (string.IsNullOrWhiteSpace(State) == true)
                    {
                        continue;
                    }

                    City = NormalizeCityName(Line.Substring(3, 16));
                    Latitude = ConvertDegreesMinutesToDegreesDecimal(Line.Substring(39, 7));
                    Longitude = ConvertDegreesMinutesToDegreesDecimal(Line.Substring(47, 7));

                    JsText = " " + StationId + ":" + Environment.NewLine;
                    JsText += " {" + Environment.NewLine;
                    JsText += "  StationId: '" + StationId + "'," + Environment.NewLine;
                    JsText += "  City: \"" + City + "\"," + Environment.NewLine;
                    JsText += "  State: '" + State + "'," + Environment.NewLine;
                    JsText += "  Latitude: '" + Latitude + "'," + Environment.NewLine;
                    JsText += "  Longitude: '" + Longitude + "'," + Environment.NewLine;
                    JsText += " }," + Environment.NewLine;

                    tw.Write(JsText);
                }
            }

            JsText = "}" + Environment.NewLine;

            tw.Write(JsText);
        }
    }

    private string ConvertDegreesMinutesToDegreesDecimal(string DegreesMinutes)
    {
        // Example: 39 51N -> 39.85
        // Example: 104 39W -> -104.65
        //return "";

        string[] DegreeArray = DegreesMinutes.Split(' ');
        double Degrees = Convert.ToDouble(DegreeArray[0]);
        double Minutes = Convert.ToDouble(DegreeArray[1].Substring(0, 2));
        string Direction = DegreeArray[1].Substring(2, 1);
        double Sign = 0;

        switch (Direction)
        {
            case "N":
            case "E":
                Sign = 1;
                break;

            case "S":
            case "W":
                Sign = -1;
                break;
        }

        return Convert.ToString((Degrees + (Minutes / 60)) * Sign);
    }

    private string NormalizeCityName(string CityName)
    {
        // Return the city name only with the first character of word capitalized.
        CityName = CityName.TrimEnd();

        //string[] CityNameArray = CityName.Split(' ');
        //string NormalizedCityName = string.Empty;

        //foreach (string CityNamePart in CityNameArray)
        //{
        //    if (string.IsNullOrEmpty(CityNamePart) == true)
        //    {
        //        continue;
        //    }

        //    NormalizedCityName += CityNamePart.Substring(0, 1).ToUpper() + CityNamePart.Substring(1).ToLower() + " ";
        //}

        //return NormalizedCityName.TrimEnd();

        
        TextInfo textInfo = new CultureInfo("en-US",false).TextInfo;
        return textInfo.ToTitleCase(CityName.ToLower());
    }

</script>

<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta charset="utf-8" />
    <title></title>    
</head>
<body>
    <form id="form1" runat="server">   
        <asp:Label ID="lblTest" Text="DONE" runat="server"></asp:Label>
    </form>
</body>
</html>
