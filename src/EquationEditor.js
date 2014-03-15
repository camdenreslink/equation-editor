"use strict";
var mouseDown = false;
var intervalId;
var shiftPressed = false;

eqEd.keycodeLowercase = {
        48: '0',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        54: '6',
        55: '7',
        56: '8',
        57: '9',
        65: 'a',
        66: 'b',
        67: 'c',
        68: 'd',
        69: 'e',
        70: 'f',
        71: 'g',
        72: 'h',
        73: 'i',
        74: 'j',
        75: 'k',
        76: 'l',
        77: 'm',
        78: 'n',
        79: 'o',
        80: 'p',
        81: 'q',
        82: 'r',
        83: 's',
        84: 't',
        85: 'u',
        86: 'v',
        87: 'w',
        88: 'x',
        89: 'y',
        90: 'z',
        186: ';',
        //187: '=',
        188: ',',
        //189: '-',
        190: '.',
     //   191: '/',
        192: '`',
      //  219: '[',
        220: '\\',
       // 221: ']',
        222: '\''
};

eqEd.keycodeUppercase = {
        //48: ')',
        49: '!',
        50: '@',
        51: '#',
        52: '$',
        53: '%',
        54: '^',
        55: '&',
        //56: '*',
        //57: '(',
        65: 'A',
        66: 'B',
        67: 'C',
        68: 'D',
        69: 'E',
        70: 'F',
        71: 'G',
        72: 'H',
        73: 'I',
        74: 'J',
        75: 'K',
        76: 'L',
        77: 'M',
        78: 'N',
        79: 'O',
        80: 'P',
        81: 'Q',
        82: 'R',
        83: 'S',
        84: 'T',
        85: 'U',
        86: 'V',
        87: 'W',
        88: 'X',
        89: 'Y',
        90: 'Z',
        186: ':',
       // 187: '+',
       // 188: '<',
        189: '_',
       // 190: '>',
        191: '?',
        192: '~',
       // 219: '{',
        220: '|',
        //221: '}',
        222: '\"'
};

// This function will hopefully create jquery objects, and javascript objects for an already
// existing html structure representing an equation.  Needs completed.
eqEd.initializeFromNodeDown = function(topLevelNode) {
    var calculateNestingFromNode = function(jQueryObject) {
            var nesting = 0;
            var currentLevel = container;
            while (topLevelNode !== jQueryObject) {
                nesting += 1;
                currentLevel = currentLevel.parent();
            }
            return nesting;
    }

    var containers = topLevelNode.find('.container').andSelf().filter('.container');
    var nestingDepths = [];
    containers.each(function (index) {
        nestingDepths[index] = [index, calculateNestingFromNode($(this))];
    });
    nestingDepths.sort((function (index) {
        return function (a, b) {
            return (a[index] == b[index] ? 0 : (a[index] > b[index] ? -1 : 1));
        };
    })(1));
}

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

function preload(arrayOfImages) {
    $(arrayOfImages).each(function () {
        $('<img />').attr('src',this).appendTo('body').css('display','none');
    });
}

// Usage:

preload(['Images/radical.png', 'Images/radicalHighlight.png', 'Images/radicalDiagonalLine.png', 'Images/radicalDiagonalLineHighlight.png', 'Images/additionOperator.png', 'Images/additionOperatorHighlight.png', 'Images/subtractionOperator.png', 'Images/subtractionOperatorHighlight.png', 'Images/dotProductOperator.png', 'Images/dotProductOperatorHighlight.png', 'Images/equalOperator.png', 'Images/equalOperatorHighlight.png', 'Images/greaterThanOrEqualToOperator.png', 'Images/greaterThanOrEqualToOperatorHighlight.png', 'Images/lessThanOrEqualToOperator.png', 'Images/lessThanOrEqualToOperatorHighlight.png', 'Images/parenthesesLeftBracket.png', 'Images/parenthesesLeftBracketHighlight.png', 'Images/parenthesesRightBracket.png', 'Images/parenthesesRightBracketHighlight.png', 'Images/curlyLeftBracket.png', 'Images/curlyLeftBracketHighlight.png', 'Images/curlyRightBracket.png', 'Images/curlyRightBracketHighlight.png', 'Images/squareLeftBracket.png', 'Images/squareLeftBracketHighlight.png', 'Images/squareRightBracket.png', 'Images/squareRightBracketHighlight.png', "Images/sumOperator.png", "Images/sumOperatorHighlight.png"]);
//alert("images are loaded!");
$(window).load( function () {
    var symbolSizeConfig = null;

    // This code ensures that all font-family fonts are loaded before doing config calculations.
    $('.testContainer').append('<div class="fontSizeNormal fontItalic fontTest" id="fontTestItalic">a</div>');
    $('.testContainer').append('<div class="fontSizeNormal fontNormal fontTest" id="fontTestNormal">a</div>');
    var initialWidthItalic = $('#fontTestItalic').outerWidth();
    var initialWidthNormal = $('#fontTestNormal').outerWidth();
    var checkFontCounter = 0;
    var checkIfFontsLoaded = function() {
        //alert("Check Fonts Called...");
        var newWidthItalic = $('#fontTestItalic').outerWidth();
        var newWidthNormal = $('#fontTestNormal').outerWidth();
        if ((Math.abs(newWidthItalic - initialWidthItalic) > 1) && (Math.abs(newWidthNormal - initialWidthNormal) > 1)) {
            window.clearInterval(intervalId);
            symbolSizeConfig = new eqEd.SymbolSizeConfiguration();
            $('#fontTestItalic').remove();
            $('#fontTestNormal').remove();
            // remove this line when I figure out how I'm initializing equations
            setupContainer();
        } else if (checkFontCounter > 12) {
            window.clearInterval(intervalId);
            symbolSizeConfig = new eqEd.SymbolSizeConfiguration();
            $('#fontTestItalic').remove();
            $('#fontTestNormal').remove();
            // remove this line when I figure out how I'm initializing equations
            setupContainer();
        }
        checkFontCounter = checkFontCounter + 1;
    }
    //alert("before checkIfFontsLoaded");
    var intervalId = window.setInterval(checkIfFontsLoaded, 250);
    var cursor = new eqEd.Cursor();
    var highlight = new eqEd.Highlight();

    // This is just so I have a container to start with...this will have to get replaced with something else in the future //
    var container;
    var setupContainer = function() {
        //alert("after checkIfFontsLoaded, begin setupContainer");
        container = new eqEd.Container(symbolSizeConfig);
        container.jQueryObject = $('.container').first();
        container.jQueryObject.data("eqObject", container);
        container.fontSize = "fontSizeNormal";
        //var squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(symbolSizeConfig);
        //container.addWrappers([0, squareEmptyContainerWrapper]);
        var topLevelEmptyContainerWrapper = new eqEd.TopLevelEmptyContainerWrapper(symbolSizeConfig);
        container.addWrappers([0, topLevelEmptyContainerWrapper]);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // The following definition is for the blinking cursor.
    var toggleCursorVisibility = function() {
        $('#cursor').toggleClass('cursorOff');
    }

    var cursorBlinkTimers = new Array();

    var addBlink = function() {
        removeBlink();
        // cause a delay before setting the 
        (function() {
            window.setTimeout(function() { }, 3000);
        })();
        intervalId = window.setInterval(toggleCursorVisibility, 750);

        cursorBlinkTimers.push(intervalId);
    }

    var removeBlink = function() {
        for (var i = 0; i < cursorBlinkTimers.length; i++) {
            window.clearInterval(cursorBlinkTimers[i]);
        }
        cursorBlinkTimers = [];
        $('#cursor').removeClass('cursorOff');
    }

    $(document).on('keydown', function (e) {
        if ($('#cursor').length > 0 || highlight.endIndex !== null) {
            e.preventDefault();

            if (e.which == 16) {
                shiftPressed = true;
            } else {
                removeBlink();
            }

            if ($('#cursor').length > 0) {
                var container = cursor.parent;
                var character = null;
                if (eqEd.keycodeLowercase[e.which] !== undefined && !shiftPressed) {
                    character = eqEd.keycodeLowercase[e.which];
                } else if (eqEd.keycodeUppercase[e.which] !== undefined && shiftPressed) {
                    character = eqEd.keycodeUppercase[e.which];
                }
                if (character !== null) {
                    var symbolWrapper = new eqEd.SymbolWrapper(symbolSizeConfig, character);
                    if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                        container = container.parent.parent;
                        container.removeWrappers(0);
                        cursor.addCursor(container);
                        cursor.parent.jQueryObject.addClass('activeContainer');
                    }
                    if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                        container.removeWrappers(0);
                    }
                    container.addWrappers([cursor.index, symbolWrapper]);
                    cursor.moveRight();
                }
            } else if ($('.highlighted').length > 0) {
                var container = highlight.parent;
                var character = null;
                if (eqEd.keycodeLowercase[e.which] !== undefined && !shiftPressed) {
                    character = eqEd.keycodeLowercase[e.which];
                } else if (eqEd.keycodeUppercase[e.which] !== undefined && shiftPressed) {
                    character = eqEd.keycodeUppercase[e.which];
                }
                if (character !== null) {
                    var symbolWrapper = new eqEd.SymbolWrapper(symbolSizeConfig, character);
                    var deleteWrappers;
                    if (highlight.startIndex < highlight.endIndex) {
                        deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
                    } else {
                        deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
                    }
                    eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
                    var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
                    container.addWrappers([insertIndex, symbolWrapper]);
                    cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
                    cursor.addCursor(container);
                    highlight.removeHighlight();
                }
            }

            switch (e.which) {
                case 8: // backspace
                    if ($('.highlighted').length === 0) {
                        if (cursor.index !== 0 && $('#cursor').length > 0) {
                            cursor.parent.removeWrappers(cursor.index - 1);
                            cursor.moveLeft();
                        }
                    } else {
                        var deleteWrappers;
                        if (highlight.startIndex < highlight.endIndex) {
                            deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
                        } else {
                            deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
                        }
                        eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
                        cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
                        cursor.addCursor(highlight.parent);
                        highlight.removeHighlight();
                        cursor.parent.jQueryObject.addClass('activeContainer');
                    }
                    if (cursor.parent.wrappers.length === 0) {
                        if (!cursor.parent.jQueryObject.parent().hasClass('wrapper')) {
                            var topLevelEmptyContainerWrapper = new eqEd.TopLevelEmptyContainerWrapper(symbolSizeConfig);
                            topLevelEmptyContainerWrapper.jQueryObject.css('background', '#DEDEDE');
                            cursor.parent.addWrappers([0, topLevelEmptyContainerWrapper]);
                            cursor.index = 0;
                            cursor.updateFormatting();
                        } else {
                            var squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(symbolSizeConfig);
                            cursor.parent.addWrappers([0, squareEmptyContainerWrapper]);
                            cursor.index = 0;
                            cursor.addCursor(squareEmptyContainerWrapper.squareEmptyContainer);
                            $('.activeContainer').removeClass('activeContainer');
                            cursor.parent.jQueryObject.addClass('activeContainer');
                        }
                    }
                    break;
                case 37: // left
                    if ($('#cursor').length > 0) {
                        cursor.moveLeft();
                    }
                    break;
                case 38: // up
                    var x = 2;
                    break;
                case 39: // right
                    if ($('#cursor').length > 0) {
                        cursor.moveRight();
                    }
                    break;
                case 40: // down
                    var x = 2;
                    break;
                case 46: // delete
                    if ($('.highlighted').length === 0) {
                        if (cursor.index !== cursor.parent.wrappers.length 
                                && $('#cursor').length > 0 
                                && !cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                            cursor.parent.removeWrappers(cursor.index);
                            cursor.updateFormatting();
                        }
                    } else {
                        var deleteWrappers;
                        if (highlight.startIndex < highlight.endIndex) {
                            deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
                        } else {
                            deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
                        }
                        eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
                        cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
                        cursor.addCursor(highlight.parent);
                        highlight.removeHighlight();
                        cursor.parent.jQueryObject.addClass('activeContainer');
                    }
                    if (cursor.parent.wrappers.length === 0) {
                        if (!cursor.parent.jQueryObject.parent().hasClass('wrapper')) {
                            var topLevelEmptyContainerWrapper = new eqEd.TopLevelEmptyContainerWrapper(symbolSizeConfig);
                            topLevelEmptyContainerWrapper.jQueryObject.css('background', '#DEDEDE');
                            cursor.parent.addWrappers([0, topLevelEmptyContainerWrapper]);
                            cursor.index = 0;
                            cursor.updateFormatting();
                        } else {
                            var squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(symbolSizeConfig);
                            cursor.parent.addWrappers([0, squareEmptyContainerWrapper]);
                            cursor.index = 0;
                            cursor.addCursor(squareEmptyContainerWrapper.squareEmptyContainer);
                            $('.activeContainer').removeClass('activeContainer');
                            cursor.parent.jQueryObject.addClass('activeContainer');
                        }
                    }
                    break;
                case 48:
                    if ($('#cursor').length > 0) {
                        var container = cursor.parent;
                        var bracketWrapper;
                        if (shiftPressed) {
                            bracketWrapper = new eqEd.RightBracketWrapper(symbolSizeConfig, "rightParenthesis");
                        } else {
                            break;
                        }

                        if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                            container = container.parent.parent;
                            container.removeWrappers(0);
                            cursor.addCursor(container);
                            cursor.parent.jQueryObject.addClass('activeContainer');
                        }
                        if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                            container.removeWrappers(0);
                        }
                        container.addWrappers([cursor.index, bracketWrapper]);
                        cursor.moveRight();
                    } else if ($('.highlighted').length > 0) {
                        var container = highlight.parent;
                        var bracketWrapper;
                        if (shiftPressed) {
                            bracketWrapper = new eqEd.RightBracketWrapper(symbolSizeConfig, "rightParenthesis");
                        } else {
                            break;
                        }

                        var deleteWrappers;
                        if (highlight.startIndex < highlight.endIndex) {
                            deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
                        } else {
                            deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
                        }
                        eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
                        var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
                        container.addWrappers([insertIndex, bracketWrapper]);
                        cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
                        cursor.addCursor(container);
                        highlight.removeHighlight();
                    }
                    break;
                case 56:
                    if ($('#cursor').length > 0) {
                        var container = cursor.parent;
                        var operatorWrapper;
                        if (shiftPressed) {
                            operatorWrapper = new eqEd.OperatorWrapper(symbolSizeConfig, "dotProduct");
                        } else {
                            break;
                        }

                        if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                            container = container.parent.parent;
                            container.removeWrappers(0);
                            cursor.addCursor(container);
                            cursor.parent.jQueryObject.addClass('activeContainer');
                        }
                        if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                            container.removeWrappers(0);
                        }
                        container.addWrappers([cursor.index, operatorWrapper]);
                        cursor.moveRight();
                    } else if ($('.highlighted').length > 0) {
                        var container = highlight.parent;
                        var operatorWrapper;
                        if (shiftPressed) {
                            operatorWrapper = new eqEd.OperatorWrapper(symbolSizeConfig, "dotProduct");
                        } else {
                            break;
                        }

                        var deleteWrappers;
                        if (highlight.startIndex < highlight.endIndex) {
                            deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
                        } else {
                            deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
                        }
                        eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
                        var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
                        container.addWrappers([insertIndex, operatorWrapper]);
                        cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
                        cursor.addCursor(container);
                        highlight.removeHighlight();
                    }
                    break;
                case 57:
                    if ($('#cursor').length > 0) {
                        var container = cursor.parent;
                        var bracketWrapper;
                        if (shiftPressed) {
                            bracketWrapper = new eqEd.LeftBracketWrapper(symbolSizeConfig, "leftParenthesis");
                        } else {
                            break;
                        }

                        if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                            container = container.parent.parent;
                            container.removeWrappers(0);
                            cursor.addCursor(container);
                            cursor.parent.jQueryObject.addClass('activeContainer');
                        }
                        if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                            container.removeWrappers(0);
                        }
                        container.addWrappers([cursor.index, bracketWrapper]);
                        cursor.moveRight();
                    } else if ($('.highlighted').length > 0) {
                        var container = highlight.parent;
                        var bracketWrapper;
                        if (shiftPressed) {
                            bracketWrapper = new eqEd.LeftBracketWrapper(symbolSizeConfig, "leftParenthesis");
                        } else {
                            break;
                        }

                        var deleteWrappers;
                        if (highlight.startIndex < highlight.endIndex) {
                            deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
                        } else {
                            deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
                        }
                        eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
                        var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
                        container.addWrappers([insertIndex, bracketWrapper]);
                        cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
                        cursor.addCursor(container);
                        highlight.removeHighlight();
                    }
                    break;
                case 61:
                case 187:
                    if ($('#cursor').length > 0) {
                        var container = cursor.parent;
                        var operatorWrapper;
                        if (shiftPressed) {
                            operatorWrapper = new eqEd.OperatorWrapper(symbolSizeConfig, "addition");
                        } else {
                            operatorWrapper = new eqEd.OperatorWrapper(symbolSizeConfig, "equal");
                        }

                        if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                            container = container.parent.parent;
                            container.removeWrappers(0);
                            cursor.addCursor(container);
                            cursor.parent.jQueryObject.addClass('activeContainer');
                        }
                        if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                            container.removeWrappers(0);
                        }
                        container.addWrappers([cursor.index, operatorWrapper]);
                        cursor.moveRight();
                    } else if ($('.highlighted').length > 0) {
                        var container = highlight.parent;
                        var operatorWrapper;
                        if (shiftPressed) {
                            operatorWrapper = new eqEd.OperatorWrapper(symbolSizeConfig, "addition");
                        } else {
                            operatorWrapper = new eqEd.OperatorWrapper(symbolSizeConfig, "equal");
                        }

                        var deleteWrappers;
                        if (highlight.startIndex < highlight.endIndex) {
                            deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
                        } else {
                            deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
                        }
                        eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
                        var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
                        container.addWrappers([insertIndex, operatorWrapper]);
                        cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
                        cursor.addCursor(container);
                        highlight.removeHighlight();
                    }
                    break;
                case 188:
                    if ($('#cursor').length > 0) {
                        var container = cursor.parent;
                        var operatorWrapper;
                        if (shiftPressed) {
                            operatorWrapper = new eqEd.OperatorWrapper(symbolSizeConfig, "lessThan");
                        } else {
                            break;
                        }

                        if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                            container = container.parent.parent;
                            container.removeWrappers(0);
                            cursor.addCursor(container);
                            cursor.parent.jQueryObject.addClass('activeContainer');
                        }
                        if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                            container.removeWrappers(0);
                        }
                        container.addWrappers([cursor.index, operatorWrapper]);
                        cursor.moveRight();
                    } else if ($('.highlighted').length > 0) {
                        var container = highlight.parent;
                        var operatorWrapper;
                        if (shiftPressed) {
                            operatorWrapper = new eqEd.OperatorWrapper(symbolSizeConfig, "lessThan");
                        } else {
                            break;
                        }

                        var deleteWrappers;
                        if (highlight.startIndex < highlight.endIndex) {
                            deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
                        } else {
                            deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
                        }
                        eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
                        var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
                        container.addWrappers([insertIndex, operatorWrapper]);
                        cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
                        cursor.addCursor(container);
                        highlight.removeHighlight();
                    }
                    break;
                case 173:
                case 189:
                    if ($('#cursor').length > 0) {
                        var container = cursor.parent;
                        var operatorWrapper;
                        if (shiftPressed) {
                            break;
                        } else {
                            operatorWrapper = new eqEd.OperatorWrapper(symbolSizeConfig, "subtraction");
                        }

                        if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                            container = container.parent.parent;
                            container.removeWrappers(0);
                            cursor.addCursor(container);
                            cursor.parent.jQueryObject.addClass('activeContainer');
                        }
                        if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                            container.removeWrappers(0);
                        }
                        container.addWrappers([cursor.index, operatorWrapper]);
                        cursor.moveRight();
                    } else if ($('.highlighted').length > 0) {
                        var container = highlight.parent;
                        var operatorWrapper;
                        if (shiftPressed) {
                            break;
                        } else {
                            operatorWrapper = new eqEd.OperatorWrapper(symbolSizeConfig, "subtraction");
                        }

                        var deleteWrappers;
                        if (highlight.startIndex < highlight.endIndex) {
                            deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
                        } else {
                            deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
                        }
                        eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
                        var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
                        container.addWrappers([insertIndex, operatorWrapper]);
                        cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
                        cursor.addCursor(container);
                        highlight.removeHighlight();
                    }
                    break;
                case 190:
                    if ($('#cursor').length > 0) {
                        var container = cursor.parent;
                        var operatorWrapper;
                        if (shiftPressed) {
                            operatorWrapper = new eqEd.OperatorWrapper(symbolSizeConfig, "greaterThan");
                        } else {
                            break;
                        }

                        if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                            container = container.parent.parent;
                            container.removeWrappers(0);
                            cursor.addCursor(container);
                            cursor.parent.jQueryObject.addClass('activeContainer');
                        }
                        if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                            container.removeWrappers(0);
                        }
                        container.addWrappers([cursor.index, operatorWrapper]);
                        cursor.moveRight();
                    } else if ($('.highlighted').length > 0) {
                        var container = highlight.parent;
                        var operatorWrapper;
                        if (shiftPressed) {
                            operatorWrapper = new eqEd.OperatorWrapper(symbolSizeConfig, "greaterThan");
                        } else {
                            break;
                        }

                        var deleteWrappers;
                        if (highlight.startIndex < highlight.endIndex) {
                            deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
                        } else {
                            deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
                        }
                        eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
                        var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
                        container.addWrappers([insertIndex, operatorWrapper]);
                        cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
                        cursor.addCursor(container);
                        highlight.removeHighlight();
                    }
                    break;
                case 191:
                    if ($('#cursor').length > 0) {
                        var container = cursor.parent;
                        var operatorWrapper;
                        if (shiftPressed) {
                            break;
                        } else {
                            operatorWrapper = new eqEd.OperatorWrapper(symbolSizeConfig, "division");
                        }

                        if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                            container = container.parent.parent;
                            container.removeWrappers(0);
                            cursor.addCursor(container);
                            cursor.parent.jQueryObject.addClass('activeContainer');
                        }
                        if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                            container.removeWrappers(0);
                        }
                        container.addWrappers([cursor.index, operatorWrapper]);
                        cursor.moveRight();
                    } else if ($('.highlighted').length > 0) {
                        var container = highlight.parent;
                        var operatorWrapper;
                        if (shiftPressed) {
                            break;
                        } else {
                            operatorWrapper = new eqEd.OperatorWrapper(symbolSizeConfig, "division");
                        }

                        var deleteWrappers;
                        if (highlight.startIndex < highlight.endIndex) {
                            deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
                        } else {
                            deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
                        }
                        eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
                        var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
                        container.addWrappers([insertIndex, operatorWrapper]);
                        cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
                        cursor.addCursor(container);
                        highlight.removeHighlight();
                    }
                    break;
                case 219:
                    if ($('#cursor').length > 0) {
                        var container = cursor.parent;
                        var bracketWrapper;
                        if (shiftPressed) {
                            bracketWrapper = new eqEd.LeftBracketWrapper(symbolSizeConfig, "leftCurly");
                        } else {
                            bracketWrapper = new eqEd.LeftBracketWrapper(symbolSizeConfig, "leftSquare");
                        }

                        if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                            container = container.parent.parent;
                            container.removeWrappers(0);
                            cursor.addCursor(container);
                            cursor.parent.jQueryObject.addClass('activeContainer');
                        }
                        if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                            container.removeWrappers(0);
                        }
                        container.addWrappers([cursor.index, bracketWrapper]);
                        cursor.moveRight();
                    } else if ($('.highlighted').length > 0) {
                        var container = highlight.parent;
                        var bracketWrapper;
                        if (shiftPressed) {
                            bracketWrapper = new eqEd.LeftBracketWrapper(symbolSizeConfig, "leftCurly");
                        } else {
                            bracketWrapper = new eqEd.LeftBracketWrapper(symbolSizeConfig, "leftSquare");
                        }

                        var deleteWrappers;
                        if (highlight.startIndex < highlight.endIndex) {
                            deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
                        } else {
                            deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
                        }
                        eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
                        var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
                        container.addWrappers([insertIndex, bracketWrapper]);
                        cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
                        cursor.addCursor(container);
                        highlight.removeHighlight();
                    }
                    break;
                case 221:
                    if ($('#cursor').length > 0) {
                        var container = cursor.parent;
                        var bracketWrapper;
                        if (shiftPressed) {
                            bracketWrapper = new eqEd.RightBracketWrapper(symbolSizeConfig, "rightCurly");
                        } else {
                            bracketWrapper = new eqEd.RightBracketWrapper(symbolSizeConfig, "rightSquare");
                        }

                        if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                            container = container.parent.parent;
                            container.removeWrappers(0);
                            cursor.addCursor(container);
                            cursor.parent.jQueryObject.addClass('activeContainer');
                        }
                        if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                            container.removeWrappers(0);
                        }
                        container.addWrappers([cursor.index, bracketWrapper]);
                        cursor.moveRight();
                    } else if ($('.highlighted').length > 0) {
                        var container = highlight.parent;
                        var bracketWrapper;
                        if (shiftPressed) {
                            bracketWrapper = new eqEd.RightBracketWrapper(symbolSizeConfig, "rightCurly");
                        } else {
                            bracketWrapper = new eqEd.RightBracketWrapper(symbolSizeConfig, "rightSquare");
                        }

                        var deleteWrappers;
                        if (highlight.startIndex < highlight.endIndex) {
                            deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
                        } else {
                            deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
                        }
                        eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
                        var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
                        container.addWrappers([insertIndex, bracketWrapper]);
                        cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
                        cursor.addCursor(container);
                        highlight.removeHighlight();
                    }
                    break;
            }
        }
    });

    $(document).on('keyup', function (e) {
        if (e.which == 16) {
            shiftPressed = false;
        };
        if ($('#cursor').length > 0) {
            addBlink();
        }
    });

    //// This section has code for mouse interactions.
    var clearHighlighted = function () {
        var isHighlighted;
        if (window.getSelection) {
            isHighlighted = (window.getSelection().toString().length > 0);
        } else if (document.selection && document.selection.type != "Control") {
            // To accommodate IE prior to IE9
            isHighlighted = (document.selection.createRange().text.length > 0);
        }
        //If text somehow gets selected, clear it on mouse move
        if (isHighlighted) {
            if (window.getSelection) {
                if (window.getSelection().empty) { // Chrome
                    window.getSelection().empty();
                } else if (window.getSelection().removeAllRanges) { // Firefox
                    window.getSelection().removeAllRanges();
                }
            } else if (document.selection) { // IE
                if (document.selection.empty) {
                    document.selection.empty();
                }
            }
        }
    }

    $(document).on('mousedown', function(e) {
        mouseDown = true;
        cursor.removeCursor();
        highlight.removeHighlight();
        clearHighlighted();
        $('.activeContainer').removeClass('activeContainer');
        $('.topLevelEmptyContainerWrapper').css('background', '#EDEDED');
        removeBlink();
    })

    $(document).on('mousedown', '.container', function(e) {
        if (!$(this).children().first().hasClass('squareEmptyContainerWrapper')) {
            e.preventDefault();
            e.stopPropagation();

            mouseDown = true;

            removeBlink();
            highlight.removeHighlight();
            cursor.removeCursor();
            $('.activeContainer').removeClass('activeContainer');

            $(this).addClass('activeContainer');
            var container = $(this).data("eqObject");
            /*** This section is used to calculate toggle lines ***/ 
            var widths = _.map(container.wrappers, function(x) {
                return x.width;
            });
            var cumulative = 0;
            var prevHalfWidth = 0;
            cursor.toggleLines = _.map(widths, function(x){ 
                cumulative += 0.5 * x + prevHalfWidth;
                prevHalfWidth = 0.5 * x;
                return cumulative;
            });
            /*** ***/
            var characterClickPos = e.pageX - container.jQueryObject.offset().left;
            var index = cursor.calculateIndex(characterClickPos);
            if (container.jQueryObject.children().first().hasClass('topLevelEmptyContainerWrapper')) {
                container.jQueryObject.children().first().css("background", "#DEDEDE");
                index = 0;
            }
            if (!container.jQueryObject.hasClass('squareEmptyContainer') && !container.jQueryObject.hasClass('topLevelEmptyContainer')) {
                // Set up information for the possibility of highlighting.
                highlight.startIndex = index;
                highlight.endIndex = index;
                highlight.addHighlight(container);
            }
            cursor.index = index;
            cursor.addCursor(container);
        }
    });

    $(document).on('mouseup', function(e) {
        mouseDown = false;
        if ($('#cursor').length > 0) {
            addBlink();
        }
    })
    
    $(document).on('mousemove', '.container', function(e) {
        if (mouseDown) {
            clearHighlighted();
        }
        if (mouseDown 
            && !$(this).children().first().hasClass('squareEmptyContainerWrapper') 
            && !$(this).hasClass('squareEmptyContainer')
            && !$(this).children().first().hasClass('topLevelEmptyContainerWrapper')) {
            var container = $(this).data("eqObject");
            if (highlight.startIndex !== null && container === highlight.parent) {
                var characterClickPos = e.pageX - container.jQueryObject.offset().left;
                var index = cursor.calculateIndex(characterClickPos);
                highlight.endIndex = index;
                highlight.updateFormatting();
                if (highlight.startIndex === highlight.endIndex) {
                    if (cursor.index === null) {
                        cursor.index = index;
                        cursor.addCursor(container);
                    }
                } else {
                    if (cursor.index !== null) {
                        cursor.removeCursor();
                    }
                }
            }
        }
    })
    
    $(document).on('mouseenter', '.container', function (e) {
        if (mouseDown) {
            clearHighlighted();
        }
        if (mouseDown) {
            if (highlight.startIndex === null
             && !$(this).children().first().hasClass('squareEmptyContainerWrapper')) {
                removeBlink();
                $(this).addClass('activeContainer');
                var container = $(this).data("eqObject");
                /*** This section is used to calculate toggle lines ***/ 
                var widths = _.map(container.wrappers, function(x) {
                    return x.width;
                });
                var cumulative = 0;
                var prevHalfWidth = 0;
                cursor.toggleLines = _.map(widths, function(x){ 
                    cumulative += 0.5 * x + prevHalfWidth;
                    prevHalfWidth = 0.5 * x;
                    return cumulative;
                });
                /*** ***/
                var characterClickPos = e.pageX - container.jQueryObject.offset().left;
                var index = cursor.calculateIndex(characterClickPos);
                if (container.jQueryObject.children().first().hasClass('topLevelEmptyContainerWrapper')) {
                    container.jQueryObject.children().first().css("background", "#DEDEDE");
                    index = 0;
                }
                if (!container.jQueryObject.hasClass('squareEmptyContainer') && !container.jQueryObject.hasClass('topLevelEmptyContainer')) {
                    // Set up information for the possibility of highlighting.
                    highlight.startIndex = index;
                    highlight.endIndex = index;
                    highlight.addHighlight(container);
                }
                cursor.index = index;
                cursor.addCursor(container);
            }
        }
    });

    $(document).on('mousedown', '#stackedFractionButton', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if ($('#cursor').length > 0) {
            var container = cursor.parent;
            var stackedFractionWrapper = new eqEd.StackedFractionWrapper(symbolSizeConfig);
            if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                container = container.parent.parent;
                container.removeWrappers(0);
            }
            if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                container.removeWrappers(0);
            }
            container.addWrappers([cursor.index, stackedFractionWrapper]);
            cursor.addCursor(stackedFractionWrapper.stackedFractionNumeratorContainer.wrappers[0].squareEmptyContainer);
            $('.activeContainer').removeClass('activeContainer');
            cursor.parent.jQueryObject.addClass('activeContainer');
        } else if ($('.highlighted').length > 0) {
            var container = highlight.parent;
            var stackedFractionWrapper = new eqEd.StackedFractionWrapper(symbolSizeConfig);
            var deleteWrappers;
            if (highlight.startIndex < highlight.endIndex) {
                deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
            } else {
                deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
            }
            eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
            var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
            container.addWrappers([insertIndex, stackedFractionWrapper]);
            cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
            cursor.addCursor(stackedFractionWrapper.stackedFractionNumeratorContainer.wrappers[0].squareEmptyContainer);
            highlight.removeHighlight();
            $('.activeContainer').removeClass('activeContainer');
            cursor.parent.jQueryObject.addClass('activeContainer');
        }
    });

    $(document).on('mousedown', '#superscriptButton', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if ($('#cursor').length > 0) {
            var container = cursor.parent;
            var superscriptWrapper = new eqEd.SuperscriptWrapper(symbolSizeConfig);
            if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                container = container.parent.parent;
                container.removeWrappers(0);
            }
            if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                container.removeWrappers(0);
            }
            container.addWrappers([cursor.index, superscriptWrapper]);
            cursor.addCursor(superscriptWrapper.superscriptContainer.wrappers[0].squareEmptyContainer);
            $('.activeContainer').removeClass('activeContainer');
            cursor.parent.jQueryObject.addClass('activeContainer');
        } else if ($('.highlighted').length > 0) {
            var container = highlight.parent;
            var superscriptWrapper = new eqEd.SuperscriptWrapper(symbolSizeConfig);
            var deleteWrappers;
            if (highlight.startIndex < highlight.endIndex) {
                deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
            } else {
                deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
            }
            eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
            var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
            container.addWrappers([insertIndex, superscriptWrapper]);
            cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
            cursor.addCursor(superscriptWrapper.superscriptContainer.wrappers[0].squareEmptyContainer);
            highlight.removeHighlight();
            $('.activeContainer').removeClass('activeContainer');
            cursor.parent.jQueryObject.addClass('activeContainer');
        }
    });

    $(document).on('mousedown', '#subscriptButton', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if ($('#cursor').length > 0) {
            var container = cursor.parent;
            var subscriptWrapper = new eqEd.SubscriptWrapper(symbolSizeConfig);
            if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                container = container.parent.parent;
                container.removeWrappers(0);
            }
            if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                container.removeWrappers(0);
            }
            container.addWrappers([cursor.index, subscriptWrapper]);
            cursor.addCursor(subscriptWrapper.subscriptContainer.wrappers[0].squareEmptyContainer);
            $('.activeContainer').removeClass('activeContainer');
            cursor.parent.jQueryObject.addClass('activeContainer');
        } else if ($('.highlighted').length > 0) {
            var container = highlight.parent;
            var subscriptWrapper = new eqEd.SubscriptWrapper(symbolSizeConfig);
            var deleteWrappers;
            if (highlight.startIndex < highlight.endIndex) {
                deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
            } else {
                deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
            }
            eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
            var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
            container.addWrappers([insertIndex, subscriptWrapper]);
            cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
            cursor.addCursor(subscriptWrapper.subscriptContainer.wrappers[0].squareEmptyContainer);
            highlight.removeHighlight();
            $('.activeContainer').removeClass('activeContainer');
            cursor.parent.jQueryObject.addClass('activeContainer');
        }
    });

    $(document).on('mousedown', '#superscriptAndSubscriptButton', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if ($('#cursor').length > 0) {
            var container = cursor.parent;
            var superscriptAndSubscriptWrapper = new eqEd.SuperscriptAndSubscriptWrapper(symbolSizeConfig);
            if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                container = container.parent.parent;
                container.removeWrappers(0);
            }
            if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                container.removeWrappers(0);
            }
            container.addWrappers([cursor.index, superscriptAndSubscriptWrapper]);
            cursor.addCursor(superscriptAndSubscriptWrapper.superscriptContainer.wrappers[0].squareEmptyContainer);
            $('.activeContainer').removeClass('activeContainer');
            cursor.parent.jQueryObject.addClass('activeContainer');
        } else if ($('.highlighted').length > 0) {
            var container = highlight.parent;
            var superscriptAndSubscriptWrapper = new eqEd.SuperscriptAndSubscriptWrapper(symbolSizeConfig);
            var deleteWrappers;
            if (highlight.startIndex < highlight.endIndex) {
                deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
            } else {
                deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
            }
            eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
            var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
            container.addWrappers([insertIndex, superscriptAndSubscriptWrapper]);
            cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
            cursor.addCursor(superscriptAndSubscriptWrapper.superscriptContainer.wrappers[0].squareEmptyContainer);
            highlight.removeHighlight();
            $('.activeContainer').removeClass('activeContainer');
            cursor.parent.jQueryObject.addClass('activeContainer');
        }
    });

    $(document).on('mousedown', '#squareRootButton', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if ($('#cursor').length > 0) {
            var container = cursor.parent;
            var squareRootWrapper = new eqEd.SquareRootWrapper(symbolSizeConfig);
            if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                container = container.parent.parent;
                container.removeWrappers(0);
            }
            if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                container.removeWrappers(0);
            }
            container.addWrappers([cursor.index, squareRootWrapper]);
            cursor.addCursor(squareRootWrapper.radicandContainer.wrappers[0].squareEmptyContainer);
            $('.activeContainer').removeClass('activeContainer');
            cursor.parent.jQueryObject.addClass('activeContainer');
        } else if ($('.highlighted').length > 0) {
            var container = highlight.parent;
            var squareRootWrapper = new eqEd.SquareRootWrapper(symbolSizeConfig);
            var deleteWrappers;
            if (highlight.startIndex < highlight.endIndex) {
                deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
            } else {
                deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
            }
            eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
            var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
            container.addWrappers([insertIndex, squareRootWrapper]);
            cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
            cursor.addCursor(squareRootWrapper.radicandContainer.wrappers[0].squareEmptyContainer);
            highlight.removeHighlight();
            $('.activeContainer').removeClass('activeContainer');
            cursor.parent.jQueryObject.addClass('activeContainer');
        }
    });
    $(document).on('mousedown', '#nthRootButton', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if ($('#cursor').length > 0) {
            var container = cursor.parent;
            var nthRootWrapper = new eqEd.NthRootWrapper(symbolSizeConfig);
            if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                container = container.parent.parent;
                container.removeWrappers(0);
            }
            if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                container.removeWrappers(0);
            }
            container.addWrappers([cursor.index, nthRootWrapper]);
            cursor.addCursor(nthRootWrapper.radicandContainer.wrappers[0].squareEmptyContainer);
            $('.activeContainer').removeClass('activeContainer');
            cursor.parent.jQueryObject.addClass('activeContainer');
        } else if ($('.highlighted').length > 0) {
            var container = highlight.parent;
            var nthRootWrapper = new eqEd.NthRootWrapper(symbolSizeConfig);
            var deleteWrappers;
            if (highlight.startIndex < highlight.endIndex) {
                deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
            } else {
                deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
            }
            eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
            var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
            container.addWrappers([insertIndex, nthRootWrapper]);
            cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
            cursor.addCursor(nthRootWrapper.radicandContainer.wrappers[0].squareEmptyContainer);
            highlight.removeHighlight();
            $('.activeContainer').removeClass('activeContainer');
            cursor.parent.jQueryObject.addClass('activeContainer');
        }
    });
    $(document).on('mousedown', '#lessThanOrEqualToButton', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if ($('#cursor').length > 0) {
            var container = cursor.parent;
            var operatorWrapper = new eqEd.OperatorWrapper(symbolSizeConfig, "lessThanOrEqualTo");

            if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                container = container.parent.parent;
                container.removeWrappers(0);
                cursor.addCursor(container);
                cursor.parent.jQueryObject.addClass('activeContainer');
            }
            if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                container.removeWrappers(0);
            }
            container.addWrappers([cursor.index, operatorWrapper]);
            cursor.moveRight();
        } else if ($('.highlighted').length > 0) {
            var container = highlight.parent;
            var operatorWrapper = new eqEd.OperatorWrapper(symbolSizeConfig, "lessThanOrEqualTo");

            var deleteWrappers;
            if (highlight.startIndex < highlight.endIndex) {
                deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
            } else {
                deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
            }
            eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
            var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
            container.addWrappers([insertIndex, operatorWrapper]);
            cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
            cursor.addCursor(container);
            highlight.removeHighlight();
        }
    });

    $(document).on('mousedown', '#greaterThanOrEqualToButton', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if ($('#cursor').length > 0) {
            var container = cursor.parent;
            var operatorWrapper = new eqEd.OperatorWrapper(symbolSizeConfig, "greaterThanOrEqualTo");

            if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                container = container.parent.parent;
                container.removeWrappers(0);
                cursor.addCursor(container);
                cursor.parent.jQueryObject.addClass('activeContainer');
            }
            if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                container.removeWrappers(0);
            }
            container.addWrappers([cursor.index, operatorWrapper]);
            cursor.moveRight();
        } else if ($('.highlighted').length > 0) {
            var container = highlight.parent;
            var operatorWrapper = new eqEd.OperatorWrapper(symbolSizeConfig, "greaterThanOrEqualTo");

            var deleteWrappers;
            if (highlight.startIndex < highlight.endIndex) {
                deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
            } else {
                deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
            }
            eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
            var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
            container.addWrappers([insertIndex, operatorWrapper]);
            cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
            cursor.addCursor(container);
            highlight.removeHighlight();
        }
    });

$(document).on('mousedown', '#sumButton', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if ($('#cursor').length > 0) {
            var container = cursor.parent;
            var operatorWrapper = new eqEd.BigOperatorWrapper(symbolSizeConfig, "sum");

            if (cursor.parent.jQueryObject.hasClass('squareEmptyContainer')) {
                container = container.parent.parent;
                container.removeWrappers(0);
                cursor.addCursor(container);
                cursor.parent.jQueryObject.addClass('activeContainer');
            }
            if (cursor.jQueryObject.siblings('.topLevelEmptyContainerWrapper').length > 0) {
                container.removeWrappers(0);
            }
            container.addWrappers([cursor.index, operatorWrapper]);
            cursor.moveRight();
        } else if ($('.highlighted').length > 0) {
            var container = highlight.parent;
            var operatorWrapper = new eqEd.BigOperatorWrapper(symbolSizeConfig, "sum");

            var deleteWrappers;
            if (highlight.startIndex < highlight.endIndex) {
                deleteWrappers = _.range(highlight.startIndex, highlight.endIndex);
            } else {
                deleteWrappers = _.range(highlight.endIndex, highlight.startIndex);
            }
            eqEd.Container.prototype.removeWrappers.apply(highlight.parent, deleteWrappers);
            var insertIndex = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex : highlight.endIndex;
            container.addWrappers([insertIndex, operatorWrapper]);
            cursor.index = (highlight.startIndex < highlight.endIndex) ? highlight.startIndex + 1 : highlight.endIndex + 1;
            cursor.addCursor(container);
            highlight.removeHighlight();
        }
    });
});