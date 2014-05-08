eqEd.SquareEmptyContainer = function(symbolSizeConfig) {
    eqEd.Container.call(this, symbolSizeConfig);
    this.SquareEmptyContainerFillerWrapper = new eqEd.SquareEmptyContainerFillerWrapper(symbolSizeConfig);
    this.addWrappers([0, this.SquareEmptyContainerFillerWrapper]);
    this.borderWidth = 4;
    this.fontSize = "fontSizeNormal";
    this.buildDomObj();
    
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
            var fontHeight = this.symbolSizeConfig.height[this.fontSize];
            return 0.5 * fontHeight - 0.5 * this.squareEmptyContainerFillerWrapper.height;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
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
            return this.squareEmptyContainerFillerWrapper.width;
        },
        updateDom: function() {
            this.domObj.updateWidth(this.width);
        }
    }));

    // Set up the height calculation
    var height = 0;
    this.properties.push(new Property(this, "height", height, {
        get: function() {
            return height;
        },
        set: function(value) {
            height = value;
        },
        compute: function() {
            return this.squareEmptyContainerFillerWrapper.height;
        },
        updateDom: function() {
            this.domObj.updateHeight(this.height);
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
            return this.parent.parent.fontSize;
        },
        updateDom: function() {
            this.domObj.updateFontSize(this.fontSize);
        }
    }));
};
(function() {
    eqEd.SquareEmptyContainer.prototype.buildDomObj = function() {
        return new eqEd.EquationDom(this,
            '<div class="container squareEmptyContainer ' + this.fontSize + '"></div>');
    };
})();