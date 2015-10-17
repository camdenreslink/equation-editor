eqEd.LimitLeftContainer = function(parent) {
    eqEd.Container.call(this, parent);
    this.className = "eqEd.LimitLeftContainer";
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
            var leftOffset = 0.5 * ((this.parent.width - (this.parent.padLeft + this.parent.padRight) * fontHeight) - this.parent.bottomHalfWidth);
            return leftOffset;
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
            var bottomHalfMaxTopAlign = 0;
            var topOffset = 0;
            if (this.wrappers.length > 0 && this.parent.limitRightContainer.wrappers.length > 0) {
                bottomHalfMaxTopAlign = [this.wrappers[this.maxTopAlignIndex].topAlign, 0.5 * this.parent.symbol.height, this.parent.limitRightContainer.wrappers[this.parent.limitRightContainer.maxTopAlignIndex].topAlign].max();
                topOffset = bottomHalfMaxTopAlign - this.wrappers[this.maxTopAlignIndex].topAlign;
            }
            return this.parent.limitWord.height + this.parent.belowLimitGap * fontHeight + topOffset;
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
    eqEd.LimitLeftContainer.prototype = Object.create(eqEd.Container.prototype);
    eqEd.LimitLeftContainer.prototype.constructor = eqEd.LimitLeftContainer;
    eqEd.LimitLeftContainer.prototype.buildDomObj = function() {
        return new eqEd.ContainerDom(this,
            '<div class="eqEdContainer limitLeftContainer"></div>');
    };
})();