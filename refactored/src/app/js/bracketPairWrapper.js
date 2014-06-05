eqEd.BracketPairWrapper = function(bracketType, symbolSizeConfig) {
    eqEd.Wrapper.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.BracketPairWrapper";

    this.bracketType = bracketType;
    var bracketCtors = {
        "parenthesisBracket": {
            'left': eqEd.LeftParenthesisBracket,
            'right': eqEd.RightParenthesisBracket
        },
        "squareBracket": {
            'left': eqEd.LeftSquareBracket,
            'right': eqEd.RightSquareBracket
        },
        "curlyBracket": {
            'left': eqEd.LeftCurlyBracket,
            'right': eqEd.RightCurlyBracket
        },
        "angleBracket": {
            'left': eqEd.LeftAngleBracket,
            'right': eqEd.RightAngleBracket
        },
        "floorBracket": {
            'left': eqEd.LeftFloorBracket,
            'right': eqEd.RightFloorBracket
        },
        "ceilBracket": {
            'left': eqEd.LeftCeilBracket,
            'right': eqEd.RightCeilBracket
        }
    };

    this.leftBracket = new bracketCtors[bracketType]['left'](symbolSizeConfig);
    this.bracketContainer = new eqEd.BracketContainer(symbolSizeConfig);
    this.rightBracket = new bracketCtors[bracketType]['right'](symbolSizeConfig);
    this.leftBracket.parent = this;
    this.bracketContainer.parent = this;
    this.rightBracket.parent = this;
    this.domObj = this.buildDomObj();
    this.domObj.append(this.leftBracket.domObj);
    this.domObj.append(this.bracketContainer.domObj);
    this.domObj.append(this.rightBracket.domObj);
    
    this.childContainers = [this.bracketContainer];
    this.childNoncontainers = [this.leftBracket, this.rightBracket];

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
            return this.leftBracket.width + this.bracketContainer.width + this.rightBracket.width;
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
            return 0.5 * this.leftBracket.height;
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
            return 0.5 * this.leftBracket.height;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.BracketPairWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.BracketPairWrapper.prototype.constructor = eqEd.BracketPairWrapper;
    eqEd.BracketPairWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="wrappper bracketPairWrapper ' + this.bracketType + '"></div>')
    };
    eqEd.BracketPairWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.symbolSizeConfig);

        copy.leftBracket = this.leftBracket.clone();
        copy.bracketContainer = this.bracketContainer.clone();
        copy.rightBracket = this.rightBracket.clone();
        copy.leftBracket.parent = copy;
        copy.bracketContainer.parent = copy;
        copy.rightBracket.parent = copy;
        copy.domObj = copy.buildDomObj();
        copy.domObj.append(copy.leftBracket.domObj);
        copy.domObj.append(copy.bracketContainer.domObj);
        copy.domObj.append(copy.rightBracket.domObj);
        
        copy.childNoncontainers = [copy.leftBracket, copy.rightBracket];
        this.childContainers = [this.bracketContainer];

        return copy;
    }
})();