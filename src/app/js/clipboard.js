eqEd.Clipboard = function() {
	this.className = "eqEd.Clipboard";

    this.contents = [];
};
(function() {
    eqEd.Clipboard.prototype.constructor = eqEd.Clipboard;
    eqEd.Clipboard.prototype.copyWrappers = function(container, indexList) {
        this.contents = [];
        var maxIndex = indexList[indexList.getMaxIndex()];
        var minIndex = indexList[indexList.getMinIndex()];
        var copiedWrappers = []
        for (var i = 0; i < indexList.length; i++) {
            copiedWrappers.push(container.wrappers[i].clone());
        }
        this.contents.push(copiedWrappers);
    }
    eqEd.Clipboard.prototype.paste = function() {
        var pastedContents = [];
        for (var i = 0; i < this.contents[this.contents.length - 1].length; i++) {
            pastedContents.push(this.contents[this.contents.length - 1][i].clone());
        }
        return pastedContents;
    }
    
})();