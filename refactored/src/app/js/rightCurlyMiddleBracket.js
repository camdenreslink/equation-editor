eqEd.RightCurlyMiddleBracket = function(index, characterType, symbolSizeConfig) {
    eqEd.MiddleBracket.call(this, index, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.RightCurlyMiddleBracket";
    
    this.characterType = characterType;
    if (this.characterType === "middleVert") {
        this.character = "&#9130;";
    } else if (this.characterType === "middleCurly") {
        this.character = "&#9132;";
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
            var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
            var topVal = 0;
            var numSegs = this.parent.middleBrackets.length - 1;
            var adjustTopFactor = 0.231;
            if (this.index < Math.round(numSegs / 2)) {
                topVal = ((this.index + 1) * adjustTopFactor + 0.15) * fontHeight;
            } else if (this.index === Math.round(numSegs / 2)) {
                topVal = (this.index * adjustTopFactor + 1.1 + 0.15) * fontHeight;
            } else {
                //console.log(this.adjustTopFactor);
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
    eqEd.RightCurlyMiddleBracket.prototype = Object.create(eqEd.MiddleBracket.prototype);
    eqEd.RightCurlyMiddleBracket.prototype.constructor = eqEd.RightCurlyMiddleBracket;
})();