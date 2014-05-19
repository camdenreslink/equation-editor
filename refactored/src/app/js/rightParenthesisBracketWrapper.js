eqEd.RightParenthesisBracketWrapper = function(symbolSizeConfig) {
    eqEd.RightBracketWrapper.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.RightParenthesisBracketWrapper";

    this.matchingBracketCtor = eqEd.LeftParenthesisBracketWrapper;
    this.wholeBracket = new eqEd.WholeBracket(')', "MathJax_Main", symbolSizeConfig);
    this.topBracket = null;
    this.middleBrackets = [];
    this.bottomBracket = null;

    this.wholeBracket.parent = this;

    this.domObj = this.buildDomObj();
    this.domObj.append(this.wholeBracket.domObj);

    this.childNoncontainers = [this.wholeBracket];

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
                widthVal = 0.383 * fontHeight;
            } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.42) {
                widthVal = 0.753 * fontHeight;
            } else if (this.heightRatio > 2.42 && this.heightRatio <= 3.02) {
                widthVal = 0.8 * fontHeight;
            } else if (this.heightRatio > 3.02 && this.heightRatio <= 3.5) {
                widthVal = 0.877 * fontHeight;
            } else {
                widthVal = 0.877 * fontHeight;
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
            var numberOfMiddleBrackets = Math.round((this.heightRatio - 3.9)/0.45) + 1;
            if (this.heightRatio <= 1.5) {
                topAlignVal = 0.5 * fontHeight;
            } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.42) {
                topAlignVal = 1.21 * fontHeight;
            } else if (this.heightRatio > 2.42 && this.heightRatio <= 3.02) {
                topAlignVal = 1.51 * fontHeight;
            } else if (this.heightRatio > 3.02 && this.heightRatio <= 3.5) {
                topAlignVal = 1.75 * fontHeight;
            } else {
                topAlignVal = (0.5 * (numberOfMiddleBrackets * 0.45 + 3.7)) * fontHeight;
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
            var numberOfMiddleBrackets = Math.round((this.heightRatio - 3.9)/0.45) + 1;
            if (this.heightRatio <= 1.5) {
                bottomAlignVal = 0.5 * fontHeight;
            } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.42) {
                bottomAlignVal = 1.21 * fontHeight;
            } else if (this.heightRatio > 2.42 && this.heightRatio <= 3.02) {
                bottomAlignVal = 1.51 * fontHeight;
            } else if (this.heightRatio > 3.02 && this.heightRatio <= 3.5) {
                bottomAlignVal = 1.75 * fontHeight;
            } else {
                bottomAlignVal = (0.5 * (numberOfMiddleBrackets * 0.45 + 3.7)) * fontHeight;
            }
            return bottomAlignVal;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.RightParenthesisBracketWrapper.prototype = Object.create(eqEd.RightBracketWrapper.prototype);
    eqEd.RightParenthesisBracketWrapper.prototype.constructor = eqEd.RightParenthesisBracketWrapper;
    eqEd.RightParenthesisBracketWrapper.prototype.clone = function() {
        return new this.constructor(this.symbol.character, this.symbol.fontStyle, this.symbolSizeConfig);
    };
    eqEd.RightParenthesisBracketWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="wrapper bracketWrapper rightBracketWrapper rightParenthesisBracketWrapper"></div>')
    };
    // This is a callback that happens after this.heightRation gets calculated.
    eqEd.RightParenthesisBracketWrapper.prototype.updateBracketStructure = function() {
        this.domObj.empty();
        this.padTop = 0;
        this.padBottom = 0;
        this.wholeBracket = null;
        this.topBracket = null;
        this.middleBrackets = [];
        this.bottomBracket = null;
        this.childNoncontainers = [];
        console.log(this.heightRatio);
        if (this.heightRatio <= 1.5) {
            this.padTop = 0;
            this.padBottom = 0.1;
            this.wholeBracket = new eqEd.WholeBracket(')', "MathJax_Main", this.symbolSizeConfig);
            this.wholeBracket.parent = this;
            this.domObj.append(this.wholeBracket.domObj);
            this.childNoncontainers = [this.wholeBracket];
        } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.42) {
            this.padTop = 0.1;
            this.padBottom = 0.1;
            this.wholeBracket = new eqEd.WholeBracket(')', "MathJax_Size3", this.symbolSizeConfig);
            this.wholeBracket.parent = this;
            this.domObj.append(this.wholeBracket.domObj);
            this.childNoncontainers = [this.wholeBracket];
        } else if (this.heightRatio > 2.42 && this.heightRatio <= 3.02) {
            this.padTop = 0.1;
            this.padBottom = 0.1;
            this.wholeBracket = new eqEd.WholeBracket(')', "MathJax_Size4", this.symbolSizeConfig);
            this.wholeBracket.parent = this;
            this.domObj.append(this.wholeBracket.domObj);
            this.childNoncontainers = [this.wholeBracket];
        } else if (this.heightRatio > 3.02 && this.heightRatio <= 3.5) {
            this.padTop = 0.1;
            this.padBottom = 0.1;
            this.topBracket = new eqEd.RightParenthesisTopBracket(this.symbolSizeConfig);
            this.bottomBracket = new eqEd.RightParenthesisBottomBracket(this.symbolSizeConfig);
            this.topBracket.parent = this;
            this.bottomBracket.parent = this;
            this.domObj.append(this.topBracket.domObj);
            this.domObj.append(this.bottomBracket.domObj);
            this.childNoncontainers = [this.topBracket, this.bottomBracket];
        } else {
            this.padTop = 0.1;
            this.padBottom = 0.0;
            var numberOfMiddleBrackets = Math.round((this.heightRatio - 3.9)/0.45) + 1;
            this.topBracket = new eqEd.RightParenthesisTopBracket(this.symbolSizeConfig);
            this.bottomBracket = new eqEd.RightParenthesisBottomBracket(this.symbolSizeConfig);
            this.topBracket.parent = this;
            this.bottomBracket.parent = this;
            this.domObj.append(this.topBracket.domObj);
            this.domObj.append(this.bottomBracket.domObj);
            for (var i = 0; i < numberOfMiddleBrackets; i++) {
                var middleBracket = new eqEd.RightParenthesisMiddleBracket(i, this.symbolSizeConfig);
                middleBracket.parent = this;
                this.domObj.append(middleBracket.domObj);
                this.middleBrackets.push(middleBracket);
            }
            this.childNoncontainers = [this.topBracket].concat(this.middleBrackets).concat([this.bottomBracket]);
        }
    }
})();