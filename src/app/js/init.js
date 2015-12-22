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

var getChromeVersion = function() {
  if (window.navigator.appVersion.match(/Chrome\/(.*?) /) === null) {
    return -1;
  } else {
    return parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
  }
}

var ChromeVersion = getChromeVersion();
var IEVersion = getInternetExplorerVersion();

// clearHighlighted() will clear all highlighted items on the page.
var clearHighlighted = function () {
    var isHighlighted;
    if (window.getSelection) {
        isHighlighted = (window.getSelection().toString().length > 0);
    } else if (document.selection && document.selection.type != "Control") {
        // To accommodate IE prior to IE9
        isHighlighted = (document.selection.createRange().text.length > 0);
    }
    //If text somehow gets selected, clear it on mouse move
    if (isHighlighted) {
        if (window.getSelection) {
            if (window.getSelection().empty) { // Chrome
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) { // Firefox
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection) { // IE
            if (document.selection.empty) {
                document.selection.empty();
            }
        }
    }
}

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

$.getCSS = function(fromClass, prop) {

    var $inspector = $("<div>").css('display', 'none').addClass(fromClass);
    $("body").append($inspector); // add to DOM, in order to read the CSS property
    try {
        return $inspector.css(prop);
    } finally {
        $inspector.remove(); // and remove from DOM
    }
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

Array.prototype.contains = function(value) {
  return this.indexOf(value) > -1;
}

var randomIntFromInterval = function(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

var insertNodeAtCursor = function(node) {
    var sel, range, html;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            sel.getRangeAt(0).insertNode(node);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        html = (node.nodeType == 3) ? node.data : node.outerHTML;
        range.pasteHTML(html);
    }
}

var initializePropertyHooks = function() {
  // Set up some general rules for computing property values.
  Property.postComputeHooks['width'] = function(value) {
    if (typeof value === "undefined" || value === null) {
      value = 0;
    }
    var fontHeight = this.getFontHeight();
    return value + (this.padLeft + this.padRight) * fontHeight;
  };
  Property.postComputeHooks['height'] = function(value) {
    if (typeof value === "undefined" || value === null) {
      value = 0;
    }
    var fontHeight = this.getFontHeight();
    return value + (this.padTop + this.padBottom) * fontHeight;
  };
  Property.postComputeHooks['left'] = function(value) {
    if (typeof value === "undefined" || value === null) {
      value = 0;
    }

    var fontHeight = this.getFontHeight();
    var parentFontHeight = this.parent.getFontHeight();
    // Don't want to add parent's padLeft for a Wrapper,
    // because the definition of Wrapper.left checks the
    // left value of immediately preceding wrapper.left
    // value.
    var additionalLeft = 0;
    if (this instanceof eqEd.Wrapper) {
      additionalLeft = this.adjustLeft * fontHeight;
    } else {
      additionalLeft = this.parent.padLeft * parentFontHeight + this.adjustLeft * fontHeight;
    }
    return value + additionalLeft;
  };
  Property.postComputeHooks['top'] = function(value) {
    if (typeof value === "undefined" || value === null) {
      value = 0;
    }
    var fontHeight = this.getFontHeight();
    return value + (this.parent.padTop + this.adjustTop) * fontHeight;
  };
  Property.postComputeHooks['topAlign'] = function(value) {
    if (typeof value === "undefined" || value === null) {
      value = 0;
    }
    var fontHeight = this.getFontHeight();
    return value + this.padTop * fontHeight;
  };
  Property.postComputeHooks['bottomAlign'] = function(value) {
    if (typeof value === "undefined" || value === null) {
      value = 0;
    }
    var fontHeight = this.getFontHeight();
    return value + this.padBottom * fontHeight;
  };
  Property.postComputeHooks['all'] = function(value, propName) {
    var isNumeric = (value !== null) && !isNaN(value) && !(value === true || value === false) && Object.prototype.toString.call(value) !== '[object Array]';
    if (isNumeric && propName !== "padLeft" && propName !== "padRight"
      && propName !== "padTop" && propName !== "padBottom" 
      && propName !=="adjustTop" && propName !== "adjustLeft" 
      && propName !== "heightRatio" && propName !== "accentGap"
      && propName !== "borderWidth") {
      value = Math.ceil(value);
    }
    return value;
  };

};