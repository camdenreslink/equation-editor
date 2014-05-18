eqEd.SymbolSizeConfiguration = function() {
    this.fontSizes = ["fontSizeSmallest", "fontSizeSmaller", "fontSizeNormal"];
    this.fontStyles = ["MathJax_MathItalic", "MathJax_Main", "MathJax_Size3", "MathJax_Size4"];
    // Lists all characters which need to be rendered in a normal font.
    this.MathJax_Main = ['0', '1', '2', '3', '4', '5', '6', '7', '8', 
                 '9', '&#x2212;', '&#x00f7;', '&#x22c5;', '&#x2248;', '*',
                 '-', '=', '+', '/', '<', '>', '&#60;', '&#62;', '&#x2264;', 
                 '&#x2265;', '&#x221e;', '%', '!', '$', '.', '(', ')', '[', 
                 ']', '{', '}'];
    // Lists all characters which need to be rendered in an italic font. 
    this.MathJax_MathItalic = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
                 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 
                 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A',
                 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
                 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '&Alpha;', 
                 '&Beta;', '&Gamma;', '&Delta;', '&Epsilon;', 
                 '&Zeta;', '&Eta;', '&Theta;', '&Iota;', '&Kappa;', 
                 '&Lambda;', '&Mu;', '&Nu;', '&Xi;', '&Omicron;', 
                 '&Pi;', '&Rho;','&Sigma;', '&Tau;', '&Upsilon;', 
                 '&Phi;', '&Chi;', '&Psi;', '&Omega;', '&alpha;', 
                 '&beta;', '&gamma;', '&delta;', '&epsilon;', '&zeta;', 
                 '&eta;', '&theta;', '&iota;', '&kappa;', '&lambda;', 
                 '&mu;', '&nu;', '&xi;', '&omicron;', '&pi;', '&rho;', 
                 '&sigma;', '&tau;', '&upsilon;', '&phi;', '&chi;', 
                 '&psi;', '&omega;', '&#x03C2;', '&#x2202;'];
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
    // Eventual format will be this.height[fontStyle] = pixel size;
    // needs to be mapped by hand.
    // NOTE: Might want to add automatic process in the future.
    this.height = {
        "fontSizeMessage": 20,
        "fontSizeSmallest": 37, 
        "fontSizeSmaller": 37, 
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
                    this.width[character][fontStyle][fontSize] = fontTest.outerWidth();
                    
                    fontTest.remove();
                }
            }
        }
    }
})();