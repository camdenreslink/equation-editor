eqEd.BigOperatorSymbol = function(parent) {
    eqEd.BoundEquationComponent.call(this, parent); // call super constructor.
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
            var leftVal = 0;
            if (this.parent.isInline) {
                leftVal = 0;
            } else {
                var maxWidthList = [];
                if (this.parent.hasUpperLimit) {
                    maxWidthList.push(this.parent.upperLimitContainer.width);
                }
                if (this.parent.hasLowerLimit) {
                    maxWidthList.push(this.parent.lowerLimitContainer.width);
                }
                maxWidthList.push(this.parent.symbol.width);
                var maxWidth = maxWidthList.max();
                leftVal = 0.5 * (maxWidth - this.width);
            }
            return leftVal;
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
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            var topVal = this.parent.topAlign - 0.5 * this.height;
            return topVal;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
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
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            return 1.5 * fontHeight;
        },
        updateDom: function() {
            this.domObj.updateHeight(this.height);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.BigOperatorSymbol.prototype = Object.create(eqEd.BoundEquationComponent.prototype);
    eqEd.BigOperatorSymbol.prototype.constructor = eqEd.BigOperatorSymbol;
})();