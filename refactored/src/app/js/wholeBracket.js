eqEd.WholeBracket = function(character, fontStyle, symbolSizeConfig) {
    eqEd.Equation.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.WholeBracket";
    
    this.character = character;
    this.fontStyle = fontStyle;
    this.domObj = this.buildDomObj();
    this.adjustLeft = 0.001;
    if (this.fontStyle === "MathJax_Size3") {
        this.adjustTop = 0.71;
    } else if (this.fontStyle === "MathJax_Size4") {
        this.adjustTop = 1.01;
    } else {
        this.adjustTop = 0;
    }
    if (IEVersion >= 9) {
        this.adjustTop += (-0.02 + 0.3);
    }
    
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
            // remember compute hooks get called.
            return 0;
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
            // remember compute hooks get called.
            return 0;
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
            return 0;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));

};
(function() {
    // subclass extends superclass
    eqEd.WholeBracket.prototype = Object.create(eqEd.Equation.prototype);
    eqEd.WholeBracket.prototype.constructor = eqEd.WholeBracket;
    eqEd.WholeBracket.prototype.buildDomObj = function() {
        return new eqEd.EquationDom(this,
            '<div class="wholeBracket ' + this.fontStyle + '">' + this.character + '</div>');
    };
})();