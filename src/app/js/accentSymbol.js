eqEd.AccentSymbol = function(character, fontStyle, symbolSizeConfig) {
    eqEd.Symbol.call(this, character, fontStyle, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.AccentSymbol";

    // height has already been added to 
    // properties in superclass needs removed to be overriden
    for(var i = 0; i < this.properties.length; i++) {
        if (this.properties[i].propName === "height") {
            this.properties.splice(i, 1);
        }
    }

    this.domObj.addClass('accentSymbol');
    if (this.character === '&#729;') {
        this.domObj.addClass('dotAccent');
    } else if (this.character === '^') {
        this.domObj.addClass('hatAccent');
    }

    this.adjustLeft = 0.05;

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
            var leftOffset = 0.5 * (this.parent.width - this.width);
            return leftOffset;
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

    // Set up the topAlign calculation
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
        updateDom: function() {}
    }));

};
(function() {
    // subclass extends superclass
    eqEd.AccentSymbol.prototype = Object.create(eqEd.Symbol.prototype);
    eqEd.AccentSymbol.prototype.constructor = eqEd.AccentSymbol;
})();