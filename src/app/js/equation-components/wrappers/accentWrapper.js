eqEd.AccentWrapper = function(equation, character, fontStyle) {
    eqEd.Wrapper.call(this, equation); // call super constructor.
    this.className = "eqEd.AccentWrapper";

    this.character = character;
    this.fontStyle = fontStyle;

    this.accentSymbol = new eqEd.AccentSymbol(this, character, fontStyle);
    this.accentContainer = new eqEd.AccentContainer(this);
    this.domObj = this.buildDomObj();
    this.domObj.append(this.accentSymbol.domObj);
    this.domObj.append(this.accentContainer.domObj);
    
    this.childNoncontainers = [this.accentSymbol];
    this.childContainers = [this.accentContainer];

    // Set up the width calculation
    var accentGap = 0;
    this.properties.push(new Property(this, "accentGap", accentGap, {
        get: function() {
            return accentGap;
        },
        set: function(value) {
            accentGap = value;
        },
        compute: function() {
            var accentGapVal = 0.25;
            if (this.accentContainerCharacter !== "") {
                if (this.equation.fontMetrics.shortCharacters.contains(this.accentContainerCharacter)) {
                    accentGapVal = -0.02;
                } else if (this.equation.fontMetrics.mediumCharacters.contains(this.accentContainerCharacter)) {
                    accentGapVal = 0.135;
                } else if (this.equation.fontMetrics.tallCharacters.contains(this.accentContainerCharacter)) {
                    accentGapVal = 0.22;
                }
            }
            return accentGapVal;
        },
        updateDom: function() {}
    }));

    var accentContainerCharacter = ""
    // Set up the accentContainerCharacter calculation
    var accentContainerCharacter = 0;
    this.properties.push(new Property(this, "accentContainerCharacter", accentContainerCharacter, {
        get: function() {
            return accentContainerCharacter;
        },
        set: function(value) {
            accentContainerCharacter = value;
        },
        compute: function() {
            var accentContainerCharacterVal = "";
            if (this.accentContainer.wrappers.length > 0) {
                if (this.accentContainer.wrappers.length === 1) {
                    if (this.accentContainer.wrappers[0] instanceof eqEd.SymbolWrapper) {
                        // replace i/j with imath/jmath if hat accent.
                        if (this.accentSymbol.character === '^') {
                            var symbol = this.accentContainer.wrappers[0].symbol;
                            if (symbol.character === 'i') {
                                symbol.character = 'ı';
                                symbol.fontStyle = 'MathJax_MainItalic';
                                symbol.domObj = symbol.buildDomObj();
                                symbol.parent.domObj.empty();
                                symbol.parent.domObj.append(symbol.domObj);
                            } else if (symbol.character === 'j') {
                                symbol.character = 'ȷ';
                                symbol.fontStyle = 'MathJax_MainItalic';
                                symbol.domObj = symbol.buildDomObj();
                                symbol.parent.domObj.empty();
                                symbol.parent.domObj.append(symbol.domObj);
                            }
                        }
                        accentContainerCharacterVal = this.accentContainer.wrappers[0].symbol.character;
                    } else if (this.accentContainer.wrappers[0] instanceof eqEd.SquareEmptyContainerWrapper) {
                        accentContainerCharacterVal = "squareEmptyContainerWrapper";
                    }
                } else {
                    accentContainerCharacterVal = "multipleWrappers";
                }
            }
            return accentContainerCharacterVal;
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
            var containerWidth = this.accentContainer.width;
            return containerWidth;
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
            var fontHeight = this.equation.fontMetrics.height[this.parent.fontSize];
            var topAlignVal = 0;
            if (this.accentContainer.wrappers.length > 0) {
                topAlignVal = this.accentContainer.wrappers[this.accentContainer.maxTopAlignIndex].topAlign;
                if (this.accentGap >= 0) {
                    topAlignVal += this.accentGap * fontHeight;
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
            if (this.accentContainer.wrappers.length > 0) {
                bottomAlignVal = this.accentContainer.wrappers[this.accentContainer.maxBottomAlignIndex].bottomAlign;
            }
            return bottomAlignVal;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.AccentWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.AccentWrapper.prototype.constructor = eqEd.AccentWrapper;
    eqEd.AccentWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="eqEdWrapper accentWrapper"></div>')
    };
    eqEd.AccentWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.equation, this.character, this.fontStyle);
        copy.accentSymbol = new eqEd.AccentSymbol(copy, this.character, this.fontStyle);
        copy.accentContainer = this.accentContainer.clone();
        copy.accentContainer.parent = copy;
        copy.domObj = copy.buildDomObj();
        copy.domObj.append(copy.accentSymbol.domObj);
        copy.domObj.append(copy.accentContainer.domObj);
        
        copy.childNoncontainers = [copy.accentSymbol];
        copy.childContainers = [copy.accentContainer];

        return copy;
    };
    eqEd.AccentWrapper.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: this.className.substring(5, this.className.length - 7),
            value: this.character,
            operands: {
                accentedExpression: this.accentContainer.buildJsonObj()
            }
        };
        return jsonObj;
    };
    eqEd.AccentWrapper.constructFromJsonObj = function(jsonObj, equation) {
      var accentWrapper = new eqEd.AccentWrapper(equation, jsonObj.value, 'MathJax_Main');
      for (var i = 0; i < jsonObj.operands.accentedExpression.length; i++) {
        var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.accentedExpression[i].type);
        var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.accentedExpression[i], equation);
        accentWrapper.accentContainer.addWrappers([i, innerWrapper]);
      }
      return accentWrapper;
    }
})();