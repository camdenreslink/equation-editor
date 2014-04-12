eqEd.Formatting = function(domObject) {
  var _left;
  var _top;
  var _width;
  var _height;

  Object.defineProperty(this, "left", {
    get: function() {
      return _left;
    },
    set: function(value) {
      _left = value;
      domObject.left = _left;
    }
  });

  Object.defineProperty(this, "top", {
    get: function() {
      return _top;
    },
    set: function(value) {
      _top = value;
      domObject.top = _top;
    }
  });

  Object.defineProperty(this, "width", {
    get: function() {
      return _width;
    },
    set: function(value) {
      _width = value;
      domObject.width = _width;
    }
  });

  Object.defineProperty(this, "height", {
    get: function() {
      return _height;
    },
    set: function(value) {
      _height = value;
      domObject.height = _height;
    }
  });
}