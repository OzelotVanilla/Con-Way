/**
 * A modified loopgrid. It has two looping spaces. One is its facial space, and the other is a hidden space.
 * By invoking its methods extended from loopgrid, you can modify its facial space.
 * By invoking its own methods which are penetrated versions of loopgrid's methods,
 * you can modify its hidden space. A constant rule is: you SHOULD NOT get any data from or modify its hidden space.
 * By invoking the flip method, you can switch its facial and hidden space.
 */
con_way.doublegrid = class extends con_way.loopgrid {

  hidenarray;

  constructor(x, y, factory) {
    super(x, y, factory);
    this.hidenarray = new Array();
    for (var dx = 0; dx < x; dx++) {
      var column = new Array();
      this.hidenarray[dx] = column;
      for (var dy = 0; dy < y; dy++) {
        column[dy] = factory(this, dx, dy);
      }
    }
  }

  flip() {
    var mid = this.innerarray;
    this.innerarray = this.hidenarray;
    this.hidenarray = mid;
  }

  setPenetrated(x, y, data) {
    if (x < 0 || this.xWidth <= x) {
      if (horizonalLoop) {
        return;
      } else {
        x = x % this.xWidth;
        if (x < 0) {
          x += this.xWidth;
        }
      }
    }
    if (y < 0 || this.yWidth <= y) {
      if (this.verticalLoop) {
        return;
      } else {
        y = y % this.yWidth;
        if (y < 0) {
          y += this.yWidth;
        }
      }
    }
    this.hidenarray[x][y] = data;
  }

  getAndSetPenetrated(x, y, data) {
    if (x < 0 || this.xWidth <= x) {
      if (horizonalLoop) {
        return initialize(this, x, y);
      } else {
        x = x % this.xWidth;
        if (x < 0) {
          x += this.xWidth;
        }
      }
    }
    if (y < 0 || this.yWidth <= y) {
      if (this.verticalLoop) {
        return initialize(this, x, y);
      } else {
        y = y % this.yWidth;
        if (y < 0) {
          y += this.yWidth;
        }
      }
    }
    this.hidenarray[x][y] = data;
    return this.innerarray[x][y];
  }

  forEachPenetrated(factory) {
    for (var y = 0; y < this.yWidth; y++) {
      if (y == this.yOffSet) {
        continue;
      }
      for (var x = 0; x < this.xWidth; x++) {
        this.hidenarray[x][y] = factory(this, x, y);
      }
    }
  }
}