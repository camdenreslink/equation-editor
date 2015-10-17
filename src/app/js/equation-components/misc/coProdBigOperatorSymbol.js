eqEd.CoProdBigOperatorSymbol = function(parent) {
    eqEd.BigOperatorSymbol.call(this, parent); // call super constructor.
    this.className = "eqEd.CoProdBigOperatorSymbol";

    this.domObj = this.buildDomObj();

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
            return 0.83214285669 * this.height;
        },
        updateDom: function() {
            this.domObj.updateWidth(this.width);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.CoProdBigOperatorSymbol.prototype = Object.create(eqEd.BigOperatorSymbol.prototype);
    eqEd.CoProdBigOperatorSymbol.prototype.constructor = eqEd.CoProdBigOperatorSymbol;
    eqEd.CoProdBigOperatorSymbol.prototype.buildDomObj = function() {
        var htmlRep = '<div class="bigOperatorSymbol coProdBigOperatorSymbol" style="width: 46.5994; height: 55.999279;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 46.5994 55.999279" preserveAspectRatio="none"><g transform="translate(-110.8114,-368.64838)"><g><path d="m 150.89088,419.08773 0,-44.91942 c 0.33246,-1.22496 1.02745,-2.09494 2.08497,-2.60997 1.05745,-0.51496 2.40243,-0.76496 4.03495,-0.74999 l 0.4,0 0,-2.15997 -19.83975,0 0,2.15997 0.4,0 c 0.72746,0.003 1.41245,0.0575 2.05497,0.165 0.64246,0.10753 1.19745,0.25253 1.66498,0.43499 0.69912,0.29253 1.22078,0.65753 1.56498,1.09499 0.34413,0.43753 0.63579,0.99252 0.87499,1.66498 l 0,48.31937 -20.03974,0 0,-24.15968 0.04,-24.15969 c 0.33248,-1.22496 1.02747,-2.09494 2.08497,-2.60997 1.05747,-0.51496 2.40245,-0.76496 4.03495,-0.74999 l 0.39999,0 0,-2.15997 -19.83974,0 0,2.15997 0.39999,0 c 0.72749,0.003 1.41248,0.0575 2.05498,0.165 0.64248,0.10753 1.19747,0.25253 1.66497,0.43499 0.69916,0.29253 1.22081,0.65753 1.56498,1.09499 0.34416,0.43753 0.63582,0.99252 0.87499,1.66498 l 0,44.91942 -0.12,0.35999 c -0.38917,1.10664 -1.10082,1.8933 -2.13497,2.35997 -1.03416,0.46665 -2.33581,0.69331 -3.90495,0.67999 l -0.39999,0 0,2.15998 46.5994,0 0,-2.15998 -0.4,0 c -1.63752,0.0158 -2.9925,-0.23584 -4.06495,-0.75499 -1.07252,-0.51917 -1.75751,-1.40082 -2.05497,-2.64496 z" /></g></g></svg></div>';
        return new eqEd.EquationDom(this, htmlRep);
    };
})();