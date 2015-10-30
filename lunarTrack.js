jQuery(document).ready(function() {
    var MONTH_LENGTH = 28;
    var MONTHS_IN_YEAR = 12;

    var MOON_14_CYCLE = 14;
    var MOON_52_CYCLE = 52;

    var jYear =jQuery('#year');
    var jMonth = jQuery('#month');
    var jDay = jQuery('#day');

    var year = parseInt(jYear.val() - 1);
    var month = parseInt(jMonth.val() - 1);
    var day = parseInt(jDay.val());

    var output = jQuery('#output');

    jQuery('#yesterday').click(decrementDay);
    jQuery('#tomorrow').click(incrementDay);
    jQuery('#getPhases').click(showMeTheCycle);

    jDay.change(function(){
        var input =  parseInt(jDay.val());
        if (input <= MONTH_LENGTH && input > 0) {
            day = input;
            console.log("day updated to " + day);
        } else {
            jQuery('#day').val(day);
            console.log("no update:" + day);
        }
    });

    jMonth.change(function(){
        var input =  parseInt(jMonth.val());
        if (input <= MONTHS_IN_YEAR && input > 0) {
            month = input - 1;
            console.log("month updated to " + month);
        } else {
            jQuery('#month').val(month + 1);
            console.log("no update:" + month);
        }
    });

    jYear.change(function(){
        var input = parseInt(jYear.val());
        if (input > 0) {
            year = input -1;
            console.log("year updated to " + year + 1);
        } else {
            jQuery('#year').val(year + 1);
            console.log("no update: " + month);
        }
    });

    //values represent the state of the moons on year 1, month 1, day 1
    var moonOneOffset = 0;
    var moonTwoOffset = 0;

    //days that have passed since 1/1/1
    var totalDaysToDate;

    var moonOneCyclesToDate;
    var moonTwoCyclesToDate;

    function decrementDay() {
        console.log("decrementing");
        if ( day == 1) {
            console.log("month" + month);
            if (month == 0) {
                //drop a year
                console.log("boo, reverse new years");
                if (year >= 0) {
                    year--;
                    month = MONTHS_IN_YEAR - 1;
                    day = MONTH_LENGTH;
                    jQuery('#month').val(month + 1);
                    jQuery('#year').val(year + 1);
                } else {
                    console.log ("before the start of time. no change");
                }
            } else {
                //bacu up a new month
                month--;
                refreshGui();
                day = MONTH_LENGTH;
            }
        } else {
            day--;
        }
        jQuery('#day').val(day);
        showMeTheCycle();
    }

    function incrementDay() {
        console.log("incrementing");
        if ( day == MONTH_LENGTH) {
            console.log("month" + month);
            if (month == MONTHS_IN_YEAR -1) {
                //start a new year and a new month
                console.log("happy new years");
                year++;
                month = 0;
                day = 1;
                jQuery('#month').val(month + 1);
                jQuery('#year').val(year + 1);
            } else {
                //start a new month
                console.log("new month, from:" + month);
                month++;
                console.log("to:" + month);
                refreshGui();

                day = 1;
            }
        } else {
            day++;
        }
        jQuery('#day').val(day);
        showMeTheCycle();
    }

    function getLastNewMoon14() {
        var newMoonOne = moonOneCyclesToDate * MOON_14_CYCLE;
        return newMoonOne;
    }

    function getLastNewMoon52() {
        var newMoonTwo = moonTwoCyclesToDate * MOON_52_CYCLE;
        return newMoonTwo;
    }

    function getCurrentCycleMoon14 () {
        var currentMoonOne = totalDaysToDate - (getLastNewMoon14() + moonOneOffset);
        return currentMoonOne;
    }

    function getCurrentCycleMoon52 () {
        var currentMoonTwo = totalDaysToDate - (getLastNewMoon52() + moonTwoOffset);
        return currentMoonTwo;
    }

    function refreshGui() {
        console.log("updating values");
        jQuery('#year').val(year + 1);
        jQuery('#month').val(month + 1);
        jQuery('#day').val(day);
    }

    function showMeTheCycle () {
        console.log(year);
        console.log(month);
        console.log(day);
        var MOON_14 = "Moraeithyl";
        var MOON_52 = "Itiri'welun";

        var daysInYears = year * MONTHS_IN_YEAR * MONTH_LENGTH;
        var daysInMonths = month * MONTH_LENGTH;

        totalDaysToDate = daysInYears + daysInMonths + day;

        moonOneCyclesToDate = Math.floor(totalDaysToDate / MOON_14_CYCLE);
        moonTwoCyclesToDate = Math.floor(totalDaysToDate / MOON_52_CYCLE);

        var moon14Current = getCurrentCycleMoon14() + 1;
        var moon52Current = getCurrentCycleMoon52() + 1;

        var outputString = MOON_14 + " cycle day: " + moon14Current + ".<br>";
        outputString += getPhase(moon14Current, MOON_14_CYCLE);
        outputString += "<br><br>" + MOON_52 + " cycle day: " + moon52Current + ".<br>";
        outputString += getPhase(moon52Current, MOON_52_CYCLE);

        if (year == 1935 && month == 1 && day == 6) {
            outputString += "<br><br><br> The snow fell in sheets, running down my neck and soaking me clean through.  I was filled with doubts as I stepped off the curb,  A hover messenger nearly knocking me to the ground for my troubles.  He shook his fist and cursed as he zipped down Electric Square.  I pulled my collar tighter, it is an easy thing for a man to say he needs you to stop a war, it is another thing to do it.";
        }

        jQuery('#output').html(outputString);
    }

    function getPhase(current, cycleLength) {
        var eigth = cycleLength / 8;
        console.log("eigth for " + cycleLength + " :" + eigth);
        if (current <= eigth) {
            return "New Moon";
        }
        else if (current <= eigth) {
            return "Waxing Crescent";
        }
        else if (current <= eigth * 3) {
            return "Waxing Quarter";
        }
        else if (current <= eigth * 4) {
            return "Waxing Gibbous";
        }
        else if (current <= eigth * 5) {
            return "Full Moon";
        }
        else if (current <= eigth * 6) {
            return "Waning Gibbous";
        }
        else if (current <=  eigth * 7) {
            return "Waning Quarter";
        }
        else if (current <= eigth * 8) {
            return "Waning Crescent";
        }
    }
});


