eqEd.BigOperatorWrapper = function(isInline, hasUpperLimit, hasLowerLimit, bigOperatorType, symbolSizeConfig) {
    eqEd.Wrapper.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.BigOperatorWrapper";

    this.isInline = isInline;
    this.hasUpperLimit = hasUpperLimit;
    this.hasLowerLimit = hasLowerLimit;
    this.bigOperatorType = bigOperatorType;

    this.upperLimitGap = 0.1;
    this.lowerLimitGap = 0.2;
    this.operandGap = 0.15;

    this.inlineUpperLimitOverlap = 0.4;
    this.inlineLowerLimitOverlap = 0.4;
    this.inlineLimitGap = 0.1;
    this.inlineOperandGap = 0.15;

    this.bigOperatorSymbolCtors = {
        'sum': eqEd.SumBigOperatorSymbol,
        'bigCap': eqEd.BigCapBigOperatorSymbol,
        'bigCup': eqEd.BigCupBigOperatorSymbol,
        'bigSqCap': eqEd.BigSqCapBigOperatorSymbol,
        'bigSqCup': eqEd.BigSqCupBigOperatorSymbol,
        'prod': eqEd.ProdBigOperatorSymbol,
        'coProd': eqEd.CoProdBigOperatorSymbol,
        'bigVee': eqEd.BigVeeBigOperatorSymbol,
        'bigWedge': eqEd.BigWedgeBigOperatorSymbol
    }

    this.domObj = this.buildDomObj();
    this.childContainers = [];

    if (this.hasUpperLimit) {
        this.upperLimitContainer = new eqEd.BigOperatorUpperLimitContainer(this.symbolSizeConfig);
        this.upperLimitContainer.parent = this;
        this.domObj.append(this.upperLimitContainer.domObj);
        this.childContainers.push(this.upperLimitContainer);
    }
    if (this.hasLowerLimit) {
        this.lowerLimitContainer = new eqEd.BigOperatorLowerLimitContainer(this.symbolSizeConfig);
        this.lowerLimitContainer.parent = this;
        this.domObj.append(this.lowerLimitContainer.domObj);
        this.childContainers.push(this.lowerLimitContainer)
    }
    
    this.operandContainer = new eqEd.BigOperatorOperandContainer(this.symbolSizeConfig);
    this.symbol = new this.bigOperatorSymbolCtors[this.bigOperatorType](this.symbolSizeConfig);

    this.operandContainer.parent = this;
    this.symbol.parent = this;
    this.domObj.append(this.operandContainer.domObj);
    this.domObj.append(this.symbol.domObj);
    
    this.childNoncontainers = [this.symbol];
    this.childContainers.push(this.operandContainer);

    this.padLeft = 0.05;
    this.padRight = 0.05;


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
            var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
            var widthVal = 0;
            if (this.isInline) {
                var maxWidthList = [];
                if (this.hasUpperLimit) {
                    maxWidthList.push(this.upperLimitContainer.width);
                }
                if (this.hasLowerLimit) {
                    maxWidthList.push(this.lowerLimitContainer.width);
                }
                var limitWidth = (maxWidthList.length > 0) ? maxWidthList.max() : 0;
                widthVal = this.symbol.width + this.inlineLimitGap * fontHeight + limitWidth + this.inlineOperandGap * fontHeight + this.operandContainer.width;
            } else {
                var maxWidthList = [];
                if (this.hasUpperLimit) {
                    maxWidthList.push(this.upperLimitContainer.width);
                }
                if (this.hasLowerLimit) {
                    maxWidthList.push(this.lowerLimitContainer.width);
                }
                maxWidthList.push(this.symbol.width);
                var maxWidth = maxWidthList.max();
                widthVal = maxWidth + this.operandContainer.width + this.operandGap * fontHeight;
            }
            return widthVal;
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
            var leftPartTopAlign = 0;
            var rightPartTopAlign = 0;
            // Need to check if maxTopAlignIndex exists, because it doesn't exist
            // when this.operandContainer.wrappers.length === 0
            if (this.operandContainer.maxTopAlignIndex !== null) {
                rightPartTopAlign = this.operandContainer.wrappers[this.operandContainer.maxTopAlignIndex].topAlign;
            }
            if (this.isInline) {
                if (this.hasUpperLimit) {
                    if (this.upperLimitContainer.height > this.symbol.height * this.inlineUpperLimitOverlap) {
                        leftPartTopAlign = 0.1 * this.symbol.height + this.upperLimitContainer.height;
                    } else {
                        leftPartTopAlign = 0.5 * this.symbol.height;
                    }
                } else {
                    leftPartTopAlign = 0.5 * this.symbol.height;
                }
            } else {
                if (this.operandContainer.wrappers.length > 0) {
                    if (this.hasUpperLimit) {
                        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
                        leftPartTopAlign = 0.5 * this.symbol.height + this.upperLimitContainer.height + this.upperLimitGap * fontHeight;
                    } else {
                        leftPartTopAlign = 0.5 * this.symbol.height;
                    }
                }
            }
            topAlignVal = (leftPartTopAlign > rightPartTopAlign) ? leftPartTopAlign : rightPartTopAlign;
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
            var leftPartBottomAlign = 0;
            var rightPartBottomAlign = 0;
            
            // Need to check if maxBottomAlignIndex exists, because it doesn't exist
            // when this.operandContainer.wrappers.length === 0
            if (this.operandContainer.maxBottomAlignIndex !== null) {
                rightPartBottomAlign = this.operandContainer.wrappers[this.operandContainer.maxBottomAlignIndex].topAlign;
            }

            if (this.isInline) {
                if (this.hasLowerLimit) {
                    if (this.lowerLimitContainer.height > this.symbol.height * this.inlineLowerLimitOverlap) {
                        leftPartBottomAlign = 0.1 * this.symbol.height + this.lowerLimitContainer.height;
                    } else {
                        leftPartBottomAlign = 0.5 * this.symbol.height;
                    }
                } else {
                    leftPartBottomAlign = 0.5 * this.symbol.height;
                }
            } else {
                if (this.operandContainer.wrappers.length > 0) {
                    if (this.hasLowerLimit) {
                        var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
                        leftPartBottomAlign = 0.5 * this.symbol.height + this.lowerLimitContainer.height + this.lowerLimitGap * fontHeight;
                    } else {
                        leftPartBottomAlign = 0.5 * this.symbol.height;
                    }
                }
            }
            bottomAlignVal = (leftPartBottomAlign > rightPartBottomAlign) ? leftPartBottomAlign : rightPartBottomAlign;
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
            '<div class="eqEdWrapper bigOperatorWrapper"></div>')
    }
    eqEd.BigOperatorWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.isInline, this.hasUpperLimit, this.hasLowerLimit, this.bigOperatorType, this.symbolSizeConfig);

        copy.childContainers = [];
        copy.domObj = copy.buildDomObj();

        if (copy.hasUpperLimit) {
            copy.upperLimitContainer = this.upperLimitContainer.clone();
            copy.upperLimitContainer.parent = copy;
            copy.domObj.append(copy.upperLimitContainer.domObj);
            copy.childContainers.push(copy.upperLimitContainer);
        }
        if (copy.hasLowerLimit) {
            copy.lowerLimitContainer = this.lowerLimitContainer.clone();
            copy.lowerLimitContainer.parent = copy;
            copy.domObj.append(copy.lowerLimitContainer.domObj);
            copy.childContainers.push(copy.lowerLimitContainer);
        }
        copy.operandContainer = this.operandContainer.clone();
        copy.symbol = new copy.bigOperatorSymbolCtors[copy.bigOperatorType](copy.symbolSizeConfig);

        copy.operandContainer.parent = copy;
        copy.symbol.parent = copy;

        copy.domObj.append(copy.operandContainer.domObj);
        copy.domObj.append(copy.symbol.domObj);

        copy.childNoncontainers = [copy.symbol];
        copy.childContainers.push(copy.operandContainer);

        return copy;
    };
    eqEd.BigOperatorWrapper.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: this.className.substring(5, this.className.length - 7),
            value: this.bigOperatorType
        };
        if (!this.hasLowerLimit && !this.hasUpperLimit) {
            jsonObj.operands = {
                operand: this.operandContainer.buildJsonObj()
            };
        } else if (this.hasLowerLimit && !this.hasUpperLimit) {
            jsonObj.operands = {
                lowerLimit: this.lowerLimitContainer.buildJsonObj(),
                operand: this.operandContainer.buildJsonObj()
            }
        } else if (!this.hasLowerLimit && this.hasUpperLimit) {
            jsonObj.operands = {
                upperLimit: this.upperLimitContainer.buildJsonObj(),
                operand: this.operandContainer.buildJsonObj()
            }
        } else {
            jsonObj.operands = {
                lowerLimit: this.lowerLimitContainer.buildJsonObj(),
                upperLimit: this.upperLimitContainer.buildJsonObj(),
                operand: this.operandContainer.buildJsonObj()
            }
        }
        return jsonObj;
    };
    eqEd.BigOperatorWrapper.constructFromJsonObj = function(jsonObj, symbolSizeConfig) {
        var hasUpperLimit = (typeof jsonObj.operands.upperLimit !== "undefined");
        var hasLowerLimit = (typeof jsonObj.operands.lowerLimit !== "undefined");
        var bigOperatorWrapper = new eqEd.BigOperatorWrapper(false, hasUpperLimit, hasLowerLimit, jsonObj.value, symbolSizeConfig);
        if (hasUpperLimit) {
            for (var i = 0; i < jsonObj.operands.upperLimit.length; i++) {
                var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.upperLimit[i].type);
                var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.upperLimit[i], symbolSizeConfig);
                bigOperatorWrapper.upperLimitContainer.addWrappers([i, innerWrapper]);
            }
        }
        if (hasLowerLimit) {
            for (var i = 0; i < jsonObj.operands.lowerLimit.length; i++) {
                var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.lowerLimit[i].type);
                var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.lowerLimit[i], symbolSizeConfig);
                bigOperatorWrapper.lowerLimitContainer.addWrappers([i, innerWrapper]);
            }
        }
        for (var i = 0; i < jsonObj.operands.operand.length; i++) {
            var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.operand[i].type);
            var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.operand[i], symbolSizeConfig);
            bigOperatorWrapper.operandContainer.addWrappers([i, innerWrapper]);
        }

        return bigOperatorWrapper;
    }
})();