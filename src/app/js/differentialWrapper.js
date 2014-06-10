eqEd.DifferentialWrapper = function(isPartial ,symbolSizeConfig) {
    eqEd.Wrapper.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.DifferentialWrapper";

    this.isPartial = isPartial;
    this.differentialGap = 0;

    this.differentialVariableContainer = new eqEd.DifferentialVariableContainer(symbolSizeConfig);
    this.differentialSymbol = (!this.isPartial) ? new eqEd.Symbol('d', "MathJax_MathItalic", symbolSizeConfig) : new eqEd.Symbol('&#8706;', "MathJax_Main", symbolSizeConfig);
    this.differentialVariableContainer.parent = this;
    this.differentialSymbol.parent = this;
    this.domObj = this.buildDomObj();
    this.domObj.append(this.differentialVariableContainer.domObj);
    this.domObj.append(this.differentialSymbol.domObj);
    
    this.childNoncontainers = [this.differentialSymbol];
    this.childContainers = [this.differentialVariableContainer];

    // Set up the padLeft calculation
    var padLeft = 0;
    this.properties.push(new Property(this, "padLeft", padLeft, {
        get: function() {
            return padLeft;
        },
        set: function(value) {
            padLeft = value;
        },
        compute: function() {
            var padLeftVal = 0;
            if (this.index !== 0) {
                padLeftVal = 0.15;
            }
            return padLeftVal;
        },
        updateDom: function() {}
    }));

    // Set up the padRight calculation
    var padRight = 0;
    this.properties.push(new Property(this, "padRight", padRight, {
        get: function() {
            return padRight;
        },
        set: function(value) {
            padRight = value;
        },
        compute: function() {
            var padRightVal = 0.05;
            if (this.index !== 0) {
                padRightVal = 0.1;
            }
            return padRightVal;
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
            var widthVal = this.differentialSymbol.width + this.differentialGap * fontHeight + this.differentialVariableContainer.width;
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
            return 0.5 * this.differentialSymbol.height;
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
            return 0.5 * this.differentialSymbol.height;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.DifferentialWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.DifferentialWrapper.prototype.constructor = eqEd.DifferentialWrapper;
    eqEd.DifferentialWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="wrapper differentialWrapper"></div>')
    }
    eqEd.DifferentialWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.isPartial, this.symbolSizeConfig);
        copy.differentialVariableContainer = this.differentialVariableContainer.clone();
        copy.differentialSymbol = (!this.isPartial) ? new eqEd.Symbol('d', "MathJax_MathItalic", this.symbolSizeConfig) : new eqEd.Symbol('&#8706;', "MathJax_Main", this.symbolSizeConfig);
        copy.differentialVariableContainer.parent = copy;
        copy.differentialSymbol.parent = copy;
        copy.domObj = copy.buildDomObj();
        copy.domObj.append(copy.differentialVariableContainer.domObj);
        copy.domObj.append(copy.differentialSymbol.domObj);
        
        copy.childNoncontainers = [copy.differentialSymbol];
        copy.childContainers = [copy.differentialVariableContainer];

        return copy;
    }
})();