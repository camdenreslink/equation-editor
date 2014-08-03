eqEd.SuperscriptWrapper = function(symbolSizeConfig) {
	eqEd.Wrapper.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.SuperscriptWrapper";

    this.superscriptContainer = new eqEd.SuperscriptContainer(symbolSizeConfig);
    this.superscriptContainer.parent = this;
    this.domObj = this.buildDomObj();
    this.domObj.append(this.superscriptContainer.domObj);
    this.childContainers = [this.superscriptContainer];
    this.maxBaseWrapperOverlap = 0.9;

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
            return this.superscriptContainer.width;
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
        	var baseWrapper = null;
        	var base = null;
        	var baseWrapperOverlap = 0.75;
        	var superscriptContainerBottomAlign = 0;
        	if (this.superscriptContainer.wrappers.length !== 0) {
        		superscriptContainerBottomAlign = this.superscriptContainer.wrappers[this.superscriptContainer.maxBottomAlignIndex].bottomAlign;
        	}
        	if (this.index !== 0) {
        		baseWrapper = this.parent.wrappers[this.index - 1];
        		if (baseWrapper instanceof eqEd.SuperscriptWrapper || baseWrapper instanceof eqEd.SuperscriptAndSubscriptWrapper) {
        			base = baseWrapper.superscriptContainer;
        			fontHeight = this.symbolSizeConfig.height[base.fontSize];
        		} else {
        			if (baseWrapper instanceof eqEd.SquareRootWrapper) {
	                    baseWrapperOverlap = (superscriptContainerBottomAlign / baseWrapper.height);
	                    if (baseWrapperOverlap <= this.maxBaseWrapperOverlap) {
	                        baseWrapperOverlap = baseWrapperOverlap;
	                    } else {
	                        baseWrapperOverlap = this.maxBaseWrapperOverlap;
	                    }
	                }
	                if (baseWrapper instanceof eqEd.NthRootWrapper) {
	                    var baseWrapperOverlap = (superscriptContainerBottomAlign / baseWrapper.nthRootDiagonal.height);
	                    if (baseWrapperOverlap <= this.maxBaseWrapperOverlap) {
	                        baseWrapperOverlap = baseWrapperOverlap;
	                    } else {
	                        baseWrapperOverlap = this.maxBaseWrapperOverlap;
	                    }
	                }
	                base = baseWrapper;
        		}
        	} else {
        		// The superscript wrapper is the first entry in the container.
        		// We want to format it, as if there is a symbol immediately
        		// preceeding it.
        		baseWrapper = new eqEd.SymbolWrapper('a', 'MathJax_MathItalic', this.symbolSizeConfig);
        		baseWrapper.parent = this.parent;
        		baseWrapper.index = 0;
                // Can't just call baseWrapper.update(), because it creates a circular reference
                for (var i = 0; i < baseWrapper.properties.length; i++) {
                    var prop = baseWrapper.properties[i];
                    if (prop.propName !== "top" && prop.propName !== "left") {
                        prop.compute();
                    }
                }
        		base = baseWrapper;
        	}
        	var topAlign = 0;
        	if (baseWrapper instanceof eqEd.NthRootWrapper) {
	            if (this.superscriptContainer.offsetTop * fontHeight + superscriptContainerBottomAlign > baseWrapper.nthRootDiagonal.height * baseWrapperOverlap) {
	                topAlign = this.superscriptContainer.height - (baseWrapper.nthRootDiagonal.height * baseWrapperOverlap - (base.topAlign - (base.height - baseWrapper.nthRootDiagonal.height)));
	            } else {
	                topAlign = (baseWrapper.topAlign - (base.height - baseWrapper.nthRootDiagonal.height)) + this.superscriptContainer.height - superscriptContainerBottomAlign - this.superscriptContainer.offsetTop * fontHeight;
	            }
	        } else {
	            if (this.superscriptContainer.offsetTop * fontHeight + superscriptContainerBottomAlign > base.height * baseWrapperOverlap) {
	                topAlign = this.superscriptContainer.height - (base.height * baseWrapperOverlap - baseWrapper.topAlign);
	            } else {
	                topAlign = baseWrapper.topAlign + this.superscriptContainer.height - superscriptContainerBottomAlign - this.superscriptContainer.offsetTop * fontHeight;
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
        	if (this.index !== 0) {
        		baseWrapper = this.parent.wrappers[this.index - 1];
        	} else {
        		// The superscript wrapper is the first entry in the container.
        		// We want to format it, as if there is a symbol immediately
        		// preceeding it.
        		baseWrapper = new eqEd.SymbolWrapper('a', 'MathJax_MathItalic', this.symbolSizeConfig);
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
            return baseWrapper.bottomAlign;
        },
        updateDom: function() {}
    }));
};

(function() {
    // subclass extends superclass
    eqEd.SuperscriptWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.SuperscriptWrapper.prototype.constructor = eqEd.SuperscriptWrapper;
    eqEd.SuperscriptWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="eqEdWrapper superscriptWrapper"></div>')
    };
    eqEd.SuperscriptWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.symbolSizeConfig);
        copy.superscriptContainer = this.superscriptContainer.clone();
    	copy.superscriptContainer.parent = copy;
    	copy.domObj = copy.buildDomObj();
    	copy.domObj.append(copy.superscriptContainer.domObj);
    	copy.childContainers = [copy.superscriptContainer];
        return copy;
    };
    eqEd.SuperscriptWrapper.prototype.buildJsonObj = function() {
        var jsonObj = {
            type: this.className.substring(5, this.className.length - 7),
            value: null,
            operands: {
                superscript: this.superscriptContainer.buildJsonObj()
            }
        };
        return jsonObj;
    };
    eqEd.SuperscriptWrapper.constructFromJsonObj = function(jsonObj, symbolSizeConfig) {
        var superscriptWrapper = new eqEd.SuperscriptWrapper(symbolSizeConfig);
        for (var i = 0; i < jsonObj.operands.superscript.length; i++) {
            var innerWrapperCtor = eqEd.Equation.JsonTypeToConstructor(jsonObj.operands.superscript[i].type);
            var innerWrapper = innerWrapperCtor.constructFromJsonObj(jsonObj.operands.superscript[i], symbolSizeConfig);
            superscriptWrapper.superscriptContainer.addWrappers([i, innerWrapper]);
        }
        return superscriptWrapper;
    }
})();