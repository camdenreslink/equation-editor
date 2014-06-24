eqEd.LimitWrapper = function(symbolSizeConfig) {
    eqEd.FunctionWrapper.call(this, 'lim', 'MathJax_Main', symbolSizeConfig); // call super constructor.
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

    this.limitWord = new eqEd.LimitWord(symbolSizeConfig);
    this.limitLeftContainer = new eqEd.LimitLeftContainer(symbolSizeConfig);
    this.limitRightContainer = new eqEd.LimitRightContainer(symbolSizeConfig);
    this.symbol = new eqEd.LimitSymbol(symbolSizeConfig);
    this.limitWord.parent = this;
    this.limitLeftContainer.parent = this;
    this.limitRightContainer.parent = this;
    this.symbol.parent = this;
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
            var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
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
            var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
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
            var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
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
    }
    eqEd.LimitWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.symbolSizeConfig);
        copy.limitWord = new eqEd.LimitWord(this.symbolSizeConfig);
        copy.limitLeftContainer = this.limitLeftContainer.clone();
        copy.limitRightContainer = this.limitRightContainer.clone();
        copy.symbol = new eqEd.LimitSymbol(this.symbolSizeConfig);
        copy.limitWord.parent = copy;
        copy.limitLeftContainer.parent = copy;
        copy.limitRightContainer.parent = copy;
        copy.symbol.parent = copy;
        copy.domObj = copy.buildDomObj();
        copy.domObj.append(copy.limitWord.domObj);
        copy.domObj.append(copy.limitLeftContainer.domObj);
        copy.domObj.append(copy.limitRightContainer.domObj);
        copy.domObj.append(copy.symbol.domObj);
        
        copy.childNoncontainers = [copy.symbol, copy.limitWord];
        copy.childContainers = [copy.limitLeftContainer, copy.limitRightContainer];

        return copy;
    }
})();