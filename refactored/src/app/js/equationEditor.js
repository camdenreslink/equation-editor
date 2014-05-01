var test = function() {
	// Try out adding some symbolWrappers
	var symbolSizeConfig = new eqEd.SymbolSizeConfiguration();
    var container = new eqEd.Container();
	container.fontSize = "fontSizeNormal";
	container.domObj = new eqEd.ContainerDom(container, '<div class="container fontSizeNormal"></div>');
	var w1 = new eqEd.SymbolWrapper('f', 'MathJax_MathItalic', symbolSizeConfig);
	/*var w2 = new eqEd.SymbolWrapper('2', 'MathJax_Main', symbolSizeConfig);
	var w3 = new eqEd.SymbolWrapper('3', 'MathJax_Main', symbolSizeConfig);
	var w4 = new eqEd.SymbolWrapper('x', 'MathJax_MathItalic', symbolSizeConfig);
	var w5 = new eqEd.SymbolWrapper('e', 'MathJax_MathItalic', symbolSizeConfig);
	var w6 = new eqEd.SymbolWrapper('q', 'MathJax_MathItalic', symbolSizeConfig);
	container.addWrappers([5, w1], [4, w2], [1, w3], [0, w4], [2, w5], [3, w6]);*/
    container.addWrappers([0, w1]);
	$('.symbolWrapperTest').append(container.domObj.value);
}

WebFont.load({
    custom: {
        families: ["MathJax_Main", "MathJax_Math:i4", "MathJax_Size1"
            , "MathJax_Size2", "MathJax_Size3", "MathJax_Size4"],
        urls: ['../../Fonts/TeX/font.css']
    },
    active: function() {
        test();
    }
});
