var g_UnappliedChanges = false;

function onUIDataChange()
{
    g_UnappliedChanges = true;
    $(".apply_changes").button("option", "disabled", false);
}

// -----------------------------------------------------------------------------

function onAppliedUIDataChange()
{
    g_UnappliedChanges = false;
    $(".apply_changes").button("option", "disabled", true);
}

// -----------------------------------------------------------------------------

function onChangeContext( event )
{
    var name = event.currentTarget.id;
    var nameParts = name.split("_");    
    name = nameParts[1];
    
    for ( i=2; i<nameParts.length; ++i )
    {
        name += ","+nameParts[i];
    }
       
    if ( g_UnappliedChanges )
    {
        confirm(L("UnappliedChanges"), L("DiscardChanges"), L("Cancel"), function() {
            changeContext( name );
            onAppliedUIDataChange();
        });
    }
    else
    {    
        changeContext( name );
    }
}

// -----------------------------------------------------------------------------

function changeContext( a_Name )
{
    var nameParts = a_Name.split(",");
    var name = nameParts[0];
    
    if ( name == "settings" )
        name = "settings_users";
    
    var hash = window.location.hash.substring( 1, window.location.hash.length );

    $(".menu_button").removeClass("on");
    $("#button_" + name).addClass("on");

    hideTooltip();

    if ( hash != a_Name )
    {
        var url = window.location.href.substr( 0, window.location.href.lastIndexOf("#") );
        window.location.href = url + "#" + a_Name;
        return true;
    }

    return false;
}

// -----------------------------------------------------------------------------

function checkUser()
{
    if ( g_User == null )
    {
        var url = window.location.href.substr( 0, window.location.href.lastIndexOf("#") );
        window.location.href = url;
        return false;
    }
    
    return true;
}

// -----------------------------------------------------------------------------

function reloadUser()
{
    $.ajax({
        type: "GET",
        url: "lib/script/_session.js.php?version=" + g_SiteVersion,
        dataType: "script",
        success: checkUser,
        cache: false
    });
}

// -----------------------------------------------------------------------------

function confirm( a_Text, a_Yes, a_No, a_Callback )
{
    $("#dialog").empty().append( a_Text );
    
    var dialogWidget = $("#dialog").dialog({
        resizable: false,
        draggable: false,
        width: 400,
        title: L("Notification"),
        dialogClass: "dialogFix"
    });

    dialogWidget.dialog( "option", "buttons", [{
            text: a_Yes,
            click: function() {
                $( this ).dialog( "close" );
                $("#eventblocker").hide();
                a_Callback();
            }
        },
        {
            text: a_No,
            click: function() {
                $( this ).dialog( "close" );
            }
        }]
    );

    dialogWidget.dialog({
           close: function() { $("#eventblocker").hide(); }
    });

    $(".ui-dialog-buttonset").children().css("font-size", 11);

    $(".ui-dialog-buttonset").children().last().focus();
    $("#eventblocker").show();
}

// -----------------------------------------------------------------------------

function notify( a_Text )
{
    $("#dialog").empty().append( a_Text );
    
    var dialogWidget = $("#dialog").dialog({
        resizable: false,
        draggable: false,
        title: L("Notification"),
        width: 400,
        dialogClass: "dialogFix"
    });

    dialogWidget.dialog( "option", "buttons", [{
        text: "Ok",
        click: function() {
            $( this ).dialog( "close" );
        }
    }]);

    dialogWidget.dialog({
           close: function() { $("#eventblocker").hide(); }
    });

    $(".ui-dialog-buttonset").children().css("font-size", 11);

    $(".ui-dialog-buttonset").children().last().focus();
    $("#eventblocker").show();
}

// -----------------------------------------------------------------------------

function prompt( a_Text, a_Ok, a_Cancel, a_Callback )
{
    var HTMLString = "<br/><input id=\"prompt_text\" class=\"prompt_text\"/>";

    $("#dialog").empty()
        .append( a_Text )
        .append( HTMLString );

    var dialogWidget = $("#dialog").dialog({
        resizable: false,
        draggable: false,
        width: 400,
        title: L("InputRequired"),
        dialogClass: "dialogFix"
    });

    dialogWidget.dialog( "option", "buttons", [{
            text: a_Ok,
            click: function() {
                $( this ).dialog( "close" );
                $("#eventblocker").hide();
                a_Callback();
            }
        },
        {
            text: a_Cancel,
            click: function() {
                $( this ).dialog( "close" );
            }
        }]
    );

    dialogWidget.dialog({
           close: function() { $("#eventblocker").hide(); }
    });

    $(".ui-dialog-buttonset").children().css("font-size", 11);

    $(".ui-dialog-buttonset").children().last().focus();
    $("#eventblocker").show();
}

// -----------------------------------------------------------------------------

function onAjaxDone( a_Event, a_XHR, a_Options )
{
    $("#ajaxblocker").clearQueue().hide();
    var errors = $(a_XHR.responseXML).children("messagehub").children("error");

    if ( errors.size() > 0 )
    {
        var message = L("RequestError") + "<br/>";

        errors.each( function() {
            message += "<br/><br/>" + $(this).text();
        });


        notify( message );
    }
}

// -----------------------------------------------------------------------------

function onAjaxError( a_Event, a_XHR, a_Options, a_Error )
{
    $("#ajaxblocker").clearQueue().hide();

    var errors = $(a_XHR.responseXML).children("messagehub").children("error");

    var message = L("RequestError") + "<br/><br/>";
    message    += a_Error + "<br/>";

    if ( errors.size() > 0 )
    {
        errors.each( function( index, element ) {
            message += "<br/>"+element.text();
        });
    }

    notify( message );
}

// -----------------------------------------------------------------------------

var g_AfterInit = null;

$(document).ready( function() {

    onChangeConfig();

    if ( $("#tooltip").size() > 0)
        $("#tooltip").hide();

    if ( $("#closesheet").size() > 0)
        $("#closesheet").click( closeSheet );

    if ( $("#sheetoverlay").size() > 0)
    {
        $("#sheetoverlay").hide();
        $("#newlocation").hide();
        $("#description").hide();
    }

    $("#dialog").hide();

    $("#ajaxblocker").hide();

    $("#ajaxblocker").ajaxSend( function() {
        $("#ajaxblocker").delay(2000).show(1);
    });

    $("#ajaxblocker").ajaxComplete( onAjaxDone );
    $("#ajaxblocker").ajaxError( onAjaxError );

    $(".button_logout").button({
        icons: { secondary: "ui-icon-eject" }
    }).css( "font-size", 11 );

    $(window).resize( hideTooltip );

    $("#body").add("#logo").add("#menu")
        .click( startFadeTooltip );

    initMenu();
    initLogin();
    
    if ( g_AfterInit != null )
        g_AfterInit();
});