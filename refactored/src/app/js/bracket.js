eqEd.Bracket = function(symbolSizeConfig) {
	eqEd.Equation.call(this, symbolSizeConfig); // call super constructor.
	this.className = "eqEd.Bracket";

    if (IEVersion >= 9) {
        this.adjustTop += 0.28;
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
            var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
            return this.desiredHeight / fontHeight;
        },
        updateDom: function() {
        	// Not only a DOM update, but this is a convenient callback.
        	this.updateBracketStructure();
        }
    }));

    // Set up the top calculation
    var top = 0;
    this.properties.push(new Property(this, "top", top, {
        get: function() {
            return top;
        },
        set: function(value) {
            top = value;
        },
        compute: function() {
            // remember compute hooks get called.
            return 0;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));

    // Set up the left calculation
    var left = 0;
    this.properties.push(new Property(this, "left", left, {
        get: function() {
            return left;
        },
        set: function(value) {
            left = value;
        },
        compute: function() {
            // remember compute hooks get called.
            return 0;
        },
        updateDom: function() {
            this.domObj.updateLeft(this.left);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.Bracket.prototype = Object.create(eqEd.Equation.prototype);
    eqEd.Bracket.prototype.constructor = eqEd.Bracket;
    eqEd.Bracket.prototype.clone = function() {
        var copy = new this.constructor(this.symbolSizeConfig);
        copy.domObj = copy.buildDomObj();
        if (this.wholeBracket !== null) {
            copy.wholeBracket = this.wholeBracket.clone();
            copy.wholeBracket.parent = copy;
            copy.domObj.append(copy.wholeBracket.domObj);
            copy.children.push(copy.wholeBracket);
        } else {
            copy.wholeBracket = null;
        }
        if (this.topBracket !== null) {
            copy.topBracket = this.topBracket.clone();
            copy.topBracket.parent = copy;
            copy.domObj.append(copy.topBracket.domObj);
            copy.children.push(copy.topBracket);
        } else {
            copy.topBracket = null;
        }
        copy.middleBrackets = [];
        for (var i = 0; i < this.middleBrackets.length; i++) {
            var middleBracket = this.middleBrackets[i].clone();
            middleBracket.parent = copy;
            copy.domObj.append(middleBracket.domObj);
            copy.middleBrackets.push(middleBracket);
            copy.children.push(copy.middleBracket);
        }
        if (this.bottomBracket !== null) {
            copy.bottomBracket = this.bottomBracket.clone();
            copy.bottomBracket.parent = copy;
            copy.domObj.append(copy.bottomBracket.domObj);
            copy.children.push(copy.bottomBracket);
        } else {
            copy.bottomBracket = null;
        }

        this.childNoncontainers = [this.wholeBracket];

        return copy;
    };
})();