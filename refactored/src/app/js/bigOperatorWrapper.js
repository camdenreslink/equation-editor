eqEd.BigOperatorWrapper = function(hasUpperLimit, hasLowerLimit, bigOperatorType, symbolSizeConfig) {
    eqEd.Wrapper.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.BigOperatorWrapper";

    this.hasUpperLimit = hasUpperLimit;
    this.hasLowerLimit = hasLowerLimit;
    this.bigOperatorType = bigOperatorType;

    var bigOperatorSymbolCtors = {
        'sum': eqEd.SumBigOperatorSymbol,
        'bigCap': eqEd.BigCapBigOperatorSymbol,
        'bigCup': eqEd.BigCupBigOperatorSymbol
    }

    this.domObj = this.buildDomObj();
    this.childContainers = [];

    if (this.hasUpperLimit) {
        this.upperLimitContainer = new eqEd.BigOperatorUpperLimitContainer(symbolSizeConfig);
        this.upperLimitContainer.parent = this;
        this.domObj.append(this.upperLimitContainer.domObj);
        this.childContainers.push(this.upperLimitContainer);
    }
    if (this.hasLowerLimit) {
        this.lowerLimitContainer = new eqEd.BigOperatorLowerLimitContainer(symbolSizeConfig);
        this.lowerLimitContainer.parent = this;
        this.domObj.append(this.lowerLimitContainer.domObj);
        this.childContainers.push(this.lowerLimitContainer)
    }
    
    this.operandContainer = new eqEd.BigOperatorOperandContainer(symbolSizeConfig);
    this.symbol = new bigOperatorSymbolCtors[this.bigOperatorType](symbolSizeConfig);

    this.operandContainer.parent = this;
    this.symbol.parent = this;
    this.domObj.append(this.operandContainer.domObj);
    this.domObj.append(this.symbol.domObj);
    
    this.childNoncontainers = [this.symbol];
    this.childContainers.push(this.operandContainer);


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
            return this.operandContainer.left + this.operandContainer.width;
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
            var topAlignVal = 0;
            if (this.operandContainer.wrappers.length > 0) {
                if (this.hasUpperLimit) {
                    var leftPartTopAlign = 0.5 * this.symbol.height + this.upperLimitContainer.height;
                    var rightPartTopAlign = this.operandContainer.wrappers[this.operandContainer.maxTopAlignIndex].topAlign;
                    topAlignVal = (leftPartTopAlign > rightPartTopAlign) ? leftPartTopAlign : rightPartTopAlign;
                } else {
                    var leftPartTopAlign = 0.5 * this.symbol.height;
                    var rightPartTopAlign = this.operandContainer.wrappers[this.operandContainer.maxTopAlignIndex].topAlign;
                    topAlignVal = (leftPartTopAlign > rightPartTopAlign) ? leftPartTopAlign : rightPartTopAlign;
                }
            }
            return topAlignVal;
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
            var bottomAlignVal = 0;
            if (this.operandContainer.wrappers.length > 0) {
                if (this.hasLowerLimit) {
                    var leftPartBottomAlign = 0.5 * this.symbol.height + this.lowerLimitContainer.height;
                    var rightPartBottomAlign = this.operandContainer.wrappers[this.operandContainer.maxBottomAlignIndex].bottomAlign;
                    bottomAlignVal = (leftPartBottomAlign > rightPartBottomAlign) ? leftPartBottomAlign : rightPartBottomAlign;
                } else {
                    var leftPartBottomAlign = 0.5 * this.symbol.height;
                    var rightPartBottomAlign = this.operandContainer.wrappers[this.operandContainer.maxBottomAlignIndex].bottomAlign;
                    bottomAlignVal = (leftPartBottomAlign > rightPartBottomAlign) ? leftPartBottomAlign : rightPartBottomAlign;
                }
            }
            return bottomAlignVal;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.BigOperatorWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.BigOperatorWrapper.prototype.constructor = eqEd.BigOperatorWrapper;
    eqEd.BigOperatorWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="wrapper bigOperatorWrapper"></div>')
    }
    eqEd.BigOperatorWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.hasUpperLimit, this.hasLowerLimit, this.bigOperatorType, this.symbolSizeConfig);

        copy.upperLimitContainer = this.upperLimitContainer.clone();
        copy.lowerLimitContainer = this.lowerLimitContainer.clone();
        copy.operandContainer = this.operandContainer.clone();
        copy.symbol = this.operandContainer.clone();
        copy.upperLimitContainer.parent = copy;
        copy.lowerLimitContainer.parent = copy;
        copy.operandContainer.parent = copy;
        copy.symbol.parent = copy;
        copy.domObj = copy.buildDomObj();
        copy.domObj.append(copy.upperLimitContainer.domObj);
        copy.domObj.append(copy.lowerLimitContainer.domObj);
        copy.domObj.append(copy.operandContainer.domObj);
        copy.domObj.append(copy.symbol.domObj);        
        copy.childNoncontainers = [copy.symbol];
        copy.childContainers = [copy.upperLimitContainer, copy.lowerLimitContainer, copy.operandContainer];

        return copy;
    }
})();