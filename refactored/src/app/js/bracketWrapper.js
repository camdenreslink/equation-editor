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
    eqEd.BracketWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.symbolSizeConfig);
        copy.domObj = copy.buildDomObj();
        if (this.wholeBracket !== null) {
            copy.wholeBracket = this.wholeBracket.clone();
            copy.wholeBracket.parent = copy;
            copy.domObj.append(copy.wholeBracket.domObj);
        } else {
            copy.wholeBracket = null;
        }
        if (this.topBracket !== null) {
            copy.topBracket = this.topBracket.clone();
            copy.topBracket.parent = copy;
            copy.domObj.append(copy.topBracket.domObj);
        } else {
            copy.topBracket = null;
        }
        copy.middleBrackets = [];
        for (var i = 0; i < this.middleBrackets.length; i++) {
            var middleBracket = this.middleBrackets[i].clone();
            middleBracket.parent = copy;
            copy.domObj.append(middleBracket.domObj);
            copy.middleBrackets.push(middleBracket);
        }
        if (this.bottomBracket !== null) {
            copy.bottomBracket = this.bottomBracket.clone();
            copy.bottomBracket.parent = copy;
            copy.domObj.append(copy.bottomBracket.domObj);
        } else {
            copy.bottomBracket = null;
        }

        this.childNoncontainers = [this.wholeBracket];

        return copy;
    };
})();