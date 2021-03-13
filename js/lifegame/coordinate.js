import entity from "entity.js"
export class coordinateSpace {


  xZoom;

  yZoom;

  y0OffSet;

  y1OffSet;

  cellsPerColumn;

  bottomOffSet;

  windowBottomHide;

  windowWidth;

  windowHeight;

  constructor(gridFactory, cellsPerLine, windowWidth, windowHeight, initialize, rule, renderer) {
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
    this.bottomOffSet = Math.round(cellsPerLine * this.windowHeight / this.windowWidth / 2);
    this.windowBottomHide = this.bottomOffSet;
    this.cellsPerColumn = Math.round(cellsPerLine * this.windowHeight / this.windowWidth);
    this.grid = new gridFactory(cellsPerLine, this.bottomOffSet * 4, initialize);
    this.rule = rule;
    this.renderer = renderer;

    this.xZoom = windowWidth / cellsPerLine;
    this.yZoom = windowHeight / this.cellsPerColumn;
    this.updateYOffSet();
    console.log(cellsPerLine, this.cellsPerColumn, this.bottomOffSet);
  }

  updateYOffSet() {
    this.y0OffSet = this.windowHeight + this.windowHeight * (1 + this.bottomOffSet) / this.cellsPerColumn;
    this.y1OffSet = this.windowHeight + this.windowHeight * this.bottomOffSet / this.cellsPerColumn;
  }

  set(x, y, data) {
    this.grid.set(x, y, data);
  }

  setAndGet(x, y, data) {
    return this.grid.setAndGet(x, y, data);
  }

  get(x, y) {
    return this.grid.get(x, y);
  }

  tick(times) {
    var rule = this.rule;
    var renderer = this.renderer;
    var bottomHide = this.bottomOffSet;
    var cellsPerColumn = this.cellsPerColumn;
    var yOffSet = this.grid.yOffSet = bottomHide - this.windowBottomHide;
    var gridHeight = this.grid.yWidth;
    for (var i = 0; i < times; i++) {
      this.grid.forEach(function (that, x, y) {
        var next = rule(that, x, y);
        if (y < yOffSet) {
          y = y + gridHeight;
        }
        if (next != this.grid.get(x, y) && y > bottomHide && y <= (bottomHide + cellsPerColumn)) {
          renderer(x, y, next);
        }
        return next;
      });
      this.grid.flip();
    }
  }
}

export function b3s23(that, x, y) {
  var times = 0;
  for (var dx = -1; dx <= 1; dx++) {
    for (var dy = -1; dy <= 1; dy++) {
      if (that.get(x + dx, y + dy) && (dx != 0 || dy != 0)) {
        times++;
      }
    }
  }
  switch (times) {
    case 2:
      return that.get(x, y);
    case 3:
      return true;
    default:
      return false;
  }
}

export function iterating(that, x, y) {
  if (x != 0) {
    return that.get(x - 1, y);
  } else {
    return that.get(x - 1, y - 1);
  }
}

export class cellGen extends entity {

  pattern;
  xOffSet;
  yOffSet;

  constructor(cycle, pattern, xOffSet, yOffSet, x, y) {
    super(cycle, x, y);
    this.pattern = pattern;
    this.xOffSet = xOffSet;
    this.yOffSet = yOffSet;
  }

  times = 0;

  evoluate(x, y) {
    if (this.times === cycle) {
      this.times = 0;
    }
    times++;
    x += this.xOffSet;
    y += this.yOffSet;
  }
}