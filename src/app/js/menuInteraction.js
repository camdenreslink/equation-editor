var setupMenuEvents = function(fontMetrics) {
    $(document).on('touchstart mousedown', '#stackedFractionButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var stackedFractionWrapper = new eqEd.StackedFractionWrapper(fontMetrics);
        insertWrapper(stackedFractionWrapper);
    });
    $(document).on('touchstart mousedown', '#superscriptButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var superscriptWrapper = new eqEd.SuperscriptWrapper(fontMetrics);
        insertWrapper(superscriptWrapper);
    });
    $(document).on('touchstart mousedown', '#subscriptButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var subscriptWrapper = new eqEd.SubscriptWrapper(fontMetrics);
        insertWrapper(subscriptWrapper);
    });
    $(document).on('touchstart mousedown', '#superscriptAndSubscriptButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var superscriptAndSubscriptWrapper = new eqEd.SuperscriptAndSubscriptWrapper(fontMetrics);
        insertWrapper(superscriptAndSubscriptWrapper);
    });
    $(document).on('touchstart mousedown', '#squareRootButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var squareRootWrapper = new eqEd.SquareRootWrapper(fontMetrics);
        insertWrapper(squareRootWrapper);
    });
    $(document).on('touchstart mousedown', '#nthRootButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var nthRootButton = new eqEd.NthRootWrapper(fontMetrics);
        insertWrapper(nthRootButton);
    });
    
    $(document).on('touchstart mousedown', '#leftAngleBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var leftAngleBracketWrapper = new eqEd.BracketWrapper("leftAngleBracket", fontMetrics);
        insertWrapper(leftAngleBracketWrapper);
    });
    $(document).on('touchstart mousedown', '#rightAngleBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var rightAngleBracketWrapper = new eqEd.BracketWrapper("rightAngleBracket", fontMetrics);
        insertWrapper(rightAngleBracketWrapper);
    });
    $(document).on('touchstart mousedown', '#leftFloorBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var leftFloorBracketWrapper = new eqEd.BracketWrapper("leftFloorBracket", fontMetrics);
        insertWrapper(leftFloorBracketWrapper);
    });
    $(document).on('touchstart mousedown', '#rightFloorBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var rightFloorBracketWrapper = new eqEd.BracketWrapper("rightFloorBracket", fontMetrics);
        insertWrapper(rightFloorBracketWrapper);
    });
    $(document).on('touchstart mousedown', '#leftCeilBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var leftCeilBracketWrapper = new eqEd.BracketWrapper("leftCeilBracket", fontMetrics);
        insertWrapper(leftCeilBracketWrapper);
    });
    $(document).on('touchstart mousedown', '#rightCeilBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var rightCeilBracketWrapper = new eqEd.BracketWrapper("rightCeilBracket", fontMetrics);
        insertWrapper(rightCeilBracketWrapper);
    });
    $(document).on('touchstart mousedown', '#parenthesesBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var parenthesesBracketPair = new eqEd.BracketPairWrapper("parenthesisBracket", fontMetrics);
        insertWrapper(parenthesesBracketPair);
    });
    $(document).on('touchstart mousedown', '#squareBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var squareBracketPair = new eqEd.BracketPairWrapper("squareBracket", fontMetrics);
        insertWrapper(squareBracketPair);
    });
    $(document).on('touchstart mousedown', '#curlyBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var curlyBracketPair = new eqEd.BracketPairWrapper("curlyBracket", fontMetrics);
        insertWrapper(curlyBracketPair);
    });
    $(document).on('touchstart mousedown', '#angleBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var angleBracketPair = new eqEd.BracketPairWrapper("angleBracket", fontMetrics);
        insertWrapper(angleBracketPair);
    });$(document).on('touchstart mousedown', '#floorBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var floorBracketPair = new eqEd.BracketPairWrapper("floorBracket", fontMetrics);
        insertWrapper(floorBracketPair);
    });
    $(document).on('touchstart mousedown', '#ceilBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var ceilBracketPair = new eqEd.BracketPairWrapper("ceilBracket", fontMetrics);
        insertWrapper(ceilBracketPair);
    });
    $(document).on('touchstart mousedown', '#absValBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var absValBracketPair = new eqEd.BracketPairWrapper("absValBracket", fontMetrics);
        insertWrapper(absValBracketPair);
    });
    $(document).on('touchstart mousedown', '#normBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var normBracketPair = new eqEd.BracketPairWrapper("normBracket", fontMetrics);
        insertWrapper(normBracketPair);
    });
    $(document).on('touchstart mousedown', '#sumBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, true, true, 'sum', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#sumBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, true, 'sum', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#sumBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, false, 'sum', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigCapBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, true, true, 'bigCap', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigCapBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, true, 'bigCap', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigCapBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, false, 'bigCap', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigCupBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, true, true, 'bigCup', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigCupBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, true, 'bigCup', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigCupBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, false, 'bigCup', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigSqCapBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, true, true, 'bigSqCap', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigSqCapBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, true, 'bigSqCap', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigSqCapBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, false, 'bigSqCap', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigSqCupBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, true, true, 'bigSqCup', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigSqCupBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, true, 'bigSqCup', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigSqCupBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, false, 'bigSqCup', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#prodBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, true, true, 'prod', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#prodBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, true, 'prod', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#prodBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, false, 'prod', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#coProdBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, true, true, 'coProd', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#coProdBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, true, 'coProd', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#coProdBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, false, 'coProd', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigVeeBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, true, true, 'bigVee', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigVeeBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, true, 'bigVee', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigVeeBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, false, 'bigVee', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigWedgeBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, true, true, 'bigWedge', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigWedgeBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, true, 'bigWedge', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigWedgeBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, false, 'bigWedge', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineSumBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, true, true, 'sum', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineSumBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, false, true, 'sum', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigCapBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, true, true, 'bigCap', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigCapBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, false, true, 'bigCap', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigCupBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, true, true, 'bigCup', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigCupBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, false, true, 'bigCup', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigSqCapBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, true, true, 'bigSqCap', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigSqCapBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, false, true, 'bigSqCap', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigSqCupBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, true, true, 'bigSqCup', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigSqCupBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, false, true, 'bigSqCup', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineProdBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, true, true, 'prod', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineProdBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, false, true, 'prod', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineCoProdBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, true, true, 'coProd', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineCoProdBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, false, true, 'coProd', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigVeeBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, true, true, 'bigVee', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigVeeBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, false, true, 'bigVee', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigWedgeBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, true, true, 'bigWedge', fontMetrics);
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigWedgeBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, false, true, 'bigWedge', fontMetrics);
        insertWrapper(bigOperator);
    });

    ////////////////////////////////////////////////////////////////

    $(document).on('touchstart mousedown', '#integralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, true, true, 'single', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#integralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, true, 'single', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#integralNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, false, 'single', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#doubleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, true, true, 'double', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#doubleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, true, 'double', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#doubleIntegralNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, false, 'double', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#tripleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, true, true, 'triple', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#tripleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, true, 'triple', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#tripleIntegralNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, false, 'triple', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#contourIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, true, true, 'singleContour', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#contourIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, true, 'singleContour', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#contourIntegralNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, false, 'singleContour', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#contourDoubleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, true, true, 'doubleContour', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#contourDoubleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, true, 'doubleContour', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#contourDoubleIntegralNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, false, 'doubleContour', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#contourTripleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, true, true, 'tripleContour', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#contourTripleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, true, 'tripleContour', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#contourTripleIntegralNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, false, 'tripleContour', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, true, true, 'single', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, false, true, 'single', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineDoubleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, true, true, 'double', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineDoubleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, false, true, 'double', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineTripleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, true, true, 'triple', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineTripleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, false, true, 'triple', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineContourIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, true, true, 'singleContour', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineContourIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, false, true, 'singleContour', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineContourDoubleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, true, true, 'doubleContour', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineContourDoubleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, false, true, 'doubleContour', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineContourTripleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, true, true, 'tripleContour', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineContourTripleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, false, true, 'tripleContour', fontMetrics);
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#partialDifferentialButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var differentialWrapper = new eqEd.SymbolWrapper('∂', "MathJax_Main", fontMetrics);
        insertWrapper(differentialWrapper);
    });

    ///////////////////////////////////////////////////////

    $(document).on('touchstart mousedown', '#logButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('log', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#lnButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('ln', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#limButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('lim', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#maxButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('max', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#minButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('min', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#supButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('sup', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#infButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('inf', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#sinButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('sin', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#cosButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('cos', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#tanButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('tan', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#cotButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('cot', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#secButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('sec', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#cscButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('csc', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#sinhButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('sinh', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#coshButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('cosh', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#tanhButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('tanh', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#cothButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('coth', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#sechButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('sech', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#cschButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('csch', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#limitButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var limitWrapper = new eqEd.LimitWrapper(fontMetrics);
        insertWrapper(limitWrapper);
    });

    $(document).on('touchstart mousedown', '#maxLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionLowerWrapper('max', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#minLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionLowerWrapper('min', "MathJax_Main", fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#logLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.LogLowerWrapper(fontMetrics);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#matrixButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#rows').blur();
        $('#cols').blur();
        var rows = parseInt($('#rows').val());
        var cols = parseInt($('#cols').val());
        var matrixWrapper = new eqEd.MatrixWrapper(rows, cols, 'center', fontMetrics);
        insertWrapper(matrixWrapper);
    });

    $(document).on('touchstart mousedown', '#dotAccentButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var accentWrapper = new eqEd.AccentWrapper('˙', 'MathJax_Main', fontMetrics);
        insertWrapper(accentWrapper);
    });

    $(document).on('touchstart mousedown', '#hatAccentButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var accentWrapper = new eqEd.AccentWrapper('^', 'MathJax_Main', fontMetrics);
        insertWrapper(accentWrapper);
    });

    $(document).on('touchstart mousedown', '#vectorAccentButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var accentWrapper = new eqEd.AccentWrapper('⃗', 'MathJax_Main', fontMetrics);
        insertWrapper(accentWrapper);
    });

    $(document).on('touchstart mousedown', '#barAccentButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var accentWrapper = new eqEd.AccentWrapper('¯', 'MathJax_Main', fontMetrics);
        insertWrapper(accentWrapper);
    });

    $(document).on('touchstart mousedown', '#gammaUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('Γ', "MathJax_Main", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#deltaUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('Δ', "MathJax_Main", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#thetaUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('Θ', "MathJax_Main", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#lambdaUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('Λ', "MathJax_Main", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#xiUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('Ξ', "MathJax_Main", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#piUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('Π', "MathJax_Main", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#sigmaUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('Σ', "MathJax_Main", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#upsilonUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('Υ', "MathJax_Main", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#phiUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('Φ', "MathJax_Main", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#psiUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('Ψ', "MathJax_Main", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#omegaUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('Ω', "MathJax_Main", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#alphaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('α', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#betaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('β', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#gammaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('γ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#deltaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('δ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#varEpsilonButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('ε', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#epsilonButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('ϵ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#zetaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('ζ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#etaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('η', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#thetaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('θ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#varThetaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('ϑ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#iotaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('ι', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#kappaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('κ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#lambdaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('λ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#muButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('μ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#nuButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('ν', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#xiButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('ξ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#piButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('π', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#varPiButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('ϖ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#rhoButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('ρ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#varRhoButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('ϱ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#sigmaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('σ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#varSigmaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('ς', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#tauButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('τ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#upsilonButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('υ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#varPhiButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('φ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#phiButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('ϕ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#chiButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('χ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#psiButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('ψ', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#omegaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('ω', "MathJax_MathItalic", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#lessThanOrEqualToButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('≤', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });
    $(document).on('touchstart mousedown', '#greaterThanOrEqualToButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('≥', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });
    $(document).on('touchstart mousedown', '#circleOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('◦', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });
    $(document).on('touchstart mousedown', '#approxEqualToButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('≈', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });
    $(document).on('touchstart mousedown', '#belongsToButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('∈', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#timesButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('×', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#pmButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('±', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#wedgeButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('∧', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#veeButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('∨', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#equivButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('≡', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#congButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('≅', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#neqButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('≠', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#simButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('∼', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#proptoButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('∝', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#precButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('≺', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#precEqButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('⪯', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#subsetButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('⊂', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#subsetEqButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('⊆', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#succButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('≻', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#succEqButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('⪰', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#perpButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('⊥', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#midButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('∣', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#parallelButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('∥', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#colonButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper(':', "MathJax_Main", fontMetrics);
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#partialButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('∂', "MathJax_Main", fontMetrics);
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#infinityButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var symbolWrapper = new eqEd.SymbolWrapper('∞', "MathJax_Main", fontMetrics);
        insertWrapper(symbolWrapper);
    });
};

$(document).on('click', '.tabs .tab-links a', function(e)  {
    var currentAttrValue = $(this).attr('href');

    // Show/Hide Tabs
    $('.tabs ' + currentAttrValue).show().siblings().hide();

    // Change/remove current tab to active
    $(this).parent('li').addClass('active').siblings().removeClass('active');

    e.preventDefault();
});