eqEd.LimitWrapper = function(equation) {
    eqEd.FunctionWrapper.call(this, equation, 'lim', 'MathJax_Main'); // call super constructor.
    this.className = "eqEd.LimitWrapper";

    // topAlign, bottomAlign, width has already been added to 
    // properties in superclass needs removed to be overriden
    for(var i = 0; i < this.properties.length; i++) {
        if (this.properties[i].propName === "topAlign"
            || this.properties[i].propName === "bottomAlign"
            || this.properties[i].propName === "width") {
            this.properties.splice(i, 1);
        }
    }

    this.leftLimitContainerGap = 0;
    this.rightLimitContainerGap = 0;
    this.belowLimitGap = -0.18;

    this.limitWord = new eqEd.LimitWord(this);
    this.limitLeftContainer = new eqEd.LimitLeftContainer(this);
    this.limitRightContainer = new eqEd.LimitRightContainer(this);
    this.symbol = new eqEd.LimitSymbol(this);
    this.domObj = this.buildDomObj();
    this.domObj.append(this.limitWord.domObj);
    this.domObj.append(this.limitLeftContainer.domObj);
    this.domObj.append(this.limitRightContainer.domObj);
    this.domObj.append(this.symbol.domObj);
    
    this.childNoncontainers = [this.symbol, this.limitWord];
    this.childContainers = [this.limitLeftContainer, this.limitRightContainer];

    // Set up the bottomHalfWidth calculation
    var bottomHalfWidth = 0;
    this.properties.push(new Property(this, "bottomHalfWidth", bottomHalfWidth, {
        get: function() {
            return bottomHalfWidth;
        },
        set: function(value) {
            bottomHalfWidth = value;
        },
        compute: function() {
            var fontHeight = this.equation.fontMetrics.height[this.parent.fontSize];
            var bottomHalfWidthVal = this.limitLeftContainer.width + this.leftLimitContainerGap * fontHeight + this.symbol.width + this.rightLimitContainerGap * fontHeight + this.limitRightContainer.width;
            return bottomHalfWidthVal;
        },
        updateDom: function() {}
    }));

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
            var topWidth = this.limitWord.width;
            widthVal = (topWidth > this.bottomHalfWidth) ? topWidth : this.bottomHalfWidth;
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
            return 0.5 * this.limitWord.height;
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
            var bottomAlignVal = 0;
            var maxBottomHalfHeight = [this.symbol.height, this.limitLeftContainer.height, this.limitRightContainer.height].max();
            bottomAlignVal = 0.5 * this.limitWord.height + this.belowLimitGap * fontHeight + maxBottomHalfHeight;
            return bottomAlignVal;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.LimitWrapper.prototype = Object.create(eqEd.FunctionWrapper.prototype);
    eqEd.LimitWrapper.prototype.constructor = eqEd.LimitWrapper;
    eqEd.LimitWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="eqEdWrapper limitWrapper"></div>')
    };
    eqEd.LimitWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.equation);
        copy.limitWord = new eqEd.LimitWord(copy);
        copy.limitLeftContainer = this.limitLeftContainer.clone();
        copy.limitLeftContainer.parent = copy;
        copy.limitRightContainer = this.limitRightContainer.clone();
        copy.limitRightContainer.parent = copy;
        copy.symbol = new eqEd.LimitSymbol(copy);
        copy.domObj = copy.buildDomObj();
        copy.domObj.append(copy.limitWord.domObj);
        copy.domObj.append(copy.limitLeftContainer.domObj);
        copy.domObj.append(copy.limitRightContainer.domObj);
        copy.domObj.append(copy.symbol.domObj);
        
        copy.childNoncontainers = [copy.symbol, copy.limitWord];
        copy.childContainers = [copy.limitLeftContainer, copy.limitRightContainer];

        return copy;
    };
    eqEd.LimitWrapper.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: this.className.substring(5, this.className.length - 7),
            value: null,
            operands: {
                left: this.limitLeftContainer.buildJsonObj(),
                right: this.limitRightContainer.buildJsonObj()
            }
        };
        return jsonObj;
    };
    eqEd.LimitWrapper.constructFromJsonObj = function(jsonObj, equation) {
        var limitWrapper = new eqEd.LimitWrapper(equation);
        for (var i = 0; i < jsonObj.operands.left.length; i++) {
            var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.left[i].type);
            var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.left[i], equation);
            limitWrapper.limitLeftContainer.addWrappers([i, innerWrapper]);
        }
        for (var i = 0; i < jsonObj.operands.right.length; i++) {
            var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.right[i].type);
            var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.right[i], equation);
            limitWrapper.limitRightContainer.addWrappers([i, innerWrapper]);
        }
        return limitWrapper;
    };
})();