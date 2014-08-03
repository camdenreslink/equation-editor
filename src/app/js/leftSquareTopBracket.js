eqEd.LeftSquareTopBracket = function(symbolSizeConfig) {
    eqEd.TopBracket.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.LeftSquareTopBracket";
    
    this.character = "⎡";
    this.fontStyle = "MathJax_Size4";
    this.domObj = this.buildDomObj();
    this.adjustTop = 0.4;
};
(function() {
    // subclass extends superclass
    eqEd.LeftSquareTopBracket.prototype = Object.create(eqEd.TopBracket.prototype);
    eqEd.LeftSquareTopBracket.prototype.constructor = eqEd.LeftSquareTopBracket;
})();