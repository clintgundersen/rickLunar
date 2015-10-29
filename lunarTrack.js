var MONTH_LENGTH = 28;
var MONTHS_IN_YEAR = 12;

var MOON_ONE_CYCLE = 14;
var MOON_TWO_CYCLE = 52;

var year = jQuery('#year').value;
var month = jQuery('#month').value;
var day = jQuery('#day').value;
var backOneButton = jQuery('#yesterday');
var upOneButton = jQuery('#tomorrow');
var getPhasesButton = jQuery('#getPhases');

//values represent the state of the moons on year 1, month 1, day 1
var moonOneOffset = 6;
var moonTwoOffset = 40;

//days that have passed since 1/1/1
var totalDaysToDate = ((year * MONTHS_IN_YEAR) * MONTH_LENGTH) + (month * MONTH_LENGTH) + (day);

var moonOneTotalCyclesToDate = Math.floor(totalDaysToDate / MOON_ONE_CYCLE);
var moonTwoCyclesToDate = Math.floor(totalDaysToDate / MOON_TWO_CYCLE);

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


