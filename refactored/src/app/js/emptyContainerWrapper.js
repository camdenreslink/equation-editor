eqEd.EmptyContainerWrapper = function() {
    eqEd.Wrapper.call(this); // call super constructor.
};
(function() {
    // subclass extends superclass
    eqEd.EmptyContainerWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
    eqEd.EmptyContainerWrapper.prototype.constructor = eqEd.EmptyContainerWrapper;
})();