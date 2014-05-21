eqEd.RightCurlyTopBracket = function(symbolSizeConfig) {
    eqEd.TopBracket.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.RightCurlyTopBracket";
    
    this.character = "&#9131;";
    this.fontStyle = "MathJax_Size4";
    this.domObj = this.buildDomObj();
    this.adjustTop = 0.15;
    if (ChromeVersion > 0) {
        this.adjustLeft += -0.025;
    }

};
(function() {
    // subclass extends superclass
    eqEd.RightCurlyTopBracket.prototype = Object.create(eqEd.TopBracket.prototype);
    eqEd.RightCurlyTopBracket.prototype.constructor = eqEd.RightCurlyTopBracket;
})();