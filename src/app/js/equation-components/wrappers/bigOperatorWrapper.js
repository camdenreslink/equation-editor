eqEd.BigOperatorWrapper = function(equation, isInline, hasUpperLimit, hasLowerLimit, bigOperatorType) {
    eqEd.Wrapper.call(this, equation); // call super constructor.
    this.className = "eqEd.BigOperatorWrapper";

    this.isInline = isInline;
    this.hasUpperLimit = hasUpperLimit;
    this.hasLowerLimit = hasLowerLimit;
    this.bigOperatorType = bigOperatorType;

    this.upperLimitGap = 0.1;
    this.lowerLimitGap = 0.2;

    this.inlineUpperLimitOverlap = 0.4;
    this.inlineLowerLimitOverlap = 0.4;
    this.inlineLimitGap = 0.1;

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
        this.upperLimitContainer = new eqEd.BigOperatorUpperLimitContainer(this);
        this.domObj.append(this.upperLimitContainer.domObj);
        this.childContainers.push(this.upperLimitContainer);
    }
    if (this.hasLowerLimit) {
        this.lowerLimitContainer = new eqEd.BigOperatorLowerLimitContainer(this);
        this.domObj.append(this.lowerLimitContainer.domObj);
        this.childContainers.push(this.lowerLimitContainer)
    }
    
    this.symbol = new this.bigOperatorSymbolCtors[this.bigOperatorType](this);

    this.domObj.append(this.symbol.domObj);
    
    this.childNoncontainers = [this.symbol];

    this.padLeft = 0.05;
    this.padRight = 0.15;

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
                widthVal = this.symbol.width + this.inlineLimitGap * fontHeight + limitWidth;
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
                widthVal = maxWidth;
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
            if (this.isInline) {
                if (this.hasUpperLimit) {
                    if (this.upperLimitContainer.height > this.symbol.height * this.inlineUpperLimitOverlap) {
                        topAlignVal = 0.1 * this.symbol.height + this.upperLimitContainer.height;
                    } else {
                        topAlignVal = 0.5 * this.symbol.height;
                    }
                } else {
                    topAlignVal = 0.5 * this.symbol.height;
                }
            } else {
                if (this.hasUpperLimit) {
                    var fontHeight = this.equation.fontMetrics.height[this.parent.fontSize];
                    topAlignVal = 0.5 * this.symbol.height + this.upperLimitContainer.height + this.upperLimitGap * fontHeight;
                } else {
                    topAlignVal = 0.5 * this.symbol.height;
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

            if (this.isInline) {
                if (this.hasLowerLimit) {
                    if (this.lowerLimitContainer.height > this.symbol.height * this.inlineLowerLimitOverlap) {
                        bottomAlignVal = 0.1 * this.symbol.height + this.lowerLimitContainer.height;
                    } else {
                        bottomAlignVal = 0.5 * this.symbol.height;
                    }
                } else {
                    bottomAlignVal = 0.5 * this.symbol.height;
                }
            } else {
                if (this.hasLowerLimit) {
                    var fontHeight = this.equation.fontMetrics.height[this.parent.fontSize];
                    bottomAlignVal = 0.5 * this.symbol.height + this.lowerLimitContainer.height + this.lowerLimitGap * fontHeight;
                } else {
                    bottomAlignVal = 0.5 * this.symbol.height;
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
            '<div class="eqEdWrapper bigOperatorWrapper"></div>')
    }
    eqEd.BigOperatorWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.equation, this.isInline, this.hasUpperLimit, this.hasLowerLimit, this.bigOperatorType);

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
        copy.symbol = new copy.bigOperatorSymbolCtors[copy.bigOperatorType](copy);

        copy.domObj.append(copy.symbol.domObj);

        copy.childNoncontainers = [copy.symbol];

        return copy;
    };
    eqEd.BigOperatorWrapper.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: this.className.substring(5, this.className.length - 7),
            value: this.bigOperatorType
        };
        if (!this.hasLowerLimit && !this.hasUpperLimit) {
            jsonObj.operands = null;
        } else if (this.hasLowerLimit && !this.hasUpperLimit) {
            jsonObj.operands = {
                lowerLimit: this.lowerLimitContainer.buildJsonObj()
            }
        } else if (!this.hasLowerLimit && this.hasUpperLimit) {
            jsonObj.operands = {
                upperLimit: this.upperLimitContainer.buildJsonObj()
            }
        } else {
            jsonObj.operands = {
                lowerLimit: this.lowerLimitContainer.buildJsonObj(),
                upperLimit: this.upperLimitContainer.buildJsonObj()
            }
        }
        return jsonObj;
    };
    eqEd.BigOperatorWrapper.constructFromJsonObj = function(jsonObj, equation) {
        var hasUpperLimit = (typeof jsonObj.operands.upperLimit !== "undefined");
        var hasLowerLimit = (typeof jsonObj.operands.lowerLimit !== "undefined");
        var bigOperatorWrapper = new eqEd.BigOperatorWrapper(equation, false, hasUpperLimit, hasLowerLimit, jsonObj.value);
        if (hasUpperLimit) {
            for (var i = 0; i < jsonObj.operands.upperLimit.length; i++) {
                var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.upperLimit[i].type);
                var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.upperLimit[i], equation);
                bigOperatorWrapper.upperLimitContainer.addWrappers([i, innerWrapper]);
            }
        }
        if (hasLowerLimit) {
            for (var i = 0; i < jsonObj.operands.lowerLimit.length; i++) {
                var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.lowerLimit[i].type);
                var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.lowerLimit[i], equation);
                bigOperatorWrapper.lowerLimitContainer.addWrappers([i, innerWrapper]);
            }
        }

        return bigOperatorWrapper;
    }
})();