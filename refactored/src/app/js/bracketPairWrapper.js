eqEd.BracketPairWrapper = function(symbolSizeConfig) {
    eqEd.Wrapper.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.BracketPairWrapper";

    // Brackets themselves will be created in specific BracketPair classes that
    // inherit from this superclass.
    this.leftBracketPair = null;
    this.bracketContainer = new eqEd.BracketContainer(symbolSizeConfig);
    this.rightBracketPair = null;
    this.bracketContainer.parent = this;
    this.domObj = this.buildDomObj();
    this.domObj.append(this.bracketContainer.domObj);
    
    this.childContainers = [this.bracketContainer];

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
            return this.leftBracketPair.width + this.bracketContainer.width + this.rightBracketPair.width;
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
            return this.bracketContainer.wrappers[this.bracketContainer.maxTopAlignIndex];
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
            return this.bracketContainer.wrappers[this.bracketContainer.maxBottomAlignIndex];
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.BracketPairWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.BracketPairWrapper.prototype.constructor = eqEd.BracketPairWrapper;
    eqEd.BracketPairWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.symbolSizeConfig);

        copy.leftBracketPair = this.leftBracketPair.clone();
        copy.bracketContainer = this.bracketContainer.clone();
        copy.rightBracketPair = this.rightBracketPair.clone();
        copy.leftBracketPair.parent = copy;
        copy.bracketContainer.parent = copy;
        copy.rightBracketPair.parent = copy;
        copy.domObj = copy.buildDomObj();
        copy.domObj.append(copy.leftBracketPair.domObj);
        copy.domObj.append(copy.bracketContainer.domObj);
        copy.domObj.append(copy.rightBracketPair.domObj);
        
        copy.childNoncontainers = [copy.leftBracketPair, copy.rightBracketPair];
        this.childContainers = [this.bracketContainer];

        return copy;
    }
})();