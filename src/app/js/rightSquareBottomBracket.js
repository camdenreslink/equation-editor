eqEd.RightSquareBottomBracket = function(symbolSizeConfig) {
    eqEd.BottomBracket.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.RightSquareBottomBracket";
    
    this.character = "⎦";
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
            var fontHeight = this.symbolSizeConfig.height[this.parent.parent.parent.fontSize];
            var topVal = this.parent.middleBrackets[this.parent.middleBrackets.length - 1].top - 0.65 * fontHeight;
            return topVal;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.RightSquareBottomBracket.prototype = Object.create(eqEd.BottomBracket.prototype);
    eqEd.RightSquareBottomBracket.prototype.constructor = eqEd.RightSquareBottomBracket;
})();