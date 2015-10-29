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

    var moonOneTotalCyclesToDate = Math.floor(totalDaysToDate / MOON_ONE_CYCLE);
    var moonTwoCyclesToDate = Math.floor(totalDaysToDate / MOON_TWO_CYCLE);

    function decrementDay() {
        console.log("decrementing");
    }

    function incrementDay() {
        console.log("incrementing");
    }

    function getLastNewMoonOne() {
        var newMoonOne = moonOneTotalCyclesToDate * MOON_ONE_CYCLE;
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
        day =  jQuery('#day').val();
        month = jQuery('#month').val();
        year = jQuery('#year').val();
    }

    function showMeTheCycle () {
        updateValues();
        totalDaysToDate = ((year * MONTHS_IN_YEAR) * MONTH_LENGTH) + (month * MONTH_LENGTH) + (day);
        console.log(year);
        console.log(month);
        console.log(day);

        console.log ("totalDays is: " + totalDaysToDate);

        var outputString = "working";
        output.innerHTML = "Moon One = " +
                            getCurrentCycleMoonOne() + ". " +
                            "Moon Two = " +
                            getCurrentCycleMoonTwo() + ".";
    }
});


