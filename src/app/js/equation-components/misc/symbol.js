eqEd.Symbol = function(parent, character, fontStyle) {
    eqEd.BoundEquationComponent.call(this, parent); // call super constructor.
    this.className = "eqEd.Symbol";
    
    this.character = character;
    this.fontStyle = fontStyle;
    this.domObj = this.buildDomObj();
    
    if (IEVersion >= 9) {
        if (this.fontStyle === "MathJax_MathItalic") {
            this.adjustTop = 0.340;
        } else {
            this.adjustTop = 0.280;
        }
    } else {
        if (this.fontStyle === "MathJax_MathItalic") {
            this.adjustTop = 0.085
        } else {
            this.adjustTop = 0.025;
        }
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
            return this.equation.fontMetrics.width[this.character][this.fontStyle][this.parent.parent.fontSize];
        },
        updateDom: function() {
            // This doesn't really belong here, but it is a convenient callback
            if (this.parent !== null 
                &&this.parent.parent.parent instanceof eqEd.AccentContainer) {
                if (this.character === 'i') {
                    this.character = 'ı';
                    this.domObj = this.buildDomObj();
                } else if (this.character === 'j') {
                    this.character = 'ȷ';
                    this.domObj = this.buildDomObj();
                }
            }
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
            var fontHeight = this.getFontHeight();
            return 1 * fontHeight;
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
    eqEd.Symbol.prototype = Object.create(eqEd.BoundEquationComponent.prototype);
    eqEd.Symbol.prototype.constructor = eqEd.Symbol;
    eqEd.Symbol.prototype.buildDomObj = function() {
        return new eqEd.EquationDom(this,
            '<div class="symbol ' + this.fontStyle + '">' + this.character + '</div>');
    };
})();