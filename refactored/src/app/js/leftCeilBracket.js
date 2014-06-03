eqEd.LeftCeilBracket = function(symbolSizeConfig) {
	eqEd.LeftBracketWrapper.call(this, symbolSizeConfig); // call super constructor.
	this.className = "eqEd.LeftCeilBracket";

    this.matchingBracketCtor = eqEd.RightCeilBracket;
    this.wholeBracket = new eqEd.LeftCeilWholeBracket("MathJax_Main", this.symbolSizeConfig);
    this.topBracket = null;
    this.middleBrackets = [];
    this.bottomBracket = null;

    this.wholeBracket.parent = this;

    this.domObj = this.buildDomObj();
    this.domObj.append(this.wholeBracket.domObj);

    this.childNoncontainers = [this.wholeBracket];

    this.padTop = 0.075;
    this.padBottom = 0.075;

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
            var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
            if (this.heightRatio <= 1.5) {
                widthVal = 0.444444 * fontHeight;
            } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.4) {
                widthVal = 0.5777777 * fontHeight;
            } else if (this.heightRatio > 2.4 && this.heightRatio <= 3) {
                widthVal = 0.644444 * fontHeight;
            } else {
                widthVal = 0.666666 * fontHeight;
            }
            return widthVal;
        },
        updateDom: function() {
            this.domObj.updateWidth(this.width);
        }
    }));

    // Set up the topAlign calculation
    var topAlign = 0;
    this.properties.push(new Property(this, "topAlign", topAlign, {
        get: function() {
            return topAlign;
        },
        set: function(value) {
            topAlign = value;
        },
        compute: function() {
            var topAlignVal = 0;
            var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
            if (this.heightRatio <= 1.5) {
                topAlignVal = 0.5 * fontHeight;
            } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.4) {
                topAlignVal = 1.2 * fontHeight;
            } else if (this.heightRatio > 2.4 && this.heightRatio <= 3) {
                topAlignVal = 1.5 * fontHeight;
            } else {
                topAlignVal = 0.5 * (0.6 + (0.45 * (this.middleBrackets.length - 1))) * fontHeight;
            }
            return topAlignVal;
        },
        updateDom: function() {}
    }));

    // Set up the bottomAlign calculation
    var bottomAlign = 0;
    this.properties.push(new Property(this, "bottomAlign", bottomAlign, {
        get: function() {
            return bottomAlign;
        },
        set: function(value) {
            bottomAlign = value;
        },
        compute: function() {
            var bottomAlignVal = 0;
            var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
            if (this.heightRatio <= 1.5) {
                bottomAlignVal = 0.5 * fontHeight;
            } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.4) {
                bottomAlignVal = 1.2 * fontHeight;
            } else if (this.heightRatio > 2.4 && this.heightRatio <= 3) {
                bottomAlignVal = 1.5 * fontHeight;
            } else {
                bottomAlignVal = 0.5 * (0.6 + (0.45 * (this.middleBrackets.length - 1))) * fontHeight;
            }
            return bottomAlignVal;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.LeftCeilBracket.prototype = Object.create(eqEd.LeftBracket.prototype);
    eqEd.LeftCeilBracket.prototype.constructor = eqEd.LeftCeilBracket;
    eqEd.LeftCeilBracket.prototype.buildDomObj = function() {
        return new eqEd.EquationDom(this,
            '<div class="bracket leftBracket leftCeilBracket"></div>')
    };
    // This is a callback that happens after this.heightRation gets calculated.
    eqEd.LeftCeilBracket.prototype.updateBracketStructure = function() {
        this.domObj.empty();
        this.wholeBracket = null;
        this.topBracket = null;
        this.middleBrackets = [];
        this.bottomBracket = null;
        this.childNoncontainers = [];
        if (this.heightRatio <= 1.5) {
            this.wholeBracket = new eqEd.LeftCeilWholeBracket("MathJax_Main", this.symbolSizeConfig);
            this.wholeBracket.parent = this;
            this.domObj.append(this.wholeBracket.domObj);
            this.childNoncontainers = [this.wholeBracket];
        } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.4) {
            this.wholeBracket = new eqEd.LeftCeilWholeBracket("MathJax_Size3", this.symbolSizeConfig);
            this.wholeBracket.parent = this;
            this.domObj.append(this.wholeBracket.domObj);
            this.childNoncontainers = [this.wholeBracket];
        } else if (this.heightRatio > 2.4 && this.heightRatio <= 3) {
            this.wholeBracket = new eqEd.LeftCeilWholeBracket("MathJax_Size4", this.symbolSizeConfig);
            this.wholeBracket.parent = this;
            this.domObj.append(this.wholeBracket.domObj);
            this.childNoncontainers = [this.wholeBracket];
        } else {
            var numberOfMiddleBrackets = Math.ceil((this.heightRatio - 0.6)/0.45) + 1;
            this.topBracket = new eqEd.LeftCeilTopBracket(this.symbolSizeConfig);
            this.topBracket.parent = this;
            this.domObj.append(this.topBracket.domObj);
            for (var i = 0; i < numberOfMiddleBrackets; i++) {
                var middleBracket = new eqEd.LeftCeilMiddleBracket(i, this.symbolSizeConfig);
                middleBracket.parent = this;
                this.domObj.append(middleBracket.domObj);
                this.middleBrackets.push(middleBracket);
            }
            this.childNoncontainers = [this.topBracket].concat(this.middleBrackets);
        }
    }
})();