eqEd.StackedFractionNumeratorContainer = function(parent) {
    eqEd.Container.call(this, parent);
    this.className = "eqEd.StackedFractionNumeratorContainer";
    
    this.domObj = this.buildDomObj();
    var squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(this.equation);
    this.addWrappers([0, squareEmptyContainerWrapper]);

    this.padBottom = 0.025;
    this.padTop = 0.025;
    
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
            var maxNumDenomWidth = (this.width > this.parent.stackedFractionDenominatorContainer.width) ? this.width : this.parent.stackedFractionDenominatorContainer.width;
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
            // remember compute hooks get called.
            return 0;
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
                if (actualParentContainer.parent instanceof eqEd.StackedFractionWrapper) {
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
    eqEd.StackedFractionNumeratorContainer.prototype = Object.create(eqEd.Container.prototype);
    eqEd.StackedFractionNumeratorContainer.prototype.constructor = eqEd.StackedFractionNumeratorContainer;
    eqEd.StackedFractionNumeratorContainer.prototype.buildDomObj = function() {
        return new eqEd.ContainerDom(this,
            '<div class="eqEdContainer stackedFractionNumeratorContainer"></div>');
    };
})();