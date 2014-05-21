eqEd.RightSquareTopBracket = function(symbolSizeConfig) {
    eqEd.TopBracket.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.RightSquareTopBracket";
    
    this.character = "&#9124;";
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
    eqEd.RightSquareTopBracket.prototype = Object.create(eqEd.TopBracket.prototype);
    eqEd.RightSquareTopBracket.prototype.constructor = eqEd.RightSquareTopBracket;
})();