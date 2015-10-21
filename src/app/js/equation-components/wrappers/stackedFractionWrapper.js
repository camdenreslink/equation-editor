eqEd.StackedFractionWrapper = function(equation) {
    eqEd.Wrapper.call(this, equation); // call super constructor.
    this.className = "eqEd.StackedFractionWrapper";

    this.stackedFractionNumeratorContainer = new eqEd.StackedFractionNumeratorContainer(this);
    this.stackedFractionDenominatorContainer = new eqEd.StackedFractionDenominatorContainer(this);
    this.stackedFractionHorizontalBar = new eqEd.StackedFractionHorizontalBar(this);
    this.domObj = this.buildDomObj();
    this.domObj.append(this.stackedFractionNumeratorContainer.domObj);
    this.domObj.append(this.stackedFractionDenominatorContainer.domObj);
    this.domObj.append(this.stackedFractionHorizontalBar.domObj);
    
    this.childNoncontainers = [this.stackedFractionHorizontalBar];
    this.childContainers = [this.stackedFractionNumeratorContainer, this.stackedFractionDenominatorContainer];

    this.padLeft = 0.05;
    this.padRight = 0.05;

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
            return this.stackedFractionHorizontalBar.width;
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
            return 0.5 * this.stackedFractionHorizontalBar.height + this.stackedFractionNumeratorContainer.height;
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
            return 0.5 * this.stackedFractionHorizontalBar.height + this.stackedFractionDenominatorContainer.height;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.StackedFractionWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.StackedFractionWrapper.prototype.constructor = eqEd.StackedFractionWrapper;
    eqEd.StackedFractionWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="eqEdWrapper stackedFractionWrapper"></div>')
    };
    eqEd.StackedFractionWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.equation);
        copy.stackedFractionNumeratorContainer = this.stackedFractionNumeratorContainer.clone();
        copy.stackedFractionNumeratorContainer.parent = copy;
        copy.stackedFractionDenominatorContainer = this.stackedFractionDenominatorContainer.clone();
        copy.stackedFractionDenominatorContainer.parent = copy;
        copy.stackedFractionHorizontalBar = this.stackedFractionHorizontalBar.clone();
        copy.stackedFractionHorizontalBar.parent = copy;
        copy.domObj = copy.buildDomObj();
        copy.domObj.append(copy.stackedFractionNumeratorContainer.domObj);
        copy.domObj.append(copy.stackedFractionDenominatorContainer.domObj);
        copy.domObj.append(copy.stackedFractionHorizontalBar.domObj);

        copy.childNoncontainers = [copy.stackedFractionHorizontalBar];
        copy.childContainers = [copy.stackedFractionNumeratorContainer, copy.stackedFractionDenominatorContainer];

        return copy;
    };
    eqEd.StackedFractionWrapper.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: this.className.substring(5, this.className.length - 7),
            value: null,
            operands: {
                numerator: this.stackedFractionNumeratorContainer.buildJsonObj(),
                denominator: this.stackedFractionDenominatorContainer.buildJsonObj()
            }
        };
        return jsonObj;
    };
    eqEd.StackedFractionWrapper.constructFromJsonObj = function(jsonObj, equation) {
        var stackedFractionWrapper = new eqEd.StackedFractionWrapper(equation);
        for (var i = 0; i < jsonObj.operands.numerator.length; i++) {
            var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.numerator[i].type);
            var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.numerator[i], equation);
            stackedFractionWrapper.stackedFractionNumeratorContainer.addWrappers([i, innerWrapper]);
        }
        for (var i = 0; i < jsonObj.operands.denominator.length; i++) {
            var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.denominator[i].type);
            var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.denominator[i], equation);
            stackedFractionWrapper.stackedFractionDenominatorContainer.addWrappers([i, innerWrapper]);
        }
        return stackedFractionWrapper;
    }
})();