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
            var topAlign = this.radicandContainer.topAlign;
            if (this.radicandContainer.isMaxTopAlignRootWrapper) {
                topAlign += this.radicandContainer.padTopMaxChildAlignTopIsRoot * fontHeight;
            } else {
                topAlign += this.radicandContainer.padTopMaxChildAlignTopIsNotRoot * fontHeight;
            }
            return topAlign;
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
            var bottomAlign = this.radicandContainer.bottomAlign;
            if (this.radicandContainer.isMaxTopAlignRootWrapper) {
                bottomAlign += this.radicandContainer.padBottomMaxChildAlignTopIsRoot * fontHeight;
            } else {
                bottomAlign += this.radicandContainer.padBottomMaxChildAlignTopIsNotRoot * fontHeight;
            }
            if (this.parent instanceof eqEd.StackedFractionNumeratorContainer) {
                bottomAlign += this.padBottomWhenParentIsFraction * fontHeight;
            }
            return bottomAlign;
        },
        updateDom: function() {}
    }));
};

(function() {
    // subclass extends superclass
    eqEd.SubscriptWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.SubscriptWrapper.prototype.constructor = eqEd.SubscriptWrapper;
    eqEd.SubscriptWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="wrapper squareRootWrapper"></div>')
    };
    eqEd.SubscriptWrapper.prototype.clone = function() {
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
})();