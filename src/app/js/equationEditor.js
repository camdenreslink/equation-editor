var symbolSizeConfig = null;
var clipboard = null;
var fontsLoaded = false;
var imagesLoaded = false;
var setupInitialContainer = function() {
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
};

var setup = function() {
    if (fontsLoaded && imagesLoaded) {
        symbolSizeConfig = new eqEd.SymbolSizeConfiguration();
        $('.loadingMessage').remove();
        clipboard = new eqEd.Clipboard();
        inializePropertyHooks(symbolSizeConfig);
        setupKeyboardEvents(symbolSizeConfig, clipboard);
        setupMenuEvents(symbolSizeConfig);
        setupInitialContainer();
    }
}

// preload fonts, using webfont.js
var loadFonts = function(callback) {
    WebFont.load({
        custom: {
            families: ['MathJax_Main:n4,i4', 'MathJax_Math:i4', 'MathJax_Size1:n4', 'MathJax_Size2:n4', 'MathJax_Size3:n4', 'MathJax_Size4:n4', 'MathJax_AMS:n4'],
            testStrings: {
                'MathJax_Size2:n4': '\u2211\u22C2\u2A00\u220F\u22C3\u2A02\u2210\u2A06\u2A01\u222B\u22C1\u2A04'
            },
            urls: ['../../Fonts/TeX/font.css']
        },
        active: function() {
            fontsLoaded = true;
            callback();
        },
        inactive: function() {
            console.log("Failed to load fonts.");
        }
    });
};

// preload images
// arrayOfImages is an array of the paths to images you want to preload
// ex) ['../../Images/radical.png', '../../Images/radicalHighlight.png', '../../Images/radicalDiagonalLine.png']
var loadImages = function(arrayOfImages, callback) {
    $(arrayOfImages).each(function () {
        $('<img />').attr('src',this).appendTo('body').css('display','none');
    });
    imagesLoaded = true;
    callback();
};

loadFonts(setup);
loadImages([], setup);