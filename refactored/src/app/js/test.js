function Property(initialValue, ctx) {
	// Each property will get a unique id.
    this.id = (++Property.id).toString();
    this.value = initialValue;
    this.isUpdated = false;
    this.context = ctx;
    Property.dependsOn[this.id] = [];
    Property.isDependedOnBy[this.id] = [];
    Property.idMapping[this.id] = this;
}
// Static properties on Property function.
Property.id = 0;
Property.dependsOn = {};
Property.isDependedOnBy = {};
Property.idMapping = {};

// Calling this updates all dependencies from the node outward.
Property.resolveDependencies = function(node) {
	node = node.id;
	var visible = [];
	// Using Depth First Search to mark visibility (only want to update dependencies that are visible).
	var depthFirst = function(node) {
	  visible.push(node);
	  console.log(node);
	  console.log(Property.isDependedOnBy);
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
	          Property.idMapping[key].computeValue();
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
Property.prototype.get = function() {
	return this.value;
}
Property.prototype.set = function(value) {
	this.value = value;
}
Property.prototype.computeValue = function() {
	// Call code that updates this.value.
};
Property.prototype.dependsOn = function(prop) {
	Property.dependsOn[this.id].push(prop.id);
    Property.isDependedOnBy[prop.id].push(this.id);
}

function PropertyFactory(methodObject) {
	var self = this;
    var PropType = function(initialValue) {
        Property.call(this, initialValue, self);
    }
    PropType.prototype = Object.create(Property.prototype);
    PropType.prototype.constructor = PropType;
    if (methodObject.get !== null) {
    	PropType.prototype.get = methodObject.get;
    }
    if (methodObject.set !== null) {
    	PropType.prototype.set = methodObject.set;
    }
    if (methodObject.computeValue !== null) {
    	PropType.prototype.computeValue = methodObject.computeValue;
    }
    
    return new PropType(methodObject.initialValue);
}

function MyClassContainer() {
	this.children = [];
    this.prop = PropertyFactory.call(this, {
    	initialValue: 0,
    	get: null,
    	set: null,
    	computeValue: function() {
    		var self = this.context;
    		var updatedVal = self.children[0].prop.get() + self.children[1].prop.get();
    		this.set(updatedVal);
    	}
    });

}
MyClassContainer.prototype.addChildren = function(child) {
	if (this.children.length === 0 || this.children.length === 1) {
		this.prop.dependsOn(child.prop);
	}
	this.children.push(child);
}

function MyClass() {
	this.prop = PropertyFactory.call(this, {
		initialValue: 5,
		get: null,
		set: null,
		computeValue: null
	});
}

var c = new MyClassContainer();
var c1 = new MyClass();
var c2 = new MyClass();
c.addChildren(c1);
c.addChildren(c2);

console.log(Property.dependsOn);
console.log(Property.isDependedOnBy);
console.log(Property.idMapping);

c.prop.computeValue();
console.log("c: " + c.prop.get());
console.log("c1: " + c1.prop.get());
console.log("c2: " + c2.prop.get());
console.log("//////// Now setting value of c1 ////////")
c1.prop.set(3);
Property.resolveDependencies(c1.prop);
console.log("c: " + c.prop.get());
console.log("c1: " + c1.prop.get());
console.log("c2: " + c2.prop.get());
console.log("//////// Now setting value of c2 ////////")
c2.prop.set(2);
Property.resolveDependencies(c2.prop);
console.log("c: " + c.prop.get());
console.log("c1: " + c1.prop.get());
console.log("c2: " + c2.prop.get());
////////////////////////////////////////////////////////////////////////

/*
function DependencyObject(message, parentObject, propertyName) {
	return {
		message: message,
		isSatisfied: false,
		subscriptionToken: null,
		dependencySubscription: function(msg, data) {

			var matchingDependency = _.find(parentObject.dependencies[propertyName], function(dependency) {
				return msg === dependency.message && !dependency.isSatisfied;
			});
			if (matchingDependency !== undefined) {
				matchingDependency.isSatisfied = true;
			} else {
				throw "Property recieved dependency resolution message from object " + msg +
				      " that is not in it's list of dependencies, or has already been marked as satisfied.";
			}
			var unsatisfiedDependency = _.find(parentObject.dependencies[propertyName], function(dependency) {
				return !dependency.isSatisfied;
			});
			if (unsatisfiedDependency === undefined) {
				parentObject.update(propertyName);
			}
		}
	}
}

function Container() {

    // initialize the local variables
    var wrappers = [];
    var width = null;
    var dependencies = null;

    // set up the properties w/ getters and setters.
    Object.defineProperty(this, "wrappers", {
		get: function() {
		    return wrappers;
		},
		set: function(value) {
		    wrappers = value;
		}
	});
	Object.defineProperty(this, "width", {
		get: function() {
		    return width;
		},
		set: function(value) {
		    width = value;
		}
	});
	Object.defineProperty(this, "dependencies", {
		get: function() {
		    return dependencies;
		},
		set: function(value) {
		    dependencies = value;
		}
	});

	// initialize the properties with some default values.
	this.width = 0;
	this.dependencies = (function(ctx) {
    	return {
	    	width: _.map(this.wrappers, function(wrapper) {
				return new DependencyObject(wrapper.uniqueId + "_width", ctx, "width");
			})
    	};
    })(this);
}

Container.prototype.addWrapper = function(wrapper) {
	this.wrappers.push(wrapper);
	var WRAPPER_MESSAGE = wrapper.uniqueId + "_width";
	var depObj = new DependencyObject(WRAPPER_MESSAGE, this, "width");
	this.dependencies.width.push(depObj);
	var token = PubSub.subscribe(WRAPPER_MESSAGE, depObj.dependencySubscription);
	depObj.subscriptionToken = token;
};

Container.prototype.update = function(propertyToUpdate) {
	if (propertyToUpdate === "width") {
		this.width = _.reduce(this.wrappers, function(w1, w2) { 
			return w1.width + w2.width; 
		});
		console.log(this.width);
	}
}

function Wrapper() {
    var width = 0;
	Object.defineProperty(this, "width", {
		get: function() {
		    return width;
		},
		set: function(value) {
		    width = value;
		    PubSub.publish(this.uniqueId + "_width", null);
		}
	});
}

c = new Container();

var w1 = new Wrapper();

var w2 = new Wrapper();

c.addWrapper(w1);
c.addWrapper(w2);
w1.width = 5;
w2.width = 15;
**/