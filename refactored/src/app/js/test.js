function MyClass(propRepo) {
  this.properties = {};
  var a = null;
  var b = null;
  var c = null;
  var privateVar = 200;
  
  propRepo.setUpProperty(this, "a", this.properties, {
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
  
  propRepo.setUpProperty(this, "b", this.properties, {
    // All 3 methods have access to the constructor scope.
    // get/set work the same as Object.defineProperty
    // return the value from compute that you want set to the property
    get: function() {
      return b;
    },
    set: function(value) {
      b = value;
    },
    conditionals: [
      {
        condition: function() {
          return this.a > 22;
        },
        compute: function() {
          return this.a;
        }
      }
    ],
    compute: function() {
      return this.a;
    }
  });
  
  propRepo.setUpProperty(this, "c", this.properties, {
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

var propRepo = new PropertyRepo();
var myInstance = new MyClass(propRepo);
myInstance.a = 23;
propRepo.setUpDependencyGraph();
console.log(propRepo.idMapping);
console.log(propRepo.dependsOn);