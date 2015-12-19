// The container class will define a "scope" in the
// editor. Containers consist of wrappers lined up
// in a row. A container may be within a wrapper
// (example: numerator in a fraction; numerator 
// defines a new scope).
eqEd.Container = function(parent) {
  eqEd.BoundEquationComponent.call(this, parent); // call super constructor.
  this.className = "eqEd.Container";
  
  // The wrappers property defines the wrapper objects
  // that are within this container object. Wrapper
  // objects will be formatted in the order that they
  // exist in this array.
  this.wrappers = [];

  // fontSize can be one of three predefined values,
  // fontSizeNormal, fontSizeSmaller, or fontSizeSmallest.
  // The actual height of these font sizes will be defined
  // in the CSS file. This property will try to follow
  // LaTeX conventions for sizing in relation to nesting.
  // Will need to create new Property() for 
  this.fontSize = "";
  
  var maxTopAlignIndex = null;
  this.properties.push(new Property(this, "maxTopAlignIndex", maxTopAlignIndex, {
    get: function() {
      return maxTopAlignIndex;
    },
    set: function(value) {
      maxTopAlignIndex = value;
    },
    compute: function() {
      var maxIndex = 0;
      for (var i = 1; i < this.wrappers.length; i++) {
        if (this.wrappers[i].topAlign > this.wrappers[maxIndex].topAlign) {
            maxIndex = i;
        }
      }
      return (this.wrappers.length === 0) ? null : maxIndex;
    },
    updateDom: function() {}
  }));
  var maxBottomAlignIndex = null;
  this.properties.push(new Property(this, "maxBottomAlignIndex", maxBottomAlignIndex, {
    get: function() {
      return maxBottomAlignIndex;
    },
    set: function(value) {
      maxBottomAlignIndex = value;
    },
    compute: function() {
      var maxIndex = 0;
      for (var i = 1; i < this.wrappers.length; i++) {
        if (this.wrappers[i].bottomAlign > this.wrappers[maxIndex].bottomAlign) {
            maxIndex = i;
        }
      }
      return (this.wrappers.length === 0) ? null : maxIndex;
    },
    updateDom: function() {}
  }));
  var width = 0;
  this.properties.push(new Property(this, "width", width, {
    get: function() {
      return width;
    },
    set: function(value) {
      width = value;
    },
    compute: function() {
      var sum = 0;
      for (var i = 0; i < this.wrappers.length; i++) {
        sum += this.wrappers[i].width;
      }
      return sum;
    },
    updateDom: function() {
        this.domObj.updateWidth(this.width);
    }
  }));
  var height = 0;
  this.properties.push(new Property(this, "height", height, {
    get: function() {
      return height;
    },
    set: function(value) {
      height = value;
    },
    compute: function() {
      if (this.wrappers.length > 0) {
        return this.wrappers[this.maxTopAlignIndex].topAlign + this.wrappers[this.maxBottomAlignIndex].bottomAlign;
      } else {
        return 0;
      }
      
    },
    updateDom: function() {
        this.domObj.updateHeight(this.height);
    }
  }));

  var clipping = "";
  this.properties.push(new Property(this, "clipping", clipping, {
    get: function() {
      return clipping;
    },
    set: function(value) {
      clipping = value;
    },
    compute: function() {
      // adding 2 px b/c j-hat bottom gets cut off.
      return '0px ' + (this.width + 5) + 'px ' + (height + 2) + 'px ' + (-5) + 'px';
    },
    updateDom: function() {
        this.domObj.updateClipping(this.clipping);
    }
  }));
};
(function() {
    // subclass extends superclass
    eqEd.Container.prototype = Object.create(eqEd.BoundEquationComponent.prototype);
    eqEd.Container.prototype.constructor = eqEd.Container;
    eqEd.Container.prototype.updateWrapperProperties = function() {
      // Update the index
      for (var i = 0; i < this.wrappers.length; i++) {
          this.wrappers[i].index = i;
          this.wrappers[i].parent = this;
          this.wrappers[i].equation = this.equation;
      }
    }

    eqEd.Container.prototype.addWrappers = function(indexAndWrapperList) {
      // This method takes a list of indices, and wrapper objects, and adds them
      // to the container object's list of wrappers.
      // The indices should specify what the final desired index of the wrapper
      // object should be. Wrappers already in the list (at indices greater than 
      // the inserted wrappers index) will be pushed to the right one entry for 
      // each wrapper inserted. Order of the index/wrapper pairs as arguments 
      // shouldn't matter.
      // e.g. container.addWrappers([1, wrapper1], [4, wrapper3], [2, wrapper2]);
      // If the original list was [w0, w1, w2, w3, w4, w5, w6],
      // it would now be [w0, wrapper1, wrapper2, w1, wrapper3, w2, w3, w4, w5, w6]
      indexAndWrapperList = Array.prototype.slice.call(arguments);
      indexAndWrapperList = _.sortBy(indexAndWrapperList, function(innerArr) {
          return innerArr[0];
      });
      if (this.wrappers[0] instanceof eqEd.EmptyContainerWrapper || this.wrappers[0] instanceof eqEd.SquareEmptyContainerFillerWrapper) {
        this.removeWrappers(0);
      }

      // Insert the wrapper objects into this container's wrapper array, and add
      // them to the DOM.
      for (var i = 0; i < indexAndWrapperList.length; i++) {
          var index = indexAndWrapperList[i][0];
          var wrapper = indexAndWrapperList[i][1];
          // Insert the wrapper object into this.wrappers.
          this.wrappers.splice(index, 0, wrapper);
          // Insert the wrapper's dom object into this container's
          // dom object.
          this.domObj.addWrapper(index, wrapper);
      }
      // This call corrects the indices/parent values of this container's
      // wrappers.
      this.updateWrapperProperties();
    }

    eqEd.Container.prototype.removeWrappers = function(indexList) {
      // indexList is just a list of indices to be removed.
      // this will remove the wrappers at the indices when this
      // method call is made.  Offsetting is handled by the 
      // correction variable in the deleting loop.
      indexList = Array.prototype.slice.call(arguments);

      var maxIndex = indexList[indexList.getMaxIndex()];
      var minIndex = indexList[indexList.getMinIndex()];

      var correction = 0;
      for (var i = 0; i < indexList.length; i++) {
          // Remove the wrapper object into this.wrappers.
          this.wrappers.splice(indexList[i] - correction, 1);
          // Remove the wrapper's dom object from this container's
          // dom object.
          this.domObj.removeWrapper(indexList[i] - correction);
          correction += 1;
      }-
      // This call corrects the indices/parent values of this container's
      // wrappers.
      this.updateWrapperProperties();
    }
    eqEd.Container.prototype.update = function() {
      // This first for loop is what does the actual computing
      // of the properties for this object.  It will also recursively
      // resolve all of the dependencies required to compute the 
      // properties in this object.
      
      for (var i = 0; i < this.properties.length; i++) {
        this.properties[i].compute();
      }
      // This loop will now recursively through the equation,
      // ensuring that all connected objects in the equation will
      // have their compute() methods called and Dom updated.
      // An object could have a property that is not a dependency 
      // of the properties on this object. That is why this recursive
      // call is required.
      for (var i = 0; i < this.wrappers.length; i++) {
          this.wrappers[i].update();
      }
    }
    // TODO Write tests for clone!
    eqEd.Container.prototype.clone = function() {
      var copy = new this.constructor(this.parent);
      var indexAndWrapperList = [];
      for (var i = 0; i < this.wrappers.length; i++) {
        indexAndWrapperList.push([i, this.wrappers[i].clone()]);
      }
      eqEd.Container.prototype.addWrappers.apply(copy, indexAndWrapperList);
      return copy;
    }
    eqEd.Container.prototype.buildJsonObj = function() {
      var jsonWrappers = [];
      if (!(this.wrappers[0] instanceof eqEd.EmptyContainerWrapper)) {
        for (var i = 0; i < this.wrappers.length; i++) {
          jsonWrappers.push(this.wrappers[i].buildJsonObj());
        }
      }
      return jsonWrappers;
    }
    eqEd.Container.prototype.buildDomObj = function() {
      return new eqEd.ContainerDom(this,
            '<div class="eqEdContainer"></div>');
    }
})();