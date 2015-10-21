eqEd.BracketPairWrapper = function(equation, bracketType) {
    eqEd.Wrapper.call(this, equation); // call super constructor.
    this.className = "eqEd.BracketPairWrapper";

    this.bracketType = bracketType;
    var bracketCtors = {
        "parenthesisBracket": {
            'left': eqEd.LeftParenthesisBracket,
            'right': eqEd.RightParenthesisBracket
        },
        "squareBracket": {
            'left': eqEd.LeftSquareBracket,
            'right': eqEd.RightSquareBracket
        },
        "curlyBracket": {
            'left': eqEd.LeftCurlyBracket,
            'right': eqEd.RightCurlyBracket
        },
        "angleBracket": {
            'left': eqEd.LeftAngleBracket,
            'right': eqEd.RightAngleBracket
        },
        "floorBracket": {
            'left': eqEd.LeftFloorBracket,
            'right': eqEd.RightFloorBracket
        },
        "ceilBracket": {
            'left': eqEd.LeftCeilBracket,
            'right': eqEd.RightCeilBracket
        },
        "absValBracket": {
            'left': eqEd.LeftAbsValBracket,
            'right': eqEd.RightAbsValBracket
        },
        "normBracket": {
            'left': eqEd.LeftNormBracket,
            'right': eqEd.RightNormBracket
        }
    };

    this.leftBracket = new bracketCtors[bracketType]['left'](this);
    this.bracketContainer = new eqEd.BracketContainer(this);
    this.rightBracket = new bracketCtors[bracketType]['right'](this);
    this.domObj = this.buildDomObj();
    this.domObj.append(this.leftBracket.domObj);
    this.domObj.append(this.bracketContainer.domObj);
    this.domObj.append(this.rightBracket.domObj);
    
    this.childContainers = [this.bracketContainer];
    this.childNoncontainers = [this.leftBracket, this.rightBracket];

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
            return this.leftBracket.width + this.bracketContainer.width + this.rightBracket.width;
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
            if (this.bracketContainer.wrappers.length > 0) {
                var containerTopAlign = this.bracketContainer.wrappers[this.bracketContainer.maxTopAlignIndex].topAlign;
                var bracketTopAlign = 0.5 * this.leftBracket.height;
                if (bracketTopAlign < containerTopAlign) {
                    topAlignVal = containerTopAlign;
                } else {
                    topAlignVal = bracketTopAlign;
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
            if (this.bracketContainer.wrappers.length > 0) {
                var containerBottomAlign = this.bracketContainer.wrappers[this.bracketContainer.maxBottomAlignIndex].bottomAlign;
                var bracketBottomAlign = 0.5 * this.leftBracket.height;
                if (bracketBottomAlign < containerBottomAlign) {
                    bottomAlignVal = containerBottomAlign;
                } else {
                    bottomAlignVal = bracketBottomAlign;
                }
            }
            return bottomAlignVal;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.BracketPairWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.BracketPairWrapper.prototype.constructor = eqEd.BracketPairWrapper;
    eqEd.BracketPairWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="eqEdwrapper bracketPairWrapper ' + this.bracketType + '"></div>')
    };
    eqEd.BracketPairWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.equation, this.bracketType);

        copy.leftBracket = this.leftBracket.clone();
        copy.bracketContainer = this.bracketContainer.clone();
        copy.rightBracket = this.rightBracket.clone();
        copy.leftBracket.parent = copy;
        copy.bracketContainer.parent = copy;
        copy.rightBracket.parent = copy;
        copy.domObj = copy.buildDomObj();
        copy.domObj.append(copy.leftBracket.domObj);
        copy.domObj.append(copy.bracketContainer.domObj);
        copy.domObj.append(copy.rightBracket.domObj);
        
        copy.childNoncontainers = [copy.leftBracket, copy.rightBracket];
        copy.childContainers = [copy.bracketContainer];

        return copy;
    };
    eqEd.BracketPairWrapper.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: this.className.substring(5, this.className.length - 7),
            value: this.bracketType,
            operands: {
                bracketedExpression: this.bracketContainer.buildJsonObj()
            }
        };
        return jsonObj;
    };

    eqEd.BracketPairWrapper.constructFromJsonObj = function(jsonObj, equation) {
      var bracketPairWrapper = new eqEd.BracketPairWrapper(equation, jsonObj.value);
      for (var i = 0; i < jsonObj.operands.bracketedExpression.length; i++) {
        var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.bracketedExpression[i].type);
        var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.bracketedExpression[i], equation);
        bracketPairWrapper.bracketContainer.addWrappers([i, innerWrapper]);
      }
      return bracketPairWrapper;
    }
})();