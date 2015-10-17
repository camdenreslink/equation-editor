eqEd.LeftNormMiddleBracket = function(parent, index) {
    eqEd.MiddleBracket.call(this, parent, index); // call super constructor.
    this.className = "eqEd.LeftNormMiddleBracket";
    
    this.character = "∥";
    this.fontStyle = "MathJax_Main";
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
            return (0.5 * this.index - 0.06) * fontHeight;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.LeftNormMiddleBracket.prototype = Object.create(eqEd.MiddleBracket.prototype);
    eqEd.LeftNormMiddleBracket.prototype.constructor = eqEd.LeftNormMiddleBracket;
})();