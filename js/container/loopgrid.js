class loopgrid {

  constructor(x, y, factory) {
    this.innerarray = new Array();
    this.xWidth = x;
    this.yWidth = y;
    this.initialize = factory;

    for (var dx = 0; dx < x; dx++) {
      var column = new Array();
      this.innerarray[dx] = column;
      for (var dy = 0; dy < y; dy++) {
        column[dy] = factory(this, dx, dy);
      }
    }
  }
  set(x, y, data) {
    x = x % this.xWidth;
    y = y % this.yWidth;
    if (x < 0) {
      x += this.xWidth;
    }
    if (y < 0) {
      y += this.yWidth;
    }
    this.innerarray[x][y] = data;
  }

  setAndGet(x, y, data) {
    x = x % this.xWidth;
    y = y % this.yWidth;
    if (x < 0) {
      x += this.xWidth;
    }
    if (y < 0) {
      y += this.yWidth;
    }
    var re = this.innerarray[x][y];
    this.innerarray[x][y] = data;
    return re;
  }

  get(x, y) {
    x = x % this.xWidth;
    y = y % this.yWidth;
    if (x < 0) {
      x += this.xWidth;
    }
    if (y < 0) {
      y += this.yWidth;
    }
    return this.innerarray[x][y];
  }

  getPropotys() {
    return this.xWidth, this.yWidth;
  }

  yOffSet;

  forEach(factory) {
    for (var y = 0; y < this.yWidth; y++) {
      if (y == this.yOffSet) {
        continue;
      }
      for (var x = 0; x < this.xWidth; x++) {
        this.innerarray[x][y] = factory(this, x, y);
      }
    }
  }
}
