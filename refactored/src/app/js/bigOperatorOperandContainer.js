eqEd.BigOperatorOperandContainer = function(symbolSizeConfig) {
    eqEd.Container.call(this, symbolSizeConfig);
    this.className = "eqEd.BigOperatorOperandContainer";
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
            return maxWidth;
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
            if (this.wrappers.length > 0) {
                topVal = this.parent.topAlign - this.wrappers[this.maxTopAlignIndex].topAlign;
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
            var fontSizeVal = this.parent.parent.fontSize;
            return fontSizeVal;
        },
        updateDom: function() {
            this.domObj.updateFontSize(this.fontSize);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.BigOperatorOperandContainer.prototype = Object.create(eqEd.Container.prototype);
    eqEd.BigOperatorOperandContainer.prototype.constructor = eqEd.BigOperatorOperandContainer;
    eqEd.BigOperatorOperandContainer.prototype.buildDomObj = function() {
        return new eqEd.ContainerDom(this,
            '<div class="container bigOperatorOperandContainer"></div>');
    };
})();