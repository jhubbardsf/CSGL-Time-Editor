
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
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
