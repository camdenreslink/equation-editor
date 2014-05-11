eqEd.SymbolWrapper = function(character, fontStyle, symbolSizeConfig) {
	eqEd.Wrapper.call(this, symbolSizeConfig); // call super constructor.
	this.className = "eqEd.SymbolWrapper";

    this.symbol = new eqEd.Symbol(character, fontStyle, symbolSizeConfig);
	this.symbol.parent = this;
	this.domObj = this.buildDomObj();
	this.domObj.append(this.symbol.domObj);
	this.childNoncontainers = [this.symbol];

    if ((/[A-Z]/).test(character)) {
        this.padRight = 0.075;
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
            return this.symbol.width;
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
            return 0.5 * this.symbol.height;
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
            return 0.5 * this.symbol.height;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.SymbolWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.SymbolWrapper.prototype.constructor = eqEd.SymbolWrapper;
    eqEd.SymbolWrapper.prototype.clone = function() {
    	return new this.constructor(this.symbol.character, this.symbol.fontStyle, this.symbolSizeConfig);
    };
    eqEd.SymbolWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="wrapper symbolWrapper"></div>')
    };
})();