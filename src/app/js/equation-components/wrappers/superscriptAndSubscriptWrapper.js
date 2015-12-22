eqEd.SuperscriptAndSubscriptWrapper = function(equation) {
	eqEd.Wrapper.call(this, equation); // call super constructor.
    this.className = "eqEd.SuperscriptAndSubscriptWrapper";

    this.superscriptContainer = new eqEd.SuperscriptContainer(this);
    this.subscriptContainer = new eqEd.SubscriptContainer(this);
    this.subscriptContainer.offsetTop = 0.45;

    this.domObj = this.buildDomObj();
    this.domObj.append(this.superscriptContainer.domObj);
    this.domObj.append(this.subscriptContainer.domObj);
    this.childContainers = [this.superscriptContainer, this.subscriptContainer];

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
        	var maxWidth = (this.superscriptContainer.width > this.subscriptContainer.width) ? this.superscriptContainer.width : this.subscriptContainer.width;
            return maxWidth;
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
        	var fontHeight = this.equation.fontMetrics.height[this.parent.fontSize];
            var baseWrapper = null;
            var baseWrapperOverlap = 0.75;

            if (this.index !== 0) {
                baseWrapper = this.parent.wrappers[this.index - 1];
            } else {
                // The superscript wrapper is the first entry in the container.
                // We want to format it, as if there is a symbol immediately
                // preceeding it.
                baseWrapper = new eqEd.SymbolWrapper(this.equation, 'a', 'MathJax_MathItalic');
                baseWrapper.parent = this.parent;
                baseWrapper.index = 0;
                // Can't just call baseWrapper.update(), because it creates a circular reference
                for (var i = 0; i < baseWrapper.properties.length; i++) {
                    var prop = baseWrapper.properties[i];
                    if (prop.propName !== "top" && prop.propName !== "left") {
                        prop.compute();
                    }
                }
            }
            var topAlign = 0;
            var superscriptContainerTopAlign = 0;
            var superscriptContainerBottomAlign = 0;
            if (this.superscriptContainer.wrappers.length !== 0) {
                superscriptContainerTopAlign = this.superscriptContainer.wrappers[this.superscriptContainer.maxTopAlignIndex].topAlign;
                superscriptContainerBottomAlign = this.superscriptContainer.wrappers[this.superscriptContainer.maxBottomAlignIndex].bottomAlign;
            }
            // topAlign rules if previous wrapper is an nth root wrapper.
            if (baseWrapper instanceof eqEd.NthRootWrapper) {
                if (baseWrapper.nthRootDegreeContainer.isLeftFlushToWrapper) {
                    topAlign = baseWrapper.nthRootDiagonal.height + superscriptContainerTopAlign - baseWrapper.bottomAlign;
                } else {
                    topAlign = baseWrapper.topAlign + superscriptContainerTopAlign;
                }
            // topAlign rules if previous wrapper is a square root wrapper
            } else if (baseWrapper instanceof eqEd.SquareRootWrapper) {
                topAlign = baseWrapper.topAlign + superscriptContainerTopAlign;
            // topAlign rules if previous wrapper has a superscript as well.
            } else if (baseWrapper instanceof eqEd.SuperscriptWrapper || baseWrapper instanceof eqEd.SuperscriptAndSubscriptWrapper) {
                var base = baseWrapper.superscriptContainer;
                var baseTopAlign = 0;
                if (base.wrappers.length !== 0) {
                    baseTopAlign = base.wrappers[base.maxTopAlignIndex].topAlign;
                }
                var offset = 0.15;
                var maxOverlap = 0.75;
                // Check if the superscript container overlaps with more than the maxOverlap ration of the previous superscript container.
                if (superscriptContainerBottomAlign + offset * fontHeight > maxOverlap * base.height) {
                    topAlign = baseWrapper.topAlign + (this.superscriptContainer.height - maxOverlap * base.height);
                } else {
                    topAlign = baseWrapper.topAlign + superscriptContainerTopAlign - offset * fontHeight;
                }
            } else {
                var offset = 0.3;
                var maxOverlap = 0.625;
                // Check if the superscript container overlaps with more than the maxOverlap ration of the baseWrapper
                if (superscriptContainerBottomAlign + offset * fontHeight > maxOverlap * baseWrapper.height) {
                    topAlign = baseWrapper.topAlign + (this.superscriptContainer.height - maxOverlap * baseWrapper.height);
                } else {
                    topAlign = baseWrapper.topAlign + superscriptContainerTopAlign - offset * fontHeight;
                }
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
                base = baseWrapper;
        	}
            var fontHeightNested = this.equation.fontMetrics.height[this.subscriptContainer.fontSize];
            return this.subscriptContainer.height + baseWrapper.bottomAlign - this.subscriptContainer.offsetTop * fontHeightNested;
        },
        updateDom: function() {}
    }));
};

(function() {
    // subclass extends superclass
    eqEd.SuperscriptAndSubscriptWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.SuperscriptAndSubscriptWrapper.prototype.constructor = eqEd.SuperscriptAndSubscriptWrapper;
    eqEd.SuperscriptAndSubscriptWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="eqEdWrapper superscriptAndSubscriptWrapper"></div>')
    };
    eqEd.SuperscriptAndSubscriptWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.equation);

        copy.superscriptContainer = this.superscriptContainer.clone();
        copy.superscriptContainer.parent = copy;
	    copy.subscriptContainer = this.subscriptContainer.clone();
        copy.subscriptContainer.parent = copy;
	    copy.subscriptContainer.offsetTop = 0.45;
	    copy.domObj = copy.buildDomObj();
	    copy.domObj.append(copy.superscriptContainer.domObj);
	    copy.domObj.append(copy.subscriptContainer.domObj);
	    copy.childContainers = [copy.superscriptContainer, copy.subscriptContainer];
        return copy;
    };
    eqEd.SuperscriptAndSubscriptWrapper.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: this.className.substring(5, this.className.length - 7),
            value: null,
            operands: {
                superscript: this.superscriptContainer.buildJsonObj(),
                subscript: this.subscriptContainer.buildJsonObj()
            }
        };
        return jsonObj;
    };
    eqEd.SuperscriptAndSubscriptWrapper.constructFromJsonObj = function(jsonObj, equation) {
        var superscriptAndSubscriptWrapper = new eqEd.SuperscriptAndSubscriptWrapper(equation);
        for (var i = 0; i < jsonObj.operands.superscript.length; i++) {
            var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.superscript[i].type);
            var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.superscript[i], equation);
            superscriptAndSubscriptWrapper.superscriptContainer.addWrappers([i, innerWrapper]);
        }
        for (var i = 0; i < jsonObj.operands.subscript.length; i++) {
            var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.subscript[i].type);
            var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.subscript[i], equation);
            superscriptAndSubscriptWrapper.subscriptContainer.addWrappers([i, innerWrapper]);
        }
        return superscriptAndSubscriptWrapper;
    }
})();