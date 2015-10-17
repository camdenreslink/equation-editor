eqEd.RightSquareTopBracket = function(parent) {
    eqEd.TopBracket.call(this, parent); // call super constructor.
    this.className = "eqEd.RightSquareTopBracket";
    
    this.character = "⎤";
    this.fontStyle = "MathJax_Size4";
    this.domObj = this.buildDomObj();
    this.adjustTop = 0.4;
};
(function() {
    // subclass extends superclass
    eqEd.RightSquareTopBracket.prototype = Object.create(eqEd.TopBracket.prototype);
    eqEd.RightSquareTopBracket.prototype.constructor = eqEd.RightSquareTopBracket;
})();