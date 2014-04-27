// Set up a namespace to contain new objects. Used to avoid namespace
// collisions between libraries.
var eqEd = eqEd || {};

// Not short circuited logical and
Boolean.prototype.and = function(bool) {
  var value = true;
  if (!this.valueOf()) {
    value = false;
  }
  if (!bool.valueOf()) {
    value = false;
  }
  return value;
};

// Not short circuited logical or
Boolean.prototype.or = function(bool) {
  var value = false;
  if (this.valueOf()) {
    value = true;
  }
  if (bool.valueOf()) {
    value = true;
  }
  return value;
};

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