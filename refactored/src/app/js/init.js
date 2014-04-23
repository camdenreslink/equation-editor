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