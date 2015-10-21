eqEd.LimitSymbol = function(parent) {
    eqEd.Symbol.call(this, parent, '→', 'MathJax_Main'); // call super constructor.
    this.className = "eqEd.LimitSymbol";

    this.adjustTop = -0.07;

    // Height has already been added to properties in superclass
    // needs removed to be overriden
    for(var i = 0; i < this.properties.length; i++) {
        if (this.properties[i].propName === "left"
            || this.properties[i].propName === "top") {
            this.properties.splice(i, 1);
        }
    }

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
            return leftOffset + this.parent.limitLeftContainer.width + this.parent.leftLimitContainerGap * fontHeight;
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
            if (this.parent.limitLeftContainer.wrappers.length > 0
                && this.parent.limitRightContainer.wrappers.length > 0) {
                bottomHalfMaxTopAlign = [this.parent.limitLeftContainer.wrappers[this.parent.limitLeftContainer.maxTopAlignIndex].topAlign, 0.5 * this.height, this.parent.limitRightContainer.wrappers[this.parent.limitRightContainer.maxTopAlignIndex].topAlign].max();
                topOffset = bottomHalfMaxTopAlign - 0.5 * this.height;
            }
            return this.parent.limitWord.height + this.parent.belowLimitGap * fontHeight + topOffset;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));

};
(function() {
    // subclass extends superclass
    eqEd.LimitSymbol.prototype = Object.create(eqEd.Symbol.prototype);
    eqEd.LimitSymbol.prototype.constructor = eqEd.LimitSymbol;
})();