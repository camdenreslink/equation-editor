eqEd.Wrapper = function() {
    eqEd.Equation.call(this); // call super constructor.
    this.topAlign = 0;
    this.bottomAlign = 0;
    this.index = null;
    this.childContainers = [];
    this.childNoncontainers = [];
};
(function() {
    // subclass extends superclass
    eqEd.Wrapper.prototype = Object.create(eqEd.Equation.prototype);
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
})();