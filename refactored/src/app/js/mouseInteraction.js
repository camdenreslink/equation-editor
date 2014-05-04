var mouseDown = false;
var toggleLines = [];
var highlightStartIndex = null;

var removeCursor = function() {
    $('.cursor').remove();
    removeBlink();
}

var removeHighlight = function() {
    $('.highlight').remove();
    $('.highlighted').removeClass('highlighted');
    $('.container').css('z-index', 3);
    $('.wrapper').css('z-index', 3);
    toggleLines = [];
    highlightStartIndex = null;
}

var onMouseDown = function() {
    mouseDown = true;
    removeCursor();
    removeHighlight();
    clearHighlighted();
    $('.activeContainer').removeClass('activeContainer');
};

var calculateIndex = function(offsetLeft) {
    var index;
    for (var i = 0; i < toggleLines.length; i++) {
        if (offsetLeft < toggleLines[i]) {
            index = i;
            break;
        } else {
            index = toggleLines.length;
        }
    }
    return index;
};

// side effect: populates toggleLines array, and highlightStartIndex.
var addCursor = function(container, e) {
    var cursor;
    if (container instanceof eqEd.SquareEmptyContainer) {
        cursor = $('<div class="cursor squareCursor"></div>');
    } else {
        var characterClickPos = e.pageX - container.domObj.value.offset().left;

        var cumulative = 0;
        var cursorLeft = 0;
        if (!container.domObj.value.children().first().hasClass('topLevelEmptyContainerWrapper')) {
            for (var i = 0; i < container.wrappers.length; i++) {
                var wrapper = container.wrappers[i];
                cumulative += 0.5 * wrapper.width;
                toggleLines.push(cumulative);
                if (characterClickPos < cumulative) {
                    // - 1 because cursor has a width of 2
                    cursorLeft = cumulative - 0.5 * wrapper.width - 1;
                    highlightStartIndex = i;
                }
                cumulative += 0.5 * wrapper.width;
                
            }
        } else {
            container.domObj.value.children().first().addClass('activeContainer');
        }
        cursor = $('<div class="cursor normalCursor"></div>');
        cursor.css('left', cursorLeft);
    }
    container.domObj.value.append(cursor);
};

var addHighlight = function(container) {
    var highlight = $('<div class="highlight"></div>');
    container.domObj.value.css('z-index', 4);
    highlight.css('z-index', 5);
    container.domObj.value.children().css('z-index', 6);
    container.domObj.value.append(highlight);
};

var updateHighlightFormatting = function(container, highlightEndIndex) {
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
            left: Math.ceil(left),
            top: Math.ceil(top),
            height: Math.ceil(height),
            width: Math.ceil(width)
        });
    }
}

$(document).on('mousedown', function(e) {
    onMouseDown();
});

$(document).on('mouseup', function(e) {
    mouseDown = false;
    if ($('.cursor').length > 0) {
        addBlink();
    }
});

$(document).on('mousedown', '.container', function(e) {
    if (!$(this).children().first().hasClass('squareEmptyContainerWrapper')) {
        e.preventDefault();
        e.stopPropagation();

        onMouseDown();

        $(this).addClass('activeContainer');
        var container = $(this).data("eqObject");
        // addCursor call populates toggleLines array, and highlightStartIndex.
        addHighlight(container);
        addCursor(container, e);
    }
});

$(document).on('mousemove', '.container', function(e) {
    if (mouseDown) {
        clearHighlighted();
    }
    if (mouseDown 
        && !$(this).children().first().hasClass('squareEmptyContainerWrapper') 
        && !$(this).hasClass('squareEmptyContainer')
        && !$(this).children().first().hasClass('topLevelEmptyContainerWrapper')) {
        var container = $(this).data("eqObject");
        if (highlightStartIndex !== null && container.value.children('.highlight').length > 0) {
            var characterClickPos = e.pageX - container.domObject.value.offset().left;
            var index = calculateIndex(characterClickPos);

            updateHighlightFormatting(container, index);
            if (highlightStartIndex === index) {
                addCursor(container, e);
            } else {
                removeCursor();
            }
        }
    }
})

$(document).on('mouseenter', '.container', function (e) {
    if (mouseDown) {
        clearHighlighted();
        if (highlightStartIndex === null) {
            $(this).trigger("mousedown");
        } else {
            $(this).trigger("mousemove");
        }
    }
});