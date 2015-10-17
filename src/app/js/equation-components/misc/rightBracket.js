eqEd.RightBracket = function(parent) {
	eqEd.Bracket.call(this, parent); // call super constructor.
	this.className = "eqEd.RightBracket";

    // Set up the desiredHeight calculation
    var desiredHeight = 0;
    this.properties.push(new Property(this, "desiredHeight", desiredHeight, {
        get: function() {
            return desiredHeight;
        },
        set: function(value) {
            desiredHeight = value;
        },
        compute: function() {
            var desiredHeightVal = 0;
            if (this.parent instanceof eqEd.BracketWrapper) {
                var sameBracketTypeCounter = 0;
                var matchingBracketIndex = null;
                var maxTopAlign = 0;
                var maxBottomAlign = 0;
                for (var i = (this.parent.index - 1); i >= 0; i--) {
                    var wrapper = this.parent.parent.wrappers[i];
                    if (wrapper instanceof eqEd.BracketWrapper) {
                        if (wrapper.bracket instanceof this.constructor) {
                            sameBracketTypeCounter++;
                        } else if (wrapper.bracket instanceof this.matchingBracketCtor 
                                    && sameBracketTypeCounter === 0) {
                            matchingBracketIndex = i;
                            break;
                        } else if (wrapper.bracket instanceof this.matchingBracketCtor) {
                            sameBracketTypeCounter--;
                        }
                    } else {
                        maxTopAlign = (wrapper.topAlign > maxTopAlign) ? wrapper.topAlign : maxTopAlign;
                        maxBottomAlign = (wrapper.bottomAlign > maxBottomAlign) ? wrapper.bottomAlign : maxBottomAlign;
                    }
                }
                if (matchingBracketIndex !== null && !(maxTopAlign === 0 && maxBottomAlign === 0)) {
                    desiredHeightVal = (maxTopAlign > maxBottomAlign) ? 2 * maxTopAlign : 2 * maxBottomAlign;
                } else {
                    var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
                    desiredHeightVal = fontHeight;
                }
            } else if (this.parent instanceof eqEd.BracketPairWrapper) {
                if (this.parent.bracketContainer.wrappers.length > 0) { 
                    var maxTopAlign = this.parent.bracketContainer.wrappers[this.parent.bracketContainer.maxTopAlignIndex].topAlign;
                    var maxBottomAlign = this.parent.bracketContainer.wrappers[this.parent.bracketContainer.maxBottomAlignIndex].bottomAlign;
                    desiredHeightVal = (maxTopAlign > maxBottomAlign) ? 2 * maxTopAlign : 2 * maxBottomAlign;
                }
            }
            return desiredHeightVal;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.RightBracket.prototype = Object.create(eqEd.Bracket.prototype);
    eqEd.RightBracket.prototype.constructor = eqEd.RightBracket;
})();