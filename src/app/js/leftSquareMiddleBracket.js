eqEd.LeftSquareMiddleBracket = function(index, symbolSizeConfig) {
    eqEd.MiddleBracket.call(this, index, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.LeftSquareMiddleBracket";
    
    this.character = "⎢";
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
            return (0.45 * this.index - 0.15) * fontHeight;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.LeftSquareMiddleBracket.prototype = Object.create(eqEd.MiddleBracket.prototype);
    eqEd.LeftSquareMiddleBracket.prototype.constructor = eqEd.LeftSquareMiddleBracket;
})();