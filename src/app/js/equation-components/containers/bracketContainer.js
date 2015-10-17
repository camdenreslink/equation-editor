eqEd.BracketContainer = function(parent) {
    eqEd.Container.call(this, parent);
    this.className = "eqEd.BracketContainer";

    this.domObj = this.buildDomObj();
    var squareEmptyContainerWrapper = new eqEd.SquareEmptyContainerWrapper(this.equation);
    this.addWrappers([0, squareEmptyContainerWrapper]);

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
            return this.parent.leftBracket.width;
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
            var topVal = 0;
            if (this.wrappers.length > 0) {
                /*
                var maxTopAlign = this.wrappers[this.maxTopAlignIndex].topAlign;
                topVal = 0.5 * this.parent.leftBracket.height - maxTopAlign;
                */
                var containerTopAlign = this.wrappers[this.maxTopAlignIndex].topAlign;
                var bracketTopAlign = 0.5 * this.parent.leftBracket.height;
                if (bracketTopAlign > containerTopAlign) {
                    topVal = bracketTopAlign - containerTopAlign;
                }
            }
            return topVal;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));

    // Set up the fontSize calculation
    var fontSize = "";
    this.properties.push(new Property(this, "fontSize", fontSize, {
        get: function() {
            return fontSize;
        },
        set: function(value) {
            fontSize = value;
        },
        compute: function() {
            var fontSizeVal = "";
            var actualParentContainer = this.parent.parent;
            while (actualParentContainer instanceof eqEd.BracketContainer) {
                actualParentContainer = actualParentContainer.parent.parent;
            }
            fontSizeVal = actualParentContainer.fontSize;
            return fontSizeVal;
        },
        updateDom: function() {
            this.domObj.updateFontSize(this.fontSize);
        }
    }));
};

(function() {
    // subclass extends superclass
    eqEd.BracketContainer.prototype = Object.create(eqEd.Container.prototype);
    eqEd.BracketContainer.prototype.constructor = eqEd.BracketContainer;
    eqEd.BracketContainer.prototype.buildDomObj = function() {
        return new eqEd.ContainerDom(this,
            '<div class="eqEdContainer bracketContainer"></div>');
    };
})();