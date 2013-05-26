(function( $ ) {
    $.widget( "ui.combobox", {
        options :  {
            editable : false,
            darkBackground : false,
            inlineStyle : {}
        },
        
        _create: function() {
            var SelectNode = this.element;
            var SelectedElement = this.element.children("option:selected").last();
            var SelectedIndex = this.element.children("option").index(SelectedElement);
            
            SelectNode.context.selectedIndex = SelectedIndex;
            
            var NodeId = SelectNode.attr("id");
            var Width  = SelectNode.outerWidth(true);
            var Height = Math.max(18, SelectNode.height());
            
            var ButtonWidth = 16;
            var ValueWidth = Width - ButtonWidth - 11; // subtract padding
            var ValueHeight = Height; // subtract padding
            
            this.elementId = NodeId;
            this.editWidth = ValueWidth - 4;
            
            var ValueClassName = (this.options.darkBackground) ? "combobox_value_bright" : "combobox_value_dark";
                        
            HTMLString  = "<span id=\"" + NodeId + "_combobox\" class=\"combobox\" style=\"width: "+Width+"px; height: "+Height+"px; font-size: "+(Height-6)+"px\">";
            
            HTMLString += "<div id=\"" + NodeId + "_value\" style=\"width: "+ValueWidth+"px; height: "+ValueHeight+"px; cursor: pointer!important\" "+
                          "class=\"combobox_value "+ValueClassName+" ui-button ui-widget ui-state-default ui-button-disabled ui-state-disabled ui-button-text-only ui-corner-left\">";
            HTMLString += "</div>";
            
            HTMLString += "<div id=\"" + NodeId + "_open\" style=\"width: "+ButtonWidth+"px; height: "+Height+"px\" "+
                          "class=\"combobox_open ui-button ui-widget ui-state-default ui-corner-right ui-icon ui-icon-triangle-2-n-s\">";
            HTMLString += "</div>";
            
            HTMLString += "<div id=\"" + NodeId + "_options\" class=\"combobox_list ui-corner-all\"></div>";            
            HTMLString += "</span>";
            
            SelectNode.after( HTMLString );
            SelectNode.hide();
            
            this.editable( this.options.editable );
            
            // Copy over Options and add style
            
            $("#" + NodeId + "_combobox").css(this.options.inlineStyle);
            
            SelectNode.children("option").each( function() {
            
                if ($(this).val() == "-")
                    $("#"+NodeId+ "_options").append("<div class=\"separator\"></div>");
                else
                    $("#"+NodeId+ "_options").append("<div class=\"option\">" + $(this).text() + "</div>");
            });
            
            this.optionField = $("#"+NodeId+"_options");
            this.optionField.children(".option, .separator").eq(SelectedIndex).addClass("selected");
            this.optionField.width(Math.max(this.optionField.width(),Width+4));
            
            var MaxAdditionalElements = 6;
            
            // On open
            
            $("#" + NodeId + "_open, #"+NodeId+"_value").click( function( aEvent ) {
                var ListWidth = $("#"+NodeId+"_options").width();
                
                // IE7 overlapping fix
                // All comoboboxes get z=0, current gets z=1
                {
                    $(".combobox").css("z-index", 0);
                    SelectNode.next().css("z-index", 1);
                }
                
                $(".combobox_list").hide();
                
                var SelectedElement = SelectNode.children("option:selected").last();
                var SelectedIndex = SelectNode.children("option").index(SelectedElement);
                var StartIdx = SelectedIndex;
                var EndIdx = StartIdx-MaxAdditionalElements;
                
                var ListOffset = 0;
                var ListHeight = 0;
                var ScrollOffset = 0;
                
                var OptionFields = $("#"+NodeId+"_options").children(".option, .separator");
                var Option = OptionFields.eq(StartIdx-1);
                
                // Calculate scroll/top offset and top height
                // n elements above current max.
                
                for ( var i=StartIdx-1; i >= 0; --i )
                {                    
                    var ElementHeight = Option.outerHeight(true);
                    ScrollOffset += ElementHeight;
                    
                    if (i>EndIdx)
                    {
                        ListOffset += ElementHeight;
                        ListHeight += ElementHeight;
                    }
                    
                    Option = Option.prev();
                }
                
                // Calculate bottom height
                // n elements below current max.
                
                EndIdx = Math.min(StartIdx+MaxAdditionalElements, OptionFields.length);
                Option = OptionFields.eq(StartIdx);
                
                for ( i=StartIdx; i < EndIdx; ++i )
                {
                    var ElementHeight = Option.outerHeight(true);
                    ListHeight += ElementHeight;
                    Option = Option.next();
                }
                
                // Show list

                var DisplayPosition  = $("#" + NodeId + "_value").offset();
                DisplayPosition.top -= ListOffset;

                $("#" + NodeId + "_options")
                    .css( "top", -ListOffset )
                    .height(ListHeight)
                    .show()                    
                    .scrollTop( ScrollOffset-ListOffset );

                aEvent.stopPropagation();
            });
            
            // on select
            
            this.optionField.children(".option").click( function() {
                $("#"+NodeId+"_options > .option").removeClass("selected");
                $(this).addClass("selected");

                SelectNode.context.selectedIndex = $(this).index();
                SelectNode.change();
                
                $("#"+NodeId+"_value > span").empty().append($(this).text());
                $("#"+NodeId+"_options").hide();
            });
        },

        editable: function( aEnable ) {
            this.options.editable = aEnable;
            var SelectedElement = this.element.children("option:selected").last();
            var SelectedValue = SelectedElement.text();
            
            if ( aEnable )
            {
                HTMLString = "<input id=\"" + this.elementId + "_edit\" class=\"combobox_edit\" style=\"width: "+this.editWidth+"px\" type=\"text\"/>";
                
                $("#"+this.elementId+"_value").empty().append(HTMLString);
                $("#"+this.elementId+"_edit").val( SelectedValue ).focus()
                    .click(function(aEvent) { aEvent.stopPropagation(); });
            }
            else
            {
                HTMLString = "<span class=\"combobox_valuetext\">" + SelectedValue + "</span>";
                $("#"+this.elementId+"_value").empty().append(HTMLString);
            }
        },

        destroy: function() {
            this.element.show();
            this.replacement.detach();

            $.Widget.prototype.destroy.call( this );
        }

    });
})( jQuery );

$(document).click( function() {
    $(".combobox_list").hide();
});