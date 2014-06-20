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
    $(document).on('mousedown', '#belongsToButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var operatorWrapper = new eqEd.OperatorWrapper('&#8712;', "MathJax_Main", symbolSizeConfig);
        insertWrapper(operatorWrapper);
    });
    $(document).on('mousedown', '#leftAngleBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var leftAngleBracketWrapper = new eqEd.BracketWrapper("leftAngleBracket", symbolSizeConfig);
        insertWrapper(leftAngleBracketWrapper);
    });
    $(document).on('mousedown', '#rightAngleBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var rightAngleBracketWrapper = new eqEd.BracketWrapper("rightAngleBracket", symbolSizeConfig);
        insertWrapper(rightAngleBracketWrapper);
    });
    $(document).on('mousedown', '#leftFloorBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var leftFloorBracketWrapper = new eqEd.BracketWrapper("leftFloorBracket", symbolSizeConfig);
        insertWrapper(leftFloorBracketWrapper);
    });
    $(document).on('mousedown', '#rightFloorBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var rightFloorBracketWrapper = new eqEd.BracketWrapper("rightFloorBracket", symbolSizeConfig);
        insertWrapper(rightFloorBracketWrapper);
    });
    $(document).on('mousedown', '#leftCeilBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var leftCeilBracketWrapper = new eqEd.BracketWrapper("leftCeilBracket", symbolSizeConfig);
        insertWrapper(leftCeilBracketWrapper);
    });
    $(document).on('mousedown', '#rightCeilBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var rightCeilBracketWrapper = new eqEd.BracketWrapper("rightCeilBracket", symbolSizeConfig);
        insertWrapper(rightCeilBracketWrapper);
    });
    $(document).on('mousedown', '#parenthesesBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var parenthesesBracketPair = new eqEd.BracketPairWrapper("parenthesisBracket", symbolSizeConfig);
        insertWrapper(parenthesesBracketPair);
    });
    $(document).on('mousedown', '#squareBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var squareBracketPair = new eqEd.BracketPairWrapper("squareBracket", symbolSizeConfig);
        insertWrapper(squareBracketPair);
    });
    $(document).on('mousedown', '#curlyBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var curlyBracketPair = new eqEd.BracketPairWrapper("curlyBracket", symbolSizeConfig);
        insertWrapper(curlyBracketPair);
    });
    $(document).on('mousedown', '#angleBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var angleBracketPair = new eqEd.BracketPairWrapper("angleBracket", symbolSizeConfig);
        insertWrapper(angleBracketPair);
    });$(document).on('mousedown', '#floorBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var floorBracketPair = new eqEd.BracketPairWrapper("floorBracket", symbolSizeConfig);
        insertWrapper(floorBracketPair);
    });
    $(document).on('mousedown', '#ceilBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var ceilBracketPair = new eqEd.BracketPairWrapper("ceilBracket", symbolSizeConfig);
        insertWrapper(ceilBracketPair);
    });
    $(document).on('mousedown', '#absValBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var absValBracketPair = new eqEd.BracketPairWrapper("absValBracket", symbolSizeConfig);
        insertWrapper(absValBracketPair);
    });
    $(document).on('mousedown', '#normBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var normBracketPair = new eqEd.BracketPairWrapper("normBracket", symbolSizeConfig);
        insertWrapper(normBracketPair);
    });
    $(document).on('mousedown', '#sumBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, true, true, 'sum', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#sumBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, true, 'sum', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#sumBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, false, 'sum', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#bigCapBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, true, true, 'bigCap', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#bigCapBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, true, 'bigCap', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#bigCapBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, false, 'bigCap', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#bigCupBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, true, true, 'bigCup', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#bigCupBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, true, 'bigCup', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#bigCupBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, false, 'bigCup', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#bigSqCapBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, true, true, 'bigSqCap', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#bigSqCapBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, true, 'bigSqCap', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#bigSqCapBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, false, 'bigSqCap', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#bigSqCupBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, true, true, 'bigSqCup', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#bigSqCupBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, true, 'bigSqCup', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#bigSqCupBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, false, 'bigSqCup', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#prodBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, true, true, 'prod', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#prodBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, true, 'prod', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#prodBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, false, 'prod', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#coProdBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, true, true, 'coProd', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#coProdBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, true, 'coProd', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#coProdBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, false, 'coProd', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#bigVeeBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, true, true, 'bigVee', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#bigVeeBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, true, 'bigVee', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#bigVeeBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, false, 'bigVee', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#bigWedgeBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, true, true, 'bigWedge', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#bigWedgeBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, true, 'bigWedge', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#bigWedgeBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(false, false, false, 'bigWedge', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#inlineSumBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, true, true, 'sum', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#inlineSumBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, false, true, 'sum', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#inlineBigCapBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, true, true, 'bigCap', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#inlineBigCapBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, false, true, 'bigCap', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#inlineBigCupBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, true, true, 'bigCup', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#inlineBigCupBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, false, true, 'bigCup', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#inlineBigSqCapBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, true, true, 'bigSqCap', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#inlineBigSqCapBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, false, true, 'bigSqCap', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#inlineBigSqCupBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, true, true, 'bigSqCup', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#inlineBigSqCupBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, false, true, 'bigSqCup', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#inlineProdBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, true, true, 'prod', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#inlineProdBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, false, true, 'prod', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#inlineCoProdBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, true, true, 'coProd', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#inlineCoProdBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, false, true, 'coProd', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#inlineBigVeeBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, true, true, 'bigVee', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#inlineBigVeeBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, false, true, 'bigVee', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#inlineBigWedgeBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, true, true, 'bigWedge', symbolSizeConfig);
        insertWrapper(bigOperator);
    });
    $(document).on('mousedown', '#inlineBigWedgeBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var bigOperator = new eqEd.BigOperatorWrapper(true, false, true, 'bigWedge', symbolSizeConfig);
        insertWrapper(bigOperator);
    });

    ////////////////////////////////////////////////////////////////

    $(document).on('mousedown', '#integralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, true, true, 'single', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#integralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, true, 'single', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#integralNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, false, 'single', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#doubleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, true, true, 'double', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#doubleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, true, 'double', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#doubleIntegralNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, false, 'double', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#tripleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, true, true, 'triple', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#tripleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, true, 'triple', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#tripleIntegralNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, false, 'triple', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#contourIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, true, true, 'singleContour', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#contourIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, true, 'singleContour', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#contourIntegralNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, false, 'singleContour', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#contourDoubleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, true, true, 'doubleContour', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#contourDoubleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, true, 'doubleContour', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#contourDoubleIntegralNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, false, 'doubleContour', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#contourTripleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, true, true, 'tripleContour', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#contourTripleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, true, 'tripleContour', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#contourTripleIntegralNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(false, false, false, 'tripleContour', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#inlineIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, true, true, 'single', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#inlineIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, false, true, 'single', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#inlineDoubleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, true, true, 'double', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#inlineDoubleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, false, true, 'double', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#inlineTripleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, true, true, 'triple', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#inlineTripleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, false, true, 'triple', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#inlineContourIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, true, true, 'singleContour', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#inlineContourIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, false, true, 'singleContour', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#inlineContourDoubleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, true, true, 'doubleContour', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#inlineContourDoubleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, false, true, 'doubleContour', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#inlineContourTripleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, true, true, 'tripleContour', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#inlineContourTripleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var integralWrapper = new eqEd.IntegralWrapper(true, false, true, 'tripleContour', symbolSizeConfig);
        insertWrapper(integralWrapper);
    });

    $(document).on('mousedown', '#partialDifferentialButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var differentialWrapper = new eqEd.SymbolWrapper('&#8706;', "MathJax_Main", symbolSizeConfig);
        insertWrapper(differentialWrapper);
    });

    ///////////////////////////////////////////////////////

    $(document).on('mousedown', '#logButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('log', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#lnButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('ln', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#limButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('lim', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#maxButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('max', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#minButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('min', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#supButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('sup', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#infButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('inf', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#sinButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('sin', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#cosButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('cos', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#tanButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('tan', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#cotButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('cot', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#secButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('sec', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#cscButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('csc', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#sinhButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('sinh', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#coshButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('cosh', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#tanhButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('tanh', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#cothButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('coth', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#sechButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('sech', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#cschButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionWrapper('csch', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#limitButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var limitWrapper = new eqEd.LimitWrapper(symbolSizeConfig);
        insertWrapper(limitWrapper);
    });

    $(document).on('mousedown', '#maxLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionLowerWrapper('max', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#minLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.FunctionLowerWrapper('min', "MathJax_Main", symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#logLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var functionWrapper = new eqEd.LogLowerWrapper(symbolSizeConfig);
        insertWrapper(functionWrapper);
    });

    $(document).on('mousedown', '#matrixButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var rows = parseInt($('#rows').val());
        var cols = parseInt($('#cols').val());
        var matrixWrapper = new eqEd.MatrixWrapper(rows, cols, 'center', symbolSizeConfig);
        insertWrapper(matrixWrapper);
    });

    $(document).on('mousedown', '#dotAccentButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var accentWrapper = new eqEd.AccentWrapper('&#729;', 'MathJax_Main', symbolSizeConfig);
        insertWrapper(accentWrapper);
    });

    $(document).on('mousedown', '#hatAccentButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var accentWrapper = new eqEd.AccentWrapper('^', 'MathJax_Main', symbolSizeConfig);
        insertWrapper(accentWrapper);
    });

    $(document).on('mousedown', '#vectorAccentButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var accentWrapper = new eqEd.AccentWrapper('&#8407;', 'MathJax_Main', symbolSizeConfig);
        insertWrapper(accentWrapper);
    });

    $(document).on('mousedown', '#barAccentButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var accentWrapper = new eqEd.AccentWrapper('&#175;', 'MathJax_Main', symbolSizeConfig);
        insertWrapper(accentWrapper);
    });

    $(document).on('mousedown', '#greekButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var value = '&#' + $('#greek').val().charCodeAt(0) + ';';
        var upperCaseGreek = [
            '&#915;', '&#916;', '&#920;', '&#923;', '&#926;',
            '&#928;', '&#931;', '&#933;', '&#934;', '&#936;',
            '&#937;'
        ];
        var symbolWrapper = null;
        if (upperCaseGreek.contains(value)) {
            symbolWrapper = new eqEd.SymbolWrapper(value, "MathJax_Main", symbolSizeConfig);
        } else {
            symbolWrapper = new eqEd.SymbolWrapper(value, "MathJax_MathItalic", symbolSizeConfig);
        }
        insertWrapper(symbolWrapper);
    });
};