eqEd.ProdBigOperatorSymbol = function(parent) {
    eqEd.BigOperatorSymbol.call(this, parent); // call super constructor.
    this.className = "eqEd.ProdBigOperatorSymbol";

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
    eqEd.ProdBigOperatorSymbol.prototype = Object.create(eqEd.BigOperatorSymbol.prototype);
    eqEd.ProdBigOperatorSymbol.prototype.constructor = eqEd.ProdBigOperatorSymbol;
    eqEd.ProdBigOperatorSymbol.prototype.buildDomObj = function() {
        var htmlRep = '<div class="bigOperatorSymbol prodBigOperatorSymbol" style="width: 46.5994; height: 55.999279;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 46.5994 55.999279" preserveAspectRatio="none"><g transform="translate(-256.52568,-351.50552)"><g><path d="m 296.60516,401.94488 0,-44.91943 c 0.33245,-1.22495 1.02744,-2.09494 2.08497,-2.60996 1.05744,-0.51496 2.40243,-0.76496 4.03495,-0.74999 l 0.4,0 0,-2.15998 -46.5994,0 0,2.15998 0.39999,0 c 0.72749,0.003 1.41248,0.0575 2.05497,0.16499 0.64249,0.10754 1.19748,0.25254 1.66498,0.435 0.69915,0.29253 1.22081,0.65752 1.56498,1.09498 0.34416,0.43753 0.63582,0.99253 0.87499,1.66498 l 0,44.91943 -0.12,0.35999 c -0.38917,1.10664 -1.10082,1.89329 -2.13497,2.35997 -1.03416,0.46665 -2.33581,0.69331 -3.90495,0.67999 l -0.39999,0 0,2.15997 19.83974,0 0,-2.15997 -0.39999,0 c -1.6375,0.0158 -2.99248,-0.23584 -4.06495,-0.75499 -1.0725,-0.51917 -1.75749,-1.40083 -2.05497,-2.64496 l -0.04,-24.11969 0,-24.15969 20.03974,0 0,48.27938 -0.12,0.35999 c -0.3892,1.10664 -1.10086,1.89329 -2.13497,2.35997 -1.03419,0.46665 -2.33584,0.69331 -3.90495,0.67999 l -0.4,0 0,2.15997 19.83975,0 0,-2.15997 -0.4,0 c -1.63752,0.0158 -2.99251,-0.23584 -4.06495,-0.75499 -1.07253,-0.51917 -1.75752,-1.40083 -2.05497,-2.64496 z" /></g></g></svg></div>';
        return new eqEd.EquationDom(this, htmlRep);
    };
})();