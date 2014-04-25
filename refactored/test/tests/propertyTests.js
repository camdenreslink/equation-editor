module("Property Tests");

(function() {
    function DummyConstructor1() {
        var properties = [];
        var a = null;
        var b = null;

        propRepo.setUpProperty(this, "a", this.properties, {
        // All 3 methods have access to the constructor scope.
        // get/set work the same as Object.defineProperty
        // return the value from compute that you want set to the property
        get: function() {
          return a;
        },
        set: function(value) {
          a = value;
        },
        compute: function() {
          return this.a;
        }
      });

    }
})();

test("Check that .and() gives the correct boolean values.", function() {
    ok(true.and(true), "true && true == true");
    ok(!(true.and(false)), "true && false == false");
    ok(!(false.and(true)), "false && true == false");
    ok(!(false.and(false)), "false && false == false");
});