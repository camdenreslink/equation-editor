eqEd.RightCurlyTopBracket = function(symbolSizeConfig) {
    eqEd.TopBracket.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.RightCurlyTopBracket";
    
    this.character = "⎫";
    this.fontStyle = "MathJax_Size4";
    this.domObj = this.buildDomObj();
    this.adjustTop = 0.15;

};
(function() {
    // subclass extends superclass
    eqEd.RightCurlyTopBracket.prototype = Object.create(eqEd.TopBracket.prototype);
    eqEd.RightCurlyTopBracket.prototype.constructor = eqEd.RightCurlyTopBracket;
})();