WebFont.load({
    custom: {
        families: ["MathJax_Main", "MathJax_Math", "MathJax_Size1"
            , "MathJax_Size2", "MathJax_Size3", "MathJax_Size4"],
        urls: ['../../Fonts/TeX/font.css']
    },
    active: function() {
      console.log("Fonts are loaded!!!");
    }
});

