eqEd.SquareRootRadical = function(parent) {
    eqEd.BoundEquationComponent.call(this, parent); // call super constructor.
    this.className = "eqEd.SquareRootRadical";

    this.domObj = this.buildDomObj();

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
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            var widthVal = 0;
            if (this.parent.squareRootDiagonal.height < 2 * fontHeight) {
                widthVal = 0.4 * fontHeight;
            } else {
                widthVal = 0.5 * fontHeight;
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
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            var heightVal = 0;
            if (this.parent.squareRootDiagonal.height < 2 * fontHeight) {
                heightVal = 0.7 * fontHeight;
            } else {
                heightVal = 0.75 * fontHeight;
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
            // remember compute hooks get called.
            return 0;
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
            return this.parent.squareRootDiagonal.height - this.height;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
        }
    }));

};
(function() {
    // subclass extends superclass
    eqEd.SquareRootRadical.prototype = Object.create(eqEd.BoundEquationComponent.prototype);
    eqEd.SquareRootRadical.prototype.constructor = eqEd.SquareRootRadical;
    eqEd.SquareRootRadical.prototype.buildDomObj = function() {
        var htmlRep = '<div class="squareRootRadical" style="width: 74.842293px; height: 127.48769px;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 74.842293 127.48769" preserveAspectRatio="none"><defs id="defs4"><clipPath clipPathUnits="userSpaceOnUse" id="clipPath3765"><rect style="fill:#b1ded2;fill-opacity:1;stroke:none" id="rect3767" width="74.842293" height="127.62585" x="198.84776" y="668.99451" /></clipPath></defs><g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="translate(-198.84776,-668.99451)"><g clip-path="url(#clipPath3765)"><path d="m 265.30006,796.48219 -47.75994,-111.23309 -14.88621,11.47479 -3.82493,-3.82493 30.28931,-23.46646 44.65864,103.89336 109.8892,-228.9789 c 0.68896,-1.30943 1.89502,-1.96414 3.61817,-1.96415 1.17139,1e-5 2.17069,0.41351 2.99792,1.24052 0.8268,0.82701 1.2403,1.82632 1.24052,2.99791 -2.2e-4,0.68918 -0.0691,1.17161 -0.20676,1.44728 L 273.15667,794.51804 c -0.55144,1.30919 -1.61966,1.96391 -3.20467,1.96415 l -4.65194,0" style="" id="path2987" /></g></g></svg></div>';
        return new eqEd.EquationDom(this, htmlRep);
    };
})();