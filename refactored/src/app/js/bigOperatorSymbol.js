eqEd.BigOperatorSymbol = function(symbolSizeConfig) {
    eqEd.Equation.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.BigOperatorSymbol";

    this.domObj = this.buildDomObj();

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
            var maxWidthList = [];
            if (this.parent.hasUpperLimit) {
                maxWidthList.push(this.parent.upperLimitContainer.width);
            }
            if (this.parent.hasLowerLimit) {
                maxWidthList.push(this.parent.lowerLimitContainer.width);
            }
            maxWidthList.push(this.parent.symbol.width);
            var maxWidth = maxWidthList.max();
            return 0.5 * (maxWidth - this.width);
        },
        updateDom: function() {
            this.domObj.updateLeft(this.left);
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
            var topVal = 0;
            var topValAdjust = this.parent.topAlign;
            if (this.parent.hasUpperLimit) {
                topVal += this.parent.upperLimitContainer.height;
                topValAdjust -= this.parent.upperLimitContainer.height;
            }
            topValAdjust -= 0.5 * this.height;
            return topVal + topValAdjust;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));

};
(function() {
    // subclass extends superclass
    eqEd.BigOperatorSymbol.prototype = Object.create(eqEd.Equation.prototype);
    eqEd.BigOperatorSymbol.prototype.constructor = eqEd.BigOperatorSymbol;
})();