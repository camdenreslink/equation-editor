eqEd.IntegralSymbol = function(parent) {
    eqEd.BigOperatorSymbol.call(this, parent); // call super constructor.
    this.className = "eqEd.IntegralSymbol";

    this.domObj = this.buildDomObj();

    // Height has already been added to properties in superclass
    // needs removed to be overriden
    for(var i = 0; i < this.properties.length; i++) {
        if (this.properties[i].propName === "height") {
            this.properties.splice(i, 1);
        }
    }

    // Set up the height calculation
    var height = 0;
    this.properties.push(new Property(this, "height", height, {
        get: function() {
            return height;
        },
        set: function(value) {
            height = value;
        },
        compute: function() {
            var fontHeight = this.equation.fontMetrics.height[this.parent.parent.fontSize];
            return 2.25 * fontHeight;
        },
        updateDom: function() {
            this.domObj.updateHeight(this.height);
        }
    }));

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
            return 0.40009004166 * this.height;
        },
        updateDom: function() {
            this.domObj.updateWidth(this.width);
        }
    }));
};
(function() {
    // subclass extends superclass
    eqEd.IntegralSymbol.prototype = Object.create(eqEd.BigOperatorSymbol.prototype);
    eqEd.IntegralSymbol.prototype.constructor = eqEd.IntegralSymbol;
    eqEd.IntegralSymbol.prototype.buildDomObj = function() {
        var htmlRep = '<div class="bigOperatorSymbol integralSymbol" style="width: 35.559544; height: 88.878853;"><svg style="position: absolute; width: 100%; height: 100%;" viewBox="0 0 35.559544 88.878853" preserveAspectRatio="none"><g transform="translate(-316.48568,-332.24859)"><g><path d="m 320.96562,416.28751 c -0.0167,-0.67086 -0.23334,-1.20918 -0.64999,-1.61498 -0.41667,-0.40586 -0.93333,-0.61419 -1.54998,-0.62499 -0.7425,0.0116 -1.30749,0.2383 -1.69498,0.67999 -0.3875,0.44163 -0.5825,1.02829 -0.58499,1.75997 0.0833,1.29579 0.52665,2.38411 1.32998,3.26496 0.80332,0.88079 1.82664,1.33912 3.06996,1.37498 0.94665,-0.025 1.7933,-0.28503 2.53997,-0.77999 0.74664,-0.49502 1.3533,-1.07502 1.81997,-1.73997 0.57999,-0.75836 1.13998,-1.70168 1.67998,-2.82997 0.53998,-1.12834 1.05998,-2.45166 1.55998,-3.96995 0.31248,-0.95334 0.63748,-2.03666 0.97499,-3.24995 0.33748,-1.21334 0.73247,-2.71666 1.18498,-4.50995 1.21577,-4.8797 2.32193,-9.52902 3.31848,-13.94796 0.99651,-4.41896 1.94859,-8.92902 2.85626,-13.5302 0.90762,-4.60116 1.836,-9.61492 2.78515,-15.04129 0.46413,-2.8216 0.8558,-5.08824 1.17498,-6.79991 0.31914,-1.71161 0.6608,-3.45825 1.02499,-5.23993 0.58663,-2.96576 1.10329,-5.34406 1.54998,-7.13491 0.44663,-1.79077 0.90329,-3.31908 1.36998,-4.58494 0.4233,-1.1666 0.85663,-2.09326 1.29999,-2.77997 0.44329,-0.6866 0.87662,-1.09326 1.29998,-1.21998 0.0733,-0.0333 0.16663,-0.0466 0.28,-0.04 0.20746,0.002 0.43246,0.0384 0.67499,0.11 0.24246,0.0717 0.45746,0.16838 0.64499,0.28999 0.13913,0.0984 0.30079,0.23172 0.48499,0.4 0.18413,0.16838 0.2758,0.26171 0.275,0.28 -0.61336,0.14505 -1.11669,0.38504 -1.50998,0.71999 -0.39336,0.33504 -0.59669,0.85504 -0.60999,1.55998 0.0166,0.67087 0.23329,1.20919 0.64999,1.61497 0.41663,0.40588 0.93329,0.61421 1.54998,0.625 0.75995,-0.0108 1.32994,-0.23912 1.70998,-0.68499 0.37995,-0.44578 0.56995,-1.04411 0.56999,-1.79498 -0.0884,-1.2941 -0.5317,-2.37575 -1.32998,-3.24496 -0.79836,-0.8691 -1.90168,-1.32076 -3.30996,-1.35498 -0.48169,0.008 -0.93835,0.10255 -1.36998,0.285 -0.4317,0.18255 -0.82836,0.40754 -1.18999,0.67499 -1.70834,1.37503 -3.09165,3.575 -4.14995,6.59991 -1.05834,3.02501 -1.98166,6.18496 -2.76996,9.47988 -1.22914,4.92836 -2.34419,9.6004 -3.34514,14.01612 -1.001,4.41576 -1.95308,8.92483 -2.85626,13.52723 -0.90322,4.60241 -1.82271,9.64777 -2.75848,15.1361 -0.56834,3.30495 -1.07167,6.13491 -1.50998,8.48989 -0.43834,2.35495 -0.88167,4.56492 -1.32999,6.62992 -0.73333,3.45909 -1.43666,6.16072 -2.10997,8.10489 -0.67333,1.94411 -1.35666,3.25576 -2.04997,3.93495 -0.21001,0.19746 -0.39001,0.33246 -0.54,0.40499 -0.15,0.0725 -0.33,0.0975 -0.53999,0.075 -0.34,0.002 -0.66,-0.0617 -0.95999,-0.18999 -0.3,-0.12837 -0.58,-0.3317 -0.83999,-0.61 -0.08,-0.0625 -0.14,-0.11753 -0.17999,-0.16499 -0.04,-0.0475 -0.06,-0.0725 -0.06,-0.075 0.61332,-0.14503 1.11664,-0.38503 1.50998,-0.71999 0.39332,-0.33503 0.59665,-0.85502 0.60999,-1.55998 z" /></g></g></svg></div>';
        return new eqEd.EquationDom(this, htmlRep);
    };
})();