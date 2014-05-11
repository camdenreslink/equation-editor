eqEd.TopLevelEmptyContainerMessage = function(symbolSizeConfig) {
    eqEd.Equation.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.TopLevelEmptyContainerMessage";
    
    this.message = "Enter&nbsp;Your&nbsp;Equation&nbsp;Here";
    this.fontSize = "fontSizeMessage";
    this.domObj = this.buildDomObj();
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
            // not good; jQuery specific function width() in code.
            // wanted to abstract through domObj.
            return this.domObj.value.width();
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
            // not good; jQuery specific function height() in code.
            // wanted to abstract through domObj.
            return this.domObj.value.height();
        },
        updateDom: function() {
            this.domObj.updateHeight(this.height);
        }
    }));

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
            var fontHeight = this.getFontHeight();
            return 0.5*(this.parent.height - this.height);
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));

};
(function() {
    // subclass extends superclass
    eqEd.TopLevelEmptyContainerMessage.prototype = Object.create(eqEd.Equation.prototype);
    eqEd.TopLevelEmptyContainerMessage.prototype.constructor = eqEd.TopLevelEmptyContainerMessage;
    eqEd.TopLevelEmptyContainerMessage.prototype.clone = function() {
        // character doesn't need cloned, because it isn't an object, it's
        // a native type.  symbolSizeConfig doesn't need cloned, because
        // it is a singleton over the equation life cycle. Only need a 
        // reference to the singleton.
        return new this.constructor();
    };
    eqEd.TopLevelEmptyContainerMessage.prototype.buildDomObj = function() {
        return new eqEd.EquationDom(this,
            '<span class="topLevelEmptyContainerMessage ' + this.fontSize + '">' + this.message + '</span>');
    };
})();