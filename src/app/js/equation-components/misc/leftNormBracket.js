eqEd.LeftNormBracket = function(parent) {
    eqEd.LeftBracket.call(this, parent); // call super constructor.
    this.className = "eqEd.LeftNormBracket";

    this.matchingBracketCtor = eqEd.RightNormBracket;
    this.wholeBracket = new eqEd.LeftNormWholeBracket(parent, "MathJax_Main");
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
            widthVal = 0.4888888 * fontHeight;
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
    eqEd.LeftNormBracket.prototype = Object.create(eqEd.LeftBracket.prototype);
    eqEd.LeftNormBracket.prototype.constructor = eqEd.LeftNormBracket;
    eqEd.LeftNormBracket.prototype.buildDomObj = function() {
        return new eqEd.EquationDom(this,
            '<div class="bracket leftBracket leftNormBracket"></div>')
    };
    // This is a callback that happens after this.heightRation gets calculated.
    eqEd.LeftNormBracket.prototype.updateBracketStructure = function() {
        this.domObj.empty();
        this.wholeBracket = null;
        this.topBracket = null;
        this.middleBrackets = [];
        this.bottomBracket = null;
        this.children = [];
        var numberOfMiddleBrackets = Math.ceil((this.heightRatio - 1.07)/0.5) + 1;
        for (var i = 0; i < numberOfMiddleBrackets; i++) {
            var middleBracket = new eqEd.LeftNormMiddleBracket(this.parent, i);
            middleBracket.parent = this;
            this.domObj.append(middleBracket.domObj);
            this.middleBrackets.push(middleBracket);
        }
        this.children = this.middleBrackets;
    }
})();