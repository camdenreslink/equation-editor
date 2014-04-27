module("Container Tests");
(function() {
  // This dummy wrapper class only needs to have topAlign and
  // bottomAlgin
  function DummyWrapper(topAlign, bottomAlign) {
    this.properties = [];
    this.properties.push(new Property(this, "topAlign", topAlign, {
      get: function() {
        return topAlign;
      },
      set: function(value) {
        topAlign = value;
      },
      compute: function() {
        return topAlign;
      },
      updateDom: function() {}
    }));

    this.properties.push(new Property(this, "bottomAlign", bottomAlign, {
      get: function() {
        return bottomAlign;
      },
      set: function(value) {
        bottomAlign = value;
      },
      compute: function() {
        return bottomAlign;
      },
      updateDom: function() {}
    }));
  }
  test("Check that container.maxTopAlignIndex computes correctly. Max is first index.", function() {
    var w1 = new DummyWrapper(10, 5);
    var w2 = new DummyWrapper(9, 1);
    var w3 = new DummyWrapper(8, 2);
    var w4 = new DummyWrapper(7, 3);
    var w5 = new DummyWrapper(6, 4);
    var c = new eqEd.Container();
    c.wrappers = [w1, w2, w3, w4, w5];
    c.update();
    strictEqual(c.maxTopAlignIndex, 0, "");
  });
  test("Check that container.maxTopAlignIndex computes correctly. Max is middle index.", function() {
    var w1 = new DummyWrapper(2, 5);
    var w2 = new DummyWrapper(3, 1);
    var w3 = new DummyWrapper(8, 2);
    var w4 = new DummyWrapper(7, 3);
    var w5 = new DummyWrapper(6, 4);
    var c = new eqEd.Container();
    c.wrappers = [w1, w2, w3, w4, w5];
    c.update();
    strictEqual(c.maxTopAlignIndex, 2, "");
  });
  test("Check that container.maxTopAlignIndex computes correctly. Max is last index.", function() {
    var w1 = new DummyWrapper(2, 5);
    var w2 = new DummyWrapper(3, 1);
    var w3 = new DummyWrapper(8, 2);
    var w4 = new DummyWrapper(7, 3);
    var w5 = new DummyWrapper(33, 4);
    var c = new eqEd.Container();
    c.wrappers = [w1, w2, w3, w4, w5];
    c.update();
    strictEqual(c.maxTopAlignIndex, 4, "");
  });
  test("Check that container.maxBottomAlignIndex computes correctly. Max is first index.", function() {
    var w1 = new DummyWrapper(10, 5);
    var w2 = new DummyWrapper(9, 1);
    var w3 = new DummyWrapper(8, 2);
    var w4 = new DummyWrapper(71, 3);
    var w5 = new DummyWrapper(6, 4);
    var c = new eqEd.Container();
    c.wrappers = [w1, w2, w3, w4, w5];
    c.update();
    strictEqual(c.maxBottomAlignIndex, 0, "");
  });
  test("Check that container.maxBottomAlignIndex computes correctly. Max is middle index.", function() {
    var w1 = new DummyWrapper(2, 5);
    var w2 = new DummyWrapper(3, 1);
    var w3 = new DummyWrapper(8, 23);
    var w4 = new DummyWrapper(71, 3);
    var w5 = new DummyWrapper(6, 4);
    var c = new eqEd.Container();
    c.wrappers = [w1, w2, w3, w4, w5];
    c.update();
    strictEqual(c.maxBottomAlignIndex, 2, "");
  });
  test("Check that container.maxBottomAlignIndex computes correctly. Max is last index.", function() {
    var w1 = new DummyWrapper(2, 5);
    var w2 = new DummyWrapper(3, 1);
    var w3 = new DummyWrapper(8, 2);
    var w4 = new DummyWrapper(71, 3);
    var w5 = new DummyWrapper(33, 44);
    var c = new eqEd.Container();
    c.wrappers = [w1, w2, w3, w4, w5];
    c.update();
    strictEqual(c.maxBottomAlignIndex, 4, "");
  });
})();