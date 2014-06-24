eqEd.FunctionLowerWrapper = function(characters, fontStyle, symbolSizeConfig) {
    eqEd.FunctionWrapper.call(this, characters, fontStyle, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.FunctionLowerWrapper";

    // topAlign, bottomAlign, width has already been added to 
    // properties in superclass needs removed to be overriden
    for(var i = 0; i < this.properties.length; i++) {
        if (this.properties[i].propName === "topAlign"
            || this.properties[i].propName === "bottomAlign"
            || this.properties[i].propName === "width") {
            this.properties.splice(i, 1);
        }
    }

    this.belowFunctionGap = -0.075;

    this.functionWord = new eqEd.FunctionLowerWord(characters, fontStyle, symbolSizeConfig);
    this.functionLowerContainer = new eqEd.FunctionLowerContainer(symbolSizeConfig);
    this.functionWord.parent = this;
    this.functionLowerContainer.parent = this;
    this.domObj = this.buildDomObj();
    this.domObj.append(this.functionWord.domObj);
    this.domObj.append(this.functionLowerContainer.domObj);
    
    this.childNoncontainers = [this.functionWord];
    this.childContainers = [this.functionLowerContainer];

    this.padLeft = 0;
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
            var topWidth = this.functionWord.width;
            widthVal = (topWidth > this.functionLowerContainer.width) ? topWidth : this.functionLowerContainer.width;
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
            var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
            return 0.5 * this.functionWord.height + this.belowFunctionGap * fontHeight + this.functionLowerContainer.height;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.FunctionLowerWrapper.prototype = Object.create(eqEd.FunctionWrapper.prototype);
    eqEd.FunctionLowerWrapper.prototype.constructor = eqEd.FunctionLowerWrapper;
    eqEd.FunctionLowerWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="eqEdWrapper functionLowerWrapper"></div>')
    }
    eqEd.FunctionLowerWrapper.prototype.clone = function() {
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
    }
})();