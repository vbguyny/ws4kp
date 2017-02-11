<%@ Page Language="C#" Debug="true" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Text" %>

<script runat="server">
    protected void Page_Load()
    {
        bool OkToProcessRequest = false;

        Page.Response.Clear();

        switch (Page.Request.Url.Host)
        {
            case "localhost":
            case "192.168.2.98":
            case "24.187.197.234":
            case "battaglia.ddns.net":
                OkToProcessRequest = true;
                break;
        }

        if (OkToProcessRequest == false)
        {
            Page.Response.Clear();
            Page.Response.End();
            return;
        }

        //lblTest.Text = Page.Request.Url.ToString();
        string Url = Page.Request.QueryString["u"];

        lblTest.Text = Url;
        //return;

        ////string Data;
        //byte[] Data;

        WebClient client = new WebClient();
        client.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36");
        //client.Headers.Add("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
        //client.Headers.Add("Accept-Language", "en-US,en;q=0.8");
        //client.Headers.Add("Cache-Control", "max-age=0");

        Uri Uri = new Uri(Url);
        string Origin = Uri.Scheme + "://" + Uri.Host;
        //Response.Write(Origin + "<br />");
        //Response.Write(Uri.Scheme + "<br />");
        //Response.End();
        client.Headers.Add("Origin", Origin);

        //Data = client.DownloadString(Url);
        try
        {
            if (Url.EndsWith(".txt") == true)
            {
                string Data;
                Data = client.DownloadString(Url);
                Page.Response.Write(Data);
            }
            else
            {
                byte[] Data;
                Data = client.DownloadData(Url);
                Page.Response.BinaryWrite(Data);
            }
        }
        catch (Exception ex)
        {
            string Message = Url + Environment.NewLine + ex.Message;

            throw new Exception(Message);
        }

        ////Page.Response.Write(Data);
        //Page.Response.BinaryWrite(Data);
        Page.Response.End();
    }
</script>

<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta charset="utf-8" />
    <title></title>    
</head>
<body>
    <form id="form2" runat="server">   
        <asp:Label ID="lblTest" runat="server"></asp:Label>
    </form>
</body>
</html>
