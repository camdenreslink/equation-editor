function PropertyRepo() {
    this.uniqueId = 0;
    this.dependsOn = {};
    this.isDependedOnBy = {};
    this.idMapping = {};
    this.isScan = false;
    this.currentlyScanning = null;
    this.isScanConditional = false;
    this.conditionalDeps = [];
}

PropertyRepo.prototype.resolveDependencies = function(node) {
  // prop is a vertice in a Directed Acyclic Graph (DAG)
  // Need to perform topological sort on the graph, and
  // call compute() on all reachable vertices (properties)
  // in the correct order. Should be able to detect cycles
  // and throw an exception stating such.
  
  var visible = [];
  // Using Depth First Search to mark visibility (only want to update dependencies that are visible).
  var depthFirst = function(node) {
    visible.push(node);
    for (var i = 0; i < this.isDependedOnBy[node].length; i++) {
      depthFirst(this.isDependedOnBy[node][i]);
    }
  };
  depthFirst(node.uniqueId);
  // Topological sort to make sure updates are done in the correct order.
  var generateOrder = function(inbound) {
    var noIncomingEdges = [];
    for (var key in inbound) {
      if (inbound.hasOwnProperty(key)) {
        if(inbound[key].length === 0) {
          // Only call update if visible.
          if (_.indexOf(visible, key) !== -1) {
            this.idMapping[key].compute();
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
  generateOrder(_.clone(this.dependsOn));
};

PropertyRepo.prototype.setUpDependencyGraph = function() {
  for (var propId in this.idMapping) {
    if (this.idMapping.hasOwnProperty(propId)) {
      this.idMapping[propId].scanCompute();
    }
  }
}

PropertyRepo.prototype.setUpProperty = function(ctx, propName, propObj, methods) {
  var repo = this;
  Object.defineProperty(ctx, propName,{
    get: function() {
      if (repo.isScan) {
        // This property is being accessed from within a "scanning" compute
        // method call!
        (repo.currentlyScanning).dependsOn(propObj[propName]);
      }
      if (repo.isScanConditional) {
        repo.conditionalDeps.push(propObj[propName]);
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
    conditionals: (typeof methods.conditionals !== "undefined") ? methods.conditionals : [],
    compute: function() {
      // by assigning the result to the original object,
      // this allows the compute method to just have to return
      // a value, instead of its own assignment.
      if (repo.isScan) {
        methods.compute.call(ctx);
      } else {
        ctx[propName] = methods.compute.call(ctx);
      }
    }
  }, repo);
};