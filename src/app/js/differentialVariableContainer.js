eqEd.DifferentialVariableContainer = function(symbolSizeConfig) {
    eqEd.Container.call(this, symbolSizeConfig);
    this.className = "eqEd.DifferentialVariableContainer";
    this.domObj = this.buildDomObj();
    var squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(symbolSizeConfig);
    this.addWrappers([0, squareEmptyContainerWrapper]);

    // Set up the left calculation
    var left = 0;
    this.properties.push(new Property(this, "left", left, {
        get: function() {
            return left;
        },
        set: function(value) {
            left = value;
        },
        compute: function() {
            var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
            var leftVal = this.parent.differentialSymbol.width + this.parent.differentialGap * fontHeight;
            return leftVal;
        },
        updateDom: function() {
            this.domObj.updateLeft(this.left);
        }
    }));

    // Set up the top calculation
    var top = 0;
    this.properties.push(new Property(this, "top", top, {
        get: function() {
            return top;
        },
        set: function(value) {
            top = value;
        },
        compute: function() {
            // remember compute hooks get called.
            return 0;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));

    // Set up the fontSize calculation
    var fontSize = "";
    this.properties.push(new Property(this, "fontSize", fontSize, {
        get: function() {
            return fontSize;
        },
        set: function(value) {
            fontSize = value;
        },
        compute: function() {
            var fontSizeVal = "";
            var actualParentContainer = this.parent.parent;
            while (actualParentContainer instanceof eqEd.BracketContainer) {
                actualParentContainer = actualParentContainer.parent.parent;
            }
            fontSizeVal = actualParentContainer.fontSize;
            return fontSizeVal;
        },
        updateDom: function() {
            this.domObj.updateFontSize(this.fontSize);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.DifferentialVariableContainer.prototype = Object.create(eqEd.Container.prototype);
    eqEd.DifferentialVariableContainer.prototype.constructor = eqEd.DifferentialVariableContainer;
    eqEd.DifferentialVariableContainer.prototype.buildDomObj = function() {
        return new eqEd.ContainerDom(this,
            '<div class="container differentialVariableContainer"></div>');
    };
})();