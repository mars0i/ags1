
myModel = function () {
  var u = ABM.Util; // useful alias for utilities
  ABM.Model.prototype.startup = function () {
    console.log("startup");
  };
  ABM.Model.prototype.setup = function () {
    console.log("setup");
    this.refreshPatches = this.refreshLinks = false;
    this.turtles.setUseSprites();
    this.population = 100;
    this.speed = .5;
    this.wiggle = u.degToRad(30);
    for (var i=0; i < this.patches.length; i++) {
      this.patches[i].color = u.randomGray();
    }
    this.turtles.create(this.population);
    for (var i=0; i < this.turtles.length; i++) {
      var pt = this.patches.randomPt();
      this.turtles[i].setXY(pt[0],pt[1]);
    }
    console.log("patches: " + this.patches.length + " turtles: " + this.turtles.length);
  };
  var tick = 0;
  ABM.Model.prototype.step = function () {
    if (tick++ >= 100) {ABM.Model.prototype.stop();}; // MARSHALL

    for (var i=0; i < this.turtles.length; i++) {
      var a = this.turtles[i];
      a.rotate(u.randomCentered(this.wiggle));
      a.forward(this.speed);
    }
    // if (this.anim.ticks % 100 === 0) {
    //   console.log(this.anim.toString());
    // }
  };

  var model = new ABM.Model({
    div: "layers",
    size: 13,
    minX: -16,
    maxX: 16,
    minY: -16,
    maxY: 16,
    isTorus: true
  })
  .debug()  // Debug: Put Model vars in global name space
  .start(); // Run model immediately after startup initialization
}

myModel();
