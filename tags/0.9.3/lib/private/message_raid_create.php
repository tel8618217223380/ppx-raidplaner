<?php
        
function msgRaidCreate( $Request )
{
	if ( ValidRaidlead() )
    {
    	$Connector = Connector::GetInstance();
    	
    	$locationId = $Request["locationId"];
    	
    	if ( $locationId == 0 )
    	{
    		$NewLocationSt = $Connector->prepare("INSERT INTO `".RP_TABLE_PREFIX."Location`".
    											 "(Name, Image) VALUES (:Name, :Image)");
    											 
    		$NewLocationSt->bindValue(":Name", requestToXML( $Request["locationName"], ENT_COMPAT, "UTF-8" ), PDO::PARAM_STR );
    		$NewLocationSt->bindValue(":Image", $Request["raidImage"], PDO::PARAM_STR );
    		
    		if (!$NewLocationSt->execute())
        	{
        		postErrorMessage( $NewLocationSt );            	
            	$NewLocationSt->closeCursor();            	
            	return;
        	}
        	else
        	{        	
    			$locationId = $Connector->lastInsertId();
    		}
    		
    		$NewLocationSt->closeCursor();
    	}
    	
    	if ( $locationId != 0 )
    	{
    	
    		$NewRaidSt = $Connector->prepare("INSERT INTO `".RP_TABLE_PREFIX."Raid` ".
	                                         "(LocationId, Size, Start, End, Description, TankSlots, DmgSlots, HealSlots ) ".
	                                         "VALUES (:LocationId, :Size, FROM_UNIXTIME(:Start), FROM_UNIXTIME(:End), :Description, :TankSlots, :DmgSlots, :HealSlots)");
	                                         
	        $StartDateTime = mktime($Request["startHour"], $Request["startMinute"], 0, $Request["month"], $Request["day"], $Request["year"]);
	        $EndDateTime   = mktime($Request["endHour"], $Request["endMinute"], 0, $Request["month"], $Request["day"], $Request["year"]);
	        
	        $NewRaidSt->bindValue(":LocationId",  $locationId, PDO::PARAM_INT);
	        $NewRaidSt->bindValue(":Size",        $Request["locationSize"], PDO::PARAM_INT);
	        $NewRaidSt->bindValue(":Start",       $StartDateTime, PDO::PARAM_INT);
	        $NewRaidSt->bindValue(":End",         $EndDateTime, PDO::PARAM_INT);
	        $NewRaidSt->bindValue(":Description", requestToXML( $Request["description"], ENT_COMPAT, "UTF-8" ), PDO::PARAM_STR);
	        
	        $NewRaidSt->bindValue(":TankSlots",	( $Request["locationSize"] == 25 ) ? 2  : 2, PDO::PARAM_INT);
	        $NewRaidSt->bindValue(":DmgSlots",	( $Request["locationSize"] == 25 ) ? 17 : 5, PDO::PARAM_INT);
	        $NewRaidSt->bindValue(":HealSlots",	( $Request["locationSize"] == 25 ) ? 6  : 3, PDO::PARAM_INT);
	        
	        if (!$NewRaidSt->execute())
	        {
	        	postErrorMessage( $NewRaidSt );
	        }
	        
	        $NewRaidSt->closeCursor();
	        
	        // reload calendar
	        
	        $showMonth = ( isset($_SESSION["Calendar"]) && isset($_SESSION["Calendar"]["month"]) ) ? $_SESSION["Calendar"]["month"]+1 : $Request["month"];
	        $showYear  = ( isset($_SESSION["Calendar"]) && isset($_SESSION["Calendar"]["year"]) )  ? $_SESSION["Calendar"]["year"]    : $Request["year"];
		
			msgRaidCalendar( prepareRaidListRequest( $showMonth, $showYear ) );
		}
    }
    else
    {
        echo "<error>".L("Access denied")."</error>";
    }
}

?>