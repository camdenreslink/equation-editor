eqEd.FunctionWrapper = function(equation, functionCharacters, fontStyle) {
	eqEd.Wrapper.call(this, equation); // call super constructor.
	this.className = "eqEd.FunctionWrapper";

    this.word = new eqEd.FunctionWord(this, functionCharacters, fontStyle);
	this.domObj = this.buildDomObj();
	this.domObj.append(this.word.domObj);
	this.childNoncontainers = [this.word];

    this.padLeft = 0.1;

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
            var padRightVal = 0.175;
            if (this.index !== this.parent.wrappers.length - 1) { 
                if (this.parent.wrappers[this.index + 1] instanceof eqEd.SuperscriptWrapper
                    || this.parent.wrappers[this.index + 1] instanceof eqEd.SubscriptWrapper) {
                    padRightVal = 0;
                } else if (this.parent.wrappers[this.index + 1] instanceof eqEd.BracketWrapper
                    || this.parent.wrappers[this.index + 1] instanceof eqEd.BracketPairWrapper) {
                    padRightVal = 0.05;
                }
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
            return this.word.width;
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
            return 0.5 * this.word.height;
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
            return 0.5 * this.word.height;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.FunctionWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.FunctionWrapper.prototype.constructor = eqEd.FunctionWrapper;
    eqEd.FunctionWrapper.prototype.clone = function() {
    	return new this.constructor(this.equation, this.word.characters.join(""), this.word.fontStyle);
    };
    eqEd.FunctionWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="eqEdWrapper symbolWrapper"></div>')
    };
    eqEd.FunctionWrapper.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: this.className.substring(5, this.className.length - 7),
            value: this.word.characters.join(""),
            operands: null
        };
        return jsonObj;
    };
    eqEd.FunctionWrapper.constructFromJsonObj = function(jsonObj, equation) {
      var functionWrapper = new eqEd.FunctionWrapper(equation, jsonObj.value, "MathJax_Main");
      return functionWrapper;
    }
})();