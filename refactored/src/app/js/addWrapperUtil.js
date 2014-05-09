var insertWrapper = function(wrapper) {
    var cursor = $('.cursor');
    if (cursor.length > 0) {
        var container = cursor.parent().data('eqObject');
        if (cursor.parent().hasClass('squareEmptyContainer')) {
            container = container.parent.parent;
            container.removeWrappers(0);
        }
        if (cursor.siblings('.topLevelEmptyContainerWrapper').length > 0) {
            container.removeWrappers(0);
        }
        container.addWrappers([highlightStartIndex, wrapper]);
        wrapper.updateAll();
        removeCursor();
        if (wrapper.childContainers.length > 0) {
            addCursorAtIndex(wrapper.childContainers[0].wrappers[0].childContainers[0], 0);
            container = wrapper.childContainers[0].wrappers[0].childContainers[0];
        } else {
            addCursorAtIndex(container, (++highlightStartIndex));
        }
        $('.activeContainer').removeClass('activeContainer');
        container.domObj.value.addClass('activeContainer');
    }
}