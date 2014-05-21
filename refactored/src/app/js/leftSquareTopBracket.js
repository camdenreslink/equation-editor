eqEd.LeftSquareTopBracket = function(symbolSizeConfig) {
    eqEd.TopBracket.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.LeftSquareTopBracket";
    
    this.character = "&#9121;";
    this.fontStyle = "MathJax_Size4";
    this.domObj = this.buildDomObj();
    this.adjustLeft = 0.001;
    this.adjustTop = 0.4;
    if (IEVersion >= 9) {
        this.adjustTop += (-0.02 + 0.3);
    }
};
(function() {
    // subclass extends superclass
    eqEd.LeftSquareTopBracket.prototype = Object.create(eqEd.TopBracket.prototype);
    eqEd.LeftSquareTopBracket.prototype.constructor = eqEd.LeftSquareTopBracket;
})();