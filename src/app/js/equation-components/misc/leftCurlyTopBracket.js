eqEd.LeftCurlyTopBracket = function(parent) {
    eqEd.TopBracket.call(this, parent); // call super constructor.
    this.className = "eqEd.LeftCurlyTopBracket";
    
    this.character = "⎧";
    this.fontStyle = "MathJax_Size4";
    this.domObj = this.buildDomObj();
    this.adjustTop = 0.15;
};
(function() {
    // subclass extends superclass
    eqEd.LeftCurlyTopBracket.prototype = Object.create(eqEd.TopBracket.prototype);
    eqEd.LeftCurlyTopBracket.prototype.constructor = eqEd.LeftCurlyTopBracket;
})();