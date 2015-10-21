eqEd.OperatorWrapper = function(equation, operatorSymbol, fontStyle) {
	eqEd.Wrapper.call(this, equation); // call super constructor.
	this.className = "eqEd.OperatorWrapper";

    this.operatorSymbol = operatorSymbol;
    this.operator = new eqEd.Symbol(this, operatorSymbol, fontStyle);
	this.domObj = this.buildDomObj();
	this.domObj.append(this.operator.domObj);
	this.childNoncontainers = [this.operator];

    // Set up the isUnary calculation
    var isUnary = false;
    this.properties.push(new Property(this, "isUnary", isUnary, {
        get: function() {
            return isUnary;
        },
        set: function(value) {
            isUnary = value;
        },
        compute: function() {
            var isUnaryVal = false;
            var i = this.index;
            if ((i === 0 || this.parent.wrappers[i-1] instanceof eqEd.OperatorWrapper || (this.parent.wrappers[i-1] instanceof eqEd.BracketWrapper && this.parent.wrappers[i-1].bracket instanceof eqEd.LeftBracket))
                && (this.operator.character === "+" || this.operator.character === "−")) {
                    isUnaryVal = true;
            }
            return isUnaryVal;
        },
        updateDom: function() {}
    }));

    // Set up the isComparison calculation
    var isComparison = false;
    this.properties.push(new Property(this, "isComparison", isComparison, {
        get: function() {
            return isComparison;
        },
        set: function(value) {
            isComparison = value;
        },
        compute: function() {
            var isComparisonVal = false;
            if (this.operator.character === "="
                       || this.operator.character === "<"
                       || this.operator.character === ">"
                       || this.operator.character === "≤"
                       || this.operator.character === "≥"
                       || this.operator.character === "≈"
                       || this.operator.character === "≡"
                       || this.operator.character === "≅"
                       || this.operator.character === "≠"
                       || this.operator.character === "∼"
                       || this.operator.character === "∝"
                       || this.operator.character === "≺"
                       || this.operator.character === "⪯"
                       || this.operator.character === "⊂"
                       || this.operator.character === "⊆"
                       || this.operator.character === "≻"
                       || this.operator.character === "⪰") {
                isComparisonVal = true;
            }
            return isComparisonVal;
        },
        updateDom: function() {}
    }));

    // Set up the padLeft calculation
    var padLeft = false;
    this.properties.push(new Property(this, "padLeft", padLeft, {
        get: function() {
            return padLeft;
        },
        set: function(value) {
            padLeft = value;
        },
        compute: function() {
            var padLeftVal = 0.15;
            if (this.isComparison) {
                padLeftVal = 0.2;
            } else if (this.isUnary && this.index === 0) {
                padLeftVal = 0;
            }
            return padLeftVal;
        },
        updateDom: function() {}
    }));

    // Set up the padRight calculation
    var padRight = false;
    this.properties.push(new Property(this, "padRight", padRight, {
        get: function() {
            return padRight;
        },
        set: function(value) {
            padRight = value;
        },
        compute: function() {
            var padRightVal = 0;
            if (this.isUnary) {
                padRightVal = 0;
            } else {
                if (this.isComparison) {
                    padRightVal = 0.2;
                } else {
                    padRightVal = 0.15;
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
            return this.operator.width;
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
            return 0.62 * this.operator.height;
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
            return 0.38 * this.operator.height;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.OperatorWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.OperatorWrapper.prototype.constructor = eqEd.OperatorWrapper;
    eqEd.OperatorWrapper.prototype.clone = function() {
    	return new this.constructor(this.equation, this.operatorSymbol, this.operator.fontStyle);
    };
    eqEd.OperatorWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="eqEdWrapper operatorWrapper"></div>')
    };
    eqEd.OperatorWrapper.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: this.className.substring(5, this.className.length - 7),
            value: this.operator.character,
            operands: null
        };
        return jsonObj;
    };
    eqEd.OperatorWrapper.constructFromJsonObj = function(jsonObj, equation) {
      var operatorWrapper = new eqEd.OperatorWrapper(equation, jsonObj.value, "MathJax_Main");
      return operatorWrapper;
    }
})();