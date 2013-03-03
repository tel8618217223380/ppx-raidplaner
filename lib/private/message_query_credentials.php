<?php

function msgQueryCredentials( $Request )
{
    $credentials = UserProxy::GetInstance()->GetUserCredentials($Request["Login"]);

    if ($credentials == null )
    {
        echo "<error>".L("NoSuchUser")."</error>";
    }
    else
    {    
        echo "<salt>".$credentials["salt"]."</salt>";
        echo "<pubkey>".$credentials["key"]."</pubkey>";
        echo "<method>".$credentials["method"]."</method>";
    }
}


function msgQueryCredentialsById( $Request )
{
    $credentials = UserProxy::GetInstance()->GetUserCredentialsById($Request["UserId"]);

    if ($credentials == null )
    {
        echo "<error>".L("NoSuchUser")."</error>";
    }
    else
    {    
        echo "<salt>".$credentials["salt"]."</salt>";
        echo "<pubkey>".$credentials["key"]."</pubkey>";
        echo "<method>".$credentials["method"]."</method>";
    }
}

?>