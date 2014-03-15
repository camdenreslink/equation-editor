(function() {
	var container;
	module("Basic Container Tests");
	test("Create a container", function() {
		container = new eqEd.Container(symbolSizeConfig);
		ok(container, "Container object successfully instantiated.");
	});
	test("Add one wrapper to an empty container", function() {
		container = new eqEd.Container(symbolSizeConfig);
		var wrapper = new eqEd.Wrapper(symbolSizeConfig);
		container.addWrappers([0, wrapper]);
		ok(container.wrappers[0], "Wrapper actually got added to the container.");
	});
	test("Add several wrappers at various positions to already populated container.", function() {
		container = new eqEd.Container(symbolSizeConfig);
		// Already existing wrappers will be given a width of 0.
		// New wrappers will be given a width equivalent to their desired final index.
		var w1 = new eqEd.Wrapper(symbolSizeConfig);
		w1.width = 0;
		var w2 = new eqEd.Wrapper(symbolSizeConfig);
		w2.width = 0;
		var w3 = new eqEd.Wrapper(symbolSizeConfig);
		w3.width = 0;
		var w4 = new eqEd.Wrapper(symbolSizeConfig);
		w4.width = 0;
		var w5 = new eqEd.Wrapper(symbolSizeConfig);
		w5.width = 0;
		var w6 = new eqEd.Wrapper(symbolSizeConfig);
		w6.width = 0;

		container.wrappers = [w1, w2, w3, w4, w5, w6];

		var newWrapper1 = new eqEd.Wrapper(symbolSizeConfig);
		newWrapper1.width = 1;
		var newWrapper2 = new eqEd.Wrapper(symbolSizeConfig);
		newWrapper2.width = 2;
		var newWrapper3 = new eqEd.Wrapper(symbolSizeConfig);
		newWrapper3.width = 4;
		container.addWrappers([1, newWrapper1], [4, newWrapper3], [2, newWrapper2]);
		strictEqual(container.wrappers[0].width, 0);
		strictEqual(container.wrappers[1].width, 1);
		strictEqual(container.wrappers[2].width, 2);
		strictEqual(container.wrappers[4].width, 4);
		strictEqual(container.wrappers[5].width, 0);
		strictEqual(container.wrappers[6].width, 0);
		strictEqual(container.wrappers[7].width, 0);
		strictEqual(container.wrappers[8].width, 0, "The wrappers were inserted at the correct positions.");
	})
})();

(function() {
	var container;
	module( "Zero wrappers added to container. Check container properties", {
		setup: function() {
			container = new eqEd.Container(symbolSizeConfig);
		},
		teardown: function() {}
	});
	test("Check container width", function() {
		strictEqual(container.width, 0, "The width was the expected value.");
	});
	test("Check container height", function() {
		strictEqual(container.height, 0, "The height was the expected value.");
	});
	test("Check container max top align", function() {
		strictEqual(container.maxTopAlign, 0, "The max top align was the expected value.");
	});
	test("Check container max bottom align", function() {
		strictEqual(container.maxBottomAlign, 0, "The max bottom align was the expected value.");
	});
})();

(function() {
	var container;
	module( "One wrapper added to container. Check updated container properties", {
		setup: function() {
			container = new eqEd.Container(symbolSizeConfig);
			var wrapper = new eqEd.Wrapper(symbolSizeConfig);
			wrapper.width = 10;
			wrapper.topAlign = 3;
			wrapper.bottomAlign = 4;
			container.addWrappers([0, wrapper]);
		},
		teardown: function() {}
	});
	test("Check container width", function() {
		strictEqual(container.width, 10, "The width was the expected value.");
	});
	test("Check container height", function() {
		strictEqual(container.height, 7, "The height was the expected value.");
	});
	test("Check container max top align", function() {
		strictEqual(container.maxTopAlign, 3, "The max top align was the expected value.");
	});
	test("Check container max bottom align", function() {
		strictEqual(container.maxBottomAlign, 4, "The max bottom align was the expected value.");
	});
})();

(function() {
	var container;
	module( "Two wrappers added to container. Check updated container properties", {
		setup: function() {
			container = new eqEd.Container(symbolSizeConfig);
			var wrapper1 = new eqEd.Wrapper(symbolSizeConfig);
			wrapper1.width = 10;
			wrapper1.topAlign = 3;
			wrapper1.bottomAlign = 4;
			var wrapper2 = new eqEd.Wrapper(symbolSizeConfig);
			wrapper2.width = 12;
			wrapper2.topAlign = 10;
			wrapper2.bottomAlign = 3;
			container.addWrappers([0, wrapper1], [1, wrapper2]);
		},
		teardown: function() {}
	});
	test("Check container width", function() {
		strictEqual(container.width, 22, "The width was the expected value.");
	});
	test("Check container height", function() {
		strictEqual(container.height, 14, "The height was the expected value.");
	});
	test("Check container max top align", function() {
		strictEqual(container.maxTopAlign, 10, "The max top align was the expected value.");
	});
	test("Check container max bottom align", function() {
		strictEqual(container.maxBottomAlign, 4, "The max bottom align was the expected value.");
	});
})();