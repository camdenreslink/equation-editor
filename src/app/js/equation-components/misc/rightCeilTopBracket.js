eqEd.RightCeilTopBracket = function(parent) {
    eqEd.TopBracket.call(this, parent); // call super constructor.
    this.className = "eqEd.RightCeilTopBracket";
    
    this.character = "⎤";
    this.fontStyle = "MathJax_Size4";
    this.domObj = this.buildDomObj();
    this.adjustTop = 0.4;
};
(function() {
    // subclass extends superclass
    eqEd.RightCeilTopBracket.prototype = Object.create(eqEd.TopBracket.prototype);
    eqEd.RightCeilTopBracket.prototype.constructor = eqEd.RightCeilTopBracket;
})();