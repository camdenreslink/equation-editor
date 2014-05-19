eqEd.BracketWrapper = function(symbolSizeConfig) {
	eqEd.Wrapper.call(this, symbolSizeConfig); // call super constructor.
	this.className = "eqEd.BracketWrapper";

    // Set up the heightRatio calculation
    var heightRatio = 0;
    this.properties.push(new Property(this, "heightRatio", heightRatio, {
        get: function() {
            return heightRatio;
        },
        set: function(value) {
            heightRatio = value;
        },
        compute: function() {
            var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
            return this.desiredHeight / fontHeight;
        },
        updateDom: function() {
        	// Not only a DOM update, but this is a convenient callback.
        	this.updateBracketStructure();
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.BracketWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.BracketWrapper.prototype.constructor = eqEd.BracketWrapper;

})();