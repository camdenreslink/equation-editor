eqEd.Wrapper = function(equation) {
    eqEd.EquationComponent.call(this); // call super constructor.
    this.className = "eqEd.Wrapper";
    
    this.equation = equation;

    this.topAlign = 0;
    this.bottomAlign = 0;
    this.index = null;
    this.childContainers = [];
    this.childNoncontainers = [];

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
            // special code added to prevent compute hook from
            // executing on this property.
            var leftVal = 0;
            if (this.index === 0) {
                leftVal = this.parent.padLeft;
            } else {
                var prevWrapper = this.parent.wrappers[this.index - 1];
                leftVal = prevWrapper.left + prevWrapper.width;
            }
            return leftVal;
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
            return this.parent.wrappers[this.parent.maxTopAlignIndex].topAlign - this.topAlign;
        },
        updateDom: function() {
            this.domObj.updateTop(this.top);
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
            // remember compute hooks get called.
            return this.topAlign + this.bottomAlign;
        },
        updateDom: function() {
            this.domObj.updateHeight(this.height);
        }
    }));

};
(function() {
    // subclass extends superclass
    eqEd.Wrapper.prototype = Object.create(eqEd.EquationComponent.prototype);
    eqEd.Wrapper.prototype.constructor = eqEd.Wrapper;
    eqEd.Wrapper.prototype.update = function() {
        // This first for loop is what does the actual computing
        // of the properties for this object.  It will also recursively
        // resolve all of the dependencies required to compute the 
        // properties in this object.
        for (var i = 0; i < this.properties.length; i++) {
            this.properties[i].compute();
        }
        // This loop will now recursiely through the equation,
        // ensuring that all connected objects in the equation will
        // have their compute() methods called and Dom updated.
        // An object could have a property that is not a dependency 
        // of the properties on this object. That is why this recursive
        // call is required.
        for (var i = 0; i < this.childContainers.length; i++) {
            this.childContainers[i].update();
        }
        for (var i = 0; i < this.childNoncontainers.length; i++) {
            this.childNoncontainers[i].update();
        }
    }
    eqEd.Wrapper.prototype.buildJsonObj = function() {}
    // Each wrapper class will need it's own clone() definition
    eqEd.Wrapper.prototype.clone = function() {};
})();