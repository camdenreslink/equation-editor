var setupMenuEvents = function(symbolSizeConfig) {
    $(document).on('mousedown', '#stackedFractionButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var stackedFractionWrapper = new eqEd.StackedFractionWrapper(symbolSizeConfig);
        insertWrapper(stackedFractionWrapper);
    });
};