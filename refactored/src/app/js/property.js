function Property(propertyArgs, propertyRepo) {
  // property Args should contain context, property, conditionals, and compute
  this.parentRepo = propertyRepo;
  this.uniqueId = (++this.parentRepo.uniqueId).toString();
  this.context = propertyArgs.context;
  this.propertyName = propertyArgs.property;
  this.value = this.context[this.propertyName];
  this.compute = propertyArgs.compute;
  this.conditionals = propertyArgs.conditionals;
  this.parentRepo.idMapping[this.uniqueId] = this;
}

Property.prototype.dependsOn = function(prop) {
  if (typeof this.parentRepo.dependsOn[this.uniqueId] === "undefined") {
    this.parentRepo.dependsOn[this.uniqueId] = [];
  }
  if (typeof this.parentRepo.isDependedOnBy[prop.uniqueId] === "undefined") {
    this.parentRepo.isDependedOnBy[prop.uniqueId] = [];
  }
  this.parentRepo.dependsOn[this.uniqueId].push(prop.uniqueId);
  this.parentRepo.isDependedOnBy[prop.uniqueId].push(this.uniqueId);
};

Property.prototype.scanCompute = function() {
  this.parentRepo.isScan = true;
  this.parentRepo.currentlyScanning = this;
  // Check if this property has already had its dependencies mapped,
  // i.e. this property has already had its compute method scanned.
  if (typeof this.parentRepo.dependsOn[this.uniqueId] === "undefined") {
    //This property has not had its compute method scanned yet
    if (this.conditionals.length > 0) {
      // This property's compute method has conditionals within it.
      for (var i = 0; i < this.conditionals.length; i++) {
        var conditionalObj = this.conditionals[i];
        this.parentRepo.isScanConditional = true;
        conditionalObj.condition.call(this.context);
        // Using non-short circuited ops will cause each getter to be called
        this.parentRepo.isScanConditional = false;
        for (var j = 0; j < this.parentRepo.conditionalDeps.length; j++) {
          this.parentRepo.conditionalDeps[j].scanCompute();
          this.parentRepo.isScan = false;
          this.parentRepo.currentlyScanning = null;
          this.parentRepo.conditionalDeps[j].compute();
          this.parentRepo.isScan = true;
          this.parentRepo.currentlyScanning = this;
        }

        this.parentRepo.conditionalDeps = [];
        if (conditionalObj.condition) {
          this.compute = conditionalObj.compute;
          break;
        }
      }
    }
    // At this point, the property should have a compute method
    // defined. Now we can do the scanning to set up the dependencies.
    this.compute();
  }
  this.parentRepo.isScan = false;
  this.parentRepo.currentlyScanning = null;
  return this.parentRepo.dependsOn[this.uniqueId];
}