eqEd.SubscriptWrapper = function(equation) {
	eqEd.Wrapper.call(this, equation); // call super constructor.
    this.className = "eqEd.SubscriptWrapper";

    this.subscriptContainer = new eqEd.SubscriptContainer(this);
    this.domObj = this.buildDomObj();
    this.domObj.append(this.subscriptContainer.domObj);
    this.childContainers = [this.subscriptContainer];

    // Set up the padRight calculation
    var padRight = 0;
    this.properties.push(new Property(this, "padRight", padRight, {
        get: function() {
            return padRight;
        },
        set: function(value) {
            padRight = value;
        },
        compute: function() {
            var padRightVal = 0.05;
            if (this.index !== 0 
                && this.parent.wrappers[this.index - 1] instanceof eqEd.FunctionWrapper) {
                if (this.parent.wrappers[this.index + 1] instanceof eqEd.BracketWrapper
                    || this.parent.wrappers[this.index + 1] instanceof eqEd.BracketPairWrapper) {
                    padRightVal = 0.05;
                } else {
                    padRightVal = 0.175;
                }
            }
            return padRightVal;
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
            return this.subscriptContainer.width;
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
        	var baseWrapper = null;
        	if (this.index !== 0) {
        		baseWrapper = this.parent.wrappers[this.index - 1];
        	} else {
        		// The subscript wrapper is the first entry in the container.
        		// We want to format it, as if there is a symbol immediately
        		// preceeding it.
        		baseWrapper = new eqEd.SymbolWrapper(this.equation, 'a', 'MathJax_MathItalic');
        		baseWrapper.index = 0;
                baseWrapper.parent = this.parent;
        		// Can't just call baseWrapper.update(), because it creates a circular reference
                for (var i = 0; i < baseWrapper.properties.length; i++) {
                    var prop = baseWrapper.properties[i];
                    if (prop.propName !== "top" && prop.propName !== "left") {
                        prop.compute();
                    }
                }
        	}
            return baseWrapper.topAlign;
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
        	var baseWrapper = null;
            var base = null;
        	if (this.index !== 0) {
        		baseWrapper = this.parent.wrappers[this.index - 1];
                if (baseWrapper instanceof eqEd.SubscriptWrapper) {
                    base = baseWrapper.subscriptContainer;
                } else {
                    base = baseWrapper;
                }
        	} else {
        		// The subscript wrapper is the first entry in the container.
        		// We want to format it, as if there is a symbol immediately
        		// preceeding it.
        		baseWrapper = new eqEd.SymbolWrapper(this.equation, 'a', 'MathJax_MathItalic');
        		baseWrapper.index = 0;
                baseWrapper.parent = this.parent;
        		// Can't just call baseWrapper.update(), because it creates a circular reference
                for (var i = 0; i < baseWrapper.properties.length; i++) {
                    var prop = baseWrapper.properties[i];
                    if (prop.propName !== "top" && prop.propName !== "left") {
                        prop.compute();
                    }
                }
        	}
            var fontHeightNested = this.equation.fontMetrics.height[this.subscriptContainer.fontSize];
            return this.subscriptContainer.height + baseWrapper.bottomAlign - this.subscriptContainer.offsetTop * fontHeightNested;
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
            '<div class="eqEdWrapper subscriptWrapper"></div>')
    };
    eqEd.SubscriptWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.equation);
        copy.subscriptContainer = this.subscriptContainer.clone();
        copy.subscriptContainer.parent = copy;
        copy.domObj = copy.buildDomObj();
        copy.domObj.append(copy.subscriptContainer.domObj);
        copy.childContainers = [copy.subscriptContainer];

        return copy;
    };
    eqEd.SubscriptWrapper.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: this.className.substring(5, this.className.length - 7),
            value: null,
            operands: {
                subscript: this.subscriptContainer.buildJsonObj()
            }
        };
        return jsonObj;
    };
    eqEd.SubscriptWrapper.constructFromJsonObj = function(jsonObj, equation) {
        var subscriptWrapper = new eqEd.SubscriptWrapper(equation);
        for (var i = 0; i < jsonObj.operands.subscript.length; i++) {
            var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.subscript[i].type);
            var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.subscript[i], equation);
            subscriptWrapper.subscriptContainer.addWrappers([i, innerWrapper]);
        }
        return subscriptWrapper;
    }
})();