eqEd.SquareRootOverBar = function(parent) {
    eqEd.BoundEquationComponent.call(this, parent); // call super constructor.
    this.className = "eqEd.SquareRootOverBar";

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
            // remember compute hooks get called.
            return 0;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));

};
(function() {
    // subclass extends superclass
    eqEd.SquareRootOverBar.prototype = Object.create(eqEd.BoundEquationComponent.prototype);
    eqEd.SquareRootOverBar.prototype.constructor = eqEd.SquareRootOverBar;
    eqEd.SquareRootOverBar.prototype.buildDomObj = function() {
        return new eqEd.EquationDom(this,
            '<div class="squareRootOverBar"></div>');
    };
})();