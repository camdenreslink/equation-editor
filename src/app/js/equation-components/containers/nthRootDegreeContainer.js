eqEd.NthRootDegreeContainer = function(parent) {
	eqEd.Container.call(this, parent);
	this.className = "eqEd.NthRootDegreeContainer";

	this.domObj = this.buildDomObj();
    var squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(this.equation);
    this.addWrappers([0, squareEmptyContainerWrapper]);
    this.offsetRadicalBottom = -0.1;
    this.offsetRadicalRight = 0.3;
    this.diagonalHeightAdjustment = 0.048; // Was 0.05, but didn't format quite right.
    
    // Set up the isLeftFlushToWrapper calculation
    var isLeftFlushToWrapper = false;
    this.properties.push(new Property(this, "isLeftFlushToWrapper", isLeftFlushToWrapper, {
        get: function() {
            return isLeftFlushToWrapper;
        },
        set: function(value) {
            isLeftFlushToWrapper = value;
        },
        compute: function() {
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            var diagonalHeight = this.parent.radicandContainer.height;
            var isLeftFlushToWrapperVal = true;
            if (this.width - this.offsetRadicalRight * fontHeight + this.diagonalHeightAdjustment * diagonalHeight < this.parent.radical.width) {
                isLeftFlushToWrapperVal = false;
            }
            return isLeftFlushToWrapperVal;
        },
        updateDom: function() {}
    }));

    // Set up the isTopFlushToWrapper calculation
    var isTopFlushToWrapper = false;
    this.properties.push(new Property(this, "isTopFlushToWrapper", isTopFlushToWrapper, {
        get: function() {
            return isTopFlushToWrapper;
        },
        set: function(value) {
            isTopFlushToWrapper = value;
        },
        compute: function() {
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            var diagonalHeight = this.parent.radicandContainer.height;
            var isTopFlushToWrapperVal = false;
            if (diagonalHeight - (this.parent.radical.height + this.offsetRadicalBottom * fontHeight) < this.height) {
                isTopFlushToWrapperVal = true;
            }
            return isTopFlushToWrapperVal;
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
            var leftVal = 0;
            if (!this.isLeftFlushToWrapper) {
                leftVal += this.parent.radical.width - (this.width - this.offsetRadicalRight * fontHeight + this.diagonalHeightAdjustment * this.parent.nthRootDiagonal.height);
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
            if (!this.isTopFlushToWrapper) {
                topVal += this.parent.nthRootDiagonal.height - this.parent.radical.height - this.offsetRadicalBottom * fontHeight - this.height;
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
	        return "fontSizeSmallest";
        },
        updateDom: function() {
            this.domObj.updateFontSize(this.fontSize);
        }
    }));
};

(function() {
    // subclass extends superclass
    eqEd.NthRootDegreeContainer.prototype = Object.create(eqEd.Container.prototype);
    eqEd.NthRootDegreeContainer.prototype.constructor = eqEd.NthRootDegreeContainer;
    eqEd.NthRootDegreeContainer.prototype.buildDomObj = function() {
        return new eqEd.ContainerDom(this,
            '<div class="eqEdContainer nthRootDegreeContainer"></div>');
    };
})();