eqEd.SquareEmptyContainerFillerWrapper = function(equation) {
    eqEd.Wrapper.call(this, equation); // call super constructor.
    this.className = "eqEd.SquareEmptyContainerFillerWrapper";

    this.domObj = this.buildDomObj();


    this.sideLength = 0.85;

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
            var fontHeight = this.equation.fontMetrics.height[this.parent.fontSize];
            return this.sideLength * fontHeight;
        },
        updateDom: function() {
            this.domObj.updateWidth(this.width);
        }
    }));

    // Set up the topAlign calculation
    var topAlign = 0;
    this.properties.push(new Property(this, "topAlign", topAlign, {
        get: function() {
            return topAlign;
        },
        set: function(value) {
            topAlign = value;
        },
        compute: function() {
            var fontHeight = this.equation.fontMetrics.height[this.parent.fontSize];
            return 0.5 * this.sideLength * fontHeight;
        },
        updateDom: function() {}
    }));

    // Set up the bottomAlign calculation
    var bottomAlign = 0;
    this.properties.push(new Property(this, "bottomAlign", bottomAlign, {
        get: function() {
            return bottomAlign;
        },
        set: function(value) {
            bottomAlign = value;
        },
        compute: function() {
            var fontHeight = this.equation.fontMetrics.height[this.parent.fontSize];
            return 0.5 * this.sideLength * fontHeight;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.SquareEmptyContainerFillerWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.SquareEmptyContainerFillerWrapper.prototype.constructor = eqEd.SquareEmptyContainerFillerWrapper;
    eqEd.SquareEmptyContainerFillerWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="eqEdWrapper squareEmptyContainerFillerWrapper"></div>')
    }
    eqEd.SquareEmptyContainerFillerWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.equation);
        return copy;
    }
})();