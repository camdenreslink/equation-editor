eqEd.FunctionLowerWrapper = function(equation, characters, fontStyle) {
    eqEd.FunctionWrapper.call(this, equation, characters, fontStyle); // call super constructor.
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

    this.functionWord = new eqEd.FunctionLowerWord(this, characters, fontStyle);
    this.functionLowerContainer = new eqEd.FunctionLowerContainer(this);
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
            var fontHeight = this.equation.fontMetrics.height[this.parent.fontSize];
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
            var fontHeight = this.equation.fontMetrics.height[this.parent.fontSize];
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
        var copy = new this.constructor(this.equation, this.word.characters.join(""), this.word.fontStyle);
        copy.functionLowerContainer = this.functionLowerContainer.clone();
        copy.functionLowerContainer.parent = copy;
        copy.domObj = copy.buildDomObj();
        copy.domObj.append(copy.word.domObj);
        copy.domObj.append(copy.functionLowerContainer.domObj);
        
        copy.childNoncontainers = [copy.word];
        copy.childContainers = [copy.functionLowerContainer];

        return copy;
    }
    eqEd.FunctionLowerWrapper.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: this.className.substring(5, this.className.length - 7),
            value: this.functionWord.characters.join(""),
            operands: {
                lower: this.functionLowerContainer.buildJsonObj()
            }
        };
        return jsonObj;
    };
    eqEd.FunctionLowerWrapper.constructFromJsonObj = function(jsonObj, equation) {
      var functionLowerWrapper = new eqEd.FunctionLowerWrapper(equation, jsonObj.value, "MathJax_Main");
      for (var i = 0; i < jsonObj.operands.lower.length; i++) {
        var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.lower[i].type);
        var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.lower[i], equation);
        functionLowerWrapper.functionLowerContainer.addWrappers([i, innerWrapper]);
      }
      return functionLowerWrapper;
    };
})();