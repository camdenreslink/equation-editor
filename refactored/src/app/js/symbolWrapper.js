eqEd.SymbolWrapper = function(character, fontStyle, symbolSizeConfig) {
	eqEd.Wrapper.call(this); // call super constructor.
	this.symbol = new eqEd.Symbol(character, fontStyle, symbolSizeConfig);
	this.symbol.parent = this;
	this.domObj = this.buildDomObj();
	this.domObj.append(this.symbol.domObj);
	this.childNoncontainers = [this.symbol];

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
        	//console.log("compute: " + (this.symbol.width + this.padLeft + this.padRight));
            return this.symbol.width + this.padLeft + this.padRight;
        },
        updateDom: function() {
        	//console.log("update: " + this.width);
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
            return 0.5 * this.symbol.height + this.padTop;
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
            return 0.5 * this.symbol.height + this.padBottom;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.SymbolWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.SymbolWrapper.prototype.constructor = eqEd.SymbolWrapper;
    eqEd.SymbolWrapper.prototype.clone = function() {
    	return new this.constructor(this.symbol.clone());
    };
    eqEd.SymbolWrapper.prototype.buildDomObj = function() {
        return new eqEd.EquationDom(this,
            '<div class="wrapper symbolWrapper"></div>')
    }
})();