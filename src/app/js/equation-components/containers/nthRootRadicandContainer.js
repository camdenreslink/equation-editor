eqEd.NthRootRadicandContainer = function(parent) {
	eqEd.Container.call(this, parent);
	this.className = "eqEd.NthRootRadicandContainer";

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
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            var leftVal = this.parent.radical.width + this.parent.nthRootDiagonal.width;
            if (this.parent.nthRootDegreeContainer.isLeftFlushToWrapper) {
                leftVal += this.parent.nthRootDegreeContainer.width - this.parent.nthRootDegreeContainer.offsetRadicalRight * fontHeight + this.parent.nthRootDegreeContainer.diagonalHeightAdjustment * this.parent.nthRootDiagonal.height - this.parent.radical.width;
            }
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
        	var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            var topVal = 0;
            if (this.isMaxTopAlignRootWrapper) {
                topVal += this.padTopMaxChildAlignTopIsRoot * fontHeight;
            } else {
                topVal += this.padTopMaxChildAlignTopIsNotRoot * fontHeight;
            }
            if (this.parent.nthRootDegreeContainer.isTopFlushToWrapper) {
                topVal += this.parent.nthRootDegreeContainer.height + this.parent.radical.height + this.parent.nthRootDegreeContainer.offsetRadicalBottom * fontHeight - this.parent.nthRootDiagonal.height;
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
    eqEd.NthRootRadicandContainer.prototype = Object.create(eqEd.Container.prototype);
    eqEd.NthRootRadicandContainer.prototype.constructor = eqEd.NthRootRadicandContainer;
    eqEd.NthRootRadicandContainer.prototype.buildDomObj = function() {
        return new eqEd.ContainerDom(this,
            '<div class="eqEdContainer nthRootRadicandContainer"></div>');
    };
})();