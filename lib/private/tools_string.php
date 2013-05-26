<?php

function xmlSpecialChar( $aChar )
{
    $Utf8 = (mb_check_encoding($aChar,"UTF-8"))
        ? $aChar
        : mb_convert_encoding($aChar,"UTF-8");
    
    $Char = mb_convert_encoding($Utf8, "UCS-4BE", "UTF-8");    
    $Val = unpack("N",$Char);
    
    return "&#".$Val[1].";";
}

// -----------------------------------------------------------------------------

function xmlentities( $aString, $aCompat, $aCharset )
{
    $ValidString = htmlentities($aString, $aCompat, $aCharset);
    
    // if the given charset did not work use fallback

    if ( $ValidString == "" )
        $ValidString = htmlentities( $aString, $aCompat | ENT_IGNORE, "ISO8859-15" );

    $HtmlTranslationTable = get_html_translation_table( HTML_ENTITIES, $aCompat );

    $TranslationTable = array();

    $TranslationTable["@"] = xmlSpecialChar("@");
    $TranslationTable["["] = xmlSpecialChar("[");
    $TranslationTable["]"] = xmlSpecialChar("]");
    $TranslationTable["'"] = xmlSpecialChar("'");

    while ( list($Key,$Value) = each($HtmlTranslationTable) )
    {
         $TranslationTable[$Value] = xmlSpecialChar($Key);
    }
    
    $Translated = strtr( $ValidString, $TranslationTable );

    if ($Translated === false)
        return $ValidString;

    return $Translated;
}

// -----------------------------------------------------------------------------

function requestToXML( $aString, $aCompat, $aCharset )
{
    return xmlentities( stripcslashes(urldecode($aString)), $aCompat, $aCharset );
}

// -----------------------------------------------------------------------------

function leadingZero10( $aValue )
{
    $Number = intval($aValue,10);
    
    if ($Number < 10)
        return "0".$Number;

    return $Number;
}

?>