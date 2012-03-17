<?php
	define( "LOCALE_SETUP", true );
	require_once(dirname(__FILE__)."/../lib/private/locale.php");
	@include_once(dirname(__FILE__)."/../lib/config/config.php")
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html>
	<head>
		<title>Raidplaner config</title>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        
        <script type="text/javascript" src="../lib/script/jquery-1.7.1.min.js"></script>
        <script type="text/javascript" src="script/main.js"></script>
        <script type="text/javascript" src="script/setup_db.js.php"></script>
        
    </head>
	
	<body style="font-family: helvetica, arial, sans-serif; font-size: 11px; line-height: 1.5em; background-color: #cccccc; color: black">
		<div style="width: 800px; height: 600px; position: fixed; left: 50%; top: 50%; margin-left: -400px; margin-top: -300px; background-color: white">
			<div style="background-color: black; color: white; padding: 10px">
				Packedpixel<br/>
				<span style="font-size: 24px">Raidplaner setup (2/3)</span>
			</div>
			<div style="padding: 20px">
				<div style="margin-top: 1.5em">
					<h2><?php echo L("Database connection"); ?></h2>
					
					<?php echo L("Please configure the database the raidplaner will place it's data into."); ?><br/>
					<?php echo L("If the database is already in use by another installation you can enter a prefix to avoid name conflicts."); ?><br/>
					<?php echo L("If you want to bind the raidplaner to a third party forum the raidplaner database must be on the same server as the forum's database."); ?><br/>
					<br/>
					
					<input type="text" id="host" value="<?php echo (defined("SQL_HOST")) ? SQL_HOST : "localhost" ?>"/> <?php echo L("Database host"); ?><br/>
					<input type="text" id="database" value="<?php echo (defined("RP_USER")) ? RP_DATABASE : "raidplaner" ?>"/> <?php echo L("Raidplaner database"); ?><br/>
					<input type="text" id="user" value="<?php echo (defined("RP_USER")) ? RP_USER : "root" ?>"/> <?php echo L("User with permissions for that database"); ?><br/>
					<input type="password" id="password"/> <?php echo L("Password for that user"); ?><br/>
					<input type="password" id="password_check"/> <?php echo L("Please repeat the password"); ?><br/>
					<br/>
					<input type="text" id="prefix" value="<?php echo (defined("RP_TABLE_PREFIX")) ? RP_TABLE_PREFIX : "table_" ?>"/> <?php echo L("Prefix for tables in the database"); ?><br/>
				</div>
				
				<div style="margin-top: 1.5em">
					<h2 style="margin-top: 1.5em"><?php echo L("Advanced options"); ?></h2>
					<input type="checkbox" id="allow_registration"<?php echo (!defined("ALLOW_REGISTRATION") || ALLOW_REGISTRATION) ? " checked=\"checked\"" : "" ?>/> <?php echo L("Allow users to register manually"); ?><br/>
					<input type="password" id="admin_password"/> <?php echo L("Password for the admin user"); ?><br/>
					<input type="password" id="admin_password_check"/> <?php echo L("Please repeat the password"); ?><br/>
				</div>	
				
				<div style="position: fixed; right: 50%; top: 50%; margin-right: -380px; margin-top: 260px">
					<button onclick="checkForm()"><?php echo L("Save and continue"); ?></button>
				</div>
			</div>
		</div>
	</body>
</html>