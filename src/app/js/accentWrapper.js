eqEd.AccentWrapper = function(character, fontStyle, symbolSizeConfig) {
    eqEd.Wrapper.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.AccentWrapper";

    this.character = character;
    this.fontStyle = fontStyle;

    this.accentSymbol = new eqEd.AccentSymbol(character, fontStyle, symbolSizeConfig);
    this.accentContainer = new eqEd.AccentContainer(symbolSizeConfig);
    this.accentSymbol.parent = this;
    this.accentContainer.parent = this;
    this.domObj = this.buildDomObj();
    this.domObj.append(this.accentSymbol.domObj);
    this.domObj.append(this.accentContainer.domObj);
    
    this.childNoncontainers = [this.accentSymbol];
    this.childContainers = [this.accentContainer];

    // Set up the width calculation
    var accentGap = 0;
    this.properties.push(new Property(this, "accentGap", accentGap, {
        get: function() {
            return accentGap;
        },
        set: function(value) {
            accentGap = value;
        },
        compute: function() {
            var accentGapVal = 0;
            if (this.accentContainer.wrappers.length > 0) {
                if (this.accentContainer.wrappers[0] instanceof eqEd.SquareEmptyContainerWrapper) {
                    accentGapVal = 0.25;
                } else {
                    accentGapVal = -0.04;
                }
            }
            return accentGapVal;
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
            return this.accentContainer.width;
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
            var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
            var topAlignVal = 0;
            if (this.accentContainer.wrappers.length > 0) {
                if (this.accentGap > 0) {
                    topAlignVal = this.accentContainer.wrappers[this.accentContainer.maxTopAlignIndex].topAlign + this.accentGap * fontHeight;
                } else {
                    topAlignVal = this.accentContainer.wrappers[this.accentContainer.maxTopAlignIndex].topAlign;
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
            if (this.accentContainer.wrappers.length > 0) {
                bottomAlignVal = this.accentContainer.wrappers[this.accentContainer.maxBottomAlignIndex].bottomAlign;
            }
            return bottomAlignVal;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.AccentWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.AccentWrapper.prototype.constructor = eqEd.AccentWrapper;
    eqEd.AccentWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="wrapper accentWrapper"></div>')
    }
    eqEd.AccentWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.character, this.fontStyle, this.symbolSizeConfig);
        copy.accentSymbol = new eqEd.AccentSymbol(this.character, this.fontStyle, this.symbolSizeConfig);
        copy.accentContainer = this.accentContainer.clone();
        copy.accentSymbol.parent = copy;
        copy.accentContainer.parent = copy;
        copy.domObj = copy.buildDomObj();
        copy.domObj.append(copy.accentSymbol.domObj);
        copy.domObj.append(copy.accentContainer.domObj);
        
        copy.childNoncontainers = [copy.accentSymbol];
        copy.childContainers = [copy.accentContainer];

        return copy;
    }
})();