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
            var oldValue = self.value;
            self.compute();
            self.isAlreadyComputed = true;
            Property.alreadyComputed.push(self);
            self.updateDom(oldValue);
          }
          return methods.get.call(ctx);
      },
      set: function(value) {
          self.value = value;
          methods.set.call(ctx, value);
      }
    });
    this.compute = function() {
      this.value = methods.compute.call(ctx);
      ctx[propName] = this.value;
    };
    this.updateDom = function(oldValue) {
      // This assumes the property has a numeric value.
      // Will have to update to see what type it is
      // before testing if the value has changed.
      console.log(oldValue + ", " + this.value)
      if (Math.abs(oldValue - this.value) >= 1) {
        methods.updateDom(ctx);
      }
    };
}
Property.alreadyComputed = [];
Property.isComputing = false;