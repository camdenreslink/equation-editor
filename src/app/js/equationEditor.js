$(window).load(function () {
    var symbolSizeConfig = null;
    var fontsLoaded = false;
    var imagesLoaded = false;
    var setupInitialContainer = function() {
        ///*
        var container = new eqEd.Container(symbolSizeConfig);
        container.padTop = 0.2;
        container.padBottom = 0.2;
        container.fontSize = "fontSizeNormal";
        container.domObj = container.buildDomObj();
        container.domObj.updateFontSize(container.fontSize);
        container.domObj.value.addClass('equation');
        $('.testEquation').after(container.domObj.value);
        var topLevelEmptyContainerWrapper = new eqEd.TopLevelEmptyContainerWrapper(symbolSizeConfig);
        container.addWrappers([0, topLevelEmptyContainerWrapper]);
        topLevelEmptyContainerWrapper.updateAll();
        //*/
    };

    var setup = function() {
        if (fontsLoaded && imagesLoaded) {
            symbolSizeConfig = new eqEd.SymbolSizeConfiguration();
            inializePropertyHooks(symbolSizeConfig);
            setupKeyboardEvents(symbolSizeConfig);
            setupMenuEvents(symbolSizeConfig);
            setupInitialContainer();
        }
    }

    var loadFonts = function(fontList, cssPath, callback) {
        WebFont.load({
            custom: {
                families: fontList,
                urls: [cssPath]
            },
            active: function() {
                fontsLoaded = true;
                callback();
            }
        });
    };

    var loadImages = function(arrayOfImages, callback) {
        $(arrayOfImages).each(function () {
            $('<img />').attr('src',this).appendTo('body').css('display','none');
        });
        imagesLoaded = true;
        callback();
    };

    loadFonts(['MathJax_Main', 'MathJax_Math:i4', 'MathJax_Size1', 'MathJax_Size2', 'MathJax_Size3', 'MathJax_Size4'], '../../Fonts/TeX/font.css', setup);
    loadImages(['../../Images/radical.png', '../../Images/radicalHighlight.png', '../../Images/radicalDiagonalLine.png', '../../Images/radicalDiagonalLineHighlight.png', '../../Images/sumOperator.png', '../../Images/sumOperatorHighlight.png'], setup);
});