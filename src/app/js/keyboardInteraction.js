var setupKeyboardEvents = function(symbolSizeConfig, clipboard) {
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
    var operatorCharactersMap = {
        '-': '&#x2212;',
        '/': '&#x00f7;',
        '*': '&#x22c5;',
        '=': '=',
        '+': '+',
        '<': '&#60;',
        '>': '&#62;'
    }
    var bracketCharacters = [
        '(',
        ')',
        '[',
        ']',
        '{',
        '}',
        '|'
    ];
    var bracketCharactersMap = {
        '(': "leftParenthesisBracket",
        ')': "rightParenthesisBracket",
        '[': "leftSquareBracket",
        ']': "rightSquareBracket",
        '{': "leftCurlyBracket",
        '}': "rightCurlyBracket",
        '|': null
    }

    Mousetrap.bind(MathJax_MathItalic, function(e, character) {
        var symbolWrapper = new eqEd.SymbolWrapper(character, "MathJax_MathItalic", symbolSizeConfig);
        insertWrapper(symbolWrapper);
        return false;
    });

    Mousetrap.bind(MathJax_Main, function(e, character) {
        var symbolWrapper = new eqEd.SymbolWrapper(character, "MathJax_Main", symbolSizeConfig);
        insertWrapper(symbolWrapper);
        return false;
    });

    Mousetrap.bind(operatorCharacters, function(e, character) { 
        var operatorWrapper = new eqEd.OperatorWrapper(operatorCharactersMap[character], "MathJax_Main", symbolSizeConfig);
        insertWrapper(operatorWrapper);
        return false;
    });

    Mousetrap.bind(bracketCharacters, function(e, character) { 
        var bracketWrapper = new eqEd.BracketWrapper(bracketCharactersMap[character], symbolSizeConfig);
        insertWrapper(bracketWrapper);
        return false;
    });

    // setminus
    Mousetrap.bind('\\', function(e) { 
        var operatorWrapper = new eqEd.OperatorWrapper('&#8726;', "MathJax_Main", symbolSizeConfig);
        insertWrapper(operatorWrapper);
        return false;
    });

    // colon
    Mousetrap.bind(':', function(e) { 
        var operatorWrapper = new eqEd.OperatorWrapper(':', "MathJax_Main", symbolSizeConfig);
        insertWrapper(operatorWrapper);
        return false;
    });

    // apostrophe
    Mousetrap.bind('\'', function(e) { 
        var operatorWrapper = new eqEd.OperatorWrapper('\'', "MathJax_MathItalic", symbolSizeConfig);
        insertWrapper(operatorWrapper);
        return false;
    });

    // superscript shortcut
    Mousetrap.bind('^', function(e) { 
        var superscriptWrapper = new eqEd.SuperscriptWrapper(symbolSizeConfig);
        insertWrapper(superscriptWrapper);
        return false;
    });

    // subscript shortcut
    Mousetrap.bind('_', function(e) { 
        var subscriptWrapper = new eqEd.SubscriptWrapper(symbolSizeConfig);
        insertWrapper(subscriptWrapper);
        return false;
    });

    // copy
    Mousetrap.bind('ctrl+c', function(e) {
        var highlighted = $('.highlighted');
        var container = null;
        if (highlighted.length > 0) {
            container = highlighted.parent().data('eqObject');
            if (!(container.parent instanceof eqEd.EmptyContainerWrapper)) {
                var copiedWrappersIndices;
                if (highlightStartIndex < highlightEndIndex) {
                    copiedWrappersIndices = _.range(highlightStartIndex, highlightEndIndex);
                } else {
                    copiedWrappersIndices = _.range(highlightEndIndex, highlightStartIndex);
                }
                clipboard.copyWrappers(container, copiedWrappersIndices);
            }
        }
    });

    // cut
    Mousetrap.bind('ctrl+x', function(e) {
        Mousetrap.trigger('ctrl+c');
        var highlighted = $('.highlighted');
        if (highlighted.length > 0) {
            Mousetrap.trigger('del');
        }
        return false;
    });

    // paste
    Mousetrap.bind('ctrl+v', function(e) {
        var pastedWrapperList = clipboard.paste();
        for (var i = 0; i < pastedWrapperList.length; i++) {
            insertWrapper(pastedWrapperList[i]);
        }
        return false;
    });

    // undo
    Mousetrap.bind('ctrl+z', function(e) {

    });

    // redo
    Mousetrap.bind(['ctrl+y', 'ctrl+shift+z'], function(e) {

    });

    Mousetrap.bind('backspace', function(e) {
        var cursor = $('.cursor');
        var highlighted = $('.highlighted');
        var container = null;
        if (cursor.length > 0) {
            container = cursor.parent().data('eqObject');
            if (!(container.parent instanceof eqEd.EmptyContainerWrapper)) {
                if (highlightStartIndex !== 0 && highlightStartIndex !== null) {
                    if (container.wrappers[highlightStartIndex - 1].childContainers.length > 0) {
                        container.wrappers[highlightStartIndex - 1].domObj.value.addClass('highlighted');
                        var endIndex = highlightStartIndex
                        highlightStartIndex = highlightStartIndex - 1;
                        updateHighlightFormatting(container, endIndex);
                        removeCursor();
                    } else {
                        highlightStartIndex = highlightStartIndex - 1;
                        container.removeWrappers(highlightStartIndex);
                        container.updateAll();
                        addCursorAtIndex(container, highlightStartIndex);
                    }
                }
            }
        } else if (highlighted.length > 0) {
            container = highlighted.parent().data('eqObject');
            if (!(container.parent instanceof eqEd.EmptyContainerWrapper)) {
                var deleteWrappers;
                if (highlightStartIndex < highlightEndIndex) {
                    deleteWrappers = _.range(highlightStartIndex, highlightEndIndex);
                } else {
                    deleteWrappers = _.range(highlightEndIndex, highlightStartIndex);
                }
                eqEd.Container.prototype.removeWrappers.apply(container, deleteWrappers);
                container.updateAll();
                highlightStartIndex = (highlightStartIndex < highlightEndIndex) ? highlightStartIndex : highlightEndIndex;
                updateHighlightFormatting(container, highlightStartIndex);
                addCursorAtIndex(container, highlightStartIndex);
            }
        }
        if (container.wrappers.length === 0) {
            if (container.parent === null) {
                container.addWrappers([0, new eqEd.TopLevelEmptyContainerWrapper(container.symbolSizeConfig)]);
                container.updateAll();
                addCursorAtIndex(container, 0);
            } else {
                container.addWrappers([0, new eqEd.SquareEmptyContainerWrapper(container.symbolSizeConfig)]);
                container.updateAll();
                addCursorAtIndex(container.wrappers[0].childContainers[0], 0);
            }
            
        }
        return false;
    });

    Mousetrap.bind('del', function(e) {
        var cursor = $('.cursor');
        var highlighted = $('.highlighted');
        var container = null;
        if (cursor.length > 0) {
            container = cursor.parent().data('eqObject');
            if (!(container.parent instanceof eqEd.EmptyContainerWrapper)) {
                if (highlightStartIndex !== container.wrappers.length && highlightStartIndex !== null) {
                    if (container.wrappers[highlightStartIndex].childContainers.length > 0) {
                        container.wrappers[highlightStartIndex].domObj.value.addClass('highlighted');
                        var endIndex = highlightStartIndex + 1;
                        updateHighlightFormatting(container, endIndex);
                        removeCursor();
                    } else {
                        container.removeWrappers(highlightStartIndex);
                        container.updateAll();
                        addCursorAtIndex(container, highlightStartIndex);
                    }
                    
                }
            }
        } else if (highlighted.length > 0) {
            container = highlighted.parent().data('eqObject');
            if (!(container.parent instanceof eqEd.EmptyContainerWrapper)) {
                var deleteWrappers;
                if (highlightStartIndex < highlightEndIndex) {
                    deleteWrappers = _.range(highlightStartIndex, highlightEndIndex);
                } else {
                    deleteWrappers = _.range(highlightEndIndex, highlightStartIndex);
                }
                eqEd.Container.prototype.removeWrappers.apply(container, deleteWrappers);
                container.updateAll();
                highlightStartIndex = (highlightStartIndex < highlightEndIndex) ? highlightStartIndex : highlightEndIndex;
                updateHighlightFormatting(container, highlightStartIndex);
                addCursorAtIndex(container, highlightStartIndex);
            }
        }
        if (container.wrappers.length === 0) {
            if (container.parent === null) {
                container.addWrappers([0, new eqEd.TopLevelEmptyContainerWrapper(container.symbolSizeConfig)]);
                container.updateAll();
                addCursorAtIndex(container, 0);
            } else {
                container.addWrappers([0, new eqEd.SquareEmptyContainerWrapper(container.symbolSizeConfig)]);
                container.updateAll();
                addCursorAtIndex(container.wrappers[0].childContainers[0], 0);
            }
            
        }
        return false;
    });

    Mousetrap.bind('left', function(e) {
        var cursor = $('.cursor');
        var highlighted = $('.highlighted');
        var container = null;
        if (cursor.length > 0) {
            container = cursor.parent().data('eqObject');
            if (!(container.parent instanceof eqEd.TopLevelEmptyContainerWrapper)) {
                if (highlightStartIndex !== 0 && !(container instanceof eqEd.SquareEmptyContainer)) {
                    if (container.wrappers[highlightStartIndex - 1].childContainers.length > 0) {
                        if (container.wrappers[highlightStartIndex - 1].childContainers[container.wrappers[highlightStartIndex - 1].childContainers.length - 1].wrappers[0] instanceof eqEd.EmptyContainerWrapper) {
                            addCursorAtIndex(container.wrappers[highlightStartIndex - 1].childContainers[container.wrappers[highlightStartIndex - 1].childContainers.length - 1].wrappers[0].childContainers[0], 0);
                        } else {
                            // The following line is ridiculous...try to refactor to make easier to understand.
                            addCursorAtIndex(container.wrappers[highlightStartIndex - 1].childContainers[container.wrappers[highlightStartIndex - 1].childContainers.length - 1], container.wrappers[highlightStartIndex - 1].childContainers[container.wrappers[highlightStartIndex - 1].childContainers.length - 1].wrappers.length);
                        }
                    } else {
                        addCursorAtIndex(container, highlightStartIndex - 1);
                    }   
                } else {
                    if (container instanceof eqEd.SquareEmptyContainer) {
                        container = container.parent.parent;
                    }
                    if (container.domObj.value.prev('.eqEdContainer').length > 0) {
                        container = container.domObj.value.prev('.eqEdContainer').first().data('eqObject');
                        if (container.wrappers[0] instanceof eqEd.SquareEmptyContainerWrapper) {
                            container = container.wrappers[0].childContainers[0];
                        }
                        addCursorAtIndex(container, container.wrappers.length);
                    } else {
                        if (container.parent !== null) {
                            addCursorAtIndex(container.parent.parent, container.parent.index);
                        }
                    }
                }
            }
        } else if (highlighted.length > 0) {
            container = highlighted.parent().data('eqObject');
            var cursorIndex = (highlightStartIndex < highlightEndIndex) ? highlightStartIndex : highlightEndIndex;
            addCursorAtIndex(container, cursorIndex);
            updateHighlightFormatting(container, cursorIndex);
            $('.highlighted').removeClass('highlighted');
        }
        return false;
    });

    Mousetrap.bind('right', function(e) {
        var cursor = $('.cursor');
        var highlighted = $('.highlighted');
        var container = null;
        if (cursor.length > 0) {
            container = cursor.parent().data('eqObject');
            if (!(container.parent instanceof eqEd.TopLevelEmptyContainerWrapper)) {
                if (highlightStartIndex !== container.wrappers.length && !(container instanceof eqEd.SquareEmptyContainer)) {
                    if (container.wrappers[highlightStartIndex].childContainers.length > 0) {
                        if (container.wrappers[highlightStartIndex].childContainers[0].wrappers[0] instanceof eqEd.EmptyContainerWrapper) {
                            addCursorAtIndex(container.wrappers[highlightStartIndex].childContainers[0].wrappers[0].childContainers[0], 0);
                        } else {
                            addCursorAtIndex(container.wrappers[highlightStartIndex].childContainers[0], 0);
                        }
                    } else {
                        addCursorAtIndex(container, highlightStartIndex + 1);
                    }   
                } else {
                    if (container instanceof eqEd.SquareEmptyContainer) {
                        container = container.parent.parent;
                    }
                    if (container.domObj.value.next('.eqEdContainer').length > 0) {
                        container = container.domObj.value.next('.eqEdContainer').first().data('eqObject');
                        if (container.wrappers[0] instanceof eqEd.SquareEmptyContainerWrapper) {
                            container = container.wrappers[0].childContainers[0];
                        }
                        addCursorAtIndex(container, 0);
                    } else {
                        if (container.parent !== null) {
                            addCursorAtIndex(container.parent.parent, container.parent.index + 1);
                        }
                    }
                }
            }
        } else if (highlighted.length > 0) {
            container = highlighted.parent().data('eqObject');
            var cursorIndex = (highlightStartIndex > highlightEndIndex) ? highlightStartIndex : highlightEndIndex;
            addCursorAtIndex(container, cursorIndex);
            updateHighlightFormatting(container, cursorIndex);
            $('.highlighted').removeClass('highlighted');
        }
        return false;
    });
};