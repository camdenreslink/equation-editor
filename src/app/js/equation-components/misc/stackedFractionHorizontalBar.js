eqEd.StackedFractionHorizontalBar = function(parent) {
    eqEd.BoundEquationComponent.call(this, parent); // call super constructor.
    this.className = "eqEd.StackedFractionHorizontalBar";

    this.domObj = this.buildDomObj();
    this.exceedsMaxNumDenomWidth = 0.25;
    this.barHeightRatio = 0.05;

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
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            var maxNumDenomWidth = (this.parent.stackedFractionDenominatorContainer.width > this.parent.stackedFractionNumeratorContainer.width) ? this.parent.stackedFractionDenominatorContainer.width : this.parent.stackedFractionNumeratorContainer.width;
            return maxNumDenomWidth + this.exceedsMaxNumDenomWidth * fontHeight;
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
            var fontHeight = this.equation.fontMetrics.height["fontSizeNormal"];
            return this.barHeightRatio * fontHeight;
        },
        updateDom: function() {
            this.domObj.updateHeight(this.height);
        }
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
            // remember compute hooks get called.
            return 0;
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
            return this.parent.stackedFractionNumeratorContainer.height;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));

};
(function() {
    // subclass extends superclass
    eqEd.StackedFractionHorizontalBar.prototype = Object.create(eqEd.BoundEquationComponent.prototype);
    eqEd.StackedFractionHorizontalBar.prototype.constructor = eqEd.StackedFractionHorizontalBar;
    eqEd.StackedFractionHorizontalBar.prototype.buildDomObj = function() {
        return new eqEd.EquationDom(this,
            '<div class="stackedFractionHorizontalBar"></div>');
    };
})();