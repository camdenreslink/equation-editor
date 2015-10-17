eqEd.LeftCeilTopBracket = function(parent) {
    eqEd.TopBracket.call(this, parent); // call super constructor.
    this.className = "eqEd.LeftCeilTopBracket";
    
    this.character = "⎡";
    this.fontStyle = "MathJax_Size4";
    this.domObj = this.buildDomObj();
    this.adjustTop = 0.4;
};
(function() {
    // subclass extends superclass
    eqEd.LeftCeilTopBracket.prototype = Object.create(eqEd.TopBracket.prototype);
    eqEd.LeftCeilTopBracket.prototype.constructor = eqEd.LeftCeilTopBracket;
})();