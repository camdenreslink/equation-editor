var insertWrapper = function(wrapper) {
    var cursor = $('.cursor');
    var highlighted = $('.highlighted');
    if (cursor.length > 0) {
        var container = cursor.parent().data('eqObject');
        if (cursor.parent().hasClass('squareEmptyContainer')) {
            container = container.parent.parent;
        }
        container.addWrappers([highlightStartIndex, wrapper]);
        wrapper.updateAll();
        removeCursor();
        if (wrapper.childContainers.length > 0) {
            if (wrapper.childContainers[0].wrappers[0] instanceof eqEd.EmptyContainerWrapper) {
                addCursorAtIndex(wrapper.childContainers[0].wrappers[0].childContainers[0], 0);
                container = wrapper.childContainers[0].wrappers[0].childContainers[0];
            } else {
                addCursorAtIndex(wrapper.childContainers[0], wrapper.childContainers[0].wrappers.length);
            }
        } else {
            addCursorAtIndex(container, (++highlightStartIndex));
        }
    } else if (highlighted.length > 0) {
        var container = highlighted.parent().data('eqObject');
        var deleteWrappers;
        if (highlightStartIndex < highlightEndIndex) {
            deleteWrappers = _.range(highlightStartIndex, highlightEndIndex);
        } else {
            deleteWrappers = _.range(highlightEndIndex, highlightStartIndex);
        }
        if (wrapper.childContainers.length > 0) {
            container.addWrappers([deleteWrappers[0], wrapper]);
            removeCursor();
            removeHighlight();
            var copiedWrappers = [];
            for (var i = 0; i < deleteWrappers.length; i++) {
                var deleteWrapperIndex = deleteWrappers[i] + 1;
                var deleteWrapper = container.wrappers[deleteWrapperIndex];
                var copiedWrapper = deleteWrapper.clone();
                copiedWrappers.push([i, copiedWrapper]);
            }
            eqEd.Container.prototype.removeWrappers.apply(container, _.map(deleteWrappers, function(num){ return num + 1; }));
            eqEd.Container.prototype.addWrappers.apply(wrapper.childContainers[0], copiedWrappers);
            container.updateAll();
            addCursorAtIndex(wrapper.childContainers[0], copiedWrappers.length);
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