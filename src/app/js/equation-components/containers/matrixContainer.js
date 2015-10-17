eqEd.MatrixContainer = function(parent, row, col) {
    eqEd.Container.call(this, parent);
    this.className = "eqEd.MatrixContainer";
    this.row = row;
    this.col = col;

    this.domObj = this.buildDomObj();
    var squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(this.equation);
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
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            var leftVal = 0;
            for (var i = 0; i < this.col; i++) {
                leftVal += this.parent.colWidths[i];
            }
            if (this.parent.horAlign === 'left') {
                leftVal += 0;
            } else if (this.parent.horAlign === 'center') {
                leftVal += 0.5 * (this.parent.colWidths[this.col] - this.width);
            } else if (this.parent.horAlign === 'right') {
                leftVal += this.parent.colWidths[this.col] - this.width;
            }
            leftVal += this.col * this.parent.horGap * fontHeight;
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
            for (var i = 0; i < this.row; i++) {
                topVal += this.parent.rowTopAligns[i] + this.parent.rowBottomAligns[i];
            }
            if (this.wrappers.length > 0) {
                topVal += this.parent.rowTopAligns[this.row] - this.wrappers[this.maxTopAlignIndex].topAlign;
            }
            topVal += this.row * this.parent.vertGap * fontHeight;
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
            var fontSizeVal = "";
            var actualParentContainer = this.parent.parent;
            while (actualParentContainer instanceof eqEd.BracketContainer) {
                actualParentContainer = actualParentContainer.parent.parent;
            }
            if (actualParentContainer.fontSize === "fontSizeSmaller" || actualParentContainer.fontSize === "fontSizeSmallest") {
                fontSizeVal = "fontSizeSmallest";
            } else {
                fontSizeVal = "fontSizeNormal";
            }
            return fontSizeVal;
        },
        updateDom: function() {
            this.domObj.updateFontSize(this.fontSize);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.MatrixContainer.prototype = Object.create(eqEd.Container.prototype);
    eqEd.MatrixContainer.prototype.constructor = eqEd.MatrixContainer;
    eqEd.MatrixContainer.prototype.clone = function() {
      var copy = new this.constructor(this.parent, this.row, this.col);
      var indexAndWrapperList = [];
      for (var i = 0; i < this.wrappers.length; i++) {
        indexAndWrapperList.push([i, this.wrappers[i].clone()]);
      }
      eqEd.Container.prototype.addWrappers.apply(copy, indexAndWrapperList);
      return copy;
    }
    eqEd.MatrixContainer.prototype.buildDomObj = function() {
        return new eqEd.ContainerDom(this,
            '<div class="eqEdContainer matrixContainer"></div>');
    };
})();