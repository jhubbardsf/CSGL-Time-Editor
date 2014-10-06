// ==UserScript==
// @name        CSGL TimeZone Changer
// @version     1.3
// @description Change CSGO timezones.
// @match       http://csgolounge.com/*
// @match 		http://dota2lounge.com/*
// @require     http://code.jquery.com/jquery-2.1.1.js
// @copyright   Josh Hubbard
// @namespace 	https://greasyfork.org/users/5596
// ==/UserScript==

// TODO: Dry up the code. Things need to be speeded up.

$(function () {
    var dt = new Date(),
        tzOffset = (dt.getTimezoneOffset()/60) + 2,
        AMorPM = "";
    
    $timeBox = $('.gradient').first().find('.half:eq(2)');
    
    // Converts CEST to local on match page.
    if ($timeBox.length) {
        var timeInCEST = $timeBox.text(),
            hour = timeInCEST.split(" ")[0].split(":")[0],
            minute = timeInCEST.split(" ")[0].split(":")[1];
        
        hour = hour - tzOffset;
        
        if (hour < 0) hour = 24 + hour;  
        
        if (hour == 12) {
            AMorPM = "PM";
        } else if (hour > 12) {
            hour = hour - 12;
            AMorPM = "PM";      
        } else {
            AMorPM = "AM";
        }
        
        $timeBox.html("(" + hour + ":" + minute + " " + AMorPM + ") " + $timeBox.html());
        
    }
    
    // Gets match information for all upcoming matches and converts time.
    $boxes = $(".matchmain:has(.whenm:contains('hour'):contains('from now'),.whenm:contains('minute'):contains('from now'))");
    
    $boxes.each(function(i) {
        console.log("2");
        var $this = $(this),
            link = $this.find("a[href*='match']").attr("href"),
            $whenBox =  $this.find(".whenm:first");
        
  		console.log($this);
        
        $.get(link, function(data) {
            var response = $('<html />').html(data),
                $box = response.find('.gradient').first(),
                $timeBox = $box.find('.half:eq(2)'),
                timeInCEST = $timeBox.text(),
                hour = timeInCEST.split(" ")[0].split(":")[0] - tzOffset,
                minute = timeInCEST.split(" ")[0].split(":")[1];
            
            if (hour < 0) hour = 24 + hour;  
            
            if (hour == 12) {
                AMorPM = "PM";
            } else if (hour > 12) {
                hour = hour - 12;
                AMorPM = "PM";      
            } else {
                AMorPM = "AM";
            }
            
            $whenBox.html($whenBox.html() + " (" + hour + ":" + minute + " " + AMorPM + ")");
        });
        
    });
});
