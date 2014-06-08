eqEd.RightCurlyBracket = function(symbolSizeConfig) {
    eqEd.RightBracket.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.RightCurlyBracket";

    this.matchingBracketCtor = eqEd.LeftCurlyBracket;
    this.wholeBracket = new eqEd.RightCurlyWholeBracket("MathJax_Main", symbolSizeConfig);
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
            var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
            if (this.heightRatio <= 1.5) {
                widthVal = 0.511111 * fontHeight;
            } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.4) {
                widthVal = 0.755555 * fontHeight;
            } else if (this.heightRatio > 2.4 && this.heightRatio <= 3) {
                widthVal = 0.8 * fontHeight;
            } else if (this.heightRatio > 3 && this.heightRatio <= 3.33) {
                widthVal = 0.666666 * fontHeight;
            } else {
                widthVal = 0.888888 * fontHeight;
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
            var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
            if (this.heightRatio <= 1.5) {
                heightVal = fontHeight;
            } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.4) {
                heightVal = 2.4 * fontHeight;
            } else if (this.heightRatio > 2.4 && this.heightRatio <= 3) {
                heightVal = 3 * fontHeight;
            } else if (this.heightRatio > 3 && this.heightRatio <= 3.33) {
                heightVal = 3.33 * fontHeight;
            } else {
                var bottomBracketTop = this.bottomBracket.top / fontHeight;
                heightVal = (bottomBracketTop + 1.652778 - this.padTop) * fontHeight;
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
    eqEd.RightCurlyBracket.prototype = Object.create(eqEd.RightBracket.prototype);
    eqEd.RightCurlyBracket.prototype.constructor = eqEd.RightCurlyBracket;
    eqEd.RightCurlyBracket.prototype.buildDomObj = function() {
        return new eqEd.EquationDom(this,
            '<div class="bracket rightBracket rightCurlyBracket"></div>')
    };
    // This is a callback that happens after this.heightRation gets calculated.
    eqEd.RightCurlyBracket.prototype.updateBracketStructure = function() {
        this.domObj.empty();
        this.wholeBracket = null;
        this.topBracket = null;
        this.middleBrackets = [];
        this.bottomBracket = null;
        this.children = [];
        if (this.heightRatio <= 1.5) {
            this.wholeBracket = new eqEd.RightCurlyWholeBracket("MathJax_Main", this.symbolSizeConfig);
            this.wholeBracket.parent = this;
            this.domObj.append(this.wholeBracket.domObj);
            this.children = [this.wholeBracket];
        } else if (this.heightRatio > 1.5 && this.heightRatio <= 2.4) {
            this.wholeBracket = new eqEd.RightCurlyWholeBracket("MathJax_Size3", this.symbolSizeConfig);
            this.wholeBracket.parent = this;
            this.domObj.append(this.wholeBracket.domObj);
            this.children = [this.wholeBracket];
        } else if (this.heightRatio > 2.4 && this.heightRatio <= 3) {
            this.wholeBracket = new eqEd.RightCurlyWholeBracket("MathJax_Size4", this.symbolSizeConfig);
            this.wholeBracket.parent = this;
            this.domObj.append(this.wholeBracket.domObj);
            this.children = [this.wholeBracket];
        } else {
            var numberOfMiddleBrackets = Math.round((this.heightRatio - 3.4) / 0.231);
            numberOfMiddleBrackets = (numberOfMiddleBrackets % 2 !== 0) ? (numberOfMiddleBrackets + 1) : numberOfMiddleBrackets;
            this.topBracket = new eqEd.RightCurlyTopBracket(this.symbolSizeConfig);
            this.bottomBracket = new eqEd.RightCurlyBottomBracket(this.symbolSizeConfig);
            this.topBracket.parent = this;
            this.bottomBracket.parent = this;
            this.domObj.append(this.topBracket.domObj);
            this.domObj.append(this.bottomBracket.domObj);
            for (var i = 0; i < Math.round(0.5 * numberOfMiddleBrackets); i++) {
                var middleBracket = new eqEd.RightCurlyMiddleBracket(i, "middleVert", this.symbolSizeConfig);
                middleBracket.parent = this;
                this.domObj.append(middleBracket.domObj);
                this.middleBrackets.push(middleBracket);
            }
            var middleCurly = new eqEd.RightCurlyMiddleBracket(Math.round(0.5 * numberOfMiddleBrackets), "middleCurly", this.symbolSizeConfig);
            middleCurly.parent = this;
            this.domObj.append(middleCurly.domObj);
            this.middleBrackets.push(middleCurly);
            for (var i = (Math.round(0.5 * numberOfMiddleBrackets) + 1); i < (numberOfMiddleBrackets + 1); i++) {
                var middleBracket = new eqEd.RightCurlyMiddleBracket(i, "middleVert", this.symbolSizeConfig);
                middleBracket.parent = this;
                this.domObj.append(middleBracket.domObj);
                this.middleBrackets.push(middleBracket);
            }
            this.children = [this.topBracket].concat(this.middleBrackets).concat([this.bottomBracket]);
        }
    }
})();