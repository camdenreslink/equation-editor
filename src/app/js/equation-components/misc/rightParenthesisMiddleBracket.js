eqEd.RightParenthesisMiddleBracket = function(parent, index) {
    eqEd.MiddleBracket.call(this, parent, index); // call super constructor.
    this.className = "eqEd.RightParenthesisMiddleBracket";
    
    this.character = "⎟";
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
            return (0.45 * this.index + 1.5) * fontHeight;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.RightParenthesisMiddleBracket.prototype = Object.create(eqEd.MiddleBracket.prototype);
    eqEd.RightParenthesisMiddleBracket.prototype.constructor = eqEd.RightParenthesisMiddleBracket;
})();