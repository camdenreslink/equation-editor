eqEd.SquareRootWrapper = function(symbolSizeConfig) {
	eqEd.Wrapper.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.SquareRootWrapper";

    this.domObj = this.buildDomObj();    

    this.radicandContainer = new eqEd.SquareRootRadicandContainer(symbolSizeConfig);
    this.squareRootOverBar = new eqEd.SquareRootOverBar(symbolSizeConfig);
    this.radical = new eqEd.SquareRootRadical(symbolSizeConfig);
    this.squareRootDiagonal = new eqEd.SquareRootDiagonal(symbolSizeConfig);
    this.radicandContainer.parent = this;
    this.squareRootOverBar.parent = this;
    this.radical.parent = this;
    this.squareRootDiagonal.parent = this;
    this.domObj.append(this.radicandContainer.domObj);
    this.domObj.append(this.squareRootOverBar.domObj);
    this.domObj.append(this.radical.domObj);
    this.domObj.append(this.squareRootDiagonal.domObj);
    this.childContainers = [this.radicandContainer];
    this.childNoncontainers = [this.squareRootDiagonal, this.radical, this.squareRootOverBar];

    this.padBottomWhenParentIsFraction = 0.2;
    this.padLeft = 0.1;
    this.padRight = 0.1;

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
            return this.radical.width + this.squareRootDiagonal.width + this.radicandContainer.width;
        },
        updateDom: function() {
            this.domObj.updateWidth(this.width);
        }
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
        	var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
            var topAlignVal = 0;
            if (this.radicandContainer.wrappers.length > 0) {
                topAlignVal += this.radicandContainer.wrappers[this.radicandContainer.maxTopAlignIndex].topAlign;
            }
            if (this.radicandContainer.isMaxTopAlignRootWrapper) {
                topAlignVal += this.radicandContainer.padTopMaxChildAlignTopIsRoot * fontHeight;
            } else {
                topAlignVal += this.radicandContainer.padTopMaxChildAlignTopIsNotRoot * fontHeight;
            }
            
            return topAlignVal;
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
        	var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
            var bottomAlignVal = 0;
            if (this.radicandContainer.wrappers.length > 0) {
                bottomAlignVal += this.radicandContainer.wrappers[this.radicandContainer.maxBottomAlignIndex].bottomAlign;
            }
            if (this.radicandContainer.isMaxTopAlignRootWrapper) {
                bottomAlignVal += this.radicandContainer.padBottomMaxChildAlignTopIsRoot * fontHeight;
            } else {
                bottomAlignVal += this.radicandContainer.padBottomMaxChildAlignTopIsNotRoot * fontHeight;
            }
            if (this.parent instanceof eqEd.StackedFractionNumeratorContainer) {
                bottomAlignVal += this.padBottomWhenParentIsFraction * fontHeight;
            }
            return bottomAlignVal;
        },
        updateDom: function() {}
    }));
};

(function() {
    // subclass extends superclass
    eqEd.SquareRootWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.SquareRootWrapper.prototype.constructor = eqEd.SquareRootWrapper;
    eqEd.SquareRootWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="eqEdWrapper squareRootWrapper"></div>')
    };
    eqEd.SquareRootWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.symbolSizeConfig);

        copy.domObj = copy.buildDomObj();    

        copy.radicandContainer = this.radicandContainer.clone();
        copy.squareRootOverBar = this.squareRootOverBar.clone();
        copy.radical = this.radical.clone();
        copy.squareRootDiagonal = this.squareRootDiagonal.clone();
        copy.radicandContainer.parent = copy;
        copy.squareRootOverBar.parent = copy;
        copy.radical.parent = copy;
        copy.squareRootDiagonal.parent = copy;
        copy.domObj.append(copy.radicandContainer.domObj);
        copy.domObj.append(copy.squareRootOverBar.domObj);
        copy.domObj.append(copy.radical.domObj);
        copy.domObj.append(copy.squareRootDiagonal.domObj);
        copy.childContainers = [copy.radicandContainer];
        copy.childNoncontainers = [copy.squareRootDiagonal, copy.radical, copy.squareRootOverBar];

        return copy;
    };
    eqEd.SquareRootWrapper.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: this.className.substring(5, this.className.length - 7),
            value: null,
            operands: {
                radicand: this.radicandContainer.buildJsonObj()
            }
        };
        return jsonObj;
    };
    eqEd.SquareRootWrapper.constructFromJsonObj = function(jsonObj, symbolSizeConfig) {
        var squareRootWrapper = new eqEd.SquareRootWrapper(symbolSizeConfig);
        for (var i = 0; i < jsonObj.operands.radicand.length; i++) {
            var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.radicand[i].type);
            var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.radicand[i], symbolSizeConfig);
            squareRootWrapper.radicandContainer.addWrappers([i, innerWrapper]);
        }
        return squareRootWrapper;
    }
})();