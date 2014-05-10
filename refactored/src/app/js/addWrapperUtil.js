var insertWrapper = function(wrapper) {
    var cursor = $('.cursor');
    var highlighted = $('.highlighted');
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
    } else if (highlighted.length > 0) {
        var container = highlighted.parent().data('eqObject');
        var deleteWrappers;
        if (highlightStartIndex < highlightEndIndex) {
            deleteWrappers = _.range(highlightStartIndex, highlightEndIndex);
        } else {
            deleteWrappers = _.range(highlightEndIndex, highlightStartIndex);
        }

        if (wrapper.childContainers.length > 0) {
            container.addWrappers([highlightStartIndex, wrapper]);
            removeCursor();
            addCursorAtIndex(wrapper.childContainers[0].wrappers[0].childContainers[0], 0);
            for (var i = 0; i < deleteWrappers.length; i++) {
                var deleteWrapperIndex = deleteWrappers[i];
                var deleteWrapper = container.wrappers[deleteWrapperIndex];
                insertWrapper(deleteWrapper.clone());
                container.removeWrappers(deleteWrapperIndex);
            }
            container.updateAll();
            // clone .highlighted, and addWrappers to childContainers[0]
        } else {
            eqEd.Container.prototype.removeWrappers.apply(container, deleteWrappers);
            container.updateAll();
            highlightStartIndex = (highlightStartIndex < highlightEndIndex) ? highlightStartIndex : highlightEndIndex;
            updateHighlightFormatting(container, highlightStartIndex);
            addCursorAtIndex(container, highlightStartIndex);
            insertWrapper(wrapper);
        }
    }
};