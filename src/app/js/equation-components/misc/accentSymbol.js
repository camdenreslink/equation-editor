eqEd.AccentSymbol = function(parent, character, fontStyle) {
    eqEd.Symbol.call(this, parent, character, fontStyle); // call super constructor.
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
            '˙': 0,
            '^': 0,
            '⃗': 0.25,
            '¯': 0
        },
        'multipleWrappers': {
            '˙': 0,
            '^': 0,
            '⃗': 0.25,
            '¯': 0
        },
        'a': {
            '˙': 0,
            '^': 0,
            '⃗': 0.25,
            '¯': 0
        },
        'c': {
            '˙': 0.06,
            '^': 0.06,
            '⃗': 0.3,
            '¯': 0.025
        }, 
        'e': {
            '˙': 0.06,
            '^': 0.06,
            '⃗': 0.3,
            '¯': 0.025
        }, 
        'g': {
            '˙': 0.06,
            '^': 0.06,
            '⃗': 0.3,
            '¯': 0.025
        },
        'ı': {
            '˙': 0.04,
            '^': 0.035,
            '⃗': 0.3,
            '¯': 0.025
        },
        'ȷ': {
            '˙': 0.075,
            '^': 0.04,
            '⃗': 0.3,
            '¯': 0.025
        },
        'm': {
            '˙': 0,
            '^': 0,
            '⃗': 0.3,
            '¯': 0.025
        },
        'n': {
            '˙': 0,
            '^': 0,
            '⃗': 0.3,
            '¯': 0.025
        },
        'o': {
            '˙': 0.04,
            '^': 0.04,
            '⃗': 0.3,
            '¯': 0.06
        },
        'p': {
            '˙': 0.075,
            '^': 0.075,
            '⃗': 0.3,
            '¯': 0.025
        },
        'q': {
            '˙': 0,
            '^': 0,
            '⃗': 0.3,
            '¯': 0.025
        },
        'r': {
            '˙': 0.06,
            '^': 0.06,
            '⃗': 0.3,
            '¯': 0.025
        },
        's': {
            '˙': 0.05,
            '^': 0.05,
            '⃗': 0.3,
            '¯': 0.025
        },
        'u': {
            '˙': 0.025,
            '^': 0.025,
            '⃗': 0.3,
            '¯': 0.025
        },
        'v': {
            '˙': 0.035,
            '^': 0.035,
            '⃗': 0.3,
            '¯': 0.025
        },
        'w': {
            '˙': 0.1,
            '^': 0.1,
            '⃗': 0.3,
            '¯': 0.025
        },
        'x': {
            '˙': 0.02,
            '^': 0.02,
            '⃗': 0.3,
            '¯': 0.025
        },
        'y': {
            '˙': 0.065,
            '^': 0.065,
            '⃗': 0.3,
            '¯': 0.025
        },
        'z': {
            '˙': 0.05,
            '^': 0.05,
            '⃗': 0.3,
            '¯': 0.05
        },
        'α': {
            '˙': 0.02,
            '^': 0.02,
            '⃗': 0.3,
            '¯': 0.025
        },
        'γ': {
            '˙': 0.05,
            '^': 0.05,
            '⃗': 0.3,
            '¯': 0.025
        },
        'ε': {
            '˙': 0,
            '^': 0,
            '⃗': 0.3,
            '¯': 0.025
        },
        'ϵ': {
            '˙': 0.055,
            '^': 0.055,
            '⃗': 0.3,
            '¯': 0.025
        },
        'η': {
            '˙': 0.075,
            '^': 0.075,
            '⃗': 0.3,
            '¯': 0.025
        },
        'ι': {
            '˙': 0.03,
            '^': 0,
            '⃗': 0.3,
            '¯': 0.025
        },
        'κ': {
            '˙': 0,
            '^': 0,
            '⃗': 0.3,
            '¯': 0.025
        },
        'μ': {
            '˙': 0.05,
            '^': 0.05,
            '⃗': 0.3,
            '¯': 0.025
        },
        'ν': {
            '˙': 0.055,
            '^': 0.055,
            '⃗': 0.3,
            '¯': 0.025
        },
        'π': {
            '˙': 0,
            '^': 0,
            '⃗': 0.3,
            '¯': 0.025
        },
        'ϖ': {
            '˙': 0,
            '^': 0,
            '⃗': 0.3,
            '¯': 0.025
        },
        'ρ': {
            '˙': 0.055,
            '^': 0.055,
            '⃗': 0.3,
            '¯': 0.065
        },
        'ϱ': {
            '˙': 0.06,
            '^': 0.06,
            '⃗': 0.3,
            '¯': 0.065
        },
        'σ': {
            '˙': 0,
            '^': 0,
            '⃗': 0.3,
            '¯': 0.025
        },
        'ς': {
            '˙': 0,
            '^': 0,
            '⃗': 0.3,
            '¯': 0.025
        },
        'τ': {
            '˙': 0,
            '^': 0,
            '⃗': 0.3,
            '¯': 0.025
        },
        'υ': {
            '˙': 0.05,
            '^': 0.05,
            '⃗': 0.3,
            '¯': 0.025
        },
        'φ': {
            '˙': 0,
            '^': 0,
            '⃗': 0.3,
            '¯': 0.025
        },
        'χ': {
            '˙': 0,
            '^': 0,
            '⃗': 0.3,
            '¯': 0.025
        },
        'ω': {
            '˙': 0.035,
            '^': 0.035,
            '⃗': 0.3,
            '¯': 0.025
        },
        'i': {
            '˙': 0.04,
            '^': 0,
            '⃗': 0.3,
            '¯': 0.025
        },
        'j': {
            '˙': 0.075,
            '^': 0.04,
            '⃗': 0.4,
            '¯': 0.135
        },
        't': {
            '˙': 0.075,
            '^': 0.035,
            '⃗': 0.325,
            '¯': 0.025
        },
        'b': {
            '˙': 0,
            '^': 0,
            '⃗': 0.25,
            '¯': 0
        },
        'd': {
            '˙': 0.18,
            '^': 0.18,
            '⃗': 0.45,
            '¯': 0.165
        },
        'f': {
            '˙': 0.18,
            '^': 0.18,
            '⃗': 0.45,
            '¯': 0.165
        },
        'h': {
            '˙': -0.05,
            '^': -0.05,
            '⃗': 0.25,
            '¯': -0.05
        },
        'k': {
            '˙': 0,
            '^': 0,
            '⃗': 0.25,
            '¯': -0.05
        },
        'l': {
            '˙': 0,
            '^': 0,
            '⃗': 0.3,
            '¯': 0.025
        },
        'A': {
            '˙': 0.15,
            '^': 0.15,
            '⃗': 0.45,
            '¯': 0.15
        },
        'B': {
            '˙': 0.08,
            '^': 0.08,
            '⃗': 0.35,
            '¯': 0.075
        },
        'C': {
            '˙': 0.125,
            '^': 0.125,
            '⃗': 0.35,
            '¯': 0.125
        },
        'D': {
            '˙': 0.025,
            '^': 0.025,
            '⃗': 0.35,
            '¯': 0.075
        },
        'E': {
            '˙': 0.1,
            '^': 0.1,
            '⃗': 0.35,
            '¯': 0.075
        },
        'F': {
            '˙': 0.15,
            '^': 0.15,
            '⃗': 0.35,
            '¯': 0.075
        },
        'G': {
            '˙': 0.1,
            '^': 0.1,
            '⃗': 0.35,
            '¯': 0.125
        },
        'H': {
            '˙': 0.08,
            '^': 0.08,
            '⃗': 0.35,
            '¯': 0.075
        },
        'I': {
            '˙': 0.085,
            '^': 0.085,
            '⃗': 0.35,
            '¯': 0.1
        },
        'J': {
            '˙': 0.175,
            '^': 0.175,
            '⃗': 0.45,
            '¯': 0.165
        },
        'K': {
            '˙': 0.1,
            '^': 0.1,
            '⃗': 0.35,
            '¯': 0.075
        },
        'L': {
            '˙': 0.025,
            '^': 0.025,
            '⃗': 0.3,
            '¯': 0.0125
        },
        'M': {
            '˙': 0.08,
            '^': 0.08,
            '⃗': 0.35,
            '¯': 0.075
        },
        'N': {
            '˙': 0.08,
            '^': 0.08,
            '⃗': 0.35,
            '¯': 0.075
        },
        'O': {
            '˙': 0.075,
            '^': 0.075,
            '⃗': 0.35,
            '¯': 0.125
        },
        'P': {
            '˙': 0.1,
            '^': 0.1,
            '⃗': 0.35,
            '¯': 0.075
        },
        'Q': {
            '˙': 0.075,
            '^': 0.075,
            '⃗': 0.35,
            '¯': 0.125
        },
        'R': {
            '˙': 0.075,
            '^': 0.075,
            '⃗': 0.35,
            '¯': 0.075
        },
        'S': {
            '˙': 0.1,
            '^': 0.1,
            '⃗': 0.4,
            '¯': 0.075
        },
        'T': {
            '˙': 0.05,
            '^': 0.05,
            '⃗': 0.3,
            '¯': 0.025
        },
        'U': {
            '˙': 0.05,
            '^': 0.05,
            '⃗': 0.3,
            '¯': 0.075
        },
        'V': {
            '˙': 0.05,
            '^': 0.05,
            '⃗': 0.3,
            '¯': 0.075
        },
        'W': {
            '˙': 0.035,
            '^': 0.035,
            '⃗': 0.3,
            '¯': 0.025
        },
        'X': {
            '˙': 0.08,
            '^': 0.08,
            '⃗': 0.35,
            '¯': 0.075
        },
        'Y': {
            '˙': 0.045,
            '^': 0.045,
            '⃗': 0.3,
            '¯': 0.025
        },
        'Z': {
            '˙': 0.125,
            '^': 0.125,
            '⃗': 0.375,
            '¯': 0.1
        },
        'β': {
            '˙': 0.1,
            '^': 0.1,
            '⃗': 0.35,
            '¯': 0.1
        },
        'δ': {
            '˙': 0.06,
            '^': 0.06,
            '⃗': 0.35,
            '¯': 0.08
        },
        'ζ': {
            '˙': 0.1,
            '^': 0.1,
            '⃗': 0.35,
            '¯': 0.08
        },
        'θ': {
            '˙': 0.055,
            '^': 0.055,
            '⃗': 0.4,
            '¯': 0.08
        },
        'ϑ': {
            '˙': 0.075,
            '^': 0.075,
            '⃗': 0.4,
            '¯': 0.08
        },
        'λ': {
            '˙': -0.035,
            '^': -0.035,
            '⃗': 0.25,
            '¯': -0.025
        },
        'ξ': {
            '˙': 0.125,
            '^': 0.125,
            '⃗': 0.35,
            '¯': 0.08
        },
        'ϕ': {
            '˙': 0.115,
            '^': 0.115,
            '⃗': 0.4,
            '¯': 0.125
        },
        'ψ': {
            '˙': 0.115,
            '^': 0.115,
            '⃗': 0.4,
            '¯': 0.125
        },
        'Γ': {
            '˙': 0,
            '^': 0,
            '⃗': 0.275,
            '¯': 0
        },
        'Δ': {
            '˙': 0,
            '^': 0,
            '⃗': 0.275,
            '¯': 0
        },
        'Θ': {
            '˙': 0,
            '^': 0,
            '⃗': 0.275,
            '¯': 0.015
        },
        'Λ': {
            '˙': 0,
            '^': 0,
            '⃗': 0.275,
            '¯': 0
        },
        'Ξ': {
            '˙': 0,
            '^': 0,
            '⃗': 0.25,
            '¯': 0
        },
        'Π': {
            '˙': 0,
            '^': 0,
            '⃗': 0.25,
            '¯': 0
        },
        'Σ': {
            '˙': 0,
            '^': 0,
            '⃗': 0.275,
            '¯': 0
        },
        'Υ': {
            '˙': 0,
            '^': 0,
            '⃗': 0.275,
            '¯': 0
        },
        'Φ': {
            '˙': 0,
            '^': 0,
            '⃗': 0.275,
            '¯': 0
        },
        'Ψ': {
            '˙': 0,
            '^': 0,
            '⃗': 0.275,
            '¯': 0
        },
        'Ω': {
            '˙': 0,
            '^': 0,
            '⃗': 0.275,
            '¯': 0
        }
    }

    this.domObj.addClass('accentSymbol');
    if (this.character === '˙') {
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
    } else if (this.character === '⃗') {
        this.domObj.addClass('vectorAccent');
    } else if (this.character === '¯') {
        if (IEVersion >= 9) {
            this.domObj.addClass('barAccentIE');
        } else {
            this.domObj.addClass('barAccent');
        }
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
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            var fontWidth = this.equation.fontMetrics.width[this.character][this.fontStyle][this.parent.parent.fontSize];
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
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
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
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            var widthVal = 0;
            if (this.character === '˙') {
                widthVal = 0.33 * fontHeight;
            } else if (this.character === '^') {
                widthVal = 0.4 * fontHeight;
            } else if (this.character === '⃗') {
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