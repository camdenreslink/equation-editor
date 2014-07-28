eqEd.EmptyContainerWrapper = function(symbolSizeConfig) {
    eqEd.Wrapper.call(this, symbolSizeConfig); // call super constructor.
    this.className = "eqEd.EmptyContainerWrapper";
};
(function() {
    // subclass extends superclass
    eqEd.EmptyContainerWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.EmptyContainerWrapper.prototype.constructor = eqEd.EmptyContainerWrapper;
})();