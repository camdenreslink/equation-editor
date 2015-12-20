var fontsLoaded = false;
var imagesLoaded = false;

var setup = function() {
    if (fontsLoaded && imagesLoaded) {
        $('.loadingMessage').remove();
        initializePropertyHooks();
        setupKeyboardEvents();
        setupMenuEvents();
        var equation = new eqEd.Equation();
        $('.equation-editor').replaceWith(equation.domObj.value);
        equation.updateAll();
        //setupInitialContainer();
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