// Want to create this object once for all tests, because it takes so long to instantiate.
var symbolSizeConfig = new eqEd.SymbolSizeConfiguration();

(function() {
	var container;
	module("Character Initialization Tests", {
		setup: function() {},
		teardown: function() {}
	});
	test("Test that eqEd.SymbolSizeConfiguration height object gets populated", function() {
		ok(symbolSizeConfig.height.fontSizeSmallest, "The fontSizeSmallest height was populated.");
		ok(symbolSizeConfig.height.fontSizeSmaller, "The fontSizeSmaller height was populated.");
		ok(symbolSizeConfig.height.fontSizeNormal, "The fontSizeNormal height was populated.");
	});
	test("Test that eqEd.SymbolSizeConfiguration width object gets populated for each character", function() {
		var characters = _.keys(symbolSizeConfig.width);
		for (var i = 0; i < characters.length; i++) {
			ok(symbolSizeConfig.width[characters[i]].fontSizeSmallest, "The fontSizeSmallest width was populated for character '" + characters[i] + "'");
			ok(symbolSizeConfig.width[characters[i]].fontSizeSmaller, "The fontSizeSmaller width was populated for character '" + characters[i] + "'");
			ok(symbolSizeConfig.width[characters[i]].fontSizeNormal, "The fontSizeNormal width was populated for character '" + characters[i] + "'");
		}
	})
	test("Test that all test divs are deleted. After measuring their heights and widths", function() {
		strictEqual($('#fontTest').length, 0, "The test divs were cleaned up correctly.");
	})
})();