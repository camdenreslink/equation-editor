// This class can only be inherited from. It should not be instantiated.
// Bound equation components are always tied to their parent wrapper.
eqEd.BoundEquationComponent = function(parent) {
  eqEd.EquationComponent.call(this); // call super constructor.
  this.className = "eqEd.BoundEquationComponent";
  this.parent = parent;
  this.equation = (parent === null) ? null : parent.equation;
};

(function() {
    // subclass extends superclass
    eqEd.BoundEquationComponent.prototype = Object.create(eqEd.EquationComponent.prototype);
    eqEd.BoundEquationComponent.prototype.clone = function() {
        return new this.constructor(this.parent);
    };
})();