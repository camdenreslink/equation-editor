function DependencyObject(message, parentObject, propertyName) {
	return {
		message: message,
		isSatisfied: false,
		subscriptionToken: null,
		dependencySubscription: function(msg, data) {
/*)
			console.log("inbound msg: " + msg);
			for (var i = 0; i < parentObject.dependencies[propertyName].length; i++) {
				console.log()
			}
*/
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