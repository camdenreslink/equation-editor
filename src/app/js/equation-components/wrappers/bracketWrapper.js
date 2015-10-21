eqEd.BracketWrapper = function(equation, bracketType) {
	eqEd.Wrapper.call(this, equation); // call super constructor.
	this.className = "eqEd.BracketWrapper";

    this.bracketType = bracketType;
    var bracketCtors = {
        "leftParenthesisBracket": eqEd.LeftParenthesisBracket,
        "rightParenthesisBracket": eqEd.RightParenthesisBracket,
        "leftSquareBracket": eqEd.LeftSquareBracket,
        "rightSquareBracket": eqEd.RightSquareBracket,
        "leftCurlyBracket": eqEd.LeftCurlyBracket,
        "rightCurlyBracket": eqEd.RightCurlyBracket,
        "leftAngleBracket": eqEd.LeftAngleBracket,
        "rightAngleBracket": eqEd.RightAngleBracket,
        "leftFloorBracket": eqEd.LeftFloorBracket,
        "rightFloorBracket": eqEd.RightFloorBracket,
        "leftCeilBracket": eqEd.LeftCeilBracket,
        "rightCeilBracket": eqEd.RightCeilBracket
    };

    this.domObj = this.buildDomObj();

    this.bracket = new bracketCtors[bracketType](this);
    this.domObj.append(this.bracket.domObj);

    this.childNoncontainers = [this.bracket];

    this.padTop = 0.05;
    this.padBottom = 0.15;

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
            return this.bracket.width;
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
            var topAlignVal = 0;
            
            if (this.bracket.heightRatio <= 1.5) {
                topAlignVal = 0.525 * this.bracket.height;
            } else {
                topAlignVal = 0.5 * this.bracket.height;
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
            
            if (this.bracket.heightRatio <= 1.5) {
                bottomAlignVal = 0.475 * this.bracket.height;
            } else {
                bottomAlignVal = 0.5 * this.bracket.height;
            }
            
            return bottomAlignVal;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.BracketWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.BracketWrapper.prototype.constructor = eqEd.BracketWrapper;
    eqEd.BracketWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="eqEdWrapper bracketWrapper ' + this.bracketType + '"></div>')
    };
    eqEd.BracketWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.equation, this.bracketType);
        return copy;
    };
    eqEd.BracketWrapper.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: this.className.substring(5, this.className.length - 7),
            value: this.bracketType,
            operands: null
        };
        return jsonObj;
    };
    eqEd.BracketWrapper.constructFromJsonObj = function(jsonObj, equation) {
      var bracketWrapper = new eqEd.BracketWrapper(equation, jsonObj.value);
      return bracketWrapper;
    }
})();