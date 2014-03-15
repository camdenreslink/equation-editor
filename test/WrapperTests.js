(function() {
	var container;
	module("Basic Wrapper Properties Tests", {
		setup: function() {
			container = new eqEd.Container();
		},
		teardown: function() {}
	});
	test("Test that parent attribute populates on container.addWrapper", function() {
		var wrapper = new eqEd.Wrapper();
		container.addWrappers([0, wrapper]);
		strictEqual(wrapper.parentContainer, container, "The parentContainer was set correctly on addWrappers.");
	});
	test("Test that prevWrapper populates on container.addWrapper", function() {
		var wrapper1 = new eqEd.Wrapper();
		var wrapper2 = new eqEd.Wrapper();
		container.addWrappers([0, wrapper1], [1, wrapper2]);
		strictEqual(wrapper2.prevWrapper, wrapper1);
	})
	test("Test that prevWrapper has value of null for first wrapper in container", function() {
		var wrapper1 = new eqEd.Wrapper();
		var wrapper2 = new eqEd.Wrapper();
		container.addWrappers([0, wrapper1], [1, wrapper2]);
		strictEqual(wrapper1.prevWrapper, null);
	})
	test("Test that nextWrapper populates on container.addWrapper", function() {
		var wrapper1 = new eqEd.Wrapper();
		var wrapper2 = new eqEd.Wrapper();
		container.addWrappers([0, wrapper1], [1, wrapper2]);
		strictEqual(wrapper1.nextWrapper, wrapper2);
	})
	test("Test that nextWrapper has value of null for last wrapper in container", function() {
		var wrapper1 = new eqEd.Wrapper();
		var wrapper2 = new eqEd.Wrapper();
		container.addWrappers([0, wrapper1], [1, wrapper2]);
		strictEqual(wrapper2.nextWrapper, null);
	})
})();