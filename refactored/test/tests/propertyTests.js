module("Property Tests");

(function() {
    function DummyConstructor1() {
        this.properties = [];
        var a = 1;
        var b = 2;
        this.aCounter = 0;
        this.bCounter = 0;
        this.aDomCounter = 0;
        this.bDomCounter = 0;

        this.properties.push(new Property(this, "a", a, {
            // All 4 methods have access to the constructor scope.
            // get/set work the same as Object.defineProperty
            // return the value from compute that you want set to the property
            get: function() {
                return a;
            },
            set: function(value) {
                a = value;
            },
            compute: function() {
                this.aCounter += 1;
                return a;
            },
            updateDom: function() {
                // stub
                this.aDomCounter += 1;
            }
        }));
        this.properties.push(new Property(this, "b", b, {
            // All 4 methods have access to the constructor scope.
            // get/set work the same as Object.defineProperty
            // return the value from compute that you want set to the property
            get: function() {
                return b;
            },
            set: function(value) {
                b = value;
            },
            compute: function() {
                this.bCounter += 1;
                return 2 * this.a;
            },
            updateDom: function() {
                // stub
                this.bDomCounter += 1;
            }
        }));
    }

    function DummyConstructor2(dependency) {
        this.properties = [];
        this.cCounter = 0;
        this.cDomCounter = 0;
        var c = 8;

        this.properties.push(new Property(this, "c", c, {
            // All 4 methods have access to the constructor scope.
            // get/set work the same as Object.defineProperty
            // return the value from compute that you want set to the property
            get: function() {
                return c;
            },
            set: function(value) {
                c = value;
            },
            compute: function() {
                this.cCounter += 1;
                return dependency.b * 4;
            },
            updateDom: function() {
                // stub
                this.cDomCounter += 1;
            }
        }));
    }
    DummyConstructor2.prototype.update = function() {
        Property.isComputing = true;
        for (var i = 0; i < this.properties.length; i++) {
            this.properties[i].compute();
        }
        for (var i = 0; i < Property.alreadyComputed.length; i++) {
            Property.alreadyComputed[i].isAlreadyComputed = false;
        }
        Property.alreadyComputed = [];
        Property.isComputing = false;
    }
    test("Basic check to see if values are updated correctly with compute()", function() {
        var obj1 = new DummyConstructor1();
        var obj2 = new DummyConstructor2(obj1);
        obj1.a = 2;
        obj2.update();
        strictEqual(obj2.c, 16, "");
        strictEqual(obj1.b, 4, "");
        strictEqual(obj1.a, 2, "");
    });
    test("Make sure compute is only called once per property", function() {
        var obj1 = new DummyConstructor1();
        var obj2 = new DummyConstructor2(obj1);
        obj1.a = 2;
        obj2.update();
        strictEqual(obj2.cCounter, 1, "");
        strictEqual(obj1.bCounter, 1, "");
        strictEqual(obj1.aCounter, 1, "");
    });
    test("Make sure updateDom is called when property changed", function() {
        var obj1 = new DummyConstructor1();
        var obj2 = new DummyConstructor2(obj1);
        obj1.a = 2;
        obj2.update();
        strictEqual(obj2.cDomCounter, 1, "");
        strictEqual(obj1.bDomCounter, 1, "");
        strictEqual(obj1.aDomCounter, 1, "");
    });
    test("Make sure updateDom is not called when property unchanged", function() {
        var obj1 = new DummyConstructor1();
        var obj2 = new DummyConstructor2(obj1);
        obj2.update();
        strictEqual(obj2.cCounter, 1, "");
        strictEqual(obj1.bCounter, 1, "");
        strictEqual(obj1.aCounter, 1, "");

        strictEqual(obj2.cDomCounter, 0, "");
        strictEqual(obj1.bDomCounter, 0, "");
        strictEqual(obj1.aDomCounter, 0, "");
    });
    test("alreadyComputer should be empty and isComputing false after compute", function() {
        var obj1 = new DummyConstructor1();
        var obj2 = new DummyConstructor2(obj1);
        obj1.a = 2;
        obj2.update();
        strictEqual(Property.alreadyComputed.length, 0, "");
        ok(!Property.isComputing, "");
    });
})();