eqEd.LeftBracketWrapper = function(operatorSymbol, fontStyle, symbolSizeConfig) {
	eqEd.Wrapper.call(this, symbolSizeConfig); // call super constructor.
	this.className = "eqEd.OperatorWrapper";

    this.operatorSymbol = operatorSymbol;
    this.operatorList = {"addition": "+", "subtraction": "&#x2212;", "dotProduct": "&#x22c5;", "equal": "=", 'lessThan': "&#60;", 'greaterThan': "&#62;", 'lessThanOrEqualTo': "&#x2264;", 'greaterThanOrEqualTo': "&#x2265;", 'division': "&#x00f7;"};
    this.operator = new eqEd.Symbol(this.operatorList[operatorSymbol], fontStyle, symbolSizeConfig);
    this.operator.parent = this;
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
            var isUnaryVal = true;
            var i = this.index;
            if ((i === 0 || this.parent.wrappers[i-1] instanceof eqEd.OperatorWrapper || this.parent.wrappers[i-1] instanceof eqEd.LeftBracketWrapper)
                && (this.operator.character === "+" || this.operator.character === "&#x2212;")) {
                    isUnaryVal = false;
            }
            return this.operator.width;
        },
        updateDom: function() {}
    }));

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
                       || this.operator.character === "&#60;"
                       || this.operator.character === "&#62;"
                       || this.operator.character === "&#x2264;"
                       || this.operator.character === "&#x2265;") {
                isComparisonVal = true;
            }
            return isComparisonVal;
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
            return 0.5 * this.operator.height;
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
            return 0.5 * this.operator.height;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.LeftBracketWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.LeftBracketWrapper.prototype.constructor = eqEd.LeftBracketWrapper;
    eqEd.LeftBracketWrapper.prototype.clone = function() {
    	return new this.constructor(this.operatorSymbol, this.operator.fontStyle, this.symbolSizeConfig);
    };
    eqEd.LeftBracketWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="wrapper operatorWrapper"></div>')
    };
})();