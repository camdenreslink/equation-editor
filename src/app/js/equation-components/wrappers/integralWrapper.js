eqEd.IntegralWrapper = function(equation, isInline, hasUpperLimit, hasLowerLimit, integralType) {
    eqEd.Wrapper.call(this, equation); // call super constructor.
    this.className = "eqEd.IntegralWrapper";

    this.isInline = isInline;
    this.hasUpperLimit = hasUpperLimit;
    this.hasLowerLimit = hasLowerLimit;
    this.integralType = integralType;

    this.upperLimitGap = 0.1;
    this.lowerLimitGap = 0.2;

    this.inlineUpperLimitOverlap = 0.25;
    this.inlineLowerLimitOverlap = 0.25;
    this.inlineLimitGap = 0.15;

    this.numIntegrals = 0;
    if (this.integralType === "single"
        || this.integralType === "singleContour") {
        this.numIntegrals = 1;
    } else if (this.integralType === "double"
        || this.integralType === "doubleContour") {
        this.numIntegrals = 2;
    } else if (this.integralType === "triple"
        || this.integralType === "tripleContour") {
        this.numIntegrals = 3;
    }

    this.integralSymbolCtors = {
        'single': eqEd.IntegralSymbol,
        'double': eqEd.DoubleIntegralSymbol,
        'triple': eqEd.TripleIntegralSymbol,
        'singleContour': eqEd.ContourIntegralSymbol,
        'doubleContour': eqEd.ContourDoubleIntegralSymbol,
        'tripleContour': eqEd.ContourTripleIntegralSymbol
    }

    this.domObj = this.buildDomObj();
    this.childContainers = [];

    if (this.hasUpperLimit) {
        this.upperLimitContainer = new eqEd.IntegralUpperLimitContainer(this);
        this.domObj.append(this.upperLimitContainer.domObj);
        this.childContainers.push(this.upperLimitContainer);
    }
    if (this.hasLowerLimit) {
        this.lowerLimitContainer = new eqEd.IntegralLowerLimitContainer(this);
        this.domObj.append(this.lowerLimitContainer.domObj);
        this.childContainers.push(this.lowerLimitContainer)
    }
    
    this.symbol = new this.integralSymbolCtors[this.integralType](this);
    this.domObj.append(this.symbol.domObj);
    
    this.childNoncontainers = [this.symbol];

    this.padLeft = 0.15;
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
                    maxWidthList.push(this.lowerLimitContainer.width - this.lowerLimitContainer.inlineLeftOverlap * fontHeight);
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
                        topAlignVal = (0.5 - this.inlineUpperLimitOverlap) * this.symbol.height + this.upperLimitContainer.height;
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
                        bottomAlignVal = (0.5 - this.inlineLowerLimitOverlap) * this.symbol.height + this.lowerLimitContainer.height;
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
    eqEd.IntegralWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.IntegralWrapper.prototype.constructor = eqEd.IntegralWrapper;
    eqEd.IntegralWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="eqEdWrapper integralWrapper"></div>')
    };
    eqEd.IntegralWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.equation, this.isInline, this.hasUpperLimit, this.hasLowerLimit, this.integralType);

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

        copy.symbol = new copy.integralSymbolCtors[copy.integralType](copy);
        copy.domObj.append(copy.symbol.domObj);
        copy.childNoncontainers = [copy.symbol];
        return copy;
    };
    eqEd.IntegralWrapper.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: this.className.substring(5, this.className.length - 7),
            value: this.integralType
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

    eqEd.IntegralWrapper.constructFromJsonObj = function(jsonObj, equation) {
        var hasUpperLimit = (jsonObj.operands !== null && typeof jsonObj.operands.upperLimit !== "undefined");
        var hasLowerLimit = (jsonObj.operands !== null && typeof jsonObj.operands.lowerLimit !== "undefined");
        var integralWrapper = new eqEd.IntegralWrapper(equation, true, hasUpperLimit, hasLowerLimit, jsonObj.value);
        if (hasUpperLimit) {
            for (var i = 0; i < jsonObj.operands.upperLimit.length; i++) {
                var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.upperLimit[i].type);
                var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.upperLimit[i], equation);
                integralWrapper.upperLimitContainer.addWrappers([i, innerWrapper]);
            }
        }
        if (hasLowerLimit) {
            for (var i = 0; i < jsonObj.operands.lowerLimit.length; i++) {
                var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.lowerLimit[i].type);
                var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.lowerLimit[i], equation);
                integralWrapper.lowerLimitContainer.addWrappers([i, innerWrapper]);
            }
        }

        return integralWrapper;
    }
})();