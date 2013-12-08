// -----------------------------------------------------------------------------
//  CRaidMemberList
// -----------------------------------------------------------------------------

var cPlayerFlagNone      = 0;
var cPlayerFlagModified  = 1;
var cPlayerFlagNew       = 1 << 1;
var cPlayerFlagCharId    = 1 << 2;
var cPlayerFlagUserId    = 1 << 3;
var cPlayerFlagName      = 1 << 4;
var cPlayerFlagComment   = 1 << 5;

function CRaidMemberList()
{
    this.mPlayers = Array();
    this.mRemovedPlayers = Array();
    this.mNextRandomId = -1;
    this.mStage = "";
    this.mMode = "manual";
    
    // -------------------------------------------------------------------------

    this.addPlayer = function( aAttendee )
    {
        var NewPlayer = {
            id         : aAttendee.id,
            userId     : aAttendee.userId,
            timestamp  : aAttendee.timestamp,
            hasRecord  : aAttendee.hasId,
            charId     : aAttendee.charid,
            name       : aAttendee.name,
            className  : aAttendee.classname,
            mainchar   : aAttendee.mainchar,
            activeRole : aAttendee.role,
            firstRole  : aAttendee.role1,
            secondRole : aAttendee.role2,
            status     : aAttendee.status,
            comment    : aAttendee.comment,
            flags      : cPlayerFlagNone,
            characters : Array()
        };

        $.each(aAttendee.character, function(index, value) {
            var NewTwink = {
                id         : value.id,
                mainchar   : value.mainchar,
                name       : value.name,
                className  : value.classname,
                firstRole  : value.role1,
                secondRole : value.role2
            };

            NewPlayer.characters.push(NewTwink);
        });

        this.mPlayers.push(NewPlayer);
    };

    // -----------------------------------------------------------------------------

    this.addRandomPlayer = function( aRoleIdx )
    {
        var NewPlayer = {
            id         : this.mNextRandomId,
            userId     : 0,
            timestamp  : Math.round((new Date()).getTime() / 1000),
            hasRecord  : false,
            charId     : 0,
            name       : "Random",
            className  : "random",
            mainchar   : false,
            activeRole : aRoleIdx,
            firstRole  : aRoleIdx,
            secondRole : aRoleIdx,
            status     : (this.mMode == "all") ? "ok" : "available",
            comment    : "",
            flags      : cPlayerFlagModified | cPlayerFlagNew | cPlayerFlagName,
            characters : Array()
        };

        // New random players have a negative id so we can insert them as new
        // players. Existing players have regular ids

        --this.mNextRandomId;
        this.mPlayers.push(NewPlayer);
        this.updateRoleList( aRoleIdx );
    };

    // -------------------------------------------------------------------------

    this.forEachPlayer = function( aCallback )
    {
        for ( var PlayerIdx=0; PlayerIdx<this.mPlayers.length; ++PlayerIdx )
        {
            aCallback( this.mPlayers[PlayerIdx] );
        }
    };

    // -------------------------------------------------------------------------

    this.forEachPlayerWithRole = function( aRole, aCallback )
    {
        for ( var PlayerIdx=0; PlayerIdx<this.mPlayers.length; ++PlayerIdx )
        {
            if ( this.mPlayers[PlayerIdx].activeRole == aRole )
            {
                aCallback( this.mPlayers[PlayerIdx] );
            }
        }
    };

    // -------------------------------------------------------------------------

    this.numPlayersWithRole = function( aRole )
    {
        var Count = 0;
        for ( var PlayerIdx=0; PlayerIdx<this.mPlayers.length; ++PlayerIdx )
        {
            if ( this.mPlayers[PlayerIdx].activeRole == aRole )
            {
                ++Count;
            }
        }

        return Count;
    };

    // -------------------------------------------------------------------------

    this.getPlayerIndex = function( aPlayerId )
    {
        for ( var PlayerIdx=0; PlayerIdx<this.mPlayers.length; ++PlayerIdx )
        {
            if ( this.mPlayers[PlayerIdx].id == aPlayerId )
            {
                return PlayerIdx;
            }
        }

        return -1;
    };

    // -------------------------------------------------------------------------

    this.getModifiedPlayersForRole = function( aRoleId, aArray )
    {
        // Returns an array with the following elements. Elements >= 4 depend
        // on the flags value.
        
        this.forEachPlayerWithRole( aRoleId, function( aPlayer ) {
            
            if ( (aPlayer.flags & cPlayerFlagModified) !== 0 )
            {
                aArray.push( aPlayer.id );
                aArray.push( aPlayer.status );
                aArray.push( aPlayer.timestamp );
                aArray.push( aPlayer.flags );
    
                if ( (aPlayer.flags & cPlayerFlagCharId) !== 0 )
                    aArray.push( aPlayer.charId );
                    
                if ( (aPlayer.flags & cPlayerFlagUserId) !== 0 )
                    aArray.push( aPlayer.userId );
                
                if ( (aPlayer.flags & cPlayerFlagName) !== 0 )
                    aArray.push( aPlayer.name );
                    
                if ( (aPlayer.flags & cPlayerFlagComment) !== 0 )
                    aArray.push( aPlayer.comment );
            }
        });
    };

    // -------------------------------------------------------------------------

    this.changePlayerName = function( aPlayerId, aName )
    {
        var PlayerIdx = this.getPlayerIndex( aPlayerId );
        
        if (aName != this.mPlayers[PlayerIdx].name)
        {
            this.mPlayers[PlayerIdx].name = aName;            
            this.mPlayers[PlayerIdx].flags |= cPlayerFlagModified | cPlayerFlagName;
            
            return true;
        }
        
        return false;
    };

    // -------------------------------------------------------------------------

    this.generatePlayerSlot = function( aPlayer, aClipStatus )
    {
        var HTMLString  = "";
        var LayoutClass = ((aClipStatus.clipItemCount % aClipStatus.colsPerClip) === 0) ? "break" : "nobreak";
        var BgClass = (aPlayer.comment === "") ? "activeSlot" : "activeSlotComment";

        if ( gUser.isRaidlead )
        {
            if (this.mMode != "all")
                BgClass += " clickable";
            BgClass += " dragable";
        }
        
        HTMLString += "<div class=\""+BgClass+" "+LayoutClass+"\" id=\"sp"+aPlayer.id+"\">";
        HTMLString += "<div class=\"playerIcon\" style=\"background-image: url(images/classessmall/"+aPlayer.className+".png)\">";
        HTMLString += "<div class=\"slotMarker\"></div>";
        
        if ( aPlayer.mainchar )
            HTMLString += "<div class=\"mainbadge\"></div>";

        HTMLString += "</div>";

        if ( gUser.isRaidlead && (aPlayer.className == "random") )
            HTMLString += "<input class=\"editableName\" type=\"test\" value=\"" + aPlayer.name + "\"/>";
        else
            HTMLString += "<div class=\"playerName\">" + aPlayer.name + "</div>";

        HTMLString += "</div>";
        HTMLString += this.updateClipStatus( aClipStatus );

        return HTMLString;
    };

    // -------------------------------------------------------------------------

    this.generateSpilledSlot = function( aPlayer, aClipStatus )
    {
        var HTMLString  = "";
        var LayoutClass = ((aClipStatus.clipItemCount % aClipStatus.colsPerClip) === 0) ? "break" : "nobreak";
        var BgClass = (aPlayer.comment === "") ? "spilledSlot" : "spilledSlotComment";

        if ( gUser.isRaidlead )
            BgClass += " dragable";
            
        HTMLString += "<div class=\""+BgClass+" "+LayoutClass+"\" id=\"sp"+aPlayer.id+"\">";
        HTMLString += "<div class=\"playerIcon\" style=\"background-image: url(images/classessmall/"+aPlayer.className+".png)\">";
        HTMLString += "<div class=\"slotMarker\"></div>";
        
        if ( aPlayer.mainchar )
            HTMLString += "<div class=\"mainbadge\"></div>";

        HTMLString += "</div>";

        if ( gUser.isRaidlead && (aPlayer.className == "random") )
            HTMLString += "<input class=\"editableName\" type=\"test\" value=\"" + aPlayer.name + "\"/>";
        else
            HTMLString += "<div class=\"playerName\">" + aPlayer.name + "</div>";

        HTMLString += "</div>";
        HTMLString += this.updateClipStatus( aClipStatus );

        return HTMLString;
    };

    // -------------------------------------------------------------------------

    this.generateWaitSlot = function( aPlayer, aClipStatus, aBenched )
    {
        var HTMLString = "";
        var LayoutClass = ((aClipStatus.clipItemCount % aClipStatus.colsPerClip) === 0) ? "break" : "nobreak";
        var BgClassBase = (aBenched) ? "benchSlot" : "waitSlot";
        var BgClass = (aPlayer.comment === "") ? BgClassBase : BgClassBase+"Comment";

        if ( gUser.isRaidlead )
        {
            BgClass += " dragable";
            if (!aBenched)
                BgClass += " clickable";
        }
            
        HTMLString += "<div class=\""+BgClass+" "+LayoutClass+"\" id=\"sp"+aPlayer.id+"\">";
        HTMLString += "<div class=\"playerIcon\" style=\"background-image: url(images/classessmall/"+aPlayer.className+".png)\">";

        if ( aPlayer.mainchar )
            HTMLString += "<div class=\"mainbadge\"></div>";

        HTMLString += "</div>";

        if ( gUser.isRaidlead && (aPlayer.className == "random") )
            HTMLString += "<input class=\"editableName\" type=\"test\" value=\"" + aPlayer.name + "\"/>";
        else
            HTMLString += "<div class=\"playerName\">" + aPlayer.name + "</div>";

        HTMLString += "</div>";
        HTMLString += this.updateClipStatus( aClipStatus );

        return HTMLString;
    };

    // -------------------------------------------------------------------------

    this.generateEmptySlot = function( aClipStatus )
    {
        var HTMLString = "";
        var LayoutClass = ((aClipStatus.clipItemCount % aClipStatus.colsPerClip) === 0) ? "break" : "nobreak";

        HTMLString += "<div class=\"emptySlot "+LayoutClass+"\" style=\"background-image: url("+gConfig.RoleImages[aClipStatus.roleId]+")\">";
        HTMLString += "</div>";

        HTMLString += this.updateClipStatus( aClipStatus );
        return HTMLString;
    };

    // -------------------------------------------------------------------------

    this.generateAddRandomSlot = function( aClipStatus, aOverEmptySlot )
    {
        var HTMLString = "";
        var LayoutClass = ((aClipStatus.clipItemCount % aClipStatus.colsPerClip) === 0) ? "break" : "nobreak";

        if (aOverEmptySlot)
        {
            var RoleImage = gConfig.RoleImages[aClipStatus.roleId];
            var RoleRndImage = RoleImage.substr(0,RoleImage.lastIndexOf(".")) + "_rnd" + RoleImage.substr(RoleImage.lastIndexOf("."));
            
            HTMLString += "<div class=\"randomSlot clickable "+LayoutClass+"\" style=\"background-image: url("+RoleRndImage+")\">";
            HTMLString += "</div>";
        }
        else
        {
            HTMLString += "<div class=\"randomSlot clickable "+LayoutClass+"\">";
            HTMLString += "</div>";
        }
        
        HTMLString += this.updateClipStatus( aClipStatus );
        return HTMLString;
    };

    // -------------------------------------------------------------------------

    this.generateAbsentSlot = function( aPlayer, aClipStatus )
    {
        var HTMLString  = "";
        var BgClass = (aPlayer.comment === "") ? "benchSlot" : "benchSlotComment";

        HTMLString += "<div class=\""+BgClass+" clickable2 nobreak\" id=\"ap"+aPlayer.id+"\">";
        HTMLString += "<div class=\"playerIcon\" id=\"ap_icon"+aPlayer.id+"\" style=\"background-image: url(images/classessmall/"+aPlayer.className+".png)\">";
        HTMLString += "</div>";
        HTMLString += "<div class=\"playerName\">" + aPlayer.name + "</div>";

        HTMLString += "</div>";
        HTMLString += this.updateRowClipStatus( aClipStatus );

        return HTMLString;
    };

    // -------------------------------------------------------------------------

    this.updateClipStatus = function( aClipStatus )
    {
        var HTMLString = "";
        
        ++aClipStatus.itemCount;
        ++aClipStatus.clipItemCount;

        if ( aClipStatus.itemCount < aClipStatus.displayCount )
        {
            if ( aClipStatus.clipItemCount == ((aClipStatus.colsPerClip * aClipStatus.rowsPerClip)-1) )
            {
                HTMLString += this.generateNextClipButton(aClipStatus);
            }
        }

        return HTMLString;
    };
    
    // -------------------------------------------------------------------------
    
    this.generateNextClipButton = function( aClipStatus )
    {
        var HTMLString = "";
        var LayoutClass = (aClipStatus.colsPerClip == 1) ? "break" : "nobreak";

        HTMLString += "<div class=\"clipchange clickable "+LayoutClass+"\" onclick=\"showRaidClip('role"+aClipStatus.roleId+"clip"+(aClipStatus.currentId+1)+"')\"></div>";
        HTMLString += "</div>";
        HTMLString += "<div class=\"clip\" id=\"role"+aClipStatus.roleId+"clip"+(aClipStatus.currentId+1)+"\">";
        HTMLString += "<div class=\"clipchange clickable break\" onclick=\"showRaidClip('role"+aClipStatus.roleId+"clip"+aClipStatus.currentId+"')\"></div>";

        ++aClipStatus.currentId;
        aClipStatus.clipItemCount = 1;
    
        return HTMLString;
    };
    
    // -------------------------------------------------------------------------

    this.updateRowClipStatus = function( aClipStatus )
    {
        var HTMLString = "";
        var MaxNumCols = 6;

        ++aClipStatus.itemCount;
        ++aClipStatus.clipItemCount;

        if ( aClipStatus.clipItemCount == ((aClipStatus.rowsPerClip*MaxNumCols)-1) )
        {
            HTMLString += "<div class=\"clipchange nobreak\" onclick=\"showRaidClip('"+aClipStatus.prefix+(aClipStatus.currentId+1)+"')\"></div>";
            HTMLString += "</div>";
            HTMLString += "<div class=\"clip\" id=\""+aClipStatus.prefix+(aClipStatus.currentId+1)+"\">";
            HTMLString += "<div class=\"clipchange nobreak\" onclick=\"showRaidClip('"+aClipStatus.prefix+aClipStatus.currentId+"')\"></div>";

            ++aClipStatus.currentId;
            aClipStatus.clipItemCount = 1;
        }

        return HTMLString;
    };

    // -------------------------------------------------------------------------

    this.generateRoleList = function( aRoleId, aColumns, aRequiredSlots )
    {
        var AttendedForRole = 0;
        
        this.forEachPlayerWithRole( aRoleId, function(aPlayer) {
            if ( (aPlayer.status == "ok") || (aPlayer.status == "available") )
                ++AttendedForRole;
        });

        var HTMLString = "<div class=\"roleList\">";
        HTMLString += "<h2>"+gConfig.RoleNames[gConfig.RoleIdents[aRoleId]]+" <span class=\"attendance_count\">("+AttendedForRole+"/"+aRequiredSlots+")</span></h2>";
        HTMLString += "<div class=\"clip\" id=\"role"+aRoleId+"clip0\">";

        var ClipStatus = {
            roleId        : aRoleId,
            colsPerClip   : aColumns,
            rowsPerClip   : 9,
            currentId     : 0,
            itemCount     : 0,
            clipItemCount : 0,
            displayCount  : Math.max(this.numPlayersWithRole(aRoleId), aRequiredSlots)
        };

        var Self = this;
        var NumActive = 0;

        // Display raiding players

        this.forEachPlayerWithRole( aRoleId, function(aPlayer) {
            if ( aPlayer.status == "ok" )
            {
                if ( NumActive >= aRequiredSlots )
                    HTMLString += Self.generateSpilledSlot( aPlayer, ClipStatus );
                else
                    HTMLString += Self.generatePlayerSlot( aPlayer, ClipStatus );

                ++NumActive;
            }
        });
        
        // Add "line break"
        
        var RowIdx = ClipStatus.clipItemCount / aColumns;
        var Adjust = (RowIdx - parseInt(RowIdx, 10) === 0) ? 0 : 1;
        var NewRow = parseInt(RowIdx, 10)+Adjust;
        
        if ( NewRow == ClipStatus.rowsPerClip )
        {
            HTMLString += this.generateNextClipButton(ClipStatus);
        }
        else
        {        
            ClipStatus.clipItemCount = NewRow * aColumns;
            HTMLString += "<div class=\"separator\"></div>";
        }
        
        // Display waiting players

        var WaitingAreBenched = ((NumActive >= aRequiredSlots) && (this.mMode != "overbook")) ||
                                (!gUser.isRaidlead && (this.mStage == "locked"));

        this.forEachPlayerWithRole( aRoleId, function(aPlayer) {
            if ( aPlayer.status == "available" )
            {
                HTMLString += Self.generateWaitSlot( aPlayer, ClipStatus, WaitingAreBenched );
            }
        });

        // Add a slot to add randoms

        var ItemsRemain = aRequiredSlots;

        if ( gUser.isRaidlead )
        {
            var OverEmptySlot = ClipStatus.itemCount < ItemsRemain;
            HTMLString += this.generateAddRandomSlot( ClipStatus, OverEmptySlot );
        }

        // Display required, empty slots

        while ( ClipStatus.itemCount < ItemsRemain )
        {
            HTMLString += this.generateEmptySlot( ClipStatus );
        }


        HTMLString += "</div>";
        HTMLString += "</div>";

        return HTMLString;
    };

    // -------------------------------------------------------------------------

    this.generateAbsentList = function( aRows )
    {
        var HTMLString = "<div id=\"absentList\">";

        HTMLString += "<h2 style=\"position: relative; width: 800px\">"+L("AbsentPlayers")+"</h2>";
        HTMLString += "<div class=\"clip\" id=\"absentclip0\">";

        var Self = this;
        var ClipStatus = {
            rowsPerClip   : aRows,
            currentId     : 0,
            itemCount     : 0,
            clipItemCount : 0,
            prefix        : "absentclip"
        };

        // Display absent players

        this.forEachPlayer( function(aPlayer) {
            if ( aPlayer.status == "unavailable" )
            {
                HTMLString += Self.generateAbsentSlot( aPlayer, ClipStatus );
            }
        });

        HTMLString += "</div>";
        HTMLString += "</div>";

        return HTMLString;
    };

    // -------------------------------------------------------------------------

    this.generateUndecidedList = function( aRows )
    {
        var HTMLString = "<div id=\"undecidedList\">";

        HTMLString += "<h2 style=\"position: relative; width: 800px\">"+L("UndecidedPlayers")+"</h2>";
        HTMLString += "<div class=\"clip\" id=\"undecidedclip0\">";

        var Self = this;
        var ClipStatus = {
            rowsPerClip   : aRows,
            currentId     : 0,
            itemCount     : 0,
            clipItemCount : 0,
            prefix        : "undecidedclip"
        };

        // Display undecided players

        this.forEachPlayer( function(aPlayer) {
            if ( aPlayer.status == "undecided" )
            {
                HTMLString += Self.generateAbsentSlot( aPlayer, ClipStatus );
            }
        });

        HTMLString += "</div>";
        HTMLString += "</div>";

        return HTMLString;
    };

    // -----------------------------------------------------------------------------

    this.bindClipPlayer = function( aClipItem )
    {
        var PlayerId = parseInt( aClipItem.attr("id").substr(2), 10 );
        var PlayerList = this;

        aClipItem.draggable({
            delay          : 100,
            revert         : true,
            revertDuration : 200,
            helper         : "clone",
            start          : function() { PlayerList.showDropTargets(PlayerId, $(this)); },
            stop           : function() { PlayerList.hideDropTargets(); }
        });

        aClipItem.children(".editableName").each( function() {
            // Block click events to avoid up-/downgrade
            $(this).click( function(aEvent) { aEvent.stopPropagation(); });

            // Editing the text field starts the "edit mode"
            $(this).focus( function() {
                $(this).prev()
                    .css("background-image", "url(lib/layout/images/remove.png)")
                    .click( function(aEvent) {
                        aEvent.stopPropagation();
                        PlayerList.removePlayer(PlayerId);
                    });
            });

            // Leaving the text field resets the "edit mode"
            $(this).blur( function() {
                if (PlayerList.changePlayerName(PlayerId, $(this).val()))
                {
                    onUIDataChange();
                }
                   
                $(this).prev()
                    .css("background-image", "url(images/classessmall/random.png)")
                    .unbind("click");
            });
        });

        makeTouchable(aClipItem);
    };

    // -----------------------------------------------------------------------------

    this.bindClips = function( aParent )
    {
        if ( gUser == null )
            return;

        var Clips = aParent.children(".clip");
        var Config = aParent.data("config");
        var PlayerList = this;

        if ( gUser.isRaidlead )
        {
            var NumActiveSlots = Clips.children(".activeSlot").length + Clips.children(".activeSlotComment").length;
            
            // same for benched Slots

            Clips.children(".benchSlot").each( function() {
                var PlayerId = parseInt( $(this).attr("id").substr(2), 10 );
                PlayerList.bindClipPlayer( $(this) );
            });

            // Attach event listeners for wait and bench Slots with Comment.
            // For wait Slots 1st click opens Comment, 2nd click upgrades

            Clips.children(".waitSlot, .waitSlotComment").each( function() {
                var PlayerId  = parseInt( $(this).attr("id").substr(2), 10 );
                var PlayerIdx = PlayerList.getPlayerIndex(PlayerId);
                var Player    = PlayerList.mPlayers[PlayerIdx];
                var Name      = Player.name;
                var Comment   = Player.comment;
                var Image     = "images/classessmall/" + Player.className + ".png";
                var Slot      = $(this);
                var Icon      = Slot.children(".playerIcon");

                var onAbortFunction = function() {
                    Icon.css("background-image","url("+Image+")");
                    Icon.siblings(".playerName:first").empty().append(Name);
                    if (Player.mainchar)
                        Icon.append("<div class=\"mainbadge\"></div>");                    
                    Slot.unbind("click").click( onClickFunction );
                };

                var onClickFunction = function(aEvent) {
                    if ( PlayerList.mMode != "all" )
                    {
                        Icon.css("background-image","url(lib/layout/images/move_up.png)");
                        Icon.children(".mainbadge").detach();
                        
                        Slot.unbind("click").click( function() {
                            var CharIdx = Icon.data("setup_info");
                            PlayerList.upgradePlayer(PlayerId, CharIdx); 
                            onUIDataChange();
                        });
                    }

                    showTooltipCharChooser( Icon, Player, true, onAbortFunction );
                    aEvent.stopPropagation();
                };

                Slot.click( onClickFunction );
                PlayerList.bindClipPlayer( Slot );
            });

            // same for benched Slots

            Clips.children(".benchSlotComment").each( function() {
                var PlayerId  = parseInt( $(this).attr("id").substr(2), 10 );
                var PlayerIdx = PlayerList.getPlayerIndex(PlayerId);
                var Player    = PlayerList.mPlayers[PlayerIdx];
                var Name      = Player.name;
                var Image     = "images/classessmall/" + Player.className + ".png";
                var Slot      = $(this);
                var Icon      = Slot.children(".playerIcon");

                var onAbortFunction = function() {
                    Icon.css("background-image","url("+Image+")");
                    Icon.siblings(".playerName:first").empty().append(Name);
                    if (Player.mainchar)
                        Icon.append("<div class=\"mainbadge\"></div>");
                    Slot.unbind("click").click( onClickFunction );
                };
                
                Slot.click( function(aEvent) {
                    showTooltipCharChooser( Icon, Player, true, onAbortFunction );
                    aEvent.stopPropagation();
                });

                PlayerList.bindClipPlayer( Slot );
            });

            // attach event listeners for active Slots with Comment.
            // 1st click opens Comment, 2nd click downgrades

            Clips.children(".activeSlot, .spilledSlot, .activeSlotComment, .spilledSlotComment").each( function() {
                var PlayerId  = parseInt( $(this).attr("id").substr(2), 10 );
                var PlayerIdx = PlayerList.getPlayerIndex(PlayerId);
                var Player    = PlayerList.mPlayers[PlayerIdx];
                var Name      = Player.name;
                var Image     = "images/classessmall/" + Player.className + ".png";
                var Slot      = $(this);
                var Icon      = Slot.children(".playerIcon");

                var onAbortFunction = function() {
                    Icon.css("background-image","url("+Image+")");
                    Icon.siblings(".playerName:first").empty().append(Name);
                    if (Player.mainchar)
                        Icon.append("<div class=\"mainbadge\"></div>");
                    Slot.unbind("click").click( onClickFunction );
                };
                
                var onClickFunction = function(aEvent) {
                    if ( PlayerList.mMode != "all" )
                    {
                        Icon.css("background-image","url(lib/layout/images/move_down.png)");
                        Icon.children(".mainbadge").detach();
                        
                        Slot.unbind("click").click( function() {
                            var CharIdx = Icon.data("setup_info");
                            PlayerList.downgradePlayer(PlayerId, CharIdx); 
                            onUIDataChange();
                        });
                    }

                    showTooltipCharChooser( Icon, Player, true, onAbortFunction );
                    aEvent.stopPropagation();
                };

                Slot.click( onClickFunction );
                PlayerList.bindClipPlayer( Slot );
            });

            // attach event handlers for "add random player" button

            Clips.children(".randomSlot").each( function() {
                $(this).click( function() { 
                    PlayerList.addRandomPlayer(Config.id); 
                    onUIDataChange();
                });
            });
        }
        else
        {
            // Regular users are only able to see the tooltips

            Clips.children(".activeSlot, .spilledSlot, .waitSlot, .benchSlot, .activeSlotComment, .spilledSlotComment, .waitSlotComment, .benchSlotComment").each( function() {
                var PlayerId  = parseInt( $(this).attr("id").substr(2), 10 );
                var PlayerIdx = PlayerList.getPlayerIndex(PlayerId);
                var Player    = PlayerList.mPlayers[PlayerIdx];
                var Slot      = $(this);
                var Icon      = Slot.children(".playerIcon");

                Slot.mouseover( function(aEvent) {
                    showTooltipCharChooser( Icon, Player, false, null );
                    aEvent.stopPropagation();
                });
                
                Slot.click( function(aEvent) {
                    showTooltipCharChooser( Icon, Player, true, null );
                    aEvent.stopPropagation();
                });
            });
        }
    };

    // -------------------------------------------------------------------------

    this.updateRoleList = function( aRoleIdx )
    {
        var RoleList = $( $("#raidsetup > .roleList")[aRoleIdx] );
        var RoleConf = RoleList.data("config");

        RoleList.replaceWith( this.generateRoleList(RoleConf.id, RoleConf.columns, RoleConf.reqSlots) );
        RoleList = $( $("#raidsetup > .roleList")[aRoleIdx] );

        var ClipId = parseInt( RoleConf.clip.substr(9), 10 );
        var NumClips = RoleList.children(".clip").length;

        if ( ClipId >= NumClips )
        {
            RoleConf.clip = RoleConf.clip.substr(0,9) + (NumClips-1);
        }

        RoleList.data("config", RoleConf);
        $("#"+RoleConf.clip).show();

        this.bindClips( RoleList );
    };

    // -----------------------------------------------------------------------------

    this.showDropTargets = function( aPlayerId, aSource )
    {
        hideTooltip();
        
        var PlayerList = $("#raiddetail").data("players");
        var PlayerIdx  = this.getPlayerIndex( aPlayerId );
        var Player     = this.mPlayers[PlayerIdx];
        var RoleLists  = $("#raidsetup > .roleList");
        var RoleIdx    = 0;

        RoleLists.each( function() {
            if ( ((Player.className == "random") ||
                  (RoleIdx == Player.firstRole) ||
                  (RoleIdx == Player.secondRole)) &&
                  (RoleIdx != Player.activeRole) )
            {
                var CurrentRoleIdx = RoleIdx;
                
                $(this).droppable({
                    drop: function() {
                        aSource.draggable("option", "revert", false);
                        aSource.draggable("destroy").detach();
                        PlayerList.movePlayer(aPlayerId, CurrentRoleIdx);
                        onUIDataChange();
                    }
                });
            }
            else
            {
                $(this).fadeTo(100, 0.15);
            }

            ++RoleIdx;
        });
        
        $("#absent_drop").fadeTo(100, 1.0).droppable({
            hoverClass: "absent_hover",
            drop: function() {                
                if ( Player.charId > 0 )
                {
                    prompt(L("AbsentMessage"), L("MarkAsAbesent"), L("Cancel"), function(aComment) {
                        aSource.draggable("option", "revert", false);
                        aSource.draggable("destroy").detach();
                        if (aComment.length == 0) aComment = L("AbsentBy");
                        PlayerList.absentPlayer(aPlayerId, "</br>["+gUser.name+"] " + aComment);                
                    });
                }
                else
                {
                    aSource.draggable("option", "revert", false);
                    aSource.draggable("destroy").detach();
                    
                    PlayerList.absentPlayer(aPlayerId, "");
                }
            }            
        });
    };

    // -----------------------------------------------------------------------------

    this.hideDropTargets = function()
    {
        $("#raidsetup > .roleList")
            .fadeTo(100, 1.0);
            
        $("#raidsetup > .ui-droppable")
            .droppable("destroy");
            
        $("#absent_drop").fadeTo(100, 0.0);
    };

    // -------------------------------------------------------------------------

    this.upgradePlayer = function( aPlayerId, aCharIdx )
    {
        var PlayerIdx = this.getPlayerIndex( aPlayerId );
        var Player = this.mPlayers[PlayerIdx];
        var oldRole = Player.activeRole;
        
        Player.status = "ok";
        Player.flags |= cPlayerFlagModified;
        
        if ((aCharIdx != null) && (Player.characters.length > 1))
        {
            var assignedChar = Player.characters[aCharIdx];
            if (Player.charId != assignedChar.id)
            {
                Player.name       = assignedChar.name;
                Player.className  = assignedChar.className;
                Player.mainchar   = assignedChar.mainchar;
                Player.charId     = assignedChar.id;
                Player.activeRole = assignedChar.firstRole;
                Player.firstRole  = assignedChar.firstRole;
                Player.secondRole = assignedChar.secondRole;
                Player.comment   += "</br>["+gUser.name+"] " + L("SwitchChar"); 
                
                Player.flags |= cPlayerFlagCharId;
            }
        }
        
        if (oldRole != Player.activeRole) this.updateRoleList(oldRole);            
        this.updateRoleList(Player.activeRole);
    };

    // -------------------------------------------------------------------------

    this.downgradePlayer = function( aPlayerId, aCharIdx )
    {
        var PlayerIdx = this.getPlayerIndex( aPlayerId );
        var Player = this.mPlayers[PlayerIdx];
        var oldRole = Player.activeRole;

        Player.status = "available";
        Player.flags |= cPlayerFlagModified;
        
        if ((aCharIdx != null) && (Player.characters.length > 1))
        {
            var assignedChar = Player.characters[aCharIdx];
            if (Player.charId != assignedChar.id)
            {            
                Player.name       = assignedChar.name;
                Player.className  = assignedChar.className;
                Player.mainchar   = assignedChar.mainchar;
                Player.charId     = assignedChar.id;
                Player.activeRole = assignedChar.firstRole;
                Player.firstRole  = assignedChar.firstRole;
                Player.secondRole = assignedChar.secondRole;
                Player.comment   += "</br>["+gUser.name+"] " + L("SwitchChar"); 
                
                Player.flags |= cPlayerFlagCharId;
            }
        }
        
        if (oldRole != Player.activeRole) this.updateRoleList(oldRole);            
        this.updateRoleList(Player.activeRole);
    };

    // -----------------------------------------------------------------------------

    this.movePlayer = function( aPlayerId, aRoleIdx )
    {
        var PlayerIdx = this.getPlayerIndex( aPlayerId );
        var Player = this.mPlayers[PlayerIdx];
        var PrevRole = Player.activeRole;
        
        Player.activeRole = aRoleIdx;
        Player.flags |= cPlayerFlagModified;
        
        if (Player.userId == 0)
        {
            // Change roles for random players
            Player.firstRole = aRoleIdx;
            Player.secondRole = aRoleIdx;
        }              

        if ( this.mMode == "all" )
            Player.status = "ok";
        else
            Player.status = "available";

        this.updateRoleList( PrevRole );
        this.updateRoleList( aRoleIdx );
    };

    // -------------------------------------------------------------------------

    this.removePlayer = function( aPlayerId )
    {
        var PlayerIdx = this.getPlayerIndex( aPlayerId );
        var Role = this.mPlayers[PlayerIdx].activeRole;
        
        this.mPlayers.splice(PlayerIdx,1);

        if ( aPlayerId > 0 )
            this.mRemovedPlayers.push( aPlayerId );            
            
        this.updateRoleList( Role );
        onUIDataChange();
    };

    // -------------------------------------------------------------------------

    this.absentPlayer = function( aPlayerId, aComment )
    {
        var PlayerIdx = this.getPlayerIndex( aPlayerId );
        var Player = this.mPlayers[PlayerIdx];
        var Role = Player.activeRole;
        
        if ( Player.charId > 0 )
        {
            var Character = Player.characters[0];
            
            Player.name = Character.name;        
            Player.charId = Character.id;
            Player.className = Character.className;
            Player.mainchar = Character.mainchar;
            Player.activeRole = Character.firstRole;
            Player.firstRole = Character.firstRole;
            Player.secondRole = Character.secondRole;
            Player.flags = cPlayerFlagModified | cPlayerFlagComment | cPlayerFlagCharId;
            
            Player.status  = "unavailable";
            Player.comment += aComment;
            
            $("#absentList").replaceWith(this.generateAbsentList(3));
            onUpdateAbsentList(this);
        }
        else
        {
            this.mPlayers.splice(PlayerIdx,1);
            this.mRemovedPlayers.push( aPlayerId );
        }
        
        this.updateRoleList( Role );
        hideTooltip();
        onUIDataChange();
    };
}

// -----------------------------------------------------------------------------
//  player list functions
// -----------------------------------------------------------------------------

function showRaidClip( aClipId )
{
    var ClipToShow = $("#"+aClipId);
    var RoleList = ClipToShow.parent();
    var RoleConf = RoleList.data("config");
    RoleConf.clip = aClipId;

    RoleList.children(".clip").hide();
    ClipToShow.show();
}

// -----------------------------------------------------------------------------

function validateRoleCounts()
{
    var TotalMembers = 0;
    var MaxMembers   = $("#selectsize").val();

    for ( var i=0; i < gConfig.RoleIdents.length; ++i )
    {
        var SlotElement = $("#slotCount"+i);
        var RoleSlots   = parseInt( SlotElement.val(), 10 );
        var MaxAllowed  = MaxMembers;// - (gConfig.RoleIdents.length - (i+1));

        if ( (TotalMembers + RoleSlots > MaxAllowed) ||
             ((i == gConfig.RoleIdents.length-1) && (TotalMembers + RoleSlots < MaxAllowed)) )
        {
            RoleSlots = MaxAllowed - TotalMembers;
        }

        SlotElement.unbind("change");
        SlotElement[0].value = RoleSlots;
        SlotElement.bind("change", validateRoleCounts );

        TotalMembers += RoleSlots;
    }
}

// -----------------------------------------------------------------------------
//  display functions
// -----------------------------------------------------------------------------

function generateRaidInfo( aXHR, aAppendTo )
{
    var MonthArray  = Array(L("January"), L("February"), L("March"), L("April"), L("May"), L("June"), L("July"), L("August"), L("September"), L("October"), L("November"), L("December"));
    var RaidImage   = aXHR.image;
    var RaidName    = aXHR.locationname;
    var RaidSize    = 0;
    var RaidComment = aXHR.description;

    $.each(aXHR.slots, function(index, value) {
       RaidSize += value;
    });

    var StartDate = aXHR.startDate;
    var EndDate   = aXHR.endDate;
    var StartTime = aXHR.start;
    var EndTime   = aXHR.end;

    var HTMLString = "<div class=\"raidinfo\">";
    HTMLString += "<img src=\"images/raidbig/" + RaidImage + "\" class=\"raidicon\">";
    HTMLString += "<div class=\"raidname\">" + RaidName + "</div>";
    HTMLString += "<div class=\"raidsize\">" + RaidSize + " " + L("Players") + "</div>";
    HTMLString += "<div class=\"datetime\">" + formatDateTimeStringUTC(StartDate,StartTime) + " - " + formatTimeStringUTC(EndDate,EndTime);
    HTMLString += " " + formatDateOffsetUTC(StartDate, StartTime) + "</div>";
    
    if (RaidComment != "")
        HTMLString += "<div class=\"raidcomment\">" + RaidComment + "</div>";
    
    HTMLString += "</div>";

    $("#"+aAppendTo).prepend(HTMLString);
}

// -----------------------------------------------------------------------------

function generateRaidSetup( aXHR )
{
    var PlayerList = $("#raiddetail").data("players");
    var NumRoles   = Math.min( gConfig.RoleIdents.length, 5 );

    var HTMLString = "<div id=\"raidsetup\"></div>";
    $("#raiddetail").append(HTMLString);

    for ( var i=0; i<NumRoles; ++i )
    {
        var NumCols  = gConfig.RoleColumnCount[i];
        var Required = aXHR.slots[i];

        HTMLString = PlayerList.generateRoleList(i, NumCols, Required);
        $("#raidsetup").append(HTMLString);
        $("#raidsetup > *:last").data("config", {
            id       : i,
            columns  : NumCols,
            reqSlots : Required,
            clip     : "role"+i+"clip0"
        });
    }
    
    $("#raidsetup > .roleList").each( function() {
        $(this).children(".clip:first").show();
        PlayerList.bindClips( $(this) );
    });

    generateRaidInfo( aXHR, "raidsetup" );

    if (gUser.isRaidlead)
        $("#raidsetup").append("<div id=\"absent_drop\">"+L("MakeAbsent")+"</div>");
}

// -----------------------------------------------------------------------------

function onClickAbsentSlot(aEvent, aElement, aPlayer, aUndecided)
{
    var CharIdx = aElement.data("setup_info");
    hideTooltip();
                        
    if ((CharIdx !== null) && (CharIdx !== undefined))
    {
        var PlayerList = $("#raiddetail").data("players");        
        var Character = aPlayer.characters[CharIdx];
        var HasUserId = aPlayer.comment !== "";
        
        if (PlayerList.mMode == "all")
            aPlayer.status = "ok";
        else
            aPlayer.status = "available";
        
        aPlayer.name = Character.name;
        aPlayer.charId = Character.id;
        aPlayer.className = Character.className;
        aPlayer.mainchar = Character.mainchar;
        aPlayer.activeRole = Character.firstRole;
        aPlayer.firstRole = Character.firstRole;
        aPlayer.secondRole = Character.secondRole;
        aPlayer.comment += "</br>[" + gUser.name + "] " + L("SetupBy");
        aPlayer.flags |= cPlayerFlagModified | cPlayerFlagComment | cPlayerFlagCharId;
        
        if ( !aPlayer.hasRecord )
            aPlayer.flags |= cPlayerFlagNew;
        
        if ( !HasUserId )
            aPlayer.flags |= cPlayerFlagUserId;
            
        // Update lists
        
        if ( aUndecided )
        {
            $("#undecidedList").replaceWith(PlayerList.generateUndecidedList(3));
            onUpdateUndecidedList(PlayerList);
        }
        else
        {
            $("#absentList").replaceWith(PlayerList.generateAbsentList(3));
            onUpdateAbsentList(PlayerList);        
        }
        
        PlayerList.updateRoleList( aPlayer.activeRole );
        
        onUIDataChange();
        hideTooltip();
    }
    else
    {
        var onAbortFunction = function() {
            aElement.siblings(".playerName:first").empty().append( aPlayer.name );
            aElement.css("background-image", "url(images/classessmall/"+aPlayer.className+".png)");
            aElement.data("setup_info", null);
        };
    
        showTooltipCharChooser( aElement, aPlayer, true, onAbortFunction);
        
        aElement.css("background-image", "url(lib/layout/images/move_up.png)");
    }
        
    aEvent.stopPropagation();
}

// -----------------------------------------------------------------------------

function updateSlackersBadges(aPlayerList)
{
    var absentCount = 0;
    var undecidedCount = 0;
    
    aPlayerList.forEachPlayer( function(player) {
        if (player.status == "unavailable") ++absentCount;
    });
    
    $("#slackers_badge").empty();
    
    if (absentCount > 0)
        $("#slackers_badge").append("<span style=\"color: #f00\">" + absentCount + "</span>");    
}

// -----------------------------------------------------------------------------


function onUpdateAbsentList(aPlayerList)
{
    $("#absentList").data("config", {
        clip : "absentclip0"
    });

    $("#absentList > .clip").children(".benchSlotComment, .benchSlot").each( function() {
        var PlayerId  = parseInt( $(this).attr("id").substr(2), 10 );
        var PlayerIdx = aPlayerList.getPlayerIndex(PlayerId);
        var Player    = aPlayerList.mPlayers[PlayerIdx];
        var Element   = $(this).children(".playerIcon");

        if (gUser.isRaidlead)
        {
            $(this).click( function(aEvent) {
                onClickAbsentSlot(aEvent, Element, Player, false);
                aEvent.stopPropagation();
            });
        }
        else
        {
            Element.mouseover( function(aEvent) {
                showTooltipCharChooser( Element, Player, false, null );
                aEvent.stopPropagation();
            });
            
            Element.click( function(aEvent) {
                showTooltipCharChooser( Element, Player, true, null );
                aEvent.stopPropagation();
            });
        }
    });

    $("#absentList > .clip:first").show();    
    updateSlackersBadges(aPlayerList);
}

// -----------------------------------------------------------------------------

function onUpdateUndecidedList(aPlayerList)
{    
    $("#undecidedList").data("config", {
        clip : "undecidedclip0"
    });

    $("#undecidedList > .clip").children(".benchSlotComment, .benchSlot").each( function() {
        var PlayerId  = parseInt( $(this).attr("id").substr(2), 10 );
        var PlayerIdx = aPlayerList.getPlayerIndex(PlayerId);
        var Player    = aPlayerList.mPlayers[PlayerIdx];
        var Element   = $(this).children(".playerIcon");

        if (gUser.isRaidlead)
        {
            $(this).click( function(aEvent) {
                onClickAbsentSlot(aEvent, Element, Player, true);
                aEvent.stopPropagation();
            });
        }
        else
        {
            Element.mouseover( function(aEvent) {
                showTooltipCharChooser( Element, Player, false, null );
                aEvent.stopPropagation();
            });
        }
    });
    
    $("#undecidedList > .clip:first").show();
    updateSlackersBadges(aPlayerList);
}

// -----------------------------------------------------------------------------

function generateRaidSlackers( aXHR )
{
    var PlayerList = $("#raiddetail").data("players");

    var HTMLString = "<div id=\"slackers\">";
    HTMLString += "<div class=\"slackerspanel\"></div>";
    HTMLString += "</div>";

    $("#raiddetail").append(HTMLString);

    HTMLString = PlayerList.generateAbsentList(3);
    $(".slackerspanel:first").append(HTMLString);

    HTMLString = PlayerList.generateUndecidedList(3);
    $(".slackerspanel:first").append(HTMLString);
    
    onUpdateAbsentList(PlayerList);
    onUpdateUndecidedList(PlayerList);

    generateRaidInfo( aXHR, "slackers" );
}

// -----------------------------------------------------------------------------

function generateRaidSettings( aXHR )
{
    var HTMLString = "<div id=\"raidoptions\">";
    HTMLString += "<div class=\"settingspanel\"></div>";
    HTMLString += "</div>";

    $("#raiddetail").append(HTMLString);

    var Panel = $("#raidoptions > .settingspanel:first");

    var RaidImage       = aXHR.image;
    var RaidName        = aXHR.locationname;
    var RaidLocation    = aXHR.locationid;
    var RaidSize        = aXHR.size;
    var RaidComment     = aXHR.description;
    var RaidStatus      = aXHR.stage;
    var RaidMode        = aXHR.mode;
    
    var RaidStartDate   = getDateFromUTCString(aXHR.startDate, aXHR.start);
    var RaidStartHour   = RaidStartDate.getHours();
    var RaidStartMinute = RaidStartDate.getMinutes();

    var RaidEndDate     = getDateFromUTCString(aXHR.endDate, aXHR.end);
    var RaidEndHour     = RaidEndDate.getHours();
    var RaidEndMinute   = RaidEndDate.getMinutes();
    
    $("#raidoptions").data("info", {
        id    : aXHR.raidId,
        year  : RaidStartDate.getFullYear(),
        month : RaidStartDate.getMonth(),
        day   : RaidStartDate.getDate(),
        size  : parseInt(RaidSize, 10)
    });
    
    // Create general Raid settings from the sheet
    
    HTMLString  = "<span style=\"display: inline-block; margin-right: 5px; float: left\" class=\"imagepicker\" id=\"locationimagepicker\"><div class=\"imagelist\" id=\"locationimagelist\"></div></span>";
    HTMLString += "<span style=\"display: inline-block; margin-top: 8px; margin-left: 4px; vertical-align: top\">";
    
    HTMLString += "<div style=\"margin-bottom: 10px\">";
    HTMLString += "<select id=\"selectlocation\" onchange=\"onLocationChange(this)\">";
    HTMLString += "<option value=\"0\">"+L("NewDungeon")+"</option>";
    HTMLString += "</select>";
    
    HTMLString += "<span style=\"display: inline-block; width: 3px;\"></span>";
    HTMLString += "<select id=\"selectsize\" style=\"width: 48px\">";
    
    for (var i=0; i<gConfig.GroupSizes.length; ++i)
    {
        HTMLString += "<option value=\""+gConfig.GroupSizes[i]+"\">"+gConfig.GroupSizes[i]+"</option>";
    }
    
    HTMLString += "</select>";                    
    HTMLString += "</div>";
    
    HTMLString += "<div>";
    HTMLString += "<select id=\"starthour\">";
    HTMLString += "</select>";
    
    HTMLString += "<span style=\"display: inline-block; width: 10px; text-align:center; position: relative; top: -5px\">:</span>";
    HTMLString += "<select id=\"startminute\" style=\"width: 48px\">";
    HTMLString += "<option value=\"0\">00</option>";
    HTMLString += "<option value=\"15\">15</option>";
    HTMLString += "<option value=\"30\">30</option>";
    HTMLString += "<option value=\"45\">45</option>";
    HTMLString += "</select>";
    
    HTMLString += "<span style=\"display: inline-block; width: 20px; text-align:center; position: relative; top: -5px\">"+L("to")+"</span>";
    HTMLString += "<select id=\"endhour\">";
    HTMLString += "</select>";
    
    HTMLString += "<span style=\"display: inline-block; width: 10px; text-align:center; position: relative; top: -5px\">:</span>";
    HTMLString += "<select id=\"endminute\" style=\"width: 48px\">";
    HTMLString += "<option value=\"0\">00</option>";
    HTMLString += "<option value=\"15\">15</option>";
    HTMLString += "<option value=\"30\">30</option>";
    HTMLString += "<option value=\"45\">45</option>";
    HTMLString += "</select>";
    
    HTMLString += "</div>";        
    HTMLString += "</span>";
    
    Panel.append( HTMLString );
    
    // configure Raid settings
    
    HTMLString = "";

    for ( i=4; i>=0; --i )
        HTMLString += "<option value=\"" + i + "\">" + formatHourPrefixed(i) + "</option>";

    for ( i=23; i>4; --i )
        HTMLString += "<option value=\"" + i + "\">" + formatHourPrefixed(i) + "</option>";

    var HourFieldWidth        = (gSite.TimeFormat == 24) ? 48 : 64;
    var LocationFieldWidth    = (gSite.TimeFormat == 24) ? 181 : 213;
    var DescriptionFieldWidth = (gSite.TimeFormat == 24) ? 295 : 327;
    var SheetOverlayWidth     = (gSite.TimeFormat == 24) ? 540 : 570;

    $("#starthour")
        .css("width", HourFieldWidth)
        .empty().append(HTMLString);

    $("#endhour")
        .css("width", HourFieldWidth)
        .empty().append(HTMLString);

    $("#selectlocation")
        .css("width", LocationFieldWidth);

    $("#descriptiondummy")
        .css({ "width": DescriptionFieldWidth, "max-width": DescriptionFieldWidth });

    $("#description")
        .css({ "width": DescriptionFieldWidth, "max-width": DescriptionFieldWidth });

    $("#selectsize").change( validateRoleCounts );

    // Generate location image list

    HTMLString = "";
    var NumImages = 1;
    var ImageList = [];

    $.each(aXHR.locationimage, function(index, value) {
        if ( NumImages % 11 === 0 )
        {
            HTMLString += "<br/>";
            ++NumImages;
        }

        HTMLString += "<img class=\"clickable\" src=\"images/raidsmall/" + value + "\" onclick=\"applyLocationImage(this, true)\" style=\"width:32px; height:32px; margin-right:5px;\"/>";
        ++NumImages;
    });

    $("#locationimagelist").append(HTMLString);
    $("#locationimagepicker").css("background-image", "url(images/raidbig/"+RaidImage+")");

    // Build location chooser

    $.each(aXHR.location, function(index, value) {
        ImageList[index] = value.image;

        var Selected = (value.id == RaidLocation) ? " selected" : "";
        $("#selectlocation").append("<option value=\"" + value.id + "\""+Selected+">" + value.name + "</option>");
    });

    // Add remainig settings

    HTMLString  = "<br/><div style=\"float:left; margin-top: 15px\">";
    HTMLString += "<div><div class=\"settingLabel\">"+L("Comment")+"</div>";
    HTMLString += "<div class=\"settingField\"><textarea id=\"comment\" class=\"settingEdit\" style=\"width:235px; height:64px\">"+RaidComment.replace(/<\/br>/g,"\n")+"</textarea></div></div>";

    HTMLString += "<div><div class=\"settingLabel\">"+L("RaidStatus")+"</div>";
    HTMLString += "<div class=\"settingField\"><select id=\"raidstage\" style=\"width: 190px\">";
    HTMLString += "<option value=\"open\""+((RaidStatus=="open") ? " selected" : "")+">"+L("RaidOpen")+"</option>";
    HTMLString += "<option value=\"locked\""+((RaidStatus=="locked") ? " selected" : "")+">"+L("RaidLocked")+"</option>";
    HTMLString += "<option value=\"canceled\""+((RaidStatus=="canceled") ? " selected" : "")+">"+L("RaidCanceled")+"</option>";
    HTMLString += "</select></div></div>";

    HTMLString += "<div><div class=\"settingLabel\">"+L("RaidSetupStyle")+"</div>";
    HTMLString += "<div class=\"settingField\"><select id=\"raidmode\" style=\"width: 190px\">";
    HTMLString += "<option value=\"manual\""+((RaidMode=="manual") ? " selected" : "")+">"+L("RaidModeManual")+"</option>";
    HTMLString += "<option value=\"overbook\""+((RaidMode=="overbook") ? " selected" : "")+">"+L("RaidModeOverbook")+"</option>";
    HTMLString += "<option value=\"attend\""+((RaidMode=="attend") ? " selected" : "")+">"+L("RaidModeAttend")+"</option>";
    HTMLString += "<option value=\"all\""+((RaidMode=="all") ? " selected" : "")+">"+L("RaidModeAll")+"</option>";
    HTMLString += "</select></div></div>";

    $.each(aXHR.slots, function(index, value) {
        if ( index < gConfig.RoleIdents.length )
        {
            HTMLString += "<div><div class=\"settingLabel\">"+L("RequiredForRole")+" \""+gConfig.RoleNames[gConfig.RoleIdents[index]]+"\"</div>";
            HTMLString += "<div class=\"settingField\"><input id=\"slotCount"+index+"\" class=\"settingEdit\" style=\"width:24px;\" value=\""+value+"\" type=\"text\"/></div></div>";
        }
    });

    HTMLString += "<div><div class=\"settingLabel\">&nbsp;</div>";
    HTMLString += "<div class=\"settingField\"><button id=\"deleteRaid\">&nbsp;"+L("DeleteRaid")+"</button></div></div>";


    HTMLString += "</div>";
    Panel.append( HTMLString );

    $("#raidstage").combobox();
    $("#raidmode").combobox();

    // Select/set values for current Raid

    $("#selectsize > option").each( function() {
        if ($(this).val() == RaidSize)
            $(this).attr("selected", "selected");
    });

    $("#starthour > option").each( function() {
        if ($(this).val() == RaidStartHour)
            $(this).attr("selected", "selected");
    });

    $("#startminute > option").each( function() {
        if ($(this).val() == RaidStartMinute)
            $(this).attr("selected", "selected");
    });

    $("#endhour > option").each( function() {
        if ($(this).val() == RaidEndHour)
            $(this).attr("selected", "selected");
    });

    $("#endminute > option").each( function() {
        if ($(this).val() == RaidEndMinute)
            $(this).attr("selected", "selected");
    });

    // Setup copied UI

    $("#selectlocation").combobox({ editable: false });
    $("#selectsize").combobox();
    $("#starthour").combobox();
    $("#startminute").combobox();
    $("#endhour").combobox();
    $("#endminute").combobox();
    $("#deleteRaid").button({ icons: { primary: "ui-icon-circle-close" }})
        .click( function() { triggerRaidDelete(); } )
        .css( "font-size", 11 );

    // Event binding

    $("#locationimagepicker")
        .data("imageNames", ImageList )
        .data( "selectedImage", RaidImage );        
        
    $("#selectlocation").change( function() {        
        $("#locationimagepicker").unbind("click");        
        if ( $("#selectlocation").context.selectedIndex > 0 )
        {
            $("#locationimagepicker").click( function(aEvent) {
                showTooltipRaidImageList();
                aEvent.stopPropagation();
            });
        }
    });
        
    // Data change bindings
    
    $("#raidoptions select").change( onUIDataChange );
    $("#raidoptions textarea").change( onUIDataChange );
    
    $.each(aXHR.slots, function(index, value) {
        $("#slotCount"+index).change( function() {
            validateRoleCounts();
            onUIDataChange();
        });
    });
}

// -----------------------------------------------------------------------------

function generateRaid( aXHR )
{
    hideTooltip();
    closeSheet();

    if ( gUser == null )
        return;

    var PlayerList = new CRaidMemberList();
    var HTMLString = "<div id=\"raiddetail\">";

    HTMLString += "<div id=\"tablist\" class=\"tabs setup\">";
    HTMLString += "<div style=\"margin-top: 16px\">";
    HTMLString += "<div id=\"setuptoggle\" class=\"tab_icon icon_setup\"></div>";
    HTMLString += "<div id=\"slackerstoggle\" class=\"tab_icon icon_slackers_off\"><div id=\"slackers_badge\"></div></div>";

    if ( gUser.isRaidlead)
    {
        HTMLString += "<div id=\"settingstoggle\" class=\"tab_icon icon_settings_off\"></div>";
    }

    HTMLString += "</div></div>";
    
    if ( gUser.isRaidlead )
        HTMLString += "<button id=\"applyButton\" class=\"apply_changes\" disabled=\"disabled\">" + L("Apply") + "</button>";
    HTMLString += "</div>";

    $("#body").empty().append(HTMLString);

    $("#raiddetail").hide();

    var RaidId  = aXHR.raidId;

    PlayerList.mStage = aXHR.stage;
    PlayerList.mMode  = aXHR.mode;

    $("#raiddetail").data("players",PlayerList);
    $.each(aXHR.attendee, function(index, value) {
        PlayerList.addPlayer(value);
    });

    generateRaidSetup( aXHR );
    generateRaidSlackers( aXHR );

    if ( gUser.isRaidlead)
    {
        generateRaidSettings( aXHR );
    }

    // Setup toplevel UI

    $("#setuptoggle").click( function() {
        changeContext( "raid,setup,"+RaidId );
    });

    $("#slackerstoggle").click( function() {
        changeContext( "raid,slackers,"+RaidId );
    });

    if ( gUser.isRaidlead)
    {
        $("#settingstoggle").click( function() {
            changeContext( "raid,settings,"+RaidId );
        });

        $("#applyButton").button({ icons: { secondary: "ui-icon-disk" }})
            .click( function() { triggerRaidUpdate(); } )
            .css( "font-size", 11 );
    }

    loadRaidPanel( aXHR.show, RaidId );

    $("#raiddetail").show();
}

// -----------------------------------------------------------------------------

function showRaidPanel( aPanel, aSection )
{
    $("#raidsetup").hide();
    $("#slackers").hide();
    $("#raidoptions").hide();

    $("#tablist").removeClass("setup");
    $("#tablist").removeClass("slackers");
    $("#tablist").removeClass("settings");

    $("#setuptoggle").removeClass("icon_setup");
    $("#slackerstoggle").removeClass("icon_slackers");
    $("#settingstoggle").removeClass("icon_settings");

    $("#setuptoggle").addClass("icon_setup_off");
    $("#slackerstoggle").addClass("icon_slackers_off");
    $("#settingstoggle").addClass("icon_settings_off");

    $(aPanel).show();
    $("#tablist").addClass(aSection);
    $("#"+aSection+"toggle").removeClass("icon_"+aSection+"_off");
    $("#"+aSection+"toggle").addClass("icon_"+aSection);

    $("#raidoptions").data("activesection", aSection );
}

// -----------------------------------------------------------------------------
//  Callbacks
// -----------------------------------------------------------------------------

function loadRaid( aRaidId, aPanelName )
{
    reloadUser();

    if ( gUser == null )
        return;

    $("#body").empty();

    var Parameters = {
        id         : aRaidId,
        showPanel  : aPanelName
    };

    asyncQuery( "raid_detail", Parameters, generateRaid );

}

// -----------------------------------------------------------------------------

function loadRaidPanel( aName, aRaidId )
{
    if ( gUser == null )
        return;

    if ( $("#raiddetail").length === 0 )
    {
        loadRaid( aRaidId, aName );
    }
    else
    {
        switch( aName )
        {
        default:
        case "setup":
            showRaidPanel("#raidsetup", "setup");
            break;

        case "slackers":
            showRaidPanel("#slackers", "slackers");
            break;

        case "settings":
            showRaidPanel("#raidoptions", "settings");
            break;
        }
    }
}

// -----------------------------------------------------------------------------
//  Triggers
// -----------------------------------------------------------------------------

function triggerRaidDelete()
{
    if ( (gUser == null) || !gUser.isRaidlead )
        return;

    confirm( L("ConfirmRaidDelete"), L("DeleteRaid"), L("Cancel"),
        function() {
            var Parameters = {
                id : $("#raidoptions").data("info").id
            };
            
            onAppliedUIDataChange();
            asyncQuery( "raid_delete", Parameters, generateCalendar );            
        });
}

// -----------------------------------------------------------------------------

function triggerRaidUpdate()
{
    if ( (gUser == null) || !gUser.isRaidlead )
        return;

    var PlayerList = $("#raiddetail").data("players");
    var RaidInfo   = $("#raidoptions").data("info");
    var SlotCount  = new Array(0,0,0,0,0);

    var Role1players = [];
    var Role2players = [];
    var Role3players = [];
    var Role4players = [];
    var Role5players = [];

    var ActivePanel = "setup";
    if ( $("#slackers").css("display") )

    // Build the slot count array

    for ( var i=0; i<gConfig.RoleIdents.length; ++i )
    {
        var CountField = $("#slotCount"+i);
        if ( CountField != null )
            SlotCount[i] = CountField.val();
    }

    // Generate arrays with playerId per role

    PlayerList.getModifiedPlayersForRole(0, Role1players);
    PlayerList.getModifiedPlayersForRole(1, Role2players);
    PlayerList.getModifiedPlayersForRole(2, Role3players);
    PlayerList.getModifiedPlayersForRole(3, Role4players);
    PlayerList.getModifiedPlayersForRole(4, Role5players); 
    
    var startDate = new Date( RaidInfo.year, RaidInfo.month, RaidInfo.day, $("#starthour").val(), $("#startminute").val(), 0 );
    var endDate   = new Date( RaidInfo.year, RaidInfo.month, RaidInfo.day, $("#endhour").val(), $("#endminute").val(), 0 );
    
    if ( startDate.getHours() > endDate.getHours() )
    {
        endDate.setTime( endDate.getTime() + 1000 * 60 * 60 * 24 );
        endDate.setHours( $("#endhour").val() ); // because crossing DST "breaks" the hour
    }

    // Build parameter set

    var Parameters = {
        id           : RaidInfo.id,
        raidImage    : $("#locationimagepicker").data("selectedImage"),
        locationId   : $("#selectlocation").val(),
        locationSize : $("#selectsize").val(),
        locationName : $("#edit_selectlocation").val(),
        startYear    : startDate.getFullYear(),
        startMonth   : startDate.getMonth()+1,
        startDay     : startDate.getDate(),
        startHour    : startDate.getHours(),
        startMinute  : startDate.getMinutes(),
        startOffset  : startDate.getTimezoneOffset(),
        endYear      : endDate.getFullYear(),
        endMonth     : endDate.getMonth()+1,
        endDay       : endDate.getDate(),
        endHour      : endDate.getHours(),
        endMinute    : endDate.getMinutes(),
        endOffset    : endDate.getTimezoneOffset(),
        description  : $("#comment").val(),
        mode         : $("#raidmode option:selected").val(),
        stage        : $("#raidstage option:selected").val(),

        slotsRole    : SlotCount,
        role1        : Role1players,
        role2        : Role2players,
        role3        : Role3players,
        role4        : Role4players,
        role5        : Role5players,
        removed      : PlayerList.mRemovedPlayers,
        showPanel    : $("#raidoptions").data("activesection")
    };

    onAppliedUIDataChange();
    asyncQuery( "raid_update", Parameters, generateRaid );
}