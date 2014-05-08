var setupKeyboardEvents = function(symbolSizeConfig) {
    var MathJax_MathItalic = [
        'q',
        'w',
        'e',
        'r',
        't',
        'y',
        'u',
        'i',
        'o',
        'p',
        'a',
        's',
        'd',
        'f',
        'g',
        'h',
        'j',
        'k',
        'l',
        'z',
        'x',
        'c',
        'v',
        'b',
        'n',
        'm',
        'Q',
        'W',
        'E',
        'R',
        'T',
        'Y',
        'U',
        'I',
        'O',
        'P',
        'A',
        'S',
        'D',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'Z',
        'X',
        'C',
        'V',
        'B',
        'N',
        'M'
    ];
    var MathJax_Main = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        '!',
        '$',
        '%',
        '.'
    ];

    var operatorCharacters = [
        '*',
        '-',
        '=',
        '+',
        '/',
        '<',
        '>'
    ];
    var bracketCharacters = [
        '(',
        ')',
        '[',
        ']',
        '{',
        '}',
        '|'
    ];

    Mousetrap.bind(MathJax_MathItalic, function(e, character) {
        var symbolWrapper = new eqEd.SymbolWrapper(character, "MathJax_MathItalic", symbolSizeConfig) 
        insertWrapper(symbolWrapper);
        addBlink();
    });

    Mousetrap.bind(MathJax_Main, function(e, character) {
        var symbolWrapper = new eqEd.SymbolWrapper(character, "MathJax_Main", symbolSizeConfig) 
        insertWrapper(symbolWrapper);
        addBlink();
    });

    Mousetrap.bind(operatorCharacters, function(e, character) { 

    });

    Mousetrap.bind(bracketCharacters, function(e, character) { 

    });

    // copy
    Mousetrap.bind('ctrl+c', function(e) {

    });

    // cut
    Mousetrap.bind('ctrl+x', function(e) {

    });

    // paste
    Mousetrap.bind('ctrl+v', function(e) {

    });

    // undo
    Mousetrap.bind('ctrl+z', function(e) {

    });

    // redo
    Mousetrap.bind(['ctrl+y', 'ctrl+shift+z'], function(e) {

    });
};