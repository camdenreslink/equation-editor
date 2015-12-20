eqEd.Equation = function() {
    eqEd.EquationComponent.call(this); // call super constructor.

    this.className = "eqEd.Equation";
    // FontMetrics gives some info about fontHeights.
    // Allows all calculations to happen with plain javascript
    // objects without accessing the DOM.
    this.fontMetrics = new eqEd.FontMetrics();
    // TODO: Fix this. It shouldn't be so verbose. (Maybe make a new class that contains all of this.)
    this.topLevelContainer = new eqEd.TopLevelContainer(this);
    /*
    this.topLevelContainer.equation = this;
    this.topLevelContainer.padTop = 0.2;
    this.topLevelContainer.padBottom = 0.2;
    this.topLevelContainer.fontSize = "fontSizeNormal";
    this.topLevelContainer.domObj = this.topLevelContainer.buildDomObj();
    this.topLevelContainer.domObj.updateFontSize(this.topLevelContainer.fontSize);
    var topLevelEmptyContainerWrapper = new eqEd.TopLevelEmptyContainerWrapper(this);
    this.topLevelContainer.addWrappers([0, topLevelEmptyContainerWrapper]);
    */
    this.domObj = this.buildDomObj();
    this.domObj.append(this.topLevelContainer.domObj);

    this.fontSize = "fontSizeNormal";
    this.children = [this.topLevelContainer];
    var width = 0;
    this.properties.push(new Property(this, "width", width, {
    get: function() {
      return width;
    },
    set: function(value) {
      width = value;
    },
    compute: function() {
      return this.topLevelContainer.width;
    },
    updateDom: function() {
        this.domObj.updateWidth(this.width);
    }
    }));

    var height = 0;
    this.properties.push(new Property(this, "height", height, {
    get: function() {
      return height;
    },
    set: function(value) {
      height = value;
    },
    compute: function() {
      return this.topLevelContainer.height;
    },
    updateDom: function() {
        this.domObj.updateHeight(this.height);
    }
    }));
};

(function() {
    eqEd.Equation.prototype = Object.create(eqEd.EquationComponent.prototype);
    eqEd.Equation.prototype.constructor = eqEd.Equation;
    eqEd.Equation.prototype.buildDomObj = function() {
        return new eqEd.EquationDom(this,
            '<div class="eqEdEquation"></div>')
    };
    eqEd.Equation.prototype.clone = function() {
        return new this.constructor();
    };
    eqEd.Equation.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: "Equation",
            value: null,
            operands: {
                topLevelContainer: this.topLevelContainer.buildJsonObj()
            }
        };
        return jsonObj;
    };
    eqEd.Equation.constructFromJsonObj = function(jsonObj) {
        var equation = new eqEd.Equation();
        for (var i = 0; i < jsonObj.operands.topLevelContainer.length; i++) {
            var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.topLevelContainer[i].type);
            var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.topLevelContainer[i], equation);
            equation.topLevelContainer.addWrappers([i, innerWrapper]);
        }
        return equation;
    };
    eqEd.Equation.JsonTypeToConstructor = function(type) {
        var typeToConstructorMapping = {
            'Accent': eqEd.AccentWrapper,
            'BigOperator': eqEd.BigOperatorWrapper,
            'BracketPair': eqEd.BracketPairWrapper,
            'Bracket': eqEd.BracketWrapper,
            'Equation': eqEd.Equation,
            'FunctionLower': eqEd.FunctionLowerWrapper,
            'Function': eqEd.FunctionWrapper,
            'Integral': eqEd.IntegralWrapper,
            'Limit': eqEd.LimitWrapper,
            'LogLower': eqEd.LogLowerWrapper,
            'Matrix': eqEd.MatrixWrapper,
            'NthRoot': eqEd.NthRootWrapper,
            'Operator': eqEd.OperatorWrapper,
            'SquareRoot': eqEd.SquareRootWrapper,
            'StackedFraction': eqEd.StackedFractionWrapper,
            'Subscript': eqEd.SubscriptWrapper,
            'SuperscriptAndSubscript': eqEd.SuperscriptAndSubscriptWrapper,
            'Superscript': eqEd.SuperscriptWrapper,
            'Symbol': eqEd.SymbolWrapper
        }
        return typeToConstructorMapping[type];
    };
})();