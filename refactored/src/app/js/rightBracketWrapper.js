eqEd.RightBracketWrapper = function(symbolSizeConfig) {
	eqEd.BracketWrapper.call(this, symbolSizeConfig); // call super constructor.
	this.className = "eqEd.RightBracketWrapper";

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
            var sameBracketTypeCounter = 0;
            var matchingBracketIndex = null;
            var maxTopAlign = 0;
            var maxBottomAlign = 0;
            for (var i = (this.index - 1); i >= 0; i--) {
                var wrapper = this.parent.wrappers[i];
                if (wrapper instanceof this.constructor) {
                    sameBracketTypeCounter++;
                } else if (wrapper instanceof this.matchingBracketCtor 
                            && sameBracketTypeCounter === 0) {
                    matchingBracketIndex = i;
                    break;
                }
                maxTopAlign = (wrapper.topAlign > maxTopAlign) ? wrapper.topAlign : maxTopAlign;
                maxBottomAlign = (wrapper.bottomAlign > maxBottomAlign) ? wrapper.bottomAlign : maxBottomAlign;
            }
            var heightVal = (maxTopAlign > maxBottomAlign) ? 2 * maxTopAlign  : 2 * maxBottomAlign;
            return heightVal;
        },
        updateDom: function() {
            this.domObj.updateHeight(this.height);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.RightBracketWrapper.prototype = Object.create(eqEd.BracketWrapper.prototype);
    eqEd.RightBracketWrapper.prototype.constructor = eqEd.RightBracketWrapper;
})();