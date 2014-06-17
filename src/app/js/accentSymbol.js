eqEd.AccentSymbol = function(character, fontStyle, symbolSizeConfig) {
    eqEd.Symbol.call(this, character, fontStyle, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.AccentSymbol";

    // width has already been added to 
    // properties in superclass needs removed to be overriden
    for(var i = 0; i < this.properties.length; i++) {
        if (this.properties[i].propName === "width") {
            this.properties.splice(i, 1);
        }
    }

    var adjustLeftByChar = {
        'a': 0, 
        'c': 0, 
        'e': 0, 
        'g': 0, 
        '&#305;': 0, 
        'i': 0, 
        '&#567;': 0, 
        'j': 0, 
        'm': 0,
        'n': 0, 
        'o': 0, 
        'p': 0, 
        'q': 0, 
        'r': 0, 
        's': 0, 
        'u': 0, 
        'v': 0, 
        'w': 0, 
        'x': 0, 
        'y': 0, 
        'z': 0,
        '&#945;': 0, 
        '&#947;': 0, 
        '&#949;': 0, 
        '&#1013;': 0, 
        '&#951;': 0, 
        '&#953;': 0,
        '&#954;': 0, 
        '&#956;': 0, 
        '&#957;': 0, 
        '&#960;': 0, 
        '&#982;': 0, 
        '&#961;': 0,
        '&#1009;': 0, 
        '&#963;': 0, 
        '&#962;': 0,
        '&#964;': 0, 
        '&#965;': 0, 
        '&#966;': 0, 
        '&#967;': 0, 
        '&#969;': 0, 
        't': 0.03, 
        'b': 0, 
        'd': 0, 
        'f': 0, 
        'h': 0, 
        'k': 0, 
        'l': 0, 
        'A': 0, 
        'B': 0, 
        'C': 0, 
        'D': 0, 
        'E': 0, 
        'F': 0,
        'G': 0, 
        'H': 0, 
        'I': 0, 
        'J': 0, 
        'K': 0, 
        'L': 0, 
        'M': 0, 
        'N': 0, 
        'O': 0, 
        'P': 0, 
        'Q': 0, 
        'R': 0,
        'S': 0, 
        'T': 0, 
        'U': 0, 
        'V': 0, 
        'W': 0, 
        'X': 0, 
        'Y': 0, 
        'Z': 0, 
        '&#946;': 0, 
        '&#948;': 0,
        '&#950;': 0, 
        '&#952;': 0, 
        '&#977;': 0, 
        '&#955;': 0, 
        '&#958;': 0, 
        '&#981;': 0,
        '&#968;': 0, 
        '&#915;': 0, 
        '&#916;': 0, 
        '&#920;': 0, 
        '&#923;': 0, 
        '&#926;': 0,
        '&#928;': 0, 
        '&#931;': 0, 
        '&#933;': 0, 
        '&#934;': 0, 
        '&#936;': 0, 
        '&#937;': 0
    }

    this.adjustLeft = 0.05;

    this.domObj.addClass('accentSymbol');
    if (this.character === '&#729;') {
        this.domObj.addClass('dotAccent');
    } else if (this.character === '^') {
        this.domObj.addClass('hatAccent');
    }

    // Set up the adjustLeft calculation
    var adjustLeft = 0;
    this.properties.push(new Property(this, "adjustLeft", adjustLeft, {
        get: function() {
            return adjustLeft;
        },
        set: function(value) {
            adjustLeft = value;
        },
        compute: function() {
            var adjustLeftVal = 0;
            if (typeof adjustLeftByChar[this.parent.accentContainerCharacter] !== "undefined") {
                adjustLeftVal = adjustLeftByChar[this.parent.accentContainerCharacter];
            }
            return adjustLeftVal;
        },
        updateDom: function() {}
    }));

    // Set up the left calculation
    var left = 0;
    this.properties.push(new Property(this, "left", left, {
        get: function() {
            return left;
        },
        set: function(value) {
            left = value;
        },
        compute: function() {
            var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
            var fontWidth = this.symbolSizeConfig.width[this.character][this.fontStyle][this.parent.parent.fontSize];
            var leftOffset = 0.5 * (this.parent.width - (this.parent.padLeft + this.parent.padRight) * fontHeight - fontWidth);
            return leftOffset;
        },
        updateDom: function() {
            this.domObj.updateLeft(this.left);
        }
    }));

    // Set up the top calculation
    var top = 0;
    this.properties.push(new Property(this, "top", top, {
        get: function() {
            return top;
        },
        set: function(value) {
            top = value;
        },
        compute: function() {
            var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
            var topVal = 0
            if (this.parent.accentGap < 0) {
                topVal = -1 * this.parent.accentGap * fontHeight;
            }
            return topVal;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));

    // Set up the width calculation
    var width = 0;
    this.properties.push(new Property(this, "width", width, {
        get: function() {
            return width;
        },
        set: function(value) {
            width = value;
        },
        compute: function() {
            var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
            var widthVal = 0;
            if (this.character === '&#729;') {
                widthVal = 0.33 * fontHeight;
            } else if (this.character === '^') {
                widthVal = 0.4 * fontHeight;
            }
            return widthVal;
        },
        updateDom: function() {
            this.domObj.updateWidth(this.width);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.AccentSymbol.prototype = Object.create(eqEd.Symbol.prototype);
    eqEd.AccentSymbol.prototype.constructor = eqEd.AccentSymbol;
})();