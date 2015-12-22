eqEd.StackedFractionDenominatorContainer = function(parent) {
    eqEd.Container.call(this, parent);
    this.className = "eqEd.StackedFractionDenominatorContainer";
    this.domObj = this.buildDomObj();
    var squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(this.equation);
    this.addWrappers([0, squareEmptyContainerWrapper]);
    
    this.padBottom = 0.025;
    this.padTop = 0.025;

    // Set up the padTop calculation
    var padTop = 0;
    this.properties.push(new Property(this, "padTop", padTop, {
        get: function() {
            return padTop;
        },
        set: function(value) {
            padTop = value;
        },
        compute: function() {
            var padTopVal = 0.025;
            var hasRoot = false;
            for (var i = 0; i < this.wrappers.length; i++) {
                if (this.wrappers[i] instanceof eqEd.SquareRootWrapper || this.wrappers[i] instanceof eqEd.NthRootWrapper) {
                    hasRoot = true;
                    break;
                }
            }
            if (hasRoot) {
                padTopVal = 0.1;
            }
            return padTopVal;
        },
        updateDom: function() {}
    }));


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
    eqEd.StackedFractionDenominatorContainer.prototype = Object.create(eqEd.Container.prototype);
    eqEd.StackedFractionDenominatorContainer.prototype.constructor = eqEd.StackedFractionDenominatorContainer;
    eqEd.StackedFractionDenominatorContainer.prototype.buildDomObj = function() {
        return new eqEd.ContainerDom(this,
            '<div class="eqEdContainer stackedFractionDenominatorContainer"></div>');
    };
})();