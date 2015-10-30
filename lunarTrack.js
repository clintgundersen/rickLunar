jQuery(document).ready(function() {
    var MONTH_LENGTH = 28;
    var MONTHS_IN_YEAR = 12;

    var MOON_ONE_CYCLE = 14;
    var MOON_TWO_CYCLE = 52;

    var year;
    var month;
    var day;

    var output = jQuery('#output');

    jQuery('#yesterday').click(decrementDay);
    jQuery('#tomorrow').click(incrementDay);
    jQuery('#getPhases').click(showMeTheCycle);

    //values represent the state of the moons on year 1, month 1, day 1
    var moonOneOffset = 0;
    var moonTwoOffset = 0;

    //days that have passed since 1/1/1
    var totalDaysToDate;

    var moonOneCyclesToDate;
    var moonTwoCyclesToDate;

    function decrementDay() {
        updateValues();
        console.log("decrementing");
        jQuery('#day').val(parseInt(day - 1));
        updateValues();
        showMeTheCycle();
    }

    function incrementDay() {
        updateValues();
        console.log("incrementing");
        if ( day == MONTH_LENGTH) {
            if (month == MONTHS_IN_YEAR) {
                //start a new year and a new month
                console.log("happy new years");
                year++;
                month = 1;
                day = 1;
            } else {
                //start a new month
                console.log("new month, from:" + month);
                month = month + 2; //to offset the -1 to account for no year 0
                console.log("to:" + month);
                day = 1;
            }
        } else {
            day++;
        }
        jQuery('#day').val(day);
        updateValues();
        showMeTheCycle();
    }

    function getLastNewMoonOne() {
        var newMoonOne = moonOneCyclesToDate * MOON_ONE_CYCLE;
        return newMoonOne;
    }

    function getLastNewMoonTwo() {
        var newMoonTwo = moonTwoCyclesToDate * MOON_TWO_CYCLE;
        return newMoonTwo;
    }

    function getCurrentCycleMoonOne () {
        var currentMoonOne = totalDaysToDate - (getLastNewMoonOne() + moonOneOffset);
        return currentMoonOne;
    }

    function getCurrentCycleMoonTwo () {
        var currentMoonTwo = totalDaysToDate - (getLastNewMoonTwo() + moonTwoOffset);
        return currentMoonTwo;
    }

    function updateValues() {
        year = parseInt(jQuery('#year').val()) - 1;
        month = parseInt(jQuery('#month').val()) - 1;
        day =  parseInt(jQuery('#day').val());
    }

    function showMeTheCycle () {
        updateValues();
        console.log(year);
        console.log(month);
        console.log(day);

        var daysInYears = year * MONTHS_IN_YEAR * MONTH_LENGTH;
        console.log ("days in the years:" + daysInYears);
        var daysInMonths = month * MONTH_LENGTH;
        console.log ("days in the months:" + daysInMonths);
        console.log ("days in the days:" + day);

        totalDaysToDate = daysInYears + daysInMonths + day;
        console.log ("totalDays is: " + totalDaysToDate);

        moonOneCyclesToDate = Math.floor(totalDaysToDate / MOON_ONE_CYCLE);
        moonTwoCyclesToDate = Math.floor(totalDaysToDate / MOON_TWO_CYCLE);

        console.log ("moon One Cycles:" + moonOneCyclesToDate);
        console.log ("moon Two Cycles:" + moonTwoCyclesToDate);

        console.log ("last new One:" + getLastNewMoonOne());
        console.log ("last new Two:" + getLastNewMoonTwo());

        console.log("current cycle one:" + getCurrentCycleMoonOne());
        console.log("current cycle two:" + getCurrentCycleMoonTwo());
    }
});


