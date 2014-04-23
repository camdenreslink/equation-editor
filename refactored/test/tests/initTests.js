module("Init Tests");

test("Check that .and() gives the correct boolean values.", function() {
	ok(true.and(true), "true && true == true");
	ok(!(true.and(false)), "true && false == false");
	ok(!(false.and(true)), "false && true == false");
	ok(!(false.and(false)), "false && false == false");
});

test("Check that .or() gives the correct boolean values.", function() {
	ok(true.or(true), "true || true == true");
	ok(true.or(false), "true || false == true");
	ok(false.or(true), "false || true == true");
	ok(!(false.or(false)), "false || false == false");
});

(function() {
	var propertiesAccessed = [];
	function DummyConstructor() {
		var a = null;
		var b = null;
		Object.defineProperty(this, 'a', {
		    get: function() {
		    	propertiesAccessed.push("a");
		        return a;
		    },
		    set: function(value) {
		    	a = value;
		    }
		});
		Object.defineProperty(this, 'b', {
		    get: function() {
		    	propertiesAccessed.push("b");
		        return b;
		    },
		    set: function(value) {
		    	b = value;
		    }
		});
	}

	test("Check that .and() is not short circuited.", function() {
		var myInstance = new DummyConstructor();

		myInstance.a = true;
		myInstance.b = true;
		(myInstance.a).and(myInstance.b);
		ok((propertiesAccessed[0] === "a" && propertiesAccessed[1] === "b"), "true && true both evaluated");
		
		propertiesAccessed = [];
		myInstance.a = true;
		myInstance.b = false;
		(myInstance.a).and(myInstance.b);
		ok((propertiesAccessed[0] === "a" && propertiesAccessed[1] === "b"), "true && false both evaluated");
		
		propertiesAccessed = [];
		myInstance.a = false;
		myInstance.b = true;
		(myInstance.a).and(myInstance.b);
		ok((propertiesAccessed[0] === "a" && propertiesAccessed[1] === "b"), "false && true both evaluated");
		
		propertiesAccessed = [];
		myInstance.a = false;
		myInstance.b = false;
		(myInstance.a).and(myInstance.b);
		ok((propertiesAccessed[0] === "a" && propertiesAccessed[1] === "b"), "false && false both evaluated");
	});

	test("Check that .or() is not short circuited.", function() {
		var myInstance = new DummyConstructor();

		myInstance.a = true;
		myInstance.b = true;
		(myInstance.a).or(myInstance.b);
		ok((propertiesAccessed[0] === "a" && propertiesAccessed[1] === "b"), "true || true both evaluated");
		
		propertiesAccessed = [];
		myInstance.a = true;
		myInstance.b = false;
		(myInstance.a).or(myInstance.b);
		ok((propertiesAccessed[0] === "a" && propertiesAccessed[1] === "b"), "true || false both evaluated");
		
		propertiesAccessed = [];
		myInstance.a = false;
		myInstance.b = true;
		(myInstance.a).or(myInstance.b);
		ok((propertiesAccessed[0] === "a" && propertiesAccessed[1] === "b"), "false || true both evaluated");
		
		propertiesAccessed = [];
		myInstance.a = false;
		myInstance.b = false;
		(myInstance.a).or(myInstance.b);
		ok((propertiesAccessed[0] === "a" && propertiesAccessed[1] === "b"), "false || false both evaluated");
	});
})();