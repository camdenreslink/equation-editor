eqEd.LeftCurlyBottomBracket = function(symbolSizeConfig) {
    eqEd.BottomBracket.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.LeftCurlyBottomBracket";
    
    this.character = "&#9129;";
    this.fontStyle = "MathJax_Size4";
    this.domObj = this.buildDomObj();

    if (ChromeVersion > 0) {
        this.adjustLeft += -0.025;
    }

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
            var length = this.parent.middleBrackets.length;
            var centerIndex = Math.floor(length / 2);
            return this.parent.middleBrackets[centerIndex].top + ((length - 1 - centerIndex) * 0.231 + 0.5) * fontHeight;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.LeftCurlyBottomBracket.prototype = Object.create(eqEd.BottomBracket.prototype);
    eqEd.LeftCurlyBottomBracket.prototype.constructor = eqEd.LeftCurlyBottomBracket;
})();