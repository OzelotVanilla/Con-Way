export class doublegrid extends loopgrid {
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

  forEach(factory) {
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