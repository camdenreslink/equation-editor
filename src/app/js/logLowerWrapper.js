eqEd.LogLowerWrapper = function(symbolSizeConfig) {
    eqEd.FunctionWrapper.call(this, 'log', 'MathJax_Main', symbolSizeConfig); // call super constructor.
    this.className = "eqEd.LogLowerWrapper";

    // topAlign, bottomAlign, width has already been added to 
    // properties in superclass needs removed to be overriden
    for(var i = 0; i < this.properties.length; i++) {
        if (this.properties[i].propName === "topAlign"
            || this.properties[i].propName === "bottomAlign"
            || this.properties[i].propName === "width") {
            this.properties.splice(i, 1);
        }
    }

    this.logLowerOverlap = 0.75;

    this.functionWord = new eqEd.LogLowerWord(symbolSizeConfig);
    this.functionLowerContainer = new eqEd.LogLowerContainer(symbolSizeConfig);
    this.functionWord.parent = this;
    this.functionLowerContainer.parent = this;
    this.domObj = this.buildDomObj();
    this.domObj.append(this.functionWord.domObj);
    this.domObj.append(this.functionLowerContainer.domObj);
    
    this.childNoncontainers = [this.functionWord];
    this.childContainers = [this.functionLowerContainer];

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
            return this.functionWord.width + this.functionLowerContainer.width;
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
            return 0.5 * this.functionWord.height;
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
            var fontHeightNested = this.symbolSizeConfig.height[this.functionLowerContainer.fontSize];
            return this.functionWord.height - this.logLowerOverlap * fontHeightNested + this.functionLowerContainer.height - this.topAlign;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.LogLowerWrapper.prototype = Object.create(eqEd.FunctionWrapper.prototype);
    eqEd.LogLowerWrapper.prototype.constructor = eqEd.LogLowerWrapper;
    eqEd.LogLowerWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="eqEdWrapper logLowerWrapper"></div>')
    };
    eqEd.LogLowerWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.symbolSizeConfig);
        copy.functionWord = new eqEd.FunctionWord(characters, fontStyle, symbolSizeConfig);
        copy.functionLowerContainer = this.functionLowerContainer.clone();
        copy.functionWord.parent = copy;
        copy.functionLowerContainer.parent = copy;
        copy.domObj = copy.buildDomObj();
        copy.domObj.append(copy.functionWord.domObj);
        copy.domObj.append(copy.functionLowerContainer.domObj);
        
        copy.childNoncontainers = [copy.functionWord];
        copy.childContainers = [copy.functionLowerContainer];

        return copy;
    };
    eqEd.LogLowerWrapper.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: this.className.substring(5, this.className.length - 7),
            value: null,
            operands: {
                lower: this.functionLowerContainer.buildJsonObj()
            }
        };
        return jsonObj;
    };
})();