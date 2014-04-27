function Property(ctx, propName, initialValue, methods) {
  // methods should be get, set, compute, updateDom.
  this.isAlreadyComputed = false;
  this.ctx = ctx;
  this.propName = propName;
  this.value = initialValue;
  var self = this;
  Object.defineProperty(ctx, propName,{
      get: function() {
          if (!self.isAlreadyComputed && Property.isComputing) {
            self.compute();
            self.isAlreadyComputed = true;
            Property.alreadyComputed.push(self);
            
          }
          return methods.get.call(ctx);
      },
      set: function(value) {
          methods.set.call(ctx, value);
      }
    });
    this.compute = function() {
      var oldValue = self.value;
      // ** NOTE: Do not reference the property being computed
      // in the compute method using "this" (e.g. this.prop1).
      // This will cause an infinite loop, and stack overflow.
      // Instead, reference the corresponding private variable
      // in the constructor.
      self.value = methods.compute.call(ctx);
      ctx[propName] = self.value;
      self.updateDom(oldValue);
    };
    this.updateDom = function(oldValue) {
      // This assumes the property has a numeric value.
      // Will have to update to see what type it is
      // before testing if the value has changed.
      if (Math.abs(oldValue - self.value) >= 1) {
        methods.updateDom.call(ctx);
      }
    };
}
Property.alreadyComputed = [];
Property.isComputing = false;