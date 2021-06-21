import { loopgrid } from "./loopgrid";
/**
 * A modified loopgrid. It has two looping spaces. One is its facial space, and the other is a hidden space.
 * By invoking its methods extended from loopgrid, you can modify its facial space.
 * By invoking its own methods which are penetrated versions of loopgrid's methods,
 * you can modify its hidden space. A constant rule is: you SHOULD NOT get any data from or modify its hidden space.
 * By invoking the flip method, you can switch its facial and hidden space.
 */
export class doublegrid extends loopgrid {

  hidenarray: boolean[][];

  constructor(x: number, y: number, factory: (grid: loopgrid, x: number, y: number) => boolean, horizonalLoop: boolean, verticalLoop: boolean) {
    super(x, y, factory, horizonalLoop, verticalLoop);
    this.hidenarray = [];
    for (var dx = 0; dx < x; dx++) {
      var column: boolean[] = [];
      this.hidenarray[dx] = column;
      for (var dy: number = 0; dy < y; dy++) {
        column[dy] = factory(this, dx, dy);
      }
    }
  }

  flip() {
    var mid: boolean[][] = this.innerarray;
    this.innerarray = this.hidenarray;
    this.hidenarray = mid;
  }

  setPenetrated(x: number, y: number, data) {
    if (x < 0 || this.xWidth <= x) {
      if (this.horizonalLoop) {
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

  getAndSetPenetrated(x: number, y: number, data: boolean): boolean {
    if (x < 0 || this.xWidth <= x) {
      if (this.horizonalLoop) {
        return this.initialize(this, x, y);
      } else {
        x = x % this.xWidth;
        if (x < 0) {
          x += this.xWidth;
        }
      }
    }
    if (y < 0 || this.yWidth <= y) {
      if (this.verticalLoop) {
        return this.initialize(this, x, y);
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

  forEachPenetrated(factory: (grid: loopgrid, x: number, y: number) => boolean) {
    for (var y: number = 0; y < this.yWidth; y++) {
      if (y == this.yOffSet) {
        continue;
      }
      for (var x: number = 0; x < this.xWidth; x++) {
        this.hidenarray[x][y] = factory(this, x, y);
      }
    }
  }
}