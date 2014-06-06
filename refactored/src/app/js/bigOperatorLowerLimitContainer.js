eqEd.BigOperatorLowerLimitContainer = function(symbolSizeConfig) {
    eqEd.Container.call(this, symbolSizeConfig);
    this.className = "eqEd.BigOperatorLowerLimitContainer";
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
            var topVal = 0;
            var topValAdjust = this.parent.topAlign;
            if (this.parent.hasUpperLimit) {
                topVal += this.parent.upperLimitContainer.height;
                topValAdjust -= this.parent.upperLimitContainer.height;
            }
            topVal += this.parent.symbol.height;
            topValAdjust -= 0.5 * this.parent.symbol.height;
            return topVal + topValAdjust;
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
            return "fontSizeSmallest";
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
            '<div class="container bigOperatorLowerLimitContainer"></div>');
    };
})();