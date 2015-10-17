eqEd.BigWedgeBigOperatorSymbol = function(parent) {
    eqEd.BigOperatorSymbol.call(this, parent); // call super constructor.
    this.className = "eqEd.BigWedgeBigOperatorSymbol";

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
    eqEd.BigWedgeBigOperatorSymbol.prototype = Object.create(eqEd.BigOperatorSymbol.prototype);
    eqEd.BigWedgeBigOperatorSymbol.prototype.constructor = eqEd.BigWedgeBigOperatorSymbol;
    eqEd.BigWedgeBigOperatorSymbol.prototype.buildDomObj = function() {
        var htmlRep = '<div class="bigOperatorSymbol bigWedgeBigOperatorSymbol" style="width: 52.797009; height: 55.995998;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 40.001984 55.999279" preserveAspectRatio="none"><g transform="translate(-185.05587,-445.79123)"><g><path d="m 225.0566,499.83053 c 7.9e-4,-0.0617 -8.7e-4,-0.12834 -0.005,-0.19999 -0.004,-0.0717 -0.0159,-0.13835 -0.035,-0.2 -0.0411,-0.14011 -0.49895,-1.47879 -1.3735,-4.01606 -0.87462,-2.53729 -1.99949,-5.79262 -3.37458,-9.76599 -1.37518,-3.97337 -2.83411,-8.18424 -4.3768,-12.63261 -1.54276,-4.44835 -3.0028,-8.65367 -4.38013,-12.61595 -1.37738,-3.96224 -2.50558,-7.2009 -3.38458,-9.71599 -0.87906,-2.51502 -1.34245,-3.82593 -1.39017,-3.93272 -0.16752,-0.28496 -0.40252,-0.51496 -0.70499,-0.68999 -0.30252,-0.17496 -0.62752,-0.26496 -0.97499,-0.27 -0.40418,0.007 -0.75584,0.10337 -1.05499,0.29 -0.29918,0.1867 -0.52084,0.42336 -0.66499,0.70999 -0.0476,0.11972 -0.50908,1.43699 -1.38442,3.9518 -0.87538,2.51487 -1.99907,5.74915 -3.37107,9.70284 -1.37203,3.95373 -2.82683,8.14873 -4.36439,12.58502 -1.53758,4.43631 -2.99238,8.63575 -4.36439,12.59835 -1.37202,3.9626 -2.49571,7.21021 -3.37107,9.74284 -0.87536,2.53261 -1.33683,3.8721 -1.38442,4.01847 -0.0192,0.0783 -0.0308,0.15165 -0.035,0.22 -0.004,0.0683 -0.006,0.14165 -0.005,0.21999 0.0142,0.53665 0.20583,0.99331 0.57499,1.36999 0.36916,0.37664 0.83082,0.5733 1.38498,0.58999 0.36666,-0.003 0.70332,-0.0975 1.00999,-0.285 0.30666,-0.18751 0.54332,-0.45251 0.70999,-0.79499 0.0447,-0.0914 0.43974,-1.19753 1.18517,-3.31847 0.74542,-2.12098 1.73306,-4.94859 2.96293,-8.48286 1.22985,-3.53427 2.59378,-7.46706 4.0918,-11.79836 l 8.07989,-23.3197 8.0799,23.3197 c 1.49797,4.3313 2.8619,8.26409 4.0918,11.79836 1.22982,3.53427 2.21746,6.36188 2.96292,8.48286 0.74538,2.12094 1.14044,3.2271 1.18517,3.31847 0.18579,0.34248 0.43412,0.60748 0.74499,0.79499 0.31079,0.18748 0.64912,0.28248 1.01499,0.285 0.56995,-0.0217 1.02994,-0.22835 1.37998,-0.61999 0.34995,-0.39168 0.52995,-0.83834 0.53999,-1.33999 z" /></g></g></svg></div>';
        return new eqEd.EquationDom(this, htmlRep);
    };
})();