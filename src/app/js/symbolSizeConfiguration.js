eqEd.SymbolSizeConfiguration = function() {
    this.fontSizes = ["fontSizeSmallest", "fontSizeSmaller", "fontSizeNormal"];
    this.fontStyles = ["MathJax_MathItalic", "MathJax_Main", "MathJax_MainItalic", "MathJax_Size1", "MathJax_Size2","MathJax_Size3", "MathJax_Size4"];
    // Lists all characters which need to be rendered in a normal font.
    this.MathJax_Main = ['0', '1', '2', '3', '4', '5', '6', '7', '8', 
                 '9', '&#x2212;', '&#x00f7;', '&#x22c5;', '&#x2248;', '*',
                 '-', '=', '+', '/', '<', '>', '&#60;', '&#62;', '&#x2264;', 
                 '&#x2265;', '&#x221e;', '%', '!', '$', '.', '(', ')', '[', 
                 ']', '{', '}', '&#8706;', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
                 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 
                 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A',
                 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
                 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '&#8594;', '^',
                 '&#729;', '&#915;', '&#916;', '&#920;', '&#923;', '&#926;',
                  '&#928;', '&#931;', '&#933;', '&#934;', '&#936;',
                  '&#937;', '&#8712;', '&#8407;', '&#175;'];
    this.MathJax_MainItalic = ['&#305;', '&#567;'];
    // Lists all characters which need to be rendered in an italic font. 
    this.MathJax_MathItalic = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
                 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 
                 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A',
                 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
                 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '&#915;', 
                 '&#916;', '&#920;', '&#923;', '&#926;', '&#928;', 
                 '&#931;', '&#933;', '&#934;', '&#936;', '&#937;', 
                 '&#945;', '&#946;', '&#947;', '&#948;', '&#949;', 
                 '&#1013;', '&#950;', 
                 '&#951;', '&#952;', '&#977;','&#953;', '&#954;', '&#955;', 
                 '&#956;', '&#957;', '&#958;', '&#960;', '&#982;','&#961;', '&#1009;', 
                 '&#963;', '&#962;','&#964;', '&#965;', '&#966;', '&#981;', '&#967;', 
                 '&#968;', '&#969;', '&#x03C2;'];
    this.MathJax_Size1 = [];
    this.MathJax_Size2 = [];
    this.MathJax_Size3 = ['(', ')', '{', '}', '[', ']'];
    this.MathJax_Size4 = ['(', ')', '{', '}', '[', ']', '&#9115;',
                          '&#9116;', '&#9117;', '&#9118;', '&#9119;',
                          '&#9120;', '&#9127;', '&#9130;', '&#9128;', 
                          '&#9129;', '&#9131;', '&#9130;', '&#9132;', 
                          '&#9133;', '&#9121;', '&#9122;', '&#9123;', 
                          '&#9124', '&#9125;', '&#9126;'];
    // This will be the union of the characters in each font style.
    // Can be used to see if a character is allowed to be part of an equation.
    this.character = [];
    this.shortCharacters = ['a', 'c', 'e', 'g', '&#305;', '&#567;', 'm',
                            'n', 'o', 'p', 'q', 'r', 's', 'u', 'v', 'w', 'x', 'y', 'z',
                            '&#945;', '&#947;', '&#949;', '&#1013;', '&#951;', '&#953;',
                            '&#954;', '&#956;', '&#957;', '&#960;', '&#982;', '&#961;',
                            '&#1009;', '&#963;', '&#962;','&#964;', '&#965;', '&#966;', 
                            '&#967;', '&#969;'];
    this.mediumCharacters = ['i', 'j','t'];
    this.tallCharacters = ['b', 'd', 'f', 'h', 'k', 'l', 'A', 'B', 'C', 'D', 'E', 'F',
                           'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                           'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '&#946;', '&#948;',
                           '&#950;', '&#952;', '&#977;', '&#955;', '&#958;', '&#981;',
                           '&#968;', '&#915;', '&#916;', '&#920;', '&#923;', '&#926;',
                           '&#928;', '&#931;', '&#933;', '&#934;', '&#936;', '&#937;'];
    this.charWidthExceedsBoundingBox = {
        'b': 0.01,
        'c': 0.01,
        'd': 0.01,
        'f': 0.15,
        'g': 0.01,
        'q': 0.075,
        'y': 0.01,
        'z': 0.01,
        'B': 0.01,
        'C': 0.0875,
        'E': 0.0875,
        'F': 0.2,
        'H': 0.1,
        'I': 0.175,
        'J': 0.15,
        'K': 0.075,
        'M': 0.075,
        'N': 0.125,
        'P': 0.175,
        'R': 0.02,
        'S': 0.04,
        'T': 0.25,
        'U': 0.15,
        'V': 0.33,
        'W': 0.13,
        'X': 0.075,
        'Y': 0.33,
        'Z': 0.08,
        '&#946;': 0.05,
        '&#947;': 0.05,
        '&#948;': 0.05,
        '&#950;': 0.075,
        '&#951;': 0.05,
        '&#952;': 0.025,
        '&#957;': 0.1,
        '&#958;': 0.025,
        '&#960;': 0.025,
        '&#982;': 0.025,
        '&#961;': 0.025,
        '&#1009;': 0.025,
        '&#963;': 0.015,
        '&#962;': 0.15,
        '&#964;': 0.185,
        '&#965;': 0.015,
        '&#968;': 0.015,
        '&#305;': 0.15,
        '&#567;': 0.15
        //'&#8706;': 0.05
    };
    // Eventual format will be this.height[fontStyle] = pixel size;
    // needs to be mapped by hand.
    // NOTE: Might want to add automatic process in the future.
    this.height = {
        "fontSizeMessage": 20,
        "fontSizeSmallest": 30, 
        "fontSizeSmaller": 35, 
        "fontSizeNormal": 45
    };
    // Eventual format will be this.width[character][fontStyle][fontSize]
    this.width = {};

    //Initialize the object.
    this.computeSymbolSizes();
};

(function() {
    eqEd.SymbolSizeConfiguration.prototype.computeSymbolSizes = function() {
        //  This method will compute the heights and widths for each available character
        //  at each available font size, and font style and store them in the eqEd.SymbolSizeConfiguration
        //  object.  This method should get called on the initialization of the editor. The
        //  purpose of this, is to allow all formatting calculation to be done in pure javascript
        //  after initialization is complete. This saves constantly dipping into the dom to
        //  check the heights widths of characters/containers/wrappers etc. Makes the code
        //  cleaner, and should give a performance boost.
        
        for (var i = 0; i < this.fontStyles.length; i++) {
            var fontStyle = this.fontStyles[i];
            for (var j = 0; j < this[fontStyle].length; j++) {
                var character = this[fontStyle][j];
                this.character.push(character);
                for (var k = 0; k < this.fontSizes.length; k++) {
                    var fontSize = this.fontSizes[k];
                    $('.testEquation').append('<div class="' + fontSize + ' ' + fontStyle + ' fontTest" id="fontTest">' + character + '</div>');
                    var fontTest = $('#fontTest');
                    if (typeof this.width[character] === "undefined") {
                        this.width[character] = {};
                    }
                    if (typeof this.height[character] === "undefined") {
                        this.height[character] = {};
                    }
                    if (typeof this.width[character][fontStyle] === "undefined") {
                        this.width[character][fontStyle] = {};
                    }
                    if (typeof this.height[character][fontStyle] === "undefined") {
                        this.height[character][fontStyle] = {};
                    }
                    var extraWidth = (typeof this.charWidthExceedsBoundingBox[character] !== "undefined") ? this.charWidthExceedsBoundingBox[character] : 0;
                    this.width[character][fontStyle][fontSize] = fontTest.outerWidth() * (1 + extraWidth);
                    fontTest.remove();
                }
            }
        }
    }
})();