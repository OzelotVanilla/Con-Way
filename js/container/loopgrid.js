/**
 * A virtual looping straight 2-dimensional space.
 * It contains its data by a normal 2d array, but you shouldn't access the array directly.
 * When accessing to it by its function, coordinates will be transformed to their modulus to its inner 2d array.
 * The factory function which the forEach method needs should looks like this: factory(this, x, y){ } and have return value,
 * because its return value will be the new value of that position.
 */
con_way.loopgrid = class {

  innerarray;
  xWidth;
  yWidth;
  initialize;
  horizonalLoop;
  verticalLoop;

  constructor(x, y, factory, horizonalLoop, verticalLoop) {
    this.innerarray = new Array();
    this.xWidth = x;
    this.yWidth = y;
    this.initialize = factory;
    this.horizonalLoop = horizonalLoop;
    this.verticalLoop = verticalLoop;

    for (var dx = 0; dx < x; dx++) {
      var column = new Array();
      this.innerarray[dx] = column;
      for (var dy = 0; dy < y; dy++) {
        column[dy] = factory(this, dx, dy);
      }
    }
  }

  set(x, y, data) {
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
    this.innerarray[x][y] = data;
  }

  getAndSet(x, y, data) {
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
    var re = this.innerarray[x][y];
    this.innerarray[x][y] = data;
    return re;
  }

  get(x, y) {
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
