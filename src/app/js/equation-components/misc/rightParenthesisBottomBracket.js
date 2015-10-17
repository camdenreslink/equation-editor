eqEd.RightParenthesisBottomBracket = function(parent) {
    eqEd.BottomBracket.call(this, parent); // call super constructor.
    this.className = "eqEd.RightParenthesisBottomBracket";
    
    this.character = "⎠";
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
            if (this.parent.middleBrackets.length === 0) {
                topVal = 1.939 * fontHeight;
            } else {
                topVal = (2.5 + (0.45 * (this.parent.middleBrackets.length - 1))) * fontHeight;
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
    eqEd.RightParenthesisBottomBracket.prototype = Object.create(eqEd.BottomBracket.prototype);
    eqEd.RightParenthesisBottomBracket.prototype.constructor = eqEd.RightParenthesisBottomBracket;
})();