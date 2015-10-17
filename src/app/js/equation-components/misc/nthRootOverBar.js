eqEd.NthRootOverBar = function(parent) {
    eqEd.BoundEquationComponent.call(this, parent); // call super constructor.
    this.className = "eqEd.NthRootOverBar";

    this.domObj = this.buildDomObj();
    this.adjustLeft = -0.06;
    this.heightRatio = 0.055;

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
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            return this.parent.radicandContainer.width - this.adjustLeft * fontHeight;
        },
        updateDom: function() {
            this.domObj.updateWidth(this.width);
        }
    }));

    // Set up the height calculation
    var height = 0;
    this.properties.push(new Property(this, "height", height, {
        get: function() {
            return height;
        },
        set: function(value) {
            height = value;
        },
        compute: function() {
            var fontHeight = this.equation.fontMetrics.height["fontSizeNormal"];
            return this.heightRatio * fontHeight;
        },
        updateDom: function() {
            this.domObj.updateHeight(this.height);
        }
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
            if (this.parent.nthRootDegreeContainer.isTopFlushToWrapper) {
                topVal += this.parent.nthRootDegreeContainer.height + this.parent.radical.height + this.parent.nthRootDegreeContainer.offsetRadicalBottom * fontHeight - this.parent.nthRootDiagonal.height;
            }
            return topVal;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));

};
(function() {
    // subclass extends superclass
    eqEd.NthRootOverBar.prototype = Object.create(eqEd.BoundEquationComponent.prototype);
    eqEd.NthRootOverBar.prototype.constructor = eqEd.NthRootOverBar;
    eqEd.NthRootOverBar.prototype.buildDomObj = function() {
        return new eqEd.EquationDom(this,
            '<div class="nthRootOverBar"></div>');
    };
})();