eqEd.LeftAbsValMiddleBracket = function(index, symbolSizeConfig) {
    eqEd.MiddleBracket.call(this, index, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.LeftAbsValMiddleBracket";
    
    this.character = "|";
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
            var fontHeight = this.symbolSizeConfig.height[this.parent.parent.parent.fontSize];
            return (0.5 * this.index - 0.06) * fontHeight;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.LeftAbsValMiddleBracket.prototype = Object.create(eqEd.MiddleBracket.prototype);
    eqEd.LeftAbsValMiddleBracket.prototype.constructor = eqEd.LeftAbsValMiddleBracket;
})();