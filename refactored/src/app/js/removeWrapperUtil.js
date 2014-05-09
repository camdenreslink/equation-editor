var deleteWrapper = function(wrapper) {
    var cursor = $('.cursor');
    if (cursor.length > 0) {
        var container = cursor.parent().data('eqObject');
        if (highlightStartIndex !== 0) {
            if (container.wrappers[cursor.index - 1].childContainers.length > 0) {
                cursor.parent.wrappers[cursor.index - 1].jQueryObject.addClass('highlighted');
                var endIndex = highlightStartIndex
                highlightStartIndex = highlightStartIndex - 1;
                highlight.endIndex = cursor.index;
                updateHighlightFormatting(container, )
                highlight.addHighlight(cursor.parent);
                highlight.updateFormatting();
                cursor.removeCursor();
            } else {
                cursor.index = cursor.index - 1;
                cursor.parent.removeWrappers(cursor.index);
                cursor.updateFormatting();
            }
            
        }
    }
}