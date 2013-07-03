/*
 * jQuery uiSelect Plugin
 * http://www.adamleder.com/sandbox/jquery.uiSelect.1.6/
 *
 * Copyright (c) 2010 Adam Leder
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://docs.jquery.com/License
 *
 * @version 1.6
 */
(function($) {
	$.fn.extend({uiSelect: function(options, menuID, inputID) {
		// Select menu to be customized
		var $thisSelect = $(this);
		// Value of the select menu before uiSelect is applied
		var $uiValue;
		
		// Determine if an option is preslected
		// if so, set the value of the uiSelect input with it
		if ($thisSelect.find('option:selected').length){
			// Retrive the value of the selected option
			$uiValue = $thisSelect.find('option:selected').text();
		}else{
			$uiValue = "";
		}
		
		
		var uiInputStyle = {"z-index": 1};
		// Default values for uiSelect
		var defaults = {leftOffset: 0,topOffset: 0,addRequired: false,requiredClass: 'required'};
		// Extened the default values with the user inputted ones
		var options = $.extend(defaults, options);
		// Container to store the slidedown menu options
		var uiMenu = $("<div/>", {id: menuID,
								"class": "uiSelect",
								css: {position: "absolute",display: "none",zIndex: 1000}
						});
		// Input which will trigger the slidedown menu 
		// and store the select menu value
		var uiInput = $("<input/>", {id: inputID,
									'class': 'uiInput' + (options.addRequired == true ? ' ' + options.requiredClass : ''),
									name: inputID,
									css: {position: "relative"},
									value: $uiValue
							});
		// Unordered list to hold off of the options from the select menu
		var uiOptionMenu = $("<ul/>", {"class": "uiOptionMenu",
										css: {position: "relative"}
								});
								
// Return the select menu with uiSelect applied
return this.each(function() {
			// Select menu to have uiSelect applied
			var obj = $(this).attr("id");
			// Options to be applied both default and user passed
			var o = options;
			// An array to store each options text value
			
			// ----------
			var optionTexts = [];
			// Loop through each <option> and push the text value
			// to the optionText array
			var menu = $("#" + obj + " option").each(function() {
			    optionTexts.push($(this).text());
			});
			// -------------
			
			// Append the uiInput field to the DOM 
			// after select menu uiSelect is getting applied to
			$("#" + obj).after(uiInput);
			// Append the uiMenu div after the 
			// previously added uiInput
			$("#" + inputID).after(uiMenu);
			// Append and empty <ul> which will hold
			// the options pulled from the select menu
			$("#" + menuID).append(uiOptionMenu);

			// Loop through select menu options and
			// add them to the uiOptionMenu list
			$("#" + obj + " option").each(function(){
				var uiOption = $('<li><a href="#">' + $(this).text() + "</a></li>");
				$("#" + menuID + " .uiOptionMenu").append(uiOption);
			});
			
			// Hide the select menu
			$("#" + obj).css("display", "none");
			
			// Position the uiMenu and slide it down when
			// the uiInput is clicked
			$("#" + inputID).css(uiInputStyle).click(function() {
				// Slide up all uiSlect menus that isn't the current one
				$("div.uiSelect").not("#" + menuID).slideUp("fast");
				// Click uiInput
				var $this = $(this);
				// Stores the position of the click uiInput
				var position = $this.position();
				// Stores the height of the uiInput
				var uiHeight = parseInt($this.css("height")) + 10;
				
				// Determine if the user changed the topOffset
				if (o.topOffset == 0) {
					uiHeight = uiHeight;
				} else {
					uiHeight = uiHeight + o.topOffset;
				}
			
				// Position the uiMenu based on option settings
				$("#" + menuID).css({left: (position.left + o.leftOffset) + "px",top: (position.top + uiHeight) + "px"});
				// Slide the menu down
				$("#" + menuID).slideDown();
				return false;
			}).live("keydown", function() {
				// If the user tries to type in uiInput
				// lose focus and slide the uiMenu up
				$("#" + inputID).blur();
				$("#" + menuID).slideUp("fast");
			});
			
			// Slide up the uiMenu when anythng is clicked
			$("*").live("click", function() {
				$("#" + menuID).slideUp("fast");
			});
			
			// Set the value of select menu with the text value
			// of uiMenu <a> when clicked
			$("#" + menuID + " a").click(function() {
				// Set the value of uiInput
				$("#" + inputID).val($(this).text());
				// Set the value of the orginal select menu
				$thisSelect.val($(this).text());
				// Slide up uiMenu
				$("#" + menuID).fadeOut("fast");
				return false;
			});
			
			// Fix to solve z-index problem on IE7 and IE6
			if ($.browser.msie && $.browser.version.substr(0,1)<8) {
				var ieV=$.browser.version.substr(0,1);
				var zIndexNumber = 1000;
				
				$('div').each(function() {
					$(this).css('zIndex', zIndexNumber);
					zIndexNumber -= 10;
				});
			}
       });
   }});
})(jQuery);