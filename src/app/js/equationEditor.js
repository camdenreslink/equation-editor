var fontsLoaded = false;
var imagesLoaded = false;
var spinner = null;
$(document).ready(function() {
    var opts = {
      lines: 9 // The number of lines to draw
    , length: 12 // The length of each line
    , width: 6 // The line thickness
    , radius: 12 // The radius of the inner circle
    , scale: 1 // Scales overall size of the spinner
    , corners: 1 // Corner roundness (0..1)
    , color: '#000' // #rgb or #rrggbb or array of colors
    , opacity: 0.25 // Opacity of the lines
    , rotate: 0 // The rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 1 // Rounds per second
    , trail: 60 // Afterglow percentage
    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
    , zIndex: 2e9 // The z-index (defaults to 2000000000)
    , className: 'spinner' // The CSS class to assign to the spinner
    , top: '50%' // Top position relative to parent
    , left: '30%' // Left position relative to parent
    , shadow: false // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration
    , position: 'absolute' // Element positioning
    };

    var target = document.getElementById('loadingMessage');
    spinner = new Spinner(opts).spin(target);
});

var setup = function() {
    if (fontsLoaded && imagesLoaded) {
        spinner.stop();
        $('#loadingMessage').remove();
        $('#loadingMessageOuter').remove();
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