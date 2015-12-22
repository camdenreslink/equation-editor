eqEd.SuperscriptContainer = function(parent) {
	eqEd.Container.call(this, parent);
	this.className = "eqEd.SuperscriptContainer";

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
        	// remember compute hooks get called.
            return 0;
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
           	var baseWrapper = null;
	        if (this.parent.index !== 0) {
	            baseWrapper = this.parent.parent.wrappers[this.parent.index - 1];
	        } else {
	            // The superscript wrapper is the first entry in the container.
        		// We want to format it, as if there is a symbol immediately
        		// preceeding it.
        		baseWrapper = null;
	        }

            var actualParentContainer = this.parent.parent;
            while (actualParentContainer instanceof eqEd.BracketContainer) {
                actualParentContainer = actualParentContainer.parent.parent;
            }
            
	        if (actualParentContainer.fontSize === "fontSizeSmaller" || actualParentContainer.fontSize === "fontSizeSmallest") {
	            fontSizeVal = "fontSizeSmallest";
	        } else {
	            if (baseWrapper instanceof eqEd.SuperscriptWrapper
	             || baseWrapper instanceof eqEd.SuperscriptAndSubscriptWrapper) {
	                fontSizeVal = "fontSizeSmallest";
	            } else {
	                fontSizeVal = "fontSizeSmaller";
	            }
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
    eqEd.SuperscriptContainer.prototype = Object.create(eqEd.Container.prototype);
    eqEd.SuperscriptContainer.prototype.constructor = eqEd.SuperscriptContainer;
    eqEd.SuperscriptContainer.prototype.buildDomObj = function() {
        return new eqEd.ContainerDom(this,
            '<div class="eqEdContainer superscriptContainer"></div>');
    };
})();