eqEd.Word = function(characters, fontStyle, symbolSizeConfig) {
    eqEd.Equation.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.Word";
    
    this.characters = characters.split("");
    this.fontStyle = fontStyle;
    this.domObj = this.buildDomObj();
    if (IEVersion >= 9) {
        if (this.fontStyle === "MathJax_MathItalic") {
            this.adjustTop = 0.345;
        } else {
            this.adjustTop = 0.3;
        }
    } else {
        if (this.fontStyle === "MathJax_MathItalic") {
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
        	var widthVal = 0;
        	for (var i = 0; i < this.characters.length; i++) {
        		widthVal += this.symbolSizeConfig.width[this.characters[i]][this.fontStyle][this.parent.parent.fontSize];
        	}
            return widthVal;
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
            var fontHeight = this.getFontHeight();
            return 1  * fontHeight;
        },
        updateDom: function() {
            this.domObj.updateHeight(this.height);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.Word.prototype = Object.create(eqEd.Equation.prototype);
    eqEd.Word.prototype.constructor = eqEd.Word;
    eqEd.Word.prototype.buildDomObj = function() {
        return new eqEd.EquationDom(this,
            '<div class="symbol ' + this.fontStyle + '">' + this.characters.join("") + '</div>');
    };
})();