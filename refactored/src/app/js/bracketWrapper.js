eqEd.BracketWrapper = function(symbolSizeConfig, bracketType) {
	eqEd.Wrapper.call(this, symbolSizeConfig); // call super constructor.
	this.className = "eqEd.BracketWrapper";

    var bracketCtors = {
        "leftParenthesisBracket": eqEd.LeftParenthesisBracket,
        "rightParenthesisBracket": eqEd.RightParenthesisBracket,
        "leftSquareBracket": eqEd.LeftSquareBracket,
        "rightSquareBracket": eqEd.RightSquareBracket,
        "leftCurlyBracket": eqEd.LeftCurlyBracket,
        "rightCurlyBracket": eqEd.RightCurlyBracket,
        "leftAngleBracket": eqEd.LeftAngleBracket,
        "rightAngleBracket": eqEd.RightAngleBracket,
        "leftFloorBracket": eqEd.LeftFloorBracket,
        "rightFloorBracket": eqEd.RightFloorBracket,
        "leftCeilBracket": eqEd.LeftCeilBracket,
        "rightCeilBracket": eqEd.RightCeilBracket
    };

    this.bracket = new bracketCtors[bracketType];

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
            return this.bracket.width;
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
            return 0.5 * this.bracket.height;
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
            return 0.5 * this.bracket.height;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.BracketWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.BracketWrapper.prototype.constructor = eqEd.BracketWrapper;
    eqEd.BracketWrapper.prototype.clone = function() {
        var copy = new this.constructor(this.symbolSizeConfig);
        copy.domObj = copy.buildDomObj();
        if (this.wholeBracket !== null) {
            copy.wholeBracket = this.wholeBracket.clone();
            copy.wholeBracket.parent = copy;
            copy.domObj.append(copy.wholeBracket.domObj);
        } else {
            copy.wholeBracket = null;
        }
        if (this.topBracket !== null) {
            copy.topBracket = this.topBracket.clone();
            copy.topBracket.parent = copy;
            copy.domObj.append(copy.topBracket.domObj);
        } else {
            copy.topBracket = null;
        }
        copy.middleBrackets = [];
        for (var i = 0; i < this.middleBrackets.length; i++) {
            var middleBracket = this.middleBrackets[i].clone();
            middleBracket.parent = copy;
            copy.domObj.append(middleBracket.domObj);
            copy.middleBrackets.push(middleBracket);
        }
        if (this.bottomBracket !== null) {
            copy.bottomBracket = this.bottomBracket.clone();
            copy.bottomBracket.parent = copy;
            copy.domObj.append(copy.bottomBracket.domObj);
        } else {
            copy.bottomBracket = null;
        }

        this.childNoncontainers = [this.wholeBracket];

        return copy;
    };
})();