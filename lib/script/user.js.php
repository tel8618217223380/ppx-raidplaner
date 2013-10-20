<?php
    // Note: You should never ever rely on that data as the only source of
    // user information. These can easily be changed on the clients side and are
    // only meant for caching or display related logic
        
    require_once(dirname(__FILE__)."/../private/userproxy.class.php");
    if (!defined("UNIFIED_SCRIPT")) 
    {
        header("Content-type: text/javascript");
        header("Cache-Control: no-cache, max-age=0, s-maxage=0");
    }
    
    if ( validUser() )
    {
        $CurrentUser = UserProxy::getInstance();
        
        function echoCharacterIds()
        {
            global $CurrentUser;
            $First = true;
            
            foreach ( $CurrentUser->Characters as $Character )
            {
                if ($First)
                {
                    echo "\"".intval( $Character->CharacterId )."\"";
                    $First = false;
                }
                else
                {
                    echo ", \"".intval( $Character->CharacterId )."\"";
                }
            }
        }
        
        function echoCharacterNames()
        {
            global $CurrentUser;
            $First = true;
            
            foreach ( $CurrentUser->Characters as $Character )
            {
                if ($First)
                {
                    echo "\"".$Character->Name."\"";
                    $First = false;
                }
                else
                {
                    echo ", \"".$Character->Name."\"";
                }
            }
        }
        
        function echoSettings()
        {
            global $CurrentUser;
            $First = true;
            
            while ( list($Name, $Value) = each($CurrentUser->Settings) )
            {                
                if ($First) $First = false; else echo ", ";
                echo $Name.": {number: ".$Value["number"].", text: \"".$Value["text"]."\"}";
            }
        }
        
        function echoClassName()
        {
            global $CurrentUser;
            $First = true;
            
            foreach ( $CurrentUser->Characters as $Character )
            {
                if ($First)
                {
                    echo "\"".$Character->ClassName."\"";
                    $First = false;
                }
                else
                {
                    echo ", \"".$Character->ClassName."\"";
                }
            }
        }
        
        function echoRole1()
        {
            global $CurrentUser;
            $First = true;
            
            foreach ( $CurrentUser->Characters as $Character )
            {
                if ($First)
                {
                    echo "\"".$Character->Role1."\"";
                    $First = false;
                }
                else
                {
                    echo ", \"".$Character->Role1."\"";
                }
            }
        }
        
        function echoRole2()
        {
            global $CurrentUser;
            $First = true;
            
            foreach ( $CurrentUser->Characters as $Character )
            {
                if ($First)
                {
                    echo "\"".$Character->Role2."\"";
                    $First = false;
                }
                else
                {
                    echo ", \"".$Character->Role2."\"";
                }
            }
        }
?>

var gUser = {
    characterIds    : new Array( <?php echoCharacterIds(); ?> ),
    characterNames  : new Array( <?php echoCharacterNames(); ?> ),
    characterClass  : new Array( <?php echoClassName(); ?> ),
    role1           : new Array( <?php echoRole1(); ?> ),
    role2           : new Array( <?php echoRole2(); ?> ),
    isRaidlead      : <?php echo validRaidlead() ? "true" : "false"; ?>,
    isAdmin         : <?php echo validAdmin() ? "true" : "false"; ?>,
    id              : <?php echo $CurrentUser->UserId; ?>,
    name            : "<?php echo $CurrentUser->UserName; ?>",
    settings        : { <?php echoSettings(); ?> }
};

<?php
    } 
    else 
    {
?>
    
var gUser = null;

<?php } ?>