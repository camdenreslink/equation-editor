function Property(ctx, propName, initialValue, methods) {
  // methods should be get, set, compute, updateDom.
  this.uniqueId = ++Property.uniqueId;
  this.isAlreadyComputed = false;
  this.ctx = ctx;
  this.propName = propName;
  this.value = initialValue;
  var self = this;
  Object.defineProperty(ctx, propName,{
      get: function() {
          if (!self.isAlreadyComputed && Property.isComputing) {
            self.compute();
          }
          return methods.get.call(ctx);
      },
      set: function(value) {
          methods.set.call(ctx, value);
      }
    });
    this.compute = function() {
      if (!self.isAlreadyComputed) {
        var oldValue = self.value;
        // ** NOTE: Do not reference the property being computed
        // in the compute method using "this" (e.g. this.prop1).
        // This will cause an infinite loop, and stack overflow.
        // Instead, reference the corresponding private variable
        // in the constructor.
        self.value = methods.compute.call(ctx);
        if (typeof Property.postComputeHooks[self.propName] !== "undefined") {
          self.value = Property.postComputeHooks[self.propName].call(ctx, self.value);
        }
        if (typeof Property.postComputeHooks["all"] !== "undefined") {
          self.value = Property.postComputeHooks["all"].call(ctx, self.value, self.propName);
        }
        ctx[propName] = self.value;
        self.isAlreadyComputed = true;
        Property.alreadyComputed.push(self);
        self.updateDom(oldValue);
      }
    };
    this.updateDom = function(oldValue) {
      var isNumeric = !isNaN(self.value);
      var isString = Object.prototype.toString.call(self.value) === '[object String]';
      if (isNumeric) {
        if (Math.abs(oldValue - self.value) >= 0.001) {
          methods.updateDom.call(ctx);
        }
      } else if (isString) {
        if (oldValue !== self.value) {
          methods.updateDom.call(ctx);
        }
      }
    };
}
Property.alreadyComputed = [];
Property.isComputing = false;
Property.uniqueId = 0;
Property.postComputeHooks = {};
Property.beginComputing = function() {
  Property.isComputing = true;
};
Property.endComputing = function() {
  for (var i = 0; i < Property.alreadyComputed.length; i++) {
      Property.alreadyComputed[i].isAlreadyComputed = false;
  }
  Property.alreadyComputed = [];
  Property.isComputing = false;
};