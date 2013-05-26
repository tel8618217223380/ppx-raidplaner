var gTouchStartTimeMs = 0;

function touchConvert( aEvent )
{
    aEvent.preventDefault();

    var Type = null;
    var Touch = aEvent.changedTouches[0];
    var CurrentTimeMs = new Date().getTime();
    var NewEvent = document.createEvent("MouseEvent");
    var TriggerClick = false;

    switch ( aEvent.type )
    {
    case "touchstart":
        gTouchStartTimeMs = CurrentTimeMs;
        Type = "mousedown";
        break;

    case "touchmove":
        Type = "mousemove";
        break;

    case "touchcancel":
    case "touchend":
        TriggerClick = ( CurrentTimeMs - gTouchStartTimeMs < 500 );
        Type = "mouseup";
        break;

    default:
        return;
    }

    NewEvent.initMouseEvent( Type, true, true,
        aEvent.target.ownerDocument.defaultView, 0,
        Touch.screenX, Touch.screenY,
        Touch.clientX, Touch.clientY,
        aEvent.ctrlKey, aEvent.altKey, aEvent.shiftKey, aEvent.metaKey,
        0, null);

    aEvent.target.dispatchEvent( NewEvent );

    if ( TriggerClick )
    {
        var ClickEvent = document.createEvent("MouseEvent");

        ClickEvent.initMouseEvent( "click", true, true,
            aEvent.target.ownerDocument.defaultView, 0,
            Touch.screenX, Touch.screenY,
            Touch.clientX, Touch.clientY,
            aEvent.ctrlKey, aEvent.altKey, aEvent.shiftKey, aEvent.metaKey,
            0, null);

        aEvent.target.dispatchEvent( ClickEvent );
    }
}

// -----------------------------------------------------------------------------

function makeTouchable( aNode )
{
    if ( aNode.context.addEventListener )
    {
        aNode.context.addEventListener( "touchstart", touchConvert, true );
        aNode.context.addEventListener( "touchmove", touchConvert, true );
        aNode.context.addEventListener( "touchend", touchConvert, true );
    }
    else if ( aNode.context.attachEvent )
    {
        aNode.context.attachEvent( "touchstart", touchConvert );
        aNode.context.attachEvent( "touchmove", touchConvert );
        aNode.context.attachEvent( "touchend", touchConvert );
    }
}

// -----------------------------------------------------------------------------

function onTouch( aNode, aFunction )
{
    if ( aNode.context.addEventListener )
    {
        aNode.context.addEventListener( "touchend", aFunction, true );
    }
    else if ( aNode.context.attachEvent )
    {
        aNode.context.attachEvent( "touchend", aFunction );
    }
}