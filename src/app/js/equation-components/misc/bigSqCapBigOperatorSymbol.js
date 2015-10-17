eqEd.BigSqCapBigOperatorSymbol = function(parent) {
    eqEd.BigOperatorSymbol.call(this, parent); // call super constructor.
    this.className = "eqEd.BigSqCapBigOperatorSymbol";

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
            return 0.71426980882 * this.height;
        },
        updateDom: function() {
            this.domObj.updateWidth(this.width);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.BigSqCapBigOperatorSymbol.prototype = Object.create(eqEd.BigOperatorSymbol.prototype);
    eqEd.BigSqCapBigOperatorSymbol.prototype.constructor = eqEd.BigSqCapBigOperatorSymbol;
    eqEd.BigSqCapBigOperatorSymbol.prototype.buildDomObj = function() {
        var htmlRep = '<div class="bigOperatorSymbol bigSqCapBigOperatorSymbol" style="width: 39.999485; height: 56.000526;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 39.999485 56.000526" preserveAspectRatio="none"><g transform="translate(-336.48568,-397.21981)"><g transform="scale(1,-1)"><path d="m 336.52568,-451.66036 c -5e-4,0.12053 -0.004,1.44841 -0.0104,3.98366 -0.006,2.5353 -0.0129,5.79501 -0.0193,9.77913 -0.006,3.98416 -0.01,8.20978 -0.0104,12.67687 4.9e-4,4.46711 0.004,8.69273 0.0104,12.67688 0.006,3.98414 0.0128,7.24384 0.0193,9.77913 0.006,2.53526 0.01,3.86314 0.0104,3.98365 0.20666,0.72664 0.71332,1.2333 1.51998,1.51998 l 18.31976,0.04 c 6.62322,8.2e-4 11.36649,-8.5e-4 14.22982,-0.005 2.86326,-0.004 4.30657,-0.0159 4.32994,-0.035 0.36829,-0.0858 0.69162,-0.26418 0.96999,-0.53499 0.27829,-0.27085 0.46162,-0.59918 0.54999,-0.98499 4.5e-4,-0.12051 0.004,-1.44839 0.0104,-3.98365 0.006,-2.53528 0.0128,-5.79499 0.0193,-9.77913 0.006,-3.98415 0.01,-8.20977 0.0104,-12.67688 -5.3e-4,-4.46709 -0.004,-8.69271 -0.0104,-12.67687 -0.006,-3.98412 -0.0129,-7.24383 -0.0193,-9.77913 -0.006,-2.53524 -0.01,-3.86313 -0.0104,-3.98366 -0.11004,-0.44995 -0.34004,-0.81995 -0.68999,-1.10998 -0.35004,-0.28996 -0.76003,-0.43996 -1.22998,-0.45 -0.47004,0.01 -0.88003,0.16004 -1.22999,0.45 -0.35003,0.29003 -0.58003,0.66003 -0.68999,1.10998 -0.0192,-0.008 -0.0309,1.96835 -0.035,5.92993 -0.004,3.96164 -0.006,10.43822 -0.005,19.42975 l 0,25.15967 -32.15958,0 0,-25.15967 c 8.2e-4,-8.99153 -8.4e-4,-15.46811 -0.005,-19.42975 -0.004,-3.96158 -0.0158,-5.93822 -0.035,-5.92993 -0.11167,-0.46745 -0.34834,-0.84245 -0.70999,-1.12498 -0.36167,-0.28246 -0.77833,-0.42746 -1.24999,-0.435 -0.50333,0.015 -0.91666,0.17504 -1.23998,0.48 -0.32333,0.30503 -0.53666,0.66503 -0.63999,1.07998 z" /></g></g></svg></div>';
        return new eqEd.EquationDom(this, htmlRep);
    };
})();