eqEd.LeftCurlyMiddleBracket = function(parent, index, characterType) {
    eqEd.MiddleBracket.call(this, parent, index); // call super constructor.
    this.className = "eqEd.LeftCurlyMiddleBracket";
    
    this.characterType = characterType;
    if (this.characterType === "middleVert") {
        this.character = "⎪";
    } else if (this.characterType === "middleCurly") {
        this.character = "⎨";
    }
    this.fontStyle = "MathJax_Size4";
    this.domObj = this.buildDomObj();

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
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.parent.fontSize];
            var topVal = 0;
            var numSegs = this.parent.middleBrackets.length - 1;
            var adjustTopFactor = 0.231;
            if (this.index < Math.round(numSegs / 2)) {
                topVal = ((this.index + 1) * adjustTopFactor + 0.15) * fontHeight;
            } else if (this.index === Math.round(numSegs / 2)) {
                topVal = (this.index * adjustTopFactor + 1.1 + 0.15) * fontHeight;
            } else {
                var centerBracket = Math.round(numSegs / 2) * adjustTopFactor + 1.1 + 0.15;
                topVal = (centerBracket + 0.878 + (this.index - Math.round(numSegs / 2) - 1) * adjustTopFactor) * fontHeight;
            }
            return topVal;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.LeftCurlyMiddleBracket.prototype = Object.create(eqEd.MiddleBracket.prototype);
    eqEd.LeftCurlyMiddleBracket.prototype.constructor = eqEd.LeftCurlyMiddleBracket;
})();