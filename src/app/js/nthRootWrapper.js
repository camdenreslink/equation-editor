eqEd.NthRootWrapper = function(symbolSizeConfig) {
	eqEd.Wrapper.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.NthRootWrapper";

    this.domObj = this.buildDomObj();    

    this.radicandContainer = new eqEd.NthRootRadicandContainer(symbolSizeConfig);
    this.nthRootOverBar = new eqEd.NthRootOverBar(symbolSizeConfig);
    this.radical = new eqEd.NthRootRadical(symbolSizeConfig);
    this.nthRootDiagonal = new eqEd.NthRootDiagonal(symbolSizeConfig);
    this.nthRootDegreeContainer = new eqEd.NthRootDegreeContainer(symbolSizeConfig);
    this.radicandContainer.parent = this;
    this.nthRootOverBar.parent = this;
    this.radical.parent = this;
    this.nthRootDiagonal.parent = this;
    this.nthRootDegreeContainer.parent = this;
    this.domObj.append(this.nthRootDegreeContainer.domObj);
    this.domObj.append(this.radicandContainer.domObj);
    this.domObj.append(this.nthRootOverBar.domObj);
    this.domObj.append(this.radical.domObj);
    this.domObj.append(this.nthRootDiagonal.domObj);
    this.childContainers = [this.nthRootDegreeContainer, this.radicandContainer];
    this.childNoncontainers = [this.nthRootDiagonal, this.radical, this.nthRootOverBar];

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
            var fontHeight = this.symbolSizeConfig.height[this.parent.fontSize];
            var widthVal = this.radical.width + this.nthRootDiagonal.width + this.radicandContainer.width;
            if (this.nthRootDegreeContainer.isLeftFlushToWrapper) {
                widthVal += this.nthRootDegreeContainer.width - this.nthRootDegreeContainer.offsetRadicalRight * fontHeight + this.nthRootDegreeContainer.diagonalHeightAdjustment * this.nthRootDiagonal.height - this.radical.width;
            }
            return widthVal;
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
            if (this.nthRootDegreeContainer.isTopFlushToWrapper) {
                topAlignVal += this.nthRootDegreeContainer.height + this.radical.height + this.nthRootDegreeContainer.offsetRadicalBottom * fontHeight - this.nthRootDiagonal.height;
            }
            console.log(this.nthRootDegreeContainer.isTopFlushToWrapper);
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
    eqEd.NthRootWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.NthRootWrapper.prototype.constructor = eqEd.NthRootWrapper;
    eqEd.NthRootWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="eqEdWrapper nthRootWrapper"></div>')
    };
    eqEd.NthRootWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.symbolSizeConfig);

        copy.domObj = copy.buildDomObj();    

        copy.radicandContainer = this.radicandContainer.clone();
        copy.nthRootOverBar = this.nthRootOverBar.clone();
        copy.radical = this.radical.clone();
        copy.nthRootDiagonal = this.nthRootDiagonal.clone();
        copy.nthRootDegreeContainer = this.nthRootDegreeContainer.clone();
        copy.radicandContainer.parent = copy;
        copy.nthRootOverBar.parent = copy;
        copy.radical.parent = copy;
        copy.nthRootDiagonal.parent = copy;
        copy.nthRootDegreeContainer.parent = copy;
        copy.domObj.append(copy.radicandContainer.domObj);
        copy.domObj.append(copy.nthRootOverBar.domObj);
        copy.domObj.append(copy.radical.domObj);
        copy.domObj.append(copy.nthRootDiagonal.domObj);
        copy.domObj.append(copy.nthRootDegreeContainer.domObj);
        copy.childContainers = [copy.radicandContainer, copy.nthRootDegreeContainer];
        copy.childNoncontainers = [copy.nthRootDiagonal, copy.radical, copy.nthRootOverBar];

        return copy;
    };
})();