eqEd.WrapperDom = function(binding, html) {
  eqEd.EquationDom.call(this, binding, html); // call super constructor.
  this.className = "eqEd.WrapperDom";
}
// subclass extends superclass
eqEd.WrapperDom.prototype = Object.create(eqEd.EquationDom.prototype);
eqEd.WrapperDom.prototype.constructor = eqEd.WrapperDom;