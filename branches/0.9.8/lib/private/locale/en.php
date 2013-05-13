<?php
    if ( defined("LOCALE_MAIN") )
    {
        // Pre-loading checks
        $g_Locale[ "ContinueNoUpdate" ]         = "Continue without updating";
        $g_Locale[ "UpdateBrowser" ]            = "Please update your browser";
        $g_Locale[ "UsingOldBrowser" ]          = "You are using an out of date version of your browser.";
        $g_Locale[ "OlderBrowserFeatures" ]     = "Older browser do not support all required features or display the site incorrectly.";
        $g_Locale[ "DownloadNewBrowser" ]       = "You should update your browser or download one of the following Browsers.";
        $g_Locale[ "RaidplanerNotConfigured" ]  = "Raidplaner is not configured yet or requires an update.";
        $g_Locale[ "PleaseRunSetup" ]           = "Please run <a href=\"setup\">setup</a> or follow the <a href=\"http://code.google.com/p/ppx-raidplaner/wiki/ManualSetup\">manual installation</a> instructions.";

        // General
        $g_Locale[ "Reserved" ]                 = "Reserved";
        $g_Locale[ "Error" ]                    = "Error";
        $g_Locale[ "Apply" ]                    = "Apply changes";
        $g_Locale[ "AccessDenied" ]             = "Access denied";
        $g_Locale[ "ForeignCharacter" ]         = "Not your character";
        $g_Locale[ "DatabaseError" ]            = "Database error";
        $g_Locale[ "Cancel" ]                   = "Cancel";
        $g_Locale[ "Notification" ]             = "Notification";
        $g_Locale[ "Busy" ]                     = "Busy. Please wait.";
        $g_Locale[ "RequestError" ]             = "A request returned an error.";
        $g_Locale[ "UnknownRequest" ]           = "Unknown request";
        $g_Locale[ "InvalidRequest" ]           = "Invalid request";
        $g_Locale[ "InputRequired" ]            = "Input required";        
        $g_Locale[ "UnappliedChanges" ]         = "Do you want to discard unapplied changes?";
        $g_Locale[ "DiscardChanges" ]           = "Yes, discard";
        $g_Locale[ "to" ]                       = "to";
        
        // Login und user registration
        $g_Locale[ "Login" ]                    = "Login";
        $g_Locale[ "Logout" ]                   = "Logout";
        $g_Locale[ "Username" ]                 = "Username";
        $g_Locale[ "Password" ]                 = "Password";        
        $g_Locale[ "RepeatPassword" ]           = "Repeat password";
        $g_Locale[ "Register" ]                 = "Register";
        $g_Locale[ "EnterValidUsername" ]       = "You must enter a valid username.";
        $g_Locale[ "EnterNonEmptyPassword" ]    = "You must enter a non-empty password.";
        $g_Locale[ "PasswordsNotMatch" ]        = "Passwords did not match.";
        $g_Locale[ "NameInUse" ]                = "This username is already in use.";    
        $g_Locale[ "RegistrationDone" ]         = "Registration complete.";
        $g_Locale[ "AccountIsLocked" ]          = "Your account is currently locked.";
        $g_Locale[ "ContactAdminToUnlock" ]     = "Please contact your admin to get your account unlocked.";
        $g_Locale[ "NoSuchUser" ]               = "The given user could not be found.";
        $g_Locale[ "HashingInProgress" ]        = "Hashing password";
        $g_Locale[ "PassStrength"]              = "Passwort strength";
        
        // Calendar
        $g_Locale[ "Calendar" ]                 = "Calendar";
        $g_Locale[ "January" ]                  = "January";
        $g_Locale[ "February" ]                 = "February";
        $g_Locale[ "March" ]                    = "March";
        $g_Locale[ "April" ]                    = "April";
        $g_Locale[ "May" ]                      = "May";
        $g_Locale[ "June" ]                     = "June";
        $g_Locale[ "July" ]                     = "July";
        $g_Locale[ "August" ]                   = "August";
        $g_Locale[ "September" ]                = "September";
        $g_Locale[ "October" ]                  = "October";
        $g_Locale[ "November" ]                 = "November";
        $g_Locale[ "December" ]                 = "December";    
        $g_Locale[ "Monday" ]                   = "Monday";
        $g_Locale[ "Tuesday" ]                  = "Tuesday";
        $g_Locale[ "Wednesday" ]                = "Wednesday";
        $g_Locale[ "Thursday" ]                 = "Thursday";
        $g_Locale[ "Friday" ]                   = "Friday";
        $g_Locale[ "Saturday" ]                 = "Saturday";
        $g_Locale[ "Sunday" ]                   = "Sunday";          
        $g_Locale[ "Mon" ]                      = "Mo";
        $g_Locale[ "Tue" ]                      = "Tu";
        $g_Locale[ "Wed" ]                      = "We";
        $g_Locale[ "Thu" ]                      = "Th";
        $g_Locale[ "Fri" ]                      = "Fr";
        $g_Locale[ "Sat" ]                      = "Sa";
        $g_Locale[ "Sun" ]                      = "Su";
        $g_Locale[ "NotSignedUp" ]              = "Not signed up";
        $g_Locale[ "Absent" ]                   = "Absent";
        $g_Locale[ "QueuedAs" ]                 = "Queued as ";
        $g_Locale[ "Raiding" ]                  = "Raiding as ";
        $g_Locale[ "WhyAbsent" ]                = "Please tell us why you will be absent.";
        $g_Locale[ "SetAbsent" ]                = "Set to absent";
        $g_Locale[ "Comment" ]                  = "Comment";
        $g_Locale[ "SaveComment" ]              = "Save comment";
        
        // Raid
        $g_Locale[ "Raid" ]                     = "Raid";
        $g_Locale[ "Upcoming" ]                 = "Upcoming raids";
        $g_Locale[ "CreateRaid" ]               = "Create raid";
        $g_Locale[ "NewDungeon" ]               = "New dungeon";
        $g_Locale[ "Description" ]              = "Description";
        $g_Locale[ "DefaultRaidMode" ]          = "Default attendance mode"; 
        $g_Locale[ "RaidStatus" ]               = "Status";
        $g_Locale[ "RaidOpen" ]                 = "Raid open";
        $g_Locale[ "RaidLocked" ]               = "Raid locked";
        $g_Locale[ "RaidCanceled" ]             = "Raid canceled";
        $g_Locale[ "DeleteRaid" ]               = "Delete raid";
        $g_Locale[ "ConfirmRaidDelete" ]        = "Do you really want to delete this Raid?";
        $g_Locale[ "Players" ]                  = "Players";
        $g_Locale[ "RequiredForRole" ]          = "Required for role";
        $g_Locale[ "AbsentPlayers" ]            = "Absent players";
        $g_Locale[ "UndecidedPlayers" ]         = "Undecided players";
        $g_Locale[ "AbsentNoReason" ]           = "No message given.";
        $g_Locale[ "Undecided" ]                = "Has not made a statement, yet.";
        $g_Locale[ "MarkAsAbesent" ]            = "Mark as absent";
        $g_Locale[ "MakeAbsent" ]               = "Player will be absent";
        $g_Locale[ "AbsentMessage" ]            = "Please enter the reason why the player will be absent.<br/>The message will be prefixed with your login name.";
        $g_Locale[ "SetupBy" ]                  = "Attended by ";
        
        // Classes
        $g_Locale[ "Deathknight" ]              = "Deathknight";
        $g_Locale[ "Druid" ]                    = "Druid";
        $g_Locale[ "Hunter" ]                   = "Hunter";
        $g_Locale[ "Mage" ]                     = "Mage";
        $g_Locale[ "Monk" ]                     = "Monk";
        $g_Locale[ "Paladin" ]                  = "Paladin";
        $g_Locale[ "Priest" ]                   = "Priest";
        $g_Locale[ "Rogue" ]                    = "Rogue";
        $g_Locale[ "Shaman" ]                   = "Shaman";
        $g_Locale[ "Warlock" ]                  = "Warlock";
        $g_Locale[ "Warrior" ]                  = "Warrior";
        
        // Roles
        $g_Locale[ "Tank" ]                     = "Tank";
        $g_Locale[ "Healer" ]                   = "Healer";
        $g_Locale[ "Damage" ]                   = "Damage";
        
        // Profile        
        $g_Locale[ "Profile" ]                  = "Profile";
        $g_Locale[ "History" ]                  = "Raid history";
        $g_Locale[ "Characters" ]               = "Your characters";
        $g_Locale[ "CharName" ]                 = "name";
        $g_Locale[ "NoName" ]                   = "A new character has no name assigned.";
        $g_Locale[ "NoClass" ]                  = "A new character has no class assigned.";
        $g_Locale[ "DeleteCharacter" ]          = "Delete character";
        $g_Locale[ "ConfirmDeleteCharacter" ]   = "Do you really want to delete this character?";
        $g_Locale[ "AttendancesRemoved" ]       = "All existing attendances will be removed, too.";
        $g_Locale[ "RaidAttendance" ]           = "Raid attendance";
        $g_Locale[ "RolesInRaids" ]             = "Roles in attended raids";            
        $g_Locale[ "Queued" ]                   = "Queued";
        $g_Locale[ "Attended" ]                 = "Attended";
        $g_Locale[ "Missed" ]                   = "Missed";
        $g_Locale[ "ChangePassword" ]           = "Change password";
        $g_Locale[ "OldPassword" ]              = "Old password";
        $g_Locale[ "OldPasswordEmpty" ]         = "The old password must not be empty.";
        $g_Locale[ "AdminPassword" ]            = "Administrator password";
        $g_Locale[ "AdminPasswordEmpty" ]       = "The administrator password must not be empty.";
        $g_Locale[ "WrongPassword" ]            = "Wrong password";
        $g_Locale[ "PasswordLocked" ]           = "Password cannot be changed.";
        $g_Locale[ "PasswordChanged" ]          = "The password has been changed.";
                
        // Settings
        $g_Locale[ "Settings" ]                 = "Settings";
        $g_Locale[ "Locked" ]                   = "Locked";
        $g_Locale[ "Members" ]                  = "Members";
        $g_Locale[ "Raidleads" ]                = "Raidleads";
        $g_Locale[ "Administrators" ]           = "Administrators";
        $g_Locale[ "ConfirmDeleteUser" ]        = "Do you really want to delete this user?";
        $g_Locale[ "DeleteUser" ]               = "Delete user";
        $g_Locale[ "MoveUser" ]                 = "Move user to group";
        $g_Locale[ "UnlinkUser" ]               = "Stop synchronisation and convert to local user.";
        $g_Locale[ "LinkUser" ]                 = "Synchronize user";
        $g_Locale[ "SyncFailed" ]               = "Failed to synchronize.</br>No fitting user found.";
        $g_Locale[ "EditForeignCharacters" ]    = "Edit characters for";
        $g_Locale[ "ConfirmDeleteLocation" ]    = "Do you really want to delete this location?";
        $g_Locale[ "NoteDeleteRaidsToo" ]       = "This will also delete all raids at this location.";
        $g_Locale[ "DeleteRaids" ]              = "Delete raids";
        $g_Locale[ "DeleteLocationRaids" ]      = "Delete location and raids";
        $g_Locale[ "LockRaids" ]                = "Lock raids";
        $g_Locale[ "AfterDone" ]                = "after a raid is done";
        $g_Locale[ "BeforeStart" ]              = "before a raid starts";
        $g_Locale[ "Seconds" ]                  = "Second(s)";
        $g_Locale[ "Minutes" ]                  = "Minute(s)";
        $g_Locale[ "Hours" ]                    = "Hour(s)";
        $g_Locale[ "Days" ]                     = "Day(s)";
        $g_Locale[ "Weeks" ]                    = "Week(s)";
        $g_Locale[ "Month" ]                    = "Month";
        $g_Locale[ "TimeFormat" ]               = "Time format";
        $g_Locale[ "StartOfWeek" ]              = "Week starts on";
        $g_Locale[ "DefaultStartTime" ]         = "Default raid start time";
        $g_Locale[ "DefaultEndTime" ]           = "Default raid end time";
        $g_Locale[ "DefaultRaidSize" ]          = "Default raid size";
        $g_Locale[ "BannerPage" ]               = "Page banner link";
        $g_Locale[ "Theme" ]                    = "Theme";
        $g_Locale[ "RaidSetupStyle" ]           = "Attendance style";        
        $g_Locale[ "RaidModeManual" ]           = "Setup by raidlead";
        $g_Locale[ "RaidModeAttend" ]           = "Setup by attend";
        $g_Locale[ "RaidModeAll" ]              = "Just list";                    
        $g_Locale[ "UpdateCheck" ]              = "Check for updates";
        $g_Locale[ "UpToDate" ]                 = "This raidplaner is up to date.";
        $g_Locale[ "NewVersionAvailable" ]      = "There is a new version available:";
        $g_Locale[ "VisitProjectPage" ]         = "Visit the project homepage";
    }
    
    if ( defined("LOCALE_SETUP") )
    {
        // General
        $g_Locale[ "Ok" ]                       = "Ok";
        $g_Locale[ "Back" ]                     = "Back";
        $g_Locale[ "Continue" ]                 = "Continue";
        $g_Locale[ "Error" ]                    = "Error";
        $g_Locale[ "Ignore" ]                   = "Ignore";
        $g_Locale[ "Retry" ]                    = "Retry";
        $g_Locale[ "DatabaseError" ]            = "Database error";
        
        // Menu
        $g_Locale[ "Install" ]                  = "Install";
        $g_Locale[ "Update" ]                   = "Update";
        $g_Locale[ "EditBindings" ]             = "Edit bindings";
        $g_Locale[ "EditConfig" ]               = "Edit configuration";
        $g_Locale[ "ResetPassword" ]            = "Set admin password";
        $g_Locale[ "RepairDatabase" ]           = "Repair database";
                        
        // Checks
        $g_Locale[ "FilesystemChecks" ]         = "Filesystem permission checks";
        $g_Locale[ "NotWriteable" ]             = "Not writeable";
        $g_Locale[ "ConfigFolder" ]             = "Config folder";
        $g_Locale[ "MainConfigFile" ]           = "Main config file";
        $g_Locale[ "DatabaseConnection" ]       = "Database connection";
        $g_Locale[ "WritePermissionRequired" ]  = "Setup needs write permission on all files in the config folder located at ";
        $g_Locale[ "ChangePermissions" ]        = "If any of these checks fails you have to change permissions to \"writeable\" for your http server's user.";
        $g_Locale[ "FTPClientHelp" ]            = "On how to change permissions, please consult your FTP client's helpfiles.";
        $g_Locale[ "OutdatedPHP" ]              = "Outdated PHP version";
        $g_Locale[ "PHPVersion" ]               = "PHP version";
        $g_Locale[ "McryptModule" ]             = "mcrypt module";
        $g_Locale[ "McryptNotFound" ]           = "Mcrypt not configured with PHP";
        $g_Locale[ "PDOModule" ]                = "PDO module";
        $g_Locale[ "PDONotFound" ]              = "PDO not configured with PHP";
        $g_Locale[ "PDOMySQLModule" ]           = "PDO MySQL driver";
        $g_Locale[ "PDOMySQLNotFound" ]         = "PDO MySQL driver not found";
        $g_Locale[ "PHPRequirements" ]          = "The raidplaner needs a PHP 5.2 installation configured with the mcrypt and PDO extensions.";
        
        // Database setup
        $g_Locale[ "ConfigureDatabase" ]        = "Please configure the database the raidplaner will place it's data into.";
        $g_Locale[ "SameAsForumDatabase" ]      = "If you want to bind the raidplaner to a third party forum the raidplaner database must be on the same server as the forum's database.";
        $g_Locale[ "EnterPrefix" ]              = "If the database is already in use by another installation you can enter a prefix to avoid name conflicts.";
        $g_Locale[ "DatabaseHost" ]             = "Database host";
        $g_Locale[ "RaidplanerDatabase" ]       = "Raidplaner database";
        $g_Locale[ "UserWithDBPermissions" ]    = "User with permissions for that database";
        $g_Locale[ "UserPassword" ]             = "Password for that user";
        $g_Locale[ "RepeatPassword" ]           = "Please repeat the password";
        $g_Locale[ "TablePrefix" ]              = "Prefix for tables in the database";
        $g_Locale[ "VerifySettings" ]           = "Verify these settings";
        $g_Locale[ "ConnectionTestFailed" ]     = "Connection test failed";
        $g_Locale[ "ConnectionTestOk" ]         = "Connection test succeeded";
        
        // Registration and admin
        $g_Locale[ "AdminPassword" ]            = "Password for the admin user";
        $g_Locale[ "AdminPasswordSetup"]        = "The administrator (login name \"admin\") is a user that always has all available rights.";
        $g_Locale[ "AdminNotMoveable"]          = "The admin user cannot be renamed or moved into a different group.";
        $g_Locale[ "AdminPasswordNoMatch" ]     = "Admin passwords do not match.";
        $g_Locale[ "AdminPasswordEmpty" ]       = "Admin password must not be empty.";
        $g_Locale[ "DatabasePasswordNoMatch" ]  = "Database passwords do not match.";
        $g_Locale[ "DatabasePasswordEmpty" ]    = "Database password must not be empty.";
        $g_Locale[ "AllowManualRegistration" ]  = "Allow users to register manually";
        $g_Locale[ "UseClearText" ]             = "Submit cleartext password (not recommended)";
        
        // Plugin setup
        $g_Locale[ "LoadGroups" ]               = "Load groups using these settings";
        $g_Locale[ "AutoMemberLogin" ]          = "Users of the following groups gain \"member\" rights upon first login";
        $g_Locale[ "AutoLeadLogin" ]            = "Users of the following groups gain \"raidlead\" rights upon first login";
        $g_Locale[ "ReloadFailed" ]             = "Reload failed";
        
        // Install/Update
        $g_Locale[ "SetupComplete" ]            = "Setup complete";
        $g_Locale[ "UpdateComplete" ]           = "Update complete";
        $g_Locale[ "RaidplanerSetupDone" ]      = "Raidplaner has been successfully set up.";
        $g_Locale[ "DeleteSetupFolder" ]        = "You should now delete the setup folder and secure the following folders:";
        $g_Locale[ "ThankYou" ]                 = "Thank you for using packedpixel Raidplaner.";
        $g_Locale[ "VisitBugtracker" ]          = "If you encounter any bugs or if you have feature requests, please visit our bugtracker at ";
        $g_Locale[ "VersionDetection" ]         = "Version detection and update";
        $g_Locale[ "VersionDetectProgress" ]    = "Setup will try to detect your current version.";
        $g_Locale[ "ChooseManually" ]           = "If the detected version does not match your installed version you may always choose manually, too.";
        $g_Locale[ "OnlyDBAffected" ]           = "The update will only affect changes in the database.";
        $g_Locale[ "NoChangeNoAction" ]         = "If the database did not change you will not need to do this step.";
        $g_Locale[ "DetectedVersion" ]          = "Detected version";
        $g_Locale[ "NoUpdateNecessary" ]        = "No update necessary.";
        $g_Locale[ "UpdateFrom" ]               = "Update from version";
        $g_Locale[ "UpdateTo" ]                 = "to version";
        $g_Locale[ "UpdateErrors" ]             = "Update errors";
        $g_Locale[ "ReportedErrors" ]           = "The following errors were reported during update.";
        $g_Locale[ "PartiallyUpdated" ]         = "This may hint on an already (partially) updated database.";
        
        // Repair
        $g_Locale[ "Repair" ]                   = "Repaire database inconsistencies";
        $g_Locale[ "GameconfigProblems" ]       = "By changing the lib/gameconfig.php inconsistent database entries can be created (e.g. characters with invalid roles).";
        $g_Locale[ "RepairTheseProblems" ]      = "This script fixes these problems as good as possible.";
        $g_Locale[ "RepairDone" ]               = "Repair done.";
        $g_Locale[ "BrokenDatabase" ]           = "Database seems to be broken";
        $g_Locale[ "EnsureValidDatabase" ]      = "Ensure a valid database";        
        $g_Locale[ "ItemsRepaired" ]            = "Items repaired";
        $g_Locale[ "ItemsToResolve" ]           = "Items need to be resolved manually";
        $g_Locale[ "InvalidCharacters" ]        = "Invalid characters";
        $g_Locale[ "InvalidAttendances" ]       = "Invalid attendances";
        $g_Locale[ "Delete" ]                   = "Delete";
        $g_Locale[ "Resolve" ]                  = "Resolve";
        $g_Locale[ "StrayRoles" ]               = "Invalid roles";
        $g_Locale[ "StrayCharacters" ]          = "Deleted characters";
        $g_Locale[ "StrayUsers" ]               = "Deleted users";
        
        // PHPBB3        
        $g_Locale[ "PHPBB3Binding" ]            = "PHPBB3";
        $g_Locale[ "PHPBB3ConfigFile" ]         = "PHPBB3 config file";
        $g_Locale[ "PHPBB3Database" ]           = "PHPBB3 database";
        $g_Locale[ "PHPBBPasswordEmpty" ]       = "PHPBB Database password must not be empty.";
        $g_Locale[ "PHPBBDBPasswordsMatch" ]    = "PHPBB Database passwords did not match.";
        
        // EQDKP
        $g_Locale[ "EQDKPBinding" ]             = "EQDKP";
        $g_Locale[ "EQDKPConfigFile" ]          = "EQDKP config file";
        $g_Locale[ "EQDKPDatabase" ]            = "EQDKP database";
        $g_Locale[ "EQDKPPasswordEmpty" ]       = "EQDKP Database password must not be empty.";
        $g_Locale[ "EQDKPDBPasswordsMatch" ]    = "EQDKP Database passwords did not match.";
        
        // vBulletin
        $g_Locale[ "VBulletinBinding" ]         = "vBulletin3";
        $g_Locale[ "VBulletinConfigFile" ]      = "vBulletin config file";
        $g_Locale[ "VBulletinDatabase" ]        = "vBulletin database";
        $g_Locale[ "VBulletinPasswordEmpty" ]   = "vBulletin Database password must not be empty.";
        $g_Locale[ "VBulletinDBPasswordsMatch" ]= "vBulletin Database passwords did not match.";
        
        // MyBB
        $g_Locale[ "MyBBBinding" ]              = "MyBB";
        $g_Locale[ "MyBBConfigFile" ]           = "MyBB config file";
        $g_Locale[ "MyBBDatabase" ]             = "MyBB database";
        $g_Locale[ "MyBBPasswordEmpty" ]        = "MyBB Database password must not be empty.";
        $g_Locale[ "MyBBDBPasswordsMatch" ]     = "MyBB Database passwords did not match.";
        
        // SMF
        $g_Locale[ "SMFBinding" ]               = "SMF";
        $g_Locale[ "SMFConfigFile" ]            = "SMF config file";
        $g_Locale[ "SMFDatabase" ]              = "SMF database";
        $g_Locale[ "SMFPasswordEmpty" ]         = "SMF Database password must not be empty.";
        $g_Locale[ "SMFDBPasswordsMatch" ]      = "SMF Database passwords did not match.";
        
        // Vanilla
        $g_Locale[ "VanillaBinding" ]           = "Vanilla";
        $g_Locale[ "VanillaConfigFile" ]        = "Vanilla config file";
        $g_Locale[ "VanillaDatabase" ]          = "Vanilla database";
        $g_Locale[ "VanillaPasswordEmpty" ]     = "Vanilla Database password must not be empty.";
        $g_Locale[ "VanillaDBPasswordsMatch" ]  = "Vanilla Database passwords did not match.";
        
        // Joomla
        $g_Locale[ "JoomlaBinding" ]            = "Joomla3";
        $g_Locale[ "JoomlaConfigFile" ]         = "Joomla3 config file";
        $g_Locale[ "JoomlaDatabase" ]           = "Joomla3 database";
        $g_Locale[ "JoomlaPasswordEmpty" ]      = "Joomla3 Database password must not be empty.";
        $g_Locale[ "JoomlaDBPasswordsMatch" ]   = "Joomla3 Database passwords did not match.";
    }
?>