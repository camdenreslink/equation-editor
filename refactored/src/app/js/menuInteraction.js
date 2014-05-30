var setupMenuEvents = function(symbolSizeConfig) {
    $(document).on('mousedown', '#stackedFractionButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var stackedFractionWrapper = new eqEd.StackedFractionWrapper(symbolSizeConfig);
        insertWrapper(stackedFractionWrapper);
    });

    $(document).on('mousedown', '#superscriptButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var superscriptWrapper = new eqEd.SuperscriptWrapper(symbolSizeConfig);
        insertWrapper(superscriptWrapper);
    });

    $(document).on('mousedown', '#subscriptButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var subscriptWrapper = new eqEd.SubscriptWrapper(symbolSizeConfig);
        insertWrapper(subscriptWrapper);
    });

    $(document).on('mousedown', '#superscriptAndSubscriptButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var superscriptAndSubscriptWrapper = new eqEd.SuperscriptAndSubscriptWrapper(symbolSizeConfig);
        insertWrapper(superscriptAndSubscriptWrapper);
    });

    $(document).on('mousedown', '#squareRootButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var squareRootWrapper = new eqEd.SquareRootWrapper(symbolSizeConfig);
        insertWrapper(squareRootWrapper);
    });

    $(document).on('mousedown', '#nthRootButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var nthRootButton = new eqEd.NthRootWrapper(symbolSizeConfig);
        insertWrapper(nthRootButton);
    });

    $(document).on('mousedown', '#lessThanOrEqualToButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('&#x2264;', "MathJax_Main", symbolSizeConfig);
        insertWrapper(operatorWrapper);
    });

    $(document).on('mousedown', '#greaterThanOrEqualToButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('&#x2265;', "MathJax_Main", symbolSizeConfig);
        insertWrapper(operatorWrapper);
    });
    $(document).on('mousedown', '#approxEqualToButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('&#x2248;', "MathJax_Main", symbolSizeConfig);
        insertWrapper(operatorWrapper);
    });
    $(document).on('mousedown', '#leftAngleBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var leftAngleBracketWrapper = new eqEd.LeftAngleBracketWrapper(symbolSizeConfig);
        insertWrapper(leftAngleBracketWrapper);
    });
    $(document).on('mousedown', '#rightAngleBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var rightAngleBracketWrapper = new eqEd.RightAngleBracketWrapper(symbolSizeConfig);
        insertWrapper(rightAngleBracketWrapper);
    });
    $(document).on('mousedown', '#leftFloorBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var leftFloorBracketWrapper = new eqEd.LeftFloorBracketWrapper(symbolSizeConfig);
        insertWrapper(leftFloorBracketWrapper);
    });
    $(document).on('mousedown', '#rightFloorBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var rightFloorBracketWrapper = new eqEd.RightFloorBracketWrapper(symbolSizeConfig);
        insertWrapper(rightFloorBracketWrapper);
    });
    $(document).on('mousedown', '#leftCeilBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var leftCeilBracketWrapper = new eqEd.LeftCeilBracketWrapper(symbolSizeConfig);
        insertWrapper(leftCeilBracketWrapper);
    });
    $(document).on('mousedown', '#rightCeilBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var rightCeilBracketWrapper = new eqEd.RightCeilBracketWrapper(symbolSizeConfig);
        insertWrapper(rightCeilBracketWrapper);
    });
};