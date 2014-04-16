function Property(propertyArgs) {
  this.uniqueId = (++Property.uniqueId).toString();
  this.context = propertyArgs.context;
  this.propertyName = propertyArgs.property;
  this.value = this.context[this.propertyName];
  this.compute = propertyArgs.compute;
  Property.dependsOn[this.uniqueId] = [];
  Property.isDependedOnBy[this.uniqueId] = [];
  Property.idMapping[this.uniqueId] = this;
}
Property.prototype.dependsOn = function(prop) {
  Property.dependsOn[this.uniqueId].push(prop.uniqueId);
  Property.isDependedOnBy[prop.uniqueId].push(this.uniqueId);
};
// 
Property.prototype.noLongerDependsOn = function(prop) {
  var dependsOnArr = Property.dependsOn[this.uniqueId];
  var isDependedOnByArr = Property.isDependedOnBy[prop.uniqueId];
  var dependsOnRemoveIndex = dependsOnArr.indexOf(prop.uniqueId);
  var isDependedOnByRemoveIndex = isDependedOnByArr.indexOf(this.uniqueId);
  if (dependsOnRemoveIndex > -1) {
    dependsOnArr.splice(dependsOnRemoveIndex, 1);
  }
  if (isDependedOnByRemoveIndex > -1) {
    isDependedOnByArr.splice(isDependedOnByRemoveIndex, 1);
  }
};
// I'm not sure if a dereferencing step is required for memory considerations...
// Will totally remove a property from the dependency graph.
Property.prototype.dereference = function() {
  delete Property.idMapping[this.uniqueId];
  delete Property.dependsOn[this.uniqueId];
  // Loop through the properties that have an outbound vertice
  // connected to our dereferenced property.
  for (var propId in Property.isDependedOnBy) {
    // Only want properties not in the prototype chain
    if (Property.isDependedOnBy.hasOwnProperty(propId)) {
      var withProperty = Property.isDependedOnBy[propId];
      var withoutProperty = [];
      for (var i = 0; i < withProperty.length; i++) {
        if (withProperty[i] !== this.uniqueId) {
          withoutProperty.push(withProperty[i]);
        }
      }
      // This will be the dependency array with the dereferenced
      // property id removed.
      Property.isDependedOnBy[propId] = withoutProperty;
    }
  }
};
// Static properties
Property.uniqueId = 0;
Property.dependsOn = {};
Property.isDependedOnBy = {};
Property.idMapping = {};
Property.setUpProperty = function(ctx, propName, propObj, methods) {
  Object.defineProperty(ctx, propName,{
    get: function() {
      if (typeof this.property !== "undefined") {
        this.property.dependsOn(propObj[propName]);
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
      ctx[propName] = methods.compute.call(ctx);
    }
  });
  
  // Set up dependencies automagically
  var copy = Object.create(ctx);
  copy.property = propObj[propName];
  methods.compute.call(copy);
};
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

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

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
myInstance.a = 22;
myInstance.b = 14;
Property.resolveDependencies(myInstance.properties.c);
console.log(myInstance.a);
console.log(myInstance.b);
console.log(myInstance.c);
console.log(Property.dependsOn);
console.log(Property.isDependedOnBy);
console.log(Property.idMapping);