function DependencyObject(message, propertyDependencies) {
	return {
		message: message,
		isSatisfied: false,
		subscriptionToken: null,
		dependencySubscription: function(msg, data) {
			var matchingDependency = _.find(propertyDependencies, function(dependency) {
				return msg === dependency.uniqueId && !dependency.isSatisfied;
			});
			if (matchingDependency !== undefined) {
				matchingDependency.isSatisfied = true;
			} else {
				throw "Property recieved dependency resolution message from object " + msg +
				      " that is not in it's list of dependencies, or has already been marked as satisfied.";
			}
		}
	}
}

function Container() {
    this.wrappers = [];

    var width = 0;

    var widthDependencies = _.map(this.wrappers, function(wrapper) {
		return new DependencyObject(wrapper.uniqueId + "_width", widthDependencies);
	});
	Object.defineProperty(this, "width", {
		get: function() {
		    return width;
		},
		set: function(value) {
		    width = value;
		}
	});
	Object.defineProperty(this, "widthDependencies", {
		get: function() {
		    return widthDependencies;
		},
		set: function(value) {
		    widthDependencies = value;
		}
	});
}

Container.prototype.addWrapper = function(wrapper) {
	this.wrappers.push(wrapper);
	var WRAPPER_MESSAGE = wrapper.uniqueId + "_width";
	var depObj = new DependencyObject(WRAPPER_MESSAGE, this.widthDependencies);
	this.widthDependencies.push(depObj);
	var token = PubSub.subscribe(WRAPPER_MESSAGE, depObj.dependencySubscription);
	depObj.subscriptionToken = token;
};

Container.prototype.updateWidth = function() {
	this.width = _.reduce(this.wrappers, function(w1, w2) { 
		return w1 + w2; 
	}, 0);
	console.log(this.width);
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

var c = new Container();

var w1 = new Wrapper();

var w2 = new Wrapper();

c.addWrapper(w1);
c.addWrapper(w2);
w1.width = 5;
w2.width = 15;