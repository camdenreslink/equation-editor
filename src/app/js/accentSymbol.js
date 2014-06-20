eqEd.AccentSymbol = function(character, fontStyle, symbolSizeConfig) {
    eqEd.Symbol.call(this, character, fontStyle, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.AccentSymbol";

    // width has already been added to 
    // properties in superclass needs removed to be overriden
    for(var i = 0; i < this.properties.length; i++) {
        if (this.properties[i].propName === "width"
            || this.properties[i].propName === "left"
            || this.properties[i].propName === "top") {
            this.properties.splice(i, 1);
        }
    }

    var adjustLeftByChar = {
        'squareEmptyContainerWrapper': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.25
        },
        'a': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.25
        },
        'c': {
            '&#729;': 0.06,
            '^': 0.06,
            '&#8407;': 0.3
        }, 
        'e': {
            '&#729;': 0.06,
            '^': 0.06,
            '&#8407;': 0.3
        }, 
        'g': {
            '&#729;': 0.06,
            '^': 0.06,
            '&#8407;': 0.3
        },
        '&#305;': {
            '&#729;': 0.04,
            '^': 0,
            '&#8407;': 0.3
        },
        'i': {
            '&#729;': 0.04,
            '^': 0,
            '&#8407;': 0.3
        },
        '&#567;': {
            '&#729;': 0.075,
            '^': 0.04,
            '&#8407;': 0.3
        },
        'j': {
            '&#729;': 0.075,
            '^': 0.04,
            '&#8407;': 0.3
        },
        'm': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.3
        },
        'n': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.3
        },
        'o': {
            '&#729;': 0.04,
            '^': 0.04,
            '&#8407;': 0.3
        },
        'p': {
            '&#729;': 0.075,
            '^': 0.075,
            '&#8407;': 0.3
        },
        'q': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.3
        },
        'r': {
            '&#729;': 0.06,
            '^': 0.06,
            '&#8407;': 0.3
        },
        's': {
            '&#729;': 0.05,
            '^': 0.05,
            '&#8407;': 0.3
        },
        'u': {
            '&#729;': 0.025,
            '^': 0.025,
            '&#8407;': 0.3
        },
        'v': {
            '&#729;': 0.035,
            '^': 0.035,
            '&#8407;': 0.3
        },
        'w': {
            '&#729;': 0.1,
            '^': 0.1,
            '&#8407;': 0.3
        },
        'x': {
            '&#729;': 0.02,
            '^': 0.02,
            '&#8407;': 0.3
        },
        'y': {
            '&#729;': 0.065,
            '^': 0.065,
            '&#8407;': 0.3
        },
        'z': {
            '&#729;': 0.05,
            '^': 0.05,
            '&#8407;': 0.3
        },
        '&#945;': {
            '&#729;': 0.02,
            '^': 0.02,
            '&#8407;': 0.3
        },
        '&#947;': {
            '&#729;': 0.05,
            '^': 0.05,
            '&#8407;': 0.3
        },
        '&#949;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.3
        },
        '&#1013;': {
            '&#729;': 0.055,
            '^': 0.055,
            '&#8407;': 0.3
        },
        '&#951;': {
            '&#729;': 0.075,
            '^': 0.075,
            '&#8407;': 0.3
        },
        '&#953;': {
            '&#729;': 0.03,
            '^': 0,
            '&#8407;': 0.3
        },
        '&#954;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.3
        },
        '&#956;': {
            '&#729;': 0.05,
            '^': 0.05,
            '&#8407;': 0.3
        },
        '&#957;': {
            '&#729;': 0.055,
            '^': 0.055,
            '&#8407;': 0.3
        },
        '&#960;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.3
        },
        '&#982;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.3
        },
        '&#961;': {
            '&#729;': 0.055,
            '^': 0.055,
            '&#8407;': 0.3
        },
        '&#1009;': {
            '&#729;': 0.06,
            '^': 0.06,
            '&#8407;': 0.3
        },
        '&#963;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.3
        },
        '&#962;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.3
        },
        '&#964;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.3
        },
        '&#965;': {
            '&#729;': 0.05,
            '^': 0.05,
            '&#8407;': 0.3
        },
        '&#966;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.3
        },
        '&#967;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.3
        },
        '&#969;': {
            '&#729;': 0.035,
            '^': 0.035,
            '&#8407;': 0.3
        },
        't': {
            '&#729;': 0.075,
            '^': 0.035,
            '&#8407;': 0.325
        },
        'b': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.25
        },
        'd': {
            '&#729;': 0.18,
            '^': 0.18,
            '&#8407;': 0.45
        },
        'f': {
            '&#729;': 0.18,
            '^': 0.18,
            '&#8407;': 0.45
        },
        'h': {
            '&#729;': -0.05,
            '^': -0.05,
            '&#8407;': 0.25
        },
        'k': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.25
        },
        'l': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.3
        },
        'A': {
            '&#729;': 0.15,
            '^': 0.15,
            '&#8407;': 0.45
        },
        'B': {
            '&#729;': 0.08,
            '^': 0.08,
            '&#8407;': 0.35
        },
        'C': {
            '&#729;': 0.125,
            '^': 0.125,
            '&#8407;': 0.35
        },
        'D': {
            '&#729;': 0.025,
            '^': 0.025,
            '&#8407;': 0.35
        },
        'E': {
            '&#729;': 0.1,
            '^': 0.1,
            '&#8407;': 0.35
        },
        'F': {
            '&#729;': 0.15,
            '^': 0.15,
            '&#8407;': 0.35
        },
        'G': {
            '&#729;': 0.1,
            '^': 0.1,
            '&#8407;': 0.35
        },
        'H': {
            '&#729;': 0.08,
            '^': 0.08,
            '&#8407;': 0.35
        },
        'I': {
            '&#729;': 0.085,
            '^': 0.085,
            '&#8407;': 0.35
        },
        'J': {
            '&#729;': 0.175,
            '^': 0.175,
            '&#8407;': 0.45
        },
        'K': {
            '&#729;': 0.1,
            '^': 0.1,
            '&#8407;': 0.35
        },
        'L': {
            '&#729;': 0.025,
            '^': 0.025,
            '&#8407;': 0.3
        },
        'M': {
            '&#729;': 0.08,
            '^': 0.08,
            '&#8407;': 0.35
        },
        'N': {
            '&#729;': 0.08,
            '^': 0.08,
            '&#8407;': 0.35
        },
        'O': {
            '&#729;': 0.075,
            '^': 0.075,
            '&#8407;': 0.35
        },
        'P': {
            '&#729;': 0.1,
            '^': 0.1,
            '&#8407;': 0.35
        },
        'Q': {
            '&#729;': 0.075,
            '^': 0.075,
            '&#8407;': 0.35
        },
        'R': {
            '&#729;': 0.075,
            '^': 0.075,
            '&#8407;': 0.35
        },
        'S': {
            '&#729;': 0.1,
            '^': 0.1,
            '&#8407;': 0.4
        },
        'T': {
            '&#729;': 0.05,
            '^': 0.05,
            '&#8407;': 0.3
        },
        'U': {
            '&#729;': 0.05,
            '^': 0.05,
            '&#8407;': 0.3
        },
        'V': {
            '&#729;': 0.05,
            '^': 0.05,
            '&#8407;': 0.3
        },
        'W': {
            '&#729;': 0.035,
            '^': 0.035,
            '&#8407;': 0.3
        },
        'X': {
            '&#729;': 0.08,
            '^': 0.08,
            '&#8407;': 0.35
        },
        'Y': {
            '&#729;': 0.045,
            '^': 0.045,
            '&#8407;': 0.3
        },
        'Z': {
            '&#729;': 0.125,
            '^': 0.125,
            '&#8407;': 0.375
        },
        '&#946;': {
            '&#729;': 0.1,
            '^': 0.1,
            '&#8407;': 0.35
        },
        '&#948;': {
            '&#729;': 0.06,
            '^': 0.06,
            '&#8407;': 0.35
        },
        '&#950;': {
            '&#729;': 0.1,
            '^': 0.1,
            '&#8407;': 0.35
        },
        '&#952;': {
            '&#729;': 0.055,
            '^': 0.055,
            '&#8407;': 0.4
        },
        '&#977;': {
            '&#729;': 0.075,
            '^': 0.075,
            '&#8407;': 0.4
        },
        '&#955;': {
            '&#729;': -0.035,
            '^': -0.035,
            '&#8407;': 0.25
        },
        '&#958;': {
            '&#729;': 0.125,
            '^': 0.125,
            '&#8407;': 0.35
        },
        '&#981;': {
            '&#729;': 0.115,
            '^': 0.115,
            '&#8407;': 0.4
        },
        '&#968;': {
            '&#729;': 0.115,
            '^': 0.115,
            '&#8407;': 0.4
        },
        '&#915;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.275
        },
        '&#916;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.275
        },
        '&#920;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.275
        },
        '&#923;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.275
        },
        '&#926;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.25
        },
        '&#928;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.25
        },
        '&#931;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.275
        },
        '&#933;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.275
        },
        '&#934;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.275
        },
        '&#936;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.275
        },
        '&#937;': {
            '&#729;': 0,
            '^': 0,
            '&#8407;': 0.275
        }
    }

    this.domObj.addClass('accentSymbol');
    if (this.character === '&#729;') {
        if (IEVersion >= 9) {
            this.domObj.addClass('dotAccentIE');
        } else {
            this.domObj.addClass('dotAccent');
        }
    } else if (this.character === '^') {
        if (IEVersion >= 9) {
            this.domObj.addClass('hatAccentIE');
        } else {
            this.domObj.addClass('hatAccent');
        }
    } else if (this.character === '&#8407;') {
        this.domObj.addClass('vectorAccent');
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
                adjustLeftVal = adjustLeftByChar[this.parent.accentContainerCharacter][this.character];
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
            } else if (this.character === '&#8407;') {
                widthVal = 1;
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