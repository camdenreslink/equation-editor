function Property(initialValue, ctx) {
	// Each property will get a unique id.
    this.id = ++Property.id;
    this.value = initialValue;
    this.isUpdated = false;
    this.context = ctx;
    Property.dependsOn[this.id] = [];
    Property.isDependedOnBy[this.id] = [];
}
// Static properties on Property function.
Property.id = 0;
Property.dependsOn = {};
Property.isDependedOnBy = {};
Property.prototype.get = function() {
    return this.value;
};
Property.prototype.set = function(value) {
	// only want to set value, and resolve dependencies if value is different
	// from previous value.
	if (this.value !== value) {
		this.value = value;
		console.log("isUpdated is now true for " + this.id);
		this.isUpdated = true;
	    // When this property has it's value set, make the properties that depend
	    // on it aware of the change.
	    console.log("set " + this.id);
	    for (var i = 0; i < Property.isDependedOnBy[this.id].length; i++) {
	    	if (!Property.isDependedOnBy[this.id][i].isUpdated) {
	    		console.log("After setting " + this.id + ", while looping through isDependedOnBy, isUpdated is false for " + Property.isDependedOnBy[this.id][i].id)
	    		Property.isDependedOnBy[this.id][i].update();
	    	}
		}
	}
    
};
Property.prototype.update = function() {
	this.update_before();
	this.update_after();
	// Call code that updates this.value.
};
Property.prototype.update_before = function() {
	// When update is called on this property, check if all of its dependencies have been updated.
	// If not, call update on them.
	console.log("update " + this.id);
	for (var i = 0; i < Property.dependsOn[this.id].length; i++) {
		if (!Property.dependsOn[this.id][i].isUpdated) {
			//console.log("While updating " + this.id + ", while looping through dependsOn, isUpdated is false for " + Property.dependsOn[this.id][i].id);
			
			Property.dependsOn[this.id][i].update();
		}
	}
}
Property.prototype.update_after = function() {
	
	// This code resets isUpdated when a dependency has been removed from update loop.
	var allDependenciesResolved = true;
	for (var i = 0; i < Property.dependsOn[this.id].length; i++) {
	    var property = Property.dependsOn[this.id][i]
	    console.log(property.id + " looping through dependencies")
	    for (var j = 0; j < Property.isDependedOnBy[property.id].length; j++) {
	    	console.log(Property.isDependedOnBy[property.id][j].id + " looping through all that depend on it.")
	        if (!Property.isDependedOnBy[property.id][j].isUpdated) {
	            allDependenciesResolved = false;
	            break;
	        }
	    }
	    if (allDependenciesResolved) {
	        for (var j = 0; j < Property.isDependedOnBy[property.id].length; j++) {
	        	console.log("isUpdated is now false for " + Property.isDependedOnBy[property.id][j].id);
	            Property.isDependedOnBy[property.id][j].isUpdated = false;
	        }
	    }
	}
	
}
Property.prototype.dependsOn = function(prop) {
	console.log(this.id + " depends on " + prop.id);
	Property.dependsOn[this.id].push(prop);
    Property.isDependedOnBy[prop.id].push(this);
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
    if (methodObject.update !== null) {
    	PropType.prototype.update = function() {
    		this.update_before();
    		methodObject.update.call(this);
    		this.update_after();
    	}
    }
    
    return new PropType(methodObject.initialValue);
}

function MyClassContainer() {
	this.children = [];
    this.prop = PropertyFactory.call(this, {
    	initialValue: 0,
    	get: null,
    	set: null,
    	update: function() {
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
		update: null
	});
}

var c = new MyClassContainer();
var c1 = new MyClass();
var c2 = new MyClass();
c.addChildren(c1);
c.addChildren(c2);
c.prop.update();
console.log("c: " + c.prop.get());
console.log("c1: " + c1.prop.get());
console.log("c2: " + c2.prop.get());
console.log("//////// Now setting value of c1 ////////")
c1.prop.set(3);
console.log("c: " + c.prop.get());
console.log("c1: " + c1.prop.get());
console.log("c2: " + c2.prop.get());
console.log("//////// Now setting value of c2 ////////")
c2.prop.set(2);
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