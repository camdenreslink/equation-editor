eqEd.BottomBracket = function(parent) {
    eqEd.BoundEquationComponent.call(this, parent); // call super constructor.
    this.className = "eqEd.BottomBracket";

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
};
(function() {
    // subclass extends superclass
    eqEd.BottomBracket.prototype = Object.create(eqEd.BoundEquationComponent.prototype);
    eqEd.BottomBracket.prototype.constructor = eqEd.BottomBracket;
    eqEd.BottomBracket.prototype.buildDomObj = function() {
        return new eqEd.EquationDom(this,
            '<div class="bottomBracket ' + this.fontStyle + '">' + this.character + '</div>');
    };
    eqEd.BottomBracket.prototype.clone = function() {
        var copy = new this.constructor(this.parent);
        return copy;
    };
})();