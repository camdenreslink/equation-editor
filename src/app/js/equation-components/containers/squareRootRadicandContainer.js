eqEd.SquareRootRadicandContainer = function(parent) {
	eqEd.Container.call(this, parent);
	this.className = "eqEd.SquareRootRadicandContainer";

	this.domObj = this.buildDomObj();
    var squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(this.equation);
    this.addWrappers([0, squareEmptyContainerWrapper]);
    this.padTopMaxChildAlignTopIsRoot = 0.45;
    this.padTopMaxChildAlignTopIsNotRoot = 0.15;
    this.padBottomMaxChildAlignTopIsRoot = 0.2;
    this.padBottomMaxChildAlignTopIsNotRoot = 0;
    
    // Set up the isMaxTopAlignRootWrapper calculation
    var isMaxTopAlignRootWrapper = false;
    this.properties.push(new Property(this, "isMaxTopAlignRootWrapper", isMaxTopAlignRootWrapper, {
        get: function() {
            return isMaxTopAlignRootWrapper;
        },
        set: function(value) {
            isMaxTopAlignRootWrapper = value;
        },
        compute: function() {
            var maxTopAlignIndexWrapper = this.wrappers[this.maxTopAlignIndex];
            return (maxTopAlignIndexWrapper instanceof eqEd.SquareRootWrapper || maxTopAlignIndexWrapper instanceof eqEd.NthRootWrapper);
        },
        updateDom: function() {}
    }));

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
            return this.parent.radical.width + this.parent.squareRootDiagonal.width;
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
        	var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            var topVal = 0;
            if (this.isMaxTopAlignRootWrapper) {
                topVal += this.padTopMaxChildAlignTopIsRoot * fontHeight;
            } else {
                topVal += this.padTopMaxChildAlignTopIsNotRoot * fontHeight;
            }
            return topVal;
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
            var actualParentContainer = this.parent.parent;
            while (actualParentContainer instanceof eqEd.BracketContainer) {
                actualParentContainer = actualParentContainer.parent.parent;
            }
	        return actualParentContainer.fontSize;
        },
        updateDom: function() {
            this.domObj.updateFontSize(this.fontSize);
        }
    }));
};

(function() {
    // subclass extends superclass
    eqEd.SquareRootRadicandContainer.prototype = Object.create(eqEd.Container.prototype);
    eqEd.SquareRootRadicandContainer.prototype.constructor = eqEd.SquareRootRadicandContainer;
    eqEd.SquareRootRadicandContainer.prototype.buildDomObj = function() {
        return new eqEd.ContainerDom(this,
            '<div class="eqEdContainer squareRootRadicandContainer"></div>');
    };
})();