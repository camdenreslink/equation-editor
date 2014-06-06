eqEd.RightAbsValBracket = function(symbolSizeConfig) {
    eqEd.RightBracket.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.RightAbsValBracket";

    this.matchingBracketCtor = eqEd.LeftAbsValBracket;
    this.wholeBracket = new eqEd.RightAbsValWholeBracket("MathJax_Main", this.symbolSizeConfig);
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
            widthVal = 0.266666 * fontHeight;
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
            var numBrackets = Math.ceil((this.heightRatio - 1.07)/0.5) + 1;
            heightVal = (1.07 + (0.5 * (numBrackets - 1))) * fontHeight;
            return heightVal;
        },
        updateDom: function() {
            this.domObj.updateHeight(this.height);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.RightAbsValBracket.prototype = Object.create(eqEd.RightBracket.prototype);
    eqEd.RightAbsValBracket.prototype.constructor = eqEd.RightAbsValBracket;
    eqEd.RightAbsValBracket.prototype.buildDomObj = function() {
        return new eqEd.EquationDom(this,
            '<div class="bracket rightBracket rightAbsValBracket"></div>')
    };
    // This is a callback that happens after this.heightRation gets calculated.
    eqEd.RightAbsValBracket.prototype.updateBracketStructure = function() {
        this.domObj.empty();
        this.wholeBracket = null;
        this.topBracket = null;
        this.middleBrackets = [];
        this.bottomBracket = null;
        this.children = [];
        var numberOfMiddleBrackets = Math.ceil((this.heightRatio - 1.07)/0.5) + 1;
        for (var i = 0; i < numberOfMiddleBrackets; i++) {
            var middleBracket = new eqEd.RightAbsValMiddleBracket(i, this.symbolSizeConfig);
            middleBracket.parent = this;
            this.domObj.append(middleBracket.domObj);
            this.middleBrackets.push(middleBracket);
        }
        this.children = this.middleBrackets;
    }
})();