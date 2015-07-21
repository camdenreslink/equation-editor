eqEd.SymbolSizeConfiguration = function() {
    this.fontSizes = ["fontSizeSmallest", "fontSizeSmaller", "fontSizeNormal"];
    this.fontStyles = ["MathJax_MathItalic", "MathJax_Main", "MathJax_MainItalic", "MathJax_Size1", "MathJax_Size2","MathJax_Size3", "MathJax_Size4"];
    // Lists all characters which need to be rendered in a normal font.
    this.MathJax_Main = ['0', '1', '2', '3', '4', '5', '6', '7', '8', 
                 '9', '−', '÷', '⋅', '≈', '*',
                 '-', '=', '+', '/', '<', '>', '≤', 
                 '≥', '∞', '%', '!', '$', '.', '(', ')', '[', 
                 ']', '{', '}', '∂', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
                 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 
                 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A',
                 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
                 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '→', '^',
                 '˙', 'Γ', 'Δ', 'Θ', 'Λ', 'Ξ',
                  'Π', 'Σ', 'Υ', 'Φ', 'Ψ',
                  'Ω', '∈', '⃗', '¯', '◦',
                  '×', '±', '∧', '∨', '∖',
                  '≡', '≅', '≠', '∼', '∝',
                  '≺', '⪯', '⊂', '⊆', '≻',
                  '⪰', '⊥', '∣', '∥', ':',
                  '′'];
    this.MathJax_MainItalic = ['ı', 'ȷ'];
    // Lists all characters which need to be rendered in an italic font. 
    this.MathJax_MathItalic = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
                 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 
                 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A',
                 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
                 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Γ', 
                 'Δ', 'Θ', 'Λ', 'Ξ', 'Π', 
                 'Σ', 'Υ', 'Φ', 'Ψ', 'Ω', 
                 'α', 'β', 'γ', 'δ', 'ε', 
                 'ϵ', 'ζ', 
                 'η', 'θ', 'ϑ','ι', 'κ', 'λ', 
                 'μ', 'ν', 'ξ', 'π', 'ϖ','ρ', 'ϱ', 
                 'σ', 'ς','τ', 'υ', 'φ', 'ϕ', 'χ', 
                 'ψ', 'ω', 'ς', '\''];
    this.MathJax_Size1 = [];
    this.MathJax_Size2 = [];
    this.MathJax_Size3 = ['(', ')', '{', '}', '[', ']'];
    this.MathJax_Size4 = ['(', ')', '{', '}', '[', ']', '⎛',
                          '⎜', '⎝', '⎞', '⎟',
                          '⎠', '⎧', '⎪', '⎨', 
                          '⎩', '⎫', '⎪', '⎬', 
                          '⎭', '⎡', '⎢', '⎣', 
                          '⎤', '⎥', '⎦'];
    // This will be the union of the characters in each font style.
    // Can be used to see if a character is allowed to be part of an equation.
    this.character = [];
    this.shortCharacters = ['a', 'c', 'e', 'g', 'ı', 'ȷ', 'm',
                            'n', 'o', 'p', 'q', 'r', 's', 'u', 'v', 'w', 'x', 'y', 'z',
                            'α', 'γ', 'ε', 'ϵ', 'η', 'ι',
                            'κ', 'μ', 'ν', 'π', 'ϖ', 'ρ',
                            'ϱ', 'σ', 'ς','τ', 'υ', 'φ', 
                            'χ', 'ω'];
    this.mediumCharacters = ['i', 'j','t'];
    this.tallCharacters = ['b', 'd', 'f', 'h', 'k', 'l', 'A', 'B', 'C', 'D', 'E', 'F',
                           'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                           'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'β', 'δ',
                           'ζ', 'θ', 'ϑ', 'λ', 'ξ', 'ϕ',
                           'ψ', 'Γ', 'Δ', 'Θ', 'Λ', 'Ξ',
                           'Π', 'Σ', 'Υ', 'Φ', 'Ψ', 'Ω'];
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
        'β': 0.05,
        'γ': 0.05,
        'δ': 0.05,
        'ζ': 0.075,
        'η': 0.05,
        'θ': 0.025,
        'ν': 0.1,
        'ξ': 0.025,
        'π': 0.025,
        'ϖ': 0.025,
        'ρ': 0.025,
        'ϱ': 0.025,
        'σ': 0.015,
        'ς': 0.15,
        'τ': 0.185,
        'υ': 0.015,
        'ψ': 0.015,
        'ı': 0.15,
        'ȷ': 0.15
        //'∂': 0.05
    };
    // Eventual format will be this.height[fontStyle] = pixel size;
    // needs to be mapped by hand.
    // NOTE: Might want to add automatic process in the future.
    this.height = {
        "fontSizeMessage": parseInt($.getCSS('fontSizeMessage', "font-size"), 10),
        "fontSizeSmallest": parseInt($.getCSS('fontSizeSmallest', "font-size"), 10), 
        "fontSizeSmaller": parseInt($.getCSS('fontSizeSmaller', "font-size"), 10),
        "fontSizeNormal": parseInt($.getCSS('fontSizeNormal', "font-size"), 10)
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