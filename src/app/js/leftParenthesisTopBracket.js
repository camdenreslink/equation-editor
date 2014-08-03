eqEd.LeftParenthesisTopBracket = function(symbolSizeConfig) {
    eqEd.TopBracket.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.LeftParenthesisTopBracket";
    
    this.character = "⎛";
    this.fontStyle = "MathJax_Size4";
    this.domObj = this.buildDomObj();
    this.adjustTop = 0.4;
};
(function() {
    // subclass extends superclass
    eqEd.LeftParenthesisTopBracket.prototype = Object.create(eqEd.TopBracket.prototype);
    eqEd.LeftParenthesisTopBracket.prototype.constructor = eqEd.LeftParenthesisTopBracket;
})();