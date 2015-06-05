# Detailed bug reports #

Some errors require more information than just a description about what happend.
In this case I'm always glad about some extra data.

# Script information #

The steps below work for Google Chrome, but Safari dev tools or Firefox/Firebug can be used, too (slightly different steps though).

  * In Chrome, open the dev tools _(menu -> tools -> developer tools, or ctrl+shift+i (win) / cmd+alt+i (mac))_
  * Switch to **"Network"**, Show only **"XHR"** (XML Http Requests) at the bottom
  * Open the raidplaner, login, reproduce the problem
  * Check for an entry called **"messagehub.php"** choose the last entry in the list with that name
  * From **"headers"** I need the content of **"Form data"**
  * From **"response"** I need a copy of everything included (select all, copy, paste)
  * If any javascript errors are reported (**"Console"** -> **"Errors"**) I need a copy/screenshot of those, too.

![http://www.packedpixel.de/raidplaner/debug/tools.png](http://www.packedpixel.de/raidplaner/debug/tools.png)

![http://www.packedpixel.de/raidplaner/debug/xhr.png](http://www.packedpixel.de/raidplaner/debug/xhr.png)

![http://www.packedpixel.de/raidplaner/debug/response.png](http://www.packedpixel.de/raidplaner/debug/response.png)

If you have access to the php.ini on your server it would be great to enable all errors before doing this:

  * error\_reporting = E\_ALL
  * display\_errors = On
  * html\_errors = Off

Note that these settings should be reverted to their original values once you're done.

# Detailed php information #

Sometimes an error needs more information about your php installation.
The easiest way to do this is by attaching a "phpinfo dump" to the bug report.
To create this you need to do the following:

  * Create a file called "phpinfo.php" (or something else as long as its ending with ".php")
  * The file should contain the following line: `<?php phpinfo(); ?>`
  * Upload the file and call `http://<your server here>/phpinfo.php`

The page displayed should show detailed information about your php installation.
Save this page as HTML or PDF and attach it to your bug report.