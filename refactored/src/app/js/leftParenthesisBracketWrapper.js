eqEd.LeftParenthesisBracketWrapper = function(symbolSizeConfig) {
	eqEd.LeftBracketWrapper.call(this, symbolSizeConfig); // call super constructor.
	this.className = "eqEd.LeftParenthesisBracketWrapper";

    this.matchingBracketCtor = eqEd.RightParenthesisBracketWrapper;
    this.wholeBracket = new eqEd.LeftParenthesisWholeBracket("MathJax_Main", this.symbolSizeConfig);
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
                widthVal = 0.377777 * fontHeight;
            } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.4) {
                widthVal = 0.733333 * fontHeight;
            } else if (this.heightRatio > 2.4 && this.heightRatio <= 3) {
                widthVal = 0.777777 * fontHeight;
            } else if (this.heightRatio > 3 && this.heightRatio <= 3.33) {
                widthVal = 0.88888 * fontHeight;
            } else {
                widthVal = 0.88888 * fontHeight;
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
            } else if (this.heightRatio > 3 && this.heightRatio <= 3.33) {
                topAlignVal = 1.665 * fontHeight;
            } else {
                topAlignVal = 0.5 * (3.9 + (0.45 * (this.middleBrackets.length - 1))) * fontHeight;
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
            } else if (this.heightRatio > 3 && this.heightRatio <= 3.33) {
                bottomAlignVal = 1.665 * fontHeight;
            } else {
                bottomAlignVal = 0.5 * (3.9 + (0.45 * (this.middleBrackets.length - 1))) * fontHeight;
            }
            return bottomAlignVal;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.LeftParenthesisBracketWrapper.prototype = Object.create(eqEd.LeftBracketWrapper.prototype);
    eqEd.LeftParenthesisBracketWrapper.prototype.constructor = eqEd.LeftParenthesisBracketWrapper;
    eqEd.LeftParenthesisBracketWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="wrapper bracketWrapper leftBracketWrapper leftParenthesisBracketWrapper"></div>')
    };
    // This is a callback that happens after this.heightRation gets calculated.
    eqEd.LeftParenthesisBracketWrapper.prototype.updateBracketStructure = function() {
        this.domObj.empty();
        this.wholeBracket = null;
        this.topBracket = null;
        this.middleBrackets = [];
        this.bottomBracket = null;
        this.childNoncontainers = [];
        if (this.heightRatio <= 1.5) {
            this.wholeBracket = new eqEd.LeftParenthesisWholeBracket("MathJax_Main", this.symbolSizeConfig);
            this.wholeBracket.parent = this;
            this.domObj.append(this.wholeBracket.domObj);
            this.childNoncontainers = [this.wholeBracket];
        } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.4) {
            this.wholeBracket = new eqEd.LeftParenthesisWholeBracket("MathJax_Size3", this.symbolSizeConfig);
            this.wholeBracket.parent = this;
            this.domObj.append(this.wholeBracket.domObj);
            this.childNoncontainers = [this.wholeBracket];
        } else if (this.heightRatio > 2.4 && this.heightRatio <= 3) {
            this.wholeBracket = new eqEd.LeftParenthesisWholeBracket("MathJax_Size4", this.symbolSizeConfig);
            this.wholeBracket.parent = this;
            this.domObj.append(this.wholeBracket.domObj);
            this.childNoncontainers = [this.wholeBracket];
        } else if (this.heightRatio > 3 && this.heightRatio <= 3.33) {
            this.topBracket = new eqEd.LeftParenthesisTopBracket(this.symbolSizeConfig);
            this.bottomBracket = new eqEd.LeftParenthesisBottomBracket(this.symbolSizeConfig);
            this.topBracket.parent = this;
            this.bottomBracket.parent = this;
            this.domObj.append(this.topBracket.domObj);
            this.domObj.append(this.bottomBracket.domObj);
            this.childNoncontainers = [this.topBracket, this.bottomBracket];
        } else {
            var numberOfMiddleBrackets = Math.ceil((this.heightRatio - 3.9)/0.45) + 1;
            this.topBracket = new eqEd.LeftParenthesisTopBracket(this.symbolSizeConfig);
            this.bottomBracket = new eqEd.LeftParenthesisBottomBracket(this.symbolSizeConfig);
            this.topBracket.parent = this;
            this.bottomBracket.parent = this;
            this.domObj.append(this.topBracket.domObj);
            this.domObj.append(this.bottomBracket.domObj);
            for (var i = 0; i < numberOfMiddleBrackets; i++) {
                var middleBracket = new eqEd.LeftParenthesisMiddleBracket(i, this.symbolSizeConfig);
                middleBracket.parent = this;
                this.domObj.append(middleBracket.domObj);
                this.middleBrackets.push(middleBracket);
            }
            this.childNoncontainers = [this.topBracket].concat(this.middleBrackets).concat([this.bottomBracket]);
        }
    }
})();