eqEd.BigOperatorLowerLimitContainer = function(parent) {
    eqEd.Container.call(this, parent);
    this.className = "eqEd.BigOperatorLowerLimitContainer";
    this.domObj = this.buildDomObj();
    var squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(this.equation);
    this.addWrappers([0, squareEmptyContainerWrapper]);
    
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
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            var leftVal = 0;
            if (this.parent.isInline) {
                leftVal = this.parent.symbol.width + this.parent.inlineLimitGap * fontHeight;
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
            var topVal = 0;
            if (this.parent.isInline) {
                var additionalTopAlign = 0;
                if (this.height > this.parent.symbol.height * this.parent.inlineLowerLimitOverlap) {
                    additionalTopAlign = (0.5 - this.parent.inlineLowerLimitOverlap) * this.parent.symbol.height;
                } else {
                    additionalTopAlign = 0.5 * this.parent.symbol.height - this.height;
                }
                topVal = (this.parent.topAlign - this.parent.padTop * fontHeight) + additionalTopAlign;
            } else {
                topVal = (this.parent.topAlign - this.parent.padTop * fontHeight) + this.parent.symbol.height * 0.5 + this.parent.lowerLimitGap * fontHeight;
            }
            return topVal;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));

    // Set up the fontSize calculation
    var fontSize = "";
    this.properties.push(new Property(this, "fontSize", fontSize, {
        get: function() {
            return fontSize;
        },
        set: function(value) {
            fontSize = value;
        },
        compute: function() {
            var fontSizeVal = "";
            var actualParentContainer = this.parent.parent;
            while (actualParentContainer instanceof eqEd.BracketContainer) {
                actualParentContainer = actualParentContainer.parent.parent;
            }
            if (actualParentContainer.fontSize === "fontSizeSmaller" || actualParentContainer.fontSize === "fontSizeSmallest") {
                fontSizeVal = "fontSizeSmallest";
            } else {
                fontSizeVal = "fontSizeSmaller";
            }
            return fontSizeVal;
        },
        updateDom: function() {
            this.domObj.updateFontSize(this.fontSize);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.BigOperatorLowerLimitContainer.prototype = Object.create(eqEd.Container.prototype);
    eqEd.BigOperatorLowerLimitContainer.prototype.constructor = eqEd.BigOperatorLowerLimitContainer;
    eqEd.BigOperatorLowerLimitContainer.prototype.buildDomObj = function() {
        return new eqEd.ContainerDom(this,
            '<div class="eqEdContainer bigOperatorLowerLimitContainer"></div>');
    };
})();