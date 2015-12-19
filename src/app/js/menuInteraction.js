var setupMenuEvents = function() {
    var getEquation = function() {
        var equation = null;
        if ($('.cursor').length > 0) {
            equation = $('.cursor').parent().data('eqObject').equation;
        } else if ($('.highlight').length > 0) {
            equation = $('.highlight').parent().data('eqObject').equation;
        }
        return equation;
    };

    $(document).on('touchstart mousedown', '#stackedFractionButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var stackedFractionWrapper = new eqEd.StackedFractionWrapper(equation);
        insertWrapper(stackedFractionWrapper);
    });
    $(document).on('touchstart mousedown', '#superscriptButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var superscriptWrapper = new eqEd.SuperscriptWrapper(equation);
        insertWrapper(superscriptWrapper);
    });
    $(document).on('touchstart mousedown', '#subscriptButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var subscriptWrapper = new eqEd.SubscriptWrapper(equation);
        insertWrapper(subscriptWrapper);
    });
    $(document).on('touchstart mousedown', '#superscriptAndSubscriptButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var superscriptAndSubscriptWrapper = new eqEd.SuperscriptAndSubscriptWrapper(equation);
        insertWrapper(superscriptAndSubscriptWrapper);
    });
    $(document).on('touchstart mousedown', '#squareRootButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var squareRootWrapper = new eqEd.SquareRootWrapper(equation);
        insertWrapper(squareRootWrapper);
    });
    $(document).on('touchstart mousedown', '#nthRootButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var nthRootButton = new eqEd.NthRootWrapper(equation);
        insertWrapper(nthRootButton);
    });
    
    $(document).on('touchstart mousedown', '#leftAngleBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var leftAngleBracketWrapper = new eqEd.BracketWrapper(equation, "leftAngleBracket");
        insertWrapper(leftAngleBracketWrapper);
    });
    $(document).on('touchstart mousedown', '#rightAngleBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var rightAngleBracketWrapper = new eqEd.BracketWrapper(equation, "rightAngleBracket");
        insertWrapper(rightAngleBracketWrapper);
    });
    $(document).on('touchstart mousedown', '#leftFloorBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var leftFloorBracketWrapper = new eqEd.BracketWrapper(equation, "leftFloorBracket");
        insertWrapper(leftFloorBracketWrapper);
    });
    $(document).on('touchstart mousedown', '#rightFloorBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var rightFloorBracketWrapper = new eqEd.BracketWrapper(equation, "rightFloorBracket");
        insertWrapper(rightFloorBracketWrapper);
    });
    $(document).on('touchstart mousedown', '#leftCeilBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var leftCeilBracketWrapper = new eqEd.BracketWrapper(equation, "leftCeilBracket");
        insertWrapper(leftCeilBracketWrapper);
    });
    $(document).on('touchstart mousedown', '#rightCeilBracketButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var rightCeilBracketWrapper = new eqEd.BracketWrapper(equation, "rightCeilBracket");
        insertWrapper(rightCeilBracketWrapper);
    });
    $(document).on('touchstart mousedown', '#parenthesesBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var parenthesesBracketPair = new eqEd.BracketPairWrapper(equation, "parenthesisBracket");
        insertWrapper(parenthesesBracketPair);
    });
    $(document).on('touchstart mousedown', '#squareBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var squareBracketPair = new eqEd.BracketPairWrapper(equation, "squareBracket");
        insertWrapper(squareBracketPair);
    });
    $(document).on('touchstart mousedown', '#curlyBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var curlyBracketPair = new eqEd.BracketPairWrapper(equation, "curlyBracket");
        insertWrapper(curlyBracketPair);
    });
    $(document).on('touchstart mousedown', '#angleBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var angleBracketPair = new eqEd.BracketPairWrapper(equation, "angleBracket");
        insertWrapper(angleBracketPair);
    });$(document).on('touchstart mousedown', '#floorBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var floorBracketPair = new eqEd.BracketPairWrapper(equation, "floorBracket");
        insertWrapper(floorBracketPair);
    });
    $(document).on('touchstart mousedown', '#ceilBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var ceilBracketPair = new eqEd.BracketPairWrapper(equation, "ceilBracket");
        insertWrapper(ceilBracketPair);
    });
    $(document).on('touchstart mousedown', '#absValBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var absValBracketPair = new eqEd.BracketPairWrapper(equation, "absValBracket");
        insertWrapper(absValBracketPair);
    });
    $(document).on('touchstart mousedown', '#normBracketPairButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var normBracketPair = new eqEd.BracketPairWrapper(equation, "normBracket");
        insertWrapper(normBracketPair);
    });
    $(document).on('touchstart mousedown', '#sumBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, true, true, 'sum');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#sumBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, false, true, 'sum');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#sumBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, false, false, 'sum');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigCapBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, true, true, 'bigCap');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigCapBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, false, true, 'bigCap');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigCapBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, false, false, 'bigCap');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigCupBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, true, true, 'bigCup');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigCupBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, false, true, 'bigCup');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigCupBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, false, false, 'bigCup');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigSqCapBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, true, true, 'bigSqCap');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigSqCapBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, false, true, 'bigSqCap');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigSqCapBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, false, false, 'bigSqCap');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigSqCupBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, true, true, 'bigSqCup');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigSqCupBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, false, true, 'bigSqCup');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigSqCupBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, false, false, 'bigSqCup');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#prodBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, true, true, 'prod');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#prodBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, false, true, 'prod');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#prodBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, false, false, 'prod');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#coProdBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, true, true, 'coProd');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#coProdBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, false, true, 'coProd');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#coProdBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, false, false, 'coProd');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigVeeBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, true, true, 'bigVee');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigVeeBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, false, true, 'bigVee');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigVeeBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, false, false, 'bigVee');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigWedgeBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, true, true, 'bigWedge');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigWedgeBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, false, true, 'bigWedge');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#bigWedgeBigOperatorNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, false, false, false, 'bigWedge');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineSumBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, true, true, true, 'sum');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineSumBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, true, false, true, 'sum');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigCapBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, true, true, true, 'bigCap');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigCapBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, true, false, true, 'bigCap');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigCupBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, true, true, true, 'bigCup');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigCupBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, true, false, true, 'bigCup');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigSqCapBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, true, true, true, 'bigSqCap');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigSqCapBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, true, false, true, 'bigSqCap');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigSqCupBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, true, true, true, 'bigSqCup');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigSqCupBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, true, false, true, 'bigSqCup');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineProdBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, true, true, true, 'prod');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineProdBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, true, false, true, 'prod');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineCoProdBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, true, true, true, 'coProd');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineCoProdBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, true, false, true, 'coProd');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigVeeBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, true, true, true, 'bigVee');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigVeeBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, true, false, true, 'bigVee');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigWedgeBigOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, true, true, true, 'bigWedge');
        insertWrapper(bigOperator);
    });
    $(document).on('touchstart mousedown', '#inlineBigWedgeBigOperatorNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var bigOperator = new eqEd.BigOperatorWrapper(equation, true, false, true, 'bigWedge');
        insertWrapper(bigOperator);
    });

    ////////////////////////////////////////////////////////////////

    $(document).on('touchstart mousedown', '#integralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, false, true, true, 'single');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#integralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, false, false, true, 'single');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#integralNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, false, false, false, 'single');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#doubleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, false, true, true, 'double');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#doubleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, false, false, true, 'double');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#doubleIntegralNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, false, false, false, 'double');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#tripleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, false, true, true, 'triple');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#tripleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, false, false, true, 'triple');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#tripleIntegralNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, false, false, false, 'triple');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#contourIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, false, true, true, 'singleContour');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#contourIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, false, false, true, 'singleContour');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#contourIntegralNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, false, false, false, 'singleContour');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#contourDoubleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, false, true, true, 'doubleContour');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#contourDoubleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, false, false, true, 'doubleContour');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#contourDoubleIntegralNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, false, false, false, 'doubleContour');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#contourTripleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, false, true, true, 'tripleContour');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#contourTripleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, false, false, true, 'tripleContour');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#contourTripleIntegralNoUpperNoLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, false, false, false, 'tripleContour');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, true, true, true, 'single');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, true, false, true, 'single');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineDoubleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, true, true, true, 'double');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineDoubleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, true, false, true, 'double');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineTripleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, true, true, true, 'triple');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineTripleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, true, false, true, 'triple');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineContourIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, true, true, true, 'singleContour');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineContourIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, true, false, true, 'singleContour');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineContourDoubleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, true, true, true, 'doubleContour');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineContourDoubleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, true, false, true, 'doubleContour');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineContourTripleIntegralButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, true, true, true, 'tripleContour');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#inlineContourTripleIntegralNoUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var integralWrapper = new eqEd.IntegralWrapper(equation, true, false, true, 'tripleContour');
        insertWrapper(integralWrapper);
    });

    $(document).on('touchstart mousedown', '#partialDifferentialButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var differentialWrapper = new eqEd.SymbolWrapper(equation, '∂', "MathJax_Main");
        insertWrapper(differentialWrapper);
    });

    ///////////////////////////////////////////////////////

    $(document).on('touchstart mousedown', '#logButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'log', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#lnButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'ln', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#limButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'lim', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#maxButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'max', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#minButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'min', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#supButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'sup', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#infButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'inf', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#sinButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'sin', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#cosButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'cos', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#tanButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'tan', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#cotButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'cot', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#secButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'sec', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#cscButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'csc', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#sinhButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'sinh', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#coshButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'cosh', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#tanhButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'tanh', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#cothButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'coth', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#sechButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'sech', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#cschButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionWrapper(equation, 'csch', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#limitButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var limitWrapper = new eqEd.LimitWrapper(equation);
        insertWrapper(limitWrapper);
    });

    $(document).on('touchstart mousedown', '#maxLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionLowerWrapper(equation, 'max', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#minLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.FunctionLowerWrapper(equation, 'min', "MathJax_Main");
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#logLowerButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var functionWrapper = new eqEd.LogLowerWrapper(equation);
        insertWrapper(functionWrapper);
    });

    $(document).on('touchstart mousedown', '#matrixButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        $('#rows').blur();
        $('#cols').blur();
        var rows = parseInt($('#rows').val());
        var cols = parseInt($('#cols').val());
        var matrixWrapper = new eqEd.MatrixWrapper(equation, rows, cols, 'center');
        insertWrapper(matrixWrapper);
    });

    $(document).on('touchstart mousedown', '#dotAccentButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var accentWrapper = new eqEd.AccentWrapper(equation, '˙', 'MathJax_Main');
        insertWrapper(accentWrapper);
    });

    $(document).on('touchstart mousedown', '#hatAccentButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var accentWrapper = new eqEd.AccentWrapper(equation, '^', 'MathJax_Main');
        insertWrapper(accentWrapper);
    });

    $(document).on('touchstart mousedown', '#vectorAccentButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var accentWrapper = new eqEd.AccentWrapper(equation, '⃗', 'MathJax_Main');
        insertWrapper(accentWrapper);
    });

    $(document).on('touchstart mousedown', '#barAccentButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var accentWrapper = new eqEd.AccentWrapper(equation, '¯', 'MathJax_Main');
        insertWrapper(accentWrapper);
    });

    $(document).on('touchstart mousedown', '#gammaUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'Γ', "MathJax_Main");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#deltaUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'Δ', "MathJax_Main");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#thetaUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'Θ', "MathJax_Main");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#lambdaUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'Λ', "MathJax_Main");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#xiUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'Ξ', "MathJax_Main");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#piUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'Π', "MathJax_Main");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#sigmaUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'Σ', "MathJax_Main");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#upsilonUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'Υ', "MathJax_Main");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#phiUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'Φ', "MathJax_Main");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#psiUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'Ψ', "MathJax_Main");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#omegaUpperButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'Ω', "MathJax_Main");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#alphaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'α', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#betaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'β', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#gammaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'γ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#deltaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'δ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#varEpsilonButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'ε', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#epsilonButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'ϵ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#zetaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'ζ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#etaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'η', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#thetaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'θ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#varThetaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'ϑ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#iotaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'ι', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#kappaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'κ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#lambdaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'λ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#muButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'μ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#nuButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'ν', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#xiButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'ξ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#piButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'π', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#varPiButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'ϖ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#rhoButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'ρ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#varRhoButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'ϱ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#sigmaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'σ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#varSigmaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'ς', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#tauButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'τ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#upsilonButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'υ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#varPhiButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'φ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#phiButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'ϕ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#chiButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'χ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#psiButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'ψ', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#omegaButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, 'ω', "MathJax_MathItalic");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#lessThanOrEqualToButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '≤', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });
    $(document).on('touchstart mousedown', '#greaterThanOrEqualToButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '≥', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });
    $(document).on('touchstart mousedown', '#circleOperatorButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '◦', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });
    $(document).on('touchstart mousedown', '#approxEqualToButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '≈', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });
    $(document).on('touchstart mousedown', '#belongsToButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '∈', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#timesButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '×', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#pmButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '±', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#wedgeButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '∧', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#veeButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '∨', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#equivButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '≡', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#congButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '≅', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#neqButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '≠', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#simButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '∼', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#proptoButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '∝', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#precButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '≺', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#precEqButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '⪯', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#subsetButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '⊂', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#subsetEqButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '⊆', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#succButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '≻', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#succEqButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '⪰', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#perpButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '⊥', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#midButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '∣', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#parallelButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, '∥', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#colonButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var operatorWrapper = new eqEd.OperatorWrapper(equation, ':', "MathJax_Main");
        insertWrapper(operatorWrapper);
    });

    $(document).on('touchstart mousedown', '#partialButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, '∂', "MathJax_Main");
        insertWrapper(symbolWrapper);
    });

    $(document).on('touchstart mousedown', '#infinityButton', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var equation = getEquation();
        var symbolWrapper = new eqEd.SymbolWrapper(equation, '∞', "MathJax_Main");
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