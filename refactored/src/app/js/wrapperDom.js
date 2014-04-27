eqEd.WrapperDom = function(binding, html) {
  eqEd.EquationDom.call(this, binding, html); // call super constructor.
}
// subclass extends superclass
eqEd.WrapperDom.prototype = Object.create(eqEd.EquationDom.prototype);
eqEd.WrapperDom.prototype.constructor = eqEd.WrapperDom;