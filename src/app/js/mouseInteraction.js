var mouseDown = false;
var toggleLines = [];
var highlightStartIndex = null;
var highlightEndIndex = null;

var removeCursor = function() {
    $('.cursor').remove();
    removeBlink();
}

var removeHighlight = function() {
    $('.highlight').remove();
    $('.highlighted').removeClass('highlighted');
    $('.eqEdContainer').css('z-index', 3);
    $('.eqEdWrapper').css('z-index', 3);
    toggleLines = [];
    highlightStartIndex = null;
}

var clearOnMouseDown = function() {
    mouseDown = true;
    removeCursor();
    removeHighlight();
    clearHighlighted();
    $('.activeContainer').removeClass('activeContainer');
    $('.hoverContainer').removeClass('hoverContainer');
    $('#hiddenFocusInput').blur();
};

var moveHiddenInput = function() {
    $('#hiddenFocusInput').css('left', $('.cursor').first().offset().left);
    $('#hiddenFocusInput').css('top', $('.cursor').first().offset().top);
    $('#hiddenFocusInput').focus().click();
};

var calculateIndex = function(offsetLeft) {
    var index = 0;
    var indexSet= false;
    for (var i = 0; i < toggleLines.length; i++) {
        if (offsetLeft < toggleLines[i]) {
            index = i;
            indexSet = true;
            break;
        }
    }
    if (!indexSet) {
        index = toggleLines.length;
    }
    return index;
};

// side effect: populates toggleLines array, and highlightStartIndex.
var addCursor = function(container, characterClickPos) {
    removeCursor();
    $('.activeContainer').removeClass('activeContainer');
    if (!(container instanceof eqEd.TopLevelContainer)) {
        container.domObj.value.addClass('activeContainer');
    }
    var cursor;
    if (container instanceof eqEd.SquareEmptyContainer) {
        cursor = $('<div class="cursor squareCursor"></div>');
    } else {
        var cumulative = 0;
        var cursorLeft = -1;
        var cursorLeftSet = false;
        var toggleLinesEmpty = (toggleLines.length === 0);
        if (!(container.wrappers[0] instanceof eqEd.TopLevelEmptyContainerWrapper)) {
            for (var i = 0; i < container.wrappers.length; i++) {
                var wrapper = container.wrappers[i];
                cumulative += 0.5 * wrapper.width;
                if (toggleLinesEmpty) {
                    toggleLines.push(cumulative);
                }
                if (characterClickPos < cumulative && !cursorLeftSet) {
                    // - 1 because cursor has a width of 2
                    cursorLeft += cumulative - 0.5 * wrapper.width;
                    highlightStartIndex = i;
                    cursorLeftSet = true;
                }
                cumulative += 0.5 * wrapper.width;
                
            }
            if (!cursorLeftSet) {
                cursorLeft += cumulative;
                highlightStartIndex = container.wrappers.length;
            }
        }
        cursor = $('<div class="cursor normalCursor"></div>');
        cursor.css('left', cursorLeft);
    }
    container.domObj.value.append(cursor);
    addBlink();
    moveHiddenInput();
};

// side effect: populates toggleLines array, and highlightStartIndex.
var addCursorAtIndex = function(container, index) {
    removeCursor();
    removeHighlight();
    addHighlight(container);
    $('.activeContainer').removeClass('activeContainer');
    if (!(container instanceof eqEd.TopLevelContainer)) {
        container.domObj.value.addClass('activeContainer');
    }
    var cursor;
    highlightStartIndex = index;
    if (container instanceof eqEd.SquareEmptyContainer) {
        cursor = $('<div class="cursor squareCursor"></div>');
    } else {
        var cumulative = 0;
        var cursorLeft = -1;
        var cursorLeftSet = false;
        var toggleLinesEmpty = (toggleLines.length === 0);
        if (!(container.wrappers[0] instanceof eqEd.TopLevelEmptyContainerWrapper)) {
            for (var i = 0; i < container.wrappers.length; i++) {
                var wrapper = container.wrappers[i];
                if (index === i) {
                    cursorLeft += cumulative;
                    cursorLeftSet = true;
                }
                cumulative += 0.5 * wrapper.width;
                if (toggleLinesEmpty) {
                    toggleLines.push(cumulative);
                }
                cumulative += 0.5 * wrapper.width;
            }
        }
        if (!cursorLeftSet) {
            cursorLeft += cumulative;
            cursorLeftSet = true;
        }
        cursor = $('<div class="cursor normalCursor"></div>');
        cursor.css('left', cursorLeft);
    }
    container.domObj.value.append(cursor);
    addBlink();
    moveHiddenInput();
};

var addHighlight = function(container) {
    var highlight = $('<div class="highlight"></div>');
    container.domObj.value.css('z-index', 4);
    highlight.css('z-index', 5);
    container.domObj.value.children().css('z-index', 6);
    container.domObj.value.append(highlight);
};

var updateHighlightFormatting = function(container, endIndex) {
    highlightEndIndex = endIndex;
    var highlight = $('.highlight');
    if (highlight.length > 0) {
        var left = 0;
        var top = 0;
        var height = 0;
        $('.highlighted').removeClass('highlighted');
        if (highlightStartIndex < highlightEndIndex) {
            left = container.wrappers[highlightStartIndex].left;
            top = 0;
            height = container.height;
            var widthSum = 0;
            for (var i = highlightStartIndex; i < highlightEndIndex; i++) {
                if (highlightStartIndex !== highlightEndIndex) {
                    var wrapper = container.wrappers[i];
                    wrapper.domObj.value.addClass('highlighted');
                    widthSum += wrapper.width;
                }
            }
            width = widthSum;
        } else if (highlightStartIndex > highlightEndIndex) {
            left = container.wrappers[highlightEndIndex].left;
            top = 0;
            height = container.height;

            var widthSum = 0;
            for (var i = highlightEndIndex; i < highlightStartIndex; i++) {
                if (highlightStartIndex !== highlightEndIndex) {
                    var wrapper = container.wrappers[i];
                    wrapper.domObj.value.addClass('highlighted');
                    widthSum += wrapper.width;
                }
            }
            width = widthSum;
        } else if (highlightStartIndex === highlightEndIndex) {
            left = 0;
            top = 0;
            height = 0;
            width = 0;
        }
        highlight.css({
            left: left,
            top: top,
            height: height,
            width: width
        });
    }
}

$(document).on('touchstart mousedown', function(e) {
    clearOnMouseDown();
});

$(document).on('touchend mouseup', function(e) {
    mouseDown = false;
    if ($('.cursor').length > 0) {
        addBlink();
    }
});

var onMouseDown = function(self, e) {
    if (!$(self).children().first().hasClass('squareEmptyContainerWrapper')) {
        e.preventDefault();
        e.stopPropagation();
        clearOnMouseDown();
        var container = $(self).data("eqObject");
        addHighlight(container);
        var xOffset = (typeof e.originalEvent.pageX !== 'undefined') ? e.originalEvent.pageX : e.originalEvent.touches[0].pageX;
        var characterClickPos = xOffset - container.domObj.value.offset().left;
        addCursor(container, characterClickPos);
    }
}

$(document).on('touchstart mousedown', '.tabs', function(e) {
    e.stopPropagation();
});

$(document).on('touchstart mousedown', '.eqEdContainer', function(e) {
    onMouseDown(this, e);
});

$(document).on('mousemove', function(e) {
    $('.hoverContainer').removeClass('hoverContainer');
});

$(document).on('mousemove', '.eqEdContainer', function(e) {
    if (mouseDown) {
        clearHighlighted();
    }

    if (mouseDown 
        && !$(this).children().first().hasClass('squareEmptyContainerWrapper') 
        && !$(this).hasClass('squareEmptyContainer')) {
        var container = $(this).data("eqObject");
        if (highlightStartIndex !== null && container.domObj.value.children('.highlight').length > 0) {
            var characterClickPos = e.pageX - container.domObj.value.offset().left;
            var index = calculateIndex(characterClickPos);
            updateHighlightFormatting(container, index);
            if (highlightStartIndex === index) {
                addCursorAtIndex(container, index);
            } else {
                removeCursor();
            }
        }
    } else {
        var container = $(this).data("eqObject");
        $('.hoverContainer').removeClass('hoverContainer');
        if (!($(this).hasClass('activeContainer')) 
         && !(container.wrappers[0] instanceof eqEd.SquareEmptyContainerWrapper)
         && !$(this).hasClass('topLevelContainer')
         && !($('.highlighted').length > 0)) {
            $(this).addClass('hoverContainer');
        }
        e.preventDefault();
        e.stopPropagation();
    }
})

$(document).on('mouseenter', '.eqEdContainer', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (mouseDown) {
        clearHighlighted();
        if (highlightStartIndex === null) {
            onMouseDown(this, e);
        } else {
            $(this).trigger("mousemove");
        }
    }
});

$(document).on('mouseleave', '.eqEdContainer', function (e) {
    e.preventDefault();
    e.stopPropagation();
});
