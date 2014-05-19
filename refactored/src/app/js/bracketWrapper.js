eqEd.BracketWrapper = function(symbolSizeConfig) {
	eqEd.Wrapper.call(this, symbolSizeConfig); // call super constructor.
	this.className = "eqEd.BracketWrapper";

	// Remove the height property definition that was added from
    // eqEd.Wrapper constructor.  We need to override it.
    var heightPropIndex = -1;
    for (var i = 0; i < this.properties.length; i++) {
        if (this.properties[i].propName === "height") {
            heightPropIndex = i;
            break;
        }
    }
    if (heightPropIndex > -1) {
        this.properties.splice(heightPropIndex, 1);
    }

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
            return this.height / fontHeight;
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