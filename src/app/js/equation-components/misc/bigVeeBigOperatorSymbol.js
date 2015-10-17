eqEd.BigVeeBigOperatorSymbol = function(parent) {
    eqEd.BigOperatorSymbol.call(this, parent); // call super constructor.
    this.className = "eqEd.BigVeeBigOperatorSymbol";

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
            return 0.71433033986 * this.height;
        },
        updateDom: function() {
            this.domObj.updateWidth(this.width);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.BigVeeBigOperatorSymbol.prototype = Object.create(eqEd.BigOperatorSymbol.prototype);
    eqEd.BigVeeBigOperatorSymbol.prototype.constructor = eqEd.BigVeeBigOperatorSymbol;
    eqEd.BigVeeBigOperatorSymbol.prototype.buildDomObj = function() {
        var htmlRep = '<div class="bigOperatorSymbol bigVeeBigOperatorSymbol" style="width: 52.797009; height: 55.995998;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 40.001984 55.999279" preserveAspectRatio="none"><g transform="translate(-222.19872,-417.21982)"><g><path d="m 222.19997,419.21979 c -8.3e-4,0.0617 8.3e-4,0.12837 0.005,0.2 0.004,0.0717 0.0158,0.13837 0.035,0.2 0.0476,0.14642 0.50907,1.48585 1.38443,4.01828 0.87535,2.5325 1.99904,5.77967 3.37107,9.74154 1.37201,3.96191 2.8268,8.16019 4.36438,12.59484 1.53756,4.43467 2.99236,8.62739 4.36439,12.57817 1.372,3.95078 2.49569,7.18129 3.37107,9.69154 0.87534,2.51023 1.33681,3.82188 1.38443,3.93495 0.18581,0.32331 0.43414,0.57664 0.74499,0.75999 0.31081,0.18331 0.64913,0.27665 1.01498,0.28 0.36581,-0.008 0.69414,-0.10252 0.98499,-0.285 0.29081,-0.18251 0.50914,-0.40751 0.65499,-0.67499 0.0477,-0.10677 0.51111,-1.41768 1.39017,-3.93273 0.879,-2.51507 2.0072,-5.75373 3.38458,-9.71598 1.37733,-3.96227 2.83738,-8.16758 4.38013,-12.61595 1.5427,-4.44836 3.00163,-8.65923 4.3768,-12.63262 1.3751,-3.97335 2.49996,-7.22867 3.37459,-9.76598 0.87454,-2.53725 1.33238,-3.87594 1.3735,-4.01606 0.0191,-0.0616 0.0308,-0.1283 0.035,-0.2 0.004,-0.0716 0.006,-0.13829 0.005,-0.2 -0.01,-0.50162 -0.19004,-0.94828 -0.54,-1.33998 -0.35003,-0.39162 -0.81003,-0.59829 -1.37998,-0.61999 -0.36587,0.003 -0.7042,0.0967 -1.01499,0.28 -0.31086,0.18336 -0.55919,0.43669 -0.74499,0.75999 -0.0447,0.10448 -0.43978,1.22002 -1.18517,3.34662 -0.74546,2.12667 -1.7331,4.95774 -2.96292,8.49322 -1.22989,3.53553 -2.59383,7.46881 -4.0918,11.79985 l -8.0799,23.3197 -8.07989,-23.3197 c -1.49802,-4.33104 -2.86195,-8.26432 -4.0918,-11.79985 -1.22987,-3.53548 -2.21751,-6.36655 -2.96293,-8.49322 -0.74543,-2.12661 -1.14048,-3.24215 -1.18517,-3.34662 -0.16833,-0.3233 -0.41166,-0.57663 -0.72999,-0.75999 -0.31833,-0.1833 -0.66166,-0.27663 -1.02998,-0.28 -0.5875,0.0234 -1.05249,0.2367 -1.39499,0.63999 -0.34249,0.40337 -0.51749,0.85669 -0.52499,1.35998 z" /></g></g></svg></div>';
        return new eqEd.EquationDom(this, htmlRep);
    };
})();