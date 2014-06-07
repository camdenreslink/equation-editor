eqEd.BigOperatorUpperLimitContainer = function(symbolSizeConfig) {
    eqEd.Container.call(this, symbolSizeConfig);
    this.className = "eqEd.BigOperatorUpperLimitContainer";
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
            var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
            return this.parent.topAlign - (this.height + 0.5 * this.parent.symbol.height + this.parent.upperLimitGap * fontHeight);
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
    eqEd.BigOperatorUpperLimitContainer.prototype = Object.create(eqEd.Container.prototype);
    eqEd.BigOperatorUpperLimitContainer.prototype.constructor = eqEd.BigOperatorUpperLimitContainer;
    eqEd.BigOperatorUpperLimitContainer.prototype.buildDomObj = function() {
        return new eqEd.ContainerDom(this,
            '<div class="container bigOperatorUpperLimitContainer"></div>');
    };
})();