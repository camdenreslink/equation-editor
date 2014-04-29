var test = function() {
	// Try out adding some symbolWrappers
	var symbolSizeConfig = new eqEd.SymbolSizeConfiguration();
	var container = new eqEd.Container();
	container.fontSize = "fontSizeNormal";
	container.domObj = new eqEd.ContainerDom(container, '<div class="container fontSizeNormal"></div>');
	var w1 = new eqEd.SymbolWrapper('a', 'MathJax_MathItalic', symbolSizeConfig);
	var w2 = new eqEd.SymbolWrapper('b', 'MathJax_MathItalic', symbolSizeConfig);
	var w3 = new eqEd.SymbolWrapper('c', 'MathJax_MathItalic', symbolSizeConfig);
	var w4 = new eqEd.SymbolWrapper('d', 'MathJax_MathItalic', symbolSizeConfig);
	var w5 = new eqEd.SymbolWrapper('e', 'MathJax_MathItalic', symbolSizeConfig);
	var w6 = new eqEd.SymbolWrapper('q', 'MathJax_MathItalic', symbolSizeConfig);
	container.addWrappers([0, w1], [1, w2], [2, w3], [3, w4], [4, w5], [5, w6]);
	$('.symbolWrapperTest').append(container.domObj.value);
}
WebFont.load({
    custom: {
        families: ["MathJax_Main", "MathJax_Math", "MathJax_Size1"
            , "MathJax_Size2", "MathJax_Size3", "MathJax_Size4"],
        urls: ['../../Fonts/TeX/font.css']
    },
    active: function() {
    	console.log("yo");
    	test();
    }
});