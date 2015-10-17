eqEd.EquationDom = function(binding, html) {
    this.className = "eqEd.EquationDom";
    this.binding = binding;
    this.html = html;
    this.value = $(html);
    this.value.data("eqObject", this.binding);
    this.width = 0;
    this.height = 0;
    this.left = 0;
    this.top = 0;

    this.value.attr("contenteditable", false);
    this.value.attr("autocomplete", "off");
    this.value.attr("autocorrect", "off");
    this.value.attr("autocapitalize", "off");
    this.value.attr("spellcheck", false);
    this.value.focus();
    this.value.blur();
}
eqEd.EquationDom.prototype.constructor = eqEd.EquationDom;
eqEd.EquationDom.prototype.updateWidth = function(width) {
    this.width = width;
    this.value.css('width', width + 'px');
}
eqEd.EquationDom.prototype.updateHeight = function(height) {
    this.height = height;
    this.value.css('height', height + 'px');
}
eqEd.EquationDom.prototype.updateLeft = function(left) {
    this.left = left;
    this.value.css('left', left + 'px');
}
eqEd.EquationDom.prototype.updateTop = function(top) {
    this.top = top;
    this.value.css('top', top + 'px');
}
eqEd.EquationDom.prototype.clone = function() {
    var copy = new eqEd.EquationDom(this.binding, this.html);
    copy.updateWidth(this.width);
    copy.updateHeight(this.height);
    copy.updateLeft(this.left);
    copy.updateTop(this.top);
	return copy;
}
eqEd.EquationDom.prototype.append = function(domObject) {
	this.value.append(domObject.value);
}

eqEd.EquationDom.prototype.empty = function() {
    this.value.empty();
}

eqEd.EquationDom.prototype.addClass = function(className) {
    this.value.addClass(className);
}

eqEd.EquationDom.prototype.updateFontSize = function(fontClass) {
    this.value.removeClass('fontSizeNormal');
    this.value.removeClass('fontSizeSmaller');
    this.value.removeClass('fontSizeSmallest');
    this.value.addClass(fontClass);
}

eqEd.EquationDom.prototype.updateBorderWidth = function(borderWidth) {
    this.value.css('border-width', borderWidth + 'px');
}