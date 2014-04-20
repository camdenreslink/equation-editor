// Not short circuited logical and
Boolean.prototype.and = function(bool) {
  var value = true;
  if (!this.valueOf()) {
    value = false;
  }
  if (!bool.valueOf()) {
    value = false;
  }
  return value;
};

// Not short circuited logical or
Boolean.prototype.or = function(bool) {
  var value = false;
  if (this.valueOf()) {
    value = true;
  }
  if (bool.valueOf()) {
    value = true;
  }
  return value;
};

function Property(propertyArgs) {
  this.uniqueId = (++Property.uniqueId).toString();
  this.context = propertyArgs.context;
  this.propertyName = propertyArgs.property;
  this.value = this.context[this.propertyName];
  this.compute = propertyArgs.compute;
  this.conditionals = [];
  Property.idMapping[this.uniqueId] = this;
}

Property.prototype.dependsOn = function(prop) {
  if (typeof Property.dependsOn[this.uniqueId] === "undefined") {
    Property.dependsOn[this.uniqueId] = [];
  }
  if (typeof Property.isDependedOnBy[prop.uniqueId] === "undefined") {
    Property.isDependedOnBy[prop.uniqueId] = [];
  }
  Property.dependsOn[this.uniqueId].push(prop.uniqueId);
  Property.isDependedOnBy[prop.uniqueId].push(this.uniqueId);
};

Property.prototype.scanCompute = function() {
  Property.isScan = true;
  Property.currentlyScanning = this;
  // Check if this property has already had its dependencies mapped,
  // i.e. this property has already had its compute method scanned.
  if (typeof Property.dependsOn[this.uniqueId] === "undefined") {
    //This property has not had its compute method scanned yet
    if (this.conditionals.length > 0) {
      // This property's compute method has conditionals within it.
      for (var i = 0; i < this.conditionals.length; i++) {
        var conditionalObj = this.conditionals[i];
        var conditionalDeps = getConditionalDeps(conditionalObj);
        for (var j = 0; j < conditionalDeps.length; j++) {
          conditionalDeps[j].scanCompute();
          Property.isScan = false;
          Property.currentlyScanning = null;
          conditionalDeps[j].compute();
          Property.isScan = true;
          Property.currentlyScanning = this;
        }
        if (conditionalObj.condition) {
          this.compute = conditionalObj.compute;
          break;
        }
      }
    }
    // At this point, the property should have a compute method
    // defined. Now we can do the scanning to set up the dependencies.
    this.compute();
  }
  Property.isScan = false;
  Property.currentlyScanning = null;
  return Property.dependsOn[this.uniqueId]
}

Property.uniqueId = 0;
Property.dependsOn = {};
Property.isDependedOnBy = {};
Property.idMapping = {};
Property.isScan = false;
Property.currentlyScanning = null;

Property.resolveDependencies = function(node) {
  // prop is a vertice in a Directed Acyclic Graph (DAG)
  // Need to perform topological sort on the graph, and
  // call compute() on all reachable vertices (properties)
  // in the correct order. Should be able to detect cycles
  // and throw an exception stating such.
  node = node.uniqueId;
  var visible = [];
  // Using Depth First Search to mark visibility (only want to update dependencies that are visible).
  var depthFirst = function(node) {
    visible.push(node);
    for (var i = 0; i < Property.isDependedOnBy[node].length; i++) {
      depthFirst(Property.isDependedOnBy[node][i]);
    }
  };
  depthFirst(node);
  // Topological sort to make sure updates are done in the correct order.
  var generateOrder = function(inbound) {
    var noIncomingEdges = [];
    for (var key in inbound) {
      if (inbound.hasOwnProperty(key)) {
        if(inbound[key].length === 0) {
          // Only call update if visible.
          if (_.indexOf(visible, key) !== -1) {
            Property.idMapping[key].compute();
          }
          noIncomingEdges.push(key);
          delete inbound[key];
        }
      }
    }
    
    for (var key in inbound) {
      if (inbound.hasOwnProperty(key)) {
        for (var i = 0; i < noIncomingEdges.length; i++) {
          inbound[key] = _.without(inbound[key], noIncomingEdges[i]);
        }
      }
    }
    
    // Check if the object has anymore nodes.
    for(var prop in inbound) {
      if (Object.prototype.hasOwnProperty.call(inbound, prop)) {
        generateOrder(inbound);
      }
    }
    
  };
  generateOrder(_.clone(Property.dependsOn));
};

Property.setUpDependencyGraph = function() {
  for (var propId in Property.idMapping) {
    if (Property.idMapping.hasOwnProperty(propId)) {
      Property.idMapping[propId].scanCompute();
    }
  }
}

Property.setUpProperty = function(ctx, propName, propObj, methods) {
  Object.defineProperty(ctx, propName,{
    get: function() {
      if (Property.isScan) {
        // This property is being accessed from within a "scanning" compute
        // method call!
        Property.currentlyScanning.dependsOn(propObj[propName]);
      }
      return methods.get.call(ctx);
    },
    set: function(value) {
      methods.set.call(ctx, value);
      propObj[propName].value = ctx[propName];
    }
  });
  propObj[propName] = new Property({
    context: ctx,
    property: propName,
    compute: function() {
      // by assigning the result to the original object,
      // this allows the compute method to just have to return
      // a value, instead of its own assignment.
      if (Property.isScan) {
        methods.compute.call(ctx);
      } else {
        ctx[propName] = methods.compute.call(ctx);
      }
    }
  });
};

function MyClass() {
  this.properties = {};
  var a = null;
  var b = null;
  var c = null;
  var privateVar = 200;
  
  Property.setUpProperty(this, "a", this.properties, {
    // All 3 methods have access to the constructor scope.
    // get/set work the same as Object.defineProperty
    // return the value from compute that you want set to the property
    get: function() {
      return a;
    },
    set: function(value) {
      a = value;
    },
    compute: function() {
      return a;
    }
  });
  
  Property.setUpProperty(this, "b", this.properties, {
    // All 3 methods have access to the constructor scope.
    // get/set work the same as Object.defineProperty
    // return the value from compute that you want set to the property
    get: function() {
      return b;
    },
    set: function(value) {
      b = value;
    },
    compute: function() {
      return b;
    }
  });
  
  Property.setUpProperty(this, "c", this.properties, {
    // All 3 methods have access to the constructor scope.
    // get/set work the same as Object.defineProperty
    // return the value from compute that you want set to the property
    get: function() {
      return c;
    },
    set: function(value) {
      c = value;
    },
    compute: function() {
      var newValue = this.a + this.b + privateVar;
      return newValue;
    }
  });
}

var myInstance = new MyClass();
Property.setUpDependencyGraph();
console.log(Property.idMapping);
console.log(Property.dependsOn);