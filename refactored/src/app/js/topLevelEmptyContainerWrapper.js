eqEd.TopLevelEmptyContainerWrapper = function() {
    eqEd.EmptyContainerWrapper.call(this); // call super constructor.

    this.topLevelEmptyContainerMessage = new eqEd.TopLevelEmptyContainerMessage();
    this.topLevelEmptyContainerMessage.parent = this;
    this.domObj = this.buildDomObj();
    this.domObj.append(this.topLevelEmptyContainerMessage.domObj);
    this.childNoncontainers = [this.topLevelEmptyContainerMessage];
    this.padLeft = 0;
    this.padRight = 0;

    // Set up the width calculation
    var width = 0;
    this.properties.push(new Property(this, "width", width, {
        get: function() {
            return width;
        },
        set: function(value) {
            width = value;
        },
        compute: function() {
            return this.topLevelEmptyContainerMessage.width;
        },
        updateDom: function() {
            this.domObj.updateWidth(this.width);
        }
    }));

    // Set up the topAlign calculation
    var topAlign = 0;
    this.properties.push(new Property(this, "topAlign", topAlign, {
        get: function() {
            return topAlign;
        },
        set: function(value) {
            topAlign = value;
        },
        compute: function() {
            return 0.5;
        },
        updateDom: function() {}
    }));

    // Set up the bottomAlign calculation
    var bottomAlign = 0;
    this.properties.push(new Property(this, "bottomAlign", bottomAlign, {
        get: function() {
            return bottomAlign;
        },
        set: function(value) {
            bottomAlign = value;
        },
        compute: function() {
            return 0.5;
        },
        updateDom: function() {}
    }));
};
(function() {
    // subclass extends superclass
    eqEd.TopLevelEmptyContainerWrapper.prototype = Object.create(eqEd.EmptyContainerWrapper.prototype);
    eqEd.TopLevelEmptyContainerWrapper.prototype.constructor = eqEd.TopLevelEmptyContainerWrapper;
    eqEd.TopLevelEmptyContainerWrapper.prototype.buildDomObj = function() {
        return new eqEd.WrapperDom(this,
            '<div class="wrapper emptyContainerWrapper topLevelEmptyContainerWrapper"></div>');
    }
})();