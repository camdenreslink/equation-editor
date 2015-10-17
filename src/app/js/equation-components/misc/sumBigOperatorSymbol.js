eqEd.SumBigOperatorSymbol = function(parent) {
    eqEd.BigOperatorSymbol.call(this, parent); // call super constructor.
    this.className = "eqEd.SumBigOperatorSymbol";

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
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            return 0.94287111375 * this.height;
        },
        updateDom: function() {
            this.domObj.updateWidth(this.width);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.SumBigOperatorSymbol.prototype = Object.create(eqEd.BigOperatorSymbol.prototype);
    eqEd.SumBigOperatorSymbol.prototype.constructor = eqEd.SumBigOperatorSymbol;
    eqEd.SumBigOperatorSymbol.prototype.buildDomObj = function() {
        var htmlRep = '<div class="bigOperatorSymbol sumBigOperatorSymbol" style="width: 52.797009; height: 55.995998;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 52.797009 55.995998" preserveAspectRatio="none"><g transform="translate(-50.817524,-457.79474)"><g><path d="m 51.36436,513.79074 c -0.36456,-6e-5 -0.546839,-0.20968 -0.546836,-0.62886 -3e-6,-0.14588 0.05468,-0.27348 0.164051,-0.38279 L 71.351213,487.87071 50.981575,459.81803 c -0.10937,-0.10937 -0.164054,-0.20962 -0.164051,-0.30076 l 0,-1.23038 c -3e-6,-0.12759 0.05924,-0.24152 0.177722,-0.34177 0.118478,-0.10025 0.241516,-0.15038 0.369114,-0.15038 l 47.438016,0 4.812154,13.09672 -1.61316,0 c -0.92968,-2.55191 -2.337779,-4.57976 -4.224311,-6.08355 -1.886632,-1.5038 -4.042075,-2.59748 -6.466335,-3.28102 -2.424347,-0.68354 -4.784853,-1.10278 -7.081525,-1.25772 -2.296745,-0.15494 -5.094719,-0.23241 -8.393931,-0.2324 l -18.701789,0 18.483054,25.37318 c 0.10934,0.10934 0.164023,0.23694 0.164051,0.38279 -2.8e-5,0.14579 -0.05471,0.27339 -0.164051,0.38278 l -19.986853,24.41623 20.533689,0 c 3.244528,-6e-5 6.006047,-0.0775 8.284565,-0.23241 2.278443,-0.15499 4.620722,-0.56511 7.026841,-1.23038 2.406032,-0.66537 4.543247,-1.75904 6.411651,-3.28101 1.868304,-1.52208 3.239954,-3.55904 4.114944,-6.1109 l 1.61316,0 -4.812154,14.05369 z" /></g></g></svg></div>';
        return new eqEd.EquationDom(this, htmlRep);
    };
})();