eqEd.FunctionLowerWord = function(characters, fontStyle, symbolSizeConfig) {
    eqEd.Word.call(this, characters, fontStyle, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.FunctionLowerWord";

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
            var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
            var leftOffset = 0.5 * ((this.parent.width - (this.parent.padLeft + this.parent.padRight) * fontHeight) - this.width);
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

};
(function() {
    // subclass extends superclass
    eqEd.FunctionLowerWord.prototype = Object.create(eqEd.Word.prototype);
    eqEd.FunctionLowerWord.prototype.constructor = eqEd.FunctionLowerWord;
})();