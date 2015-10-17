eqEd.Equation = function() {
    this.className = "eqEd.Equation";
    // FontMetrics gives some info about fontHeights.
    // Allows all calculations to happen with plain javascript
    // objects without accessing the DOM.
    this.fontMetrics = new eqEd.FontMetrics();
    // TODO: Property is a global singleton, when it should be local per equation.
    this.propertyPool = null;
    // TODO: Fix this. It shouldn't be so verbose.
    this.topLevelContainer = new eqEd.Container(null);
    this.topLevelContainer.equation = this;
    this.topLevelContainer.padTop = 0.2;
    this.topLevelContainer.padBottom = 0.2;
    this.topLevelContainer.fontSize = "fontSizeNormal";
    this.topLevelContainer.domObj = this.topLevelContainer.buildDomObj();
    this.topLevelContainer.domObj.updateFontSize(this.topLevelContainer.fontSize);
    this.topLevelContainer.domObj.value.addClass('equation');
    var topLevelEmptyContainerWrapper = new eqEd.TopLevelEmptyContainerWrapper(this);
    this.topLevelContainer.addWrappers([0, topLevelEmptyContainerWrapper]);
};

(function() {
    eqEd.Equation.prototype.constructor = eqEd.Equation;
    eqEd.Equation.prototype.clone = function() {
        return new this.constructor();
    };
    eqEd.Equation.prototype.getDomRef = function() {
        return this.topLevelContainer.domObj.value;
    };
    eqEd.Equation.prototype.updateAll = function() {
        this.topLevelContainer.updateAll();
    };
    eqEd.Equation.JsonTypeToConstructor = function(type) {
        var typeToConstructorMapping = {
            'Accent': eqEd.AccentWrapper,
            'BigOperator': eqEd.BigOperatorWrapper,
            'BracketPair': eqEd.BracketPairWrapper,
            'Bracket': eqEd.BracketWrapper,
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