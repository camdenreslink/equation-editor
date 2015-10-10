eqEd.EmptyContainerWrapper = function(fontMetrics) {
    eqEd.Wrapper.call(this, fontMetrics); // call super constructor.
    this.className = "eqEd.EmptyContainerWrapper";
};
(function() {
    // subclass extends superclass
    eqEd.EmptyContainerWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.EmptyContainerWrapper.prototype.constructor = eqEd.EmptyContainerWrapper;
})();