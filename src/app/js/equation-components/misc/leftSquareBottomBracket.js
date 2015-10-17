eqEd.LeftSquareBottomBracket = function(parent) {
    eqEd.BottomBracket.call(this, parent); // call super constructor.
    this.className = "eqEd.LeftSquareBottomBracket";
    
    this.character = "⎣";
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
    eqEd.LeftSquareBottomBracket.prototype = Object.create(eqEd.BottomBracket.prototype);
    eqEd.LeftSquareBottomBracket.prototype.constructor = eqEd.LeftSquareBottomBracket;
})();