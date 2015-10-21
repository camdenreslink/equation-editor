eqEd.MatrixWrapper = function(equation, numRows, numCols, horAlign) {
    eqEd.Wrapper.call(this, equation); // call super constructor.
    this.className = "eqEd.MatrixWrapper";

    this.numRows = numRows;
    this.numCols = numCols;
    this.horAlign = horAlign;
    this.horGap = 1;
    this.vertGap = 0.25;

    if (this.numRows === 2 && this.numCols === 1) {
        this.padLeft = 0;
        this.padRight = 0;
    } else {
        this.padLeft = 0.25;
        this.padRight = 0.25;
    }

    this.domObj = this.buildDomObj();

    this.childContainers = [];
    this.matrixContainers = [];
    for (var i = 0; i < this.numRows; i++) {
        var row = [];
        for (var j = 0; j < this.numCols; j++) {
            var matrixContainer = new eqEd.MatrixContainer(this, i, j);
            this.domObj.append(matrixContainer.domObj);
            row.push(matrixContainer);
            this.childContainers.push(matrixContainer);
        }
        this.matrixContainers.push(row);
    }

    // Set up the rowTopAligns calculation
    var rowTopAligns = [];
    this.properties.push(new Property(this, "rowTopAligns", rowTopAligns, {
        get: function() {
            return rowTopAligns;
        },
        set: function(value) {
            rowTopAligns = value;
        },
        compute: function() {
            var rowTopAlignsVal = [];
            for (var i = 0; i < this.numRows; i++) {
                var rowTopAlignsList = [];
                for (var j = 0; j < this.numCols; j++) {
                    var topAlign = 0;
                    if (this.matrixContainers[i][j].wrappers.length > 0) {
                        topAlign = this.matrixContainers[i][j].wrappers[this.matrixContainers[i][j].maxTopAlignIndex].topAlign;
                    }
                    rowTopAlignsList.push(topAlign);
                }
                rowTopAlignsVal.push(rowTopAlignsList.max());
            }
            return rowTopAlignsVal;
        },
        updateDom: function() {}
    }));

    // Set up the rowBottomAligns calculation
    var rowBottomAligns = [];
    this.properties.push(new Property(this, "rowBottomAligns", rowBottomAligns, {
        get: function() {
            return rowBottomAligns;
        },
        set: function(value) {
            rowBottomAligns = value;
        },
        compute: function() {
            var rowBottomAlignsVal = [];
            for (var i = 0; i < this.numRows; i++) {
                var rowBottomAlignsList = [];
                for (var j = 0; j < this.numCols; j++) {
                    var bottomAlign = 0;
                    if (this.matrixContainers[i][j].wrappers.length > 0) {
                        bottomAlign = this.matrixContainers[i][j].wrappers[this.matrixContainers[i][j].maxBottomAlignIndex].bottomAlign;
                    }
                    rowBottomAlignsList.push(bottomAlign);
                }
                rowBottomAlignsVal.push(rowBottomAlignsList.max());
            }
            return rowBottomAlignsVal;
        },
        updateDom: function() {}
    }));

    // Set up the colWidths calculation
    var colWidths = [];
    this.properties.push(new Property(this, "colWidths", colWidths, {
        get: function() {
            return colWidths;
        },
        set: function(value) {
            colWidths = value;
        },
        compute: function() {
            var colWidthsVal = [];
            for (var i = 0; i < this.numCols; i++) {
                var colWidthsList = [];
                for (var j = 0; j < this.numRows; j++) {
                    colWidthsList.push(this.matrixContainers[j][i].width);
                }
                colWidthsVal.push(colWidthsList.max());
            }
            return colWidthsVal;
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
            var fontHeight = this.equation.fontMetrics.height[this.parent.fontSize];
            var widthVal = 0;
            for (var i = 0; i < this.numCols; i++) {
                widthVal += this.colWidths[i];
            }
            widthVal += (this.numCols - 1) * this.horGap * fontHeight;
            return widthVal;
        },
        updateDom: function() {
            this.domObj.updateWidth(this.width);
        }
    }));

    // Set up the matrixHeight calculation
    var matrixHeight = 0;
    this.properties.push(new Property(this, "matrixHeight", matrixHeight, {
        get: function() {
            return matrixHeight;
        },
        set: function(value) {
            matrixHeight = value;
        },
        compute: function() {
            var fontHeight = this.equation.fontMetrics.height[this.parent.fontSize];
            var matrixHeightVal = 0;
            for (var i = 0; i < this.numRows; i++) {
                matrixHeightVal += this.rowTopAligns[i] + this.rowBottomAligns[i];
            }
            matrixHeightVal += (this.numRows - 1) * this.vertGap * fontHeight;
            return matrixHeightVal;
        },
        updateDom: function() {}
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
            return 0.5 * this.matrixHeight;
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
            return 0.5 * this.matrixHeight;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.MatrixWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.MatrixWrapper.prototype.constructor = eqEd.MatrixWrapper;
    eqEd.MatrixWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="eqEdWrapper matrixWrapper"></div>')
    };
    eqEd.MatrixWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.equation, this.numRows, this.numCols, this.horAlign);
        copy.domObj = copy.buildDomObj();

        copy.childContainers = [];
        copy.matrixContainers = [];
        for (var i = 0; i < copy.numRows; i++) {
            var row = [];
            for (var j = 0; j < copy.numCols; j++) {
                var matrixContainer = this.matrixContainers[i][j].clone();
                matrixContainer.parent = copy;
                copy.domObj.append(matrixContainer.domObj);
                row.push(matrixContainer);
                copy.childContainers.push(matrixContainer);
            }
            copy.matrixContainers.push(row);
        }

        return copy;
    };
    eqEd.MatrixWrapper.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: this.className.substring(5, this.className.length - 7),
            value: null
        };
        var jsonMatrixContainers = [];
        for (var i = 0; i < this.matrixContainers.length; i++) {
            var jsonRow = [];
            for (var j = 0; j < this.matrixContainers[i].length; j++) {
                jsonRow.push(this.matrixContainers[i][j].buildJsonObj());
            }
            jsonMatrixContainers.push(jsonRow);
        }
        jsonObj.operands = {
            elements: jsonMatrixContainers
        }
        return jsonObj;
    };
    eqEd.MatrixWrapper.constructFromJsonObj = function(jsonObj, equation) {
        var numRows = jsonObj.operands.elements.length;
        var numCols = jsonObj.operands.elements[0].length;
        var matrixWrapper = new eqEd.MatrixWrapper(equation, numRows, numCols, 'center');
        for (var i = 0; i < jsonObj.operands.elements.length; i++) {
            var matrixRow = jsonObj.operands.elements[i];
            for (var j = 0; j < matrixRow.length; j++) {
                var matrixEntry = matrixRow[j];
                for (var k = 0; k < matrixEntry.length; k++) {
                    var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(matrixEntry[k].type);
                    var innerWrapper = innerWrapperCtor.constructFromJsonObj(matrixEntry[k], equation);
                    matrixWrapper.matrixContainers[i][j].addWrappers([k, innerWrapper]);
                }
            }
        }
        return matrixWrapper;
    };
})();