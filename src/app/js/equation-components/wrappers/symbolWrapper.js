eqEd.SymbolWrapper = function(equation, character, fontStyle) {
	eqEd.Wrapper.call(this, equation); // call super constructor.
	this.className = "eqEd.SymbolWrapper";

    this.symbol = new eqEd.Symbol(this, character, fontStyle);
	this.domObj = this.buildDomObj();
	this.domObj.append(this.symbol.domObj);
	this.childNoncontainers = [this.symbol];

    

    // Set up the isDifferential calculation
    var isDifferential = 0;
    this.properties.push(new Property(this, "isDifferential", isDifferential, {
        get: function() {
            return isDifferential;
        },
        set: function(value) {
            isDifferential = value;
        },
        compute: function() {
            var isDifferentialVal = false;
            if (this.symbol.character === 'd') {
                if (this.index !== (this.parent.wrappers.length - 1) 
                    && this.parent.wrappers[this.index + 1] instanceof eqEd.SymbolWrapper
                    && this.parent.wrappers[this.index + 1].symbol.character !== 'd') {
                    var integralCount = 0;
                    var differentialCount = 0;
                    for (var i = 0; i < this.index; i++) {
                        var wrapper = this.parent.wrappers[i];
                        if (wrapper instanceof eqEd.IntegralWrapper) {
                            integralCount += wrapper.numIntegrals;
                        } else if (wrapper instanceof eqEd.SymbolWrapper 
                                    && wrapper.symbol.character === 'd'
                                    && this.parent.wrappers[i + 1] instanceof eqEd.SymbolWrapper
                                    && this.parent.wrappers[i + 1].symbol.character !== 'd') {
                                differentialCount++;
                        }
                    }
                    if (integralCount > differentialCount) {
                        isDifferentialVal = true;
                    }
                }
            }
            return isDifferentialVal;
        },
        updateDom: function() {}
    }));

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
            // Special padding logic for differentials after integrals.
            if (this.isDifferential) {
                padLeftVal = 0.15;
            }
            if (this.index === 0) {
                //padLeftVal += 0.1;
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
            var padRightVal = 0;
            // Special padding logic for differentials after integrals.
            if (this.index !== 0 && this.parent.wrappers[this.index - 1].isDifferential) {
                // At zero for now, but could add padding after differential if I wanted to here.
                padRightVal += 0;
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
            return this.symbol.width;
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
            return 0.60 * this.symbol.height;
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
            return 0.40 * this.symbol.height;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.SymbolWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.SymbolWrapper.prototype.constructor = eqEd.SymbolWrapper;
    eqEd.SymbolWrapper.prototype.clone = function() {
    	return new this.constructor(this.equation, this.symbol.character, this.symbol.fontStyle);
    };
    eqEd.SymbolWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="eqEdWrapper symbolWrapper"></div>');
    };
    eqEd.SymbolWrapper.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: this.className.substring(5, this.className.length - 7),
            value: this.symbol.character,
            operands: null
        };
        return jsonObj;
    };
    eqEd.SymbolWrapper.constructFromJsonObj = function(jsonObj, equation) {
        var fontStyle = "";
        if (_.indexOf(equation.fontMetrics.MathJax_MathItalic, jsonObj.value) !== -1) {
            fontStyle = "MathJax_MathItalic";
        } else if (_.indexOf(equation.fontMetrics.MathJax_Main, jsonObj.value) !== -1) {
            fontStyle = "MathJax_Main";
        } else if (_.indexOf(equation.fontMetrics.MathJax_MainItalic, jsonObj.value) !== -1) {
            fontStyle = "MathJax_MainItalic";
        }
        var symbolWrapper = new eqEd.SymbolWrapper(equation, jsonObj.value, fontStyle);
        return symbolWrapper;
    }
})();