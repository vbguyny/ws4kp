/// <reference path="jquery-3.1.0.min.js" />

var frmSpeech;
var btnSpeak;
var txtText;
var divVoices;

var inputVolume;
var inputRate;
var inputPitch

var _Utterance = null;
var _Voices = {};
var _Voice = null;

$(function ()
{
    frmSpeech = $("#frmSpeech");
    btnSpeak = $("#btnSpeak");
    txtText = $("#txtText");

    divVoices = $("#divVoices");

    inputVolume = $("#inputVolume");
    inputRate = $("#inputRate");
    inputPitch = $("#inputPitch");

    //btnSpeak.on("click", btnSpeak_onclick);
    frmSpeech.submit(frmSpeech_onsubmit);

    txtText.on("focus", function ()
    {
        txtText.select();
    });
    txtText.focus();

    DisplayVoices();

    //var u = new SpeechSynthesisUtterance("The page has been loaded.");
    //window.speechSynthesis.speak(u);

});

var frmSpeech_onsubmit = function (e)
{
    if (window.speechSynthesis.speaking == true)
    {
        window.speechSynthesis.cancel();
    }

    _Utterance = new SpeechSynthesisUtterance(txtText.val());

    //_Utterance.volume = 1.0;
    //_Utterance.rate = 1.0;
    //_Utterance.pitch = 1.0;
    _Utterance.volume = parseFloat(inputVolume.val());
    _Utterance.rate = parseFloat(inputRate.val());
    _Utterance.pitch = parseFloat(inputPitch.val());
    _Utterance.lang = "en-US";

    SelectVoice(_Utterance);

    //alert(_Utterance.voice.name);

    _Utterance.onend = function ()
    {
        console.log("Finished speaking.");
    };

    window.speechSynthesis.speak(_Utterance);

    return false;
};

var SelectVoice = function (Utterance)
{
    if (!window.speechSynthesis)
    {
        alert("speechSynthesis is not supported!");
        return;
    }

    if (_Voice == null)
    {
        return;
    }

    Utterance.voice = _Voice

    //var Voices = speechSynthesis.getVoices();
    
    //$(Voices).each(function ()
    //{
    //    var voice = this;

    //    //switch(voice.name)
    //    //{
    //    //    case _VoiceName:
    //    //        Utterance.voice = voice;
    //    //        return;
    //    //        break;

    //    //    //case "Microsoft David Desktop - English (United States)":
    //    //    //case "Google UK English Male":
    //    //    //    //case "Google US English":
    //    //    ////case "Google italiano":
    //    //    //    Utterance.voice = voice;
    //    //    //    return;
    //    //    //    break;
    //    //}
    //});

};

var DisplayVoices = function ()
{
    var Html = "";

    divVoices.empty();

    if (!window.speechSynthesis)
    {
        alert("speechSynthesis is not supported!");
        return;
    }

    var DisplayVoices2 = function ()
    {
        var Voices = speechSynthesis.getVoices();
        if (!Voices || Voices.length == 0)
        {
            window.setTimeout(function ()
            {
                DisplayVoices2();
            }, 1);
            return;
        }

        $(Voices).each(function ()
        {
            var voice = this;

            _Voices[voice.name] = voice;

            //console.log(voice.name, voice.default ? '(default)' : '');
            console.log(voice);

            Html += "<span class='VoiceName'><b>" + voice.name + "</span></b>";
            Html += "<hr/>";
        });
        divVoices.html(Html);

        $(".VoiceName").on("click", VoiceName_click);

    };

    var VoiceName_click = function ()
    {
        var SpanVoiceName = $(this);

        $(".VoiceName").css("color", "black");

        //_VoiceName = SpanVoiceName.text();
        _Voice = _Voices[SpanVoiceName.text()];

        SpanVoiceName.css("color", "blue");
    };

    window.setTimeout(function ()
    {
        DisplayVoices2();
    }, 1);

};
