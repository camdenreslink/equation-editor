module("Init Tests");

test("Check that a unique identifier is generated for a variety of objects.", function() {
	function SampleConstructor() {};

	var obj1 = 2;
	var obj2 = ["a", "b", "c"];
	var obj3 = "abcdefgh";
	var obj4 = new SampleConstructor();
	ok((typeof obj1.uniqueId !== "undefined"), "uniqueId generated for numbers");
	ok((typeof obj2.uniqueId !== "undefined"), "uniqueId generated for arrays");
	ok((typeof obj3.uniqueId !== "undefined"), "uniqueId generated for strings");
	ok((typeof obj4.uniqueId !== "undefined"), "uniqueId generated for custom types");
});

test("Check that a unique identifiers generated are actually unique.", function() {
	function SampleConstructor() {};

	var objects = [];
	for (var i = 0; i < 1000; i++) {
		objects.push(new SampleConstructor());
	}
	var isUnique = true;
	for(var i = 0; i < objects.length; i++) {
		for (var j = 0; j < objects.length; j++) {
			if (i !== j && objects[i].uniqueId === objects[j].uniqueId) {
				isUnique = false;
			}
		}
	}
	ok(isUnique, "Each object has a unique generated id");
});