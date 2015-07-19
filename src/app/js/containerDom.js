eqEd.ContainerDom = function(binding, html) {
  eqEd.EquationDom.call(this, binding, html); // call super constructor.
  this.className = "eqEd.ContainerDom";
}
// subclass extends superclass
eqEd.ContainerDom.prototype = Object.create(eqEd.EquationDom.prototype);
eqEd.ContainerDom.prototype.constructor = eqEd.ContainerDom;
eqEd.ContainerDom.prototype.addWrapper = function(index, wrapper) {
    this.value.insertAt(index, wrapper.domObj.value);
}
eqEd.ContainerDom.prototype.removeWrapper = function(index) {
    this.value.children().eq(index).remove();
}

eqEd.ContainerDom.prototype.updateClipping = function(clipping) {
	this.value.css('clip', 'rect(' + clipping + ')');
}