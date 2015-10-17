eqEd.LeftAngleBracket = function(parent) {
	eqEd.LeftBracket.call(this, parent); // call super constructor.
	this.className = "eqEd.LeftAngleBracket";

    this.matchingBracketCtor = eqEd.RightAngleBracket;
    this.wholeBracket = new eqEd.LeftAngleWholeBracket(parent, "MathJax_Main");
    this.topBracket = null;
    this.middleBrackets = [];
    this.bottomBracket = null;

    this.wholeBracket.parent = this;

    this.domObj = this.buildDomObj();
    this.domObj.append(this.wholeBracket.domObj);

    this.children = [this.wholeBracket];

	// Set up the width calculation
    var width = 0;
    this.properties.push(new Property(this, "width", width, {
        get: function() {
            return width;
        },
        set: function(value) {
            width = value;
        },
        compute: function() {
            var widthVal = 0;
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            if (this.heightRatio <= 1.5) {
                widthVal = 0.377777 * fontHeight;
            } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.4) {
                widthVal = 0.733333 * fontHeight;
            } else {
                widthVal = 0.777777 * fontHeight;
            }
            return widthVal;
        },
        updateDom: function() {
            this.domObj.updateWidth(this.width);
        }
    }));

    // Set up the height calculation
    var height = 0;
    this.properties.push(new Property(this, "height", height, {
        get: function() {
            return height;
        },
        set: function(value) {
            height = value;
        },
        compute: function() {
            var heightVal = 0;
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            if (this.heightRatio <= 1.5) {
                heightVal = fontHeight;
            } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.4) {
                heightVal = 2.4 * fontHeight;
            } else {
                heightVal = 3 * fontHeight;
            }
            return heightVal;
        },
        updateDom: function() {
            this.domObj.updateHeight(this.height);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.LeftAngleBracket.prototype = Object.create(eqEd.LeftBracket.prototype);
    eqEd.LeftAngleBracket.prototype.constructor = eqEd.LeftAngleBracket;
    eqEd.LeftAngleBracket.prototype.buildDomObj = function() {
        return new eqEd.EquationDom(this,
            '<div class=" bracket leftBracket leftAngleBracket"></div>')
    };
    // This is a callback that happens after this.heightRation gets calculated.
    eqEd.LeftAngleBracket.prototype.updateBracketStructure = function() {
        this.domObj.empty();
        this.wholeBracket = null;
        this.topBracket = null;
        this.middleBrackets = [];
        this.bottomBracket = null;
        this.children = [];
        if (this.heightRatio <= 1.5) {
            this.wholeBracket = new eqEd.LeftAngleWholeBracket(this.parent, "MathJax_Main");
            this.wholeBracket.parent = this;
            this.domObj.append(this.wholeBracket.domObj);
            this.children = [this.wholeBracket];
        } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.4) {
            this.wholeBracket = new eqEd.LeftAngleWholeBracket(this.parent, "MathJax_Size3");
            this.wholeBracket.parent = this;
            this.domObj.append(this.wholeBracket.domObj);
            this.children = [this.wholeBracket];
        } else {
            this.wholeBracket = new eqEd.LeftAngleWholeBracket(this.parent, "MathJax_Size4");
            this.wholeBracket.parent = this;
            this.domObj.append(this.wholeBracket.domObj);
            this.children = [this.wholeBracket];
        }
    }
})();