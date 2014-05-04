var toggleCursorVisibility = function() {
    $('.cursor').toggleClass('cursorOff');
}

var cursorBlinkTimers = new Array();

var addBlink = function() {
    removeBlink();
    // cause a delay before setting the 
    (function() {
        window.setTimeout(function() { }, 3000);
    })();
    var intervalId = window.setInterval(toggleCursorVisibility, 750);

    cursorBlinkTimers.push(intervalId);
}

var removeBlink = function() {
    for (var i = 0; i < cursorBlinkTimers.length; i++) {
        window.clearInterval(cursorBlinkTimers[i]);
    }
    cursorBlinkTimers = [];
    $('.cursorOff').removeClass('cursorOff');
}