eqEd.SquareRootDiagonal = function(symbolSizeConfig) {
    eqEd.Equation.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.SquareRootDiagonal";

    this.domObj = this.buildDomObj();
    this.adjustLeft = -0.035;

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
            var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
            return 0.58 * fontHeight + 0.05 * this.height;
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
            var fontHeight = this.symbolSizeConfig.height[this.parent.parent.fontSize];
            var heightVal = this.parent.radicandContainer.height;
            if (this.parent.radicandContainer.isMaxTopAlignRootWrapper) {
                heightVal += (this.parent.radicandContainer.padTopMaxChildAlignTopIsRoot + this.parent.radicandContainer.padBottomMaxChildAlignTopIsRoot) * fontHeight;
            } else {
                heightVal += (this.parent.radicandContainer.padTopMaxChildAlignTopIsNotRoot + this.parent.radicandContainer.padBottomMaxChildAlignTopIsNotRoot) * fontHeight;
            }
            return heightVal;
        },
        updateDom: function() {
            this.domObj.updateHeight(this.height);
        }
    }));

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
            return this.parent.radical.width;
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
    eqEd.SquareRootDiagonal.prototype = Object.create(eqEd.Equation.prototype);
    eqEd.SquareRootDiagonal.prototype.constructor = eqEd.SquareRootDiagonal;
    eqEd.SquareRootDiagonal.prototype.buildDomObj = function() {
        var htmlRep = '<div class="squareRootDiagonal" style="width: 130.0331px; height: 256.45282px;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 130.0331 256.45282" preserveAspectRatio="none"><g transform="translate(-391.39675,-547.35338)"><g transform="scale(1.1433177,0.87464752)" style="font-size:162.99891663px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;font-family:cmex10;-inkscape-font-specification:cmex10" id="text2989"><path d="m 342.3342,915.58351 0,-0.95508 c 0.053,-0.1064 0.0796,-0.21252 0.0796,-0.31835 0.053,-0.1064 0.0796,-0.21252 0.0796,-0.31836 L 448.42675,628.42526 c 0.42437,-1.37954 1.51208,-2.25503 3.26317,-2.62645 l 0.95507,0 c 1.75084,0.31836 2.89162,1.45914 3.42234,3.42234 l 0,0.95507 c -1.2e-4,0.10612 -0.0267,0.23877 -0.0796,0.39795 -1.2e-4,0.10612 -0.0266,0.21224 -0.0796,0.31836 L 349.97477,916.45899 c -0.42449,1.3262 -1.51221,2.17515 -3.26316,2.54686 l -0.95507,0 c -1.75098,-0.31865 -2.89176,-1.45943 -3.42234,-3.42234" style="" id="path2987" /></g></g></svg></div>';
        return new eqEd.EquationDom(this, htmlRep);
    };
})();