# Released versions #

## Patch 1.0.3 ##

  * **`[`Fix`]`** Empty roles are allowed now ([Issue #90](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#90))
  * **`[`Fix`]`** Fixes the count of undecided members in settings view ([Issue #92](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#92))
  * **`[`Fix`]`** Raidplaner cookies are now path based to allow multiple instances on one server ([Issue #93](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#93))
  * **`[`Fix`]`** Fixed several issues with attending raids under certain conditions ([Issue #96](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#96), [Issue #95](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#95))
  * **`[`Fix`]`** Fixed update check hanging
  * **`[`Fix`]`** Comments now detect https links as clickable, too
  * **`[`Fix`]`** Proper JSON escaping of certain characters
  * **`[`Fix`]`** Minor localization fixes

## Patch 1.0.2 ##

  * **`[`New`]`** Polish localization
  * **`[`New`]`** Siege of Orgrimmar icons

  * **`[`Mod`]`** Classes and roles moved to the top of localizations
  * **`[`Mod`]`** All loca-strings are now UTF8 ([Issue #79](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#79))

  * **`[`Fix`]`** Fixes a wrong date calculation at the end of certain months ([Issue #84](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#84))
  * **`[`Fix`]`** Players won't show up in lists for dates before their first registration ([Issue #89](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#89))
  * **`[`Fix`]`** Default message when setting a player to absent ([Issue #86](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#86))
  * **`[`Fix`]`** Log message when switching a character ([Issue #88](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#88))
  * **`[`Fix`]`** Statistics overview now match the statistics of a single player ([Issue #86](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#86))
  * **`[`Fix`]`** Improved setup checks ([Issue #80](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#80), [Issue #82](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#82))
  * **`[`Fix`]`** All pages have a proper UTF8 header ([Issue #79](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#79))


## Patch 1.0.1 ##

  * **`[`New`]`** Wordpress binding

  * **`[`Mod`]`** Extended the repair tool support ([Issue #72](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#72))
  * **`[`Mod`]`** Slackers icon now shows only the number of absent people ([Issue #75](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#75))

  * **`[`Fix`]`** Fixes a "Warning: mktime() [...]" problem with newer PHP versions ([Issue #72](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#72))
  * **`[`Fix`]`** Checks during setup now work properly again ([Issue #73](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#73))
  * **`[`Fix`]`** Fixes a display error in months with DST switches ([Issue #77](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#77))
  * **`[`Fix`]`** Proper escaping when entering comments ([Issue #76](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#76))
  * **`[`Fix`]`** Statistics bars are displayed correctly when showing a scrollbar ([Issue #78](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#78))
  * **`[`Fix`]`** Clearer error messages when bindings cannot be used
  * **`[`Fix`]`** The first user of a group can now be unlinked, too
  * **`[`Fix`]`** Error messages are now displayed correctly, even when no JSON error occured
  * **`[`Fix`]`** Theme parsing errors are now properly reported

## Version 1.0.0 (October 2013) ##

  * **`[`New`]`** Description text is now visible in the raid setup view ([Issue #59](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#59))
  * **`[`New`]`** Class icons are being displayed in the character dropdown ([Issue #60](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#60))
  * **`[`New`]`** New raidmode to allow overbooking with manual setup ([Issue #64](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#64))
  * **`[`New`]`** Support for users in different timezones ([Issue #61](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#61))
  * **`[`New`]`** Customizable help page button ([Issue #42](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#42))
  * **`[`New`]`** New option to let local users register as members ("public mode")
  * **`[`New`]`** New option to not sync groups with external users ("classic mode")
  * **`[`New`]`** Integrated french localization file

  * **`[`Mod`]`** Server communication now uses JSON instead of XML
  * **`[`Mod`]`** Page now loads one minified JS and CSS file by default

  * **`[`Fix`]`** Profile "more" button works as expected ([Issue #58](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#58))
  * **`[`Fix`]`** Main character displayed correctly when editing another user ([Issue #71](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#71))
  * **`[`Fix`]`** User comments are saved when forcing setup/unattend ([Issue #63](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#63))
  * **`[`Fix`]`** Icon indicator to show the number of undecided / absent players ([Issue #65](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#65))
  * **`[`Fix`]`** Deleting a user now properly clears all references to that user
  * **`[`Fix`]`** Fixed binding errors with mybb and vanilla ([Issue #67](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#67), [Issue #70](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#70))

## Version 0.9.8 (May 2013) ##

  * **`[`New`]`** Vanilla forum integration ([Issue #41](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#41))
  * **`[`New`]`** Joomla integration ([Issue #48](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#48))
  * **`[`New`]`** Drupal integration
  * **`[`New`]`** User defined raid column layout ([Issue #29](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#29))
  * **`[`New`]`** Link detection in comments ([Issue #45](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#45))
  * **`[`New`]`** Added a possibility for raidleads to manually attend or remove users
  * **`[`New`]`** Added an option to make any day the first day of the week

  * **`[`Mod`]`** Full user sync and detection of banned players ([Issue #39](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#39))
  * **`[`Mod`]`** Separated "players on the bench" and "players raiding" more clearly ([Issue #30](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#30))

  * **`[`Fix`]`** Default roles ([Issue #28](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#28))
  * **`[`Fix`]`** Fix character name UI ([Issue #43](https://code.google.com/p/ppx-raidplaner/issues/detail?id=#43))
  * **`[`Fix`]`** Fix duplicate element ids for raid sheet
  * **`[`Fix`]`** Added a modification timestamp to attends to avoid edit race-conditions
  * **`[`Fix`]`** A ton of smaller fixes, cleanup and performance improvements

## Version 0.9.7 (March 2013) ##

  * **`[`New`]`** New interface for the setup tool
  * **`[`New`]`** Repair tool for changing the gameconfig.php on an existing database
  * **`[`New`]`** Challenge key authentication (cleartext authentication optional)
  * **`[`New`]`** Support for MyBB
  * **`[`New`]`** Support for Simple Machines Forum (SMF)
  * **`[`New`]`** 2nd Mists of Pandaria theme

  * **`[`Mod`]`** Comments are now possible without signing up
  * **`[`Mod`]`** Rewritten user management system
  * **`[`Mod`]`** Leaving a section with unapplied settings triggers a message
  * **`[`Mod`]`** Improved raid setup usability
  * **`[`Mod`]`** Star marker = main role / main character (removed twink marker)

  * **`[`Fix`]`** EQDKP binding works again
  * **`[`Fix`]`** vBulletin binding works again
  * **`[`Fix`]`** Improved checks against SQL Injections
  * **`[`Fix`]`** Improved checks against Session hijacking
  * **`[`Fix`]`** Sticky login is now functional again
  * **`[`Fix`]`** Profile display of more than 6 characters now works on all browser
  * **`[`Fix`]`** Proper text shadow for IE
  * **`[`Fix`]`** Combo boxes don't close tooltips anymore
  * **`[`Fix`]`** Days with more than 4 raids don't destroy the calendar layout anymore
  * **`[`Fix`]`** Raids now lock at start-time instead of end-time

## Version 0.9.6 (October 2012) ##

  * **`[`New`]`** The raid setup has been rewritten completely
  * **`[`New`]`** 2 new raid attendance modes: "Setup on attend" and "just list"
  * **`[`New`]`** Improved "slackers" lists
  * **`[`New`]`** Support for up to 5 roles (for games other than WoW)

  * **`[`Fix`]`** Improved iPad support
  * **`[`Fix`]`** Lots of minor improvements

## Version 0.9.5 (June 2012) ##

To upgrade version 0.9.3 or newer to the latest version, use the upgrade option from the setup tool.

  * **`[`New`]`** 12h / 24h time format switch
  * **`[`New`]`** Advanced theme support
  * **`[`New`]`** Version check

  * **`[`Mod`]`** Improved usability for touch devices
  * **`[`Mod`]`** Support for 5-man dungeons

  * **`[`Fix`]`** Several smaller graphic upgrades

## Version 0.9.4 (April 2012) ##

To upgrade version 0.9.3 to the latest version, use the upgrade option from the setup tool.

  * **`[`New`]`** All new settings panel with editable locations and presets
  * **`[`New`]`** Attendance statistics
  * **`[`New`]`** Upgrade option in the installer

  * **`[`Mod`]`** Icon update for the current raids
  * **`[`Mod`]`** Password change for local users (those not bound externally)
  * **`[`Mod`]`** Exchangeable banner


## Version 0.9.3 (May 2011) ##

If you upgrade from 0.9 make sure to install the 0.9.1 and 0.9.2 Database upgrades (for example via phpMyAdmin).<br>

<ul><li><b><code>[</code>New<code>]</code></b> EQDKP support<br>
</li><li><b><code>[</code>New<code>]</code></b> vBulletin support<br>
</li><li><b><code>[</code>New<code>]</code></b> Android (touchscreen) support<br>
</li><li><b><code>[</code>New<code>]</code></b> Display of raid non-participants</li></ul>

<ul><li><b><code>[</code>Mod<code>]</code></b> Better drag and drop for raid setup (more like user management)<br>
</li><li><b><code>[</code>Mod<code>]</code></b> Better synchronization of external users