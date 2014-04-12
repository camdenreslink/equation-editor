// Set up a namespace to contain new objects. Used to avoid namespace
// collisions between libraries.
var eqEd = eqEd || {};

// This extends the Object.prototype to give every instantiated object a
// unique id. This property will be hidden from property enumeration.
// This will be used to pass messages between objects during dependency 
// resolution of object property calculations.
(function() {
    id_counter = 1;
    Object.defineProperty(Object.prototype, "__uniqueId", {
        writable: true
    });
    Object.defineProperty(Object.prototype, "uniqueId", {
        get: function() {
            if (this.__uniqueId == undefined)
                this.__uniqueId = id_counter++;
            return this.__uniqueId;
        }
    });
}());