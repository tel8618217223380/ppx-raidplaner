var g_NewCharIndex = 0;

function CCharacterList()
{
    this.mCharacters = Array();

    // -------------------------------------------------------------------------

    this.addCharacter = function( aId, aName, aClass, aIsMain, aRole1, aRole2 )
    {
        var charData = {
            id        : aId,
            name      : aName,
            charClass : aClass,
            mainChar  : aIsMain,
            role1     : aRole1,
            role2     : aRole2
        };

        if ( aIsMain )
        {
            // new main char, disable all others
            this.toggleMainChar( this.mCharacters.length );
        }

        this.mCharacters.push(charData);
    };

    // -------------------------------------------------------------------------

    this.addNewCharacter = function()
    {
        this.addCharacter( 0, "", new Array("empty"), this.mCharacters.length === 0, -1, -1 );
    };

    // -------------------------------------------------------------------------

    this.toggleMainChar = function( aIdx )
    {
        for ( var i=0; i<this.mCharacters.length; ++i )
        {
            this.mCharacters[i].mainChar = (i == aIdx);
        }
    };

    // -------------------------------------------------------------------------

    this.removeCharacter = function( aIdx )
    {
        this.mCharacters.splice(aIdx,1);
        this.rebuildSlots();
    };

    // -------------------------------------------------------------------------

    this.generateSlots = function( aIndex, aGrpIdx, aMaxSlots )
    {
        var HTMLString = "";
        var CharIdx = aIndex;

        for ( var i=0; (CharIdx < this.mCharacters.length) && (i < aMaxSlots); ++i )
        {
            var CurrentChar = this.mCharacters[CharIdx];

            if ( (i===0) && (CharIdx !== 0) )
            {
                // prev group slot

                var PrevGroupId = aGrpIdx - 1;

                HTMLString += "<span class=\"nextgroup\" id=\"next" + PrevGroupId + "\"></span>";
            }

            else
            {
                // character slot

                HTMLString += "<span class=\"charslot\" id=\"char" + CharIdx + "\">";

                HTMLString += "<div class=\"clearchar\"></div>";
                HTMLString += "<div class=\"class\" style=\"background: url(images/icons/"+gSite.Iconset+"/classesbig/" + CurrentChar.charClass[0] + ".png)\">";

                if ( CurrentChar.mainChar )
                    HTMLString += "<div class=\"badge mainchar\"></div>";
                else
                    HTMLString += "<div class=\"badge twink\"></div>";

                HTMLString += "</div>";

                if ( CurrentChar.id === 0 )
                {
                    HTMLString += "<div class=\"newname_label\">"+L("CharName")+"</div>";
                    HTMLString += "<input type=\"text\" class=\"newname\" value=\"" + CurrentChar.name + "\"/>";
                }
                else
                {
                    HTMLString += "<div class=\"name\">" + CurrentChar.name + "</div>";
                }

                HTMLString += "<div class=\"role_group\" style=\"position: relative; left: 24px; top: 10px\">";

                if ( CurrentChar.charClass[0] == "empty" )
                {
                    HTMLString += "<div class=\"role newrole1\" style=\"background-image:url(images/icons/"+gSite.Iconset+"/classessmall/empty.png)\"><div class=\"mainrole\"></div></div>";
                    HTMLString += "<div class=\"role newrole2\" style=\"background-image:url(images/icons/"+gSite.Iconset+"/classessmall/empty.png); left: 10px\"></div>";
                }

                else
                {
                    HTMLString += "<div class=\"role newrole1\" style=\"background-image:url(images/icons/"+gSite.Iconset+"/roles/" + gConfig.RoleIdents[CurrentChar.role1] + ".png)\"><div class=\"mainrole\"></div></div>";
                    HTMLString += "<div class=\"role newrole2\" style=\"background-image:url(images/icons/"+gSite.Iconset+"/roles/" + gConfig.RoleIdents[CurrentChar.role2] + ".png); left: 10px\"></div>";
                }

                HTMLString += "</div>";
                HTMLString += "</span>";

                ++CharIdx;
            }
        }

        if (CharIdx == this.mCharacters.length)
        {
            // New char button
            HTMLString += "<span class=\"newchar\"></span>";
        }

        else
        {

            // next group slot
            var NextGroupId = aGrpIdx + 1;

            HTMLString += "<span class=\"nextgroup\" id=\"next" + NextGroupId + "\"></span>";
        }

        return {
            HTMLString : HTMLString,
            charIdx    : CharIdx
        };
    };

    // -------------------------------------------------------------------------

    this.rebuildSlots = function()

    {
        var SlotsPerGroup = 6;
        var HTMLString = "";

        var VisibleGroup = $("#charlist > .charGroup:visible");
        var ShowGrpIdx = (VisibleGroup.length === 0) ? 0 : parseInt( VisibleGroup.attr("id").substr(3), 10 );
        var CharIdx = 0;

        if ( this.mCharacters.length === 0 )
        {
            HTMLString += "<div id=\"grp0\" class=\"charGroup\">";
            HTMLString += "<span class=\"newchar\"></span>";
            HTMLString += "</div>";
        }
        else
        {
            for ( var GrpIdx=0; CharIdx < this.mCharacters.length; ++GrpIdx )
            {
                var Generated = this.generateSlots( CharIdx, GrpIdx, SlotsPerGroup );

                HTMLString += "<div id=\"grp" + GrpIdx + "\" class=\"charGroup\">";
                HTMLString += Generated.HTMLString;
                HTMLString += "</div>";

                CharIdx = Generated.charIdx;
            }
        }

        $("#charlist").empty().append(HTMLString);

        var Groups = $("#charlist > .charGroup");
        var CharList = this;

        // Show currently active group

        ShowGrpIdx = Math.min(ShowGrpIdx, Groups.length-1);

        Groups.hide();
        Groups.eq(ShowGrpIdx).show();

        // Bind events

        Groups.each( function() {

            // add a new character

            $(this).children(".newchar").click( function( aEvent ) {
                CharList.addNewCharacter();
                CharList.rebuildSlots();
                aEvent.stopPropagation();

                onUIDataChange();
            });

            // show next group

            $(this).children(".nextgroup").click( function( aEvent ) {
                var nextGrpIdx = parseInt($(this).attr("id").substr(4), 10);
                Groups.hide();
                Groups.eq(nextGrpIdx).show();
                hideTooltip();
                aEvent.stopPropagation();
            });

            $(this).children(".charslot").each( function() {

                var CharIdx = parseInt( $(this).attr("id").substr(4), 10 );
                var IsNew = CharList.mCharacters[CharIdx].id === 0;

                // Main char switcher

                $(".class:first > .badge:first", this).click( function( aEvent ) {

                    CharList.toggleMainChar( CharIdx );

                    $(".charslot > .class > .badge", Groups)
                        .removeClass("mainchar")
                        .removeClass("twink")
                        .addClass("twink");

                    $(this)
                        .removeClass("twink")
                        .addClass("mainchar");

                    aEvent.stopPropagation();

                    onUIDataChange();
                });

                // Role1 switcher

                $("div > .newrole1", this).click( function( aEvent ) {

                    showTooltipRoleList( $(this), true );

                    aEvent.stopPropagation();
                });

                // Role2 switcher

                $("div > .newrole2", this).click( function( aEvent ) {

                    showTooltipRoleList( $(this), false );

                    aEvent.stopPropagation();
                });

                // Class switcher (only for new characters)
                // Name changer (only for new characters)

                if ( IsNew )
                {
                    $(this).children(".class")
                        .addClass("newclass")
                        .click( function( aEvent ) {

                            showTooltipClassList( $(this) );

                            aEvent.stopPropagation();

                        });

                    var NameInputField = $(this).children(".newname:first");
                    var NameLabelField = $(this).children(".newname_label:first");

                    if ( NameInputField.val() !== "" )
                    {
                        NameInputField.show();
                        NameLabelField.hide();
                    }

                    NameLabelField.click( function() {

                        NameLabelField.hide();
                        NameInputField.show().focus();
                    });

                    NameInputField.blur( function() {
                        if ($(this).val() === "")
                        {
                            NameInputField.hide();
                            NameLabelField.show();
                        }
                    });

                    NameInputField.change( function() {
                        CharList.mCharacters[CharIdx].name = $(this).val();
                    });
                }

                // Remove char

                $(this).children(".clearchar").click( function() {
                    if ( IsNew )
                    {
                        CharList.removeCharacter( CharIdx );
                    }
                    else
                    {
                        confirm( L("ConfirmDeleteCharacter") + "<br>" + L("AttendancesRemoved"),
                                 L("DeleteCharacter"), L("Cancel"),
                                 function() {

                                    CharList.removeCharacter( CharIdx );

                                    onUIDataChange();
                                 });
                    }

                });

            });
        });
    };
}

// -----------------------------------------------------------------------------

function setupCharacters( aXHR )
{
    var CharList = $("#charlist").data("characters");

    $.each( aXHR.character, function(index, value) {

        CharList.addCharacter(
            value.id,
            value.name,
            value.classname,
            value.mainchar,
            value.role1,
            value.role2
        );
    });

    CharList.rebuildSlots();
}

// -----------------------------------------------------------------------------

function generateUserAttendance( aXHR )
{
    // Static attend values

    var NumRaids   = aXHR.attendance.raids;
    var NumOk      = aXHR.attendance.ok;
    var NumAvail   = aXHR.attendance.available;
    var NumUnavail = aXHR.attendance.unavailable;
    var NumMissed  = NumRaids - (NumOk + NumAvail + NumUnavail);

    var BarSize  = 720;

    var SizeOk      = (NumOk / NumRaids) * BarSize;
    var SizeAvail   = (NumAvail / NumRaids) * BarSize;
    var SizeUnavail = (NumUnavail / NumRaids) * BarSize;
    var SizeMissed  = (NumMissed / NumRaids) * BarSize;

    // Role attend values

    var RoleAttends = [];
    var RoleBarSizes = [];
    var NumRoleAttends = 0;

    for ( var i=0; i<gConfig.RoleIdents.length; ++i )
    {
       RoleAttends[i]  = aXHR.attendance[gConfig.RoleIdents[i]];
       RoleBarSizes[i] = (RoleAttends[i] / NumOk) * BarSize;
       NumRoleAttends += RoleAttends[i];
    }

    // generate bars

    HTMLString = "<div class=\"attendanceCount\" style=\"" + BarSize + "px\"><span class=\"start\"></span>";

    if (NumOk > 0)      HTMLString += "<span class=\"ok\" style=\"width: " + SizeOk.toFixed() + "px\"><div class=\"count\">" + NumOk + "</div></span>";
    if (NumAvail > 0)   HTMLString += "<span class=\"available\" style=\"width: " + SizeAvail.toFixed() + "px\"><div class=\"count\">" + NumAvail + "</div></span>";
    if (NumUnavail > 0) HTMLString += "<span class=\"unavailable\" style=\"width: " + SizeUnavail.toFixed() + "px\"><div class=\"count\">" + NumUnavail + "</div></span>";
    if (NumMissed > 0)  HTMLString += "<span class=\"missed\" style=\"width: " + SizeMissed.toFixed() + "px\"><div class=\"count\">" + NumMissed + "</div></span>";
    if (NumRaids === 0)  HTMLString += "<span class=\"missed\" style=\"width: " + BarSize + "px\"><div class=\"count\">&nbsp;</div></span>";

    HTMLString += "<span class=\"end\"></span></div>";
    HTMLString += "<div class=\"label\">" + L("RaidAttendance") + "</div>";
    HTMLString += "<div class=\"attendanceType\" style=\"" + BarSize + "px\"><span class=\"start\"></span>";

    if (NumRoleAttends === 0)
    {
       HTMLString += "<span class=\"missed\" style=\"width: " + BarSize + "px\"><div class=\"count\">&nbsp;</div></span>";
    }
    else
    {
        for ( i=0; i<gConfig.RoleIdents.length; ++i )
        {
           if ( RoleAttends[i] > 0 )
               HTMLString += "<span class=\"role"+(i+1)+"\" style=\"width: " + RoleBarSizes[i].toFixed() + "px\"><div class=\"count\">" + RoleAttends[i] + "</div></span>";
        }
    }

    HTMLString += "<span class=\"end\"></span></div>";

    // Print static labels

    HTMLString += "<div class=\"label\">" + L("RolesInRaids") + "</div>";

    HTMLString += "<div class=\"labels\">";

    HTMLString += "<div>";
    HTMLString += "<div class=\"box ok\"><span class=\"start\"></span><span class=\"end\"></span></div>";
    HTMLString += "<div class=\"label\">" + NumOk + "x " + L("Attended") + "</div>";

    HTMLString += "<div class=\"box available\"><span class=\"start\"></span><span class=\"end\"></span></div>";
    HTMLString += "<div class=\"label\">" + NumAvail + "x " + L("Queued") + "</div>";

    HTMLString += "<div class=\"box unavailable\"><span class=\"start\"></span><span class=\"end\"></span></div>";
    HTMLString += "<div class=\"label\">" + NumUnavail + "x " + L("Absent") + "</div>";

    HTMLString += "<div class=\"box missed\"><span class=\"start\"></span><span class=\"end\"></span></div>";
    HTMLString += "<div class=\"label\">" + NumMissed + "x " + L("Missed") + "</div>";
    HTMLString += "</div>";

    // Print Role labels

    HTMLString += "<div style=\"clear: left; padding-top: 5px\">";

    for ( i=0; i<gConfig.RoleIdents.length; ++i )
    {
       HTMLString += "<span>";
       HTMLString += "<div class=\"box role"+(i+1)+"\"><span class=\"start\"></span><span class=\"end\"></span></div>";
       HTMLString += "<div class=\"label\">" + RoleAttends[i] + "x " + gConfig.RoleNames[gConfig.RoleIdents[i]] + "</div>";
       HTMLString += "</span>";
    }

    HTMLString += "</div>";
    HTMLString += "</div>";

    $("#attendance").empty().append(HTMLString);
}

// -----------------------------------------------------------------------------

function showProfilePanel( aShowBox, aSection )
{
    $("#characters").hide();
    $("#profilesettings").hide();

    $("#tablist").removeClass("characters");
    $("#tablist").removeClass("settings");

    $("#characterstoggle").removeClass("icon_characters");
    $("#settingstoggle").removeClass("icon_settings");

    $("#characterstoggle").addClass("icon_characters_off");
    $("#settingstoggle").addClass("icon_settings_off");

    $(aShowBox).show();
    $("#tablist").addClass(aSection);
    $("#"+aSection+"toggle").removeClass("icon_"+aSection+"_off");
    $("#"+aSection+"toggle").addClass("icon_"+aSection);

    if ( (aSection == "about") || (aSection == "stats") )
        $("#applyButton").hide();
    else
        $("#applyButton").show();
}

// -----------------------------------------------------------------------------

function generateProfile( aXHR )
{
    if ( aXHR.error != null )
        return false;

    if ( aXHR.name == null )
    {
        var HTMLString = "<div id=\"lockMessage\">";
        HTMLString += L("UserNotFound");
        HTMLString += "</div>";

        $("#body").empty().append(HTMLString);
        return;
    }

    var HTMLString = "<div id=\"profile\">";

    HTMLString += "<h1>" + L("Profile") + "</h1>";

    HTMLString += "<div id=\"tablist\" class=\"tabs characters\">";
    HTMLString += "<div style=\"margin-top: 16px\">";
    HTMLString += "<div id=\"characterstoggle\" class=\"tab_icon icon_characters\"></div>";
    HTMLString += "<div id=\"settingstoggle\" class=\"tab_icon icon_settings_off\"></div>";
    HTMLString += "</div></div>";
    HTMLString += "<button id=\"applyButton\" class=\"apply_changes\" disabled=\"disabled\">" + L("Apply") + "</button>";

    $("#body").empty().append(HTMLString);

    $("#profile").data("userid", aXHR.userid);
    $("#profile").hide();

    generateProfileCharacters(aXHR);
    generateProfileSettings(aXHR);

    $("#characterstoggle").click( function() {
        if (aXHR.userid == gUser.id)
            changeContext( "profile,characters" );
        else
            changeContext( "profile,characters,"+aXHR.userid );
    });

    $("#settingstoggle").click( function() {
        if (aXHR.userid == gUser.id)
            changeContext( "profile,settings" );
        else
            changeContext( "profile,settings,"+aXHR.userid );
    });

    $("#applyButton").button({ icons: { secondary: "ui-icon-disk" }})
        .click( function() { triggerProfileUpdate(aXHR.userid); } )
        .css( "font-size", 11 );

    loadProfilePanel( aXHR.show, aXHR.userid );

    $("#profile").show();
}

// -----------------------------------------------------------------------------

function generateProfileCharacters( aXHR )
{
    HTMLString = "<div id=\"characters\">";

    /*if ( !aXHR.bindingActive || (aXHR.binding == "none") )
    {
        HTMLString += "<button id=\"profile_password\" class=\"button_profile\" type=\"button\">" + L("ChangePassword") + "</button>";
    }*/

    HTMLString += "<h2>" + L("Characters") + "</h2>";
    HTMLString += "<div id=\"charlist\"></div>";

    HTMLString += "<h2 style=\"margin-top: 20px; margin-bottom: 4px\">" + L("RaidAttendance") + "</h2>";
    HTMLString += "<div id=\"attendance\"></div>";
    HTMLString += "</div>";

    $("#profile").append(HTMLString);

    $("#charlist").data("characters", new CCharacterList() );

    setupCharacters( aXHR );
    generateUserAttendance( aXHR );
}

// -----------------------------------------------------------------------------

function generateProfileSettings(aXHR)
{
    HTMLString = "<div id=\"profilesettings\">";

    // Password

    var passChangeDisabled = ((aXHR.binding != "none") && aXHR.bindingActive);
    var oldPassState = (passChangeDisabled) ? " disabled=\"disabled\"" : "";
    var passLabelClass = (passChangeDisabled) ? "settinglabel labeldisabled" : "settinglabel";

    HTMLString += "<div><div class=\""+passLabelClass+"\">"+((gUser.isAdmin && (gUser.id != aXHR.userid)) ? L("AdminPassword") : L("OldPassword"))+"</div>";
    HTMLString += "<div class=\"settingfield\"><input type=\"password\" id=\"pass_old\""+oldPassState+"/></div></div>";

    HTMLString += "<div style=\"margin-top:5px\"><div class=\""+passLabelClass+"\">"+L("Password")+"</div>";
    HTMLString += "<div class=\"settingfield\"><input type=\"password\" id=\"pass_new\" disabled=\"disabled\"/></div></div>";

    HTMLString += "<div><div class=\""+passLabelClass+"\"></div><div class=\"settingfield\">";
    HTMLString += "<div id=\"profile_strprogress\"><span class=\"pglabel\">"+L("PassStrength")+"</span><span id=\"strength\"></span></div>";
    HTMLString += "</div></div>";

    HTMLString += "<div style=\"margin-top:2px\"><div class=\""+passLabelClass+"\">"+L("RepeatPassword")+"</div>";
    HTMLString += "<div class=\"settingfield\"><input type=\"password\" id=\"pass_repeat\" disabled=\"disabled\"/></div></div>";

    // Vacation

    HTMLString += "<div style=\"margin-top:15px\"><div class=\"settinglabel\">"+L("VacationStart")+"</div>";
    HTMLString += "<div class=\"settingfield\">";
    HTMLString += "<div class=\"datepicker ui-icon-calendar\"><input type=\"text\" class=\"datepicker_field\" id=\"vacation_start\"/></div>";
    HTMLString += "</div></div>";

    HTMLString += "<div><div class=\"settinglabel\">"+L("VacationEnd")+"</div>";
    HTMLString += "<div class=\"settingfield\">";
    HTMLString += "<div class=\"datepicker ui-icon-calendar\"><input type=\"text\" class=\"datepicker_field\" id=\"vacation_end\"/></div>";
    HTMLString += "</div></div>";

    HTMLString += "<div><div class=\"settinglabel\">"+L("VacationMessage")+"</div>";
    HTMLString += "<div class=\"settingfield\">";
    HTMLString += "<textarea id=\"vacationMessage\">"+((aXHR.settings.VacationMessage == undefined) ? "" : aXHR.settings.VacationMessage.text)+"</textarea>";
    HTMLString += "</div></div>";

    HTMLString += "<div><div class=\"settinglabel\"></div>";
    HTMLString += "<div class=\"settingfield\">";
    HTMLString += "<button id=\"vacationClear\">"+L("ClearVacation")+"</button>";
    HTMLString += "</div></div>";

    HTMLString += "</div>";

    $("#profile").append(HTMLString);

    $("#pass_old").keyup( function() {
        var testIsEmpty = $("#pass_old").val().length == 0;

        $("#pass_new").prop("disabled", testIsEmpty);
        $("#pass_repeat").prop("disabled", testIsEmpty);
        onUIDataChange();
    });

    $("#pass_new").keyup( function() {
        var strength = getPasswordStrength( $("#pass_new").val() );
        var width = parseInt(strength.quality*100, 10);

        $("#strength").css({ "background-color": strength.color, "width": width+"%" });
    });

    var dayNames = [L("Sun"), L("Mon"), L("Tue"), L("Wed"), L("Thu"), L("Fri"), L("Sat")];
    var monthNames = [L("January"), L("February"), L("March"), L("April"), L("May"), L("June"), L("July"), L("August"), L("September"), L("October"), L("November"), L("December")];

    var dateFormatString = (gSite.TimeFormat == 24) ? "d. MM yy" : "MM d, yy";

    $("#vacation_start").parent().click(function(aEvent) {
        $("#vacation_start").focus();
    });

    $("#vacation_end").parent().click(function(aEvent) {
        $("#vacation_end").focus();
    });

    $("#vacationMessage").change(function(aEvent) {
        onUIDataChange();
    });

    $("#vacationClear").button({ icons: { primary: "ui-icon-circle-close" }})
        .click( function() {

            $("#vacation_start").datepicker("setDate",null);
            $("#vacation_end").datepicker("setDate",null);
            $("#vacationMessage").val("");
            onUIDataChange();
        })
        .css( "font-size", 11 );

    $("#vacation_start").datepicker({
        dayNamesShort: dayNames,
        dayNamesMin  : dayNames,
        monthNames   : monthNames,
        dateFormat   : dateFormatString,
        firstDay     : gSite.StartOfWeek,
        minDate      : "today",
        onClose      : function( selectedDate ) {
            if (selectedDate != "")
            {
                $("#vacation_end").datepicker( "option", "minDate", selectedDate );
                onUIDataChange();
            }
        }
    });

    $("#vacation_end").datepicker({
        dayNamesShort: dayNames,
        dayNamesMin  : dayNames,
        monthNames   : monthNames,
        dateFormat   : dateFormatString,
        firstDay     : gSite.StartOfWeek,
        minDate      : "today",
        onClose      : function( selectedDate ) {
            if (selectedDate != "")
            {
                $("#vacation_start").datepicker( "option", "maxDate", selectedDate );
                onUIDataChange();
            }
        }
    });

    if (aXHR.settings.VacationStart != undefined)
        $("#vacation_start").datepicker("setDate", new Date(aXHR.settings.VacationStart.number * 1000));

    if (aXHR.settings.VacationEnd != undefined)
        $("#vacation_end").datepicker("setDate", new Date(aXHR.settings.VacationEnd.number * 1000));
}

// -----------------------------------------------------------------------------

function triggerProfileUpdate( aUserId )
{
    if ( gUser == null )
        return;

    // Check characters

    var CharList = $("#charlist").data("characters");

    for ( var i=0; i<CharList.mCharacters.length; ++i )
    {
        var CharData = CharList.mCharacters[i];

        if ( CharData.id === 0 )
        {
            if ( CharData.charClass[0] == "empty" )
            {
                notify( L("Error") + ".<br>" + L("NoClass") );
                return;
            }

            if ( CharData.name.length === 0 )
            {
                notify( L("Error") + ".<br>" + L("NoName") );
                return;
            }
        }
    }

    // Check vacation

    if ( ($("#vacation_end").datepicker("getDate") != null) && ($("#vacation_start").datepicker("getDate") == null) )
    {
        notify(L("NoStartDate"));
        return;
    }

    if ( ($("#vacation_start").datepicker("getDate") != null) && ($("#vacation_end").datepicker("getDate") == null) )
    {
        notify(L("NoEndDate"));
        return;
    }

    // Trigger safe pasword change or direct update

    if ( $("#pass_old").val().length > 0 )
    {
        if ( $("#pass_new").val() === "" )

        {
            notify(L("EnterNonEmptyPassword"));
        }
        else if ( $("#pass_new").val() != $("#pass_repeat").val() )

        {
            notify(L("PasswordsNotMatch"));
        }
        else
        {
            var Parameters = {
                UserId : gUser.id
            };

            asyncQuery( "query_credentials_id", Parameters, triggerHashPassword );
        }
    }
    else
    {
        triggerProfileUpdateData(aUserId, "");
    }
}

// -----------------------------------------------------------------------------

function updateNewPasswordProgress( aProgress )
{
    if ( aProgress == 100 )
    {
        $("#profile_hashing").remove();
    }
    else
    {
        if ( $("#profile_hashing").length === 0 )
        {
            var offsetRight = $("#applyButton").width() + 16;
            $("#applyButton").before("<div id=\"profile_hashing\" style=\"right: "+offsetRight+"px\"><span class=\"pglabel\">"+L("HashingInProgress")+"</span><span id=\"hashprogress\"></span></div>");
        }

        $("#hashprogress").css("width", aProgress+"%");
    }
}

// -----------------------------------------------------------------------------

function triggerHashPassword( aXHR )
{
    if ( aXHR.error == null )
    {
        var Salt   = aXHR.salt;
        var Key    = aXHR.pubkey;
        var Method = aXHR.method;
        var Pass   = $("#pass_old").val();

        hash( Key, Method, Pass, Salt, updateNewPasswordProgress, function(aEncodedPass) {
            triggerProfileUpdateData($("#profile").data("userid"), aEncodedPass);
        });
    }
}

// -----------------------------------------------------------------------------

function triggerProfileUpdateData( aUserId, aEncodedOldPass )
{
    // Gather characters

    var IdArray       = Array();
    var NameArray     = Array();
    var ClassArray    = Array();
    var MainCharArray = Array();
    var Role1Array    = Array();
    var Role2Array    = Array();

    var CharList = $("#charlist").data("characters");

    for ( var i=0; i<CharList.mCharacters.length; ++i )
    {
        var CharData = CharList.mCharacters[i];

        IdArray.push( CharData.id );
        ClassArray.push( CharData.charClass );
        MainCharArray.push( CharData.mainChar );
        Role1Array.push( CharData.role1 );
        Role2Array.push( CharData.role2 );

        if ( CharData.id === 0 )
        {
            NameArray.push( CharData.name );
        }
        else
        {
            NameArray.push("");
        }
    }

    // Update

    var CurrentPanel = window.location.hash.substring( window.location.hash.indexOf(",")+1 );

    var vacationStart = $("#vacation_start").datepicker("getDate");
    var vacationEnd   = $("#vacation_end").datepicker("getDate");

    var Parameters = {
        userId          : aUserId,
        charId          : IdArray,
        name            : NameArray,
        charClass       : ClassArray,
        mainChar        : MainCharArray,
        role1           : Role1Array,
        role2           : Role2Array,
        showPanel       : CurrentPanel,
        vacationStart   : (vacationStart == null) ? null : vacationStart.getTime() / 1000,
        vacationEnd     : (vacationEnd == null) ? null : vacationEnd.getTime() / 1000,
        vacationMessage : ($("#vacationMessage") == "") ? null : $("#vacationMessage").val(),
        oldPass         : aEncodedOldPass,
        newPass         : $("#pass_new").val()
    };

    onAppliedUIDataChange();
    asyncQuery("profile_update", Parameters, function(aXHR) { reloadUser(); generateProfile(aXHR); });
}

// -----------------------------------------------------------------------------

function loadProfile(aPanelName, aUserId)
{
    reloadUser();

    if ( gUser == null )
        return;

    $("#body").empty();

    var Parameters = {
        userId    : aUserId,
        showPanel : aPanelName
    };

    asyncQuery( "query_profile", Parameters, generateProfile );
}

// -----------------------------------------------------------------------------

function loadProfilePanel( aPanelName, aUserId )
{
    if ( gUser == null )
        return;

    if ( ($("#profile").length === 0) ||

         ($("#profile").data("userid") != aUserId) )
    {
        loadProfile( aPanelName, aUserId );
    }
    else
    {
        switch( aPanelName )
        {
        default:
        case "characters":
            showProfilePanel("#characters", "characters");
            break;

        case "settings":
            showProfilePanel("#profilesettings", "settings");
            break;
        }
    }
}