// Set up a namespace to contain new objects. Used to avoid namespace
// collisions between libraries.
var eqEd = eqEd || {};

var getInternetExplorerVersion = function()
{
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  else if (navigator.appName == 'Netscape')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}

var IEVersion = getInternetExplorerVersion();

jQuery.fn.insertAt = function(index, element) {
    var lastIndex = this.children().size();
    if (index < 0) {
        index = Math.max(0, lastIndex + 1 + index);
    }
    this.append(element);
    if (index < lastIndex) {
        this.children().eq(index).before(this.children().last());
    }
    return this;
};

Array.prototype.max = function() {
    return Math.max.apply( Math, this );
};

Array.prototype.getMaxIndex = function() {
    var maxIndex = 0;
    for (var i = 1; i < this.length; i++) {
        if (this[i] > this[maxIndex]) {
            maxIndex = i;
        }
    }
    return maxIndex;
}

Array.prototype.getMinIndex = function() {
    var minIndex = 0;
    for (var i = 1; i < this.length; i++) {
        if (this[i] < this[minIndex]) {
            minIndex = i;
        }
    }
    return minIndex;
}

// Set up some general rules for computing property values.
Property.postComputeHooks['width'] = function(value) {
  if (typeof value === "undefined" || value === null) {
    value = 0;
  }
  return value + this.padLeft + this.padRight;
};
Property.postComputeHooks['height'] = function(value) {
  if (typeof value === "undefined" || value === null) {
    value = 0;
  }
  return value + this.padTop + this.padBottom;
};
Property.postComputeHooks['left'] = function(value) {
  if (typeof value === "undefined" || value === null) {
    value = 0;
  }

  // Don't want to add parent's padLeft for a Wrapper,
  // because the definition of Wrapper.left checks the
  // left value of immediately preceding wrapper.left
  // value.
  var additionalLeft = 0;
  if (this instanceof eqEd.Wrapper) {
    additionalLeft = this.adjustLeft;
  } else {
    additionalLeft = this.parent.padLeft + this.adjustLeft;
  }
  return value + additionalLeft;
};
Property.postComputeHooks['top'] = function(value) {
  if (typeof value === "undefined" || value === null) {
    value = 0;
  }
  return value + this.parent.padTop + this.adjustTop;
};
Property.postComputeHooks['topAlign'] = function(value) {
  if (typeof value === "undefined" || value === null) {
    value = 0;
  }
  return value + this.padTop;
};
Property.postComputeHooks['bottomAlign'] = function(value) {
  if (typeof value === "undefined" || value === null) {
    value = 0;
  }
  return value + this.padBottom;
};