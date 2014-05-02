var setupKeyboardEvents = function(symbolSizeConfig) {
    var symbolCharacters = [
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

    Mousetrap.bind(symbolCharacters, function(e, character) { 
        console.log(character);
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