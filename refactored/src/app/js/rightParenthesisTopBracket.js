eqEd.RightParenthesisTopBracket = function(symbolSizeConfig) {
    eqEd.TopBracket.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.RightParenthesisTopBracket";
    
    this.character = "&#9118;";
    this.fontStyle = "MathJax_Size4";
    this.domObj = this.buildDomObj();
    this.adjustTop = 0.4;
};
(function() {
    // subclass extends superclass
    eqEd.RightParenthesisTopBracket.prototype = Object.create(eqEd.TopBracket.prototype);
    eqEd.RightParenthesisTopBracket.prototype.constructor = eqEd.RightParenthesisTopBracket;
})();