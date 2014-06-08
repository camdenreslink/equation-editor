module("Container Tests");
test("Create a container", function() {
  container = new eqEd.Container();
  ok(container, "Container object successfully instantiated.");
});
(function() {
  // This dummy wrapper class only needs to have topAlign and
  // bottomAlgin
  function DummyWrapper(topAlign, bottomAlign) {
    eqEd.Wrapper.call(this);
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
    this.domObj = this.buildDomObj();
  };
  DummyWrapper.prototype = Object.create(eqEd.Wrapper.prototype);
  DummyWrapper.prototype.constructor = DummyWrapper;
  DummyWrapper.prototype.buildDomObj = function() {
    var html = '<div class="wrapper"></div>';
        return new eqEd.WrapperDom(this, html);
  }

  function DummyContainer() {
    eqEd.Container.call(this);
    this.domObj = this.buildDomObj();
  }
  DummyContainer.prototype = Object.create(eqEd.Container.prototype);
  DummyContainer.prototype.constructor = DummyContainer;
  DummyContainer.prototype.buildDomObj = function() {
    var html = '<div class="container"></div>';
        return new eqEd.ContainerDom(this, html);
  }
  test("Add one wrapper to an empty container", function() {
    var c = new DummyContainer();
    var w = new DummyWrapper();
    c.addWrappers([0, w]);
    ok(c.wrappers[0], "Wrapper actually got added to the container.");
  });
  test("Check that container.maxTopAlignIndex computes correctly. Max is first index.", function() {
    var w1 = new DummyWrapper(10, 5);
    var w2 = new DummyWrapper(9, 1);
    var w3 = new DummyWrapper(8, 2);
    var w4 = new DummyWrapper(7, 3);
    var w5 = new DummyWrapper(6, 4);
    var c = new DummyContainer();
    c.wrappers = [w1, w2, w3, w4, w5];
    c.update();
    strictEqual(c.maxTopAlignIndex, 0, "");
  });
  test("Add several wrappers at various positions to already populated container.", function() {
    var c = new DummyContainer();
    // Already existing wrappers will be given a width of 0.
    // New wrappers will be given a width equivalent to their desired final index.
    var w1 = new DummyWrapper();
    w1.width = 0;
    var w2 = new DummyWrapper();
    w2.width = 0;
    var w3 = new DummyWrapper();
    w3.width = 0;
    var w4 = new DummyWrapper();
    w4.width = 0;
    var w5 = new DummyWrapper();
    w5.width = 0;
    var w6 = new DummyWrapper();
    w6.width = 0;

    c.wrappers = [w1, w2, w3, w4, w5, w6];

    var nw1 = new DummyWrapper();
    nw1.width = 1;
    var nw2 = new DummyWrapper();
    nw2.width = 2;
    var nw3 = new DummyWrapper();
    nw3.width = 4;
    c.addWrappers([1, nw1], [4, nw3], [2, nw2]);
    strictEqual(c.wrappers[0].width, 0);
    strictEqual(c.wrappers[1].width, 1);
    strictEqual(c.wrappers[2].width, 2);
    strictEqual(c.wrappers[4].width, 4);
    strictEqual(c.wrappers[5].width, 0);
    strictEqual(c.wrappers[6].width, 0);
    strictEqual(c.wrappers[7].width, 0);
    strictEqual(c.wrappers[8].width, 0, "The wrappers were inserted at the correct positions.");
  });
  test("Check container width, adding one wrapper", function() {
    var c = new DummyContainer();
    var w = new DummyWrapper();
    w.width = 10;
    c.addWrappers([0, w]);
    strictEqual(c.width, 10, "The width was the expected value.");
  });
  test("Check container width, adding two wrapper", function() {
    var c = new DummyContainer();
    var w1 = new DummyWrapper();
    w1.width = 10;
    var w2 = new DummyWrapper();
    w2.width = 12;
    c.addWrappers([0, w1], [1, w2]);
    strictEqual(c.width, 22, "The width was the expected value.");
  });
  test("Check container height, adding one wrapper", function() {
    var c = new DummyContainer();
    var w = new DummyWrapper();
    w.topAlign = 3;
    w.bottomAlign = 4;
    c.addWrappers([0, w]);
    strictEqual(c.height, 7, "The height was the expected value.");
  });
  test("Check container height, adding two wrapper", function() {
    var c = new DummyContainer();
    var w1 = new DummyWrapper();
    w1.topAlign = 17;
    w1.bottomAlign = 4;
    var w2 = new DummyWrapper();
    w2.topAlign = 2;
    w2.bottomAlign = 6;
    c.addWrappers([0, w1], [1, w2]);
    strictEqual(c.height, 23, "The height was the expected value.");
  });
  test("Check that container.maxTopAlignIndex computes correctly. Max is middle index.", function() {
    var w1 = new DummyWrapper(2, 5);
    var w2 = new DummyWrapper(3, 1);
    var w3 = new DummyWrapper(8, 2);
    var w4 = new DummyWrapper(7, 3);
    var w5 = new DummyWrapper(6, 4);
    var c = new DummyContainer();
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
    var c = new DummyContainer();
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
    var c = new DummyContainer();
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
    var c = new DummyContainer();
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
    var c = new DummyContainer();
    c.wrappers = [w1, w2, w3, w4, w5];
    c.update();
    strictEqual(c.maxBottomAlignIndex, 4, "");
  });
})();