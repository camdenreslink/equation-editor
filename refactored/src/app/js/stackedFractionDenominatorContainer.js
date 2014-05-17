eqEd.StackedFractionDenominatorContainer = function(symbolSizeConfig) {
    eqEd.Container.call(this, symbolSizeConfig);
    this.className = "eqEd.StackedFractionDenominatorContainer";
    this.domObj = this.buildDomObj();
    var squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(symbolSizeConfig);
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
            var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
            var maxNumDenomWidth = (this.width > this.parent.stackedFractionNumeratorContainer.width) ? this.width : this.parent.stackedFractionNumeratorContainer.width;
            return 0.5 * (maxNumDenomWidth - this.width) + 0.5 * this.parent.stackedFractionHorizontalBar.exceedsMaxNumDenomWidth * fontHeight;
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
            return this.parent.stackedFractionNumeratorContainer.height + this.parent.stackedFractionHorizontalBar.height;
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
            if (this.parent.parent.fontSize === "fontSizeSmaller" || this.parent.parent.fontSize === "fontSizeSmallest") {
                fontSizeVal = "fontSizeSmallest";
            } else {
                if (this.parent.parent.parent instanceof eqEd.StackedFractionWrapper) {
                    fontSizeVal = "fontSizeSmaller";
                } else {
                    fontSizeVal = "fontSizeNormal";
                }
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
    eqEd.StackedFractionDenominatorContainer.prototype = Object.create(eqEd.Container.prototype);
    eqEd.StackedFractionDenominatorContainer.prototype.constructor = eqEd.StackedFractionDenominatorContainer;
    eqEd.StackedFractionDenominatorContainer.prototype.buildDomObj = function() {
        return new eqEd.ContainerDom(this,
            '<div class="container stackedFractionDenominatorContainer"></div>');
    };
})();