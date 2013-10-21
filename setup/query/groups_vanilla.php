<?php
    define( "LOCALE_SETUP", true );
    require_once(dirname(__FILE__)."/../../lib/private/connector.class.php");
    require_once(dirname(__FILE__)."/../../lib/config/config.php");

    header("Content-type: text/xml");
    echo "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";
    echo "<grouplist>";
    
    $Out = Out::getInstance();
    $Connector = new Connector(SQL_HOST, $_REQUEST["database"], $_REQUEST["user"], $_REQUEST["password"]); 
    
    if ($Connector != null)
    {
        $Groups = $Connector->prepare( "SELECT RoleID, Name FROM `".$_REQUEST["prefix"]."Role` ORDER BY Name" );
        
        if ( $Groups->execute() )
        {
            while ( $Group = $Groups->fetch( PDO::FETCH_ASSOC ) )
            {
                echo "<group>";
                echo "<id>".$Group["RoleID"]."</id>";
                echo "<name>".$Group["Name"]."</name>";
                echo "</group>";
            }
        }
        else
        {
            postErrorMessage( $Groups );
        }
    }
    
    $Out->flushXML("");        
    echo "</grouplist>";
?>