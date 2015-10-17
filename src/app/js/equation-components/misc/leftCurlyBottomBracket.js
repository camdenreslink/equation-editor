eqEd.LeftCurlyBottomBracket = function(parent) {
    eqEd.BottomBracket.call(this, parent); // call super constructor.
    this.className = "eqEd.LeftCurlyBottomBracket";
    
    this.character = "⎩";
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