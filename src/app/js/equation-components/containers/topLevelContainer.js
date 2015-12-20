eqEd.TopLevelContainer = function(parent) {
    eqEd.Container.call(this, parent);
    this.className = "eqEd.TopLevelContainer";

    this.equation = parent;
    this.padTop = 0.2;
    this.padBottom = 0.2;
    this.domObj = this.buildDomObj();
    var topLevelEmptyContainerWrapper = new eqEd.TopLevelEmptyContainerWrapper(this.equation);
    this.addWrappers([0, topLevelEmptyContainerWrapper]);

    // Set up the fontSize calculation
    var fontSize = "";
    this.properties.push(new Property(this, "fontSize", fontSize, {
        get: function() {
            return fontSize;
        },
        set: function(value) {
            fontSize = value;
        },
        compute: function() {
            return "fontSizeNormal";
        },
        updateDom: function() {
            this.domObj.updateFontSize(this.fontSize);
        }
    }));
};

(function() {
    // subclass extends superclass
    eqEd.TopLevelContainer.prototype = Object.create(eqEd.Container.prototype);
    eqEd.TopLevelContainer.prototype.constructor = eqEd.TopLevelContainer;
    eqEd.TopLevelContainer.prototype.buildDomObj = function() {
        return new eqEd.ContainerDom(this,
            '<div class="eqEdContainer topLevelContainer"></div>');
    };
})();