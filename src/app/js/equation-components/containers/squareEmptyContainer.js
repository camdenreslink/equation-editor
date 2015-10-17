eqEd.SquareEmptyContainer = function(parent) {
    eqEd.Container.call(this, parent);
    this.className = "eqEd.SquareEmptyContainer";
    this.borderWidth = 4;
    this.fontSize = "fontSizeNormal";
    this.domObj = this.buildDomObj();

    this.squareEmptyContainerFillerWrapper = new eqEd.SquareEmptyContainerFillerWrapper(this.equation);
    this.addWrappers([0, this.squareEmptyContainerFillerWrapper]);

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
            var fontHeight = this.equation.fontMetrics.height[this.fontSize];
            return 0.5 * fontHeight - 0.5 * this.squareEmptyContainerFillerWrapper.height;
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
            var actualParentContainer = this.parent.parent;
            while (actualParentContainer instanceof eqEd.BracketContainer) {
                actualParentContainer = actualParentContainer.parent.parent;
            }
            return actualParentContainer.fontSize;
        },
        updateDom: function() {
            this.domObj.updateFontSize(this.fontSize);
        }
    }));

    // Set up the borderWidth calculation
    var borderWidth = 0;
    this.properties.push(new Property(this, "borderWidth", fontSize, {
        get: function() {
            return borderWidth;
        },
        set: function(value) {
            borderWidth = value;
        },
        compute: function() {
            return 0.088 * this.equation.fontMetrics.height["fontSizeNormal"];
        },
        updateDom: function() {
            this.domObj.updateBorderWidth(borderWidth);
        }
    }));

};
(function() {
    // subclass extends superclass
    eqEd.SquareEmptyContainer.prototype = Object.create(eqEd.Container.prototype);
    eqEd.SquareEmptyContainer.prototype.constructor = eqEd.SquareEmptyContainer;
    eqEd.SquareEmptyContainer.prototype.buildDomObj = function() {
        return new eqEd.ContainerDom(this,
            '<div class="eqEdContainer squareEmptyContainer ' + this.fontSize + '"></div>');
    };
})();